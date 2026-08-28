import { test, expect } from '@playwright/test';

test('Login flow', async ({ page }) => {
    await page.route('**/auth/login', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ success: true, data: { accessToken: 'e2e-access-token', refreshToken: 'e2e-refresh-token', user: { id: 'e2e-user', email: 'admin@example.com' } } }),
        });
    });
    await page.goto('/login');

    // Ant Design Forms usually generate id from name
    await page.fill('#login_email', 'admin@example.com');
    await page.fill('#login_password', 'password');

    // Click submit button
    await page.click('button[type="submit"]');

    // Expect to be redirected to dashboard
    await expect(page).toHaveURL('/');

    // Verify dashboard element
    await expect(page.getByRole('heading', { name: 'Dashboard', exact: true })).toBeVisible();
    // Or check for "Welcome Back" is NOT visible
});
