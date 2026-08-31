"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const TESTS = [
    { id: 1, name: 'Xét nghiệm Tổng quát', price: 1200000, desc: 'Đánh giá chức năng gan, thận, mỡ máu, đường huyết...' },
    { id: 2, name: 'Xét nghiệm Sốt xuất huyết', price: 450000, desc: 'Phát hiện virus Dengue sớm trong 1-2 ngày đầu.' },
    { id: 3, name: 'Xét nghiệm NIPT (Sàng lọc trước sinh)', price: 3500000, desc: 'Phát hiện dị tật thai nhi không xâm lấn.' },
    { id: 4, name: 'Tầm soát Ung thư (Nam/Nữ)', price: 2100000, desc: 'Các chỉ số marker ung thư phổ biến.' }
];

export default function LabTestPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900">Xét nghiệm tại nhà</h1>
                    <p className="text-gray-500">Chủ động lấy mẫu, kết quả trả online, không cần chờ đợi tại bệnh viện.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {TESTS.map(test => (
                        <div key={test.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                <i className="fi flaticon-flask text-xl"></i>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">{test.name}</h3>
                            <p className="text-gray-500 text-sm mb-4 flex-1">{test.desc}</p>
                            <div className="border-t border-gray-100 pt-4 mt-auto">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-gray-500">Chi phí</span>
                                    <span className="font-bold text-primary">{test.price.toLocaleString()}đ</span>
                                </div>
                                <button className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Đặt lịch ngay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Steps */}
                <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quy trình dịch vụ</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: 1, title: 'Đặt lịch', desc: 'Chọn gói xét nghiệm và thời gian lấy mẫu.' },
                            { step: 2, title: 'Lấy mẫu', desc: 'Điều dưỡng đến tận nhà lấy mẫu đúng quy trình.' },
                            { step: 3, title: 'Phân tích', desc: 'Mẫu được gửi về phòng Lab đạt chuẩn ISO.' },
                            { step: 4, title: 'Nhận kết quả', desc: 'Kết quả trả qua App/Email sau 4-6 giờ.' }
                        ].map(s => (
                            <div key={s.step} className="text-center relative">
                                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 relative z-10">
                                    {s.step}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                                <p className="text-sm text-gray-500">{s.desc}</p>
                                {s.step < 4 && (
                                    <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-gray-100 -z-0"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
