import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from './prisma';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService],
})
export class PaymentModule { }
