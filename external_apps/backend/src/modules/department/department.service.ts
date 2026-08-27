import prisma from '../../config/prisma';

export class DepartmentService {
    static async create(data: any) {
        return prisma.department.create({ data });
    }

    static async findAll() {
        return prisma.department.findMany({
            include: { _count: { select: { employees: true } } }
        });
    }

    static async findOne(id: string) {
        return prisma.department.findUnique({
            where: { id },
            include: { employees: { include: { user: true } } }
        });
    }

    static async update(id: string, data: any) {
        return prisma.department.update({
            where: { id },
            data
        });
    }

    static async delete(id: string) {
        return prisma.department.delete({ where: { id } });
    }
}
