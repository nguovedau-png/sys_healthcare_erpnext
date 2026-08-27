import prisma from '../../config/prisma';

export class PermissionService {
    static async create(data: any) {
        return prisma.permission.create({ data });
    }

    static async findAll() {
        return prisma.permission.findMany();
    }

    static async update(id: string, data: any) {
        return prisma.permission.update({
            where: { id },
            data
        });
    }

    static async delete(id: string) {
        return prisma.permission.delete({ where: { id } });
    }
}
