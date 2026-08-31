import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create payment method
    const paymentMethod = await prisma.paymentMethod.create({
        data: {
            userId: 'admin-001',
            type: 'CREDIT_CARD',
            lastFourDigits: '4242',
            expirationDate: new Date('2026-12-31'),
        },
    });

    // Create subscription
    const subscription = await prisma.subscription.create({
        data: {
            userId: 'admin-001',
            plan: 'PREMIUM',
            amount: 29.99,
            currency: 'USD',
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            status: 'ACTIVE',
            paymentMethodId: paymentMethod.id,
        },
    });

    console.log('✅ Payment service seeded:', { paymentMethod, subscription });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
