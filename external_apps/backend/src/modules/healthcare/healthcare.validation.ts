import { BadRequestError } from './healthcare.errors';

const ALLOWED_PATIENT_FIELDS = new Set(['fullName', 'phone', 'dateOfBirth', 'sex', 'address', 'tenantId', 'facilityId']);
const ALLOWED_APPOINTMENT_FIELDS = new Set(['patientId', 'practitionerExternalId', 'serviceCode', 'startsAt', 'endsAt', 'notes', 'tenantId', 'facilityId', 'idempotencyKey']);
const ALLOWED_ENCOUNTER_FIELDS = new Set(['patientId', 'appointmentId', 'practitionerExternalId', 'reason', 'assessment', 'tenantId', 'facilityId']);
const ALLOWED_BILLING_FIELDS = new Set(['tenantId', 'facilityId', 'patientId', 'appointmentId', 'amount', 'currency', 'correlationKey']);
const ALLOWED_PAYMENT_EVENT_FIELDS = new Set(['tenantId', 'facilityId', 'billingIntentId', 'provider', 'eventId', 'eventType', 'status', 'amount']);
const ALLOWED_REFUND_FIELDS = new Set(['amount', 'reason']);
const ALLOWED_FAMILY_FIELDS = new Set(['dependentPatientId', 'relationship', 'consentStatus']);

export function assertObject(value: unknown, name: string): asserts value is Record<string, unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new BadRequestError(`${name} must be an object`);
}

function rejectUnknown(body: Record<string, unknown>, allowed: Set<string>) {
    const unknown = Object.keys(body).filter((key) => !allowed.has(key));
    if (unknown.length) throw new BadRequestError(`Unknown fields: ${unknown.join(', ')}`);
}

export function normalizeVietnamPhone(value: unknown): { normalized: string; last4: string } {
    if (typeof value !== 'string') throw new BadRequestError('phone is required');
    const compact = value.trim().replace(/[ .()-]/g, '');
    let normalized = compact;
    if (/^0\d{9}$/.test(compact)) normalized = `+84${compact.slice(1)}`;
    if (!/^\+84(?:3|5|7|8|9)\d{8}$/.test(normalized)) throw new BadRequestError('phone must be a valid Vietnamese mobile number');
    return { normalized, last4: normalized.slice(-4) };
}

function nonEmpty(value: unknown, field: string, max = 255): string {
    if (typeof value !== 'string' || !value.trim() || value.length > max) throw new BadRequestError(`${field} is required and must be <= ${max} characters`);
    return value.trim();
}

function optionalString(value: unknown, field: string, max = 255): string | undefined {
    if (value === undefined || value === null || value === '') return undefined;
    return nonEmpty(value, field, max);
}

function optionalDate(value: unknown, field: string): Date | undefined {
    if (value === undefined || value === null || value === '') return undefined;
    if (typeof value !== 'string') throw new BadRequestError(`${field} must be an ISO date`);
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) throw new BadRequestError(`${field} must be an ISO date`);
    return date;
}

function positiveAmount(value: unknown, field = 'amount'): number {
    const amount = typeof value === 'number' ? value : typeof value === 'string' && value.trim() ? Number(value) : NaN;
    if (!Number.isFinite(amount) || amount <= 0 || amount > 1_000_000_000_000 || Math.round(amount * 100) !== amount * 100) throw new BadRequestError(`${field} must be a positive amount with at most 2 decimal places`);
    return amount;
}

export function parseScopeQuery(query: unknown) {
    assertObject(query, 'query');
    rejectUnknown(query, new Set(['tenantId', 'facilityId', 'q', 'from', 'to']));
    return {
        tenantId: nonEmpty(query.tenantId, 'tenantId', 100),
        facilityId: nonEmpty(query.facilityId, 'facilityId', 100),
        q: optionalString(query.q, 'q', 160),
        from: optionalDate(query.from, 'from'),
        to: optionalDate(query.to, 'to'),
    };
}

export function parsePatient(body: unknown) {
    assertObject(body, 'patient');
    rejectUnknown(body, ALLOWED_PATIENT_FIELDS);
    const phone = normalizeVietnamPhone(body.phone);
    return {
        fullName: nonEmpty(body.fullName, 'fullName', 160),
        normalizedPhone: phone.normalized,
        phoneLast4: phone.last4,
        dateOfBirth: optionalDate(body.dateOfBirth, 'dateOfBirth'),
        sex: optionalString(body.sex, 'sex', 32),
        address: optionalString(body.address, 'address', 500),
        tenantId: nonEmpty(body.tenantId, 'tenantId', 100),
        facilityId: nonEmpty(body.facilityId, 'facilityId', 100),
    };
}

export function parseAppointment(body: unknown) {
    assertObject(body, 'appointment');
    rejectUnknown(body, ALLOWED_APPOINTMENT_FIELDS);
    const startsAt = optionalDate(body.startsAt, 'startsAt');
    const endsAt = optionalDate(body.endsAt, 'endsAt');
    if (!startsAt || !endsAt || endsAt <= startsAt) throw new BadRequestError('endsAt must be after startsAt');
    if (startsAt.getTime() < Date.now() - 60_000) throw new BadRequestError('startsAt cannot be in the past');
    const idempotencyKey = nonEmpty(body.idempotencyKey, 'idempotencyKey', 128);
    return {
        tenantId: nonEmpty(body.tenantId, 'tenantId', 100),
        facilityId: nonEmpty(body.facilityId, 'facilityId', 100),
        patientId: nonEmpty(body.patientId, 'patientId', 100),
        practitionerExternalId: nonEmpty(body.practitionerExternalId, 'practitionerExternalId', 160),
        serviceCode: nonEmpty(body.serviceCode, 'serviceCode', 100),
        startsAt,
        endsAt,
        notes: optionalString(body.notes, 'notes', 1000),
        idempotencyKey,
    };
}

