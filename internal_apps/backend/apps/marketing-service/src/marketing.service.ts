import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';
import {
    PaginationDto,
    getPaginationOptions,
    createPaginatedResponse,
    buildSearchQuery
} from '@app/common';

@Injectable()
export class MarketingService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() { }

    // --- Campaigns ---
    async getCampaigns(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'name', 'type', 'status');

        const [data, total] = await Promise.all([
            this.prisma.campaign.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' },
            }),
            this.prisma.campaign.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createCampaign(data: any) {
        return this.prisma.campaign.create({ data });
    }

    async updateCampaign(id: number, data: any) {
        return this.prisma.campaign.update({ where: { id }, data });
    }

    async deleteCampaign(id: number) {
        return this.prisma.campaign.delete({ where: { id } });
    }

    // --- Email Campaigns ---
    async getEmailCampaigns(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'subject', 'status');

        const [data, total] = await Promise.all([
            this.prisma.emailCampaign.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' },
            }),
            this.prisma.emailCampaign.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createEmailCampaign(data: any) {
        return this.prisma.emailCampaign.create({ data });
    }

    async updateEmailCampaign(id: number, data: any) {
        return this.prisma.emailCampaign.update({ where: { id }, data });
    }

    async deleteEmailCampaign(id: number) {
        return this.prisma.emailCampaign.delete({ where: { id } });
    }

    // --- Promotions ---
    async getPromotions(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'code', 'name', 'type', 'status', 'userNameCreate');

        const [data, total] = await Promise.all([
            this.prisma.promotion.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' },
            }),
            this.prisma.promotion.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createPromotion(data: any) {
        return this.prisma.promotion.create({ data });
    }

    async updatePromotion(id: number, data: any) {
        return this.prisma.promotion.update({ where: { id }, data });
    }

    async deletePromotion(id: number) {
        return this.prisma.promotion.delete({ where: { id } });
    }

    // --- Push Notifications ---
    async getPushNotifications(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'title', 'message', 'status');

        const [data, total] = await Promise.all([
            this.prisma.pushNotification.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' },
            }),
            this.prisma.pushNotification.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createPushNotification(data: any) {
        return this.prisma.pushNotification.create({ data });
    }

    async updatePushNotification(id: number, data: any) {
        return this.prisma.pushNotification.update({ where: { id }, data });
    }

    async deletePushNotification(id: number) {
        return this.prisma.pushNotification.delete({ where: { id } });
    }

    // --- Vouchers ---
    async getVouchers(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'code', 'name', 'status');

        const [data, total] = await Promise.all([
            this.prisma.voucher.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' },
            }),
            this.prisma.voucher.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createVoucher(data: any) {
        return this.prisma.voucher.create({ data });
    }

    async updateVoucher(id: number, data: any) {
        return this.prisma.voucher.update({ where: { id }, data });
    }

    async deleteVoucher(id: number) {
        return this.prisma.voucher.delete({ where: { id } });
    }

    // --- Charity Campaigns ---
    async getCharityCampaigns() {
        const campaigns = await this.prisma.charityCampaign.findMany({
            where: { isActive: true },
            orderBy: [{ urgent: 'desc' }, { createdAt: 'desc' }],
        });
        return campaigns.map(c => ({
            ...c,
            goal: c.goal ? Number(c.goal) : 0,
            raised: c.raised ? Number(c.raised) : 0,
        }));
    }

    async getCharityCampaign(id: number) {
        const c = await this.prisma.charityCampaign.findUnique({ where: { id } });
        if (!c) return null;
        return {
            ...c,
            goal: c.goal ? Number(c.goal) : 0,
            raised: c.raised ? Number(c.raised) : 0,
        };
    }

    async createCharityCampaign(data: any) {
        return this.prisma.charityCampaign.create({ data });
    }

    async donateToCharityCampaign(id: number, amount: number) {
        const campaign = await this.prisma.charityCampaign.findUnique({ where: { id } });
        if (!campaign) throw new Error('Campaign not found');
        const newRaised = Number(campaign.raised) + amount;
        const newDonators = campaign.donators + 1;
        const newPercent = Math.min(100, Math.round((newRaised / Number(campaign.goal)) * 100));
        return this.prisma.charityCampaign.update({
            where: { id },
            data: { raised: newRaised, donators: newDonators, percent: newPercent },
        });
    }

    // --- Insurance Partners ---
    async getInsurancePartners() {
        return this.prisma.insurancePartner.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
    }

    async createInsurancePartner(data: any) {
        return this.prisma.insurancePartner.create({ data });
    }
}
