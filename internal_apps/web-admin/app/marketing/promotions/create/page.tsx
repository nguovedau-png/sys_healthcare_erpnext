"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreatePromotion() {
    const router = useRouter();
    const fields = [
        { name: 'code', label: 'Mã khuyến mãi', type: 'text' as const, required: true, placeholder: 'PROMO2024' },
        { name: 'name', label: 'Tên chương trình', type: 'text' as const, required: true },
        { name: 'discount', label: 'Giảm giá (%)', type: 'number' as const, required: true },
        { name: 'startDate', label: 'Ngày bắt đầu', type: 'date' as const, required: true },
        { name: 'endDate', label: 'Ngày kết thúc', type: 'date' as const, required: true },
        { name: 'maxUses', label: 'Số lần sử dụng tối đa', type: 'number' as const },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, rows: 4 },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating promotion:', data);
        alert('Tạo khuyến mãi thành công!');
        router.push('/admin/marketing/promotions');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Khuyến mãi</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Tạo khuyến mãi" columns={2} />
            </div>
        </div>
    );
}
