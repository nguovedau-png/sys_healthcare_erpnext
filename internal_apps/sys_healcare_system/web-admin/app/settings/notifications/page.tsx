"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';

export default function NotificationsSettings() {
    const fields = [
        {
            name: 'emailNotifications', label: 'Email thông báo', type: 'select' as const, required: true, options: [
                { value: 'all', label: 'Tất cả thông báo' },
                { value: 'important', label: 'Chỉ thông báo quan trọng' },
                { value: 'none', label: 'Tắt' },
            ]
        },
        {
            name: 'smsNotifications', label: 'SMS thông báo', type: 'select' as const, required: true, options: [
                { value: 'all', label: 'Tất cả thông báo' },
                { value: 'important', label: 'Chỉ thông báo quan trọng' },
                { value: 'none', label: 'Tắt' },
            ]
        },
        {
            name: 'pushNotifications', label: 'Push notification', type: 'select' as const, required: true, options: [
                { value: 'enabled', label: 'Bật' },
                { value: 'disabled', label: 'Tắt' },
            ]
        },
        { name: 'emailFrom', label: 'Email gửi đi', type: 'email' as const, required: true, placeholder: 'noreply@healthcare.vn' },
        { name: 'emailFromName', label: 'Tên người gửi', type: 'text' as const, required: true, placeholder: 'Healthcare Platform' },
        { name: 'smsSender', label: 'Tên người gửi SMS', type: 'text' as const, placeholder: 'Healthcare' },
        { name: 'smsApiKey', label: 'SMS API Key', type: 'text' as const },
        { name: 'pushApiKey', label: 'Push Notification API Key', type: 'text' as const },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating notifications settings:', data);
        alert('Cập nhật cài đặt thông báo thành công!');
    };

    const initialValues = {
        emailNotifications: 'all',
        smsNotifications: 'important',
        pushNotifications: 'enabled',
        emailFrom: 'noreply@healthcare.vn',
        emailFromName: 'Healthcare Platform',
        smsSender: 'Healthcare',
        smsApiKey: '',
        pushApiKey: '',
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Cài đặt Thông báo</h1>
                <p className="text-gray-500 mt-1">Cấu hình Email, SMS và Push Notification</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu cài đặt"
                    initialValues={initialValues}
                    columns={2}
                />
            </div>
        </div>
    );
}
