import { PrismaClient } from '@prisma/client-content-service';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding content-service...');

    // Categories
    const categories = [
        { name: 'Health News' },
        { name: 'Technology' },
        { name: 'Policy Updates' },
        { name: 'Wellness' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: cat,
        });
    }
    console.log('Seeded Categories');

    const healthCat = await prisma.category.findUnique({ where: { name: 'Health News' } });
    const techCat = await prisma.category.findUnique({ where: { name: 'Technology' } });

    // Posts
    const posts = [
        {
            title: 'Chế độ dinh dưỡng vàng cho người cao tuổi trong mùa lạnh',
            content: 'Khi thời tiết chuyển lạnh, người cao tuổi cần chú trọng bổ sung các nhóm thực phẩm giúp tăng cường sức đề kháng...',
            desc: 'Hướng dẫn chi tiết cách chăm sóc sức khỏe và dinh dưỡng cho người già khi thời tiết thay đổi.',
            author: 'BS. Nguyễn Văn An',
            date: new Date().toISOString().split('T')[0],
            categoryId: healthCat?.id,
            category: healthCat?.name,
            thumbnail: 'https://images.unsplash.com/photo-1581578731522-aa7721831776?auto=format&fit=crop&w=500&q=60',
        },
        {
            title: 'Công nghệ AI giúp phát hiện sớm ung thư vú với độ chính xác 98%',
            content: 'Các nhà khoa học vừa công bố một hệ thống AI mới có khả năng phân tích hình ảnh nhũ ảnh và phát hiện các dấu hiệu bất thường...',
            desc: 'Bước tiến mới của y học hiện đại trong việc ứng dụng trí tuệ nhân tạo để tầm soát và điều trị ung thư.',
            author: 'TS. Lê Minh Hoàng',
            date: new Date().toISOString().split('T')[0],
            categoryId: techCat?.id,
            category: techCat?.name,
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=60',
        },
        {
            title: 'Dấu hiệu nhận biết sốt xuất huyết ở trẻ em và cách xử lý tại nhà',
            content: 'Sốt xuất huyết đang vào mùa cao điểm, phụ huynh cần đặc biệt lưu ý các triệu chứng sốt cao liên tục không hạ...',
            desc: 'Cảnh báo và hướng dẫn phụ huynh nhận biết sớm các dấu hiệu nguy hiểm của sốt xuất huyết ở trẻ nhỏ.',
            author: 'ThS.BS Trần Thu Hà',
            date: new Date().toISOString().split('T')[0],
            categoryId: healthCat?.id,
            category: healthCat?.name,
            thumbnail: 'https://images.unsplash.com/photo-1584362946045-121f8af9214d?auto=format&fit=crop&w=500&q=60',
        },
        {
            title: '5 thói quen xấu buổi sáng đang âm thầm tàn phá dạ dày của bạn',
            content: 'Uống cà phê khi bụng đói hay bỏ bữa sáng là những thói quen phổ biến nhưng cực kỳ có hại cho hệ tiêu hóa...',
            desc: 'Chuyên gia tiêu hóa chỉ ra những sai lầm thường gặp vào buổi sáng có thể dẫn đến viêm loét dạ dày.',
            author: 'BS. Phan Anh Tuấn',
            date: new Date().toISOString().split('T')[0],
            categoryId: healthCat?.id,
            category: healthCat?.name,
            thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60',
        },
        {
            title: 'Việt Nam triển khai tiêm chủng vaccine sốt xuất huyết lần đầu tiên',
            content: 'Hệ thống tiêm chủng VNVC vừa chính thức triển khai tiêm vaccine phòng bệnh sốt xuất huyết cho trẻ em và người lớn...',
            desc: 'Thông tin quan trọng về loại vaccine mới giúp phòng ngừa căn bệnh nguy hiểm phổ biến tại Việt Nam.',
            author: 'Admin User',
            date: new Date().toISOString().split('T')[0],
            categoryId: healthCat?.id,
            category: healthCat?.name,
            thumbnail: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=500&q=60',
        },
        {
            title: 'Stress kéo dài và mối liên hệ mật thiết với các bệnh tim mạch',
            content: 'Căng thẳng không chỉ ảnh hưởng đến tâm lý mà còn là nguyên nhân gián tiếp gây ra các cơn đau thắt ngực...',
            desc: 'Tìm hiểu cách quản lý cảm xúc để bảo vệ trái tim khỏe mạnh trong cuộc sống hiện đại áp lực.',
            author: 'BS.CKII Hoàng Nam',
            date: new Date().toISOString().split('T')[0],
            categoryId: healthCat?.id,
            category: healthCat?.name,
            thumbnail: 'https://images.unsplash.com/photo-1559757175-30708f9b4f8c?auto=format&fit=crop&w=500&q=60',
        },
        {
            title: 'Lợi ích bất ngờ của việc uống đủ nước đối với làn da và thận',
            content: 'Mỗi ngày uống đủ 2 lít nước không chỉ giúp thanh lọc cơ thể mà còn là chìa khóa để có một làn da sáng mịn...',
            desc: 'Chuyên gia dinh dưỡng giải thích lý do tại sao nước lọc là thức uống tốt nhất cho sức khỏe tổng thể.',
            author: 'DS. Mai Lan',
            date: new Date().toISOString().split('T')[0],
            categoryId: healthCat?.id,
            category: healthCat?.name,
            thumbnail: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=500&q=60',
        },
    ];

    for (const post of posts) {
        const exists = await prisma.post.findFirst({ where: { title: post.title } });
        if (!exists) {
            await prisma.post.create({ data: post });
        }
    }
    console.log('Seeded Posts');

    // Banners
    await prisma.banner.createMany({
        data: [
            {
                title: 'Welcome to Healthcare SaaS',
                image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
                position: 'home_hero',
                link: '/about',
            },
            {
                title: 'Join our Webinar',
                image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
                position: 'sidebar',
                link: '/events',
            },
        ],
        skipDuplicates: true,
    });
    console.log('Seeded Banners');

    // Videos
    await prisma.video.createMany({
        data: [
            {
                title: 'Hướng dẫn phòng ngừa Covid-19',
                url: 'https://www.youtube.com/watch?v=video1',
                thumbnail: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=500&q=60',
                author: 'BS. Nguyễn Văn A',
                duration: '05:30',
                date: '2024-11-20',
            },
            {
                title: 'Chế độ dinh dưỡng cho người cao tuổi',
                url: 'https://www.youtube.com/watch?v=video2',
                thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba03861?auto=format&fit=crop&w=500&q=60',
                author: 'BS. Trần Thị B',
                duration: '04:45',
                date: '2024-11-19',
            },
            {
                title: 'Tập luyện thể dục đúng cách',
                url: 'https://www.youtube.com/watch?v=video3',
                thumbnail: 'https://images.unsplash.com/photo-1571019613454-1f2b2d2d8b14?auto=format&fit=crop&w=500&q=60',
                author: 'BS. Lê Văn C',
                duration: '06:15',
                date: '2024-11-18',
            },
            {
                title: 'Cách chăm sóc trẻ sơ sinh',
                url: 'https://www.youtube.com/watch?v=video4',
                thumbnail: 'https://images.unsplash.com/photo-1519699047748-de8e457a634c2?auto=format&fit=crop&w=500&q=60',
                author: 'BS. Phạm Thị D',
                duration: '07:00',
                date: '2024-11-17',
            },
            {
                title: 'Hướng dẫn rửa tay đúng cách',
                url: 'https://www.youtube.com/watch?v=video5',
                thumbnail: 'https://images.unsplash.com/photo-1585435556283-44ddd1c392c8?auto=format&fit=crop&w=500&q=60',
                author: 'BS. Nguyễn Thị E',
                duration: '03:20',
                date: '2024-11-16',
            },
            {
                title: 'Nhận biết triệu chứng đột quỵ sớm',
                url: 'https://www.youtube.com/watch?v=video6',
                thumbnail: 'https://images.unsplash.com/photo-1559757175-30708f9b4f8c?auto=format&fit=crop&w=500&q=60',
                author: 'BS.CKII Hoàng Văn E',
                duration: '08:30',
                date: '2024-11-15',
            },
        ],
        skipDuplicates: true,
    });
    console.log('Seeded Videos');

    // Top Search
    const topSearches = [
        { keyword: 'telehealth', count: 120 },
        { keyword: 'appointment', count: 95 },
        { keyword: 'insurance', count: 80 },
        { keyword: 'bác sĩ tim mạch', count: 74 },
    ];

    for (const search of topSearches) {
        await prisma.topSearch.upsert({
            where: { keyword: search.keyword },
            update: { count: search.count },
            create: search,
        });
    }
    console.log('Seeded Top Searches');

    // Forum Topics
    const topics = [
        { title: 'Những lưu ý khi tiêm vaccine cúm mùa cho trẻ em', authorName: 'BS. Nguyễn Lan Anh', date: '2024-11-10', category: 'Nhi khoa', viewCount: 12500, commentCount: 24 },
        { title: 'Chế độ ăn Keto có thực sự tốt cho người tiểu đường?', authorName: 'DS. Trần Minh', date: '2024-11-09', category: 'Dinh dưỡng', viewCount: 8200, commentCount: 18 },
        { title: 'Review bệnh viện đa khoa Quốc tế X - Trải nghiệm thật sự', authorName: 'Nguyễn Văn Hùng', date: '2024-11-08', category: 'Sức khỏe chung', viewCount: 5100, commentCount: 42 },
        { title: 'Cách xử lý đúng khi trẻ bị sốt cao trên 38.5 độ', authorName: 'BS.CKII Phạm Thanh Hương', date: '2024-11-07', category: 'Nhi khoa', viewCount: 4900, commentCount: 31 },
        { title: 'Top 5 bài tập yoga giảm stress cho dân văn phòng', authorName: 'HLV Lê Thị Thảo', date: '2024-11-06', category: 'Thể dục & Thể thao', viewCount: 3400, commentCount: 8 },
        { title: 'Thuốc hạ áp và tác dụng phụ cần biết trước khi dùng', authorName: 'DS. Hoàng Văn Nam', date: '2024-11-05', category: 'Bệnh lý', viewCount: 2800, commentCount: 15 },
        { title: 'Bảo hiểm y tế tự nguyện năm 2025 có gì mới?', authorName: 'Luật sư Phạm An', date: '2024-11-04', category: 'Sức khỏe chung', viewCount: 2100, commentCount: 6 },
    ];

    for (const topic of topics) {
        const exists = await prisma.topic.findFirst({ where: { title: topic.title } });
        if (!exists) {
            await prisma.topic.create({ data: topic });
        }
    }
    console.log('Seeded Topics');

    // === DISEASES (A-Z) ===
    const diseaseCount = await prisma.disease.count();
    if (diseaseCount === 0) {
        await prisma.disease.createMany({
            data: [
                { letter: 'A', name: 'Alzheimer', description: 'Bệnh thoái hóa não gây mất trí nhớ và suy giảm nhận thức, phổ biến ở người cao tuổi.', category: 'Thần kinh', specialist: 'Bác sĩ thần kinh', severity: 'high', icd10: 'G30', symptoms: 'Mất trí nhớ, lú lẫn, thay đổi hành vi' },
                { letter: 'A', name: 'Áp xe', description: 'Tình trạng tích tụ mủ do nhiễm khuẩn cục bộ, có thể xảy ra ở nhiều bộ phận cơ thể.', category: 'Nhiễm trùng', specialist: 'Bác sĩ ngoại khoa', severity: 'medium', icd10: 'L02', symptoms: 'Sưng đỏ, đau, sốt' },
                { letter: 'B', name: 'Bạch cầu (Ung thư máu)', description: 'Ung thư của các tế bào máu, ảnh hưởng đến tủy xương và hệ miễn dịch.', category: 'Ung bướu', specialist: 'Bác sĩ huyết học', severity: 'high', icd10: 'C91', symptoms: 'Mệt mỏi, chảy máu, nhiễm trùng tái phát' },
                { letter: 'B', name: 'Béo phì', description: 'Tích lũy mỡ cơ thể quá mức gây hại cho sức khỏe tổng thể và tăng nguy cơ nhiều bệnh mãn tính.', category: 'Nội tiết', specialist: 'Bác sĩ nội tiết', severity: 'medium', icd10: 'E66', symptoms: 'BMI > 30, khó thở, mệt mỏi' },
                { letter: 'C', name: 'Cao huyết áp', description: 'Áp lực máu trong động mạch cao hơn mức bình thường, là yếu tố nguy cơ của đột quỵ và nhồi máu cơ tim.', category: 'Tim mạch', specialist: 'Bác sĩ tim mạch', severity: 'high', icd10: 'I10', symptoms: 'Đau đầu, chóng mặt, chảy máu cam' },
                { letter: 'D', name: 'Đái tháo đường type 2', description: 'Rối loạn chuyển hóa glucose mãn tính, cần kiểm soát lâu dài để tránh biến chứng.', category: 'Nội tiết', specialist: 'Bác sĩ nội tiết', severity: 'high', icd10: 'E11', symptoms: 'Khát nhiều, tiểu nhiều, mệt mỏi, giảm cân' },
                { letter: 'D', name: 'Dị ứng thực phẩm', description: 'Phản ứng miễn dịch bất thường với thực phẩm cụ thể, có thể gây phản vệ nghiêm trọng.', category: 'Miễn dịch', specialist: 'Bác sĩ dị ứng - miễn dịch', severity: 'medium', icd10: 'L27.2', symptoms: 'Nổi mề đay, khó thở, sưng phù' },
                { letter: 'Đ', name: 'Đột quỵ', description: 'Tình trạng khẩn cấp khi máu không đến được não, gây tổn thương não tức thì.', category: 'Tim mạch', specialist: 'Bác sĩ thần kinh', severity: 'high', icd10: 'I64', symptoms: 'Liệt mặt, tay chân, nói khó, đột ngột nhức đầu' },
                { letter: 'G', name: 'Gout (Gút)', description: 'Viêm khớp do tích lũy acid uric, thường gây đau nhức dữ dội tại các khớp.', category: 'Cơ xương khớp', specialist: 'Bác sĩ cơ xương khớp', severity: 'medium', icd10: 'M10', symptoms: 'Đau khớp đột ngột, sưng đỏ, nóng' },
                { letter: 'H', name: 'Hen suyễn', description: 'Bệnh mãn tính gây viêm và thu hẹp đường thở, dẫn đến khó thở và thở khò khè.', category: 'Hô hấp', specialist: 'Bác sĩ hô hấp', severity: 'medium', icd10: 'J45', symptoms: 'Khó thở, thở khò khè, ho về đêm' },
                { letter: 'K', name: 'Ký sinh trùng đường ruột', description: 'Nhiễm giun sán và các ký sinh trùng đường tiêu hóa, phổ biến ở trẻ em và vùng không vệ sinh.', category: 'Tiêu hóa', specialist: 'Bác sĩ nội tiêu hóa', severity: 'low', icd10: 'B82', symptoms: 'Đau bụng, tiêu chảy, sụt cân, ngứa hậu môn' },
                { letter: 'L', name: 'Loãng xương', description: 'Giảm mật độ xương làm xương giòn và dễ gãy, phổ biến ở phụ nữ sau mãn kinh.', category: 'Cơ xương khớp', specialist: 'Bác sĩ cơ xương khớp', severity: 'medium', icd10: 'M81', symptoms: 'Đau lưng, gù lưng, gãy xương dễ dàng' },
                { letter: 'M', name: 'Mất ngủ mãn tính', description: 'Rối loạn giấc ngủ kéo dài hơn 3 tháng, ảnh hưởng đến chất lượng cuộc sống và sức khỏe tâm thần.', category: 'Thần kinh', specialist: 'Bác sĩ tâm thần', severity: 'medium', icd10: 'F51.0', symptoms: 'Khó ngủ, ngủ không sâu, mệt mỏi ban ngày' },
                { letter: 'N', name: 'Nhồi máu cơ tim', description: 'Tắc nghẽn động mạch vành gây hoại tử cơ tim, là cấp cứu tim mạch nguy hiểm tính mạng.', category: 'Tim mạch', specialist: 'Bác sĩ tim mạch', severity: 'high', icd10: 'I21', symptoms: 'Đau ngực dữ dội, khó thở, đổ mồ hôi' },
                { letter: 'P', name: 'Parkinson', description: 'Bệnh thoái hóa thần kinh tiến triển chậm, ảnh hưởng đến vận động và kiểm soát cơ thể.', category: 'Thần kinh', specialist: 'Bác sĩ thần kinh', severity: 'high', icd10: 'G20', symptoms: 'Run tay, cứng cơ, chậm vận động' },
                { letter: 'S', name: 'Sỏi thận', description: 'Lắng đọng khoáng chất trong thận tạo thành sỏi, có thể gây đau dữ dội khi di chuyển.', category: 'Tiết niệu', specialist: 'Bác sĩ tiết niệu', severity: 'medium', icd10: 'N20', symptoms: 'Đau lưng dữ dội, tiểu ra máu, buồn nôn' },
                { letter: 'T', name: 'Tiểu đường thai kỳ', description: 'Đái tháo đường xuất hiện trong thai kỳ, cần kiểm soát chặt để bảo vệ mẹ và bé.', category: 'Sản phụ khoa', specialist: 'Bác sĩ sản phụ khoa', severity: 'medium', icd10: 'O24', symptoms: 'Khát nước, tiểu nhiều, mệt mỏi khi mang thai' },
                { letter: 'T', name: 'Trầm cảm', description: 'Rối loạn tâm thần phổ biến gây cảm giác buồn chán kéo dài, mất hứng thú với cuộc sống.', category: 'Tâm thần', specialist: 'Bác sĩ tâm thần', severity: 'high', icd10: 'F32', symptoms: 'Buồn bã, mất năng lượng, khó tập trung, mất ngủ' },
                { letter: 'V', name: 'Viêm gan B', description: 'Nhiễm virus viêm gan B mãn tính, có thể dẫn đến xơ gan và ung thư gan nếu không điều trị.', category: 'Tiêu hóa', specialist: 'Bác sĩ tiêu hóa - gan mật', severity: 'high', icd10: 'B18.1', symptoms: 'Mệt mỏi, vàng da, đau bụng phải' },
                { letter: 'V', name: 'Viêm khớp dạng thấp', description: 'Bệnh tự miễn gây viêm mãn tính tại các khớp, dẫn đến đau và biến dạng khớp theo thời gian.', category: 'Cơ xương khớp', specialist: 'Bác sĩ cơ xương khớp', severity: 'medium', icd10: 'M06', symptoms: 'Đau cứng khớp buổi sáng, sưng khớp' },
                { letter: 'X', name: 'Xuất huyết não', description: 'Chảy máu trong não do vỡ mạch máu, là dạng đột quỵ xuất huyết nghiêm trọng.', category: 'Tim mạch', specialist: 'Bác sĩ thần kinh', severity: 'high', icd10: 'I61', symptoms: 'Đột ngột đau đầu dữ dội, nôn mửa, mất ý thức' },
            ],
        });
        console.log('Seeded Diseases');
    }

    // === ELDER SERVICES ===
    const elderCount = await prisma.elderService.count();
    if (elderCount === 0) {
        await prisma.elderService.createMany({
            data: [
                {
                    title: 'Chăm Sóc Tại Nhà',
                    description: 'Đội ngũ điều dưỡng viên được đào tạo chuyên nghiệp đến tận nhà, theo dõi sức khỏe hàng ngày và hỗ trợ sinh hoạt.',
                    icon: 'flaticon-home',
                    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    features: '["Điều dưỡng viên có chứng chỉ","Theo dõi huyết áp, đường huyết hàng ngày","Hỗ trợ vật lý trị liệu","Báo cáo sức khỏe hàng tuần cho gia đình"]',
                    price: 'Từ 2.500.000đ/tháng',
                    isActive: true,
                    sortOrder: 1,
                },
                {
                    title: 'Trung Tâm Dưỡng Lão Cao Cấp',
                    description: 'Môi trường sống tiện nghi, an toàn và ấm cúng với các tiện ích giải trí, liệu pháp nghệ thuật và cộng đồng tích cực.',
                    icon: 'flaticon-hospital',
                    image: 'https://images.unsplash.com/photo-1576765608622-067973a79f53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    features: '["Phòng ở riêng tư với nội thất cao cấp","Bữa ăn dinh dưỡng theo hướng dẫn bác sĩ","Liệu pháp âm nhạc và nghệ thuật","Kết nối gia đình qua video call"]',
                    price: 'Từ 8.000.000đ/tháng',
                    isActive: true,
                    sortOrder: 2,
                },
                {
                    title: 'Khám Định Kỳ Chuyên Sâu',
                    description: 'Gói khám sức khỏe toàn diện hàng quý dành riêng cho người trên 60 tuổi với các xét nghiệm chuyên biệt.',
                    icon: 'flaticon-stethoscope',
                    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    features: '["Xét nghiệm máu, nước tiểu toàn diện","Siêu âm tim và bụng","Điện tâm đồ và đo loãng xương","Tư vấn dinh dưỡng lão khoa"]',
                    price: 'Từ 1.200.000đ/lần',
                    isActive: true,
                    sortOrder: 3,
                },
            ],
        });
        console.log('Seeded Elder Services');
    }

    // === EVENTS ===
    const eventCount = await prisma.event.count();
    if (eventCount === 0) {
        await prisma.event.createMany({
            data: [
                {
                    title: 'Hội thảo Y khoa: Ứng dụng AI trong Chẩn đoán Hình ảnh',
                    description: 'Buổi hội thảo chuyên sâu về việc ứng dụng trí tuệ nhân tạo trong đọc phim X-quang, CT scan và MRI, mang lại độ chính xác chẩn đoán cao hơn.',
                    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    month: 'Tháng 11',
                    day: '15',
                    time: '08:00 - 12:00',
                    location: 'Khách sạn Melia Hà Nội, 44B Lý Thường Kiệt',
                    type: 'Hội thảo Chuyên ngành',
                    speakers: '["GS.TS John Smith - Đại học Stanford","PGS.TS Lê Phạm Anh Tùng - BV Bạch Mai"]',
                    seats: 50,
                    booked: 42,
                    eventDate: new Date('2024-11-15T08:00:00'),
                },
                {
                    title: 'Ngày hội Hiến máu: Giọt Hồng Sẻ Chia',
                    description: 'Chương trình hiến máu tình nguyện thường niên nhằm bổ sung nguồn máu dự trữ cho các bệnh viện trên toàn quốc, đặc biệt trong mùa cao điểm.',
                    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    month: 'Tháng 11',
                    day: '22',
                    time: '07:00 - 15:00',
                    location: 'Viện Huyết học Truyền máu Trung Ương, Hà Nội',
                    type: 'Hoạt động Cộng đồng',
                    speakers: '[]',
                    seats: 500,
                    booked: 480,
                    eventDate: new Date('2024-11-22T07:00:00'),
                },
                {
                    title: 'Webinar: Phương pháp Vận động Sản phụ khoa',
                    description: 'Hội thảo trực tuyến về các bài tập an toàn và khoa học cho phụ nữ mang thai và sau sinh nhằm phục hồi sức khỏe nhanh chóng.',
                    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    month: 'Tháng 12',
                    day: '05',
                    time: '19:30 - 21:00',
                    location: 'Trực tuyến (Zoom)',
                    type: 'Online Webinar',
                    speakers: '["BS.CKII Phạm Phương Yến - BV Từ Dũ"]',
                    seats: 1000,
                    booked: 320,
                    eventDate: new Date('2024-12-05T19:30:00'),
                },
            ],
        });
        console.log('Seeded Events');
    }

    // === PACKAGES ===
    const packageCount = await prisma.package.count();
    if (packageCount === 0) {
        await prisma.package.createMany({
            data: [
                {
                    title: 'Gói khám sức khỏe tổng quát Cơ bản',
                    description: 'Tầm soát các bệnh lý thông thường. Phù hợp cho người trẻ tuổi (với nhu cầu kiểm tra sức khỏe định kỳ).',
                    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    category: 'general',
                    price: 1500000,
                    originalPrice: 2000000,
                    discount: 25,
                    details: '["Khám nội tổng quát","Xét nghiệm công thức máu","Xét nghiệm đường máu, mỡ máu","Siêu âm bụng tổng quát","Chụp X-quang phổi"]',
                    hospitalName: 'Bệnh viện Đa khoa Quốc tế Vinmec',
                    isActive: true,
                    sortOrder: 1,
                },
                {
                    title: 'Gói khám tổng quát VIP dành cho Nữ',
                    description: 'Gói khám chuyên sâu thiết kế riêng cho phụ nữ trên 40 tuổi với các hạng mục tầm soát ung thư.',
                    image: 'https://images.unsplash.com/photo-1581594632738-979f49916170?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    category: 'general',
                    price: 4500000,
                    originalPrice: 5500000,
                    discount: 18,
                    details: '["Bao gồm các hạng mục gói Cơ bản","Tầm soát ung thư vú (Chụp nhũ ảnh)","Tầm soát ung thư cổ tử cung","Đo loãng xương","Siêu âm tuyến giáp"]',
                    hospitalName: 'Bệnh viện Đại học Y Dược',
                    isActive: true,
                    sortOrder: 2,
                },
                {
                    title: 'Gói Tầm soát Ung thư Toàn diện (Nâng cao)',
                    description: 'Phát hiện sớm các loại ung thư phổ biến nhất: Phổi, Gan, Dạ dày, Đại tràng.',
                    image: 'https://images.unsplash.com/photo-1579154235602-3823ec396339?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    category: 'cancer',
                    price: 8900000,
                    originalPrice: 12000000,
                    discount: 26,
                    details: '["Xét nghiệm Marker ung thư (CEA, AFP, CA 19-9...)","Nội soi dạ dày - đại tràng (gây mê)","CT Scanner lồng ngực","Siêu âm ổ bụng màu 4D"]',
                    hospitalName: 'Bệnh viện Chợ Rẫy',
                    isActive: true,
                    sortOrder: 3,
                },
            ]
        });
        console.log('Seeded Packages');
    }

    // === QUESTIONS & ANSWERS ===
    const questionCount = await prisma.question.count();
    if (questionCount === 0) {
        const q1 = await prisma.question.create({
            data: {
                title: 'Bé bị sốt cao không hạ',
                content: 'Bé nhà em 3 tuổi, sốt 39 độ từ hôm qua, uống hạ sốt nhưng chỉ giảm nhẹ rồi sốt lại. Có cần đi viện ngay không bác sĩ?',
                category: 'Nhi khoa',
                date: new Date().toISOString().split('T')[0],
                isResolved: true,
                authorName: 'Mẹ Bé Bin',
            }
        });

        await prisma.answer.create({
            data: {
                questionId: q1.id,
                authorName: 'Bs. Nguyễn Văn A',
                date: new Date().toISOString().split('T')[0],
                content: 'Chào mẹ, nếu bé sốt cao liên tục không hạ kèm co giật, lờ đờ hoặc phát ban thì cần đưa đi cấp cứu ngay. Nếu bé vẫn chơi ngoan thì tiếp tục chườm ấm và theo dõi sát nhiệt độ.',
            }
        });

        await prisma.question.create({
            data: {
                title: 'Đau dạ dày khi đói',
                content: 'Em hay bị đau vùng thượng vị mỗi khi đói, ăn vào thì đỡ đau hơn. Đã bị 1 tuần nay rồi ạ.',
                category: 'Tiêu hóa',
                date: new Date().toISOString().split('T')[0],
                isResolved: false,
                authorName: 'Trần Thế An',
            }
        });

        console.log('Seeded Questions');
    }

    console.log('Seeding content-service finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
