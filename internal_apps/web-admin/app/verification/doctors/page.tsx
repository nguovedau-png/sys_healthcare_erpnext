"use client";
import React, { useState } from 'react';

export default function VerificationDoctorsPage() {
    const [filter, setFilter] = useState('pending');

    const verifications = [
        { id: 1, name: 'BS. Nguyễn Văn A', specialty: 'Tim mạch', hospital: 'BV Chợ Rẫy', license: 'BS-12345', status: 'pending', date: '20/12/2024' },
        { id: 2, name: 'BS. Trần Thị B', specialty: 'Nhi khoa', hospital: 'BV Nhi Đồng 1', license: 'BS-23456', status: 'pending', date: '19/12/2024' },
        { id: 3, name: 'BS. Lê Văn C', specialty: 'Da liễu', hospital: 'PK Đa khoa', license: 'BS-34567', status: 'verified', date: '18/12/2024' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Xác minh Bác sĩ</h1>
                    <p className="text-gray-500 text-sm mt-1">Kiểm tra và xác minh chứng chỉ hành nghề</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Chờ xác minh', value: '45', icon: 'flaticon-pending', color: 'bg-orange-500' },
                    { label: 'Đã xác minh', value: '1,234', icon: 'flaticon-checked', color: 'bg-green-500' },
                    { label: 'Từ chối', value: '12', icon: 'flaticon-close', color: 'bg-red-500' },
                    { label: 'Hết hạn', value: '8', icon: 'flaticon-warning', color: 'bg-yellow-500' },
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

            {/* Filters */}
            <div className="flex gap-2">
                {['pending', 'verified', 'rejected', 'expired'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl font-bold transition ${filter === f ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-200'
                            }`}
                    >
                        {f === 'pending' ? 'Chờ xác minh' : f === 'verified' ? 'Đã xác minh' : f === 'rejected' ? 'Từ chối' : 'Hết hạn'}
                    </button>
                ))}
            </div>

            {/* Verification List */}
            <div className="space-y-4">
                {verifications.map((ver) => (
                    <div key={ver.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i className="fi flaticon-doctor text-blue-600 text-2xl"></i>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{ver.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{ver.specialty} • {ver.hospital}</p>
                                    <div className="flex gap-4 text-sm">
                                        <span className="text-gray-600">Số chứng chỉ: <span className="font-bold text-gray-900">{ver.license}</span></span>
                                        <span className="text-gray-600">Ngày nộp: {ver.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${ver.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                        ver.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {ver.status === 'pending' ? 'Chờ xác minh' : ver.status === 'verified' ? 'Đã xác minh' : 'Từ chối'}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-bold">
                                Xem tài liệu
                            </button>
                            {ver.status === 'pending' && (
                                <>
                                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-bold">
                                        Phê duyệt
                                    </button>
                                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-bold">
                                        Từ chối
                                    </button>
                                </>
                            )}
                            {ver.status === 'verified' && (
                                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl text-sm font-bold">
                                    Cấp badge
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
