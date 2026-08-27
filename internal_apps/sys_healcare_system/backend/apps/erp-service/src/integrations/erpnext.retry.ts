const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
const RETRYABLE_CODES = new Set(['ECONNABORTED', 'ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND', 'EAI_AGAIN']);
const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'apikey',
  'apisecret',
  'authorization',
  'phone',
  'email',
  'address',
  'dob',
  'dateofbirth',
  'nationalid',
  'insuranceid',
]);

export function isRetryableErpNextError(error: unknown): boolean {
  const candidate = error as { response?: { status?: number }; code?: string } | undefined;
  if (candidate?.code && RETRYABLE_CODES.has(candidate.code)) return true;
  return typeof candidate?.response?.status === 'number' && RETRYABLE_STATUS.has(candidate.response.status);
}

export function retryDelayMs(attempt: number, baseDelayMs = 250): number {
  const safeAttempt = Number.isFinite(attempt) ? Math.max(1, Math.floor(attempt)) : 1;
  const safeBase = Number.isFinite(baseDelayMs) ? Math.max(0, baseDelayMs) : 250;
  const exponential = safeBase * 2 ** (safeAttempt - 1);
  return Math.min(exponential, 10_000);
}

export function redactForLog(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactForLog);
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    SENSITIVE_KEYS.has(key.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()) ? '[REDACTED]' : redactForLog(item),
  ]));
}

export function errorSummary(error: unknown): { code?: string; status?: number; message: string } {
  const candidate = error as { code?: string; response?: { status?: number }; message?: string } | undefined;
  return {
    ...(candidate?.code ? { code: candidate.code } : {}),
    ...(typeof candidate?.response?.status === 'number' ? { status: candidate.response.status } : {}),
    message: typeof candidate?.message === 'string' ? candidate.message.slice(0, 500) : 'ERPNext request failed',
  };
}
