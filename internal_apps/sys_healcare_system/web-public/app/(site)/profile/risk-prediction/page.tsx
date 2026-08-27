"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

export default function RiskPredictionPage() {
    const [result, setResult] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Dự đoán Nguy cơ Bệnh</h1>
                <p className="text-gray-500 text-center mb-12">AI phân tích lối sống để đánh giá nguy cơ mắc bệnh</p>

                <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                    {!result ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tuổi</label>
                                    <input type="number" className="w-full border border-gray-200 rounded-xl p-3 outline-none" placeholder="35" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Giới tính</label>
                                    <select className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-white">
                                        <option>Nam</option>
                                        <option>Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Bạn có hút thuốc không?</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="smoke" /> Có</label>
                                    <label className="flex items-center gap-2"><input type="radio" name="smoke" defaultChecked /> Không</label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tần suất tập thể dục</label>
                                <select className="w-full border border-gray-200 rounded-xl p-3 outline-none bg-white">
                                    <option>Không bao giờ</option>
                                    <option>1-2 lần/tuần</option>
                                    <option>3-5 lần/tuần</option>
                                    <option>Hàng ngày</option>
                                </select>
                            </div>
                            <button onClick={() => setResult(true)} className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark">
                                Phân tích ngay
                            </button>
                        </div>
                    ) : (
                        <div className="text-center animate-fade-in">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Kết quả Đánh giá</h3>
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                {[
                                    { disease: 'Tiểu đường', risk: 15, color: 'green' },
                                    { disease: 'Tim mạch', risk: 28, color: 'yellow' },
                                    { disease: 'Ung thư', risk: 8, color: 'green' }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                                        <div className={`text-4xl font-bold text-${item.color}-600 mb-2`}>{item.risk}%</div>
                                        <div className="text-sm text-gray-600">{item.disease}</div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6">Nguy cơ tổng thể: <strong className="text-green-600">Thấp</strong></p>
                            <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark">
                                Xem khuyến nghị
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
