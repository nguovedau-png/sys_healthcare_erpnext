'use client';

import { useRouter } from 'next/navigation';
import React, { Fragment, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Banner from '@/components/common/Banner';
import { useViewport } from '@/components/common/Function';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import { Title, Paragraph, Text } from '@/components/ui/Typography';
import { AiOutlineUser as UserOutlined, AiOutlineMedicineBox as DoctorOutlined, AiOutlineBank as HospitalOutlined, AiOutlineShop as PharmacyOutlined, AiOutlineIdcard as PharmacistOutlined, AiOutlineShoppingCart as ShoppingCartOutlined, AiOutlineRight as RightOutlined } from 'react-icons/ai';

// Dynamic imports
const TopDoctor = dynamic(() => import('./components/TopDoctor'), { ssr: false });
const TopHospital = dynamic(() => import('./components/TopHospital'), { ssr: false });
const TopPharmacy = dynamic(() => import('./components/TopPharmacy'), { ssr: false });
const Latest = dynamic(() => import('./components/Latest'), { ssr: false });
const EcosystemUtilities = dynamic(() => import('./components/EcosystemUtilities'), { ssr: false });

// Ecosystem Role Card
const EcosystemCard = ({ title, desc, icon, link, color }: { title: string, desc: string, icon: React.ReactNode, link: string, color: string }) => (
  <Link href={link} className="block group">
    <Card hoverable className="h-full border-border shadow-sm group-hover:shadow-soft" bodyStyle={{ padding: '16px' }}>
      <div className="flex flex-row items-start gap-4">
        <div className={`w-11 h-11 rounded-md ${color} bg-opacity-10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm mt-0.5`}>
          <div className={`text-xl ${color.replace('bg-', 'text-')}`}>
              {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <Title level={4} className="text-[15px] font-bold text-slate-800 mb-0.5 group-hover:text-primary transition-colors tracking-tight line-clamp-1 m-0">{title}</Title>
          <Paragraph className="text-xs font-medium text-slate-500 leading-snug mb-0 line-clamp-2">{desc}</Paragraph>
        </div>
      </div>
    </Card>
  </Link>
);

const SectionHeader = ({ title, linkText = "Xem tất cả", linkUrl = "#" }: { title: string, linkText?: string, linkUrl?: string }) => (
  <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
    <div className="flex items-center gap-2">
        <div className="w-[3px] h-4 bg-primary rounded-full"></div>
        <Title level={4} className="text-[17px] font-bold text-slate-800 m-0 tracking-tight leading-none">{title}</Title>
    </div>
    <Link href={linkUrl} className="group flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-primary transition-colors">
      {linkText} <RightOutlined className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

const Home = () => {
  const { width } = useViewport();

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* 1. Hero Section */}
      <div className="w-full bg-surface relative z-0 mb-16 shadow-soft">
        <Banner page="home" />
      </div>

      {/* 2. Healthcare Ecosystem Hub */}
      <div className="container mx-auto px-4 max-w-7xl mb-24 animate-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-3">Nền tảng</span>
          <Title level={2} className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 tracking-tight">Hệ sinh thái Y tế Toàn diện</Title>
          <Paragraph className="text-base text-slate-500 max-w-2xl mx-auto font-medium">Kết nối toàn diện giữa Bệnh nhân, Bác sĩ, và các Cơ sở y tế trên một nền tảng thống nhất.</Paragraph>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EcosystemCard
            title="Dành cho Bệnh nhân"
            desc="Đặt lịch khám, tư vấn trực tuyến và quản lý hồ sơ sức khỏe cá nhân."
            icon={<UserOutlined />}
            link="/profile"
            color="bg-primary"
          />
          <EcosystemCard
            title="Dành cho Bác sĩ"
            desc="Quản lý lịch hẹn, bệnh nhân và nâng cao uy tín chuyên môn."
            icon={<DoctorOutlined />}
            link="/search?type=doctor"
            color="bg-info"
          />
          <EcosystemCard
            title="Cơ sở Y tế"
            desc="Giải pháp chuyển đổi số toàn diện cho Bệnh viện và Phòng khám."
            icon={<HospitalOutlined />}
            link="/search?type=hospital"
            color="bg-secondary"
          />
          <EcosystemCard
            title="Nhà thuốc"
            desc="Kết nối nhà thuốc đạt chuẩn GPP với người dân có nhu cầu."
            icon={<PharmacyOutlined />}
            link="/shop"
            color="bg-success"
          />
          <EcosystemCard
            title="Dược sĩ"
            desc="Cộng đồng dược sĩ chuyên nghiệp, tư vấn thuốc an toàn hiệu quả."
            icon={<PharmacistOutlined />}
            link="/search?type=pharmacist"
            color="bg-warning"
          />
          <EcosystemCard
            title="Cửa hàng Y tế"
            desc="Mua sắm thiết bị y tế và thực phẩm chức năng chính hãng."
            icon={<ShoppingCartOutlined />}
            link="/shop"
            color="bg-error"
          />
        </div>
      </div>

      {/* 3. Ecosystem Utilities - Clean Grid */}
      <div className="container mx-auto px-4 max-w-7xl mb-24 animate-in fade-in duration-700 delay-100">
        <SectionHeader title="Tiện ích mở rộng" linkText="Tất cả dịch vụ" />
        <EcosystemUtilities />
      </div>

      {/* 4. Main Content Grid */}
      <div className="container mx-auto px-4 max-w-7xl pb-24">
        <div className="space-y-20">
            <section className="animate-in slide-in-from-bottom-8 duration-700 delay-200">
                <SectionHeader title="Nhà thuốc đối tác uy tín" linkUrl="/shop/pharmacies" linkText="Tìm nhà thuốc" />
                <TopPharmacy />
            </section>

            <section className="animate-in slide-in-from-bottom-8 duration-700 delay-300">
                <SectionHeader title="Bác sĩ nổi bật" linkUrl="/search?type=doctor" />
                <TopDoctor />
            </section>

            <section className="animate-in slide-in-from-bottom-8 duration-700 delay-400">
                <SectionHeader title="Cơ sở y tế tiêu biểu" linkUrl="/search?type=hospital" />
                <TopHospital />
            </section>

            <section className="animate-in slide-in-from-bottom-8 duration-700 delay-500">
                <SectionHeader title="Tin tức Y tế" linkUrl="/news" />
                <Latest />
            </section>
        </div>
      </div>
    </div>
  );
};

export default Home;