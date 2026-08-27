"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function AdvertisingPage() {
    const packages = [
        {
            id: 1,
            name: 'Cơ bản',
            price: 5000000,
            period: 'tháng',
            features: [
                'Hiển thị logo & thông tin',
                'Liên kết website',
                '1000 lượt xem/tháng',
                'Hỗ trợ qua email'
            ],
            highlight: false
        },
        {
            id: 2,
            name: 'Nâng cao',
            price: 15000000,
            period: 'tháng',
            features: [
                'Tất cả tính năng gói Cơ bản',
                'Banner quảng cáo',
                '5000 lượt xem/tháng',
                'Ưu tiên hiển thị',
                'Hỗ trợ qua điện thoại'
            ],
            highlight: true
        },
        {
            id: 3,
            name: 'Doanh nghiệp',
            price: 50000000,
            period: 'tháng',
            features: [
                'Tất cả tính năng gói Nâng cao',
                'Quảng cáo video',
                'Không giới hạn lượt xem',
                'Báo cáo thống kê chi tiết',
                'Hỗ trợ 24/7',
                'Tư vấn chiến lược'
            ],
            highlight: false
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Banner page="others" />

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Quảng cáo</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Tiếp cận hàng triệu bệnh nhân tiềm năng với các gói quảng cáo linh hoạt
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {packages.map(pack => (
                        <div key={pack.id} className={`p-8 rounded-lg ${pack.highlight ? 'bg-primary text-white shadow-lg scale-105' : 'bg-gray-50'} transition-all`}>
                            <h3 className={`text-2xl font-bold mb-2 ${pack.highlight ? 'text-white' : 'text-gray-900'}`}>{pack.name}</h3>
                            <div className="mb-6">
                                <span className={`text-4xl font-bold ${pack.highlight ? 'text-white' : 'text-gray-900'}`}>
                                    {pack.price.toLocaleString('vi-VN')}
                                </span>
                                <span className={`text-sm ${pack.highlight ? 'text-white/80' : 'text-gray-500'}`}>/{pack.period}</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {pack.features.map((feature, i) => (
                                    <li key={i} className={`flex items-center ${pack.highlight ? 'text-white/90' : 'text-gray-600'}`}>
                                        <i className={`fi flaticon-check ${pack.highlight ? 'text-white' : 'text-green-500'} mr-3`}></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-3 font-semibold rounded-lg transition-colors ${pack.highlight ? 'bg-white text-primary hover:bg-gray-100' : 'bg-primary text-white hover:bg-primary/90'}`}>
                                Đăng ký ngay
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tại sao chọn quảng cáo?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Tiếp cận đúng khách hàng', desc: 'Nhắm đúng đối tượng bệnh nhân tiềm năng', icon: 'flaticon-target' },
                            { title: 'Tăng uy tín', desc: 'Hiển thị trên nền tảng y tế uy tín', icon: 'flaticon-trending-up' },
                            { title: 'Đo lường hiệu quả', desc: 'Báo cáo chi tiết, minh bạch', icon: 'flaticon-analytics' }
                        ].map(item => (
                            <div key={item.title} className="text-center">
                                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                    <i className={`fi ${item.icon}`}></i>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}