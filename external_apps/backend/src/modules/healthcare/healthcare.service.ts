import prisma from '../../config/prisma';
import { ConflictError, ForbiddenError, NotFoundError } from './healthcare.errors';

const TERMINAL = new Set(['cancelled', 'no_show', 'completed']);
const TRANSITIONS: Record<string, string[]> = {
    pending: ['confirmed', 'cancelled', 'no_show'],
    confirmed: ['checked_in', 'cancelled', 'no_show'],
    checked_in: ['in_progress', 'cancelled'],
    in_progress: ['completed', 'cancelled'],
};

type Actor = { id: string; role?: { name?: string; isSystem?: boolean } | null };

async function assertScope(actor: Actor, tenantId: string, facilityId: string, roles?: string[]) {
    if (actor.role?.isSystem && actor.role.name === 'Admin') return;
    const scope = await prisma.userRoleScope.findFirst({ where: { userId: actor.id, tenantId, facilityId, ...(roles ? { role: { in: roles } } : {}) } });
    if (!scope) throw new ForbiddenError();
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

    static async listAppointments(actor: Actor, tenantId: string, facilityId: string, from?: Date, to?: Date) {
        await assertScope(actor, tenantId, facilityId);
        return prisma.appointment.findMany({ where: { tenantId, facilityId, ...(from || to ? { startsAt: { ...(from ? { gte: from } : {}), ...(to ? { lt: to } : {}) } } : {}) }, include: { patient: { select: { id: true, fullName: true, phoneLast4: true } } }, orderBy: { startsAt: 'asc' }, take: 200 });
    }

    static async createAppointment(actor: Actor, data: { tenantId: string; facilityId: string; patientId: string; practitionerExternalId: string; serviceCode: string; startsAt: Date; endsAt: Date; notes?: string; idempotencyKey: string }) {
        await assertScope(actor, data.tenantId, data.facilityId, ['platform_admin', 'tenant_admin', 'facility_admin', 'receptionist', 'nurse', 'practitioner']);
        const patient = await prisma.patientProjection.findFirst({ where: { id: data.patientId, tenantId: data.tenantId, facilityId: data.facilityId, status: 'active' }, select: { id: true } });
        if (!patient) throw new NotFoundError('Patient not found in facility scope');
        const prior = await prisma.appointment.findUnique({ where: { tenantId_facilityId_idempotencyKey: { tenantId: data.tenantId, facilityId: data.facilityId, idempotencyKey: data.idempotencyKey } } });
        if (prior) return prior;
        const durationMs = data.endsAt.getTime() - data.startsAt.getTime();
        if (durationMs <= 0 || durationMs > 24 * 60 * 60 * 1000) throw new ConflictError('Appointment duration must be between 1 minute and 24 hours');
        const overlap = await prisma.appointment.findFirst({ where: { tenantId: data.tenantId, facilityId: data.facilityId, practitionerExternalId: data.practitionerExternalId, status: { notIn: [...TERMINAL] }, startsAt: { lt: data.endsAt }, endsAt: { gt: data.startsAt } }, select: { id: true, startsAt: true, endsAt: true } });
        if (overlap) throw new ConflictError('Practitioner already has an overlapping appointment', { appointmentId: overlap.id });
        try {
            return await prisma.appointment.create({ data: { ...data, createdById: actor.id } });
        } catch (error: any) {
            if (error?.code === 'P2002') return prisma.appointment.findUniqueOrThrow({ where: { tenantId_facilityId_idempotencyKey: { tenantId: data.tenantId, facilityId: data.facilityId, idempotencyKey: data.idempotencyKey } } });
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
        return prisma.clinicalAmendment.create({ data: { encounterId: id, reason, patch, createdById: actor.id } });
    }

    static async transitionAppointment(actor: Actor, id: string, status: string) {
        const appointment = await prisma.appointment.findUnique({ where: { id } });
        if (!appointment) throw new NotFoundError('Appointment not found');
        await assertScope(actor, appointment.tenantId, appointment.facilityId);
        if (!TRANSITIONS[appointment.status]?.includes(status)) throw new ConflictError(`Cannot transition appointment from ${appointment.status} to ${status}`);
        const updated = await prisma.appointment.updateMany({ where: { id, status: appointment.status, version: appointment.version }, data: { status, version: { increment: 1 } } });
        if (updated.count !== 1) throw new ConflictError('Appointment changed by another request; reload before retrying');
        return prisma.appointment.findUniqueOrThrow({ where: { id } });
    }
}

export { assertScope };
