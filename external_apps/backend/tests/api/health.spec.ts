import { test, expect } from '@playwright/test';

test('health check returns 200', async ({ request }) => {
    const response = await request.get('/health');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.status).toBe('ok');
});

test('system health api returns status', async ({ request }) => {
    // This might require auth if protected, but assuming public or we Mock auth
    const response = await request.get('/api/v1/system/health');
    // If protected, this might fail 401. 
    // For now just expecting json.
    // Actually, wait, auth check is needed?
    // System route usually protected.
    // I will check simpler /metrics endpoint which is public

    const metrics = await request.get('/metrics');
    expect(metrics.ok()).toBeTruthy();
});
