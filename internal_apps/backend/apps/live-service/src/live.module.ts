import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { LiveController } from './live.controller';
import { LiveService } from './live.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [LiveController],
    providers: [PrismaService, LiveService],
})
export class LiveModule { }
