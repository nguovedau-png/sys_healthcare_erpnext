import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class AnalyticService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() {
        await this.seedData();
    }

    private async seedData() {
        const keywordCount = await this.prisma.searchKeyword.count();
        if (keywordCount === 0) {
            await this.prisma.searchKeyword.createMany({
                data: [
                    { keyword: 'dau-dau', keywordVN: 'đau đầu', times: 15420 },
                    { keyword: 'cam-cum', keywordVN: 'cảm cúm', times: 12350 },
                    { keyword: 'tieu-duong', keywordVN: 'tiểu đường', times: 9870 },
                    { keyword: 'huyet-ap', keywordVN: 'huyết áp', times: 8560 },
                    { keyword: 'dau-bung', keywordVN: 'đau bụng', times: 7230 },
                ],
            });
        }

        const hashtagCount = await this.prisma.searchHashtag.count();
        if (hashtagCount === 0) {
            await this.prisma.searchHashtag.createMany({
                data: [
                    { hashtag: 'suckhoe', hashtagVN: 'sức khỏe', times: 25600 },
                    { hashtag: 'duocsi', hashtagVN: 'dược sĩ', times: 18900 },
                    { hashtag: 'nhathuoc', hashtagVN: 'nhà thuốc', times: 14500 },
                    { hashtag: 'tuvan', hashtagVN: 'tư vấn', times: 12300 },
                    { hashtag: 'dieutri', hashtagVN: 'điều trị', times: 10800 },
                ],
            });
        }
    }

    async getKeywords() {
        return this.prisma.searchKeyword.findMany({
            orderBy: { times: 'desc' },
        });
    }

    async getHashtags() {
        return this.prisma.searchHashtag.findMany({
            orderBy: { times: 'desc' },
        });
    }

    async updateKeywordStatus(id: number, status: boolean) {
        return this.prisma.searchKeyword.update({
            where: { id },
            data: { status },
        });
    }

    async updateHashtagStatus(id: number, status: boolean) {
        return this.prisma.searchHashtag.update({
            where: { id },
            data: { status },
        });
    }

    async getDashboardStats() {
        // Aggregate high level stats. In a real world this might call other services via RPC.
        // For this demo we'll combine what we have.
        const [keywords, hashtags] = await Promise.all([
            this.getKeywords(),
            this.getHashtags()
        ]);

        return {
            topKeywords: keywords.slice(0, 5),
            topHashtags: hashtags.slice(0, 5),
            activeUsers: {
                total: 1240, // Placeholder as analytic-service doesn't track users directly yet
                weekly: 456
            },
            activityBreakdown: [
                { name: 'Consultations', value: 400 },
                { name: 'Courses', value: 300 },
                { name: 'Community', value: 300 },
                { name: 'Others', value: 240 }
            ]
        };
    }
}
