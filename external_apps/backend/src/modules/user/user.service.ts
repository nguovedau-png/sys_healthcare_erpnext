import prisma from '../../config/prisma';
import bcrypt from 'bcryptjs';

export class UserService {
    static async create(data: any) {
        const { email, password, fullName, roleId, avatar, phoneNumber } = data;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
                roleId,
                avatar,
                phoneNumber
            },
            include: { role: true }
        });

        // Remove password from response
        const { password: _, ...result } = user;
        return result;
    }

    static async findAll(query: any) {
        const { page = 1, limit = 10, search } = query;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { email: { contains: search, mode: 'insensitive' } },
                { fullName: { contains: search, mode: 'insensitive' } }
            ];
        }

        const [total, users] = await Promise.all([
            prisma.user.count({ where }),
            prisma.user.findMany({
                where,
                skip: Number(skip),
                take: Number(limit),
                include: { role: true },
                orderBy: { createdAt: 'desc' }
            })
        ]);

        return {
            data: users.map(user => {
                const { password, ...rest } = user;
                return rest;
            }),
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    static async findOne(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { role: true, employee: true }
        });

        if (!user) return null;
        const { password, ...rest } = user;
        return rest;
    }

    static async update(id: string, data: any) {
        const { password, ...updateData } = data;

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        const { password: _, ...result } = user;
        return result;
    }

    static async delete(id: string) {
        const user = await prisma.user.findUnique({ where: { id }, include: { role: true } });

        if (user?.role?.isSystem && user?.role?.name === 'Admin') {
            throw new Error('Cannot delete Admin user');
        }

        return prisma.user.delete({ where: { id } });
    }
}
