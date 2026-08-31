"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PromotionDetail() {
    const params = useParams<{ id: string }>();
    const promo = {
        id: params.id,
        code: 'PROMO2024',
        name: 'Khuyến mãi Tết',
        discount: '30%',
        startDate: '01/12/2024',
        endDate: '31/12/2024',
        used: 245,
        maxUses: 1000,
        status: 'active',
        description: 'Giảm giá 30% cho tất cả dịch vụ trong dịp Tết',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{promo.name}</h1>
                    <p className="text-gray-500 mt-1">Mã: <span className="font-mono font-bold">{promo.code}</span></p>
                </div>
                <div className="flex gap-3">
                    <Link href={`/admin/marketing/promotions/${promo.id}/edit`} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Chỉnh sửa</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Giảm giá</p>
                    <h3 className="text-3xl font-bold text-green-600">{promo.discount}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Đã sử dụng</p>
                    <h3 className="text-3xl font-bold text-gray-900">{promo.used}/{promo.maxUses}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Thời gian</p>
                    <p className="font-medium text-gray-900">{promo.startDate} - {promo.endDate}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={promo.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả</h2>
                <p className="text-gray-700">{promo.description}</p>
            </div>
        </div>
    );
}
