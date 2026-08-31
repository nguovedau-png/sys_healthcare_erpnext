"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';

export default function CreateVoucher() {
    const router = useRouter();
    const fields = [
        { name: 'code', label: 'Mã voucher', type: 'text' as const, required: true, placeholder: 'VOU2024' },
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
        console.log('Creating voucher:', data);
        alert('Tạo voucher thành công!');
        router.push('/admin/marketing/vouchers');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Tạo Voucher</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Tạo voucher" columns={2} />
            </div>
        </div>
    );
}
