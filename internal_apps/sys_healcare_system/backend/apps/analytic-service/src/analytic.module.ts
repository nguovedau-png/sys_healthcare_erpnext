import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { AnalyticController } from './analytic.controller';
import { AnalyticService } from './analytic.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AnalyticController],
    providers: [PrismaService, AnalyticService],
})
export class AnalyticModule { }
