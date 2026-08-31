"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

export default function BMIPage() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState<number | null>(null);
    const [result, setResult] = useState<string>('');

    const calculateBMI = () => {
        if (!height || !weight) return;
        const h = parseFloat(height) / 100; // cm to m
        const w = parseFloat(weight);
        const value = w / (h * h);
        setBmi(parseFloat(value.toFixed(1)));

        if (value < 18.5) setResult('Nhẹ cân');
        else if (value < 23) setResult('Bình thường');
        else if (value < 25) setResult('Tiền béo phì');
        else if (value < 30) setResult('Béo phì độ I');
        else setResult('Béo phì độ II');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />

            <div className="container mx-auto px-4 py-16">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link href="/tools" className="text-gray-500 hover:text-primary flex items-center gap-2 font-bold w-fit">
                        <i className="fi flaticon-left-arrow text-xs"></i> Quay lại Công cụ
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12 space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tính chỉ số BMI</h1>
                        <p className="text-gray-500 mb-6">Nhập thông tin chiều cao và cân nặng để đánh giá tình trạng cơ thể.</p>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Chiều cao (cm)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="Ví dụ: 170"
                                    className="w-full border border-gray-200 rounded-xl p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                                <span className="absolute right-4 top-3 text-gray-400 font-bold text-sm">cm</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cân nặng (kg)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="Ví dụ: 65"
                                    className="w-full border border-gray-200 rounded-xl p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                                <span className="absolute right-4 top-3 text-gray-400 font-bold text-sm">kg</span>
                            </div>
                        </div>

                        <button
                            onClick={calculateBMI}
                            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all mt-4"
                        >
                            Tính ngay
                        </button>
                    </div>

                    <div className="bg-blue-50 p-8 md:p-12 flex flex-col justify-center text-center">
                        {bmi ? (
                            <div className="animate-scale-up">
                                <p className="text-gray-500 font-bold mb-2">Chỉ số BMI của bạn</p>
                                <div className="text-6xl font-extrabold text-blue-600 mb-4">{bmi}</div>
                                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6 ${result === 'Bình thường' ? 'bg-green-100 text-green-700' :
                                        result === 'Nhẹ cân' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {result}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {result === 'Bình thường'
                                        ? 'Xin chúc mừng! Cân nặng của bạn rất lý tưởng. Hãy duy trì chế độ ăn uống và tập luyện hiện tại.'
                                        : 'Bạn cần điều chỉnh chế độ sinh hoạt để đạt được cân nặng lý tưởng. Hãy tham khảo ý kiến bác sĩ hoặc chuyên gia dinh dưỡng.'
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="text-blue-300">
                                <i className="fi flaticon-weight-scale text-6xl mb-4 inline-block opacity-50"></i>
                                <p>Kết quả sẽ hiển thị tại đây</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
