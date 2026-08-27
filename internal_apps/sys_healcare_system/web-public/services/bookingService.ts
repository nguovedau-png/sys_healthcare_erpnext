import { Service, Provider, TimeSlot, BookingData, BookingResponse } from '../types/booking.types';

// Mock data for services
const mockServices: Service[] = [
    {
        id: 'service-1',
        name: 'Khám tổng quát',
        description: 'Khám sức khỏe toàn diện, phát hiện sớm bệnh lý',
        icon: 'flaticon-stethoscope',
        category: 'general',
        price: '200.000đ - 500.000đ'
    },
    {
        id: 'service-2',
        name: 'Tim mạch',
        description: 'Khám và điều trị các bệnh về tim mạch',
        icon: 'flaticon-heart',
        category: 'cardiology',
        price: '300.000đ - 800.000đ'
    },
    {
        id: 'service-3',
        name: 'Nhi khoa',
        description: 'Chăm sóc sức khỏe cho trẻ em',
        icon: 'flaticon-baby',
        category: 'pediatrics',
        price: '250.000đ - 600.000đ'
    },
    {
        id: 'service-4',
        name: 'Da liễu',
        description: 'Điều trị các bệnh về da',
        icon: 'flaticon-dermatology',
        category: 'dermatology',
        price: '200.000đ - 700.000đ'
    },
    {
        id: 'service-5',
        name: 'Răng hàm mặt',
        description: 'Khám và điều trị răng miệng',
        icon: 'flaticon-tooth',
        category: 'dental',
        price: '150.000đ - 1.000.000đ'
    },
    {
        id: 'service-6',
        name: 'Mắt',
        description: 'Khám và điều trị các bệnh về mắt',
        icon: 'flaticon-eye',
        category: 'ophthalmology',
        price: '200.000đ - 500.000đ'
    },
    {
        id: 'service-7',
        name: 'Tai mũi họng',
        description: 'Khám và điều trị tai mũi họng',
        icon: 'flaticon-ear',
        category: 'ent',
        price: '200.000đ - 600.000đ'
    },
    {
        id: 'service-8',
        name: 'Sản phụ khoa',
        description: 'Chăm sóc sức khỏe phụ nữ',
        icon: 'flaticon-pregnant',
        category: 'obstetrics',
        price: '300.000đ - 800.000đ'
    }
];

// Mock data for doctors
const mockDoctors: Provider[] = [
    {
        id: 'doctor-1',
        name: 'BS. Nguyễn Văn A',
        type: 'doctor',
        specialty: 'Tim mạch',
        avatar: '/styles/img/user/user-1.jpg',
        rating: 4.8,
        reviewCount: 156,
        address: 'Bệnh viện Chợ Rẫy, TP.HCM',
        experience: '15 năm kinh nghiệm',
        price: '500.000đ',
        availability: 'Sáng thứ 2, 4, 6'
    },
    {
        id: 'doctor-2',
        name: 'BS. Trần Thị B',
        type: 'doctor',
        specialty: 'Nhi khoa',
        avatar: '/styles/img/user/user-2.jpg',
        rating: 4.9,
        reviewCount: 203,
        address: 'Bệnh viện Nhi Đồng 1, TP.HCM',
        experience: '12 năm kinh nghiệm',
        price: '400.000đ',
        availability: 'Chiều thứ 3, 5, 7'
    },
    {
        id: 'doctor-3',
        name: 'BS. Lê Văn C',
        type: 'doctor',
        specialty: 'Da liễu',
        avatar: '/styles/img/user/user-3.jpg',
        rating: 4.7,
        reviewCount: 128,
        address: 'Bệnh viện Da Liễu TP.HCM',
        experience: '10 năm kinh nghiệm',
        price: '350.000đ',
        availability: 'Sáng thứ 2, 3, 4, 5, 6'
    }
];

// Mock data for hospitals
const mockHospitals: Provider[] = [
    {
        id: 'hospital-1',
        name: 'Bệnh viện Chợ Rẫy',
        type: 'hospital',
        avatar: '/img/hospital/hospital-1.jpg',
        rating: 4.6,
        reviewCount: 892,
        address: '201B Nguyễn Chí Thanh, Quận 5, TP.HCM',
        price: '200.000đ - 1.000.000đ',
        availability: 'Cả ngày, tất cả các ngày'
    },
    {
        id: 'hospital-2',
        name: 'Bệnh viện Nhi Đồng 1',
        type: 'hospital',
        avatar: '/img/hospital/hospital-2.jpg',
        rating: 4.7,
        reviewCount: 654,
        address: '341 Sư Vạn Hạnh, Quận 10, TP.HCM',
        price: '150.000đ - 800.000đ',
        availability: 'Cả ngày, tất cả các ngày'
    }
];

// Mock time slots
const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const times = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    times.forEach((time, index) => {
        slots.push({
            id: `slot-${index}`,
            time,
            available: Math.random() > 0.3 // 70% chance of being available
        });
    });

    return slots;
};

// Service functions
export const bookingService = {
    getServices: async (): Promise<Service[]> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockServices), 500);
        });
    },

    getDoctors: async (serviceId?: string): Promise<Provider[]> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockDoctors), 500);
        });
    },

    getHospitals: async (serviceId?: string): Promise<Provider[]> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockHospitals), 500);
        });
    },

    getAvailableSlots: async (providerId: string, date: Date): Promise<TimeSlot[]> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => resolve(generateTimeSlots()), 500);
        });
    },

    createBooking: async (bookingData: BookingData): Promise<BookingResponse> => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const bookingId = `BK-${Date.now().toString().slice(-6)}`;
                resolve({
                    success: true,
                    bookingId,
                    message: 'Đặt lịch thành công!'
                });
            }, 1000);
        });
    }
};
