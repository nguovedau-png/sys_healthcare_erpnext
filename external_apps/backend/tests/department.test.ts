import request from 'supertest';
import app from '../src/index';
import { prismaMock } from './setup';
import { signToken } from '../src/utils/jwt';

describe('Department API', () => {
    let adminToken: string;

    beforeAll(() => {
        adminToken = signToken({ userId: 'admin-id', role: 'Admin' });
    });

    describe('POST /api/v1/departments', () => {
        it('should create a department', async () => {
            // Middleware fetch
            prismaMock.user.findUnique.mockResolvedValueOnce({
                id: 'admin-id',
                role: { isSystem: true, name: 'Admin', permissions: [] }
            } as any);

            const departmentData = { name: 'IT', description: 'Information Technology' };
            prismaMock.department.create.mockResolvedValue({ id: 'dept-1', ...departmentData } as any);

            const res = await request(app)
                .post('/api/v1/departments')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(departmentData);

            expect(res.status).toBe(201);
            expect(res.body.data.name).toBe('IT');
        });
    });

    describe('GET /api/v1/departments', () => {
        it('should return all departments', async () => {
            // Middleware fetch
            prismaMock.user.findUnique.mockResolvedValueOnce({
                id: 'admin-id',
                role: { isSystem: true, name: 'Admin', permissions: [] }
            } as any);

            prismaMock.department.findMany.mockResolvedValue([
                { id: 'dept-1', name: 'IT', _count: { employees: 5 } } as any
            ]);

            const res = await request(app)
                .get('/api/v1/departments')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body.data).toHaveLength(1);
        });
    });
});
