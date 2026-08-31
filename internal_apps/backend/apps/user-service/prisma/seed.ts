import { PrismaClient } from '@prisma/client-user-service';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function main() {
    console.log('Seeding permissions and roles...');

    // Define all permissions with categories
    const permissions = [
        // Quản lý Người dùng
        { name: 'users.view', description: 'Xem danh sách người dùng', category: 'Quản lý Người dùng' },
        { name: 'users.create', description: 'Tạo người dùng mới', category: 'Quản lý Người dùng' },
        { name: 'users.edit', description: 'Chỉnh sửa thông tin người dùng', category: 'Quản lý Người dùng' },
        { name: 'users.delete', description: 'Xóa người dùng', category: 'Quản lý Người dùng' },

        // Quản lý Vai trò & Quyền
        { name: 'roles.view', description: 'Xem danh sách vai trò', category: 'Quản lý Vai trò & Quyền' },
        { name: 'roles.create', description: 'Tạo vai trò mới', category: 'Quản lý Vai trò & Quyền' },
        { name: 'roles.edit', description: 'Chỉnh sửa vai trò', category: 'Quản lý Vai trò & Quyền' },
        { name: 'roles.delete', description: 'Xóa vai trò', category: 'Quản lý Vai trò & Quyền' },

        // Quản lý Đối tác - Hospitals
        { name: 'partners.hospitals.view', description: 'Xem danh sách bệnh viện', category: 'Quản lý Đối tác' },
        { name: 'partners.hospitals.create', description: 'Thêm bệnh viện mới', category: 'Quản lý Đối tác' },
        { name: 'partners.hospitals.edit', description: 'Chỉnh sửa thông tin bệnh viện', category: 'Quản lý Đối tác' },
        { name: 'partners.hospitals.delete', description: 'Xóa bệnh viện', category: 'Quản lý Đối tác' },

        // Quản lý Đối tác - Doctors
        { name: 'partners.doctors.view', description: 'Xem danh sách bác sĩ', category: 'Quản lý Đối tác' },
        { name: 'partners.doctors.create', description: 'Thêm bác sĩ mới', category: 'Quản lý Đối tác' },
        { name: 'partners.doctors.edit', description: 'Chỉnh sửa thông tin bác sĩ', category: 'Quản lý Đối tác' },
        { name: 'partners.doctors.delete', description: 'Xóa bác sĩ', category: 'Quản lý Đối tác' },

        // Quản lý Đối tác - Clinics
        { name: 'partners.clinics.view', description: 'Xem danh sách phòng khám', category: 'Quản lý Đối tác' },
        { name: 'partners.clinics.create', description: 'Thêm phòng khám mới', category: 'Quản lý Đối tác' },
        { name: 'partners.clinics.edit', description: 'Chỉnh sửa thông tin phòng khám', category: 'Quản lý Đối tác' },
        { name: 'partners.clinics.delete', description: 'Xóa phòng khám', category: 'Quản lý Đối tác' },

        // Quản lý Đối tác - Pharmacies
        { name: 'partners.pharmacies.view', description: 'Xem danh sách nhà thuốc', category: 'Quản lý Đối tác' },
        { name: 'partners.pharmacies.create', description: 'Thêm nhà thuốc mới', category: 'Quản lý Đối tác' },
        { name: 'partners.pharmacies.edit', description: 'Chỉnh sửa thông tin nhà thuốc', category: 'Quản lý Đối tác' },
        { name: 'partners.pharmacies.delete', description: 'Xóa nhà thuốc', category: 'Quản lý Đối tác' },

        // Quản lý Đối tác - Pharmacists
        { name: 'partners.pharmacists.view', description: 'Xem danh sách dược sĩ', category: 'Quản lý Đối tác' },
        { name: 'partners.pharmacists.create', description: 'Thêm dược sĩ mới', category: 'Quản lý Đối tác' },
        { name: 'partners.pharmacists.edit', description: 'Chỉnh sửa thông tin dược sĩ', category: 'Quản lý Đối tác' },
        { name: 'partners.pharmacists.delete', description: 'Xóa dược sĩ', category: 'Quản lý Đối tác' },

        // Quản lý Đối tác - Patients
        { name: 'partners.patients.view', description: 'Xem danh sách bệnh nhân', category: 'Quản lý Đối tác' },
        { name: 'partners.patients.create', description: 'Thêm bệnh nhân mới', category: 'Quản lý Đối tác' },
        { name: 'partners.patients.edit', description: 'Chỉnh sửa thông tin bệnh nhân', category: 'Quản lý Đối tác' },
        { name: 'partners.patients.delete', description: 'Xóa bệnh nhân', category: 'Quản lý Đối tác' },

        // Quản lý Đối tác - General
        { name: 'partners.verify', description: 'Xác thực đối tác', category: 'Quản lý Đối tác' },

        // Quản lý Giáo dục - Courses
        { name: 'education.courses.view', description: 'Xem danh sách khóa học', category: 'Quản lý Giáo dục' },
        { name: 'education.courses.create', description: 'Tạo khóa học mới', category: 'Quản lý Giáo dục' },
        { name: 'education.courses.edit', description: 'Chỉnh sửa khóa học', category: 'Quản lý Giáo dục' },
        { name: 'education.courses.delete', description: 'Xóa khóa học', category: 'Quản lý Giáo dục' },

        // Quản lý Giáo dục - Lessons
        { name: 'education.lessons.view', description: 'Xem danh sách bài học', category: 'Quản lý Giáo dục' },
        { name: 'education.lessons.create', description: 'Tạo bài học mới', category: 'Quản lý Giáo dục' },
        { name: 'education.lessons.edit', description: 'Chỉnh sửa bài học', category: 'Quản lý Giáo dục' },
        { name: 'education.lessons.delete', description: 'Xóa bài học', category: 'Quản lý Giáo dục' },

        // Quản lý Giáo dục - Enrollments
        { name: 'education.enrollments.view', description: 'Xem danh sách đăng ký', category: 'Quản lý Giáo dục' },
        { name: 'education.enrollments.manage', description: 'Quản lý đăng ký học', category: 'Quản lý Giáo dục' },

        // Quản lý Nội dung
        { name: 'content.view', description: 'Xem nội dung', category: 'Quản lý Nội dung' },
        { name: 'content.create', description: 'Tạo nội dung mới', category: 'Quản lý Nội dung' },
        { name: 'content.edit', description: 'Chỉnh sửa nội dung', category: 'Quản lý Nội dung' },
        { name: 'content.delete', description: 'Xóa nội dung', category: 'Quản lý Nội dung' },
        { name: 'content.publish', description: 'Xuất bản nội dung', category: 'Quản lý Nội dung' },

        // Quản lý Tài chính
        { name: 'finance.view', description: 'Xem báo cáo tài chính', category: 'Quản lý Tài chính' },
        { name: 'finance.withdrawals', description: 'Quản lý rút tiền', category: 'Quản lý Tài chính' },
        { name: 'finance.commissions', description: 'Quản lý hoa hồng', category: 'Quản lý Tài chính' },
        { name: 'finance.payments', description: 'Quản lý thanh toán', category: 'Quản lý Tài chính' },

        // Hệ thống & Cài đặt
        { name: 'settings.view', description: 'Xem cài đặt hệ thống', category: 'Hệ thống & Cài đặt' },
        { name: 'settings.edit', description: 'Chỉnh sửa cài đặt', category: 'Hệ thống & Cài đặt' },
        { name: 'logs.view', description: 'Xem nhật ký hệ thống', category: 'Hệ thống & Cài đặt' },
        { name: 'backup.manage', description: 'Quản lý sao lưu', category: 'Hệ thống & Cài đặt' },
    ];

    // Create permissions
    console.log('Creating permissions...');
    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: { name: permission.name },
            update: {},
            create: permission,
        });
    }
    console.log(`✅ Created ${permissions.length} permissions`);

    // Get all permissions for role assignment
    const allPermissions = await prisma.permission.findMany();

    // Define roles with their permissions
    const roles = [
        {
            name: 'Super Admin',
            description: 'Quản trị viên cấp cao nhất với toàn quyền truy cập',
            permissionNames: allPermissions.map(p => p.name), // All permissions
        },
        {
            name: 'Admin',
            description: 'Quản trị viên hệ thống với hầu hết các quyền',
            permissionNames: allPermissions
                .filter(p => !['backup.manage', 'settings.edit'].includes(p.name))
                .map(p => p.name),
        },
        {
            name: 'Partner Manager',
            description: 'Quản lý đối tác và mạng lưới y tế',
            permissionNames: allPermissions
                .filter(p => p.category === 'Quản lý Đối tác' || p.name === 'users.view')
                .map(p => p.name),
        },
        {
            name: 'Education Manager',
            description: 'Quản lý nội dung giáo dục và khóa học',
            permissionNames: allPermissions
                .filter(p => p.category === 'Quản lý Giáo dục' || p.name === 'users.view')
                .map(p => p.name),
        },
        {
            name: 'Content Manager',
            description: 'Quản lý nội dung và bài viết',
            permissionNames: allPermissions
                .filter(p => p.category === 'Quản lý Nội dung' || p.name === 'users.view')
                .map(p => p.name),
        },
        {
            name: 'Finance Manager',
            description: 'Quản lý tài chính và thanh toán',
            permissionNames: allPermissions
                .filter(p => p.category === 'Quản lý Tài chính' || p.name === 'users.view')
                .map(p => p.name),
        },
        {
            name: 'Viewer',
            description: 'Chỉ có quyền xem, không có quyền chỉnh sửa',
            permissionNames: allPermissions
                .filter(p => p.name.endsWith('.view'))
                .map(p => p.name),
        },
    ];

    // Create roles
    console.log('Creating roles...');
    for (const role of roles) {
        const rolePermissions = allPermissions.filter(p => role.permissionNames.includes(p.name));
        await prisma.role.upsert({
            where: { name: role.name },
            update: {
                description: role.description,
                permissions: {
                    set: rolePermissions.map(p => ({ id: p.id })),
                },
            },
            create: {
                name: role.name,
                description: role.description,
                permissions: {
                    connect: rolePermissions.map(p => ({ id: p.id })),
                },
            },
        });
    }
    console.log(`✅ Created ${roles.length} roles`);

    // Get created roles for assignment
    const superAdminRole = await prisma.role.findUnique({ where: { name: 'Super Admin' } });
    const viewerRole = await prisma.role.findUnique({ where: { name: 'Viewer' } });

    // Create admin user
    const hashedPassword = await bcrypt.hash('123456', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {
            name: 'Admin User',
            phone: '0901234567',
            address: '123 Nguyễn Huệ, Q1, TP.HCM',
            department: 'IT',
            position: 'Quản trị viên hệ thống',
            isActive: true,
            roleId: superAdminRole?.id,
        },
        create: {
            userId: 'admin-002',
            email: 'admin@gmail.com',
            password: hashedPassword,
            name: 'Admin User',
            phone: '0901234567',
            address: '123 Nguyễn Huệ, Q1, TP.HCM',
            department: 'IT',
            position: 'Quản trị viên hệ thống',
            isActive: true,
            roleId: superAdminRole?.id,
        },
    });

    // Create test user
    const testHashedPassword = await bcrypt.hash('test123', 10);
    const testUser = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {
            name: 'Test User',
            phone: '0987654321',
            address: '456 Lê Lợi, Q1, TP.HCM',
            department: 'Medical',
            position: 'Bác sĩ chuyên khoa',
            isActive: true,
            roleId: viewerRole?.id,
        },
        create: {
            userId: 'user-001',
            email: 'test@example.com',
            password: testHashedPassword,
            name: 'Test User',
            phone: '0987654321',
            address: '456 Lê Lợi, Q1, TP.HCM',
            department: 'Medical',
            position: 'Bác sĩ chuyên khoa',
            isActive: true,
            roleId: viewerRole?.id,
        },
    });

    console.log('✅ Seeding completed successfully!');
    console.log(`   - ${permissions.length} permissions created`);
    console.log(`   - ${roles.length} roles created`);
    console.log(`   - 2 users created (admin@gmail.com, test@example.com)`);
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
