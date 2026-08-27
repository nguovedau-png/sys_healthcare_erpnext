import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ShopModule } from './shop.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ShopModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
            queue: 'shop_queue',
            queueOptions: {
                durable: true
            },
        },
    });
    await app.listen();
}
bootstrap();
