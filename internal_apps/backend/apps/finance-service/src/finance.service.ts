import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';
import {
    PaginationDto,
    getPaginationOptions,
    createPaginatedResponse,
    buildSearchQuery
} from '@app/common';

@Injectable()
export class FinanceService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() { }

    // --- Commissions ---
    async getCommissions(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'partner', 'partnerType', 'rate', 'month');

        const [data, total] = await Promise.all([
            this.prisma.commission.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' },
            }),
            this.prisma.commission.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createCommission(data: any) {
        return this.prisma.commission.create({ data });
    }

    async updateCommission(id: number, data: any) {
        return this.prisma.commission.update({
            where: { id },
            data,
        });
    }

    async deleteCommission(id: number) {
        return this.prisma.commission.delete({
            where: { id },
        });
    }

    // --- Revenue ---
    async getRevenue(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'type', 'details', 'status');

        const [data, total] = await Promise.all([
            this.prisma.revenue.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { timestamp: 'desc' },
            }),
            this.prisma.revenue.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createRevenue(data: any) {
        return this.prisma.revenue.create({ data });
    }

    async updateRevenue(id: number, data: any) {
        return this.prisma.revenue.update({
            where: { id },
            data,
        });
    }

    async deleteRevenue(id: number) {
        return this.prisma.revenue.delete({
            where: { id },
        });
    }

    // --- Withdrawals ---
    async getWithdrawals(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(
            query.search,
            'transactionId',
            'partnerName',
            'partnerType',
            'bankName',
            'accountName',
            'accountNumber'
        );

        const [data, total] = await Promise.all([
            this.prisma.withdrawal.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { requestDate: 'desc' },
            }),
            this.prisma.withdrawal.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getWithdrawalById(id: number) {
        return this.prisma.withdrawal.findUnique({
            where: { id },
        });
    }

    async createWithdrawal(data: any) {
        return this.prisma.withdrawal.create({ data });
    }

    async updateWithdrawal(id: number, data: any) {
        return this.prisma.withdrawal.update({
            where: { id },
            data,
        });
    }

    async deleteWithdrawal(id: number) {
        return this.prisma.withdrawal.delete({
            where: { id },
        });
    }

    async getRevenueStats() {
        const [totalRevenue, monthlyRevenue] = await Promise.all([
            this.prisma.revenue.aggregate({
                _sum: { amount: true }
            }),
            this.prisma.revenue.groupBy({
                by: ['timestamp'],
                _sum: { amount: true },
                orderBy: { timestamp: 'asc' },
                take: 12
            })
        ]);

        return {
            total: totalRevenue._sum.amount || 0,
            monthly: monthlyRevenue.map(r => ({
                month: new Date(r.timestamp).toLocaleDateString('en-US', { month: 'short' }),
                amount: r._sum.amount
            }))
        };
    }
}
