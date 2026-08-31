const { PrismaClient } = require('../../node_modules/.prisma/client-education-service');

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding Education Service...');

    // Cleanup existing data
    try {
        await prisma.question.deleteMany();
        await prisma.quiz.deleteMany();
        await prisma.lesson.deleteMany();
        await prisma.enrollment.deleteMany();
        await prisma.course.deleteMany();
        await prisma.lecturer.deleteMany();
    } catch (error) {
        console.warn('Cleanup failed (tables might be empty):', error.message);
    }

    // Create Lecturers
    const lecturers = [];
    lecturers.push(await prisma.lecturer.create({
        data: {
            name: 'Dr. Sarah Wilson',
            title: 'Senior Cardiologist',
            specialty: 'Cardiology',
            bio: 'Dr. Wilson has over 15 years of experience in cardiology and medical education.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
    }));
    lecturers.push(await prisma.lecturer.create({
        data: {
            name: 'Prof. James Chen',
            title: 'Neurology Specialist',
            specialty: 'Neurology',
            bio: 'Professor Chen is a leading researcher in neurological disorders.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
    }));
    lecturers.push(await prisma.lecturer.create({
        data: {
            name: 'Dr. Emily Brooks',
            title: 'Pediatrician',
            specialty: 'Pediatrics',
            bio: 'Passionate about child health and preventative care.',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        },
    }));

    console.log(`Created ${lecturers.length} lecturers`);

    // Create Courses
    const courses = [];
    courses.push(await prisma.course.create({
        data: {
            code: 'CARD-101',
            name: 'Advanced Cardiology Fundamentals',
            type: 'CME',
            provider: 'Health Academy',
            credits: 5,
            price: 1500000,
            status: 'active',
            description: 'Comprehensive guide to modern cardiology practices and diagnostics.',
            thumbnail: 'https://img.freepik.com/free-vector/human-heart-concept-illustration_114360-1285.jpg',
            lecturerId: lecturers[0].id,
        },
    }));
    courses.push(await prisma.course.create({
        data: {
            code: 'NEURO-201',
            name: 'Neurology Masterclass',
            type: 'CPE',
            provider: 'Global Med',
            credits: 8,
            price: 2500000,
            status: 'active',
            description: 'Deep dive into neurological system disorders and treatments.',
            thumbnail: 'https://img.freepik.com/free-vector/brain-concept-illustration_114360-1375.jpg',
            lecturerId: lecturers[1].id,
        },
    }));
    courses.push(await prisma.course.create({
        data: {
            code: 'PED-101',
            name: 'Pediatric Care Essentials',
            type: 'CME',
            provider: 'Health Academy',
            credits: 4,
            price: 1200000,
            status: 'upcoming',
            description: 'Essential knowledge for pediatric care nursing.',
            thumbnail: 'https://img.freepik.com/free-vector/pediatrician-concept-illustration_114360-3351.jpg',
            lecturerId: lecturers[2].id,
        },
    }));

    console.log(`Created ${courses.length} courses`);

    // Add Lessons to Course 1
    await prisma.lesson.createMany({
        data: [
            {
                courseId: courses[0].id,
                title: 'Introduction to Heart Anatomy',
                content: 'Overview of the four chambers and valves.',
                order: 1,
                videoUrl: 'https://www.youtube.com/watch?v=example1',
                views: 120,
            },
            {
                courseId: courses[0].id,
                title: 'ECG Interpretation Basics',
                content: 'How to read a standard 12-lead ECG.',
                order: 2,
                videoUrl: 'https://www.youtube.com/watch?v=example2',
                views: 95,
            },
            {
                courseId: courses[0].id,
                title: 'Common Arrhythmias',
                content: 'Identifying AFib, Flutter, and VTach.',
                order: 3,
                videoUrl: 'https://www.youtube.com/watch?v=example3',
                views: 80,
            },
        ],
    });

    console.log('Added lessons to Cardiology course');

    // Add Quiz to Course 1
    const quiz = await prisma.quiz.create({
        data: {
            courseId: courses[0].id,
            title: 'Cardiology Basics Quiz',
        },
    });

    await prisma.question.createMany({
        data: [
            {
                quizId: quiz.id,
                content: 'How many chambers does the human heart have?',
                options: ['Two', 'Three', 'Four', 'Six'],
                correctOption: 2,
            },
            {
                quizId: quiz.id,
                content: 'Which part of the ECG represents ventricular depolarization?',
                options: ['P Wave', 'QRS Complex', 'T Wave', 'U Wave'],
                correctOption: 1,
            },
        ],
    });

    console.log('Added quiz to Cardiology course');

    // Create Dummy Enrollments
    const studentIds = Array.from({ length: 20 }, (_, i) => `student-${i + 1}`);

    const enrollmentsData = [];

    // Enroll students in Course 1 (Active)
    for (let i = 0; i < 15; i++) {
        enrollmentsData.push({
            userId: studentIds[i],
            courseId: courses[0].id,
            status: i < 5 ? 'completed' : 'enrolled',
            progress: i < 5 ? 100 : Math.floor(Math.random() * 90),
            completedAt: i < 5 ? new Date() : null,
        });
    }

    // Enroll students in Course 2 (Active)
    for (let i = 5; i < 15; i++) {
        enrollmentsData.push({
            userId: studentIds[i],
            courseId: courses[1].id,
            status: 'enrolled',
            progress: Math.floor(Math.random() * 50),
        });
    }

    await prisma.enrollment.createMany({
        data: enrollmentsData,
    });

    console.log(`Created ${enrollmentsData.length} enrollments`);

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
