import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [ReportController],
    providers: [PrismaService, ReportService],
})
export class ReportModule { }
