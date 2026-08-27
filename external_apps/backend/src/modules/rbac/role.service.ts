import prisma from '../../config/prisma';
import cacheService from '../../utils/cache';

export class RoleService {
    static async create(data: any) {
        const { name, description, permissionIds } = data;

        const role = await prisma.role.create({
            data: {
                name,
                description,
                permissions: {
                    create: permissionIds?.map((id: string) => ({
                        permission: { connect: { id } }
                    }))
                }
            },
            include: { permissions: { include: { permission: true } } }
        });

        await cacheService.invalidatePattern('cache:/api/v1/roles*');

        return role;
    }

    static async findAll() {
        return prisma.role.findMany({
            include: { permissions: { include: { permission: true } } }
        });
    }

    static async findOne(id: string) {
        return prisma.role.findUnique({
            where: { id },
            include: { permissions: { include: { permission: true } } }
        });
    }

    static async update(id: string, data: any) {
        const { name, description, permissionIds } = data;

        // Transaction to update role and permissions
        const role = await prisma.$transaction(async (tx) => {
            const updatedRole = await tx.role.update({
                where: { id },
                data: { name, description }
            });

            if (permissionIds) {
                // Remove old permissions
                await tx.rolePermission.deleteMany({ where: { roleId: id } });

                // Add new permissions
                for (const permId of permissionIds) {
                    await tx.rolePermission.create({
                        data: {
                            roleId: id,
                            permissionId: permId
                        }
                    });
                }
            }
            return updatedRole;
        });

        await cacheService.invalidatePattern('cache:/api/v1/roles*');

        return this.findOne(id);
    }

    static async delete(id: string) {
        const role = await prisma.role.findUnique({ where: { id } });
        if (role && role.isSystem) {
            throw new Error('Cannot delete system role');
        }
        await cacheService.invalidatePattern('cache:/api/v1/roles*');
        return prisma.role.delete({ where: { id } });
    }
}
