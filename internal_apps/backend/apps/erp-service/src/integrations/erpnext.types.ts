export const ERP_NEXT_DOCTYPES = [
  'Customer',
  'Employee',
  'Healthcare Practitioner',
  'Item',
  'Lead',
  'Patient',
  'Patient Appointment',
  'Patient Encounter',
  'Payment Entry',
  'Purchase Invoice',
  'Sales Invoice',
  'Stock Entry',
  'Supplier',
  'Warehouse',
] as const;

export type ErpNextDocType = (typeof ERP_NEXT_DOCTYPES)[number];

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

export type SyncOperationStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'DEAD_LETTER';

export interface SyncResult {
  operationId: string;
  status: SyncOperationStatus;
  replayed: boolean;
  data?: Record<string, unknown>;
}
