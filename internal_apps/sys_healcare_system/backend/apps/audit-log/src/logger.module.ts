import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { PrismaService } from './prisma';

@Module({
  imports: [],
  controllers: [LoggerController],
  providers: [LoggerService, PrismaService],
})
export class LoggerModule { }
