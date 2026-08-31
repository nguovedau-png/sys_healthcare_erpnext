import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class ReportService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {        await this.seedInitialData();
    }

    private async seedInitialData() {
        // Seed overview if empty
        const overviewCount = await this.prisma.systemOverview.count();
        if (overviewCount === 0) {
            await this.prisma.systemOverview.create({
                data: {
                    totalRevenue: 125500000,
                    revenueTrend: '+12.5%',
                    totalOrders: 3245,
                    ordersTrend: '+8.2%',
                    totalUsers: 12580,
                    usersTrend: '+15.3%',
                    totalPartners: 156,
                    partnersTrend: '+3.1%',
                }
            });
        }

        // Seed KPI if empty
        const kpiCount = await this.prisma.educationKPI.count();
        if (kpiCount === 0) {
            await this.prisma.educationKPI.create({
                data: {
                    totalEnrolled: 1240,
                    expectedEnrolled: 1500,
                    enrollmentRate: 83,
                    started: 1100,
                    completed: 420,
                    startedRate: 89,
                    completedRate: 34,
                    totalNotifications: 3450,
                    usageFrequency: 2.8,
                    avgCourseDuration: '12.5 giờ',
                }
            });
        }

        // Seed Revenue Report if empty
        const revCount = await this.prisma.revenueReport.count();
        if (revCount === 0) {
            for (let i = 1; i <= 6; i++) {
                await this.prisma.revenueReport.create({
                    data: {
                        month: `${i}/2024`,
                        revenue: 100000000 + i * 10000000,
                        orders: 200 + i * 50,
                        avgOrderValue: 400000 + i * 20000,
                        growth: 5 + i * 2,
                    }
                });
            }
        }

        // Seed Export Tickets if empty
        const exportCount = await this.prisma.exportTicket.count();
        if (exportCount === 0) {
            const reports = [
                { title: 'Đã đăng ký - Chưa bắt đầu', description: 'Danh sách học viên đã đăng ký nhưng chưa xem bài học nào', count: 140, icon: 'flaticon-user', color: 'bg-yellow-500' },
                { title: 'Đã bắt đầu - Chưa hoàn thành', description: 'Học viên đã xem bài học nhưng chưa hoàn thành khóa', count: 680, icon: 'flaticon-book', color: 'bg-blue-500' },
                { title: 'Đã học - Chưa làm Trắc nghiệm', description: 'Học viên đã xem video nhưng chưa làm quiz', count: 320, icon: 'flaticon-list', color: 'bg-orange-500' },
                { title: 'Đã hoàn thành Toàn khóa', description: 'Học viên đạt tiêu chuẩn (video + quiz)', count: 420, icon: 'flaticon-checked', color: 'bg-green-500' },
            ];
            for (const r of reports) {
                await this.prisma.exportTicket.create({ data: { ...r, status: 'completed' } });
            }
        }
    }

    async getOverview() {
        return this.prisma.systemOverview.findFirst({ orderBy: { updatedAt: 'desc' } });
    }

    async getKPI() {
        return this.prisma.educationKPI.findFirst({ orderBy: { updatedAt: 'desc' } });
    }

    async getProgress() {
        return this.prisma.learningProgress.findFirst({ orderBy: { updatedAt: 'desc' } });
    }

    async getRevenue() {
        return this.prisma.revenueReport.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getUsersAnalytics() {
        return this.prisma.userAnalytics.findFirst({ orderBy: { updatedAt: 'desc' } });
    }

    async getExportReports() {
        return this.prisma.exportTicket.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createExportTicket(data: any) {
        return this.prisma.exportTicket.create({ data });
    }
}
