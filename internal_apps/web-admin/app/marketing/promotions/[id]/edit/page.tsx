"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditPromotion() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        code: 'PROMO2024',
        name: 'Khuyến mãi Tết',
        discount: 30,
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        maxUses: 1000,
        description: 'Giảm giá 30% cho tất cả dịch vụ',
    };

    const fields = [
        { name: 'code', label: 'Mã khuyến mãi', type: 'text' as const, required: true },
        { name: 'name', label: 'Tên chương trình', type: 'text' as const, required: true },
        { name: 'discount', label: 'Giảm giá (%)', type: 'number' as const, required: true },
        { name: 'startDate', label: 'Ngày bắt đầu', type: 'date' as const, required: true },
        { name: 'endDate', label: 'Ngày kết thúc', type: 'date' as const, required: true },
        { name: 'maxUses', label: 'Số lần sử dụng tối đa', type: 'number' as const },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, rows: 4 },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating promotion:', data);
        alert('Cập nhật khuyến mãi thành công!');
        router.push(`/admin/marketing/promotions/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Khuyến mãi</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
