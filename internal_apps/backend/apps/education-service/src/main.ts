import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EducationModule } from './education.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(EducationModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
            queue: 'education_queue',
            queueOptions: {
                durable: true,
            },
        },
    });
    await app.listen();
}
bootstrap();
