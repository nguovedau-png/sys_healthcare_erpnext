import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ContentModule } from './content.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ContentModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
            queue: 'content_queue',
            queueOptions: {
                durable: true,
            },
        },
    });
    await app.listen();
}
bootstrap();
