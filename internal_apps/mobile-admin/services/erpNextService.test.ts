import { getErpNextHealth } from './erpNextService'

describe('getErpNextHealth', () => {
  afterEach(() => jest.restoreAllMocks())

  it('returns health payload for a successful response', async () => {
    const payload = { configured: true, consecutiveFailures: 0 }
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => payload,
    } as Response)

    await expect(getErpNextHealth()).resolves.toEqual(payload)
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/erp/integrations/erpnext/health'),
      expect.objectContaining({ method: 'GET' }),
    )
  })

  it('raises an error when the API rejects the request', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: false, status: 503 } as Response)
    await expect(getErpNextHealth()).rejects.toThrow('ERPNext health request failed (503)')
  })
})
