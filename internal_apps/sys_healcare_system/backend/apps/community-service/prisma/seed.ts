import { PrismaClient } from '../../../node_modules/.prisma/client-community-service';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding community-service...');

    // Questions
    await prisma.qAQuestion.create({
        data: {
            question: 'How do I reset my password?',
            content: 'I cannot find the reset password link in the settings page.',
            askedById: 'user-001',
            askedByName: 'Test User',
            category: 'Account',
            status: 'pending',
            answers: {
                create: {
                    content: 'You can reset it from the login screen by clicking "Forgot Password".',
                    answeredById: 'admin-002',
                    answeredByName: 'Admin User',
                },
            },
        },
    });

    await prisma.qAQuestion.create({
        data: {
            question: 'Is there a mobile app?',
            content: 'Does this platform have an iOS application?',
            askedById: 'user-003',
            askedByName: 'John Doe',
            category: 'General',
            status: 'resolved',
        },
    });
    console.log('Seeded Questions');

    // Forum Topics
    const topic = await prisma.forumTopic.create({
        data: {
            title: 'Best practices for patient data security',
            content: 'Let\'s discuss how we can improve security...',
            authorId: 'admin-002',
            authorName: 'Admin User',
            category: 'Security',
            status: 'active',
            views: 150,
            replies: {
                create: [
                    {
                        content: 'I agree, encryption is key.',
                        authorId: 'user-001',
                        authorName: 'Test User',
                    },
                ],
            },
        },
    });
    console.log('Seeded Forum Topics');

    // Support Groups
    await prisma.supportGroup.createMany({
        data: [
            {
                name: 'Diabetes Support',
                description: 'A group for managing diabetes.',
                moderatorId: 'admin-002',
                moderatorName: 'Dr. Admin',
                membersCount: 45,
                postsCount: 120,
            },
            {
                name: 'New Parents',
                description: 'Support for new parents.',
                moderatorId: 'admin-002',
                moderatorName: 'Nurse Joy',
                membersCount: 30,
                postsCount: 80,
            },
        ],
    });
    console.log('Seeded Support Groups');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
