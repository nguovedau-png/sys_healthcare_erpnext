"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

export default function PregnancyPage() {
    const [lastPeriod, setLastPeriod] = useState('');
    const [dueDate, setDueDate] = useState<string>('');
    const [week, setWeek] = useState<number | null>(null);

    const calculateDueDate = () => {
        if (!lastPeriod) return;
        const last = new Date(lastPeriod);
        const due = new Date(last.getTime() + 280 * 24 * 60 * 60 * 1000); // +280 days
        setDueDate(due.toLocaleDateString('vi-VN'));

        // Calculate weeks
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - last.getTime());
        const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
        setWeek(diffWeeks);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="mb-6">
                    <Link href="/tools" className="text-gray-500 hover:text-primary flex items-center gap-2 font-bold w-fit">
                        <i className="fi flaticon-left-arrow text-xs"></i> Quay lại Công cụ
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                    <div className="p-8 md:p-12 md:w-1/2 space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900">Tính ngày dự sinh</h1>
                        <p className="text-gray-500">Nhập ngày đầu tiên của kỳ kinh cuối cùng.</p>

                        <label className="block text-sm font-bold text-gray-700 mb-2">Ngày đầu kỳ kinh cuối</label>
                        <input
                            type="date"
                            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-500 outline-none"
                            value={lastPeriod}
                            onChange={(e) => setLastPeriod(e.target.value)}
                        />
                        <button
                            onClick={calculateDueDate}
                            className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-500/30 hover:bg-pink-600 transition-all"
                        >
                            Xem kết quả
                        </button>
                    </div>
                    <div className="p-8 md:p-12 md:w-1/2 bg-pink-50 flex flex-col justify-center text-center">
                        {dueDate ? (
                            <div className="animate-fade-in-up">
                                <p className="text-gray-500 font-bold mb-2">Ngày dự sinh của bạn</p>
                                <div className="text-4xl font-extrabold text-pink-600 mb-6">{dueDate}</div>
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <p className="text-sm text-gray-500">Tuổi thai hiện tại</p>
                                    <p className="text-2xl font-bold text-gray-800">{week} tuần</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-pink-300">
                                <i className="fi flaticon-baby-boy text-6xl mb-4 inline-block opacity-50"></i>
                                <p>Nhập thông tin để xem kết quả</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
