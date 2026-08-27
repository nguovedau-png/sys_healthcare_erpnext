import prisma from '../src/config/prisma';

async function testSync() {
    console.log('--- Testing Real-time Sync ---');

    const testEmail = `test_sync_${Date.now()}@example.com`;
    
    // 1. Test Create
    console.log(`Step 1: Creating user ${testEmail}...`);
    const newUser = await prisma.user.create({
        data: {
            email: testEmail,
            fullName: 'Test Sync User',
            isActive: true,
            roleId: (await prisma.role.findFirst())?.id || 'admin'
        }
    });
    console.log('User created. Hook should have queued a sync job.');

    // Wait a bit for the worker to process
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 2. Test Update
    console.log(`Step 2: Updating user ${testEmail}...`);
    await prisma.user.update({
        where: { id: newUser.id },
        data: { fullName: 'Test Sync User Updated' }
    });
    console.log('User updated. Hook should have queued an update sync job.');

    await new Promise(resolve => setTimeout(resolve, 3000));

    // 3. Test Delete
    console.log(`Step 3: Deleting user ${testEmail}...`);
    await prisma.user.delete({
        where: { id: newUser.id }
    });
    console.log('User deleted. Hook should have queued a delete sync job.');

    console.log('--- Test script finished. Check worker logs and ERPNext. ---');
}

testSync().catch(console.error);
