import { BadRequestError } from '../src/modules/healthcare/healthcare.errors';
import { normalizeVietnamPhone, parseAppointment, parseBillingQuery, parsePatient, parseTransition } from '../src/modules/healthcare/healthcare.validation';

describe('healthcare validation', () => {
    test('normalizes Vietnamese mobile phones and redacts to last four digits', () => {
        expect(normalizeVietnamPhone('090 123 4567')).toEqual({ normalized: '+84901234567', last4: '4567' });
    });

    test('rejects invalid Vietnamese phone prefixes', () => {
        expect(() => normalizeVietnamPhone('0123456789')).toThrow(BadRequestError);
    });

    test('rejects unknown patient fields', () => {
        expect(() => parsePatient({ fullName: 'Nguyen Van A', phone: '0901234567', tenantId: 't', facilityId: 'f', secret: 'x' })).toThrow('Unknown fields: secret');
    });

    test('rejects appointments in the past and backwards ranges', () => {
        expect(() => parseAppointment({ tenantId: 't', facilityId: 'f', patientId: 'p', practitionerExternalId: 'doc-1', serviceCode: 'general', idempotencyKey: 'k', startsAt: '2020-01-01T08:00:00.000Z', endsAt: '2020-01-01T09:00:00.000Z' })).toThrow('startsAt cannot be in the past');
        const startsAt = new Date(Date.now() + 3600000).toISOString();
        const endsAt = new Date(Date.now() + 1800000).toISOString();
        expect(() => parseAppointment({ tenantId: 't', facilityId: 'f', patientId: 'p', practitionerExternalId: 'doc-1', serviceCode: 'general', idempotencyKey: 'k', startsAt, endsAt })).toThrow('endsAt must be after startsAt');
    });

    test('parses bounded billing reconciliation filters with safe defaults', () => {
        expect(parseBillingQuery({ tenantId: 't', facilityId: 'f' })).toMatchObject({ tenantId: 't', facilityId: 'f', take: 50 });
        expect(parseBillingQuery({ tenantId: 't', facilityId: 'f', status: 'paid', provider: 'vietqr', take: '25' })).toMatchObject({ status: 'paid', provider: 'vietqr', take: 25 });
        expect(() => parseBillingQuery({ tenantId: 't', facilityId: 'f', status: 'unknown' })).toThrow('unsupported billing status');
        expect(() => parseBillingQuery({ tenantId: 't', facilityId: 'f', take: 201 })).toThrow('take must be an integer from 1 to 200');
        expect(() => parseBillingQuery({ tenantId: 't', facilityId: 'f', from: '2026-08-29T00:00:00.000Z', to: '2026-08-28T00:00:00.000Z' })).toThrow('to must be after from');
    });

    test('allows only forward appointment statuses', () => {
        expect(parseTransition('checked_in')).toBe('checked_in');
        expect(() => parseTransition('pending')).toThrow('unsupported appointment status');
    });
});
