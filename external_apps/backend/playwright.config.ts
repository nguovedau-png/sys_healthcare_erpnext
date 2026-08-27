import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        extraHTTPHeaders: {
            'Accept': 'application/json',
        },
    },
    projects: [
        {
            name: 'api',
            testMatch: /.*\.spec\.ts/,
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000/health',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});
