"use client";

import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function GeneralSettings() {
    const router = useRouter();

    const initialValues = {
        siteName: 'Healthcare Platform',
        siteDescription: 'Nền tảng chăm sóc sức khỏe toàn diện',
        contactEmail: 'contact@healthcare.vn',
        contactPhone: '1900-xxxx',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        timezone: 'Asia/Ho_Chi_Minh',
        language: 'vi',
    };

    const fields = [
        { name: 'siteName', label: 'Tên website', type: 'text' as const, required: true },
        { name: 'siteDescription', label: 'Mô tả', type: 'textarea' as const, required: true, rows: 3 },
        { name: 'contactEmail', label: 'Email liên hệ', type: 'email' as const, required: true },
        { name: 'contactPhone', label: 'Số điện thoại', type: 'text' as const, required: true },
        { name: 'address', label: 'Địa chỉ', type: 'textarea' as const, required: true, rows: 2 },
        {
            name: 'timezone', label: 'Múi giờ', type: 'select' as const, required: true, options: [
                { value: 'Asia/Ho_Chi_Minh', label: 'Việt Nam (GMT+7)' },
                { value: 'Asia/Bangkok', label: 'Bangkok (GMT+7)' },
            ]
        },
        {
            name: 'language', label: 'Ngôn ngữ', type: 'select' as const, required: true, options: [
                { value: 'vi', label: 'Tiếng Việt' },
                { value: 'en', label: 'English' },
            ]
        },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating settings:', data);
        alert('Cập nhật cài đặt thành công!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Cài đặt Chung</h1>
                <p className="text-gray-500 mt-1">Cấu hình thông tin cơ bản của hệ thống</p>
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
