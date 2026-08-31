import { test, expect } from '@playwright/test';

test('Web Public Login Form Interaction', async ({ page }) => {
    await page.goto('/');

    // Fill Email
    await page.getByPlaceholder('Email').fill('user@example.com');

    // Fill Password
    await page.getByPlaceholder('Password').fill('password123');

    // Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Expect button to show processing state (Mock logic in page.tsx)
    await expect(page.getByRole('button')).toHaveText('Processing...');

    // Wait for mock login to finish (2s in code)
    await page.waitForTimeout(2100);

    // Expect button to return to Sign In
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

test('Social Login Buttons are visible', async ({ page }) => {
    await page.goto('/');
    // Check for social login images/buttons
    await expect(page.getByAltText('Google')).toBeVisible();
    await expect(page.getByAltText('Facebook')).toBeVisible();
    await expect(page.getByAltText('TikTok')).toBeVisible();
});
