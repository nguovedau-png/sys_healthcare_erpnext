import axios, { AxiosInstance } from 'axios';
import { ErpNextClientOptions, ErpNextDocument, SyncHealthStatus } from './erpnext.types';
import { isRetryableErpNextError, retryDelayMs } from './erpnext.retry';

export class ErpNextClient {
  private readonly http: AxiosInstance;
  private readonly options: Required<ErpNextClientOptions>;
  private status: SyncHealthStatus;

  constructor(options: ErpNextClientOptions, httpClient?: AxiosInstance) {
    const baseUrl = options.baseUrl?.trim().replace(/\/+$/, '');
    if (!baseUrl || !options.apiKey?.trim() || !options.apiSecret?.trim()) {
      throw new Error('ERPNext integration is not configured');
    }

    try {
      const parsed = new URL(baseUrl);
      if (parsed.username || parsed.password) throw new Error('Credentials must not be embedded in ERPNext URL');
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Unsupported ERPNext URL protocol');
    } catch {
      throw new Error('ERPNext base URL must be a valid HTTP(S) URL without credentials');
    }

    const timeoutMs = options.timeoutMs ?? 10_000;
    const maxRetries = options.maxRetries ?? 3;
    const retryBaseDelayMs = options.retryBaseDelayMs ?? 250;
    if (!Number.isInteger(timeoutMs) || timeoutMs < 100 || timeoutMs > 120_000) {
      throw new Error('ERPNext timeout must be an integer between 100 and 120000 milliseconds');
    }
    if (!Number.isInteger(maxRetries) || maxRetries < 0 || maxRetries > 8) {
      throw new Error('ERPNext maxRetries must be an integer between 0 and 8');
    }
    if (!Number.isInteger(retryBaseDelayMs) || retryBaseDelayMs < 0 || retryBaseDelayMs > 10_000) {
      throw new Error('ERPNext retryBaseDelayMs must be an integer between 0 and 10000 milliseconds');
    }

    this.options = { baseUrl, apiKey: options.apiKey.trim(), apiSecret: options.apiSecret.trim(), timeoutMs, maxRetries, retryBaseDelayMs };
    this.http = httpClient ?? axios.create();
    this.status = {
      configured: true,
      baseUrl: this.options.baseUrl,
      consecutiveFailures: 0,
    };
  }

  async upsert<T extends Record<string, unknown>>(document: ErpNextDocument<T>): Promise<Record<string, unknown>> {
    const path = document.name
      ? `/api/resource/${encodeURIComponent(document.doctype)}/${encodeURIComponent(document.name)}`
      : `/api/resource/${encodeURIComponent(document.doctype)}`;
    const method = document.name ? 'put' : 'post';
    const headers = {
      Authorization: `token ${this.options.apiKey}:${this.options.apiSecret}`,
      'X-Idempotency-Key': document.context.idempotencyKey,
      'X-Tenant-Id': document.context.tenantId,
      'X-Facility-Id': document.context.facilityId,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    for (let attempt = 1; attempt <= this.options.maxRetries + 1; attempt += 1) {
      try {
        const response = await this.http.request<Record<string, unknown>>({
          method,
          url: `${this.options.baseUrl}${path}`,
          headers,
          timeout: this.options.timeoutMs,
          data: document.data,
        });
        this.status = { ...this.status, lastSuccessAt: new Date().toISOString(), consecutiveFailures: 0 };
        return this.unwrapFrappeResponse(response.data);
      } catch (error) {
        this.status = {
          ...this.status,
          lastFailureAt: new Date().toISOString(),
          consecutiveFailures: this.status.consecutiveFailures + 1,
        };
        if (attempt > this.options.maxRetries || !isRetryableErpNextError(error)) throw error;
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs(attempt, this.options.retryBaseDelayMs)));
      }
    }
    throw new Error('ERPNext request exhausted retries');
  }

  getHealth(): SyncHealthStatus {
    return { ...this.status };
  }

  private unwrapFrappeResponse(payload: Record<string, unknown>): Record<string, unknown> {
    const nested = payload?.data;
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      return nested as Record<string, unknown>;
    }
    return payload;
  }
}
