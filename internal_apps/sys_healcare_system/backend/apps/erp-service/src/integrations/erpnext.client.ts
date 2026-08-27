import axios, { AxiosInstance } from 'axios';
import { ErpNextClientOptions, ErpNextDocument, SyncHealthStatus } from './erpnext.types';
import { isRetryableErpNextError, redactForLog, retryDelayMs } from './erpnext.retry';

export class ErpNextClient {
  private readonly http: AxiosInstance;
  private readonly options: Required<ErpNextClientOptions>;
  private status: SyncHealthStatus;

  constructor(options: ErpNextClientOptions, httpClient?: AxiosInstance) {
    if (!options.baseUrl || !options.apiKey || !options.apiSecret) {
      throw new Error('ERPNext integration is not configured');
    }
    this.options = {
      timeoutMs: 10_000,
      maxRetries: 3,
      retryBaseDelayMs: 250,
      ...options,
    };
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
      'Content-Type': 'application/json',
    };

    for (let attempt = 1; attempt <= this.options.maxRetries + 1; attempt += 1) {
      try {
        const response = await this.http.request<Record<string, unknown>>({
          method,
          url: `${this.options.baseUrl.replace(/\/$/, '')}${path}`,
          headers,
          timeout: this.options.timeoutMs,
          data: document.data,
        });
        this.status = { ...this.status, lastSuccessAt: new Date().toISOString(), consecutiveFailures: 0 };
        return response.data;
      } catch (error) {
        this.status = {
          ...this.status,
          lastFailureAt: new Date().toISOString(),
          consecutiveFailures: this.status.consecutiveFailures + 1,
        };
        if (attempt > this.options.maxRetries || !isRetryableErpNextError(error)) throw error;
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs(attempt, this.options.retryBaseDelayMs)));
        void redactForLog({ attempt, doctype: document.doctype, sourceId: document.context.sourceId });
      }
    }
    throw new Error('ERPNext request exhausted retries');
  }

  getHealth(): SyncHealthStatus {
    return { ...this.status };
  }
}
