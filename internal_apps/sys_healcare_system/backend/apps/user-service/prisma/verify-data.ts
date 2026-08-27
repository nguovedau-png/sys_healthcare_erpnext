import { PrismaClient } from '@prisma/client-user-service';

const prisma = new PrismaClient();

async function verifyData() {
    console.log('🔍 Verifying database content...\n');

    try {
        // Check Permissions
        const permissionCount = await prisma.permission.count();
        console.log(`📋 Permissions: ${permissionCount}`);
        
        if (permissionCount > 0) {
            const permissions = await prisma.permission.findMany({ take: 5 });
            console.log('   Sample permissions:');
            permissions.forEach(p => console.log(`   - ${p.name}: ${p.description}`));
        }

        // Check Roles
        const roleCount = await prisma.role.count();
        console.log(`\n👥 Roles: ${roleCount}`);
        
        if (roleCount > 0) {
            const roles = await prisma.role.findMany({
                include: { _count: { select: { permissions: true } } }
            });
            roles.forEach(r => console.log(`   - ${r.name} (${r._count.permissions} permissions)`));
        }

        // Check Users
        const userCount = await prisma.user.count();
        console.log(`\n👤 Users: ${userCount}`);
        
        if (userCount > 0) {
            const users = await prisma.user.findMany({
                include: { 
                    role: { select: { name: true } }
                }
            });
            users.forEach(u => console.log(`   - ${u.email} (${u.name}) - Role: ${u.role?.name || 'No role'}`));
        }

        console.log('\n✅ Verification complete!');
        
        if (permissionCount === 0 && roleCount === 0 && userCount === 0) {
            console.log('\n⚠️  WARNING: Database is empty! Seed data not found.');
            console.log('Running seed automatically...\n');
            await prisma.$disconnect();
            
            // Import and run seed
            const { main } = await import('./seed');
            await main();
        }

    } catch (error) {
        console.error('❌ Error verifying database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

verifyData();
