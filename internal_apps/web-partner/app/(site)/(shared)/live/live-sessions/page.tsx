"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const SESSIONS = [
    { id: 1, title: 'Tư vấn Dinh dưỡng cho Mẹ bầu', doctor: 'BS. Nguyễn A', time: '20:00 - 21:00', date: '20/12/2024', viewers: 1250, status: 'upcoming' },
    { id: 2, title: 'Phòng ngừa Bệnh tim mạch', doctor: 'TS.BS Trần B', time: '19:00 - 20:30', date: '22/12/2024', viewers: 850, status: 'upcoming' },
];

export default function LiveSessionsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Live Stream Bác sĩ</h1>
                <p className="text-gray-500 mb-12">Tư vấn trực tiếp - Tương tác real-time</p>

                <div className="space-y-6">
                    {SESSIONS.map(session => (
                        <div key={session.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex gap-8 hover:shadow-lg transition-all">
                            <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <i className="fi flaticon-live-streaming text-5xl text-white"></i>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{session.title}</h3>
                                        <p className="text-gray-500">Với {session.doctor}</p>
                                    </div>
                                    <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                        🔴 Sắp diễn ra
                                    </span>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                                    <span className="flex items-center gap-2">
                                        <i className="fi flaticon-calendar"></i> {session.date}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <i className="fi flaticon-clock"></i> {session.time}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <i className="fi flaticon-eye"></i> {session.viewers} đã đăng ký
                                    </span>
                                </div>
                                <button className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700">
                                    Đăng ký tham gia
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
