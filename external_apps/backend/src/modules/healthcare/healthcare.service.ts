import crypto from 'crypto';
import prisma from '../../config/prisma';
import { getERPNextClient } from './erpnext.client';
import { ConflictError, ForbiddenError, NotFoundError } from './healthcare.errors';

const TERMINAL = new Set(['cancelled', 'no_show', 'completed']);
const TRANSITIONS: Record<string, string[]> = {
    pending: ['confirmed', 'cancelled', 'no_show'],
    confirmed: ['checked_in', 'cancelled', 'no_show'],
    checked_in: ['in_progress', 'cancelled'],
    in_progress: ['completed', 'cancelled'],
};
const QUEUE_TRANSITIONS: Record<string, string[]> = {
    waiting: ['called', 'skipped', 'completed'],
    called: ['waiting', 'skipped', 'completed'],
    skipped: ['waiting', 'completed'],
    completed: [],
};
const PAYMENT_STATUSES = new Set(['paid', 'failed', 'cancelled', 'refunded', 'partially_refunded']);

type Actor = { id: string; role?: { name?: string; isSystem?: boolean } | null };

async function assertScope(actor: Actor, tenantId: string, facilityId: string, roles?: string[]) {
    if (actor.role?.isSystem && actor.role.name === 'Admin') return;
    const scope = await prisma.userRoleScope.findFirst({ where: { userId: actor.id, tenantId, ...(roles ? { role: { in: roles } } : {}), OR: [{ facilityId }, { facilityId: null }] } });
    if (!scope) throw new ForbiddenError();
}

function sameAppointmentRequest(prior: any, data: any) {
    return prior.patientId === data.patientId && prior.practitionerExternalId === data.practitionerExternalId && prior.serviceCode === data.serviceCode && prior.startsAt.getTime() === data.startsAt.getTime() && prior.endsAt.getTime() === data.endsAt.getTime();
}

function paymentTransitionAllowed(current: string, next: string) {
    if (!PAYMENT_STATUSES.has(next)) return false;
    if (current === next) return true;
    if (current === 'pending' || current === 'failed') return ['paid', 'cancelled', 'failed'].includes(next);
    if (current === 'paid') return ['partially_refunded', 'refunded'].includes(next);
    if (current === 'partially_refunded') return next === 'refunded';
    return false;
}

