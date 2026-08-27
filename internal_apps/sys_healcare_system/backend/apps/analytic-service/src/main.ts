import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AnalyticModule } from './analytic.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AnalyticModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
            queue: 'analytic_queue',
            queueOptions: {
                durable: true
            },
        },
    });
    await app.listen();
}
bootstrap();
