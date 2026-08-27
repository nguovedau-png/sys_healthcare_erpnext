export const CATEGORIES = [
    { id: 'all', name: 'Tất cả' },
    { id: 'general', name: 'Khám tổng quát' },
    { id: 'cancer', name: 'Tầm soát ung thư' },
    { id: 'maternity', name: 'Thai sản' },
    { id: 'cardio', name: 'Tim mạch' },
    { id: 'digestive', name: 'Tiêu hóa' },
];

export const PACKAGES = [
    {
        id: 'pkg-001',
        title: 'Gói khám sức khỏe tổng quát Cơ bản',
        price: 1500000,
        originalPrice: 2000000,
        discount: 25,
        image: '/img/packages/general-basic.jpg',
        category: 'general',
        hospitalName: 'Bệnh viện Đa khoa Quốc tế Vinmec',
        hospitalAddress: '208 Nguyễn Hữu Cảnh, Q. Bình Thạnh',
        rating: 4.8,
        reviews: 120,
        description: 'Tầm soát các bệnh lý thông thường. Phù hợp cho người trẻ tuổi (dưới 30).',
        details: [
            'Khám nội tổng quát',
            'Xét nghiệm công thức máu',
            'Xét nghiệm đường máu, mỡ máu',
            'Siêu âm bụng tổng quát',
            'Chụp X-quang phổi'
        ]
    },
    {
        id: 'pkg-002',
        title: 'Gói khám tổng quát VIP dành cho Nữ',
        price: 4500000,
        originalPrice: 5500000,
        discount: 18,
        image: '/img/packages/general-vip-female.jpg',
        category: 'general',
        hospitalName: 'Bệnh viện Đại học Y Dược',
        hospitalAddress: '215 Hồng Bàng, Q.5',
        rating: 4.9,
        reviews: 85,
        description: 'Gói khám chuyên sâu thiết kế riêng cho phụ nữ trên 40 tuổi.',
        details: [
            'Bao gồm các hạng mục gói Cơ bản',
            'Tầm soát ung thư vú (Chụp nhũ ảnh)',
            'Tầm soát ung thư cổ tử cung',
            'Đo loãng xương',
            'Siêu âm tuyến giáp'
        ]
    },
    {
        id: 'pkg-003',
        title: 'Gói Tầm soát Ung thư Toàn diện (Nâng cao)',
        price: 8900000,
        originalPrice: 12000000,
        discount: 26,
        image: '/img/packages/cancer-screening.jpg',
        category: 'cancer',
        hospitalName: 'Bệnh viện Chợ Rẫy',
        hospitalAddress: '201B Nguyễn Chí Thanh, Q.5',
        rating: 5.0,
        reviews: 42,
        description: 'Phát hiện sớm các loại ung thư phổ biến nhất: Phổi, Gan, Dạ dày, Đại tràng.',
        details: [
            'Xét nghiệm Marker ung thư (CEA, AFP, CA 19-9...)',
            'Nội soi dạ dày - đại tràng (gây mê)',
            'CT Scanner lồng ngực',
            'Siêu âm ổ bụng màu 4D'
        ]
    },
    {
        id: 'pkg-004',
        title: 'Thai sản trọn gói - Quý 1',
        price: 3200000,
        originalPrice: 3500000,
        discount: 8,
        image: '/img/packages/maternity.jpg',
        category: 'maternity',
        hospitalName: 'Bệnh viện Từ Dũ',
        hospitalAddress: '284 Cống Quỳnh, Q.1',
        rating: 4.7,
        reviews: 310,
        description: 'Chăm sóc mẹ và bé trong 3 tháng đầu thai kỳ.',
        details: [
            'Khám thai định kỳ với bác sĩ chuyên khoa',
            'Siêu âm thai 2D/4D',
            'Xét nghiệm Double Test',
            'Tư vấn dinh dưỡng thai kỳ'
        ]
    },
    {
        id: 'pkg-005',
        title: 'Gói tầm soát Tim mạch Cơ bản',
        price: 2100000,
        originalPrice: 2500000,
        discount: 16,
        image: '/img/packages/cardio.jpg',
        category: 'cardio',
        hospitalName: 'Viện Tim TP.HCM',
        hospitalAddress: '04 Dương Quang Trung, Q.10',
        rating: 4.8,
        reviews: 95,
        description: 'Đánh giá chức năng tim mạch, phát hiện sớm nguy cơ đột quỵ.',
        details: [
            'Điện tâm đồ (ECG)',
            'Siêu âm tim Doppler màu',
            'Xét nghiệm bộ mỡ máu đầy đủ',
            'Đo trắc nghiệm gắng sức'
        ]
    }
];
