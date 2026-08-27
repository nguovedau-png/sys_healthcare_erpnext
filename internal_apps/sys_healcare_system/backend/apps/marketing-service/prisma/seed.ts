import { PrismaClient } from '../../../node_modules/.prisma/client-marketing-service';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding marketing-service...');

    // === CHARITY CAMPAIGNS ===
    const charityCount = await prisma.charityCampaign.count();
    if (charityCount === 0) {
        await prisma.charityCampaign.createMany({
            data: [
                {
                    title: 'Nhịp Tim Yêu Thương 2024',
                    description: 'Gây quỹ phẫu thuật bệnh tim bẩm sinh cho 50 em nhỏ tại vùng cao Tây Bắc. Mỗi ca phẫu thuật có chi phí từ 80-120 triệu đồng, vượt quá khả năng của các gia đình nghèo.',
                    image: 'https://images.unsplash.com/photo-1542810505-f377c8eec9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    raised: BigInt(450000000),
                    goal: BigInt(500000000),
                    donators: 1250,
                    percent: 90,
                    urgent: true,
                    hospital: 'Bệnh viện Nhi Đồng 1 - TP.HCM',
                    endDate: new Date('2024-12-31'),
                },
                {
                    title: 'Chuyến Xe Hi Vọng',
                    description: 'Hỗ trợ chi phí đi lại và bữa ăn 0 đồng cho bệnh nhân chạy thận nhân tạo khó khăn trong mùa mưa bão. Hàng trăm bệnh nhân cần đi lại 3 lần/tuần để duy trì cuộc sống.',
                    image: 'https://images.unsplash.com/photo-1593113554446-aa4e37517cde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    raised: BigInt(85000000),
                    goal: BigInt(200000000),
                    donators: 430,
                    percent: 42,
                    urgent: false,
                    hospital: 'Bệnh viện Chợ Rẫy',
                    endDate: new Date('2025-01-31'),
                },
                {
                    title: 'Ghép Tế Bào Gốc Cho Bé Su',
                    description: 'Bé Su (5 tuổi) mắc bệnh Ung thư máu giai đoạn 3, gia đình nông thôn không còn khả năng chi trả. Ca ghép tủy xương là cơ hội duy nhất để bé có thể sống.',
                    image: 'https://images.unsplash.com/photo-1608240092686-dd0684fdb6fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    raised: BigInt(1200000000),
                    goal: BigInt(2000000000),
                    donators: 3452,
                    percent: 60,
                    urgent: true,
                    hospital: 'Viện Huyết học Truyền máu Trung Ương',
                    endDate: new Date('2024-12-15'),
                },
            ],
        });
        console.log('Seeded CharityCampaigns');
    }

    // === INSURANCE PARTNERS ===
    const insuranceCount = await prisma.insurancePartner.count();
    if (insuranceCount === 0) {
        await prisma.insurancePartner.createMany({
            data: [
                {
                    name: 'Bảo Việt Sức Khỏe',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Bao_Viet_logo.svg/1200px-Bao_Viet_logo.svg.png',
                    type: 'Bảo hiểm tư nhân',
                    highlight: 'Thanh toán 100% viện phí không cần giấy tờ',
                    coverageMax: '500 triệu đồng',
                    isActive: true,
                    sortOrder: 1,
                },
                {
                    name: 'Prudential Health',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/PRU_logo_red_RGB.png/800px-PRU_logo_red_RGB.png',
                    type: 'Bảo hiểm quốc tế',
                    highlight: 'Điều trị quốc tế tại 190+ quốc gia',
                    coverageMax: '2 tỷ đồng',
                    isActive: true,
                    sortOrder: 2,
                },
                {
                    name: 'BHYT Nhà nước',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Vietnam_Social_Insurance.svg/800px-Vietnam_Social_Insurance.svg.png',
                    type: 'Bảo hiểm nhà nước',
                    highlight: 'Bảo hiểm y tế toàn dân - Bắt buộc',
                    coverageMax: '40 triệu đồng/năm',
                    isActive: true,
                    sortOrder: 3,
                },
                {
                    name: 'AIA Health Plus',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/AIA_Group_logo.svg/1200px-AIA_Group_logo.svg.png',
                    type: 'Bảo hiểm quốc tế',
                    highlight: 'Bảo hiểm ung thư & bệnh hiểm nghèo',
                    coverageMax: '3 tỷ đồng',
                    isActive: true,
                    sortOrder: 4,
                },
                {
                    name: 'PVI Care',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/PVI_logo.svg/1200px-PVI_logo.svg.png',
                    type: 'Bảo hiểm tư nhân',
                    highlight: 'Không giới hạn số lần khám bệnh',
                    coverageMax: '300 triệu đồng',
                    isActive: true,
                    sortOrder: 5,
                },
                {
                    name: 'Manulife Health',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Manulife_logo.svg/1200px-Manulife_logo.svg.png',
                    type: 'Bảo hiểm quốc tế',
                    highlight: 'Bảo hiểm thai sản trọn gói cho mẹ và bé',
                    coverageMax: '1 tỷ đồng',
                    isActive: true,
                    sortOrder: 6,
                },
            ],
        });
        console.log('Seeded InsurancePartners');
    }

    // Seed existing entities if empty
    const promoCount = await prisma.promotion.count();
    if (promoCount === 0) {
        await prisma.promotion.createMany({
            data: [
                {
                    code: 'HEALTH10',
                    name: 'Giảm 10% khám bệnh Online',
                    createDate: '2024-01-01',
                    systemSource: 'web',
                    link: '/telemedicine',
                    type: 'discount',
                    status: '01',
                },
                {
                    code: 'NEWUSER',
                    name: 'Miễn phí khám lần đầu',
                    createDate: '2024-01-01',
                    systemSource: 'web',
                    link: '/booking',
                    type: 'voucher',
                    status: '01',
                },
            ],
        });
    }

    const voucherCount = await prisma.voucher.count();
    if (voucherCount === 0) {
        await prisma.voucher.createMany({
            data: [
                {
                    code: 'CARE50K',
                    name: 'Giảm 50.000đ cho lần khám đầu',
                    discount: '50.000đ',
                    minOrder: '200.000đ',
                    maxUses: 1000,
                    expiry: '2024-12-31',
                    status: 'active',
                },
                {
                    code: 'DENTAL20',
                    name: 'Giảm 20% dịch vụ nha khoa',
                    discount: '20%',
                    minOrder: '500.000đ',
                    maxUses: 500,
                    expiry: '2024-12-31',
                    status: 'active',
                },
            ],
        });
    }

    console.log('Seeding marketing-service finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
