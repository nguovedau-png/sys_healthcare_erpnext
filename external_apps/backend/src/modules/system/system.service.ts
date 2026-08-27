import prisma from '../../config/prisma';

export class LanguageService {
    static async create(data: any) {
        return prisma.language.create({ data });
    }

    static async findAll() {
        return prisma.language.findMany();
    }

    static async update(id: string, data: any) {
        return prisma.language.update({ where: { id }, data });
    }

    static async delete(id: string) {
        return prisma.language.delete({ where: { id } });
    }
}

export class SettingService {
    static async create(data: any) {
        return prisma.setting.create({ data });
    }

    static async findAll(isAdmin: boolean = false) {
        if (isAdmin) {
            return prisma.setting.findMany();
        }
        return prisma.setting.findMany({ where: { isPublic: true } });
    }

    static async findByKey(key: string) {
        return prisma.setting.findUnique({ where: { key } });
    }

    static async update(key: string, value: any) {
        return prisma.setting.update({
            where: { key },
            data: { value }
        });
    }

    static async delete(id: string) {
        return prisma.setting.delete({ where: { id } });
    }
}

import fs from 'fs';
import path from 'path';

export class HealthService {
    static async check() {
        const health: any = {
            status: 'ok',
            timestamp: new Date(),
            services: {}
        };

        // 1. Database Check
        try {
            await prisma.$queryRaw`SELECT 1`;
            health.services.database = { status: 'up' };
        } catch (error: any) {
            health.services.database = { status: 'down', error: error.message };
            health.status = 'error';
        }

        // 2. Disk/Uploads Check
        try {
            const uploadPath = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            fs.accessSync(uploadPath, fs.constants.W_OK);
            health.services.uploads = { status: 'up', path: uploadPath };
        } catch (error: any) {
            health.services.uploads = { status: 'down', error: error.message };
            health.status = 'error';
        }

        // 3. Memory Usage
        const used = process.memoryUsage();
        health.system = {
            memory: {
                rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
                heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
                heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
            },
            uptime: `${Math.round(process.uptime())}s`
        };

        return health;
    }
}