export function parseEncounter(body: unknown) {
    assertObject(body, 'encounter');
    rejectUnknown(body, ALLOWED_ENCOUNTER_FIELDS);
    return {
        tenantId: nonEmpty(body.tenantId, 'tenantId', 100),
        facilityId: nonEmpty(body.facilityId, 'facilityId', 100),
        patientId: nonEmpty(body.patientId, 'patientId', 100),
        appointmentId: optionalString(body.appointmentId, 'appointmentId', 100),
        practitionerExternalId: nonEmpty(body.practitionerExternalId, 'practitionerExternalId', 160),
        reason: nonEmpty(body.reason, 'reason', 2000),
        assessment: nonEmpty(body.assessment, 'assessment', 10000),
    };
}

export function parseAmendment(body: unknown) {
    assertObject(body, 'amendment');
    rejectUnknown(body, new Set(['reason', 'patch']));
    const reason = nonEmpty(body.reason, 'reason', 1000);
    if (!body.patch || typeof body.patch !== 'object' || Array.isArray(body.patch)) throw new BadRequestError('patch must be an object');
    if (JSON.stringify(body.patch).length > 20000) throw new BadRequestError('patch is too large');
    return { reason, patch: body.patch };
}

export function parseTransition(value: unknown) {
    const status = nonEmpty(value, 'status', 32);
    if (!['confirmed', 'checked_in', 'in_progress', 'completed', 'cancelled', 'no_show'].includes(status)) throw new BadRequestError('unsupported appointment status');
    return status;
}

export function parseQueueQuery(query: unknown) {
    assertObject(query, 'query');
    rejectUnknown(query, new Set(['tenantId', 'facilityId', 'queueDate', 'status']));
    const queueDate = optionalDate(query.queueDate, 'queueDate');
    const status = optionalString(query.status, 'status', 32);
    if (status && !['waiting', 'called', 'skipped', 'completed'].includes(status)) throw new BadRequestError('unsupported queue status');
    return {
        tenantId: nonEmpty(query.tenantId, 'tenantId', 100),
        facilityId: nonEmpty(query.facilityId, 'facilityId', 100),
        queueDate,
        status,
    };
}

export function parseQueueTransition(value: unknown) {
    const status = nonEmpty(value, 'status', 32);
    if (!['waiting', 'called', 'skipped', 'completed'].includes(status)) throw new BadRequestError('unsupported queue status');
    return status;
}

export function parseQueueCheckIn(body: unknown) {
    assertObject(body, 'checkIn');
    rejectUnknown(body, new Set(['priority', 'priorityReason']));
    const priority = body.priority === undefined ? 0 : Number(body.priority);
    if (!Number.isInteger(priority) || priority < 0 || priority > 100) throw new BadRequestError('priority must be an integer from 0 to 100');
    return { priority, priorityReason: optionalString(body.priorityReason, 'priorityReason', 500) };
}

export function parseBillingIntent(body: unknown) {
    assertObject(body, 'billingIntent');
    rejectUnknown(body, ALLOWED_BILLING_FIELDS);
    const currency = (optionalString(body.currency, 'currency', 3) || 'VND').toUpperCase();
    if (!/^[A-Z]{3}$/.test(currency)) throw new BadRequestError('currency must be a 3-letter code');
    return {
        tenantId: nonEmpty(body.tenantId, 'tenantId', 100),
        facilityId: nonEmpty(body.facilityId, 'facilityId', 100),
        patientId: nonEmpty(body.patientId, 'patientId', 100),
        appointmentId: optionalString(body.appointmentId, 'appointmentId', 100),
        amount: positiveAmount(body.amount),
        currency,
        correlationKey: nonEmpty(body.correlationKey, 'correlationKey', 128),
    };
}

export function parsePaymentEvent(body: unknown) {
    assertObject(body, 'paymentEvent');
    rejectUnknown(body, ALLOWED_PAYMENT_EVENT_FIELDS);
    const status = nonEmpty(body.status, 'status', 32).toLowerCase();
    if (!['paid', 'failed', 'cancelled', 'refunded', 'partially_refunded'].includes(status)) throw new BadRequestError('unsupported payment status');
    return {
        tenantId: nonEmpty(body.tenantId, 'tenantId', 100),
        facilityId: nonEmpty(body.facilityId, 'facilityId', 100),
        billingIntentId: nonEmpty(body.billingIntentId, 'billingIntentId', 100),
        provider: nonEmpty(body.provider, 'provider', 64),
        eventId: nonEmpty(body.eventId, 'eventId', 200),
        eventType: nonEmpty(body.eventType, 'eventType', 100),
        status,
        amount: body.amount === undefined ? undefined : positiveAmount(body.amount),
    };
}

export function parseFamilyLink(body: unknown) {
    assertObject(body, 'familyLink');
    rejectUnknown(body, ALLOWED_FAMILY_FIELDS);
    const consentStatus = optionalString(body.consentStatus, 'consentStatus', 32) || 'pending';
    if (!['pending', 'active'].includes(consentStatus)) throw new BadRequestError('consentStatus must be pending or active');
    return {
        dependentPatientId: nonEmpty(body.dependentPatientId, 'dependentPatientId', 100),
        relationship: nonEmpty(body.relationship, 'relationship', 80),
        consentStatus,
    };
}

export function parseRefund(body: unknown) {
    assertObject(body, 'refund');
    rejectUnknown(body, ALLOWED_REFUND_FIELDS);
    return { amount: positiveAmount(body.amount), reason: nonEmpty(body.reason, 'reason', 1000) };
}
