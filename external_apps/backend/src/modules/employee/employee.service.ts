import prisma from '../../config/prisma';

export class EmployeeService {
    static async create(data: any) {
        // userId must exist and not be assigned to another employee
        const { userId, departmentId, position, salary, hireDate } = data;

        const existingEmployee = await prisma.employee.findUnique({ where: { userId } });
        if (existingEmployee) {
            throw new Error('User is already an employee');
        }

        return prisma.employee.create({
            data: {
                userId,
                departmentId,
                position,
                salary,
                hireDate
            },
            include: { user: true, department: true }
        });
    }

    static async findAll(query: any) {
        const { page = 1, limit = 10, search, departmentId } = query;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (departmentId) where.departmentId = departmentId;
        if (search) {
            where.user = {
                OR: [
                    { fullName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } }
                ]
            };
        }

        const [total, employees] = await Promise.all([
            prisma.employee.count({ where }),
            prisma.employee.findMany({
                where,
                skip: Number(skip),
                take: Number(limit),
                include: { user: true, department: true },
                orderBy: { createdAt: 'desc' }
            })
        ]);

        return {
            data: employees,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    static async findOne(id: string) {
        return prisma.employee.findUnique({
            where: { id },
            include: { user: true, department: true }
        });
    }

    static async update(id: string, data: any) {
        return prisma.employee.update({
            where: { id },
            data,
            include: { user: true, department: true }
        });
    }

    static async delete(id: string) {
        return prisma.employee.delete({ where: { id } });
    }
}
