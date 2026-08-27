import { Controller, Get, Post, Put, Delete, Body, Param, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '@app/common';

@Controller('marketing')
export class MarketingController {
    constructor(@Inject('MARKETING_SERVICE') private readonly client: ClientProxy) { }

    // --- Campaigns ---
    @Get('campaigns')
    getCampaigns(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_campaigns' }, query);
    }

    @Post('campaigns')
    createCampaign(@Body() data: any) {
        return this.client.send({ cmd: 'create_campaign' }, data);
    }

    @Put('campaigns/:id')
    updateCampaign(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_campaign' }, { id: parseInt(id), data });
    }

    @Delete('campaigns/:id')
    deleteCampaign(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_campaign' }, parseInt(id));
    }

    // --- Emails ---
    @Get('emails')
    getEmailCampaigns(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_email_campaigns' }, query);
    }

    @Post('emails')
    createEmailCampaign(@Body() data: any) {
        return this.client.send({ cmd: 'create_email_campaign' }, data);
    }

    @Put('emails/:id')
    updateEmailCampaign(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_email_campaign' }, { id: parseInt(id), data });
    }

    @Delete('emails/:id')
    deleteEmailCampaign(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_email_campaign' }, parseInt(id));
    }

    // --- Promotions ---
    @Get('promotions')
    getPromotions(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_promotions' }, query);
    }

    @Post('promotions')
    createPromotion(@Body() data: any) {
        return this.client.send({ cmd: 'create_promotion' }, data);
    }

    @Put('promotions/:id')
    updatePromotion(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_promotion' }, { id: parseInt(id), data });
    }

    @Delete('promotions/:id')
    deletePromotion(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_promotion' }, parseInt(id));
    }

    // --- Push Notifications ---
    @Get('push-notifications')
    getPushNotifications(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_push_notifications' }, query);
    }

    @Post('push-notifications')
    createPushNotification(@Body() data: any) {
        return this.client.send({ cmd: 'create_push_notification' }, data);
    }

    @Put('push-notifications/:id')
    updatePushNotification(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_push_notification' }, { id: parseInt(id), data });
    }

    @Delete('push-notifications/:id')
    deletePushNotification(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_push_notification' }, parseInt(id));
    }

    // --- Vouchers ---
    @Get('vouchers')
    getVouchers(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_vouchers' }, query);
    }

    @Post('vouchers')
    createVoucher(@Body() data: any) {
        return this.client.send({ cmd: 'create_voucher' }, data);
    }

    @Put('vouchers/:id')
    updateVoucher(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_voucher' }, { id: parseInt(id), data });
    }

    @Delete('vouchers/:id')
    deleteVoucher(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_voucher' }, parseInt(id));
    }

    // Charity Campaigns
    @Get('charity-campaigns')
    getCharityCampaigns() {
        return this.client.send({ cmd: 'get_charity_campaigns' }, {});
    }

    @Get('charity-campaigns/:id')
    getCharityCampaign(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_charity_campaign' }, parseInt(id));
    }

    @Post('charity-campaigns')
    createCharityCampaign(@Body() data: any) {
        return this.client.send({ cmd: 'create_charity_campaign' }, data);
    }

    @Post('charity-campaigns/:id/donate')
    donateToCharityCampaign(@Param('id') id: string, @Body() body: { amount: number }) {
        return this.client.send({ cmd: 'donate_charity' }, { id: parseInt(id), amount: body.amount });
    }

    // Insurance Partners
    @Get('insurance-partners')
    getInsurancePartners() {
        return this.client.send({ cmd: 'get_insurance_partners' }, {});
    }

    @Post('insurance-partners')
    createInsurancePartner(@Body() data: any) {
        return this.client.send({ cmd: 'create_insurance_partner' }, data);
    }
}
