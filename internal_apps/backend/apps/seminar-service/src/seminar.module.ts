import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { SeminarController } from './seminar.controller';
import { SeminarService } from './seminar.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [SeminarController],
    providers: [PrismaService, SeminarService],
})
export class SeminarModule { }
