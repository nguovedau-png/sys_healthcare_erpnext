import request from 'supertest';
import app from '../src/index';
import { prismaMock } from './setup';
import bcrypt from 'bcryptjs';
import { generateTwoFactorSecret } from '../src/utils/totp';

describe('Auth API', () => {
    describe('POST /api/v1/auth/register', () => {
        it('should register a new user', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123',
                fullName: 'Test User',
            };

            prismaMock.user.findUnique.mockResolvedValue(null);
            prismaMock.role.findUnique.mockResolvedValue({ id: 'role-id', name: 'User' } as any);
            prismaMock.user.create.mockResolvedValue({
                id: 'user-id',
                ...userData,
                password: 'hashedPassword',
                roleId: 'role-id',
                createdAt: new Date(),
                updatedAt: new Date(),
            } as any);

            const res = await request(app).post('/api/v1/auth/register').send(userData);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.email).toBe(userData.email);
        });

        it('should return 400 if email already exists', async () => {
            prismaMock.user.findUnique.mockResolvedValue({ id: 'existing-id' } as any);

            const res = await request(app).post('/api/v1/auth/register').send({
                email: 'existing@example.com',
                password: 'password123',
                fullName: 'Existing User',
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/exists/i);
        });
    });

    describe('POST /api/v1/auth/login', () => {
        it('should login successfully with correct credentials', async () => {
            const password = 'password123';
            const hashedPassword = await bcrypt.hash(password, 10);

            prismaMock.user.findUnique.mockResolvedValue({
                id: 'user-id',
                email: 'test@example.com',
                password: hashedPassword,
                role: { name: 'User' },
                is2FAEnabled: false,
            } as any);

            prismaMock.user.update.mockResolvedValue({} as any);

            const res = await request(app).post('/api/v1/auth/login').send({
                email: 'test@example.com',
                password: password,
            });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('accessToken');
            expect(res.body.data).toHaveProperty('refreshToken');
        });

        it('should require 2FA if enabled', async () => {
            const password = 'password123';
            const hashedPassword = await bcrypt.hash(password, 10);

            prismaMock.user.findUnique.mockResolvedValue({
                id: 'user-id',
                email: 'test@example.com',
                password: hashedPassword,
                role: { name: 'User' },
                is2FAEnabled: true,
                twoFactorSecret: 'secret',
            } as any);

            const res = await request(app).post('/api/v1/auth/login').send({
                email: 'test@example.com',
                password: password,
            });

            expect(res.status).toBe(200);
            expect(res.body.data.require2FA).toBe(true);
        });
    });
});
