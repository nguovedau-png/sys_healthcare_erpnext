import { Controller, Get, Inject, Query, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('payments')
export class PaymentController {
    constructor(
        @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientProxy,
    ) { }

    @Get('subscription')
    getSubscription(@Query('userId') userId: string): Observable<any> {
        return this.paymentClient.send({ cmd: 'getSubscription' }, userId);
    }

    @Get('methods')
    getPaymentMethods(@Query('userId') userId: string): Observable<any> {
        return this.paymentClient.send({ cmd: 'getPaymentMethods' }, userId);
    }

    @Post('checkout')
    checkout(@Body() orderData: any): Observable<any> {
        return this.paymentClient.send({ cmd: 'createPaymentSession' }, orderData);
    }

    @Get('history')
    getUserHistory(@Query('userId') userId: string = 'user_123'): Observable<any> {
        return this.paymentClient.send({ cmd: 'getUserHistory' }, userId);
    }
}
