import { Injectable, OnModuleInit } from '@nestjs/common';
import { ErpNextClient } from './erpnext.client';
import { ErpNextClientOptions, ErpNextDocument } from './erpnext.types';

@Injectable()
export class ErpNextIntegrationService implements OnModuleInit {
  private client?: ErpNextClient;

  onModuleInit() {
    const { ERPNEXT_BASE_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET } = process.env;
    if (ERPNEXT_BASE_URL && ERPNEXT_API_KEY && ERPNEXT_API_SECRET) {
      this.client = new ErpNextClient({
        baseUrl: ERPNEXT_BASE_URL,
        apiKey: ERPNEXT_API_KEY,
        apiSecret: ERPNEXT_API_SECRET,
        timeoutMs: Number(process.env.ERPNEXT_TIMEOUT_MS || 10000),
        maxRetries: Number(process.env.ERPNEXT_MAX_RETRIES || 3),
      });
    }
  }

  async upsert(document: ErpNextDocument): Promise<Record<string, unknown>> {
    if (!this.client) throw new Error('ERPNext integration is not configured');
    return this.client.upsert(document);
  }

  getHealth() {
    const health = this.client?.getHealth();
    if (!health) return { configured: false, consecutiveFailures: 0 };
    const { baseUrl: _baseUrl, ...publicHealth } = health;
    return publicHealth;
  }
}
