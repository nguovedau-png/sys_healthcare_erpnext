import request from 'supertest';
import app from '../src/index';
import { prismaMock } from './setup';
import { signToken } from '../src/utils/jwt';

describe('User API', () => {
    let adminToken: string;

    beforeAll(() => {
        adminToken = signToken({ userId: 'admin-id', role: 'Admin' });
    });

    describe('GET /api/v1/users', () => {
        it('should return list of users for admin', async () => {
            // Mock for key verification (already handled by jwt verify, but we need the user fetch)
            // Middleware fetch
            prismaMock.user.findUnique.mockResolvedValueOnce({
                id: 'admin-id',
                role: { isSystem: true, name: 'Admin', permissions: [] }
            } as any);

            // Controller fetch
            prismaMock.user.count.mockResolvedValue(1);
            prismaMock.user.findMany.mockResolvedValue([
                {
                    id: 'user-1',
                    email: 'user@example.com',
                    fullName: 'User One',
                    role: { name: 'User' },
                } as any,
            ]);

            const res = await request(app)
                .get('/api/v1/users')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveLength(1);
            expect(res.body.data[0].email).toBe('user@example.com');
        });

        it('should deny access without token', async () => {
            const res = await request(app).get('/api/v1/users');
            expect(res.status).toBe(401);
        });
    });

    describe('GET /api/v1/users/:id', () => {
        it('should return user details', async () => {
            // Middleware fetch
            prismaMock.user.findUnique.mockResolvedValueOnce({
                id: 'admin-id',
                role: { isSystem: true, name: 'Admin', permissions: [] }
            } as any);

            // Controller fetch
            prismaMock.user.findUnique.mockResolvedValueOnce({
                id: 'user-1',
                email: 'user@example.com',
                fullName: 'User One',
                role: { name: 'User' },
                createdAt: new Date(),
            } as any);

            const res = await request(app)
                .get('/api/v1/users/user-1')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe('user-1');
        });
    });

    describe('DELETE /api/v1/users/:id', () => {
        it('should delete a user', async () => {
            // Middleware fetch
            prismaMock.user.findUnique.mockResolvedValueOnce({
                id: 'admin-id',
                role: { isSystem: true, name: 'Admin', permissions: [] }
            } as any);

            // Controller fetch
            prismaMock.user.findUnique.mockResolvedValueOnce({
                id: 'user-to-delete',
                email: 'delete@example.com',
            } as any);
            prismaMock.user.delete.mockResolvedValue({} as any);

            const res = await request(app)
                .delete('/api/v1/users/user-to-delete')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body.message).toMatch(/deleted/i);
        });
    });
});
