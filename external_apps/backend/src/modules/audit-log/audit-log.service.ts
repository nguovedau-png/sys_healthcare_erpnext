import prisma from '../../config/prisma';
import { Request } from 'express';

export class AuditLogService {
    static async log(data: {
        userId?: string;
        action: string;
        resource: string;
        ipAddress?: string;
        userAgent?: string;
        method?: string;
        path?: string;
        before?: any;
        after?: any;
    }) {
        return prisma.auditLog.create({
            data
        });
    }

    static async findAll(query: any) {
        const { page = 1, limit = 20, resource, action, userId } = query;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (resource) where.resource = resource;
        if (action) where.action = action;
        if (userId) where.userId = userId;

        const [total, logs] = await Promise.all([
            prisma.auditLog.count({ where }),
            prisma.auditLog.findMany({
                where,
                skip: Number(skip),
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { email: true, fullName: true } } }
            })
        ]);

        return {
            data: logs,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}
