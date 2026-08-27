import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type ERPNextClientConfig = { baseUrl: string; apiKey: string; apiSecret: string; timeoutMs?: number; maxRetries?: number };

export class ERPNextClient {
    private readonly http: AxiosInstance;
    private readonly maxRetries: number;

    constructor(private readonly config: ERPNextClientConfig) {
        this.maxRetries = Math.max(0, Math.min(config.maxRetries ?? 3, 5));
        this.http = axios.create({ baseURL: config.baseUrl.replace(/\/$/, ''), timeout: config.timeoutMs ?? 5000, headers: { Authorization: `token ${config.apiKey}:${config.apiSecret}`, Accept: 'application/json' } });
    }

    private async request<T>(request: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        for (let attempt = 0; ; attempt += 1) {
            try { return await this.http.request<T>(request); }
            catch (error: any) {
                const status = error?.response?.status;
                const retryable = !status || status === 408 || status === 429 || status >= 500;
                if (!retryable || attempt >= this.maxRetries) throw error;
                await new Promise((resolve) => setTimeout(resolve, Math.min(250 * (2 ** attempt), 2000)));
            }
        }
    }

    async health() {
        const response = await this.request<{ data: unknown }>({ method: 'GET', url: '/api/method/frappe.auth.get_logged_user' });
        return { ok: response.status >= 200 && response.status < 300 };
    }

    async findCustomerByEmail(email: string) {
        const response = await this.request<{ data: Array<{ name: string }> }>({ method: 'GET', url: '/api/resource/Customer', params: { filters: JSON.stringify([['email_id', '=', email]]), fields: JSON.stringify(['name']), limit_page_length: 1 } });
        return response.data.data?.[0] ?? null;
    }

    async upsertCustomer(data: { name: string; email_id: string; mobile_no?: string }) {
        const existing = await this.findCustomerByEmail(data.email_id);
        if (existing) return this.request({ method: 'PUT', url: `/api/resource/Customer/${encodeURIComponent(existing.name)}`, data }).then((response) => response.data);
        return this.request({ method: 'POST', url: '/api/resource/Customer', data }).then((response) => response.data);
    }
}

export function getERPNextClient(): ERPNextClient | null {
    const { ERPNEXT_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET } = process.env;
    if (!ERPNEXT_URL || !ERPNEXT_API_KEY || !ERPNEXT_API_SECRET) return null;
    return new ERPNextClient({ baseUrl: ERPNEXT_URL, apiKey: ERPNEXT_API_KEY, apiSecret: ERPNEXT_API_SECRET, timeoutMs: Number(process.env.ERPNEXT_TIMEOUT_MS || 5000), maxRetries: Number(process.env.ERPNEXT_MAX_RETRIES || 3) });
}
