import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [FinanceController],
    providers: [PrismaService, FinanceService],
})
export class FinanceModule { }
