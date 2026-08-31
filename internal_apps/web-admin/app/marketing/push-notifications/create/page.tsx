"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreatePushNotification() {
    const router = useRouter();
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
        { name: 'link', label: 'Liên kết (tùy chọn)', type: 'text' as const, placeholder: '/page/promotions' },
        { name: 'scheduledDate', label: 'Lên lịch gửi', type: 'date' as const },
        { name: 'scheduledTime', label: 'Giờ gửi', type: 'text' as const, placeholder: '09:00' },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating push notification:', data);
        alert('Tạo thông báo thành công!');
        router.push('/admin/marketing/push-notifications');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Push Notification</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Gửi thông báo" columns={2} />
            </div>
        </div>
    );
}
