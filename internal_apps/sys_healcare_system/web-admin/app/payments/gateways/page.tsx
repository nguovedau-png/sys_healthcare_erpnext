"use client";
import React, { useState } from 'react';

export default function PaymentGatewaysPage() {
    const gateways = [
        { id: 1, name: 'VNPay', status: 'active', transactions: 1234, revenue: '2,500,000,000', fee: '2.5%', logo: '/img/vnpay.png' },
        { id: 2, name: 'Momo', status: 'active', transactions: 890, revenue: '1,800,000,000', fee: '2.0%', logo: '/img/momo.png' },
        { id: 3, name: 'ZaloPay', status: 'inactive', transactions: 456, revenue: '950,000,000', fee: '2.2%', logo: '/img/zalopay.png' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Cổng Thanh toán</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý và cấu hình cổng thanh toán</p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                    <i className="fi flaticon-add mr-2"></i> Thêm cổng mới
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Tổng giao dịch', value: '2,580', icon: 'flaticon-transaction', color: 'bg-blue-500' },
                    { label: 'Doanh thu', value: '5.25 tỷ', icon: 'flaticon-money', color: 'bg-green-500' },
                    { label: 'Phí trung bình', value: '2.3%', icon: 'flaticon-percent', color: 'bg-orange-500' },
                    { label: 'Cổng hoạt động', value: '2/3', icon: 'flaticon-checked', color: 'bg-purple-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                                <i className={`fi ${stat.icon} text-white`}></i>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Gateways List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gateways.map((gateway) => (
                    <div key={gateway.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-600">{gateway.name.charAt(0)}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${gateway.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                {gateway.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{gateway.name}</h3>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Giao dịch:</span>
                                <span className="font-bold text-gray-900">{gateway.transactions.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Doanh thu:</span>
                                <span className="font-bold text-green-600">{gateway.revenue} ₫</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Phí:</span>
                                <span className="font-bold text-orange-600">{gateway.fee}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold">
                                Cấu hình
                            </button>
                            <button className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-bold">
                                Xem logs
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Configuration */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Cấu hình chung</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phương thức mặc định</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white">
                            <option>VNPay</option>
                            <option>Momo</option>
                            <option>ZaloPay</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Thời gian timeout (giây)</label>
                        <input type="number" defaultValue={300} className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Webhook URL</label>
                        <input type="text" placeholder="https://..." className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Return URL</label>
                        <input type="text" placeholder="https://..." className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
                    </div>
                </div>
                <div className="mt-6 flex gap-3">
                    <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark">
                        Lưu cấu hình
                    </button>
                    <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50">
                        Test kết nối
                    </button>
                </div>
            </div>
        </div>
    );
}
