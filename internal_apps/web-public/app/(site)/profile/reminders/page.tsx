"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const REMINDERS = [
    { id: 1, title: 'Uống Metformin 500mg', time: '08:00 & 20:00', type: 'medicine', active: true },
    { id: 2, title: 'Tái khám Tim mạch', time: '20/01/2025', type: 'appointment', active: true },
    { id: 3, title: 'Tiêm vắc-xin Cúm', time: '15/02/2025', type: 'vaccine', active: false },
];

export default function RemindersPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Nhắc nhở Thông minh</h1>
                    <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
                        + Tạo nhắc nhở
                    </button>
                </div>

                <div className="space-y-4">
                    {REMINDERS.map(reminder => (
                        <div key={reminder.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${reminder.type === 'medicine' ? 'bg-green-100' : reminder.type === 'appointment' ? 'bg-blue-100' : 'bg-orange-100'
                                }`}>
                                <i className={`fi ${reminder.type === 'medicine' ? 'flaticon-pill' : reminder.type === 'appointment' ? 'flaticon-calendar' : 'flaticon-injection'
                                    } text-2xl ${reminder.type === 'medicine' ? 'text-green-600' : reminder.type === 'appointment' ? 'text-blue-600' : 'text-orange-600'
                                    }`}></i>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 mb-1">{reminder.title}</h3>
                                <p className="text-sm text-gray-500">{reminder.time}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked={reminder.active} />
                                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
