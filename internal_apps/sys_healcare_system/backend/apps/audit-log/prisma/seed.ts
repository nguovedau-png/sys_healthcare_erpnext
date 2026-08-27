import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create sample logs
    const log1 = await prisma.log.create({
        data: {
            level: 'INFO',
            message: 'Application started successfully',
            category: 'system',
        },
    });

    const log2 = await prisma.log.create({
        data: {
            level: 'DEBUG',
            message: 'User login attempt',
            category: 'auth',
        },
    });

    const log3 = await prisma.log.create({
        data: {
            level: 'ERROR',
            message: 'Failed to connect to external service',
            category: 'integration',
        },
    });

    console.log('✅ Logger service seeded:', { log1, log2, log3 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
