"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreateEmailCampaign() {
    const router = useRouter();
    const fields = [
        { name: 'subject', label: 'Tiêu đề email', type: 'text' as const, required: true },
        { name: 'fromName', label: 'Tên người gửi', type: 'text' as const, required: true, placeholder: 'Healthcare Platform' },
        { name: 'fromEmail', label: 'Email người gửi', type: 'email' as const, required: true, placeholder: 'noreply@healthcare.vn' },
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
        { name: 'scheduledTime', label: 'Giờ gửi', type: 'text' as const, placeholder: '09:00' },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating email campaign:', data);
        alert('Tạo chiến dịch email thành công!');
        router.push('/admin/marketing/emails');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Chiến dịch Email</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Tạo chiến dịch" columns={2} />
            </div>
        </div>
    );
}
