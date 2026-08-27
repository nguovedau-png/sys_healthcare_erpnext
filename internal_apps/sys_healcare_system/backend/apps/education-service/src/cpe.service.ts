import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-education-service';

@Injectable()
export class CpeService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getDayDashboard(date?: string) {
        // If date is provided, filter by createDate? Or just return all/latest?
        // SQL tables seem to store daily snapshots. 
        // Usually a dashboard shows specific day or range. 
        // Let's simplified to return all for now or latest 30 days default.
        return this.prisma.cpeDashboardDay.findMany({
            take: 30,
            orderBy: {
                createDate: 'desc',
            },
        });
    }

    async getWeekDashboard(year?: number) {
        return this.prisma.cpeDashboardWeek.findMany({
            orderBy: [
                { year: 'desc' },
                { week: 'desc' },
            ],
            take: 20,
        });
    }

    async getMonthDashboard(year?: number) {
        return this.prisma.cpeDashboardMonth.findMany({
            orderBy: [
                { year: 'desc' },
                { month: 'desc' },
            ],
            take: 24, // Last 2 years
        });
    }

    async importMasterData(data: any[]) {
        // Basic import logic, assume data structure matches model
        // Using transaction for bulk insert
        // Note: data should be mapped to match Prisma model fields
        return this.prisma.$transaction(
            data.map((item) =>
                this.prisma.cpeMasterData.create({
                    data: item,
                }),
            ),
        );
    }

    async getMasterData() {
        return this.prisma.cpeMasterData.findMany({
            take: 100,
        });
    }
}
