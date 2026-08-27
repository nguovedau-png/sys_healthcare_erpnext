import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ClientsModule.register([
            {
                name: 'GAMIFICATION_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                    queue: 'gamification_queue',
                    queueOptions: { durable: true },
                },
            },
            {
                name: 'SURVEY_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
                    queue: 'survey_queue',
                    queueOptions: { durable: true },
                },
            },
        ]),
    ],
    controllers: [BookingController],
    providers: [PrismaService, BookingService],
})
export class BookingModule { }
