"use client";

import React from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

const SCHEDULE = [
    { age: 'Sơ sinh', vaccines: ['Viêm gan B (mũi 1)', 'Lao'] },
    { age: '2 tháng', vaccines: ['Bạch hầu - Ho gà - Uốn ván', 'Bại liệt', 'Hib', 'Viêm gan B (mũi 2)', 'Phế cầu'] },
    { age: '3 tháng', vaccines: ['Bạch hầu - Ho gà - Uốn ván', 'Bại liệt', 'Hib', 'Viêm gan B (mũi 3)', 'Phế cầu'] },
    { age: '4 tháng', vaccines: ['Bạch hầu - Ho gà - Uốn ván', 'Bại liệt', 'Hib', 'Viêm gan B (mũi 4)', 'Phế cầu'] },
    { age: '6 tháng', vaccines: ['Cúm (mũi 1)', 'Viêm màng não mô cầu BC'] },
    { age: '9 tháng', vaccines: ['Sởi (mũi 1)', 'Viêm não Nhật Bản', 'Thủy đậu'] },
    { age: '12 tháng', vaccines: ['Sởi - Quai bị - Rubella', 'Viêm gan A', 'Viêm não Nhật Bản (mũi nhắc)'] },
];

export default function VaccinationPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="mb-6">
                    <Link href="/tools" className="text-gray-500 hover:text-primary flex items-center gap-2 font-bold w-fit">
                        <i className="fi flaticon-left-arrow text-xs"></i> Quay lại Công cụ
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900">Lịch tiêm chủng mở rộng</h1>
                        <p className="text-gray-500">Tham khảo lịch tiêm chủng tiêu chuẩn cho trẻ em.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        {SCHEDULE.map((item, idx) => (
                            <div key={idx} className="flex border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                <div className="w-1/3 md:w-1/4 p-6 bg-green-50/50 flex items-center justify-center font-bold text-green-700 border-r border-gray-100">
                                    {item.age}
                                </div>
                                <div className="flex-1 p-6 flex flex-col justify-center">
                                    <ul className="space-y-2">
                                        {item.vaccines.map((v, vIdx) => (
                                            <li key={vIdx} className="flex items-center gap-2 text-gray-700">
                                                <i className="fi flaticon-injection text-green-500 text-xs"></i>
                                                {v}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
