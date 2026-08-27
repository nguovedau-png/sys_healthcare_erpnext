import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';
import {
    PaginationDto,
    getPaginationOptions,
    createPaginatedResponse,
    buildSearchQuery
} from '@app/common';

@Injectable()
export class CommunityService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() { }

    // --- Forum ---
    async getForumTopics(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'title', 'content', 'authorName', 'category');

        const [data, total] = await Promise.all([
            this.prisma.forumTopic.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' },
                include: { _count: { select: { replies: true } } }
            }),
            this.prisma.forumTopic.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getForumTopic(id: number) {
        return this.prisma.forumTopic.findUnique({
            where: { id },
            include: { replies: true }
        });
    }

    async createForumTopic(data: any) {
        return this.prisma.forumTopic.create({ data });
    }

    async updateForumTopic(id: number, data: any) {
        return this.prisma.forumTopic.update({ where: { id }, data });
    }

    async deleteForumTopic(id: number) {
        return this.prisma.forumTopic.delete({ where: { id } });
    }

    // --- Forum Replies ---
    async createForumReply(data: { topicId: number; content: string; authorId: string; authorName: string }) {
        return this.prisma.forumReply.create({ data });
    }

    async deleteForumReply(id: number) {
        return this.prisma.forumReply.delete({ where: { id } });
    }

    // --- QA ---
    async getQAQuestions(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'title', 'content', 'authorName', 'category');

        const [data, total] = await Promise.all([
            this.prisma.qAQuestion.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' },
                include: { _count: { select: { answers: true } } }
            }),
            this.prisma.qAQuestion.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getQAQuestion(id: number) {
        return this.prisma.qAQuestion.findUnique({
            where: { id },
            include: { answers: true }
        });
    }

    async createQAQuestion(data: any) {
        return this.prisma.qAQuestion.create({ data });
    }

    async updateQAQuestion(id: number, data: any) {
        return this.prisma.qAQuestion.update({ where: { id }, data });
    }

    async deleteQAQuestion(id: number) {
        return this.prisma.qAQuestion.delete({ where: { id } });
    }

    // --- Support Groups ---
    async getSupportGroups(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'name', 'description', 'category');

        const [data, total] = await Promise.all([
            this.prisma.supportGroup.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' }
            }),
            this.prisma.supportGroup.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getSupportGroup(id: number) {
        return this.prisma.supportGroup.findUnique({ where: { id } });
    }

    async createSupportGroup(data: any) {
        return this.prisma.supportGroup.create({ data });
    }

    async updateSupportGroup(id: number, data: any) {
        return this.prisma.supportGroup.update({ where: { id }, data });
    }

    async deleteSupportGroup(id: number) {
        return this.prisma.supportGroup.delete({ where: { id } });
    }

    // --- Moderation ---
    async getModerationReports(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'reason', 'status', 'reporterName', 'targetType');

        const [data, total] = await Promise.all([
            this.prisma.moderationReport.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' }
            }),
            this.prisma.moderationReport.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createModerationReport(data: any) {
        return this.prisma.moderationReport.create({ data });
    }

    async updateModerationReport(id: number, data: any) {
        return this.prisma.moderationReport.update({ where: { id }, data });
    }

    async deleteModerationReport(id: number) {
        return this.prisma.moderationReport.delete({ where: { id } });
    }
}
