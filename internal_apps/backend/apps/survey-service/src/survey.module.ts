import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [SurveyController],
    providers: [PrismaService, SurveyService],
})
export class SurveyModule { }
