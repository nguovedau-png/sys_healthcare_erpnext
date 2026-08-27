"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function SecurityAuditLogsPage() {
    const [filter, setFilter] = useState('all');

    const logs = [
        { id: 1, time: '20/12/2024 14:30', user: 'admin@hospital.com', action: 'Login', ip: '192.168.1.100', status: 'success', risk: 'low' },
        { id: 2, time: '20/12/2024 14:25', user: 'doctor@hospital.com', action: 'View Patient Record', ip: '192.168.1.101', status: 'success', risk: 'low' },
        { id: 3, time: '20/12/2024 14:20', user: 'unknown@example.com', action: 'Failed Login (5 attempts)', ip: '45.123.45.67', status: 'failed', risk: 'high' },
        { id: 4, time: '20/12/2024 14:15', user: 'admin@hospital.com', action: 'Delete User', ip: '192.168.1.100', status: 'success', risk: 'medium' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
                    <p className="text-gray-500 text-sm mt-1">Theo dõi hoạt động hệ thống</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50">
                        Xuất logs
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700">
                        Xóa logs cũ
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Tổng sự kiện', value: '125,432', icon: 'flaticon-list', color: 'bg-blue-500' },
                    { label: 'Hôm nay', value: '1,234', icon: 'flaticon-calendar', color: 'bg-green-500' },
                    { label: 'Cảnh báo', value: '45', icon: 'flaticon-warning', color: 'bg-orange-500' },
                    { label: 'Nguy hiểm', value: '8', icon: 'flaticon-alert', color: 'bg-red-500' },
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
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex gap-4">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
                        <option value="all">Tất cả</option>
                        <option value="login">Login</option>
                        <option value="data">Data Access</option>
                        <option value="admin">Admin Actions</option>
                        <option value="failed">Failed Attempts</option>
                    </select>
                    <input type="date" className="px-4 py-2 border border-gray-200 rounded-xl" />
                    <input type="text" placeholder="Tìm kiếm..." className="flex-1 px-4 py-2 border border-gray-200 rounded-xl" />
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Thời gian</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Người dùng</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Hành động</th>
                            <th className="px-6 py-4 font-bold text-gray-700">IP Address</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Mức độ</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-600 text-xs">{log.time}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{log.user}</td>
                                <td className="px-6 py-4 text-gray-600">{log.action}</td>
                                <td className="px-6 py-4 text-gray-600 font-mono text-xs">{log.ip}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {log.status === 'success' ? 'Thành công' : 'Thất bại'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.risk === 'low' ? 'bg-blue-100 text-blue-700' :
                                        log.risk === 'medium' ? 'bg-orange-100 text-orange-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                        {log.risk === 'low' ? 'Thấp' : log.risk === 'medium' ? 'Trung bình' : 'Cao'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/security/audit-logs/${log.id}`}>
                                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200 transition-colors">
                                            Xem
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Security Alerts */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-red-900 mb-4">⚠️ Cảnh báo Bảo mật</h3>
                <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4">
                        <p className="font-bold text-red-900 mb-1">5 lần đăng nhập thất bại từ IP: 45.123.45.67</p>
                        <p className="text-sm text-gray-600">20/12/2024 14:20 - Có thể là tấn công brute force</p>
                        <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold">
                            Chặn IP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
