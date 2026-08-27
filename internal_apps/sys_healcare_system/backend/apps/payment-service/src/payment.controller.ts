import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

enum PaymentMethodType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
}

enum Plan {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @MessagePattern({ cmd: 'createSubscription' })
  createSubscription(
    @Payload()
    data: {
      userId: string;
      plan: Plan;
      amount: number;
      currency: string;
      paymentMethodId: number;
    },
  ) {
    return this.paymentService.createSubscription(
      data.userId,
      data.plan,
      data.amount,
      data.currency,
      data.paymentMethodId,
    );
  }

  @MessagePattern({ cmd: 'getSubscription' })
  getSubscription(@Payload() userId: string) {
    return this.paymentService.getSubscription(userId);
  }

  @MessagePattern({ cmd: 'cancelSubscription' })
  cancelSubscription(@Payload() subscriptionId: number) {
    return this.paymentService.cancelSubscription(subscriptionId);
  }

  @MessagePattern({ cmd: 'addPaymentMethod' })
  addPaymentMethod(
    @Payload()
    data: {
      userId: string;
      type: PaymentMethodType;
      lastFourDigits: string;
      expirationDate: Date;
    },
  ) {
    return this.paymentService.addPaymentMethod(
      data.userId,
      data.type,
      data.lastFourDigits,
      data.expirationDate,
    );
  }

  @MessagePattern({ cmd: 'getPaymentMethods' })
  getPaymentMethods(@Payload() userId: string) {
    return this.paymentService.getPaymentMethods(userId);
  }

  @MessagePattern({ cmd: 'removePaymentMethod' })
  removePaymentMethod(@Payload() paymentMethodId: number) {
    return this.paymentService.removePaymentMethod(paymentMethodId);
  }

  @MessagePattern({ cmd: 'webhook' })
  handleWebhook(@Payload() payload: any) {
    return this.paymentService.processWebhook(payload);
  }

  @MessagePattern({ cmd: 'createPaymentSession' })
  createPaymentSession(@Payload() orderData: any) {
    return this.paymentService.createPaymentSession(orderData);
  }

  @MessagePattern({ cmd: 'getUserHistory' })
  getUserHistory(@Payload() userId: string) {
    return this.paymentService.getUserHistory(userId);
  }
}
