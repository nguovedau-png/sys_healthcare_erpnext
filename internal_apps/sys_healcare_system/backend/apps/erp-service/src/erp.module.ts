import { Module } from '@nestjs/common';
import { ErpController } from './erp.controller';
import { ErpService } from './erp.service';
import { PrismaService } from './prisma';
import { ErpNextIntegrationService } from './integrations/erpnext.integration.service';

@Module({
  imports: [],
  controllers: [ErpController],
  providers: [ErpService, PrismaService, ErpNextIntegrationService],
})
export class ErpModule { }
