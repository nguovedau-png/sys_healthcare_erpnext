import type { AxiosInstance } from 'axios';
import { ErpNextClient } from './erpnext.client';

describe('ErpNextClient', () => {
  const document = {
    doctype: 'Patient' as const,
    data: { patient_name: 'Nguyen Van A' },
    context: {
      tenantId: 'tenant-1',
      facilityId: 'facility-1',
      sourceSystem: 'healthcare-platform' as const,
      sourceId: 'patient-1',
      idempotencyKey: 'patient-1-v1',
    },
  };

  it('rejects credentials embedded in the base URL', () => {
    expect(() => new ErpNextClient({
      baseUrl: 'https://user:secret@erp.example.com',
      apiKey: 'key',
      apiSecret: 'secret',
    })).toThrow('ERPNext base URL must be a valid HTTP(S) URL without credentials');
  });

  it('sends server-side token and idempotency context and unwraps Frappe data', async () => {
    const request = jest.fn().mockResolvedValue({ data: { data: { name: 'PAT-0001', modified: '2026-08-27 10:00:00' } } });
    const client = new ErpNextClient({ baseUrl: 'https://erp.example.com/', apiKey: 'key', apiSecret: 'secret' }, { request } as unknown as AxiosInstance);

    await expect(client.upsert(document)).resolves.toEqual({ name: 'PAT-0001', modified: '2026-08-27 10:00:00' });
    expect(request).toHaveBeenCalledWith(expect.objectContaining({
      method: 'post',
      url: 'https://erp.example.com/api/resource/Patient',
      headers: expect.objectContaining({
        Authorization: 'token key:secret',
        'X-Idempotency-Key': 'patient-1-v1',
        'X-Tenant-Id': 'tenant-1',
        'X-Facility-Id': 'facility-1',
      }),
    }));
  });

  it('does not retry a non-transient validation response', async () => {
    const request = jest.fn().mockRejectedValue({ response: { status: 422 }, message: 'validation failed' });
    const client = new ErpNextClient({ baseUrl: 'https://erp.example.com', apiKey: 'key', apiSecret: 'secret', maxRetries: 3 }, { request } as unknown as AxiosInstance);

    await expect(client.upsert(document)).rejects.toMatchObject({ response: { status: 422 } });
    expect(request).toHaveBeenCalledTimes(1);
  });
});
