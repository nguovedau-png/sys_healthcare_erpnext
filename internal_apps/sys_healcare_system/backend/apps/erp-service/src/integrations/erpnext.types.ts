export type ErpNextDocType =
  | 'Patient'
  | 'Healthcare Practitioner'
  | 'Patient Appointment'
  | 'Patient Encounter'
  | 'Sales Invoice'
  | 'Item';

export interface ErpNextRequestContext {
  tenantId: string;
  facilityId: string;
  sourceSystem: 'healthcare-platform';
  sourceId: string;
  idempotencyKey: string;
}

export interface ErpNextDocument<T extends Record<string, unknown> = Record<string, unknown>> {
  doctype: ErpNextDocType;
  name?: string;
  data: T;
  context: ErpNextRequestContext;
}

export interface ErpNextClientOptions {
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
  timeoutMs?: number;
  maxRetries?: number;
  retryBaseDelayMs?: number;
}

export interface SyncHealthStatus {
  configured: boolean;
  baseUrl?: string;
  lastSuccessAt?: string;
  lastFailureAt?: string;
  consecutiveFailures: number;
}
