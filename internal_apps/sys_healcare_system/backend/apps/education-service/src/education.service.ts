import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from './prisma';
import {
    PaginationDto,
    getPaginationOptions,
    createPaginatedResponse,
    buildSearchQuery
} from '@app/common';

@Injectable()
export class EducationService implements OnModuleInit {
    constructor(
        private readonly prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async onModuleInit() {
        console.log(' एजुकेशन EducationService initialized');
    }

    private async clearCache() {
        // Cache reset not universally supported - skip for now
    }

    // Course CRUD
    async getCourses(query: PaginationDto) {
        const cacheKey = `education:courses:${JSON.stringify(query)}`;
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) return cachedData;

        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'title', 'code', 'description');

        const [data, total] = await Promise.all([
            this.prisma.course.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' },
                include: { lecturer: true }
            }),
            this.prisma.course.count({ where }),
        ]);

        const result = createPaginatedResponse(data, total, query);
        await this.cacheManager.set(cacheKey, result, 600000); // 10 minutes
        return result;
    }

    async getCourse(id: string) {
        const cacheKey = `education:course:${id}`;
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) return cachedData;

        const result = await this.prisma.course.findUnique({ where: { id }, include: { lecturer: true, lessons: true, quizzes: true } });
        if (result) {
            await this.cacheManager.set(cacheKey, result, 600000);
        }
        return result;
    }

    async createCourse(data: any) {
        const result = await this.prisma.course.create({ data });
        await this.clearCache();
        return result;
    }

    async updateCourse(id: string, data: any) {
        const result = await this.prisma.course.update({ where: { id }, data });
        await this.clearCache();
        await this.cacheManager.del(`education:course:${id}`);
        return result;
    }

    async deleteCourse(id: string) {
        const result = await this.prisma.course.delete({ where: { id } });
        await this.clearCache();
        await this.cacheManager.del(`education:course:${id}`);
        return result;
    }

    // Lecturer CRUD
    async getLecturers() {
        return this.prisma.lecturer.findMany();
    }

    async createLecturer(data: any) {
        return this.prisma.lecturer.create({ data });
    }

    // Enrollment logic
    async getEnrollments(userId: string | undefined, query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = {
            ...buildSearchQuery(query.search, 'status'),
            ...(userId ? { userId } : {}),
        };

        const [data, total] = await Promise.all([
            this.prisma.enrollment.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { enrolledAt: 'desc' },
                include: { course: true }
            }),
            this.prisma.enrollment.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async enrollUser(userId: string, courseId: string) {
        return this.prisma.enrollment.create({
            data: { userId, courseId }
        });
    }

    // Quiz logic
    async getQuizzes(courseId: string) {
        return this.prisma.quiz.findMany({
            where: { courseId },
            include: { questions: true }
        });
    }

    // Analytics
    async getAnalytics() {
        const [totalCourses, totalLessons, totalEnrollments, avgRating] = await Promise.all([
            this.prisma.course.count(),
            this.prisma.lesson.count(),
            this.prisma.enrollment.count(),
            // Mocking average rating as it's not in the schema explicitly aggregated yet
            Promise.resolve(4.5)
        ]);

        return {
            totalCourses,
            totalLessons,
            activeStudents: totalEnrollments, // Approximating active students as total enrollments for now
            avgRating
        };
    }

    // Import Students
    async importStudents(data: any[]) {
        const results = [];
        for (const student of data) {
            // Mocking logic: In a real scenario, we would check if user exists in UserService via RPC
            // For now, we assume userId is provided or we generate a placeholder enrollment
            // If the input data has 'courseId' and 'userId' (or we map email to userId), we enroll them.

            // Simplified logic: Create enrollment if courseId exists
            if (student.courseId) {
                // Check if course exists
                const course = await this.prisma.course.findFirst({
                    where: { OR: [{ id: student.courseId }, { code: student.courseId }] }
                });

                if (course) {
                    // Determine userId. Ideally look up by email. 
                    // Here we'll just mock a userId if not present, or skip if no userId mechanism
                    const userId = student.userId || `user_imported_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

                    try {
                        const enrollment = await this.prisma.enrollment.create({
                            data: {
                                userId,
                                courseId: course.id,
                                status: 'enrolled',
                                progress: 0
                            }
                        });
                        results.push({ ...student, status: 'success', enrollmentId: enrollment.id });
                    } catch (e) {
                        results.push({ ...student, status: 'error', message: 'Already enrolled or error' });
                    }
                } else {
                    results.push({ ...student, status: 'error', message: 'Course not found' });
                }
            } else {
                results.push({ ...student, status: 'error', message: 'Missing courseId' });
            }
        }
        return results;
    }
}
