"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useParams } from 'next/navigation';

export default function PushNotificationDetail() {
    const params = useParams<{ id: string }>();
    const notification = {
        id: params.id,
        title: 'Khuyến mãi cuối năm',
        message: 'Giảm giá 30% tất cả dịch vụ trong tháng 12. Đặt lịch ngay!',
        recipients: 8540,
        delivered: 8320,
        clicked: 1250,
        sent: '19/12/2024 10:00',
        link: '/promotions/year-end',
        status: 'published',
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{notification.title}</h1>
                <p className="text-gray-500 mt-1">Gửi lúc: {notification.sent}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Người nhận</p>
                    <h3 className="text-3xl font-bold text-gray-900">{notification.recipients}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Đã gửi</p>
                    <h3 className="text-3xl font-bold text-blue-600">{notification.delivered}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Đã click</p>
                    <h3 className="text-3xl font-bold text-green-600">{notification.clicked}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">CTR</p>
                    <h3 className="text-3xl font-bold text-purple-600">{((notification.clicked / notification.delivered) * 100).toFixed(1)}%</h3>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Nội dung thông báo</h2>
                <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <i className="fi flaticon-bell text-white text-2xl"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2">{notification.title}</h3>
                            <p className="text-gray-700">{notification.message}</p>
                            {notification.link && (
                                <p className="text-primary text-sm mt-2">🔗 {notification.link}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin gửi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Trạng thái</p><StatusBadge status={notification.status as any} /></div>
                    <div><p className="text-sm text-gray-500 mb-1">Tỷ lệ thành công</p><p className="font-medium text-gray-900">{((notification.delivered / notification.recipients) * 100).toFixed(1)}%</p></div>
                </div>
            </div>
        </div>
    );
}
