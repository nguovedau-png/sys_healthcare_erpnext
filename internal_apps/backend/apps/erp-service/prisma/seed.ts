import { PrismaClient } from '../../../node_modules/.prisma/client-erp-service';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ERP Service...');

    // Create sample ERP keys
    const erpKey1 = await prisma.erpKey.upsert({
        where: { key: 'test-erp-key-12345' },
        update: {},
        create: {
            key: 'test-erp-key-12345',
            name: 'Test ERP Key',
            userId: 'admin-001',
            isActive: true,
        },
    });

    const erpKey2 = await prisma.erpKey.upsert({
        where: { key: 'demo-erp-key-67890' },
        update: {},
        create: {
            key: 'demo-erp-key-67890',
            name: 'Demo ERP Key',
            userId: 'user-001',
            isActive: true,
        },
    });

    console.log('✅ ERP Key service seeded:', { erpKey1, erpKey2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
