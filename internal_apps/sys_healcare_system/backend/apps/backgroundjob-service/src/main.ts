import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { BackgroundJobModule } from './backgroundjob.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        BackgroundJobModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                queue: 'backgroundjob_queue',
                queueOptions: {
                    durable: true,
                },
            },
        },
    );
    await app.listen();
}
bootstrap();
