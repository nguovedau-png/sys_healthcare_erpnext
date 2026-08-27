import { PrismaClient } from '../../../node_modules/.prisma/client-education-service';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding Education Service...');

    // Cleanup existing data
    await prisma.question.deleteMany();
    await prisma.quiz.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.course.deleteMany();
    await prisma.lecturer.deleteMany();

    // Create Lecturers
    const lecturers = await Promise.all([
        prisma.lecturer.create({
            data: {
                name: 'Dr. Sarah Wilson',
                title: 'Senior Cardiologist',
                specialty: 'Cardiology',
                bio: 'Dr. Wilson has over 15 years of experience in cardiology and medical education.',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            },
        }),
        prisma.lecturer.create({
            data: {
                name: 'Prof. James Chen',
                title: 'Neurology Specialist',
                specialty: 'Neurology',
                bio: 'Professor Chen is a leading researcher in neurological disorders.',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
        }),
        prisma.lecturer.create({
            data: {
                name: 'Dr. Emily Brooks',
                title: 'Pediatrician',
                specialty: 'Pediatrics',
                bio: 'Passionate about child health and preventative care.',
                avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            },
        }),
    ]);

    console.log(`Created ${lecturers.length} lecturers`);

    // Create Courses
    const courses = await Promise.all([
        prisma.course.create({
            data: {
                code: 'CARD-101',
                name: 'Advanced Cardiology Fundamentals',
                type: 'CME',
                provider: 'Health Academy',
                credits: 5,
                price: 1500000, // 1.5M VND
                status: 'active',
                description: 'Comprehensive guide to modern cardiology practices and diagnostics.',
                thumbnail: 'https://img.freepik.com/free-vector/human-heart-concept-illustration_114360-1285.jpg',
                lecturerId: lecturers[0].id,
            },
        }),
        prisma.course.create({
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
        }),
        prisma.course.create({
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
        }),
    ]);

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

    // Seed CPE Master Data
    await prisma.cpeMasterData.deleteMany();
    await prisma.cpeMasterData.createMany({
        data: [
            {
                categoryId: 'CAT-001',
                divisionId: 1,
                dmName: 'Nguyen Van A',
                dmPhone: '0909000111',
                dmCode: 'DM001',
                repName: 'Tran Thi B',
                repPhone: '0909000222',
                repCode: 'REP001',
                status: true,
                userTotal: 150
            },
            {
                categoryId: 'CAT-002',
                divisionId: 2,
                dmName: 'Le Van C',
                dmPhone: '0909000333',
                dmCode: 'DM002',
                repName: 'Pham Thi D',
                repPhone: '0909000444',
                repCode: 'REP002',
                status: true,
                userTotal: 200
            }
        ]
    });
    console.log('Seeded CPE Master Data');

    // Seed CPE Reports (Day, Week, Month)
    await prisma.cpeDashboardDay.deleteMany();
    await prisma.cpeDashboardDay.createMany({
        data: [
            { totalCourses: 10, totalLessons: 50, totalActiveUsers: 100, totalUserLearn: 80, totalClicks: 500, createDate: new Date('2024-01-01T00:00:00Z') },
            { totalCourses: 12, totalLessons: 55, totalActiveUsers: 110, totalUserLearn: 85, totalClicks: 550, createDate: new Date('2024-01-02T00:00:00Z') },
            { totalCourses: 15, totalLessons: 60, totalActiveUsers: 120, totalUserLearn: 90, totalClicks: 600, createDate: new Date() } // Today
        ]
    });

    await prisma.cpeDashboardWeek.deleteMany();
    await prisma.cpeDashboardWeek.createMany({
        data: [
            { totalCourses: 10, totalLessons: 50, totalActiveUsers: 100, totalUserLearn: 80, totalClicks: 500, week: 51, year: 2023, createDate: new Date('2023-12-25T00:00:00Z') },
            { totalCourses: 12, totalLessons: 55, totalActiveUsers: 110, totalUserLearn: 85, totalClicks: 550, week: 52, year: 2023, createDate: new Date('2024-01-01T00:00:00Z') },
            { totalCourses: 15, totalLessons: 60, totalActiveUsers: 120, totalUserLearn: 90, totalClicks: 600, week: 1, year: 2024, createDate: new Date() }
        ]
    });

    await prisma.cpeDashboardMonth.deleteMany();
    await prisma.cpeDashboardMonth.createMany({
        data: [
            { totalCourses: 10, totalLessons: 50, totalActiveUsers: 100, totalUserLearn: 80, totalClicks: 500, month: 11, year: 2023, createDate: new Date('2023-11-01T00:00:00Z') },
            { totalCourses: 12, totalLessons: 55, totalActiveUsers: 110, totalUserLearn: 85, totalClicks: 550, month: 12, year: 2023, createDate: new Date('2023-12-01T00:00:00Z') },
            { totalCourses: 15, totalLessons: 60, totalActiveUsers: 120, totalUserLearn: 90, totalClicks: 600, month: 1, year: 2024, createDate: new Date() }
        ]
    });
    console.log('Seeded CPE Reports');

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
