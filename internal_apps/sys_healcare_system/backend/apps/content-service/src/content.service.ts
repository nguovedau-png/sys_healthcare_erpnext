import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from './prisma';
import { BotService } from './bot.service';
import { PaginationDto, getPaginationOptions, createPaginatedResponse, buildSearchQuery, CacheUtil } from '@app/common';

@Injectable()
export class ContentService {
    constructor(
        private prisma: PrismaService,
        private botService: BotService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    private async clearCache(pattern?: string) {
        // Pattern-based deletion is not natively supported by all cache-manager stores
        // For simplicity, we can reset or if using redis-yet specifically, it has better methods
        // But for this implementation, we'll use a prefix-based approach if possible or just clear all
        // Given this is a demo/standardized approach, we'll clear the relevant keys
        // Cache reset not universally supported - skip for now
    }

    // Posts
    async getPosts(query: PaginationDto & { sortBy?: string }) {
        const cacheKey = CacheUtil.getInternalKey('content', 'posts', query);
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) return cachedData;

        const { skip, take, orderBy } = getPaginationOptions(query);
        const where: any = buildSearchQuery(query.search, 'title', 'desc');

        if ((query as any).category && (query as any).category !== 'Tất cả' && (query as any).category !== 'all') {
            const categories = (query as any).category.split(',');
            where.Category = {
                name: { in: categories }
            };
        }

        let sortOrder: any = orderBy || { createdAt: 'desc' };
        if ((query as any).sortBy === 'view') {
            sortOrder = { view: 'desc' };
        }

        const [data, total] = await Promise.all([
            this.prisma.post.findMany({
                where,
                include: { Category: true },
                skip,
                take,
                orderBy: sortOrder,
            }),
            this.prisma.post.count({ where }),
        ]);

        const result = createPaginatedResponse(data, total, query);
        await this.cacheManager.set(cacheKey, result, 600000); // 10 minutes
        return result;
    }

    async getPost(id: number) {
        const cacheKey = CacheUtil.getInternalKey('content', 'post', String(id));
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) return cachedData;

