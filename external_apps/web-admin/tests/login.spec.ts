import { test, expect } from '@playwright/test';

test('Login flow', async ({ page }) => {
    await page.goto('/login');

    // Ant Design Forms usually generate id from name
    await page.fill('#login_email', 'admin@example.com');
    await page.fill('#login_password', 'password');

    // Click submit button
    await page.click('button[type="submit"]');

    // Expect to be redirected to dashboard
    await expect(page).toHaveURL('/');

    // Verify dashboard element
    await expect(page.locator('h1').first()).toBeVisible();
    // Or check for "Welcome Back" is NOT visible
});
