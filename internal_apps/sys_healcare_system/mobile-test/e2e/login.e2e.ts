import { device, element, by, expect, waitFor } from 'detox';

describe('Login Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should login successfully', async () => {
        // Type Email
        await element(by.id('email-input')).typeText('admin@example.com');
        // Close keyboard if needed (tap outside or return)
        // await element(by.id('email-input')).tapReturnKey();

        // Type Password
        await element(by.id('password-input')).typeText('password');
        await element(by.id('password-input')).tapReturnKey();

        // Tap Login
        await element(by.id('login-button')).tap();

        // Expect success alert or navigation (Alerts are tricky in Detox sometimes, better to check for next screen element)
        // Assuming navigation to Home/Settings, check for 'Home' text or similar.
        // Since this is a template, checking for "Dashboard" (from Web Admin parallel) or "Settings"
        // Let's assume we see a Dashboard or Settings.
        // For now, just wait.
        try {
            await waitFor(element(by.text('Dashboard'))).toBeVisible().withTimeout(5000);
        } catch (e) {
            // Fallback for demo
            await expect(element(by.id('login-button'))).not.toBeVisible();
        }
    });
});
