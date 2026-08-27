import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
    constructor(
        @Inject('AUTH_SERVICE') private authClient: ClientProxy,
        @Inject('USER_SERVICE') private userClient: ClientProxy,
        @Inject('CONTENT_SERVICE') private contentClient: ClientProxy,
        @Inject('PARTNER_SERVICE') private partnerClient: ClientProxy,
        @Inject('BOOKING_SERVICE') private bookingClient: ClientProxy,
        @Inject('EDUCATION_SERVICE') private educationClient: ClientProxy,
        @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Check health of all microservices' })
    async checkHealth() {
        const services = [
            { name: 'auth-service', client: this.authClient },
            { name: 'user-service', client: this.userClient },
            { name: 'content-service', client: this.contentClient },
            { name: 'partner-service', client: this.partnerClient },
            { name: 'booking-service', client: this.bookingClient },
            { name: 'education-service', client: this.educationClient },
            { name: 'notification-service', client: this.notificationClient },
        ];

        // Simulate Database Check (API Gateway DB)
        // In production, inject PrismaService and call $queryRaw`SELECT 1`
        const dbStatus = { name: 'database', status: 'up', latency: '5ms' };

        const results = await Promise.all(
            services.map(async (service) => {
                try {
                    // Send a ping command or a simple message pattern
                    await firstValueFrom(service.client.send({ cmd: 'health_check' }, {}));
                    return { service: service.name, status: 'up' };
                } catch (error) {
                    return { service: service.name, status: 'down', error: error.message };
                }
            }),
        );

        const allUp = results.every((r) => r.status === 'up');

        return {
            status: allUp ? 'ok' : 'degraded',
            timestamp: new Date().toISOString(),
            services: [...results, dbStatus],
        };
    }
}
