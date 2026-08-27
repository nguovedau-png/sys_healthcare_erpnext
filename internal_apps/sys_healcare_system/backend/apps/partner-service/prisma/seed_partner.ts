import { PrismaClient } from '@prisma/client-partner-service';

const prisma = new PrismaClient();

const worktimeData = {
    weekday: ['07:00 - 12:00', '13:30 - 17:30'],
    weekend: ['07:00 - 12:00'],
    holiday: []
};

const servicesData = [
    { name: 'Khám tổng quát', price: 150000 },
    { name: 'Tầm soát ung thư', price: 2500000 },
    { name: 'Xét nghiệm máu', price: 350000 }
];

const ratingData = [
    {
        author: { name: 'Nguyễn Văn A', avatar: '/img/user/default-avatar.jpg' },
        publishDate: '2025-01-15T10:00:00Z',
        service: 'Khám tim mạch',
        content: 'Bác sĩ rất tận tâm, giải thích rõ ràng. Sau khi điều trị sức khỏe của tôi đã tốt lên nhiều.',
        reply: 'Cảm ơn anh đã tin tưởng. Chúc anh sức khỏe!',
        vote: 45,
        isAgreeRecommend: true
    },
    {
        author: { name: 'Trần Thị B', avatar: '/img/user/default-avatar.jpg' },
        publishDate: '2025-01-10T14:30:00Z',
        service: 'Khám nhi khoa',
        content: 'Bác sĩ rất nhẹ nhàng với trẻ. Con tôi không sợ đi khám nữa.',
        reply: '',
        vote: 32,
        isAgreeRecommend: true
    }
];

const qaData = [
    {
        author: { name: 'Lê Văn C', avatar: '/img/user/default-avatar.jpg' },
        publishDate: '2025-01-20T09:00:00Z',
        service: 'Tư vấn',
        content: 'Bác sĩ cho hỏi có thể đặt lịch khám vào thứ 7 được không?',
        reply: 'Dạ được ạ. Bệnh viện có làm việc thứ 7 từ 7h-12h. Anh có thể đặt lịch qua app hoặc gọi điện trực tiếp.',
        vote: 12
    }
];

const gallery = [
    '/img/gallery/doctor-1.jpg',
    '/img/gallery/doctor-2.jpg',
    '/img/gallery/hospital-1.jpg',
    '/img/gallery/clinic-1.jpg'
];

