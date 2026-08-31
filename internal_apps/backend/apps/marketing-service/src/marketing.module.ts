import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { MarketingController } from './marketing.controller';
import { MarketingService } from './marketing.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [MarketingController],
    providers: [PrismaService, MarketingService],
})
export class MarketingModule { }
