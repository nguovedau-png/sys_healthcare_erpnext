import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma';
import {
    PaginationDto,
    getPaginationOptions,
    createPaginatedResponse,
    buildSearchQuery
} from '@app/common';

@Injectable()
export class SeminarService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() {
        await this.seedData();
    }

    private async seedData() {
        const seminarCount = await this.prisma.seminar.count();
        if (seminarCount === 0) {
            await this.prisma.seminar.create({
                data: {
                    id: 1,
                    title: 'Cập nhật điều trị Đái tháo đường 2024',
                    date: '20/05/2026',
                    location: 'Trung tâm Hội nghị Quốc gia, Hà Nội',
                    capacity: 500,
                    registrations: 120,
                    status: 'Active',
                    banners: {
                        create: [
                            { image: 'https://images.unsplash.com/photo-1505751172107-573225a912b0?auto=format&fit=crop&q=80', priority: 1 }
                        ]
                    },
                    sessions: {
                        create: [
                            { time: '08:00 - 09:00', topic: 'Khai mạc & Giới thiệu', speaker: 'GS. TS. Nguyễn Văn A' },
                            { time: '09:00 - 10:30', topic: 'Cập nhật ADA 2024', speaker: 'PGS. TS. Trần Thị B' }
                        ]
                    }
                }
            });
            await this.prisma.seminar.create({
                data: {
                    id: 2,
                    title: 'Hội thảo Tim mạch học Việt Nam',
                    date: '15/06/2026',
                    location: 'Khách sạn Sheraton, TP.HCM',
                    capacity: 300,
                    registrations: 45,
                    status: 'Active'
                }
            });
        }
    }

    // --- Seminars ---
    async getSeminars(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'title', 'location', 'status');

        const [data, total] = await Promise.all([
            this.prisma.seminar.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' },
                include: {
                    banners: true,
                    sessions: true,
                    attendees: true,
                }
            }),
            this.prisma.seminar.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getSeminarById(id: number) {
        return this.prisma.seminar.findUnique({
            where: { id },
            include: {
                banners: true,
                sessions: true,
                attendees: true,
            }
        });
    }

    async createSeminar(data: any) {
        return this.prisma.seminar.create({ data });
    }

    async updateSeminar(id: number, data: any) {
        return this.prisma.seminar.update({
            where: { id },
            data,
        });
    }

    async deleteSeminar(id: number) {
        return this.prisma.seminar.delete({
            where: { id },
        });
    }

    // --- Banners ---
    async getBanners(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);

        const [data, total] = await Promise.all([
            this.prisma.seminarBanner.findMany({
                skip,
                take,
                orderBy: orderBy || { id: 'desc' },
                include: { seminar: true }
            }),
            this.prisma.seminarBanner.count(),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createBanner(data: any) {
        return this.prisma.seminarBanner.create({ data });
    }

    async deleteBanner(id: number) {
        return this.prisma.seminarBanner.delete({ where: { id } });
    }

    // --- Attendees ---
    async getAttendees(query: PaginationDto & { seminarId?: number }) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const searchWhere = buildSearchQuery(query.search, 'name', 'email', 'phone');

        const where = {
            ...searchWhere,
            ...(query.seminarId ? { seminarId: query.seminarId } : {})
        };

        const [data, total] = await Promise.all([
            this.prisma.seminarAttendee.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { id: 'desc' },
            }),
            this.prisma.seminarAttendee.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }
    async getAttendeeStats(seminarId: number) {
        const [total, checkedIn] = await Promise.all([
            this.prisma.seminarAttendee.count({ where: { seminarId } }),
            this.prisma.seminarAttendee.count({ where: { seminarId, checkedIn: true } }),
        ]);
        return { total, checkedIn };
    }

    async createAttendee(data: any) {
        return this.prisma.seminarAttendee.create({ data });
    }

    async updateAttendee(id: number, data: any) {
        return this.prisma.seminarAttendee.update({
            where: { id },
            data,
        });
    }

    async deleteAttendee(id: number) {
        return this.prisma.seminarAttendee.delete({ where: { id } });
    }

    // --- Invitations ---
    async getInvitations(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);

        const [data, total] = await Promise.all([
            this.prisma.seminarInvitation.findMany({
                skip,
                take,
                orderBy: orderBy || { id: 'desc' },
                include: { seminar: true }
            }),
            this.prisma.seminarInvitation.count(),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createInvitation(data: any) {
        return this.prisma.seminarInvitation.create({ data });
    }

    // --- Sessions ---
    async getSessions(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'topic', 'speaker');

        const [data, total] = await Promise.all([
            this.prisma.seminarSession.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { id: 'desc' },
                include: { seminar: true }
            }),
            this.prisma.seminarSession.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createSession(data: any) {
        return this.prisma.seminarSession.create({ data });
    }

    async updateSession(id: number, data: any) {
        return this.prisma.seminarSession.update({
            where: { id },
            data,
        });
    }

    async deleteSession(id: number) {
        return this.prisma.seminarSession.delete({ where: { id } });
    }

    // --- Speakers ---
    async getSpeakers(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'name', 'title');

        const [data, total] = await Promise.all([
            this.prisma.seminarSpeaker.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { id: 'desc' },
            }),
            this.prisma.seminarSpeaker.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async createSpeaker(data: any) {
        return this.prisma.seminarSpeaker.create({ data });
    }

    async updateSpeaker(id: number, data: any) {
        return this.prisma.seminarSpeaker.update({
            where: { id },
            data,
        });
    }

    async deleteSpeaker(id: number) {
        return this.prisma.seminarSpeaker.delete({ where: { id } });
    }
}
