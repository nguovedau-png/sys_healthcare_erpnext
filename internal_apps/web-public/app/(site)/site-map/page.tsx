"use client";

import React from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

export default function SitemapPage() {
    const sections = [
        {
            title: 'Trang chủ',
            links: [
                { label: 'Trang chủ', href: '/' },
                { label: 'Tìm kiếm', href: '/search' },
                { label: 'Tin tức', href: '/news' },
                { label: 'Diễn đàn', href: '/forum' },
                { label: 'Video', href: '/video' },
            ]
        },
        {
            title: 'Dịch vụ',
            links: [
                { label: 'Đặt lịch khám', href: '/search?type=doctor' },
                { label: 'Tìm bệnh viện', href: '/search?type=hospital' },
                { label: 'Tìm phòng khám', href: '/search?type=clinic' },
                { label: 'Tìm nhà thuốc', href: '/search?type=pharmacy' },
                { label: 'Tìm thuốc', href: '/search?type=medicine' },
                { label: 'Tra cứu bệnh', href: '/search?type=disease' },
            ]
        },
        {
            title: 'Tiện ích',
            links: [
                { label: 'Gói khám sức khỏe', href: '/utilities/packages' },
                { label: 'Bảo hiểm', href: '/utilities/insurance' },
                { label: 'Tư vấn bác sĩ', href: '/utilities/ask-doctor' },
                { label: 'Khám từ xa', href: '/utilities/telemedicine' },
                { label: 'Chăm sóc gia đình', href: '/utilities/family-management' },
                { label: 'Chăm sóc người cao tuổi', href: '/utilities/elder-care' },
            ]
        },
        {
            title: 'Công cụ',
            links: [
                { label: 'BMI Calculator', href: '/tools/bmi' },
                { label: 'Tính calories', href: '/tools/calories' },
                { label: 'Theo dõi thai kỳ', href: '/tools/pregnancy' },
                { label: 'Tiêm chủng', href: '/tools/vaccination' },
                { label: 'Kiểm tra triệu chứng', href: '/ai/symptom-checker' },
            ]
        },
        {
            title: 'Cửa hàng',
            links: [
                { label: 'Cửa hàng', href: '/shop' },
                { label: 'Giỏ hàng', href: '/shop/cart' },
                { label: 'Đặt nhanh', href: '/shop/quick-order' },
                { label: 'Thông tin nhà thuốc', href: '/shop/pharmacy-info' },
            ]
        },
        {
            title: 'Hồ sơ',
            links: [
                { label: 'Hồ sơ cá nhân', href: '/profile/user' },
                { label: 'Lịch hẹn', href: '/profile/bookings' },
                { label: 'Sức khỏe', href: '/profile/my-health' },
                { label: 'Bệnh sử', href: '/profile/medical-history' },
                { label: 'Khóa học', href: '/profile/courses' },
            ]
        },
        {
            title: 'Về chúng tôi',
            links: [
                { label: 'Giới thiệu', href: '/owner/about' },
                { label: 'Liên hệ', href: '/owner/contact' },
                { label: 'Tuyển dụng', href: '/owner/job' },
                { label: 'Quảng cáo', href: '/owner/advertising' },
            ]
        },
        {
            title: 'Khác',
            links: [
                { label: 'Đăng nhập', href: '/login' },
                { label: 'Đăng ký', href: '/register' },
                { label: 'Cài đặt', href: '/settings' },
                { label: 'Sơ cấp cứu', href: '/utilities/emergency' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Banner page="others" />

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Sitemap</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Danh sách tất cả các trang trong hệ thống Medical Ecosystem
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sections.map(section => (
                        <div key={section.title} className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map(link => (
                                    <li key={link.href}>
                                        <Link 
                                            href={link.href}
                                            className="text-gray-600 hover:text-primary transition-colors block py-1"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}