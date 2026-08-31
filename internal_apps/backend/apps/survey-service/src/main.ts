import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SurveyModule } from './survey.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(SurveyModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
            queue: 'survey_queue',
            queueOptions: {
                durable: true
            },
        },
    });
    await app.listen();
}
bootstrap();
