import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { FinanceModule } from './finance.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        FinanceModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                queue: 'finance_queue',
                queueOptions: {
                    durable: true,
                },
            },
        },
    );
    await app.listen();
    console.log('Finance microservice is listening');
}
bootstrap();
