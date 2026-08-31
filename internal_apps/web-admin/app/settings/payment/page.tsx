"use client";
import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';

export default function PaymentSettings() {
    const fields = [
        {
            name: 'paymentGateway', label: 'Cổng thanh toán', type: 'select' as const, required: true, options: [
                { value: 'vnpay', label: 'VNPay' },
                { value: 'momo', label: 'MoMo' },
                { value: 'zalopay', label: 'ZaloPay' },
                { value: 'paypal', label: 'PayPal' },
            ]
        },
        { name: 'merchantId', label: 'Merchant ID', type: 'text' as const, required: true },
        { name: 'merchantKey', label: 'Merchant Key', type: 'text' as const, required: true },
        { name: 'apiKey', label: 'API Key', type: 'text' as const, required: true },
        { name: 'secretKey', label: 'Secret Key', type: 'text' as const, required: true },
        {
            name: 'currency', label: 'Đơn vị tiền tệ', type: 'select' as const, required: true, options: [
                { value: 'VND', label: 'VND - Việt Nam Đồng' },
                { value: 'USD', label: 'USD - US Dollar' },
            ]
        },
        { name: 'transactionFee', label: 'Phí giao dịch (%)', type: 'number' as const, required: true },
        { name: 'minAmount', label: 'Số tiền tối thiểu', type: 'number' as const, required: true },
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating payment settings:', data);
        alert('Cập nhật cài đặt thanh toán thành công!');
    };

    const initialValues = {
        paymentGateway: 'vnpay',
        merchantId: '',
        merchantKey: '',
        apiKey: '',
        secretKey: '',
        currency: 'VND',
        transactionFee: 2.5,
        minAmount: 10000,
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Cài đặt Thanh toán</h1>
                <p className="text-gray-500 mt-1">Cấu hình cổng thanh toán và phí giao dịch</p>
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
