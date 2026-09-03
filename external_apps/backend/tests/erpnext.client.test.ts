import { AxiosInstance } from 'axios';
import { ERPNextClient, getERPNextClient } from '../src/modules/healthcare/erpnext.client';

describe('ERPNextClient typed read-through', () => {
    function clientWith(request: jest.Mock) {
        const client = new ERPNextClient({ baseUrl: 'https://erp.example', apiKey: 'key', apiSecret: 'secret', maxRetries: 0 });
        (client as unknown as { http: AxiosInstance }).http = { request } as unknown as AxiosInstance;
        return client;
    }

    test('lists only allowlisted doctype fields with a bounded limit', async () => {
        const request = jest.fn().mockResolvedValue({ status: 200, data: { data: [{ name: 'ITEM-001' }] } });
        await expect(clientWith(request).listDocuments('Item', [['disabled', '=', 0]], 999)).resolves.toEqual([{ name: 'ITEM-001' }]);
        expect(request).toHaveBeenCalledWith(expect.objectContaining({ method: 'GET', url: '/api/resource/Item', params: expect.objectContaining({ limit_page_length: 100, fields: expect.stringContaining('item_code') }) }));
    });

    test('normalizes Sales Invoice values for reconciliation', async () => {
        const request = jest.fn().mockResolvedValue({ status: 200, data: { data: { name: 'SINV-001', customer: 'CUST-001', status: 'Paid', grand_total: 150000, outstanding_amount: 0, currency: 'VND', posting_date: '2026-09-01', due_date: '2026-09-01' } } });
        await expect(clientWith(request).getSalesInvoice('SINV/001')).resolves.toEqual(expect.objectContaining({ name: 'SINV-001', grandTotal: 150000, outstandingAmount: 0, currency: 'VND' }));
        expect(request).toHaveBeenCalledWith(expect.objectContaining({ url: '/api/resource/Sales%20Invoice/SINV%2F001' }));
    });

    test('rejects invalid document names before making a request', async () => {
        const request = jest.fn();
        await expect(clientWith(request).getDocument('Employee', 'bad\nname')).rejects.toThrow('Invalid ERPNext document name');
        expect(request).not.toHaveBeenCalled();
    });

    test('uses the canonical ERPNext base URL environment variable', () => {
        const previous = { base: process.env.ERPNEXT_BASE_URL, legacy: process.env.ERPNEXT_URL, key: process.env.ERPNEXT_API_KEY, secret: process.env.ERPNEXT_API_SECRET };
        process.env.ERPNEXT_BASE_URL = 'https://erp.example';
        delete process.env.ERPNEXT_URL;
        process.env.ERPNEXT_API_KEY = 'key';
        process.env.ERPNEXT_API_SECRET = 'secret';
        expect(getERPNextClient()).not.toBeNull();
        if (previous.base === undefined) delete process.env.ERPNEXT_BASE_URL; else process.env.ERPNEXT_BASE_URL = previous.base;
        if (previous.legacy === undefined) delete process.env.ERPNEXT_URL; else process.env.ERPNEXT_URL = previous.legacy;
        if (previous.key === undefined) delete process.env.ERPNEXT_API_KEY; else process.env.ERPNEXT_API_KEY = previous.key;
        if (previous.secret === undefined) delete process.env.ERPNEXT_API_SECRET; else process.env.ERPNEXT_API_SECRET = previous.secret;
    });
});
