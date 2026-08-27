"use client";
import React, { useState } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import contentService from '@/services/content.service';

export default function CreatePage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const fields = [
        { name: 'title', label: 'Tiêu đề', type: 'text' as const, required: true },
        { name: 'slug', label: 'Slug (URL)', type: 'text' as const, required: true, placeholder: 'about-us' },
        { name: 'content', label: 'Nội dung', type: 'textarea' as const, required: true, rows: 10 },
        {
            name: 'isActive', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'true', label: 'Đã xuất bản' },
                { value: 'false', label: 'Nháp' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            await contentService.createStaticPage({
                ...data,
                isActive: data.isActive === 'true'
            });
            alert('Tạo trang thành công!');
            router.push('/content/pages');
        } catch (error) {
            alert('Tạo trang thất bại');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Trang tĩnh</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel={submitting ? "Đang xử lý..." : "Tạo trang"} columns={1} />
            </div>
        </div>
    );
}
