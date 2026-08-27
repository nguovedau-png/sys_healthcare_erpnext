import { Module } from '@nestjs/common';
import { PrismaService } from './prisma';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ConfigModule } from '@nestjs/config';
import { BotService } from './bot.service';
import { CommonModule } from '@app/common';

@Module({
    imports: [
        CommonModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [ContentController],
    providers: [PrismaService, ContentService, BotService],
})
export class ContentModule { }
