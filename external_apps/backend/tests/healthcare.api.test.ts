import request from 'supertest';
import app from '../src/index';
import { prismaMock } from './setup';
import { signToken } from '../src/utils/jwt';

describe('Healthcare API boundary', () => {
    const token = signToken({ userId: 'facility-user' });

    beforeEach(() => {
        prismaMock.user.findUnique.mockResolvedValue({
            id: 'facility-user',
            role: { name: 'receptionist', isSystem: false, permissions: [] },
        } as any);
    });

    test('rejects patient search without an explicit tenant and facility scope', async () => {
        const response = await request(app)
            .get('/api/v1/healthcare/patients')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({ success: false, code: 'BAD_REQUEST' });
        expect(prismaMock.userRoleScope.findFirst).not.toHaveBeenCalled();
    });

    test('allows a tenant-wide receptionist scope to search one facility', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope-1', facilityId: null } as any);
        prismaMock.patientProjection.findMany.mockResolvedValue([]);

        const response = await request(app)
            .get('/api/v1/healthcare/patients?tenantId=tenant-1&facilityId=facility-1&q=090')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, data: [] });
        expect(prismaMock.patientProjection.findMany).toHaveBeenCalled();
    });

    test('does not expose ERPNext integration status to an ordinary receptionist', async () => {
        const response = await request(app)
            .get('/api/v1/healthcare/integrations/erpnext/status')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({ success: false, code: 'FORBIDDEN' });
    });

    test('lists consent history only for a patient in the requested facility', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope-1' } as any);
        prismaMock.patientProjection.findFirst.mockResolvedValue({ id: 'patient-1' } as any);
        prismaMock.consentRecord.findMany.mockResolvedValue([{ id: 'consent-1', purpose: 'care', status: 'active' }] as any);
        const response = await request(app)
            .get('/api/v1/healthcare/patients/patient-1/consents?tenantId=tenant-1&facilityId=facility-1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, data: [{ id: 'consent-1', purpose: 'care', status: 'active' }] });
        expect(prismaMock.consentRecord.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { tenantId: 'tenant-1', facilityId: 'facility-1', patientId: 'patient-1' } }));
    });

    test('captures consent with explicit scope and rejects unknown payload fields', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope-1' } as any);
        prismaMock.patientProjection.findFirst.mockResolvedValue({ id: 'patient-1' } as any);
        prismaMock.consentRecord.updateMany.mockResolvedValue({ count: 0 } as any);
        prismaMock.consentRecord.create.mockResolvedValue({ id: 'consent-2', purpose: 'care', status: 'active' } as any);
        (prismaMock.$transaction as jest.Mock).mockImplementationOnce(async (callback) => callback(prismaMock));
        const response = await request(app)
            .post('/api/v1/healthcare/patients/patient-1/consents')
            .set('Authorization', `Bearer ${token}`)
            .send({ tenantId: 'tenant-1', facilityId: 'facility-1', purpose: 'care', policyVersion: 'v1' });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ success: true, data: { id: 'consent-2', purpose: 'care', status: 'active' } });
        const invalid = await request(app)
            .post('/api/v1/healthcare/patients/patient-1/consents')
            .set('Authorization', `Bearer ${token}`)
            .send({ tenantId: 'tenant-1', facilityId: 'facility-1', purpose: 'care', unexpected: true });
        expect(invalid.status).toBe(400);
    });

    test('creates a family link with explicit body scope', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope-1' } as any);
        prismaMock.patientProjection.findMany.mockResolvedValue([{ id: 'patient-1' }, { id: 'patient-2' }] as any);
        prismaMock.patientRelationship.findUnique.mockResolvedValue(null);
        prismaMock.patientRelationship.create.mockResolvedValue({ id: 'link-1', consentStatus: 'active' } as any);
        const response = await request(app)
            .post('/api/v1/healthcare/patients/patient-1/family-links')
            .set('Authorization', `Bearer ${token}`)
            .send({ tenantId: 'tenant-1', facilityId: 'facility-1', dependentPatientId: 'patient-2', relationship: 'child', consentStatus: 'active' });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ success: true, data: { id: 'link-1', consentStatus: 'active' } });
    });

    test('requires explicit scope for consent withdrawal', async () => {
        const response = await request(app)
            .post('/api/v1/healthcare/consents/consent-1/withdraw')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
        expect(prismaMock.consentRecord.findFirst).not.toHaveBeenCalled();
    });

    test('accepts queue query parameters and keeps the queue scoped', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope-1' } as any);
        prismaMock.queueTicket.findMany.mockResolvedValue([]);
        const response = await request(app)
            .get('/api/v1/healthcare/queue?tenantId=tenant-1&facilityId=facility-1&queueDate=2026-08-28&status=waiting')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, data: [] });
        expect(prismaMock.queueTicket.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ tenantId: 'tenant-1', facilityId: 'facility-1', status: 'waiting' }) }));
    });

    test('allows finance to read scoped billing reconciliation data', async () => {
        prismaMock.user.findUnique.mockResolvedValue({
            id: 'facility-user',
            role: { name: 'finance', isSystem: false, permissions: [] },
        } as any);
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope-1', facilityId: 'facility-1' } as any);
        prismaMock.billingIntent.findMany.mockResolvedValue([{ id: 'bill-1', status: 'paid', events: [], refunds: [] }] as any);
        const response = await request(app)
            .get('/api/v1/healthcare/billing-intents?tenantId=tenant-1&facilityId=facility-1&status=paid&provider=qr&take=25')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, data: [{ id: 'bill-1', status: 'paid', events: [], refunds: [] }] });
        expect(prismaMock.billingIntent.findMany).toHaveBeenCalledWith(expect.objectContaining({
            where: expect.objectContaining({ tenantId: 'tenant-1', facilityId: 'facility-1', status: 'paid', events: { some: { provider: 'qr' } } }),
            take: 25,
        }));
    });

    test('denies billing reconciliation to a receptionist', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue(null);
        const response = await request(app)
            .get('/api/v1/healthcare/billing-intents?tenantId=tenant-1&facilityId=facility-1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({ success: false, code: 'FORBIDDEN' });
        expect(prismaMock.billingIntent.findMany).not.toHaveBeenCalled();
    });

    test('rejects payment callback when the webhook secret is not configured', async () => {
        delete process.env.PAYMENT_WEBHOOK_SECRET;
        const response = await request(app).post('/api/v1/healthcare/payments/webhook').send({ eventId: 'e-1' });
        expect(response.status).toBe(503);
        expect(response.body).toMatchObject({ success: false, code: 'SERVICE_UNAVAILABLE' });
    });
});
