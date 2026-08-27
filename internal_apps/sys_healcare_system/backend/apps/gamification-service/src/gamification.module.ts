import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [GamificationController],
    providers: [PrismaService, GamificationService],
})
export class GamificationModule { }
