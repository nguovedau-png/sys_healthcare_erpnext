"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useParams } from 'next/navigation';

export default function ModerationDetail() {
    const params = useParams<{ id: string }>();
    const item = {
        id: params.id,
        content: 'Nội dung bị báo cáo vi phạm...',
        type: 'Bài viết',
        author: 'Nguyễn Văn A',
        reportedBy: 'Trần Thị B',
        reason: 'Spam',
        description: 'Bài viết chứa nội dung quảng cáo không phù hợp',
        reportedDate: '18/12/2024 14:30',
        status: 'pending',
        link: '/forum/topic/123',
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Kiểm duyệt #{item.id}</h1>
                <p className="text-gray-500 mt-1">Ngày báo cáo: {item.reportedDate}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Loại</p>
                    <h3 className="text-xl font-bold text-gray-900">{item.type}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Lý do</p>
                    <h3 className="text-xl font-bold text-orange-600">{item.reason}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Trạng thái</p>
                    <StatusBadge status={item.status as any} />
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin báo cáo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Tác giả</p><p className="font-medium text-gray-900">{item.author}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Người báo cáo</p><p className="font-medium text-gray-900">{item.reportedBy}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Mô tả</p><p className="text-gray-700">{item.description}</p></div>
                    <div className="md:col-span-2"><p className="text-sm text-gray-500 mb-1">Liên kết</p><a href={item.link} className="text-primary hover:underline">{item.link}</a></div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Nội dung</h2>
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-700">{item.content}</p>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl">Duyệt - Không vi phạm</button>
                <button className="bg-yellow-500 text-white font-bold px-6 py-3 rounded-xl">Cảnh báo tác giả</button>
                <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl">Xóa nội dung</button>
            </div>
        </div>
    );
}
