"use client";

import React, { useState, useEffect } from 'react';
import reportService, { UserAnalytics } from '@/services/report.service';

export default function UserAnalyticsPage() {
    const [timeRange, setTimeRange] = useState('month');
    const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await reportService.getUsersAnalytics();
                setAnalytics(data);
            } catch (error) {
                console.error('Failed to fetch analytics', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [timeRange]);

    const osByMonth = [
        { month: 'T1', ios: 120, android: 180, web: 50 },
        { month: 'T2', ios: 140, android: 200, web: 60 },
        { month: 'T3', ios: 160, android: 220, web: 70 },
    ];

    const installByHour = [
        { hour: '6-9h', count: 45 },
        { hour: '9-12h', count: 120 },
        { hour: '12-15h', count: 85 },
        { hour: '15-18h', count: 150 },
        { hour: '18-21h', count: 200 },
        { hour: '21-24h', count: 95 },
    ];

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;
    if (!analytics) return <div className="p-8 text-center text-red-500">Không có dữ liệu phân tích.</div>;

    const byProvince = [
        { name: 'TP.HCM', count: Math.round(analytics.totalUsers * 0.36), percent: 36 },
        { name: 'Hà Nội', count: Math.round(analytics.totalUsers * 0.26), percent: 26 },
        { name: 'Đà Nẵng', count: Math.round(analytics.totalUsers * 0.15), percent: 15 },
        { name: 'Cần Thơ', count: Math.round(analytics.totalUsers * 0.10), percent: 10 },
        { name: 'Khác', count: Math.round(analytics.totalUsers * 0.13), percent: 13 },
    ];

    const byEducation = [
        { level: 'Đại học', count: Math.round(analytics.totalUsers * 0.47), percent: 47, color: 'bg-blue-500' },
        { level: 'Trung cấp', count: Math.round(analytics.totalUsers * 0.31), percent: 31, color: 'bg-green-500' },
        { level: 'Sơ cấp', count: Math.round(analytics.totalUsers * 0.14), percent: 14, color: 'bg-yellow-500' },
        { level: 'Khác', count: Math.round(analytics.totalUsers * 0.08), percent: 8, color: 'bg-gray-400' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Phân tích Người dùng</h1>
                    <p className="text-gray-500 text-sm mt-1">Thống kê chi tiết về người dùng và hoạt động</p>
                </div>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-xl bg-white outline-none"
                >
                    <option value="week">7 ngày qua</option>
                    <option value="month">30 ngày qua</option>
                    <option value="quarter">3 tháng qua</option>
                </select>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Tổng người dùng</p>
                    <p className="text-3xl font-bold text-gray-900">{analytics.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Người dùng hoạt động</p>
                    <p className="text-3xl font-bold text-green-600">{analytics.activeUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Tỷ lệ hoạt động</p>
                    <p className="text-3xl font-bold text-blue-600">{analytics.activityRate}%</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Hoạt động &gt; 1 lần</p>
                    <p className="text-3xl font-bold text-purple-600">{analytics.multipleSessionUsers}</p>
                    <p className="text-xs text-gray-400 mt-1">{((analytics.multipleSessionUsers / analytics.totalUsers) * 100).toFixed(1)}% tổng số</p>
                </div>
            </div>

            {/* Installation by OS */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Cài đặt theo Hệ điều hành (Theo tháng)</h2>
                <div className="space-y-4">
                    {osByMonth.map((month) => (
                        <div key={month.month}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-gray-700">{month.month}</span>
                                <span className="text-gray-500">Tổng: {month.ios + month.android + month.web}</span>
                            </div>
                            <div className="flex gap-1 h-8">
                                <div className="bg-blue-500 rounded-l flex items-center justify-center text-white text-xs font-bold" style={{ width: `${(month.ios / (month.ios + month.android + month.web)) * 100}%` }}>
                                    iOS {month.ios}
                                </div>
                                <div className="bg-green-500 flex items-center justify-center text-white text-xs font-bold" style={{ width: `${(month.android / (month.ios + month.android + month.web)) * 100}%` }}>
                                    Android {month.android}
                                </div>
                                <div className="bg-purple-500 rounded-r flex items-center justify-center text-white text-xs font-bold" style={{ width: `${(month.web / (month.ios + month.android + month.web)) * 100}%` }}>
                                    Web {month.web}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Geographic Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Phân bố Địa lý</h2>
                    <div className="space-y-3">
                        {byProvince.map((province) => (
                            <div key={province.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-900">{province.name}</span>
                                    <span className="text-gray-600">{province.count} ({province.percent}%)</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${province.percent}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Level */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Trình độ Học vấn</h2>
                    <div className="space-y-3">
                        {byEducation.map((edu) => (
                            <div key={edu.level} className="flex items-center gap-4">
                                <div className={`w-4 h-4 rounded ${edu.color}`}></div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-900">{edu.level}</span>
                                        <span className="text-gray-600">{edu.count} ({edu.percent}%)</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${edu.color}`} style={{ width: `${edu.percent}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
