import { PrismaClient } from '../../../node_modules/.prisma/client-survey-service';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding survey data...');

    // Survey 1: Khảo sát mức độ hài lòng nhân viên
    const survey1 = await prisma.survey.create({
        data: {
            title: 'Khảo sát mức độ hài lòng nhân viên 2024',
            description: 'Khảo sát định kỳ nhằm đánh giá mức độ hài lòng của nhân viên về môi trường làm việc, phúc lợi và cơ hội phát triển.',
            status: 'ACTIVE',
            questions: {
                create: [
                    {
                        content: 'Bạn cảm thấy thế nào về môi trường làm việc hiện tại?',
                        type: 'SINGLE_CHOICE',
                        order: 1,
                        options: {
                            create: [
                                { content: 'Rất hài lòng', order: 1 },
                                { content: 'Hài lòng', order: 2 },
                                { content: 'Bình thường', order: 3 },
                                { content: 'Không hài lòng', order: 4 },
                                { content: 'Rất không hài lòng', order: 5 },
                            ],
                        },
                    },
                    {
                        content: 'Bạn đánh giá thế nào về cơ hội thăng tiến tại công ty?',
                        type: 'RATING',
                        order: 2,
                    },
                    {
                        content: 'Điều gì bạn muốn công ty cải thiện nhất?',
                        type: 'TEXT',
                        order: 3,
                    },
                    {
                        content: 'Bạn quan tâm đến các chế độ phúc lợi nào sau đây?',
                        type: 'MULTIPLE_CHOICE',
                        order: 4,
                        options: {
                            create: [
                                { content: 'Bảo hiểm sức khỏe nâng cao', order: 1 },
                                { content: 'Du lịch công ty', order: 2 },
                                { content: 'Thưởng hiệu suất', order: 3 },
                                { content: 'Đào tạo kỹ năng mềm', order: 4 },
                                { content: 'Làm việc từ xa (Remote)', order: 5 },
                            ],
                        },
                    },
                ],
            },
        },
    });

    // Survey 2: Khảo sát chất lượng dịch vụ Y tế
    const survey2 = await prisma.survey.create({
        data: {
            title: 'Khảo sát chất lượng dịch vụ khám chữa bệnh',
            description: 'Chúng tôi mong muốn lắng nghe ý kiến của Quý khách hàng để nâng cao chất lượng dịch vụ.',
            status: 'ACTIVE',
            questions: {
                create: [
                    {
                        content: 'Quý khách đã sử dụng dịch vụ tại khoa nào?',
                        type: 'SINGLE_CHOICE',
                        order: 1,
                        options: {
                            create: [
                                { content: 'Khoa Nội', order: 1 },
                                { content: 'Khoa Ngoại', order: 2 },
                                { content: 'Khoa Nhi', order: 3 },
                                { content: 'Khoa Sản', order: 4 },
                                { content: 'Khác', order: 5 },
                            ],
                        },
                    },
                    {
                        content: 'Vui lòng đánh giá thái độ phục vụ của nhân viên y tế:',
                        type: 'RATING',
                        order: 2,
                    },
                    {
                        content: 'Thời gian chờ đợi khám bệnh là bao lâu?',
                        type: 'SINGLE_CHOICE',
                        order: 3,
                        options: {
                            create: [
                                { content: 'Dưới 15 phút', order: 1 },
                                { content: '15 - 30 phút', order: 2 },
                                { content: '30 - 60 phút', order: 3 },
                                { content: 'Trên 60 phút', order: 4 },
                            ],
                        },
                    },
                    {
                        content: 'Ý kiến đóng góp khác của Quý khách:',
                        type: 'TEXT',
                        order: 4,
                    },
                ],
            },
        },
    });

    // Survey 3: Draft Survey
    const survey3 = await prisma.survey.create({
        data: {
            title: 'Khảo sát nhu cầu đào tạo nội bộ (DRAFT)',
            description: 'Dự thảo khảo sát nhu cầu học tập của các phòng ban.',
            status: 'DRAFT',
            questions: {
                create: [
                    {
                        content: 'Bạn muốn học kỹ năng gì trong quý tới?',
                        type: 'TEXT',
                        order: 1,
                    },
                ],
            },
        },
    });

    console.log({ survey1, survey2, survey3 });
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
