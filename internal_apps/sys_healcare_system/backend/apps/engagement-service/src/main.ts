import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { EngagementModule } from './engagement.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(EngagementModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
            queue: 'engagement_queue',
            queueOptions: {
                durable: true
            },
        },
    });
    await app.listen();
}
bootstrap();
