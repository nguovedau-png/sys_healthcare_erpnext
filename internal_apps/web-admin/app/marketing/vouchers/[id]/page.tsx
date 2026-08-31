"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function VoucherDetail() {
    const params = useParams<{ id: string }>();
    const voucher = {
        id: params.id,
        code: 'VOU2024',
        name: 'Voucher Giảm 50k',
        discountType: 'Số tiền cố định',
        discountValue: '50.000đ',
        minOrderValue: '200.000đ',
        used: 145,
        maxUses: 500,
        startDate: '01/12/2024',
        endDate: '31/12/2024',
        status: 'active',
        description: 'Giảm 50k cho đơn hàng từ 200k',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{voucher.name}</h1>
                    <p className="text-gray-500 mt-1">Mã: <span className="font-mono font-bold">{voucher.code}</span></p>
                </div>
                <div className="flex gap-3">
                    <Link href={`/admin/marketing/vouchers/${voucher.id}/edit`} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Chỉnh sửa</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Giảm giá</p>
                    <h3 className="text-3xl font-bold text-green-600">{voucher.discountValue}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Đã sử dụng</p>
                    <h3 className="text-3xl font-bold text-gray-900">{voucher.used}/{voucher.maxUses}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Đơn tối thiểu</p>
                    <h3 className="text-xl font-bold text-gray-900">{voucher.minOrderValue}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={voucher.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chi tiết</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Loại giảm giá</p><p className="font-medium text-gray-900">{voucher.discountType}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Thời gian</p><p className="font-medium text-gray-900">{voucher.startDate} - {voucher.endDate}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Mô tả</p><p className="text-gray-700">{voucher.description}</p></div>
                </div>
            </div>
        </div>
    );
}
