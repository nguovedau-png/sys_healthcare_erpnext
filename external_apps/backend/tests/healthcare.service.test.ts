import { prismaMock } from './setup';
import { ConflictError, ForbiddenError } from '../src/modules/healthcare/healthcare.errors';
import { HealthcareService } from '../src/modules/healthcare/healthcare.service';

describe('healthcare service rules', () => {
    const admin = { id: 'admin-1', role: { name: 'Admin', isSystem: true } };
    const patientData = { tenantId: 'tenant-1', facilityId: 'facility-1', fullName: 'Nguyen Van A', normalizedPhone: '+84901234567', phoneLast4: '4567' };

    test('returns duplicate candidate without creating a second patient', async () => {
        prismaMock.patientProjection.findFirst.mockResolvedValue({ id: 'patient-1', fullName: 'Nguyen Van A', phoneLast4: '4567', dateOfBirth: null } as any);
        await expect(HealthcareService.registerPatient(admin, patientData)).rejects.toMatchObject({ statusCode: 409, code: 'CONFLICT' });
        expect(prismaMock.patientProjection.create).not.toHaveBeenCalled();
    });

    test('denies non-scoped actor', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue(null);
        await expect(HealthcareService.searchPatients({ id: 'user-1', role: { name: 'receptionist', isSystem: false } }, 'tenant-1', 'facility-1')).rejects.toBeInstanceOf(ForbiddenError);
    });

    test('rejects overlapping practitioner appointment', async () => {
        prismaMock.patientProjection.findFirst.mockResolvedValue({ id: 'patient-1' } as any);
        prismaMock.appointment.findUnique.mockResolvedValue(null);
        prismaMock.appointment.findFirst.mockResolvedValue({ id: 'appointment-existing', startsAt: new Date(), endsAt: new Date() } as any);
        await expect(HealthcareService.createAppointment(admin, { ...patientData, patientId: 'patient-1', practitionerExternalId: 'doc-1', serviceCode: 'general', startsAt: new Date(Date.now() + 3600000), endsAt: new Date(Date.now() + 7200000), idempotencyKey: 'request-1' })).rejects.toBeInstanceOf(ConflictError);
        expect(prismaMock.appointment.create).not.toHaveBeenCalled();
    });

    test('transitions an appointment using the current status and version', async () => {
        const appointment = { id: 'appointment-1', tenantId: 'tenant-1', facilityId: 'facility-1', status: 'pending', version: 3 };
        prismaMock.appointment.findUnique.mockResolvedValue(appointment as any);
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope-1' } as any);
        prismaMock.appointment.updateMany.mockResolvedValue({ count: 1 } as any);
        prismaMock.appointment.findUniqueOrThrow.mockResolvedValue({ ...appointment, status: 'confirmed', version: 4 } as any);
        await expect(HealthcareService.transitionAppointment({ id: 'user-1', role: { name: 'receptionist', isSystem: false } }, 'appointment-1', 'confirmed')).resolves.toMatchObject({ status: 'confirmed', version: 4 });
        expect(prismaMock.appointment.updateMany).toHaveBeenCalledWith({ where: { id: 'appointment-1', status: 'pending', version: 3 }, data: { status: 'confirmed', version: { increment: 1 } } });
    });

    test('rejects signing an encounter by a different practitioner', async () => {
        prismaMock.encounter.findUnique.mockResolvedValue({ id: 'encounter-1', tenantId: 'tenant-1', facilityId: 'facility-1', practitionerExternalId: 'doc-1', status: 'draft', reason: 'follow-up', assessment: 'stable' } as any);
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'scope-1' } as any);
        await expect(HealthcareService.submitEncounter({ id: 'doc-2', role: { name: 'practitioner', isSystem: false } }, 'encounter-1')).rejects.toBeInstanceOf(ForbiddenError);
        expect(prismaMock.encounter.updateMany).not.toHaveBeenCalled();
    });

    test('rejects reuse of idempotency key with a different payload', async () => {
        const existing = { id: 'appointment-existing', status: 'pending', patientId: 'patient-1', practitionerExternalId: 'doc-1', serviceCode: 'general', startsAt: new Date(Date.now() + 3600000), endsAt: new Date(Date.now() + 7200000) };
        prismaMock.patientProjection.findFirst.mockResolvedValue({ id: 'patient-1' } as any);
        prismaMock.appointment.findUnique.mockResolvedValue(existing as any);
        await expect(HealthcareService.createAppointment(admin, { ...patientData, patientId: 'patient-1', practitionerExternalId: 'doc-2', serviceCode: 'general', startsAt: existing.startsAt, endsAt: existing.endsAt, idempotencyKey: 'request-1' })).rejects.toMatchObject({ statusCode: 409 });
        expect(prismaMock.appointment.create).not.toHaveBeenCalled();
    });

    test('allows a tenant-wide role scope to access a facility', async () => {
        prismaMock.userRoleScope.findFirst.mockResolvedValue({ id: 'tenant-scope', facilityId: null } as any);
        prismaMock.patientProjection.findMany.mockResolvedValue([]);
        await expect(HealthcareService.searchPatients({ id: 'tenant-admin', role: { name: 'tenant_admin', isSystem: false } }, 'tenant-1', 'facility-1')).resolves.toEqual([]);
        expect(prismaMock.userRoleScope.findFirst).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ OR: [{ facilityId: 'facility-1' }, { facilityId: null }] }) }));
    });

    test('returns existing appointment for repeated idempotency key', async () => {
        const startsAt = new Date(Date.now() + 3600000);
        const endsAt = new Date(Date.now() + 7200000);
        const existing = { id: 'appointment-existing', status: 'pending', patientId: 'patient-1', practitionerExternalId: 'doc-1', serviceCode: 'general', startsAt, endsAt };
        prismaMock.patientProjection.findFirst.mockResolvedValue({ id: 'patient-1' } as any);
        prismaMock.appointment.findUnique.mockResolvedValue(existing as any);
        await expect(HealthcareService.createAppointment(admin, { ...patientData, patientId: 'patient-1', practitionerExternalId: 'doc-1', serviceCode: 'general', startsAt, endsAt, idempotencyKey: 'request-1' })).resolves.toEqual(existing);
        expect(prismaMock.appointment.create).not.toHaveBeenCalled();
    });
});
