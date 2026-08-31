import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class SettingService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.setting.findMany({
            orderBy: { category: 'asc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.setting.findUnique({
            where: { id },
        });
    }

    async create(data: { key: string; value: string; description?: string; category?: string; isPublic?: boolean }) {
        return this.prisma.setting.create({
            data,
        });
    }

    async update(id: number, data: { key?: string; value?: string; description?: string; category?: string; isPublic?: boolean }) {
        return this.prisma.setting.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.setting.delete({
            where: { id },
        });
    }
}
