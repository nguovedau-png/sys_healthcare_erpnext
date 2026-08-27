const { PrismaClient } = require('/Users/mithang/Downloads/ProjectEcosystems/healthcare-saas-microservice/backend/node_modules/.prisma/client-jobs-service');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Job Postings...');

    const pharmacyId1 = 'p1';
    const pharmacyId2 = 'p2';
    const pharmacyId3 = 'p3';

    try {
        // Clean up first (optional, be careful with production)
        // await prisma.jobPosting.deleteMany({});

        await prisma.jobPosting.createMany({
            data: [
                {
                    pharmacyId: pharmacyId1,
                    pharmacyName: 'Nhà thuốc An Khang',
                    position: 'Dược sĩ trưởng bán thời gian',
                    description: 'Quản lý quầy thuốc, tư vấn khách hàng, kiểm soát nhập xuất tồn.',
                    requirements: ['Chứng chỉ hành nghề', 'Kinh nghiệm 2 năm', 'Giao tiếp tốt'],
                    salary: '10.000.000 - 15.000.000 đ',
                    location: 'Q. Bình Thạnh, TP.HCM',
                    type: 'part-time',
                    status: 'open',
                    postedDate: new Date('2024-12-15T10:00:00Z'),
                },
                {
                    pharmacyId: pharmacyId2,
                    pharmacyName: 'Nhà thuốc Long Châu',
                    position: 'Dược sĩ bán hàng',
                    description: 'Tư vấn bán hàng, sắp xếp quầy kệ, vệ sinh cửa hàng.',
                    requirements: ['Tốt nghiệp Trung cấp Dược trở lên', 'Nhanh nhẹn', 'Trung thực'],
                    salary: '8.000.000 - 12.000.000 đ',
                    location: 'Q. 1, TP.HCM',
                    type: 'full-time',
                    status: 'open',
                    postedDate: new Date('2024-12-18T09:00:00Z'),
                },
                {
                    pharmacyId: pharmacyId3,
                    pharmacyName: 'Pharmacity',
                    position: 'Quản lý cửa hàng',
                    description: 'Chịu trách nhiệm doanh số, quản lý nhân sự, làm việc với cơ quan chức năng.',
                    requirements: ['Đại học Dược', 'Kinh nghiệm quản lý', 'Tiếng Anh giao tiếp'],
                    salary: 'Thỏa thuận',
                    location: 'Q. 3, TP.HCM',
                    type: 'full-time',
                    status: 'open',
                    postedDate: new Date('2024-12-20T08:00:00Z'),
                },
            ],
            skipDuplicates: true, // Avoid errors if run multiple times
        });
        console.log('Seeding completed.');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