export class HealthcareService {
    static async searchPatients(actor: Actor, tenantId: string, facilityId: string, query?: string) {
        await assertScope(actor, tenantId, facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse', 'practitioner', 'finance']);
        return prisma.patientProjection.findMany({
            where: { tenantId, facilityId, ...(query ? { OR: [{ fullName: { contains: query.trim(), mode: 'insensitive' } }, { normalizedPhone: { contains: query.trim() } }] } : {}) },
            select: { id: true, fullName: true, phoneLast4: true, dateOfBirth: true, sex: true, status: true, createdAt: true },
            orderBy: { updatedAt: 'desc' }, take: 50,
        });
    }

    static async registerPatient(actor: Actor, data: { tenantId: string; facilityId: string; fullName: string; normalizedPhone: string; phoneLast4: string; dateOfBirth?: Date; sex?: string; address?: string }) {
        await assertScope(actor, data.tenantId, data.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist']);
        const existing = await prisma.patientProjection.findFirst({ where: { tenantId: data.tenantId, facilityId: data.facilityId, normalizedPhone: data.normalizedPhone }, select: { id: true, fullName: true, phoneLast4: true, dateOfBirth: true } });
        if (existing) throw new ConflictError('Possible duplicate patient; confirmation is required before linking', { candidate: existing });
        return prisma.patientProjection.create({ data: { ...data, createdById: actor.id } });
    }

    static async listFamilyLinks(actor: Actor, tenantId: string, facilityId: string, guardianPatientId: string) {
        await assertScope(actor, tenantId, facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse', 'practitioner']);
        const guardian = await prisma.patientProjection.findFirst({ where: { id: guardianPatientId, tenantId, facilityId, status: 'active' }, select: { id: true } });
        if (!guardian) throw new NotFoundError('Guardian patient not found in facility scope');
        return prisma.patientRelationship.findMany({
            where: { tenantId, facilityId, guardianPatientId, revokedAt: null },
            select: { id: true, relationship: true, consentStatus: true, consentCapturedAt: true, createdAt: true, dependent: { select: { id: true, fullName: true, phoneLast4: true, dateOfBirth: true, sex: true, status: true } } },
            orderBy: { createdAt: 'asc' },
        });
    }

    static async createFamilyLink(actor: Actor, tenantId: string, facilityId: string, guardianPatientId: string, data: { dependentPatientId: string; relationship: string; consentStatus: string }) {
        await assertScope(actor, tenantId, facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist']);
        if (guardianPatientId === data.dependentPatientId) throw new ConflictError('A patient cannot be linked to themselves');
        const patients = await prisma.patientProjection.findMany({ where: { id: { in: [guardianPatientId, data.dependentPatientId] }, tenantId, facilityId, status: 'active' }, select: { id: true } });
        if (patients.length !== 2) throw new NotFoundError('Both patients must exist in the same active facility scope');
        const existing = await prisma.patientRelationship.findUnique({ where: { tenantId_facilityId_guardianPatientId_dependentPatientId: { tenantId, facilityId, guardianPatientId, dependentPatientId: data.dependentPatientId } } });
        const linkData = { relationship: data.relationship, consentStatus: data.consentStatus, consentCapturedAt: data.consentStatus === 'active' ? new Date() : null, revokedAt: null };
        if (existing) {
            if (!existing.revokedAt) throw new ConflictError('Family link already exists');
            return prisma.patientRelationship.update({ where: { id: existing.id }, data: linkData });
        }
        return prisma.patientRelationship.create({ data: { tenantId, facilityId, guardianPatientId, dependentPatientId: data.dependentPatientId, ...linkData, createdById: actor.id } });
    }

    static async revokeFamilyLink(actor: Actor, tenantId: string, facilityId: string, linkId: string) {
        await assertScope(actor, tenantId, facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist']);
        const link = await prisma.patientRelationship.findFirst({ where: { id: linkId, tenantId, facilityId, revokedAt: null } });
        if (!link) throw new NotFoundError('Family link not found in facility scope');
        return prisma.patientRelationship.update({ where: { id: link.id }, data: { consentStatus: 'revoked', revokedAt: new Date() } });
    }

    static async listAppointments(actor: Actor, tenantId: string, facilityId: string, from?: Date, to?: Date) {
        await assertScope(actor, tenantId, facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse', 'practitioner', 'pharmacist', 'lab_technician', 'finance', 'hr_manager', 'auditor']);
        return prisma.appointment.findMany({ where: { tenantId, facilityId, ...(from || to ? { startsAt: { ...(from ? { gte: from } : {}), ...(to ? { lt: to } : {}) } } : {}) }, include: { patient: { select: { id: true, fullName: true, phoneLast4: true } } }, orderBy: { startsAt: 'asc' }, take: 200 });
    }

    static async createAppointment(actor: Actor, data: { tenantId: string; facilityId: string; patientId: string; practitionerExternalId: string; serviceCode: string; startsAt: Date; endsAt: Date; notes?: string; idempotencyKey: string }) {
        await assertScope(actor, data.tenantId, data.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse', 'practitioner']);
        const patient = await prisma.patientProjection.findFirst({ where: { id: data.patientId, tenantId: data.tenantId, facilityId: data.facilityId, status: 'active' }, select: { id: true } });
        if (!patient) throw new NotFoundError('Patient not found in facility scope');
        const prior = await prisma.appointment.findUnique({ where: { tenantId_facilityId_idempotencyKey: { tenantId: data.tenantId, facilityId: data.facilityId, idempotencyKey: data.idempotencyKey } } });
        if (prior) {
            if (!sameAppointmentRequest(prior, data)) throw new ConflictError('Idempotency key was already used for a different appointment payload');
            return prior;
        }
        const durationMs = data.endsAt.getTime() - data.startsAt.getTime();
        if (durationMs < 60 * 1000 || durationMs > 24 * 60 * 60 * 1000) throw new ConflictError('Appointment duration must be between 1 minute and 24 hours');
        const overlap = await prisma.appointment.findFirst({ where: { tenantId: data.tenantId, facilityId: data.facilityId, practitionerExternalId: data.practitionerExternalId, status: { notIn: [...TERMINAL] }, startsAt: { lt: data.endsAt }, endsAt: { gt: data.startsAt } }, select: { id: true, startsAt: true, endsAt: true } });
        if (overlap) throw new ConflictError('Practitioner already has an overlapping appointment', { appointmentId: overlap.id });
        try {
            return await prisma.appointment.create({ data: { ...data, createdById: actor.id } });
        } catch (error: any) {
            if (error?.code === 'P2002') {
                const raced = await prisma.appointment.findUnique({ where: { tenantId_facilityId_idempotencyKey: { tenantId: data.tenantId, facilityId: data.facilityId, idempotencyKey: data.idempotencyKey } } });
                if (raced && sameAppointmentRequest(raced, data)) return raced;
                throw new ConflictError('Appointment was created concurrently with a different payload');
            }
            throw error;
        }
    }

    static async createEncounter(actor: Actor, data: { tenantId: string; facilityId: string; patientId: string; appointmentId?: string; practitionerExternalId: string; reason: string; assessment: string }) {
        await assertScope(actor, data.tenantId, data.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'practitioner']);
        const patient = await prisma.patientProjection.findFirst({ where: { id: data.patientId, tenantId: data.tenantId, facilityId: data.facilityId, status: 'active' }, select: { id: true } });
        if (!patient) throw new NotFoundError('Patient not found in facility scope');
        if (data.appointmentId) {
            const appointment = await prisma.appointment.findFirst({ where: { id: data.appointmentId, tenantId: data.tenantId, facilityId: data.facilityId, patientId: data.patientId }, select: { id: true } });
            if (!appointment) throw new NotFoundError('Appointment not found in facility scope');
        }
        return prisma.encounter.create({ data: { ...data, status: 'draft' } });
    }

    static async submitEncounter(actor: Actor, id: string) {
        const encounter = await prisma.encounter.findUnique({ where: { id } });
        if (!encounter) throw new NotFoundError('Encounter not found');
        await assertScope(actor, encounter.tenantId, encounter.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'practitioner']);
        if (actor.role?.name === 'practitioner' && encounter.practitionerExternalId !== actor.id) throw new ForbiddenError('Only the assigned practitioner can sign this encounter');
        if (encounter.status !== 'draft' || !encounter.reason.trim() || !encounter.assessment.trim()) throw new ConflictError('Only complete draft encounters can be signed');
        const updated = await prisma.encounter.updateMany({ where: { id, status: 'draft' }, data: { status: 'signed', signedAt: new Date() } });
        if (updated.count !== 1) throw new ConflictError('Encounter was signed by another request');
        return prisma.encounter.findUniqueOrThrow({ where: { id } });
    }

    static async amendEncounter(actor: Actor, id: string, reason: string, patch: object) {
        const encounter = await prisma.encounter.findUnique({ where: { id } });
        if (!encounter) throw new NotFoundError('Encounter not found');
        await assertScope(actor, encounter.tenantId, encounter.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'practitioner']);
        if (encounter.status !== 'signed') throw new ConflictError('Only signed encounters can be amended');
        if (actor.role?.name === 'practitioner' && encounter.practitionerExternalId !== actor.id) throw new ForbiddenError('Only the assigned practitioner can amend this encounter');
        return prisma.clinicalAmendment.create({ data: { encounterId: id, reason, patch, createdById: actor.id } });
    }

    static async transitionAppointment(actor: Actor, id: string, status: string) {
        const appointment = await prisma.appointment.findUnique({ where: { id } });
        if (!appointment) throw new NotFoundError('Appointment not found');
        await assertScope(actor, appointment.tenantId, appointment.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse', 'practitioner']);
        if (!TRANSITIONS[appointment.status]?.includes(status)) throw new ConflictError(`Cannot transition appointment from ${appointment.status} to ${status}`);
        const updated = await prisma.appointment.updateMany({ where: { id, status: appointment.status, version: appointment.version }, data: { status, version: { increment: 1 } } });
        if (updated.count !== 1) throw new ConflictError('Appointment changed by another request; reload before retrying');
        return prisma.appointment.findUniqueOrThrow({ where: { id } });
    }

    static async checkInAppointment(actor: Actor, appointmentId: string, data: { priority: number; priorityReason?: string }) {
        const appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });
        if (!appointment) throw new NotFoundError('Appointment not found');
        await assertScope(actor, appointment.tenantId, appointment.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse']);
        if (appointment.status !== 'confirmed') throw new ConflictError('Only confirmed appointments can be checked in');
        const existing = await prisma.queueTicket.findUnique({ where: { appointmentId }, select: { id: true, ticketNumber: true, status: true } });
        if (existing) return existing;
        for (let attempt = 0; attempt < 3; attempt += 1) {
            try {
                return await prisma.$transaction(async (tx) => {
                    const queueDate = new Date(appointment.startsAt);
                    queueDate.setUTCHours(0, 0, 0, 0);
                    const last = await tx.queueTicket.findFirst({ where: { tenantId: appointment.tenantId, facilityId: appointment.facilityId, queueDate }, orderBy: { ticketNumber: 'desc' }, select: { ticketNumber: true } });
                    const ticketNumber = (last?.ticketNumber || 0) + 1;
                    const ticket = await tx.queueTicket.create({ data: { tenantId: appointment.tenantId, facilityId: appointment.facilityId, appointmentId, queueDate, ticketNumber, priority: data.priority, priorityReason: data.priorityReason, status: 'waiting' } });
                    const updated = await tx.appointment.updateMany({ where: { id: appointmentId, status: 'confirmed', version: appointment.version }, data: { status: 'checked_in', version: { increment: 1 } } });
                    if (updated.count !== 1) throw new ConflictError('Appointment changed by another request; check-in was rolled back');
                    return ticket;
                });
            } catch (error: any) {
                if (error?.code === 'P2002' && attempt < 2) continue;
                if (error?.code === 'P2002') return prisma.queueTicket.findUniqueOrThrow({ where: { appointmentId } });
                throw error;
            }
        }
        return prisma.queueTicket.findUniqueOrThrow({ where: { appointmentId } });
    }

    static async listQueue(actor: Actor, tenantId: string, facilityId: string, queueDate: Date, status?: string) {
        await assertScope(actor, tenantId, facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse', 'practitioner']);
        return prisma.queueTicket.findMany({ where: { tenantId, facilityId, queueDate, ...(status ? { status } : {}) }, include: { appointment: { include: { patient: { select: { id: true, fullName: true, phoneLast4: true } } } } }, orderBy: [{ priority: 'desc' }, { ticketNumber: 'asc' }] });
    }

    static async transitionQueueTicket(actor: Actor, id: string, status: string) {
        const ticket = await prisma.queueTicket.findUnique({ where: { id } });
        if (!ticket) throw new NotFoundError('Queue ticket not found');
        await assertScope(actor, ticket.tenantId, ticket.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse']);
        if (!QUEUE_TRANSITIONS[ticket.status]?.includes(status)) throw new ConflictError(`Cannot transition queue ticket from ${ticket.status} to ${status}`);
        const updated = await prisma.queueTicket.updateMany({ where: { id, status: ticket.status, version: ticket.version }, data: { status, version: { increment: 1 }, ...(status === 'called' ? { calledAt: new Date() } : {}), ...(status === 'completed' ? { completedAt: new Date() } : {}) } });
        if (updated.count !== 1) throw new ConflictError('Queue ticket changed by another request; reload before retrying');
        return prisma.queueTicket.findUniqueOrThrow({ where: { id } });
    }

    static async listBillingIntents(actor: Actor, query: { tenantId: string; facilityId: string; status?: string; provider?: string; from?: Date; to?: Date; take: number }) {
        await assertScope(actor, query.tenantId, query.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'finance', 'auditor']);
        const intents = await prisma.billingIntent.findMany({
            where: {
                tenantId: query.tenantId,
                facilityId: query.facilityId,
                ...(query.status ? { status: query.status } : {}),
                ...(query.from || query.to ? { createdAt: { ...(query.from ? { gte: query.from } : {}), ...(query.to ? { lt: query.to } : {}) } } : {}),
                ...(query.provider ? { events: { some: { provider: query.provider } } } : {}),
            },
            select: {
                id: true, patientId: true, appointmentId: true, correlationKey: true, amount: true, currency: true, status: true, erpnextName: true, lastError: true, createdAt: true, updatedAt: true,
                events: { orderBy: { receivedAt: 'desc' }, take: 10, select: { id: true, provider: true, eventId: true, eventType: true, status: true, amount: true, receivedAt: true, processedAt: true } },
                refunds: { orderBy: { createdAt: 'desc' }, take: 10, select: { id: true, amount: true, reason: true, status: true, createdAt: true, updatedAt: true } },
            },
            orderBy: { createdAt: 'desc' },
            take: query.take,
        });
        return intents;
    }

    static async getBillingERPNextStatus(actor: Actor, billingIntentId: string) {
        const intent = await prisma.billingIntent.findUnique({ where: { id: billingIntentId }, select: { id: true, tenantId: true, facilityId: true, amount: true, currency: true, status: true, erpnextName: true, lastError: true, updatedAt: true } });
        if (!intent) throw new NotFoundError('Billing intent not found');
        await assertScope(actor, intent.tenantId, intent.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'finance', 'auditor']);
        const client = getERPNextClient();
        if (!client) return { billingIntentId: intent.id, configured: false, linked: Boolean(intent.erpnextName), local: { amount: Number(intent.amount), currency: intent.currency, status: intent.status, updatedAt: intent.updatedAt }, erpnext: null, reconciliation: { status: 'unavailable', reason: 'ERPNext integration is not configured' } };
        if (!intent.erpnextName) return { billingIntentId: intent.id, configured: true, linked: false, local: { amount: Number(intent.amount), currency: intent.currency, status: intent.status, updatedAt: intent.updatedAt }, erpnext: null, reconciliation: { status: 'unlinked', reason: 'Billing intent has no ERPNext invoice reference' } };
        const invoice = await client.getSalesInvoice(intent.erpnextName);
        const amountMatches = invoice.grandTotal === null || Number(invoice.grandTotal) === Number(intent.amount);
        const currencyMatches = !invoice.currency || invoice.currency === intent.currency;
        const normalizedStatus = String(invoice.status || '').toLowerCase();
        const statusMatches = !normalizedStatus || normalizedStatus === String(intent.status).toLowerCase() || (intent.status === 'paid' && ['paid', 'completed'].includes(normalizedStatus));
        return { billingIntentId: intent.id, configured: true, linked: true, local: { amount: Number(intent.amount), currency: intent.currency, status: intent.status, updatedAt: intent.updatedAt }, erpnext: invoice, reconciliation: { status: amountMatches && currencyMatches && statusMatches ? 'matched' : 'attention_required', amountMatches, currencyMatches, statusMatches } };
    }

    static async createBillingIntent(actor: Actor, data: { tenantId: string; facilityId: string; patientId: string; appointmentId?: string; amount: number; currency: string; correlationKey: string }) {
        await assertScope(actor, data.tenantId, data.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'finance']);
        const patient = await prisma.patientProjection.findFirst({ where: { id: data.patientId, tenantId: data.tenantId, facilityId: data.facilityId, status: 'active' }, select: { id: true } });
        if (!patient) throw new NotFoundError('Patient not found in facility scope');
        if (data.appointmentId) {
            const appointment = await prisma.appointment.findFirst({ where: { id: data.appointmentId, tenantId: data.tenantId, facilityId: data.facilityId, patientId: data.patientId }, select: { id: true } });
            if (!appointment) throw new NotFoundError('Appointment not found in facility scope');
        }
        const prior = await prisma.billingIntent.findUnique({ where: { tenantId_correlationKey: { tenantId: data.tenantId, correlationKey: data.correlationKey } } });
        if (prior) {
            if (Number(prior.amount) !== data.amount || prior.patientId !== data.patientId || prior.facilityId !== data.facilityId) throw new ConflictError('Correlation key was already used for a different billing payload');
            return prior;
        }
        try {
            return await prisma.billingIntent.create({ data: { ...data, status: 'pending' } });
        } catch (error: any) {
            if (error?.code === 'P2002') return prisma.billingIntent.findUniqueOrThrow({ where: { tenantId_correlationKey: { tenantId: data.tenantId, correlationKey: data.correlationKey } } });
            throw error;
        }
    }

    static verifyPaymentWebhook(secret: string, body: string, signature: string, timestamp: string) {
        const timestampNumber = Number(timestamp);
        if (!Number.isInteger(timestampNumber) || Math.abs(Date.now() - timestampNumber * 1000) > 5 * 60 * 1000) return false;
        const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex');
        const supplied = signature.startsWith('sha256=') ? signature.slice(7) : signature;
        return supplied.length === expected.length && crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
    }

    static async processPaymentEvent(data: { tenantId: string; facilityId: string; billingIntentId: string; provider: string; eventId: string; eventType: string; status: string; amount?: number }) {
        const intent = await prisma.billingIntent.findUnique({ where: { id: data.billingIntentId } });
        if (!intent) throw new NotFoundError('Billing intent not found');
        if (intent.tenantId !== data.tenantId || intent.facilityId !== data.facilityId) throw new ForbiddenError('Payment event is outside billing scope');
        if (data.amount !== undefined && Number(intent.amount) !== data.amount) throw new ConflictError('Payment amount does not match billing intent');
        const existing = await prisma.paymentEvent.findUnique({ where: { provider_eventId: { provider: data.provider, eventId: data.eventId } } });
        if (existing) return { duplicate: true, event: existing, billingIntent: intent };
        if (!paymentTransitionAllowed(intent.status, data.status)) throw new ConflictError(`Cannot transition billing intent from ${intent.status} to ${data.status}`);
        try {
            const [event, billingIntent] = await prisma.$transaction([
                prisma.paymentEvent.create({ data: { ...data, status: 'processed', payloadHash: crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex'), amount: data.amount } }),
                prisma.billingIntent.update({ where: { id: intent.id }, data: { status: data.status } }),
            ]);
            return { duplicate: false, event, billingIntent };
        } catch (error: any) {
            if (error?.code === 'P2002') {
                const raced = await prisma.paymentEvent.findUnique({ where: { provider_eventId: { provider: data.provider, eventId: data.eventId } } });
                if (raced) return { duplicate: true, event: raced, billingIntent: intent };
            }
            throw error;
        }
    }

    static async listConsents(actor: Actor, tenantId: string, facilityId: string, patientId: string) {
        await assertScope(actor, tenantId, facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse', 'practitioner', 'finance', 'auditor']);
        const patient = await prisma.patientProjection.findFirst({ where: { id: patientId, tenantId, facilityId }, select: { id: true } });
        if (!patient) throw new NotFoundError('Patient not found in facility scope');
        return prisma.consentRecord.findMany({
            where: { tenantId, facilityId, patientId },
            orderBy: [{ purpose: 'asc' }, { capturedAt: 'desc' }],
            select: { id: true, purpose: true, legalBasis: true, policyVersion: true, status: true, capturedAt: true, expiresAt: true, withdrawnAt: true },
        });
    }

    static async captureConsent(actor: Actor, tenantId: string, facilityId: string, patientId: string, data: { purpose: string; legalBasis?: string; policyVersion?: string; status: string; expiresAt?: Date }) {
        await assertScope(actor, tenantId, facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse', 'practitioner']);
        const patient = await prisma.patientProjection.findFirst({ where: { id: patientId, tenantId, facilityId, status: 'active' }, select: { id: true } });
        if (!patient) throw new NotFoundError('Patient not found in facility scope');
        if (data.expiresAt && data.expiresAt <= new Date()) throw new ConflictError('Consent expiry must be in the future');
        try {
            return await prisma.$transaction(async (tx) => {
                if (data.status === 'active') {
                    await tx.consentRecord.updateMany({
                        where: { tenantId, facilityId, patientId, purpose: data.purpose, status: 'active', withdrawnAt: null },
                        data: { status: 'withdrawn', withdrawnAt: new Date() },
                    });
                }
                return tx.consentRecord.create({ data: { tenantId, facilityId, patientId, purpose: data.purpose, legalBasis: data.legalBasis, policyVersion: data.policyVersion, status: data.status, expiresAt: data.expiresAt, ...(data.status === 'withdrawn' ? { withdrawnAt: new Date() } : {}) } });
            });
        } catch (error: any) {
            if (error?.code === 'P2002') throw new ConflictError('Consent changed by another request; reload and retry');
            throw error;
        }
    }

    static async withdrawConsent(actor: Actor, tenantId: string, facilityId: string, consentId: string) {
        await assertScope(actor, tenantId, facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse', 'practitioner']);
        const consent = await prisma.consentRecord.findFirst({ where: { id: consentId, tenantId, facilityId } });
        if (!consent) throw new NotFoundError('Consent record not found in facility scope');
        if (consent.status === 'withdrawn' || consent.withdrawnAt) return consent;
        return prisma.consentRecord.update({ where: { id: consentId }, data: { status: 'withdrawn', withdrawnAt: new Date() } });
    }

    static async requestRefund(actor: Actor, billingIntentId: string, data: { amount: number; reason: string }) {
        const intent = await prisma.billingIntent.findUnique({ where: { id: billingIntentId } });
        if (!intent) throw new NotFoundError('Billing intent not found');
        await assertScope(actor, intent.tenantId, intent.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'finance']);
        if (!['paid', 'partially_refunded'].includes(intent.status)) throw new ConflictError('Only paid billing intents can be refunded');
        const existing = await prisma.paymentRefund.findMany({ where: { billingIntentId, status: { notIn: ['rejected', 'cancelled'] } }, select: { amount: true } });
        const alreadyRequested = existing.reduce((total, refund) => total + Number(refund.amount), 0);
        if (alreadyRequested + data.amount > Number(intent.amount)) throw new ConflictError('Refund amount exceeds the refundable balance');
        return prisma.paymentRefund.create({ data: { tenantId: intent.tenantId, facilityId: intent.facilityId, billingIntentId, amount: data.amount, reason: data.reason, status: 'requested', requestedById: actor.id } });
    }
}

export { assertScope };
