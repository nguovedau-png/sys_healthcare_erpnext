import { AxiosInstance } from 'axios';
import { ERPNextClient } from '../src/modules/healthcare/erpnext.client';

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
});
