"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BannerDetail() {
    const params = useParams<{ id: string }>();
    const banner = {
        id: params.id,
        title: 'Banner Khuyến mãi Tết',
        image: '/img/banner-tet.jpg',
        link: '/promotions/tet-2024',
        position: 'Trang chủ - Đầu trang',
        order: 1,
        startDate: '01/12/2024',
        endDate: '31/12/2024',
        clicks: 1250,
        impressions: 15000,
        status: 'active',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{banner.title}</h1>
                <div className="flex gap-3">
                    <Link href={`/content/banners/${banner.id}/edit`} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Chỉnh sửa</Link>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Xóa</button>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <img src={banner.image} alt={banner.title} className="w-full h-64 object-cover rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Lượt hiển thị</p>
                    <h3 className="text-3xl font-bold text-gray-900">{banner.impressions}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Lượt click</p>
                    <h3 className="text-3xl font-bold text-blue-600">{banner.clicks}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">CTR</p>
                    <h3 className="text-3xl font-bold text-green-600">{((banner.clicks / banner.impressions) * 100).toFixed(2)}%</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={banner.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chi tiết</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Liên kết</p><p className="font-medium text-gray-900">{banner.link}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Vị trí</p><p className="font-medium text-gray-900">{banner.position}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Thứ tự</p><p className="font-medium text-gray-900">{banner.order}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Thời gian</p><p className="font-medium text-gray-900">{banner.startDate} - {banner.endDate}</p></div>
                </div>
            </div>
        </div>
    );
}
