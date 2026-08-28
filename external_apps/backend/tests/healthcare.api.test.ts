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
});
