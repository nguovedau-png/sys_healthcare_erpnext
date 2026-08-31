import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SeminarModule } from './seminar.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        SeminarModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                queue: 'seminar_queue',
                queueOptions: {
                    durable: true,
                },
            },
        },
    );
    await app.listen();
    console.log('Seminar microservice is listening');
}
bootstrap();
