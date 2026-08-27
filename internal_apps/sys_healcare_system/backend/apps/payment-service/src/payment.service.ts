import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma';
import {
  PaymentMethodType,
  Plan,
  Subscription,
  SubscriptionStatus,
} from '@prisma/client-payment-service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) { }

  async createSubscription(
    userId: string,
    plan: Plan,
    amount: number,
    currency: string,
    paymentMethodId: number,
  ): Promise<Subscription> {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    return this.prisma.subscription.create({
      data: {
        userId,
        plan,
        amount,
        currency,
        startDate,
        endDate,
        nextBillingDate: endDate,
        status: SubscriptionStatus.ACTIVE,
        paymentMethodId,
      },
    });
  }

  async getSubscription(userId: string) {
    return this.prisma.subscription.findFirst({
      where: { userId, status: SubscriptionStatus.ACTIVE },
      include: { paymentMethod: true },
    });
  }

  async cancelSubscription(subscriptionId: number): Promise<Subscription> {
    return this.prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: SubscriptionStatus.CANCELED },
    });
  }

  async addPaymentMethod(
    userId: string,
    type: PaymentMethodType,
    lastFourDigits: string,
    expirationDate: Date,
  ) {
    return this.prisma.paymentMethod.create({
      data: {
        userId,
        type,
        lastFourDigits,
        expirationDate,
      },
    });
  }

  async getPaymentMethods(userId: string) {
    return this.prisma.paymentMethod.findMany({
      where: { userId },
    });
  }

  async removePaymentMethod(paymentMethodId: number) {
    return this.prisma.paymentMethod.delete({
      where: { id: paymentMethodId },
    });
  }

  async processWebhook(payload: any) {
    // Mock Webhook Logic for Stripe/VNPay
    console.log('Received Webhook:', payload);

    if (payload.event === 'payment_success' && payload.subscriptionId) {
      // Find and update subscription
      const subscription = await this.prisma.subscription.findFirst({
        where: { id: Number(payload.subscriptionId) }
      });

      if (subscription) {
        return this.prisma.subscription.update({
          where: { id: subscription.id },
          data: { status: SubscriptionStatus.ACTIVE, nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
        });
      }
    }

    return { received: true };
  }

  async createPaymentSession(orderData: any) {
    // Simulate Gateway Delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Persist as a "One-Time Subscription" (Workaround for Schema constraints)
    // In a real system, we would have a separate Transaction table.

    const targetUserId = orderData.userId || 'user_123';

    // 1. Create a dummy payment method if needed (or find existing)
    // For now, valid paymentMethodId is required. We'll try to create one on the fly.
    const mockPaymentMethod = await this.prisma.paymentMethod.create({
      data: {
        userId: targetUserId,
        type: PaymentMethodType.CREDIT_CARD,
        lastFourDigits: '4242',
        expirationDate: new Date()
      }
    });

    const subscription = await this.prisma.subscription.create({
      data: {
        userId: targetUserId,
        plan: Plan.BASIC, // Defaulting to Basic
        amount: orderData.amount,
        currency: 'VND',
        startDate: new Date(),
        endDate: new Date(), // Immediate expiration for one-time
        nextBillingDate: new Date(),
        status: SubscriptionStatus.ACTIVE,
        paymentMethodId: mockPaymentMethod.id
      }
    });

    return {
      status: 'success',
      transactionId: `txn_${subscription.id}`,
      amount: orderData.amount,
      currency: 'VND',
      gateway: 'Stripe_Mock',
      timestamp: subscription.createdAt
    };
  }

  async getUserHistory(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { paymentMethod: true }
    });
  }
}
