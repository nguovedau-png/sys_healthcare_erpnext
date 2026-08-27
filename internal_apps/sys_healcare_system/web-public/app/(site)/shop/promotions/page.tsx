"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const PROMOTIONS = [
    { id: 1, title: 'Flash Sale - Gói khám tổng quát', discount: 40, code: 'HEALTH40', expiry: '31/12/2024', type: 'flash', image: '/img/promo-1.jpg' },
    { id: 2, title: 'Miễn phí ship cho đơn thuốc', discount: 0, code: 'FREESHIP', expiry: '15/01/2025', type: 'shipping', image: '/img/promo-2.jpg' },
    { id: 3, title: 'Giảm 200k - Xét nghiệm tại nhà', discount: 200000, code: 'LAB200', expiry: '20/12/2024', type: 'service', image: '/img/promo-3.jpg' },
];

const VOUCHERS = [
    { code: 'NEWUSER50', discount: '50k', condition: 'Cho khách hàng mới', status: 'available' },
    { code: 'VIP100', discount: '100k', condition: 'Đơn từ 1 triệu', status: 'available' },
    { code: 'BIRTHDAY20', discount: '20%', condition: 'Tháng sinh nhật', status: 'used' },
];

export default function PromotionsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />

            {/* Hero */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Ưu đãi & Khuyến mãi</h1>
                    <p className="text-orange-100 text-lg">Tiết kiệm chi phí chăm sóc sức khỏe với các chương trình hấp dẫn</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Featured Promotions */}
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Khuyến mãi nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {PROMOTIONS.map(promo => (
                        <div key={promo.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                            <div className="relative h-48">
                                <img
                                    src={promo.image}
                                    alt={promo.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => (e.target as HTMLImageElement).src = '/styles/img/banner/banner-3.jpg'}
                                />
                                {promo.type === 'flash' && (
                                    <span className="absolute top-3 right-3 bg-red-600 text-white font-bold px-3 py-1 rounded-full text-sm animate-pulse">
                                        🔥 Flash Sale
                                    </span>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{promo.title}</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-3xl font-extrabold text-red-600">
                                        {promo.discount > 100 ? `${(promo.discount / 1000).toFixed(0)}k` : `${promo.discount}%`}
                                    </span>
                                    <span className="text-gray-500">OFF</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg mb-4 border border-dashed border-gray-300">
                                    <div className="text-xs text-gray-500 mb-1">Mã giảm giá</div>
                                    <div className="flex items-center justify-between">
                                        <code className="font-bold text-primary text-lg">{promo.code}</code>
                                        <button className="text-xs font-bold text-primary hover:underline">Sao chép</button>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400">Hết hạn: {promo.expiry}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* My Vouchers */}
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Mã giảm giá của tôi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {VOUCHERS.map((voucher, idx) => (
                        <div key={idx} className={`bg-white rounded-lg p-6 shadow-sm border-2 ${voucher.status === 'used' ? 'border-gray-200 opacity-50' : 'border-primary'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-2xl font-extrabold text-primary">{voucher.discount}</div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${voucher.status === 'used' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-600'
                                    }`}>
                                    {voucher.status === 'used' ? 'Đã dùng' : 'Khả dụng'}
                                </span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg mb-3">
                                <code className="font-bold text-gray-900">{voucher.code}</code>
                            </div>
                            <p className="text-sm text-gray-500">{voucher.condition}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