async function main() {
    console.log('Starting partner service seed with full profile data...');

    // Seed Doctors
    const doctorsCount = await prisma.doctor.count();
    console.log(`Doctors count: ${doctorsCount}`);
    if (doctorsCount === 0) {
        console.log('Seeding doctors...');
        await prisma.doctor.createMany({
            data: [
                { name: 'BS. Nguyễn Văn An', specialty: 'Tim mạch', hospital: 'Bệnh viện Chợ Rẫy', phone: '0901234567', email: 'nva@choray.vn', rating: 4.8, ratingCount: 156, isVerified: true, status: 'active', description: 'Chuyên gia tim mạch can thiệp với 15 năm kinh nghiệm.', degree: 'Thạc sĩ', expYears: 15, associationAward: 'Bằng khen Bộ Y tế 2020', gallery: gallery, services: servicesData, worktime: worktimeData, intro: 'Chuyên gia tim mạch can thiệp hàng đầu Việt Nam.', ratingData: ratingData, qaData: qaData },
                { name: 'BS. Trần Thị Bích', specialty: 'Nhi khoa', hospital: 'Bệnh viện Nhi Đồng 1', phone: '0907654321', email: 'ttb@nhi.vn', rating: 4.9, ratingCount: 203, isVerified: true, status: 'active', description: 'Bác sĩ chuyên khoa nhi tiêu hóa và dinh dưỡng.', degree: 'Tiến sĩ', expYears: 12, gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'TS.BS. Lê Minh Cường', specialty: 'Thần kinh', hospital: 'Bệnh viện 115', phone: '0909111222', email: 'lmc@bv115.vn', rating: 4.7, ratingCount: 98, isVerified: true, status: 'active', description: 'Tiến sĩ thần kinh học, chuyên điều trị đột quỵ.', degree: 'Tiến sĩ', expYears: 18, associationAward: 'Giải thưởng Y học 2019', gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'BS. Phạm Thị Dung', specialty: 'Sản phụ khoa', hospital: 'Bệnh viện Từ Dũ', phone: '0908222333', email: 'ptd@tudu.vn', rating: 4.6, ratingCount: 87, isVerified: true, status: 'active', description: 'Hơn 10 năm kinh nghiệm trong lĩnh vực sản phụ khoa.', degree: 'Thạc sĩ', expYears: 11, gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'PGS.TS. Hoàng Văn Em', specialty: 'Ngoại khoa', hospital: 'Bệnh viện Chợ Rẫy', phone: '0907333444', email: 'hve@choray.vn', rating: 4.9, ratingCount: 245, isVerified: true, status: 'active', description: 'Phó giáo sư, chuyên gia phẫu thuật nội soi.', degree: 'Phó Giáo sư - Tiến sĩ', expYears: 25, associationAward: 'Nhà khoa học trẻ 2018', gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'BS. Võ Thị Phương', specialty: 'Da liễu', hospital: 'Bệnh viện Da liễu TP.HCM', phone: '0906444555', email: 'vtp@dalieu.vn', rating: 4.5, ratingCount: 76, isVerified: true, status: 'active', description: 'Bác sĩ da liễu thẩm mỹ.', degree: 'Thạc sĩ', expYears: 8, gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'BS. Đặng Minh Giang', specialty: 'Mắt', hospital: 'Bệnh viện Mắt TP.HCM', phone: '0905555666', email: 'dmg@mat.vn', rating: 4.8, ratingCount: 134, isVerified: true, status: 'active', description: 'Chuyên gia phẫu thuật mắt.', degree: 'Thạc sĩ', expYears: 10, associationAward: 'Bằng khen Sở Y tế', gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'BS. Ngô Thị Hoa', specialty: 'Tai mũi họng', hospital: 'Bệnh viện Tai Mũi Họng', phone: '0904666777', email: 'nth@tmh.vn', rating: 4.4, ratingCount: 65, isVerified: true, status: 'active', description: 'Bác sĩ chuyên điều trị viêm xoang.', degree: 'Bác sĩ', expYears: 7, gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'BS. Trương Văn Ích', specialty: 'Nội tiết', hospital: 'Bệnh viện Đại học Y Dược', phone: '0903777888', email: 'tvi@yduoc.vn', rating: 4.7, ratingCount: 112, isVerified: true, status: 'active', description: 'Chuyên gia điều trị tiểu đường.', degree: 'Thạc sĩ', expYears: 14, gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'BS. Lý Thị Kim', specialty: 'Răng hàm mặt', hospital: 'Nha khoa Paris', phone: '0902888999', email: 'ltk@paris.vn', rating: 4.6, ratingCount: 89, isVerified: true, status: 'active', description: 'Bác sĩ nha khoa thẩm mỹ.', degree: 'Thạc sĩ', expYears: 9, gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
            ]
        });
    }

    // Seed Hospitals
    const hospitalsCount = await prisma.hospital.count();
    console.log(`Hospitals count: ${hospitalsCount}`);
    if (hospitalsCount === 0) {
        console.log('Seeding hospitals...');
        await prisma.hospital.createMany({
            data: [
                { name: 'Bệnh viện Chợ Rẫy', address: '201B Nguyễn Chí Thanh, Q.5, TP.HCM', phone: '028-38554137', website: 'http://choray.vn', departments: ['Tim mạch', 'Ngoại khoa', 'Nội khoa', 'Cấp cứu'], beds: 1800, rating: 4.7, ratingCount: 1250, isVerified: true, status: 'active', description: 'Bệnh viện đa khoa hạng đặc biệt.', degree: 'Bệnh viện hạng đặc biệt', gallery: gallery, indoorMap: ['/img/map/choray.png'], services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Bệnh viện Nhi Đồng 1', address: '341 Sư Vạn Hạnh, Q.10, TP.HCM', phone: '028-38650100', website: 'http://bvnd1.org.vn', departments: ['Nhi khoa', 'Sơ sinh', 'Nhi ngoại'], beds: 650, rating: 4.6, ratingCount: 890, isVerified: true, status: 'active', description: 'Bệnh viện nhi đồng lớn nhất miền Nam.', degree: 'Bệnh viện chuyên khoa', gallery: gallery, indoorMap: ['/img/map/nhidong1.png'], services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Bệnh viện 115', address: '527 Sư Vạn Hạnh, Q.10, TP.HCM', phone: '028-38650115', website: 'http://bv115.com.vn', departments: ['Cấp cứu', 'Thần kinh', 'Chấn thương'], beds: 500, rating: 4.5, ratingCount: 756, isVerified: true, status: 'active', description: 'Bệnh viện cấp cứu chuyên sâu.', degree: 'Bệnh viện đa khoa', gallery: gallery, indoorMap: ['/img/map/bv115.png'], services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Bệnh viện Từ Dũ', address: '284 Cống Quỳnh, Q.1, TP.HCM', phone: '028-38297676', website: 'http://tudu.com.vn', departments: ['Sản', 'Phụ khoa', 'Kế hoạch hóa'], beds: 400, rating: 4.8, ratingCount: 680, isVerified: true, status: 'active', description: 'Bệnh viện sản phụ khoa hàng đầu.', degree: 'Bệnh viện chuyên khoa', gallery: gallery, indoorMap: ['/img/map/tudu.png'], services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Bệnh viện Đại học Y Dược', address: '215 Hồng Bàng, Q.5, TP.HCM', phone: '028-38554269', website: 'http://bvdaihoc.com.vn', departments: ['Đa khoa', 'Nghiên cứu'], beds: 800, rating: 4.6, ratingCount: 542, isVerified: true, status: 'active', description: 'Bệnh viện đào tạo và nghiên cứu.', degree: 'Bệnh viện đa khoa', gallery: gallery, indoorMap: ['/img/map/yduoc.png'], services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Bệnh viện FV', address: '6 Nguyễn Lương Bằng, Q.7, TP.HCM', phone: '028-54113333', website: 'http://fvhospital.com', departments: ['Đa khoa quốc tế', 'Phẫu thuật'], beds: 200, rating: 4.9, ratingCount: 320, isVerified: true, status: 'active', description: 'Bệnh viện quốc tế cao cấp.', degree: 'Bệnh viện quốc tế', gallery: gallery, indoorMap: ['/img/map/fv.png'], services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Bệnh viện Ung Bướu TP.HCM', address: '3 Nơ Trang Long, Bình Thạnh, TP.HCM', phone: '028-38990281', website: 'http://ungbuou.org.vn', departments: ['Ung thư', 'Xạ trị', 'Hóa trị'], beds: 600, rating: 4.7, ratingCount: 445, isVerified: true, status: 'active', description: 'Bệnh viện chuyên khoa ung bướu.', degree: 'Bệnh viện chuyên khoa', gallery: gallery, indoorMap: ['/img/map/ungbuou.png'], services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
            ]
        });
    }

    // Seed Clinics
    const clinicsCount = await prisma.clinic.count();
    console.log(`Clinics count: ${clinicsCount}`);
    if (clinicsCount === 0) {
        console.log('Seeding clinics...');
        await prisma.clinic.createMany({
            data: [
                { name: 'Phòng khám Đa khoa Hoàn Mỹ', address: '60-62 Phan Xích Long, Phú Nhuận, TP.HCM', phone: '028-39971010', email: 'info@hoanmy.com', specialties: ['Nội khoa', 'Ngoại khoa'], rating: 4.5, ratingCount: 234, isVerified: true, status: 'active', description: 'Phòng khám đa khoa uy tín.', degree: 'Phòng khám đa khoa', gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Phòng khám Family Medical', address: '34 Lê Duẩn, Q.1, TP.HCM', phone: '028-38227848', email: 'hcmc@vietnammedicalpractice.com', specialties: ['Nội khoa', 'Nhi khoa'], rating: 4.7, ratingCount: 456, isVerified: true, status: 'active', description: 'Phòng khám quốc tế.', degree: 'Phòng khám quốc tế', gallery: gallery, indoorMap: ['/img/map/family.png'], services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Phòng khám Đa khoa Sài Gòn', address: '123 Nguyễn Thị Minh Khai, Q.3, TP.HCM', phone: '028-39301919', specialties: ['Tim mạch', 'Tiêu hóa'], rating: 4.4, ratingCount: 178, isVerified: true, status: 'active', description: 'Phòng khám chuyên khoa.', degree: 'Phòng khám chuyên khoa', gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Phòng khám Nhi Đồng', address: '456 Lê Văn Sỹ, Q.3, TP.HCM', phone: '028-39303030', email: 'nhi@clinic.vn', specialties: ['Nhi khoa', 'Tiêm chủng'], rating: 4.6, ratingCount: 312, isVerified: true, status: 'active', description: 'Chuyên khám và điều trị nhi.', degree: 'Phòng khám nhi', gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Phòng khám Da liễu Đông Á', address: '789 Cách Mạng Tháng 8, Q.10, TP.HCM', phone: '028-39757575', specialties: ['Da liễu', 'Thẩm mỹ'], rating: 4.3, ratingCount: 156, isVerified: true, status: 'active', description: 'Chuyên da liễu và thẩm mỹ.', degree: 'Phòng khám chuyên khoa', gallery: gallery, services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Phòng khám Nha Khoa Paris', address: '234 Pasteur, Q.3, TP.HCM', phone: '028-38234567', email: 'paris@dental.vn', specialties: ['Nha khoa', 'Implant'], rating: 4.8, ratingCount: 523, isVerified: true, status: 'active', description: 'Nha khoa thẩm mỹ cao cấp.', degree: 'Phòng khám nha khoa', gallery: gallery, indoorMap: ['/img/map/paris.png'], services: servicesData, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
            ]
        });
    }

    // Seed Pharmacies
    const pharmaciesCount = await prisma.pharmacy.count();
    console.log(`Pharmacies count: ${pharmaciesCount}`);
    if (pharmaciesCount === 0) {
        console.log('Seeding pharmacies...');
        await prisma.pharmacy.createMany({
            data: [
                { name: 'Nhà thuốc Long Châu', address: '123 Nguyễn Văn Linh, Q.7, TP.HCM', phone: '1800-6928', email: 'longchau@fpt.vn', website: 'https://nhathuoclongchau.com.vn', outletOwner: 'Nguyễn Văn A', gppNumber: 'GPP-2024-001', memberRank: 'platinum', status: 'active', pointsCMEOnline: 15500, isVerified: true, rating: 4.8, reviewCount: 1250, description: 'Hệ thống nhà thuốc lớn nhất.', degree: 'Nhà thuốc', gallery: gallery, indoorMap: ['/img/map/longchau.png'], worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Nhà thuốc Pharmacity', address: '456 Lê Văn Việt, Q.9, TP.HCM', phone: '1800-6821', email: 'pharmacity@fpt.vn', website: 'https://pharmacity.vn', outletOwner: 'Trần Thị B', gppNumber: 'GPP-2024-002', memberRank: 'gold', status: 'active', pointsCMEOnline: 8200, isVerified: true, rating: 4.7, reviewCount: 980, degree: 'Nhà thuốc', gallery: gallery, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Nhà thuốc An Khang', address: '789 Cách Mạng Tháng 8, Q.10, TP.HCM', phone: '028-39876543', email: 'ankhang@gmail.com', outletOwner: 'Lê Văn C', gppNumber: 'GPP-2024-003', memberRank: 'silver', status: 'active', pointsCMEOnline: 5400, isVerified: true, rating: 4.5, reviewCount: 450, degree: 'Nhà thuốc', gallery: gallery, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Nhà thuốc Medicare', address: '567 Điện Biên Phủ, Q.3, TP.HCM', phone: '028-39234567', email: 'medicare@vn.com', website: 'https://medicare.vn', outletOwner: 'Hoàng Văn E', gppNumber: 'GPP-2024-005', memberRank: 'platinum', status: 'active', pointsCMEOnline: 18900, isVerified: true, rating: 4.9, reviewCount: 1580, degree: 'Nhà thuốc', gallery: gallery, indoorMap: ['/img/map/medicare.png'], worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Nhà thuốc Đức Tâm', address: '890 Nguyễn Trãi, Q.5, TP.HCM', phone: '028-39345678', outletOwner: 'Võ Thị F', gppNumber: 'GPP-2024-006', memberRank: 'gold', status: 'active', pointsCMEOnline: 9800, isVerified: true, rating: 4.6, reviewCount: 720, degree: 'Nhà thuốc', gallery: gallery, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Nhà thuốc Bảo Châu', address: '234 Phan Văn Trị, Gò Vấp, TP.HCM', phone: '028-39456789', email: 'baochau@yahoo.com', outletOwner: 'Đặng Minh G', gppNumber: 'GPP-2024-007', memberRank: 'silver', status: 'active', pointsCMEOnline: 6300, isVerified: true, rating: 4.4, reviewCount: 380, degree: 'Nhà thuốc', gallery: gallery, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Nhà thuốc Sài Gòn', address: '901 Lê Hồng Phong, Q.10, TP.HCM', phone: '028-39678901', email: 'saigon@pharmacy.vn', outletOwner: 'Trương Văn I', gppNumber: 'GPP-2024-008', memberRank: 'gold', status: 'active', pointsCMEOnline: 11200, isVerified: true, rating: 4.7, reviewCount: 890, degree: 'Nhà thuốc', gallery: gallery, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
                { name: 'Nhà thuốc Minh Đức', address: '345 Hoàng Văn Thụ, Tân Bình, TP.HCM', phone: '028-39789012', outletOwner: 'Lý Thị K', gppNumber: 'GPP-2024-009', memberRank: 'platinum', status: 'active', pointsCMEOnline: 16700, isVerified: true, rating: 4.8, reviewCount: 1120, degree: 'Nhà thuốc', gallery: gallery, worktime: worktimeData, ratingData: ratingData, qaData: qaData },
            ]
        });
    }

    // Seed Pharmacists
    const pharmacistsCount = await prisma.pharmacist.count();
    console.log(`Pharmacists count: ${pharmacistsCount}`);
    if (pharmacistsCount === 0) {
        console.log('Seeding pharmacists...');
        await prisma.pharmacist.createMany({
            data: [
                { fullName: 'Dược sĩ Nguyễn Văn An', phoneNumber: '0909111222', address: 'Nhà thuốc Long Châu, 123 Nguyễn Văn Linh, Q.7, TP.HCM', specialistly: 'Dược lâm sàng', career: 'Dược sĩ chính', pointsCMEOnline: 12000, memberRank: 'gold', status: 'active', isVerified: true, rating: 4.7, reviewCount: 85, degree: 'Dược sĩ chính', gallery: gallery, workplace: { name: 'Nhà thuốc Long Châu', address: '123 Nguyễn Văn Linh, Q.7, TP.HCM' }, services: servicesData, ratingData: ratingData, qaData: qaData },
                { fullName: 'Dược sĩ Trần Thị Bình', phoneNumber: '0909222333', address: 'Phòng khám Family Medical, 34 Lê Duẩn, Q.1, TP.HCM', specialistly: 'Dược học cổ truyền', career: 'Dược sĩ tư vấn', pointsCMEOnline: 18500, memberRank: 'platinum', status: 'active', isVerified: true, rating: 4.9, reviewCount: 120, degree: 'Dược sĩ tư vấn', gallery: gallery, workplace: { name: 'Phòng khám Family Medical', address: '34 Lê Duẩn, Q.1, TP.HCM' }, services: servicesData, ratingData: ratingData, qaData: qaData },
                { fullName: 'Dược sĩ Lê Minh Cường', phoneNumber: '0909333444', address: 'Nhà thuốc Pharmacity, 456 Lê Văn Việt, Q.9, TP.HCM', specialistly: 'Dược lâm sàng', career: 'Trưởng phòng', pointsCMEOnline: 15200, memberRank: 'platinum', status: 'active', isVerified: true, rating: 4.8, reviewCount: 95, degree: 'Trưởng phòng dược', gallery: gallery, workplace: { name: 'Nhà thuốc Pharmacity', address: '456 Lê Văn Việt, Q.9, TP.HCM' }, services: servicesData, ratingData: ratingData, qaData: qaData },
                { fullName: 'Dược sĩ Phạm Thị Dung', phoneNumber: '0909444555', address: 'Nhà thuốc An Khang, 789 Cách Mạng Tháng 8, Q.10, TP.HCM', specialistly: 'Dược phẩm', career: 'Dược sĩ', pointsCMEOnline: 8900, memberRank: 'silver', status: 'active', isVerified: false, rating: 4.5, reviewCount: 42, degree: 'Dược sĩ', gallery: gallery, workplace: { name: 'Nhà thuốc An Khang', address: '789 Cách Mạng Tháng 8, Q.10, TP.HCM' }, services: servicesData, ratingData: ratingData, qaData: qaData },
                { fullName: 'Dược sĩ Hoàng Văn Em', phoneNumber: '0909555666', address: 'Nhà thuốc Medicare, 567 Điện Biên Phủ, Q.3, TP.HCM', specialistly: 'Dược lý học', career: 'Dược sĩ chính', pointsCMEOnline: 13400, memberRank: 'gold', status: 'active', isVerified: true, rating: 4.6, reviewCount: 78, degree: 'Dược sĩ chính', gallery: gallery, workplace: { name: 'Nhà thuốc Medicare', address: '567 Điện Biên Phủ, Q.3, TP.HCM' }, services: servicesData, ratingData: ratingData, qaData: qaData },
                { fullName: 'Dược sĩ Võ Thị Phương', phoneNumber: '0909666777', address: 'Nhà thuốc Đức Tâm, 890 Nguyễn Trãi, Q.5, TP.HCM', specialistly: 'Dược thực phẩm', career: 'Dược sĩ tư vấn', pointsCMEOnline: 10500, memberRank: 'gold', status: 'active', isVerified: true, rating: 4.7, reviewCount: 65, degree: 'Dược sĩ tư vấn', gallery: gallery, workplace: { name: 'Nhà thuốc Đức Tâm', address: '890 Nguyễn Trãi, Q.5, TP.HCM' }, services: servicesData, ratingData: ratingData, qaData: qaData },
                { fullName: 'Dược sĩ Đặng Minh Giang', phoneNumber: '0909777888', address: 'Nhà thuốc Bảo Châu, 234 Phan Văn Trị, Gò Vấp, TP.HCM', specialistly: 'Dược lâm sàng', career: 'Dược sĩ', pointsCMEOnline: 7200, memberRank: 'bronze', status: 'active', isVerified: false, rating: 4.3, reviewCount: 28, degree: 'Dược sĩ', gallery: gallery, workplace: { name: 'Nhà thuốc Bảo Châu', address: '234 Phan Văn Trị, Gò Vấp' }, services: servicesData, ratingData: ratingData, qaData: qaData },
                { fullName: 'Dược sĩ Ngô Thị Hoa', phoneNumber: '0909888999', address: 'Nhà thuốc Minh Đức, 345 Hoàng Văn Thụ, Tân Bình, TP.HCM', specialistly: 'Dược học cổ truyền', career: 'Dược sĩ chính', pointsCMEOnline: 16800, memberRank: 'platinum', status: 'active', isVerified: true, rating: 4.9, reviewCount: 110, degree: 'Dược sĩ chính', gallery: gallery, workplace: { name: 'Nhà thuốc Minh Đức', address: '345 Hoàng Văn Thụ, Tân Bình, TP.HCM' }, services: servicesData, ratingData: ratingData, qaData: qaData },
            ]
        });
    }

    // Seed Patients (smaller count since they don't need profile data)
    const patientsCount = await prisma.patient.count();
    console.log(`Patients count: ${patientsCount}`);
    if (patientsCount === 0) {
        console.log('Seeding patients...');
        await prisma.patient.createMany({
            data: [
                { name: 'Nguyễn Văn A', phone: '0901111111', email: 'nva@gmail.com', visits: 5, lastVisit: '2025-12-15', status: 'active' },
                { name: 'Trần Thị B', phone: '0902222222', email: 'ttb@gmail.com', visits: 3, lastVisit: '2025-12-20', status: 'active' },
                { name: 'Lê Văn C', phone: '0903333333', visits: 8, lastVisit: '2025-12-10', status: 'active' },
            ]
        });
    }

    console.log('Seed completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });