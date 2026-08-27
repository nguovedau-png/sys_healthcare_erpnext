"use client";

import React, { useState, useEffect } from 'react';
import reportService, { EducationKPI } from '@/services/report.service';

export default function CourseKPIPage() {
    const [kpi, setKpi] = useState<EducationKPI | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKPI = async () => {
            try {
                const data = await reportService.getKPI();
                setKpi(data);
            } catch (error) {
                console.error('Failed to fetch KPI', error);
            } finally {
                setLoading(false);
            }
        };
        fetchKPI();
    }, []);

    const peakUsageTimes = [
        { day: 'T2', morning: 120, afternoon: 180, evening: 250 },
        { day: 'T3', morning: 140, afternoon: 200, evening: 280 },
        { day: 'T4', morning: 130, afternoon: 190, evening: 260 },
        { day: 'T5', morning: 150, afternoon: 210, evening: 290 },
        { day: 'T6', morning: 160, afternoon: 220, evening: 300 },
        { day: 'T7', morning: 90, afternoon: 140, evening: 200 },
        { day: 'CN', morning: 80, afternoon: 120, evening: 180 },
    ];

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;
    if (!kpi) return <div className="p-8 text-center text-red-500">Không có dữ liệu KPI.</div>;

    const learnerHierarchy = [
        { level: 'RSM (Level 1)', count: Math.round(kpi.totalEnrolled * 0.036), color: 'bg-red-500' },
        { level: 'DM (Level 2)', count: Math.round(kpi.totalEnrolled * 0.145), color: 'bg-blue-500' },
        { level: 'REF (Level 3)', count: Math.round(kpi.totalEnrolled * 0.819), color: 'bg-green-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">KPI Khóa học</h1>
                <p className="text-gray-500 text-sm mt-1">Chỉ số hiệu suất chính của chương trình đào tạo</p>
            </div>

            {/* Enrollment Metrics */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Chỉ số Đăng ký</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm mb-2">Đã đăng ký / Dự kiến</p>
                        <p className="text-3xl font-bold text-gray-900">{kpi.totalEnrolled} / {kpi.expectedEnrolled}</p>
                        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${kpi.enrollmentRate}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{kpi.enrollmentRate}% mục tiêu</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm mb-2">Tỷ lệ Bắt đầu học</p>
                        <p className="text-3xl font-bold text-green-600">{kpi.startedRate}%</p>
                        <p className="text-sm text-gray-600 mt-1">{kpi.started}/{kpi.totalEnrolled} học viên</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm mb-2">Tỷ lệ Hoàn thành</p>
                        <p className="text-3xl font-bold text-purple-600">{kpi.completedRate}%</p>
                        <p className="text-sm text-gray-600 mt-1">{kpi.completed}/{kpi.totalEnrolled} học viên</p>
                    </div>
                </div>
            </div>

            {/* Engagement Metrics */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Chỉ số Tương tác</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm mb-2">Tần suất Sử dụng</p>
                        <p className="text-3xl font-bold text-blue-600">{kpi.usageFrequency}x</p>
                        <p className="text-xs text-gray-500 mt-1">Trung bình/tháng/học viên</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm mb-2">Thời gian Học TB</p>
                        <p className="text-3xl font-bold text-green-600">{kpi.avgCourseDuration}</p>
                        <p className="text-xs text-gray-500 mt-1">CPE trung bình</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-sm mb-2">Thông báo Đã gửi</p>
                        <p className="text-3xl font-bold text-yellow-600">{kpi.totalNotifications}</p>
                        <p className="text-xs text-gray-500 mt-1">Tổng số notification</p>
                    </div>
                </div>
            </div>

            {/* Peak Usage Times */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thời gian Cao điểm (Heatmap)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-4 py-3 text-left font-bold text-gray-700">Ngày</th>
                                <th className="px-4 py-3 text-center font-bold text-gray-700">Sáng (6-12h)</th>
                                <th className="px-4 py-3 text-center font-bold text-gray-700">Chiều (12-18h)</th>
                                <th className="px-4 py-3 text-center font-bold text-gray-700">Tối (18-24h)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peakUsageTimes.map((day) => (
                                <tr key={day.day} className="border-b border-gray-100">
                                    <td className="px-4 py-3 font-bold text-gray-900">{day.day}</td>
                                    <td className="px-4 py-3">
                                        <div className={`text-center py-2 rounded ${day.morning > 140 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'} font-bold`}>
                                            {day.morning}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className={`text-center py-2 rounded ${day.afternoon > 200 ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700'} font-bold`}>
                                            {day.afternoon}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className={`text-center py-2 rounded ${day.evening > 270 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'} font-bold`}>
                                            {day.evening}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex gap-4 mt-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-100 rounded"></div>
                        <span className="text-gray-600">Thấp</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-100 rounded"></div>
                        <span className="text-gray-600">Trung bình</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-100 rounded"></div>
                        <span className="text-gray-600">Cao</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-100 rounded"></div>
                        <span className="text-gray-600">Rất cao</span>
                    </div>
                </div>
            </div>

            {/* Learner Hierarchy */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Phân cấp Quản lý Học viên</h2>
                <div className="space-y-4">
                    {learnerHierarchy.map((level) => (
                        <div key={level.level}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-bold text-gray-900">{level.level}</span>
                                <span className="text-gray-600">{level.count} học viên ({((level.count / kpi.totalEnrolled) * 100).toFixed(1)}%)</span>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${level.color}`} style={{ width: `${(level.count / kpi.totalEnrolled) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
