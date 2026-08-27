export interface ErpNextHealth {
  configured: boolean;
  baseUrl?: string;
  lastSuccessAt?: string;
  lastFailureAt?: string;
  consecutiveFailures: number;
}

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/v1';

export async function getErpNextHealth(signal?: AbortSignal): Promise<ErpNextHealth> {
  const response = await fetch(`${apiBaseUrl}/erp/integrations/erpnext/health`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal,
  });
  if (!response.ok) throw new Error(`ERPNext health request failed (${response.status})`);
  return response.json() as Promise<ErpNextHealth>;
}
