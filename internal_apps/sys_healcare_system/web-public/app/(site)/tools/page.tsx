"use client";

import React from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

const TOOLS = [
    {
        id: 'bmi',
        title: 'Tính chỉ số BMI',
        desc: 'Đánh giá tình trạng cân nặng, béo phì dựa trên chiều cao và cân nặng.',
        icon: 'flaticon-weight-scale',
        color: 'bg-blue-50 text-blue-600',
        href: '/tools/bmi'
    },
    {
        id: 'pregnancy',
        title: 'Tính ngày dự sinh',
        desc: 'Ước tính ngày chào đời của bé yêu và tuổi thai hiện tại.',
        icon: 'flaticon-baby-boy',
        color: 'bg-pink-50 text-pink-600',
        href: '/tools/pregnancy'
    },
    {
        id: 'vaccination',
        title: 'Lịch tiêm chủng',
        desc: 'Tra cứu danh sách vắc-xin cần thiết cho trẻ em và người lớn.',
        icon: 'flaticon-injection',
        color: 'bg-green-50 text-green-600',
        href: '/tools/vaccination'
    },
    {
        id: 'calories',
        title: 'Tính calo (BMR & TDEE)',
        desc: 'Tính lượng calo tiêu thụ mỗi ngày để giúp bạn tăng/giảm cân khoa học.',
        icon: 'flaticon-apple',
        color: 'bg-orange-50 text-orange-600',
        href: '/tools/calories'
    }
];

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />

            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Công cụ Sức khỏe</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Bộ công cụ tiện ích giúp bạn theo dõi và chăm sóc sức khỏe chủ động cho bản thân và gia đình.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TOOLS.map((tool) => (
                        <Link href={tool.href} key={tool.id} className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl mb-6 ${tool.color} group-hover:scale-110 transition-transform`}>
                                <i className={`fi ${tool.icon}`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{tool.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
