import { test, expect } from '@playwright/test';

test.describe('Auth API', () => {

    test('POST /auth/login with valid credentials should return token', async ({ request }) => {
        // Assuming seeded user or created one. 
        // Using common default credentials for template
        const response = await request.post('/api/v1/auth/login', {
            data: {
                email: 'admin@example.com', // Replace with valid seeded user
                password: 'password'
            }
        });

        // Debug response if fails
        if (!response.ok()) {
            console.log(await response.json());
        }

        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(data.success).toBe(true);
        expect(data.data.accessToken).toBeDefined();
    });

    test('POST /auth/login with invalid credentials should fail', async ({ request }) => {
        const response = await request.post('/api/v1/auth/login', {
            data: {
                email: 'wrong@example.com',
                password: 'wrongpassword'
            }
        });

        expect([400, 401]).toContain(response.status());
    });
});
