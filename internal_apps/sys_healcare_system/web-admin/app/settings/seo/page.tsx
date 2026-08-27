"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';

export default function SEOSettings() {
    const fields = [
        { name: 'siteTitle', label: 'Tiêu đề website', type: 'text' as const, required: true },
        { name: 'siteDescription', label: 'Mô tả website', type: 'textarea' as const, required: true, rows: 3 },
        { name: 'siteKeywords', label: 'Từ khóa (phân cách bằng dấu phẩy)', type: 'textarea' as const, rows: 2 },
        { name: 'ogImage', label: 'Ảnh OG (Social Share)', type: 'text' as const, placeholder: '/img/og-image.jpg' },
        { name: 'googleAnalyticsId', label: 'Google Analytics ID', type: 'text' as const, placeholder: 'G-XXXXXXXXXX' },
        { name: 'googleSearchConsole', label: 'Google Search Console Code', type: 'text' as const },
        { name: 'facebookPixelId', label: 'Facebook Pixel ID', type: 'text' as const },
        { name: 'robotsTxt', label: 'Robots.txt', type: 'textarea' as const, rows: 5 },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating SEO settings:', data);
        alert('Cập nhật cài đặt SEO thành công!');
    };

    const initialValues = {
        siteTitle: 'Healthcare Platform - Nền tảng chăm sóc sức khỏe',
        siteDescription: 'Nền tảng chăm sóc sức khỏe toàn diện với dịch vụ đặt khám, mua thuốc, xét nghiệm online',
        siteKeywords: 'sức khỏe, đặt khám, mua thuốc, xét nghiệm, bác sĩ',
        ogImage: '/img/og-image.jpg',
        googleAnalyticsId: '',
        googleSearchConsole: '',
        facebookPixelId: '',
        robotsTxt: 'User-agent: *\nAllow: /',
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Cài đặt SEO</h1>
                <p className="text-gray-500 mt-1">Tối ưu hóa công cụ tìm kiếm và mạng xã hội</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu cài đặt"
                    initialValues={initialValues}
                    columns={1}
                />
            </div>
        </div>
    );
}
