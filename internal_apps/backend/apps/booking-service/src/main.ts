import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { BookingModule } from './booking.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        BookingModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                queue: 'booking_queue',
                queueOptions: {
                    durable: true,
                    arguments: {
                        'x-dead-letter-exchange': 'booking_dlx',
                        'x-dead-letter-routing-key': 'booking_dead',
                    }
                },
            },
        },
    );
    await app.listen();
}
bootstrap();
