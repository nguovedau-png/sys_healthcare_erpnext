import axios from 'axios';
import { errorSummary, isRetryableErpNextError, redactForLog, retryDelayMs } from './erpnext.retry';

describe('ERPNext retry policy', () => {
  it('uses bounded exponential backoff', () => {
    expect(retryDelayMs(1, 250)).toBe(250);
    expect(retryDelayMs(3, 250)).toBe(1000);
    expect(retryDelayMs(20, 250)).toBe(10000);
  });

  it('retries transient HTTP failures but not validation failures', () => {
    expect(isRetryableErpNextError({ response: { status: 429 } })).toBe(true);
    expect(isRetryableErpNextError({ response: { status: 503 } })).toBe(true);
    expect(isRetryableErpNextError({ response: { status: 422 } })).toBe(false);
    expect(isRetryableErpNextError({ code: 'ECONNRESET' })).toBe(true);
  });

  it('redacts secrets recursively without changing safe metadata', () => {
    expect(redactForLog({ tenantId: 't1', password: 'secret', nested: { apiSecret: 'x' }, ok: true })).toEqual({
      tenantId: 't1',
      password: '[REDACTED]',
      nested: { apiSecret: '[REDACTED]' },
      ok: true,
    });
  });

  it('summarizes axios errors with bounded message', () => {
    const error = new axios.AxiosError('x'.repeat(1000), 'ERR_BAD_RESPONSE', undefined, undefined, { status: 500 } as never);
    expect(errorSummary(error)).toEqual({ code: 'ERR_BAD_RESPONSE', status: 500, message: 'x'.repeat(500) });
  });
});
