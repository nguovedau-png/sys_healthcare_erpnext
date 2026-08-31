import { Controller, Get } from '@nestjs/common';

@Controller('test-routes')
export class TestController {
    @Get('health')
    healthCheck() {
        return { status: 'ok', timestamp: new Date().toISOString() };
    }

    @Get('provinces')
    getProvinces() {
        return { data: ['test1', 'test2'], message: 'Test provinces endpoint works!' };
    }
}
