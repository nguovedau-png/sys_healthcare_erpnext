import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type ERPNextClientConfig = { baseUrl: string; apiKey: string; apiSecret: string; timeoutMs?: number; maxRetries?: number };

export type ERPNextReadDoctype = 'Customer' | 'Supplier' | 'Employee' | 'Item' | 'Sales Invoice' | 'Purchase Invoice' | 'Payment Entry';

const READ_FIELDS: Record<ERPNextReadDoctype, readonly string[]> = {
    Customer: ['name', 'customer_name', 'email_id', 'mobile_no', 'disabled'],
    Supplier: ['name', 'supplier_name', 'supplier_group', 'disabled'],
    Employee: ['name', 'employee_name', 'user_id', 'department', 'status'],
    Item: ['name', 'item_code', 'item_name', 'item_group', 'stock_uom', 'disabled'],
    'Sales Invoice': ['name', 'customer', 'posting_date', 'due_date', 'status', 'grand_total', 'outstanding_amount', 'currency'],
    'Purchase Invoice': ['name', 'supplier', 'posting_date', 'due_date', 'status', 'grand_total', 'outstanding_amount', 'currency'],
    'Payment Entry': ['name', 'party', 'posting_date', 'paid_amount', 'received_amount', 'payment_type', 'reference_no', 'status', 'currency'],
};

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

    async listDocuments(doctype: ERPNextReadDoctype, filters: Array<[string, string, string | number]>, limit = 50) {
        const fields = READ_FIELDS[doctype];
        if (!fields) throw new Error('Unsupported ERPNext read doctype');
        const boundedLimit = Math.max(1, Math.min(limit, 100));
        const response = await this.request<{ data: unknown[] }>({ method: 'GET', url: `/api/resource/${encodeURIComponent(doctype)}`, params: { filters: JSON.stringify(filters), fields: JSON.stringify(fields), limit_page_length: boundedLimit } });
        return response.data.data || [];
    }

    async getDocument(doctype: ERPNextReadDoctype, name: string) {
        if (!name || name.length > 140 || /[\\r\\n]/.test(name)) throw new Error('Invalid ERPNext document name');
        const response = await this.request<{ data: Record<string, unknown> }>({ method: 'GET', url: `/api/resource/${encodeURIComponent(doctype)}/${encodeURIComponent(name)}`, params: { fields: JSON.stringify(READ_FIELDS[doctype]) } });
        return response.data.data;
    }

    async getSalesInvoice(name: string) {
        const document = await this.getDocument('Sales Invoice', name);
        return { name: String(document.name || name), customer: document.customer ? String(document.customer) : null, status: document.status ? String(document.status) : null, postingDate: document.posting_date ? String(document.posting_date) : null, dueDate: document.due_date ? String(document.due_date) : null, grandTotal: document.grand_total ?? null, outstandingAmount: document.outstanding_amount ?? null, currency: document.currency ? String(document.currency) : 'VND' };
    }

    async findCustomerByEmail(email: string) {
        const response = await this.request<{ data: Array<{ name: string }> }>({ method: 'GET', url: '/api/resource/Customer', params: { filters: JSON.stringify([['email_id', '=', email]]), fields: JSON.stringify(['name']), limit_page_length: 1 } });
        return response.data.data?.[0] ?? null;
    }

    async upsertCustomer(data: { customer_name: string; email_id: string; mobile_no?: string }) {
        const existing = await this.findCustomerByEmail(data.email_id);
        if (existing) return this.request({ method: 'PUT', url: `/api/resource/Customer/${encodeURIComponent(existing.name)}`, data }).then((response) => response.data);
        return this.request({ method: 'POST', url: '/api/resource/Customer', data }).then((response) => response.data);
    }

    async deleteCustomer(name: string) {
        return this.request({ method: 'DELETE', url: `/api/resource/Customer/${encodeURIComponent(name)}` }).then((response) => response.data);
    }
}

export function getERPNextClient(): ERPNextClient | null {
    const { ERPNEXT_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET } = process.env;
    if (!ERPNEXT_URL || !ERPNEXT_API_KEY || !ERPNEXT_API_SECRET) return null;
    return new ERPNextClient({ baseUrl: ERPNEXT_URL, apiKey: ERPNEXT_API_KEY, apiSecret: ERPNEXT_API_SECRET, timeoutMs: Number(process.env.ERPNEXT_TIMEOUT_MS || 5000), maxRetries: Number(process.env.ERPNEXT_MAX_RETRIES || 3) });
}
