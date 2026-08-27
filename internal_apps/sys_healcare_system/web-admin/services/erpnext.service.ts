import apiService from './api';

export interface ErpNextHealth {
  configured: boolean;
  baseUrl?: string;
  lastSuccessAt?: string;
  lastFailureAt?: string;
  consecutiveFailures: number;
}

export const erpNextService = {
  getHealth: () => apiService.get<ErpNextHealth>('/erp/integrations/erpnext/health'),
};
