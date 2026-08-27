"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditPushNotification() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        title: 'Khuyến mãi cuối năm',
        message: 'Giảm giá 30% tất cả dịch vụ trong tháng 12. Đặt lịch ngay!',
        recipients: 'all',
        link: '/promotions/year-end',
        scheduledDate: '2024-12-19',
        scheduledTime: '10:00',
    };

    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'message', label: 'Nội dung', type: 'textarea' as const, required: true, rows: 4 },
        {
            name: 'recipients', label: 'Người nhận', type: 'select' as const, required: true, options: [
                { value: 'all', label: 'Tất cả người dùng' },
                { value: 'patients', label: 'Chỉ bệnh nhân' },
                { value: 'doctors', label: 'Chỉ bác sĩ' },
            ]
        },
        { name: 'link', label: 'Liên kết', type: 'text' as const },
        { name: 'scheduledDate', label: 'Lên lịch gửi', type: 'date' as const },
        { name: 'scheduledTime', label: 'Giờ gửi', type: 'text' as const },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating push notification:', data);
        alert('Cập nhật thông báo thành công!');
        router.push(`/admin/marketing/push-notifications/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Push Notification</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
