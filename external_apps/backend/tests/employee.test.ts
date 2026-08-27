import request from 'supertest';
import app from '../src/index';
import { prismaMock } from './setup';
import { signToken } from '../src/utils/jwt';

describe('Employee API', () => {
    let adminToken: string;

    beforeAll(() => {
        adminToken = signToken({ userId: 'admin-id', role: 'Admin' });
    });

    describe('POST /api/v1/employees', () => {
        it('should create an employee', async () => {
            // Middleware fetch
            prismaMock.user.findUnique.mockResolvedValueOnce({
                id: 'admin-id',
                role: { isSystem: true, name: 'Admin', permissions: [] }
            } as any);

            const employeeData = {
                userId: 'user-id',
                departmentId: 'dept-id',
                position: 'Developer',
                salary: 5000,
                hireDate: new Date().toISOString()
            };

            prismaMock.employee.findUnique.mockResolvedValue(null);
            prismaMock.employee.create.mockResolvedValue({ id: 'emp-1', ...employeeData } as any);

            const res = await request(app)
                .post('/api/v1/employees')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(employeeData);

            expect(res.status).toBe(201);
            expect(res.body.data.position).toBe('Developer');
        });
    });
});
