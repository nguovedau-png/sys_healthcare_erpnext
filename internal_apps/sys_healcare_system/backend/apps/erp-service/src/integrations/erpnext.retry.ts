const RETRYABLE_STATUS = new Set([408, 409, 425, 429, 500, 502, 503, 504]);

export function isRetryableErpNextError(error: unknown): boolean {
  const candidate = error as { response?: { status?: number }; code?: string };
  if (candidate?.code && ['ECONNABORTED', 'ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND'].includes(candidate.code)) {
    return true;
  }
  return typeof candidate?.response?.status === 'number' && RETRYABLE_STATUS.has(candidate.response.status);
}

export function retryDelayMs(attempt: number, baseDelayMs = 250): number {
  const exponential = baseDelayMs * 2 ** Math.max(0, attempt - 1);
  return Math.min(exponential, 10_000);
}

export function redactForLog(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactForLog);
  if (!value || typeof value !== 'object') return value;

  const sensitive = new Set(['password', 'token', 'apiKey', 'apiSecret', 'authorization', 'phone', 'email', 'address', 'dob']);
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    sensitive.has(key.toLowerCase()) ? '[REDACTED]' : redactForLog(item),
  ]));
}
