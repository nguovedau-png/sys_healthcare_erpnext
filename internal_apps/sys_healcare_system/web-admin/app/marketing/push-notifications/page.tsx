"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import marketingService, { PushNotification } from '@/services/marketing.service';

export default function PushNotificationsManagement() {
    const [notifications, setNotifications] = useState<PushNotification[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const data = await marketingService.getPushNotifications();
            setNotifications(data);
        } catch (error) {
            console.error('Failed to fetch push notifications', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const totalPages = Math.ceil(notifications.length / itemsPerPage);
    const paginatedData = notifications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'title', label: 'Tiêu đề', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'message', label: 'Nội dung' },
        { key: 'recipients', label: 'Người nhận' },
        { key: 'delivered', label: 'Đã gửi' },
        { key: 'clicked', label: 'Đã click' },
        { key: 'sentTime', label: 'Thời gian' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: PushNotification) => (
        <div className="flex gap-2">
            <button className="text-blue-600 hover:text-blue-800" title="Xem"><i className="fi flaticon-eye"></i></button>
            <button
                onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
                        await marketingService.deletePushNotification(row.id);
                        fetchNotifications();
                    }
                }}
                className="text-red-600 hover:text-red-800"
                title="Xóa"
            >
                <i className="fi flaticon-delete"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Push Notification</h1>
                <button
                    onClick={async () => {
                        await marketingService.createPushNotification({
                            title: 'Thông báo mới ' + new Date().toLocaleTimeString(),
                            message: 'Nội dung thông báo mới được tạo',
                            recipients: 500,
                            sentTime: new Date().toLocaleString('vi-VN'),
                            delivered: 0,
                            clicked: 0,
                            status: 'draft'
                        });
                        fetchNotifications();
                    }}
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl"
                >
                    + Gửi thông báo
                </button>
            </div>
            <DataTable
                columns={columns}
                data={paginatedData}
                loading={loading}
                actions={actions}
                pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }}
            />
        </div>
    );
}
