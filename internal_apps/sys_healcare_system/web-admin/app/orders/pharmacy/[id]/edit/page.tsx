"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';

export default function EditPharmacyOrder() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const initialValues = {
        customerName: 'Nguyễn Văn A',
        customerPhone: '0901234567',
        shippingAddress: '123 Đường Chen, Q.1',
        status: 'processing',
        paymentStatus: 'unpaid'
    };

    const fields = [
        { name: 'customerName', label: 'Tên khách hàng', type: 'text' as const, required: true },
        { name: 'customerPhone', label: 'Số điện thoại', type: 'text' as const, required: true },
        { name: 'shippingAddress', label: 'Địa chỉ giao hàng', type: 'text' as const, required: true },
        {
            name: 'status', label: 'Trạng thái đơn hàng', type: 'select' as const, required: true, options: [
                { value: 'pending', label: 'Chờ xác nhận' },
                { value: 'processing', label: 'Đang chuẩn bị hàng' },
                { value: 'shipping', label: 'Đang giao hàng' },
                { value: 'completed', label: 'Hoàn thành' },
                { value: 'cancelled', label: 'Đã hủy' }
            ]
        },
        {
            name: 'paymentStatus', label: 'Trạng thái thanh toán', type: 'select' as const, required: true, options: [
                { value: 'unpaid', label: 'Chưa thanh toán' },
                { value: 'paid', label: 'Đã thanh toán' }
            ]
        },
        { name: 'trackingNumber', label: 'Mã vận đơn', type: 'text' as const }
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating pharmacy order:', data);
        alert('Cập nhật đơn hàng thành công!');
        router.push(`/admin/orders/pharmacy/${params.id}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Cập nhật Đơn thuốc</h1>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <FormBuilder fields={fields} onSubmit={handleSubmit} submitLabel="Lưu thay đổi" initialValues={initialValues} columns={2} />
            </div>
        </div>
    );
}
