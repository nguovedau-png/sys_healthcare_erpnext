import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { EngagementController } from './engagement.controller';
import { EngagementService } from './engagement.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [EngagementController],
    providers: [PrismaService, EngagementService],
})
export class EngagementModule { }
