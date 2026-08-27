"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditVoucher() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        code: 'VOU2024',
        name: 'Voucher Giảm 50k',
        discountType: 'fixed',
        discountValue: 50000,
        minOrderValue: 200000,
        maxUses: 500,
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        description: 'Giảm 50k cho đơn hàng từ 200k',
    };

    const fields = [
        { name: 'code', label: 'Mã voucher', type: 'text' as const, required: true },
        { name: 'name', label: 'Tên voucher', type: 'text' as const, required: true },
        {
            name: 'discountType', label: 'Loại giảm giá', type: 'select' as const, required: true, options: [
                { value: 'percentage', label: 'Phần trăm (%)' },
                { value: 'fixed', label: 'Số tiền cố định' },
                { value: 'freeship', label: 'Miễn phí vận chuyển' },
            ]
        },
        { name: 'discountValue', label: 'Giá trị giảm', type: 'number' as const, required: true },
        { name: 'minOrderValue', label: 'Giá trị đơn tối thiểu', type: 'number' as const },
        { name: 'maxUses', label: 'Số lần sử dụng tối đa', type: 'number' as const, required: true },
        { name: 'startDate', label: 'Ngày bắt đầu', type: 'date' as const, required: true },
        { name: 'endDate', label: 'Ngày kết thúc', type: 'date' as const, required: true },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, rows: 3 },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating voucher:', data);
        alert('Cập nhật voucher thành công!');
        router.push(`/admin/marketing/vouchers/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa Voucher</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Cập nhật" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
