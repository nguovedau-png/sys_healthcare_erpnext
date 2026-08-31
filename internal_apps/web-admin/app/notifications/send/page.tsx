"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SendNotificationPage() {
    const router = useRouter();
    const [notifType, setNotifType] = useState('students_by_course');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [message, setMessage] = useState('');
    const [scheduleType, setScheduleType] = useState('now');

    const notificationTypes = [
        { id: 'students_by_course', name: '1. Danh sách học viên theo khóa', needsCourse: true },
        { id: 'banner_link', name: '2. Banner link theo khóa', needsCourse: true, needsBanner: true },
        { id: 'incomplete_lessons', name: '3. Nhắc nhở chưa hoàn thành', needsCourse: true },
        { id: 'regional_eval', name: '4. Đánh giá theo địa bàn', needsRegion: true },
        { id: 'top_10_quiz', name: '5. Top 10 làm bài nhanh', needsCourse: true, auto: true },
        { id: 'first_completer', name: '6. Người đầu tiên hoàn thành', needsCourse: true, auto: true },
        { id: 'enrollment_stats', name: '7. Thống kê khóa học', needsCourse: true },
    ];

    const courses = [
        { id: 'cme2024', name: 'CME 2024', students: 450 },
        { id: 'cpe2024', name: 'CPE 2024', students: 320 },
        { id: 'advanced2024', name: 'Nâng cao 2024', students: 180 },
    ];

    const regions = [
        'TP.HCM', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng'
    ];

    const currentType = notificationTypes.find(t => t.id === notifType);
    const selectedCourseData = courses.find(c => c.id === selectedCourse);

    const handleSend = () => {
        alert(`Đã gửi notification đến ${selectedCourseData?.students || 0} người!`);
        router.push('/admin/notifications');
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Gửi Push Notification</h1>
                <p className="text-gray-500 text-sm mt-1">Tạo và gửi thông báo đến học viên</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Type Selection */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">1. Chọn Loại Notification</h2>
                        <select
                            value={notifType}
                            onChange={(e) => setNotifType(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {notificationTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name} {type.auto ? '(Tự động)' : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Recipient Filters */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">2. Chọn Người nhận</h2>
                        <div className="space-y-4">
                            {currentType?.needsCourse && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Khóa học</label>
                                    <select
                                        value={selectedCourse}
                                        onChange={(e) => setSelectedCourse(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                                    >
                                        <option value="">-- Chọn khóa học --</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>
                                                {course.name} ({course.students} học viên)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {currentType?.needsRegion && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Địa bàn</label>
                                    <select
                                        value={selectedRegion}
                                        onChange={(e) => setSelectedRegion(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white outline-none"
                                    >
                                        <option value="">-- Chọn địa bàn --</option>
                                        {regions.map((region) => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {currentType?.needsBanner && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Banner Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Message */}
                    {!currentType?.auto && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">3. Nội dung Thông báo</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề</label>
                                    <input
                                        type="text"
                                        placeholder="Nhập tiêu đề notification..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung</label>
                                    <textarea
                                        rows={6}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Nhập nội dung notification..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:ring-2 focus:ring-primary/20"
                                    ></textarea>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Variables: {'{'}name{'}'}, {'{'}course{'}'}, {'{'}progress{'}'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Schedule */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">4. Lên lịch Gửi</h2>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="schedule"
                                    value="now"
                                    checked={scheduleType === 'now'}
                                    onChange={(e) => setScheduleType(e.target.value)}
                                    className="w-4 h-4"
                                />
                                <span className="text-gray-700">Gửi ngay</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="schedule"
                                    value="later"
                                    checked={scheduleType === 'later'}
                                    onChange={(e) => setScheduleType(e.target.value)}
                                    className="w-4 h-4"
                                />
                                <span className="text-gray-700">Lên lịch</span>
                            </label>
                            {scheduleType === 'later' && (
                                <input
                                    type="datetime-local"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none ml-7"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Preview</h2>
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="fi flaticon-bell text-white"></i>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 mb-1">Thông báo mới</p>
                                    <p className="text-sm text-gray-700">{message || 'Nội dung notification sẽ hiển thị ở đây...'}</p>
                                    <p className="text-xs text-gray-500 mt-2">Vừa xong</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Loại:</span>
                                <span className="font-bold text-gray-900">{currentType?.name}</span>
                            </div>
                            {selectedCourseData && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Khóa học:</span>
                                    <span className="font-bold text-gray-900">{selectedCourseData.name}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Người nhận:</span>
                                <span className="font-bold text-primary">{selectedCourseData?.students || 0} người</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => router.back()}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSend}
                                className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition"
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
