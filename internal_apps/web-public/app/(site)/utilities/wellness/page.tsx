"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

export default function WellnessPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Spa & Massage Trị liệu</h1>
                    <p className="text-purple-100">Thư giãn cơ thể - Phục hồi tinh thần</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {['Massage Thái', 'Yoga Trị liệu', 'Xông hơi Thảo dược'].map((s, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                <i className="fi flaticon-spa text-3xl text-purple-600"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{s}</h3>
                            <p className="text-gray-500 mb-4">Giảm căng thẳng, cải thiện tuần hoàn máu</p>
                            <div className="text-2xl font-bold text-primary mb-4">500.000đ/buổi</div>
                            <button className="w-full bg-purple-500 text-white font-bold py-3 rounded-xl">Đặt lịch</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
