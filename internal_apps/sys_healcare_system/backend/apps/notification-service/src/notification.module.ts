import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaService } from './prisma';

import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GATEWAY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'api_gateway_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService],
})
export class NotificationModule { }
