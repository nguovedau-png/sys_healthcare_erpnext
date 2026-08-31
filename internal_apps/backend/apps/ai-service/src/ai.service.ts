import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';

@Injectable()
export class AIService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) {}

    async onModuleInit() {        await this.seedData();
    }

    private async seedData() {
        const recCount = await this.prisma.recommendation.count();
        if (recCount === 0) {
            await this.prisma.recommendation.createMany({
                data: [
                    {
                        patientName: 'Nguyễn Văn A',
                        symptoms: 'Đau ngực, khó thở',
                        recommendedItem: 'BS. Trần Tim Mạch',
                        confidence: 0.95,
                        reason: 'Chuyên khoa phù hợp, kinh nghiệm 15 năm',
                        type: 'DOCTOR',
                    },
                    {
                        patientName: 'Trần Thị B',
                        symptoms: 'Sốt cao, ho',
                        recommendedItem: 'BS. Lê Nhi Khoa',
                        confidence: 0.88,
                        reason: 'Triệu chứng phù hợp với chuyên môn',
                        type: 'DOCTOR',
                    },
                    {
                        patientName: 'Lê Văn C',
                        symptoms: 'Đau dạ dày, buồn nôn',
                        recommendedItem: 'Viêm dạ dày cấp',
                        confidence: 0.82,
                        reason: 'Dựa trên tiền sử ăn uống và vị trí đau',
                        type: 'DIAGNOSIS',
                    },
                    {
                        patientName: 'Phạm Thị D',
                        symptoms: 'Dị ứng, mề đay',
                        recommendedItem: 'Loratadine 10mg',
                        confidence: 0.91,
                        reason: 'Kháng histamine thế hệ mới, ít tác dụng phụ',
                        type: 'MEDICATION',
                    },
                ],
            });
        }

        const statsCount = await this.prisma.aIStats.count();
        if (statsCount === 0) {
            await this.prisma.aIStats.create({
                data: {
                    accuracy: 0.92,
                    dailySuggestions: 1234,
                    acceptanceRate: 0.85,
                    modelVersion: 'v2.5',
                },
            });
        }

        const performanceCount = await this.prisma.modelPerformance.count();
        if (performanceCount === 0) {
            await this.prisma.modelPerformance.create({
                data: {
                    precision: 0.91,
                    recall: 0.89,
                    f1Score: 0.90,
                },
            });
        }
    }

    async getRecommendations(type?: string) {
        const where = type ? { type: type.toUpperCase() as any } : {};
        return this.prisma.recommendation.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    async handleFeedback(id: number, status: string) {
        return this.prisma.recommendation.update({
            where: { id },
            data: { status: status.toUpperCase() as any },
        });
    }

    async getAIStats() {
        return this.prisma.aIStats.findFirst({
            orderBy: { updatedAt: 'desc' },
        });
    }

    async getModelPerformance() {
        return this.prisma.modelPerformance.findFirst({
            orderBy: { updatedAt: 'desc' },
        });
    }

    async analyzeSymptoms(text: string) {
        const symptoms = typeof text === 'string' ? text.trim().slice(0, 2000) : '';
        if (!symptoms) throw new Error('Symptoms are required');

        const redFlagRules: Array<{ code: string; pattern: RegExp }> = [
            { code: 'BREATHING_DIFFICULTY', pattern: /khó thở|thở rít|tím tái|difficulty breathing|blue lips/i },
            { code: 'CHEST_PAIN', pattern: /đau ngực dữ dội|đau ngực trái|chest pain/i },
            { code: 'NEUROLOGICAL_CHANGE', pattern: /yếu liệt|méo miệng|nói khó|co giật|bất tỉnh|lơ mơ|seizure|unconscious/i },
            { code: 'SEVERE_BLEEDING', pattern: /chảy máu nhiều|không cầm máu|severe bleeding/i },
            { code: 'ANAPHYLAXIS', pattern: /phản vệ|sưng phù mặt|sưng môi kèm khó thở|anaphylaxis/i },
        ];
        const redFlags = redFlagRules.filter(({ pattern }) => pattern.test(symptoms)).map(({ code }) => code);
        const triageLevel = redFlags.length > 0 ? 'EMERGENCY' : 'ROUTINE_REVIEW';

        return {
            symptoms,
            triageLevel,
            redFlags,
            requiresClinicianReview: true,
            nextStep: redFlags.length > 0
                ? 'Gọi cấp cứu địa phương hoặc đến cơ sở y tế gần nhất ngay lập tức.'
                : 'Đặt lịch hoặc chuyển thông tin cho nhân viên y tế để đánh giá trực tiếp.',
            disclaimer: 'Kết quả này chỉ hỗ trợ tiếp nhận và phân luồng, không phải chẩn đoán hoặc chỉ định điều trị.',
        };
    }
}
