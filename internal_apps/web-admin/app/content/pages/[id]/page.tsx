"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PageDetail() {
    const params = useParams<{ id: string }>();
    const page = {
        id: params.id,
        title: 'Giới thiệu',
        slug: '/about',
        content: 'Nội dung trang giới thiệu...',
        metaTitle: 'Giới thiệu - Healthcare Platform',
        metaDescription: 'Trang giới thiệu về Healthcare Platform',
        status: 'published',
        views: 1250,
        lastUpdated: '15/12/2024',
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
                <div className="flex gap-3">
                    <Link href={`/content/pages/${page.id}/edit`} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl">Chỉnh sửa</Link>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Xóa</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Lượt xem</p>
                    <h3 className="text-3xl font-bold text-gray-900">{page.views}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Cập nhật cuối</p>
                    <h3 className="text-xl font-bold text-gray-900">{page.lastUpdated}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={page.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chi tiết</h2>
                <div className="space-y-4">
                    <div><p className="text-sm text-gray-500 mb-1">Slug</p><p className="font-medium text-gray-900">{page.slug}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Meta Title</p><p className="font-medium text-gray-900">{page.metaTitle}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Meta Description</p><p className="font-medium text-gray-900">{page.metaDescription}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Nội dung</p><div className="prose max-w-none"><p className="text-gray-700">{page.content}</p></div></div>
                </div>
            </div>
        </div>
    );
}
