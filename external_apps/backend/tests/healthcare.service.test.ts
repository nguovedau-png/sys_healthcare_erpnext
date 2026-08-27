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

    test('returns existing appointment for repeated idempotency key', async () => {
        const existing = { id: 'appointment-existing', status: 'pending' };
        prismaMock.patientProjection.findFirst.mockResolvedValue({ id: 'patient-1' } as any);
        prismaMock.appointment.findUnique.mockResolvedValue(existing as any);
        await expect(HealthcareService.createAppointment(admin, { ...patientData, patientId: 'patient-1', practitionerExternalId: 'doc-1', serviceCode: 'general', startsAt: new Date(Date.now() + 3600000), endsAt: new Date(Date.now() + 7200000), idempotencyKey: 'request-1' })).resolves.toEqual(existing);
        expect(prismaMock.appointment.create).not.toHaveBeenCalled();
    });
});
