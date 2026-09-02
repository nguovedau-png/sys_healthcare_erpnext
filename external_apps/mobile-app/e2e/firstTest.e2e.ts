import { device, element, by, expect } from 'detox';

describe('Example', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should render the login form', async () => {
        await expect(element(by.id('email-input'))).toBeVisible();
        await expect(element(by.id('password-input'))).toBeVisible();
        await expect(element(by.id('login-button'))).toBeVisible();
    });
});
