import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');
    // Basic check for title or heading
    await expect(page).toHaveTitle(/web-admin/i);
});

test('shows login form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByPlaceholder('name@example.com')).toBeVisible();
});
