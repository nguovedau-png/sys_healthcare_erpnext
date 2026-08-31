import { test, expect } from '@playwright/test';

test('landing page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('social login buttons present', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Google')).toBeVisible();
    await expect(page.getByText('Facebook')).toBeVisible();
    await expect(page.getByText('TikTok')).toBeVisible();
});
