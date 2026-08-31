"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditEmailCampaign() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        subject: 'Khuyến mãi đặc biệt tháng 12',
        fromName: 'Healthcare Platform',
        fromEmail: 'noreply@healthcare.vn',
        recipients: 'all',
        content: 'Nội dung email chiến dịch khuyến mãi...',
        scheduledDate: '2024-12-19',
        scheduledTime: '09:00',
    };

    const fields = [
        { name: 'subject', label: 'Tiêu đề email', type: 'text' as const, required: true },
        { name: 'fromName', label: 'Tên người gửi', type: 'text' as const, required: true },
        { name: 'fromEmail', label: 'Email người gửi', type: 'email' as const, required: true },
        {
            name: 'recipients', label: 'Người nhận', type: 'select' as const, required: true, options: [
                { value: 'all', label: 'Tất cả người dùng' },
                { value: 'patients', label: 'Chỉ bệnh nhân' },
                { value: 'doctors', label: 'Chỉ bác sĩ' },
                { value: 'custom', label: 'Tùy chỉnh' },
            ]
        },
        { name: 'content', label: 'Nội dung email', type: 'textarea' as const, required: true, rows: 10 },
        { name: 'scheduledDate', label: 'Lên lịch gửi', type: 'date' as const },
        { name: 'scheduledTime', label: 'Giờ gửi', type: 'text' as const },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating email campaign:', data);
        alert('Cập nhật chiến dịch email thành công!');
        router.push(`/admin/marketing/emails/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Chiến dịch Email</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
