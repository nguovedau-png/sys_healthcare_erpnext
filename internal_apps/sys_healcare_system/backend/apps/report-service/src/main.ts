import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ReportModule } from './report.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ReportModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
            queue: 'report_queue',
            queueOptions: {
                durable: true
            },
        },
    });
    await app.listen();
}
bootstrap();
