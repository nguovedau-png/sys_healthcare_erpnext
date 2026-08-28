import crypto from 'crypto';
import { prismaMock } from './setup';
import { ConflictError, ForbiddenError } from '../src/modules/healthcare/healthcare.errors';
import { HealthcareService } from '../src/modules/healthcare/healthcare.service';
import { parseBillingIntent, parseConsent, parseFamilyLink, parsePaymentEvent, parseQueueCheckIn } from '../src/modules/healthcare/healthcare.validation';

describe('healthcare advanced operational rules', () => {
    const admin = { id: 'admin-1', role: { name: 'Admin', isSystem: true } };

    test('parses VND billing input and rejects unknown fields', () => {
        expect(parseBillingIntent({ tenantId: 't', facilityId: 'f', patientId: 'p', amount: '125000', correlationKey: 'c' })).toMatchObject({ amount: 125000, currency: 'VND' });
        expect(() => parseBillingIntent({ tenantId: 't', facilityId: 'f', patientId: 'p', amount: 1, correlationKey: 'c', cardNumber: 'secret' })).toThrow('Unknown fields');
    });

    test('requires a bounded queue priority', () => {
        expect(parseQueueCheckIn({ priority: 10 })).toEqual({ priority: 10, priorityReason: undefined });
        expect(() => parseQueueCheckIn({ priority: 101 })).toThrow('priority');
    });

    test('checks in a confirmed appointment once and returns existing queue ticket on replay', async () => {
        const appointment = { id: 'a-1', tenantId: 't-1', facilityId: 'f-1', status: 'confirmed', version: 2, startsAt: new Date('2026-08-28T08:00:00.000Z') };
        prismaMock.appointment.findUnique.mockResolvedValue(appointment as any);
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope' } as any);
        prismaMock.queueTicket.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce({ id: 'q-1', ticketNumber: 7, status: 'waiting' } as any);
        prismaMock.queueTicket.findFirst.mockResolvedValue({ ticketNumber: 6 } as any);
        prismaMock.queueTicket.create.mockResolvedValue({ id: 'q-1', ticketNumber: 7, status: 'waiting' } as any);
        prismaMock.appointment.updateMany.mockResolvedValue({ count: 1 } as any);
        (prismaMock.$transaction as jest.Mock).mockImplementationOnce(async (callback) => callback(prismaMock));
        await expect(HealthcareService.checkInAppointment({ id: 'r-1', role: { name: 'receptionist' } }, 'a-1', { priority: 0 })).resolves.toMatchObject({ ticketNumber: 7 });
        await expect(HealthcareService.checkInAppointment({ id: 'r-1', role: { name: 'receptionist' } }, 'a-1', { priority: 0 })).resolves.toMatchObject({ ticketNumber: 7 });
        expect(prismaMock.queueTicket.create).toHaveBeenCalledTimes(1);
    });

    test('rejects queue transition by an unscoped actor', async () => {
        prismaMock.queueTicket.findUnique.mockResolvedValue({ id: 'q-1', tenantId: 't-1', facilityId: 'f-1', status: 'waiting', version: 1 } as any);
        prismaMock.userRoleScope.findFirst.mockResolvedValue(null);
        await expect(HealthcareService.transitionQueueTicket({ id: 'intruder', role: { name: 'receptionist' } }, 'q-1', 'called')).rejects.toBeInstanceOf(ForbiddenError);
    });

    test('creates a payment intent idempotently and rejects changed correlation payload', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope' } as any);
        prismaMock.patientProjection.findFirst.mockResolvedValue({ id: 'p-1' } as any);
        prismaMock.billingIntent.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce({ id: 'b-1', tenantId: 't-1', facilityId: 'f-1', patientId: 'p-1', amount: 100000, correlationKey: 'c-1', status: 'pending' } as any);
        prismaMock.billingIntent.create.mockResolvedValue({ id: 'b-1', tenantId: 't-1', facilityId: 'f-1', patientId: 'p-1', amount: 100000, correlationKey: 'c-1', status: 'pending' } as any);
        const payload = { tenantId: 't-1', facilityId: 'f-1', patientId: 'p-1', amount: 100000, currency: 'VND', correlationKey: 'c-1' };
        await expect(HealthcareService.createBillingIntent(admin, payload)).resolves.toMatchObject({ id: 'b-1' });
        await expect(HealthcareService.createBillingIntent(admin, { ...payload, amount: 200000 })).rejects.toBeInstanceOf(ConflictError);
    });

    test('accepts a valid payment signature and rejects a tampered body', () => {
        const secret = 'test-secret';
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const body = JSON.stringify({ id: 'event-1', amount: 100 });
        const signature = crypto.createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');
        expect(HealthcareService.verifyPaymentWebhook(secret, body, signature, timestamp)).toBe(true);
        expect(HealthcareService.verifyPaymentWebhook(secret, `${body}x`, signature, timestamp)).toBe(false);
    });

    test('processes a payment event once and preserves replay idempotency', async () => {
        const intent = { id: 'b-1', tenantId: 't-1', facilityId: 'f-1', amount: 100000, status: 'pending' };
        prismaMock.billingIntent.findUnique.mockResolvedValue(intent as any);
        prismaMock.paymentEvent.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce({ id: 'e-1', provider: 'qr', eventId: 'evt-1' } as any);
        prismaMock.paymentEvent.create.mockResolvedValue({ id: 'e-1', provider: 'qr', eventId: 'evt-1', status: 'processed' } as any);
        prismaMock.billingIntent.update.mockResolvedValue({ ...intent, status: 'paid' } as any);
        (prismaMock.$transaction as jest.Mock).mockResolvedValueOnce([{ id: 'e-1' }, { ...intent, status: 'paid' }]);
        const data = { tenantId: 't-1', facilityId: 'f-1', billingIntentId: 'b-1', provider: 'qr', eventId: 'evt-1', eventType: 'payment.succeeded', status: 'paid', amount: 100000 };
        await expect(HealthcareService.processPaymentEvent(data)).resolves.toMatchObject({ duplicate: false });
        await expect(HealthcareService.processPaymentEvent(data)).resolves.toMatchObject({ duplicate: true });
    });

    test('does not allow refunds beyond the refundable balance', async () => {
        prismaMock.billingIntent.findUnique.mockResolvedValue({ id: 'b-1', tenantId: 't-1', facilityId: 'f-1', amount: 100000, status: 'paid' } as any);
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope' } as any);
        prismaMock.paymentRefund.findMany.mockResolvedValue([{ amount: 80000 }] as any);
        await expect(HealthcareService.requestRefund(admin, 'b-1', { amount: 30000, reason: 'duplicate charge' })).rejects.toBeInstanceOf(ConflictError);
    });

    test('validates family links and defaults consent to pending', () => {
        expect(parseFamilyLink({ dependentPatientId: 'p-2', relationship: 'child' })).toEqual({ dependentPatientId: 'p-2', relationship: 'child', consentStatus: 'pending' });
        expect(parseFamilyLink({ dependentPatientId: 'p-2', relationship: 'child', consentStatus: 'active' }).consentStatus).toBe('active');
        expect(() => parseFamilyLink({ dependentPatientId: 'p-2', relationship: 'child', consentStatus: 'revoked' })).toThrow('consentStatus');
    });

    test('creates an active family link only for two patients in the same facility', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope' } as any);
        prismaMock.patientProjection.findMany.mockResolvedValue([{ id: 'p-1' }, { id: 'p-2' }] as any);
        prismaMock.patientRelationship.findUnique.mockResolvedValue(null);
        prismaMock.patientRelationship.create.mockResolvedValue({ id: 'link-1', consentStatus: 'active' } as any);
        await expect(HealthcareService.createFamilyLink(admin, 't-1', 'f-1', 'p-1', { dependentPatientId: 'p-2', relationship: 'child', consentStatus: 'active' })).resolves.toMatchObject({ id: 'link-1' });
        expect(prismaMock.patientRelationship.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ tenantId: 't-1', facilityId: 'f-1', guardianPatientId: 'p-1', dependentPatientId: 'p-2', consentStatus: 'active', createdById: 'admin-1' }) }));
    });

    test('rejects self-links, cross-facility patients, and duplicate active links', async () => {
        await expect(HealthcareService.createFamilyLink(admin, 't-1', 'f-1', 'p-1', { dependentPatientId: 'p-1', relationship: 'self', consentStatus: 'pending' })).rejects.toBeInstanceOf(ConflictError);
        prismaMock.patientProjection.findMany.mockResolvedValue([{ id: 'p-1' }] as any);
        await expect(HealthcareService.createFamilyLink(admin, 't-1', 'f-1', 'p-1', { dependentPatientId: 'p-2', relationship: 'child', consentStatus: 'pending' })).rejects.toThrow('same active facility');
        prismaMock.patientProjection.findMany.mockResolvedValue([{ id: 'p-1' }, { id: 'p-2' }] as any);
        prismaMock.patientRelationship.findUnique.mockResolvedValue({ id: 'link-1', revokedAt: null } as any);
        await expect(HealthcareService.createFamilyLink(admin, 't-1', 'f-1', 'p-1', { dependentPatientId: 'p-2', relationship: 'child', consentStatus: 'pending' })).rejects.toBeInstanceOf(ConflictError);
    });

    test('revokes a family link without deleting history', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope' } as any);
        prismaMock.patientRelationship.findFirst.mockResolvedValue({ id: 'link-1', revokedAt: null } as any);
        prismaMock.patientRelationship.update.mockResolvedValue({ id: 'link-1', consentStatus: 'revoked' } as any);
        await expect(HealthcareService.revokeFamilyLink(admin, 't-1', 'f-1', 'link-1')).resolves.toMatchObject({ consentStatus: 'revoked' });
        expect(prismaMock.patientRelationship.update).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ consentStatus: 'revoked' }) }));
    });

    test('validates consent purpose, status, expiry, and unknown fields', () => {
        expect(parseConsent({ purpose: 'care', policyVersion: 'v1', expiresAt: '2099-01-01T00:00:00.000Z' })).toMatchObject({ purpose: 'care', status: 'active', policyVersion: 'v1' });
        expect(parseConsent({ purpose: 'marketing', status: 'withdrawn' }).status).toBe('withdrawn');
        expect(() => parseConsent({ purpose: 'care', status: 'active', secret: 'leak' })).toThrow('Unknown fields');
        expect(() => parseConsent({ purpose: 'care', status: 'invalid' })).toThrow('status');
    });

    test('captures consent by withdrawing the prior active version', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope' } as any);
        prismaMock.patientProjection.findFirst.mockResolvedValue({ id: 'p-1' } as any);
        prismaMock.consentRecord.updateMany.mockResolvedValue({ count: 1 } as any);
        prismaMock.consentRecord.create.mockResolvedValue({ id: 'c-2', purpose: 'care', status: 'active' } as any);
        (prismaMock.$transaction as jest.Mock).mockImplementationOnce(async (callback) => callback(prismaMock));
        await expect(HealthcareService.captureConsent(admin, 't-1', 'f-1', 'p-1', { purpose: 'care', status: 'active', policyVersion: 'v2' })).resolves.toMatchObject({ id: 'c-2' });
        expect(prismaMock.consentRecord.updateMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ patientId: 'p-1', purpose: 'care', status: 'active' }) }));
    });

    test('withdraws consent once and remains safe on replay', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope' } as any);
        prismaMock.consentRecord.findFirst.mockResolvedValueOnce({ id: 'c-1', tenantId: 't-1', facilityId: 'f-1', status: 'active', withdrawnAt: null } as any).mockResolvedValueOnce({ id: 'c-1', tenantId: 't-1', facilityId: 'f-1', status: 'withdrawn', withdrawnAt: new Date() } as any);
        prismaMock.consentRecord.update.mockResolvedValue({ id: 'c-1', status: 'withdrawn' } as any);
        await expect(HealthcareService.withdrawConsent(admin, 't-1', 'f-1', 'c-1')).resolves.toMatchObject({ status: 'withdrawn' });
        await expect(HealthcareService.withdrawConsent(admin, 't-1', 'f-1', 'c-1')).resolves.toMatchObject({ status: 'withdrawn' });
        expect(prismaMock.consentRecord.update).toHaveBeenCalledTimes(1);
    });

    test('does not expose consent outside patient facility scope', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope' } as any);
        prismaMock.patientProjection.findFirst.mockResolvedValue(null);
        await expect(HealthcareService.listConsents(admin, 't-1', 'f-1', 'other-patient')).rejects.toThrow('facility scope');
    });

    test('accepts supported payment event statuses only', () => {
        expect(parsePaymentEvent({ tenantId: 't', facilityId: 'f', billingIntentId: 'b', provider: 'qr', eventId: 'e', eventType: 'paid', status: 'paid' }).status).toBe('paid');
        expect(() => parsePaymentEvent({ tenantId: 't', facilityId: 'f', billingIntentId: 'b', provider: 'qr', eventId: 'e', eventType: 'paid', status: 'unknown' })).toThrow('unsupported payment status');
    });
});
