import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BackgroundJobController } from './backgroundjob.controller';
import { BackgroundJobService } from './backgroundjob.service';
import { PrismaModule } from './prisma.module';
import {
    FileProcessor,
    EmailProcessor,
    SmsProcessor,
    NotificationProcessor,
    ScheduledProcessor,
} from './job.processors';

@Module({
    imports: [
        PrismaModule,
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
            },
        }),
        BullModule.registerQueue(
            { name: 'file' },
            { name: 'email' },
            { name: 'sms' },
            { name: 'notification' },
            { name: 'scheduled' },
        ),
    ],
    controllers: [BackgroundJobController],
    providers: [
        BackgroundJobService,
        FileProcessor,
        EmailProcessor,
        SmsProcessor,
        NotificationProcessor,
        ScheduledProcessor,
    ],
})
export class BackgroundJobModule { }
