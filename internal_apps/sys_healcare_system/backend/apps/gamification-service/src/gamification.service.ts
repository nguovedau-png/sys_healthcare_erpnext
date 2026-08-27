import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class GamificationService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() {
        await this.seedData();
    }

    private async seedData() {
        const badgeCount = await this.prisma.badge.count();
        if (badgeCount === 0) {
            await this.prisma.badge.createMany({
                data: [
                    { name: 'Early Bird', description: 'Đăng nhập sớm 7 ngày liên tiếp', icon: '🌅', awarded: 234 },
                    { name: 'Health Champion', description: 'Hoàn thành 30 nhiệm vụ sức khỏe', icon: '🏆', awarded: 156 },
                    { name: 'Social Butterfly', description: 'Chia sẻ 10 bài viết', icon: '🦋', awarded: 189 },
                ],
            });
        }

        const ruleCount = await this.prisma.pointRule.count();
        if (ruleCount === 0) {
            await this.prisma.pointRule.createMany({
                data: [
                    { action: 'Đăng nhập hàng ngày', points: 10 },
                    { action: 'Hoàn thành khóa học', points: 100 },
                    { action: 'Chia sẻ bài viết', points: 20 },
                ],
            });
        }

        const userPointCount = await this.prisma.userPoint.count();
        if (userPointCount === 0) {
            await this.prisma.userPoint.createMany({
                data: [
                    { userId: 1, userName: 'Nguyễn Văn A', points: 12500, badges: 15, level: 'Platinum' },
                    { userId: 2, userName: 'Trần Thị B', points: 11200, badges: 12, level: 'Gold' },
                    { userId: 3, userName: 'Lê Văn C', points: 9800, badges: 10, level: 'Gold' },
                ],
            });
        }
    }

    async getLeaderboard() {
        return this.prisma.userPoint.findMany({
            orderBy: { points: 'desc' },
            take: 20,
        });
    }

    async getBadges() {
        return this.prisma.badge.findMany();
    }

    async getPointRules() {
        return this.prisma.pointRule.findMany();
    }

    async createBadge(data: any) {
        return this.prisma.badge.create({ data });
    }

    async updatePointRule(id: number, points: number) {
        return this.prisma.pointRule.update({
            where: { id },
            data: { points },
        });
    }

    async getGamificationStats() {
        const totalPoints = await this.prisma.userPoint.aggregate({ _sum: { points: true } });
        const totalPlayers = await this.prisma.userPoint.count();
        const totalBadges = await this.prisma.badge.count();
        const totalRules = await this.prisma.pointRule.count();
        return { totalPoints, totalPlayers, totalBadges, totalRules };
    }

    async awardPointsForBooking(data: any) {
        console.log('Awarding points for booking:', data);
        console.log(`User ${data.userId} awarded 100 points for consultation with ${data.doctorName}`);
    }

    // --- Challenges ---
    async getChallenges() {
        return this.prisma.challenge.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'asc' },
            include: { userChallenges: true },
        });
    }

    async getChallenge(id: number) {
        return this.prisma.challenge.findUnique({
            where: { id },
            include: { userChallenges: true },
        });
    }

    async joinChallenge(challengeId: number, userId: number, userName: string) {
        const existing = await this.prisma.userChallenge.findUnique({
            where: { userId_challengeId: { userId, challengeId } },
        });
        if (existing) return existing;
        await this.prisma.challenge.update({
            where: { id: challengeId },
            data: { totalJoined: { increment: 1 } },
        });
        return this.prisma.userChallenge.create({
            data: { userId, userName, challengeId, progress: 0 },
        });
    }

    async updateChallengeProgress(challengeId: number, userId: number, progress: number) {
        return this.prisma.userChallenge.update({
            where: { userId_challengeId: { userId, challengeId } },
            data: { progress },
        });
    }
}
