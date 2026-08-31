import React from 'react';
import Link from 'next/link';
import {
    FaAmbulance, FaUserMd, FaBrain, FaLaptopMedical,
    FaVials, FaPills, FaNotesMedical, FaHeartbeat,
    FaTooth, FaChild, FaHandHoldingHeart, FaHandHoldingMedical,
    FaBriefcaseMedical, FaCalendarCheck, FaMedal, FaVideo,
    FaUsers, FaComments
} from 'react-icons/fa';
import Card from '@/components/ui/Card';
import { Title, Text } from '@/components/ui/Typography';
import Tag from '@/components/ui/Tag';

interface UtilityItem {
    id: string;
    title: string;
    desc: string;
    icon: React.ElementType;
    color: string;
    link: string;
    image: string;
    badge?: string;
    badgeColor?: string;
}

const UTILITIES: UtilityItem[] = [
    {
        id: 'emergency-call',
        title: 'Thủ tục Cấp cứu',
        desc: 'Hỗ trợ y tế khẩn cấp 24/7',
        icon: FaAmbulance,
        color: 'text-red-500',
        image: 'https://images.unsplash.com/photo-1587556930799-8dca6aae3c38?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/ambulance',
        badge: 'Khẩn cấp',
        badgeColor: 'bg-red-500'
    },
    {
        id: 'appointment',
        title: 'Đặt khám Bác sĩ',
        desc: 'Lên lịch khám chuyên khoa',
        icon: FaUserMd,
        color: 'text-indigo-500',
        image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=400&q=80',
        link: '/booking',
        badge: 'Phổ biến',
        badgeColor: 'bg-indigo-500'
    },
    {
        id: 'symptom-checker',
        title: 'Tra Triệu chứng',
        desc: 'Phân tích chẩn đoán bằng AI',
        icon: FaBrain,
        color: 'text-sky-500',
        image: 'https://images.unsplash.com/photo-1584036561566-baf8f5e1b42b?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/symptom-checker',
        badge: 'AI',
        badgeColor: 'bg-amber-500'
    },
    {
        id: 'telemedicine',
        title: 'Tư vấn Video',
        desc: 'Gặp bác sĩ từ xa dễ dàng',
        icon: FaLaptopMedical,
        color: 'text-teal-500',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/telemedicine',
        badge: 'Mới',
        badgeColor: 'bg-teal-500'
    },
    {
        id: 'diseases',
        title: 'Từ điển Bệnh học',
        desc: 'Tra cứu thông tin tin cậy',
        icon: FaVials,
        color: 'text-orange-500',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/diseases'
    },
    {
        id: 'pharmacy',
        title: 'Đặt thuốc Online',
        desc: 'Giao thuốc tận nhà đúng hẹn',
        icon: FaPills,
        color: 'text-green-500',
        image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=400&q=80',
        link: '/search?type=pharmacy'
    },
    {
        id: 'packages',
        title: 'Gói Khám ưu đãi',
        desc: 'Khám sức khỏe toàn diện',
        icon: FaNotesMedical,
        color: 'text-cyan-500',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/packages'
    },
    {
        id: 'insurance',
        title: 'Viện phí Bảo lãnh',
        desc: 'Thanh toán bảo hiểm nhanh',
        icon: FaHeartbeat,
        color: 'text-blue-600',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/insurance'
    },
    {
        id: 'dental',
        title: 'Nha khoa Thẩm mỹ',
        desc: 'Chăm sóc nụ cười hoàn hảo',
        icon: FaTooth,
        color: 'text-blue-400',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/dental'
    },
    {
        id: 'family',
        title: 'Hồ sơ Gia đình',
        desc: 'Quản lý sức khỏe người thân',
        icon: FaChild,
        color: 'text-pink-500',
        image: 'https://images.unsplash.com/photo-1542027959-17b5def011fc?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/family-management'
    },
    {
        id: 'elder-care',
        title: 'Dưỡng lão & Y tế',
        desc: 'Chăm sóc người cao tuổi',
        icon: FaHandHoldingHeart,
        color: 'text-amber-500',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/elder-care'
    },
    {
        id: 'charity',
        title: 'Thiện nguyện',
        desc: 'Chung tay vì cộng đồng',
        icon: FaHandHoldingMedical,
        color: 'text-rose-500',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/charity'
    },
    {
        id: 'corporate',
        title: 'Y tế Doanh nghiệp',
        desc: 'Khám sức khỏe định kỳ',
        icon: FaBriefcaseMedical,
        color: 'text-slate-600',
        image: 'https://images.unsplash.com/photo-1664575602276-cd0d9775c734?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/corporate'
    },
    {
        id: 'events',
        title: 'Hội thảo Y khoa',
        desc: 'Sự kiện chuyên đề đặc biệt',
        icon: FaCalendarCheck,
        color: 'text-purple-500',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/events'
    },
    {
        id: 'challenges',
        title: 'Thử thách Sức khỏe',
        desc: 'Rèn luyện và nhận quà tặng',
        icon: FaMedal,
        color: 'text-yellow-500',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/challenges'
    },
    {
        id: 'live',
        title: 'Livestream',
        desc: 'Chuyên gia chia sẻ trực tiếp',
        icon: FaVideo,
        color: 'text-red-600',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
        link: '/utilities/live'
    },
    // {
    //     id: 'community',
    //     title: 'Cộng đồng',
    //     desc: 'Kết nối và chia sẻ',
    //     icon: FaUsers,
    //     color: 'text-indigo-600',
    //     image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80',
    //     link: '/health-community'
    // },
    {
        id: 'forum',
        title: 'Hỏi đáp Diễn đàn',
        desc: 'Trao đổi cùng mọi người',
        icon: FaComments,
        color: 'text-violet-500',
        image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=400&q=80',
        link: '/forum'
    }
];

const EcosystemUtilities = () => {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 xl:gap-4">
            {UTILITIES.map((item) => {
                const IconComponent = item.icon;
                return (
                    <Link key={item.id} href={item.link} className="block group">
                        <Card hoverable className="relative w-full rounded-2xl bg-white border-slate-50 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden" bodyStyle={{ padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '110px' }}>
                            {/* Decorative background glow on hover */}
                            <div className={`absolute -inset-4 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 blur-2xl ${item.color.replace('text-', 'bg-')}`}></div>

                            {/* Badge */}
                            {item.badge && (
                                <div className={`absolute top-1 right-1 z-20 px-1.5 py-0.5 rounded-md text-[7px] font-black uppercase tracking-widest text-white shadow-sm transition-transform duration-500 group-hover:scale-110 ${item.badgeColor || 'bg-primary'}`}>
                                    {item.badge}
                                </div>
                            )}

                            {/* Icon Container */}
                            <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all duration-500 group-hover:scale-110`}>
                                {/* Inner semi-transparent background */}
                                <div className={`absolute inset-0 opacity-[0.08] rounded-xl ${item.color.replace('text-', 'bg-')}`}></div>
                                <IconComponent className={`text-lg ${item.color} relative z-10 transition-transform duration-300`} />
                            </div>

                            {/* Title text */}
                            <span className="text-[10px] font-black text-slate-600 text-center group-hover:text-primary transition-colors z-10 leading-tight m-0 line-clamp-2 uppercase tracking-tight">
                                {item.title}
                            </span>

                            {/* Bottom decorative bar */}
                            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-t-full opacity-0 group-hover:w-1/3 group-hover:opacity-100 transition-all duration-500 ${item.color.replace('text-', 'bg-')}`}></div>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
};

export default EcosystemUtilities;
