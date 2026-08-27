import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const RESOURCES = ['user', 'role', 'permission', 'job', 'audit_log', 'department', 'employee', 'system', 'chat', 'demo'];
const ACTIONS = ['create', 'read', 'update', 'delete', 'manage'];

async function main() {
    console.log('Seeding data...');

    // 1. Languages
    await prisma.language.upsert({
        where: { code: 'vi' },
        update: {},
        create: { code: 'vi', name: 'Tiếng Việt', isDefault: true },
    });
    await prisma.language.upsert({
        where: { code: 'en' },
        update: {},
        create: { code: 'en', name: 'English', isDefault: false },
    });

    // 2. Settings
    await prisma.setting.upsert({
        where: { key: 'password_complexity' },
        update: {},
        create: { key: 'password_complexity', value: { min: 8, uppercase: true, number: true }, type: 'json', description: 'Password complexity requirements', isPublic: true }
    });
    await prisma.setting.upsert({
        where: { key: 'page_size' },
        update: {},
        create: { key: 'page_size', value: 20, type: 'number', description: 'Default page size', isPublic: true }
    });

    // 3. Permissions
    console.log('Creating permissions...');
    const permissions = [];
    for (const resource of RESOURCES) {
        for (const action of ACTIONS) {
            const perm = await prisma.permission.upsert({
                where: { resource_action: { resource, action } },
                update: {},
                create: { resource, action, description: `${action} ${resource}` }
            });
            permissions.push(perm);
        }
    }

    // 4. Roles
    console.log('Creating roles...');
    // Admin Role - Full Permissions
    const adminRole = await prisma.role.upsert({
        where: { name: 'Admin' },
        update: {},
        create: { name: 'Admin', description: 'System Administrator', isSystem: true }
    });

    // Assign all permissions to Admin
    for (const perm of permissions) {
        await prisma.rolePermission.upsert({
            where: { roleId_permissionId: { roleId: adminRole.id, permissionId: perm.id } },
            update: {},
            create: { roleId: adminRole.id, permissionId: perm.id }
        });
    }

    // User Role - Read Only (Example)
    const userRole = await prisma.role.upsert({
        where: { name: 'User' },
        update: {},
        create: { name: 'User', description: 'Standard User', isSystem: false }
    });

    // Assign some permissions to User (e.g. read user, read chat)
    const userPerms = permissions.filter(p => p.action === 'read' || p.resource === 'chat');
    for (const perm of userPerms) {
        await prisma.rolePermission.upsert({
            where: { roleId_permissionId: { roleId: userRole.id, permissionId: perm.id } },
            update: {},
            create: { roleId: userRole.id, permissionId: perm.id }
        });
    }

    // 5. Admin User
    console.log('Creating admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin@123', 10);
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                fullName: 'Super Admin',
                roleId: adminRole.id,
                is2FAEnabled: false
            }
        });
        console.log(`Admin created: ${adminEmail} / ${process.env.ADMIN_PASSWORD || 'admin@123'}`);
    } else {
        console.log('Admin user already exists.');
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