        const result = await this.prisma.post.findUnique({ where: { id }, include: { Category: true, comments: true } });
        if (result) {
            await this.cacheManager.set(cacheKey, result, 600000);
        }
        return result;
    }

    async createPost(data: any) {
        const result = await this.prisma.post.create({ data });
        await this.clearCache();
        return result;
    }

    async updatePost(id: number, data: any) {
        const result = await this.prisma.post.update({ where: { id }, data });
        await this.clearCache();
        await this.cacheManager.del(CacheUtil.getInternalKey('content', 'post', String(id)));
        return result;
    }

    async deletePost(id: number) {
        const result = await this.prisma.post.delete({ where: { id } });
        await this.clearCache();
        await this.cacheManager.del(CacheUtil.getInternalKey('content', 'post', String(id)));
        return result;
    }

    // Categories
    async getCategories() {
        const cacheKey = CacheUtil.getInternalKey('content', 'categories', 'all');
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) return cachedData;

        const result = await this.prisma.category.findMany();
        await this.cacheManager.set(cacheKey, result, 3600000); // 1 hour
        return result;
    }

    async createCategory(data: { name: string }) {
        const result = await this.prisma.category.create({ data });
        await this.cacheManager.del('content:categories');
        return result;
    }

    async deleteCategory(id: number) {
        const result = await this.prisma.category.delete({ where: { id } });
        await this.cacheManager.del('content:categories');
        return result;
    }

    // Banners
    async getBanners(query?: { position?: string }) {
        const cacheKey = query?.position ? `content:banners:${query.position}` : 'content:banners';
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) return cachedData;

        const where: any = {};
        if (query?.position) {
            where.position = query.position;
        }

        const result = await this.prisma.banner.findMany({ where });
        await this.cacheManager.set(cacheKey, result, 3600000); // 1 hour
        return result;
    }

    async createBanner(data: any) {
        const result = await this.prisma.banner.create({ data });
        await this.cacheManager.del('content:banners');
        return result;
    }

    async deleteBanner(id: number) {
        const result = await this.prisma.banner.delete({ where: { id } });
        await this.cacheManager.del('content:banners');
        return result;
    }

    // Videos
    async getVideos() {
        const cacheKey = 'content:videos';
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) return cachedData;

        const result = await this.prisma.video.findMany();
        await this.cacheManager.set(cacheKey, result, 3600000); // 1 hour
        return result;
    }

    async createVideo(data: any) {
        return this.prisma.video.create({ data });
    }

    async deleteVideo(id: number) {
        return this.prisma.video.delete({ where: { id } });
    }

    // Static Pages
    async getStaticPages() {
        return this.prisma.staticPage.findMany();
    }

    async getStaticPageBySlug(slug: string) {
        return this.prisma.staticPage.findUnique({ where: { slug } });
    }

    async createStaticPage(data: any) {
        return this.prisma.staticPage.create({ data });
    }

    async updateStaticPage(id: number, data: any) {
        return this.prisma.staticPage.update({ where: { id }, data });
    }

    async deleteStaticPage(id: number) {
        return this.prisma.staticPage.delete({ where: { id } });
    }

    // Questions & Answers
    async getQuestions() {
        const cacheKey = 'content:questions';
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) return cachedData;

        const result = await this.prisma.question.findMany({ include: { answers: true }, orderBy: { createdAt: 'desc' } });
        await this.cacheManager.set(cacheKey, result, 600000); // 10 minutes
        return result;
    }

    async createQuestion(data: any) {
        return this.prisma.question.create({ data });
    }

    async deleteQuestion(id: number) {
        return this.prisma.question.delete({ where: { id } });
    }

    async addAnswer(questionId: number, data: any) {
        return this.prisma.answer.create({
            data: {
                ...data,
                Question: { connect: { id: questionId } },
            },
        });
    }

    // Topics
    async getTopics() {
        return this.prisma.topic.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async createTopic(data: any) {
        return this.prisma.topic.create({ data });
    }

    async deleteTopic(id: number) {
        return this.prisma.topic.delete({ where: { id } });
    }

    // Comments
    async getAllComments() {
        return this.prisma.comment.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async getComments(targetId: string, targetType: string) {
        return this.prisma.comment.findMany({
            where: { targetId, targetType },
            orderBy: { createdAt: 'desc' },
        });
    }

    async createComment(data: any) {
        return this.prisma.comment.create({
            data: {
                ...data,
                date: data.date || new Date().toISOString()
            }
        });
    }

    async deleteComment(id: number) {
        return this.prisma.comment.delete({ where: { id } });
    }

    // Top Search
    async getTopSearches() {
        return this.prisma.topSearch.findMany({ orderBy: { count: 'desc' }, take: 20 });
    }

    async recordSearch(keyword: string) {
        return this.prisma.topSearch.upsert({
            where: { keyword },
            update: { count: { increment: 1 } },
            create: { keyword, count: 1 },
        });
    }

    async pushPostToBots(postId: number, platforms: string[]) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post) throw new Error('Post not found');

        const message = `<b>${post.title}</b>\n\n${post.desc}\n\n<i>Author: ${post.author}</i>`;

        const results = [];
        if (platforms.includes('telegram')) {
            await this.botService.sendToTelegram(message);
            results.push('telegram');
        }
        if (platforms.includes('slack')) {
            await this.botService.sendToSlack(message);
            results.push('slack');
        }
        if (platforms.includes('facebook')) {
            await this.botService.sendToFacebook(message);
            results.push('facebook');
        }

        return { success: true, pushedTo: results };
    }

    // --- Diseases ---
    async getDiseases(query?: any) {
        const where: any = { isActive: true };
        if (query?.letter) where.letter = query.letter;
        if (query?.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { category: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        return this.prisma.disease.findMany({
            where,
            orderBy: [{ letter: 'asc' }, { name: 'asc' }],
        });
    }

    async getDisease(id: number) {
        return this.prisma.disease.findUnique({ where: { id } });
    }

    // --- Elder Services ---
    async getElderServices() {
        return this.prisma.elderService.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
    }

    // --- Events ---
    async getEvents(query?: any) {
        const where: any = { isActive: true };
        if (query?.type) where.type = query.type;
        return this.prisma.event.findMany({
            where,
            orderBy: { eventDate: 'asc' },
        });
    }

    async getEvent(id: number) {
        return this.prisma.event.findUnique({ where: { id } });
    }

    // --- Packages ---
    async getPackages(query?: any) {
        const where: any = { isActive: true };
        if (query?.category && query.category !== 'all') where.category = query.category;
        
        return this.prisma.package.findMany({
            where,
            orderBy: { sortOrder: 'asc' },
        });
    }

    async getPackage(id: number) {
        return this.prisma.package.findUnique({ where: { id } });
    }
}
