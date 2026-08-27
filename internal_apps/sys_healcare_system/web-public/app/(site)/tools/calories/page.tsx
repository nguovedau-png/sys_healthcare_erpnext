"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

export default function CaloriesPage() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activity, setActivity] = useState('1.2');
    const [tdee, setTdee] = useState<number | null>(null);

    const calculateCalories = () => {
        if (!weight || !height || !age) return;
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseFloat(age);

        // Mifflin-St Jeor Equation
        let bmr = 10 * w + 6.25 * h - 5 * a;
        bmr += gender === 'male' ? 5 : -161;

        const result = bmr * parseFloat(activity);
        setTdee(Math.round(result));
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

                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
                    <div className="p-8 lg:p-12 lg:w-3/5 space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900">Tính Calo (TDEE)</h1>
                        <p className="text-gray-500">Tính tổng năng lượng tiêu thụ mỗi ngày để điều chỉnh cân nặng.</p>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Giới tính</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none">
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tuổi</label>
                                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none" placeholder="25" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chiều cao (cm)</label>
                                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none" placeholder="170" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Cân nặng (kg)</label>
                                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none" placeholder="65" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Mức độ vận động</label>
                            <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full border border-gray-200 rounded-xl p-3 outline-none">
                                <option value="1.2">Ít vận động (nhân viên văn phòng)</option>
                                <option value="1.375">Nhẹ (tập 1-3 ngày/tuần)</option>
                                <option value="1.55">Vừa phải (tập 3-5 ngày/tuần)</option>
                                <option value="1.725">Năng động (tập 6-7 ngày/tuần)</option>
                            </select>
                        </div>

                        <button onClick={calculateCalories} className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all">Tính ngay</button>
                    </div>

                    <div className="p-8 lg:p-12 lg:w-2/5 bg-orange-50 flex flex-col justify-center text-center">
                        {tdee ? (
                            <div className="animate-fade-in-up">
                                <p className="text-gray-500 font-bold mb-2">Năng lượng tiêu thụ hàng ngày</p>
                                <div className="text-5xl font-extrabold text-orange-600 mb-8">{tdee} Kcal</div>
                                <div className="space-y-4 text-left">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Để giữ cân</p>
                                        <div className="font-bold text-gray-900 text-lg">{tdee} Kcal/ngày</div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <p className="text-xs text-green-500 font-bold uppercase mb-1">Để giảm cân nhẹ</p>
                                        <div className="font-bold text-gray-900 text-lg">{Math.round(tdee * 0.9)} Kcal/ngày</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-orange-300">
                                <i className="fi flaticon-apple text-6xl mb-4 inline-block opacity-50"></i>
                                <p>Nhập thông tin để xem kết quả</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
