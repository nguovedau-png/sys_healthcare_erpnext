import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AIController],
    providers: [PrismaService, AIService],
})
export class AIModule { }
