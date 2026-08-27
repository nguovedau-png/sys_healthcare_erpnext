"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const EQUIPMENT = [
    { id: 1, name: 'Xe lăn tiêu chuẩn', price: '50.000đ/ngày', deposit: '500.000đ', image: '/img/wheelchair.jpg' },
    { id: 2, name: 'Máy đo huyết áp điện tử', price: '30.000đ/ngày', deposit: '300.000đ', image: '/img/bp-monitor.jpg' },
    { id: 3, name: 'Máy tạo oxy', price: '200.000đ/ngày', deposit: '2.000.000đ', image: '/img/oxygen.jpg' },
    { id: 4, name: 'Giường bệnh điều chỉnh', price: '100.000đ/ngày', deposit: '1.000.000đ', image: '/img/hospital-bed.jpg' },
];

export default function MedicalEquipmentPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Thuê Thiết bị Y tế</h1>
                <p className="text-gray-500 mb-12">Thiết bị chất lượng cao, giao tận nơi, hướng dẫn sử dụng</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {EQUIPMENT.map(item => (
                        <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                            <div className="h-48 bg-gray-100 flex items-center justify-center">
                                <i className="fi flaticon-medical-equipment text-6xl text-gray-300"></i>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
                                <div className="text-2xl font-bold text-primary mb-1">{item.price}</div>
                                <div className="text-xs text-gray-400 mb-4">Đặt cọc: {item.deposit}</div>
                                <button className="w-full bg-primary text-white font-bold py-2.5 rounded-xl hover:bg-primary-dark transition-colors">
                                    Thuê ngay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
