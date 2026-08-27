"use client";
import React, { useState } from 'react';

export default function NotificationHistoryPage() {
    const [filterType, setFilterType] = useState('all');
    const [filterCourse, setFilterCourse] = useState('all');

    const notifications = [
        {
            id: 1,
            type: 'students_by_course',
            title: 'Thông báo khóa CME 2024',
            course: 'CME 2024',
            sent: 450,
            delivered: 445,
            opened: 320,
            clicked: 180,
            date: '2024-12-19 14:30',
        },
        {
            id: 2,
            type: 'incomplete_lessons',
            title: 'Nhắc nhở hoàn thành bài học',
            course: 'CPE 2024',
            sent: 120,
            delivered: 118,
            opened: 95,
            clicked: 68,
            date: '2024-12-19 10:00',
        },
        {
            id: 3,
            type: 'top_10_quiz',
            title: 'Chúc mừng Top 10 nhanh nhất',
            course: 'CME 2024',
            sent: 10,
            delivered: 10,
            opened: 10,
            clicked: 8,
            date: '2024-12-18 16:45',
        },
        {
            id: 4,
            type: 'first_completer',
            title: 'Chúc mừng người đầu tiên hoàn thành',
            course: 'CPE 2024',
            sent: 1,
            delivered: 1,
            opened: 1,
            clicked: 1,
            date: '2024-12-18 09:15',
        },
        {
            id: 5,
            type: 'banner_link',
            title: 'Banner khuyến mãi khóa mới',
            course: 'Advanced 2024',
            sent: 850,
            delivered: 820,
            opened: 580,
            clicked: 340,
            date: '2024-12-17 15:00',
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Lịch sử Push Notification</h1>
                <p className="text-gray-500 text-sm mt-1">Theo dõi hiệu quả của các notification đã gửi</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tổng gửi</p>
                    <p className="text-3xl font-bold text-gray-900">1,431</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã nhận</p>
                    <p className="text-3xl font-bold text-green-600">1,394</p>
                    <p className="text-xs text-gray-400 mt-1">97.4%</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã mở</p>
                    <p className="text-3xl font-bold text-blue-600">1,006</p>
                    <p className="text-xs text-gray-400 mt-1">72.2%</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã click</p>
                    <p className="text-3xl font-bold text-purple-600">597</p>
                    <p className="text-xs text-gray-400 mt-1">59.3%</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tỷ lệ CTR</p>
                    <p className="text-3xl font-bold text-orange-600">41.7%</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Loại notification</label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                        >
                            <option value="all">Tất cả</option>
                            <option value="students_by_course">Danh sách học viên</option>
                            <option value="banner_link">Banner link</option>
                            <option value="incomplete_lessons">Nhắc nhở</option>
                            <option value="top_10_quiz">Top 10 quiz</option>
                            <option value="first_completer">Người đầu tiên</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Khóa học</label>
                        <select
                            value={filterCourse}
                            onChange={(e) => setFilterCourse(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                        >
                            <option value="all">Tất cả</option>
                            <option value="cme2024">CME 2024</option>
                            <option value="cpe2024">CPE 2024</option>
                            <option value="advanced2024">Advanced 2024</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Thời gian</label>
                        <input
                            type="date"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* History Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Tiêu đề</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Khóa học</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Gửi</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Nhận</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Mở</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Click</th>
                                <th className="px-6 py-4 font-bold text-gray-700">CTR</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Thời gian</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {notifications.map((notif) => (
                                <tr key={notif.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{notif.title}</p>
                                        <p className="text-xs text-gray-500">{notif.type}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{notif.course}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">{notif.sent}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-green-600 font-bold">{notif.delivered}</span>
                                        <span className="text-xs text-gray-500 ml-1">
                                            ({((notif.delivered / notif.sent) * 100).toFixed(1)}%)
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-blue-600 font-bold">{notif.opened}</span>
                                        <span className="text-xs text-gray-500 ml-1">
                                            ({((notif.opened / notif.delivered) * 100).toFixed(1)}%)
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-purple-600 font-bold">{notif.clicked}</span>
                                        <span className="text-xs text-gray-500 ml-1">
                                            ({((notif.clicked / notif.opened) * 100).toFixed(1)}%)
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-orange-600">
                                            {((notif.clicked / notif.sent) * 100).toFixed(1)}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-xs">{notif.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
