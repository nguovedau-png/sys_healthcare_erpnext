"use client";
import React from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useParams } from 'next/navigation';

export default function EmailCampaignDetail() {
    const params = useParams<{ id: string }>();
    const campaign = {
        id: params.id,
        subject: 'Khuyến mãi đặc biệt tháng 12',
        fromName: 'Healthcare Platform',
        fromEmail: 'noreply@healthcare.vn',
        recipients: 5420,
        sent: '19/12/2024 09:00',
        openRate: '32.5%',
        clickRate: '8.3%',
        bounceRate: '1.2%',
        status: 'published',
        content: 'Nội dung email chiến dịch khuyến mãi...',
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{campaign.subject}</h1>
                <p className="text-gray-500 mt-1">Gửi lúc: {campaign.sent}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Người nhận</p>
                    <h3 className="text-3xl font-bold text-gray-900">{campaign.recipients}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Tỷ lệ mở</p>
                    <h3 className="text-3xl font-bold text-blue-600">{campaign.openRate}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Tỷ lệ click</p>
                    <h3 className="text-3xl font-bold text-green-600">{campaign.clickRate}</h3>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm mb-2">Bounce rate</p>
                    <h3 className="text-3xl font-bold text-red-600">{campaign.bounceRate}</h3>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin chiến dịch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><p className="text-sm text-gray-500 mb-1">Tên người gửi</p><p className="font-medium text-gray-900">{campaign.fromName}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Email người gửi</p><p className="font-medium text-gray-900">{campaign.fromEmail}</p></div>
                    <div><p className="text-sm text-gray-500 mb-1">Trạng thái</p><StatusBadge status={campaign.status as any} /></div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Nội dung email</h2>
                <div className="prose max-w-none">
                    <p className="text-gray-700">{campaign.content}</p>
                </div>
            </div>
        </div>
    );
}
