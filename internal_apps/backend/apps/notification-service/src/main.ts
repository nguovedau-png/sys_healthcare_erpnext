import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: 'notification_queue',
        queueOptions: {
          durable: true,
          arguments: {
            'x-dead-letter-exchange': 'notification_dlx',
            'x-dead-letter-routing-key': 'notification_dead',
          }
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
