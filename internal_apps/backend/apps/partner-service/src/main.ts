import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PartnerModule } from './partner.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(PartnerModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
            queue: 'partner_queue',
            queueOptions: {
                durable: true,
            },
        },
    });
    await app.listen();
}
bootstrap();
