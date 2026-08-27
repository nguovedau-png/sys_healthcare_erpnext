import { Module } from '@nestjs/common';
import { ErpController } from './erp.controller';
import { ErpService } from './erp.service';
import { PrismaService } from './prisma';

@Module({
  imports: [],
  controllers: [ErpController],
  providers: [ErpService, PrismaService],
})
export class ErpModule { }
