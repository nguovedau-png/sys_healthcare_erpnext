"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import marketingService, { EmailCampaign } from '@/services/marketing.service';

export default function EmailMarketingManagement() {
    const [emails, setEmails] = useState<EmailCampaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchEmails = async () => {
        try {
            setLoading(true);
            const data = await marketingService.getEmailCampaigns();
            setEmails(data);
        } catch (error) {
            console.error('Failed to fetch email campaigns', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    const totalPages = Math.ceil(emails.length / itemsPerPage);
    const paginatedData = emails.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'subject', label: 'Tiêu đề', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'recipients', label: 'Người nhận' },
        { key: 'sentDate', label: 'Ngày gửi' },
        { key: 'openRate', label: 'Tỷ lệ mở', render: (val: string) => <span className="text-blue-600">{val}</span> },
        { key: 'clickRate', label: 'Tỷ lệ click', render: (val: string) => <span className="text-green-600">{val}</span> },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    const actions = (row: EmailCampaign) => (
        <div className="flex gap-2">
            <button className="text-blue-600 hover:text-blue-800" title="Xem"><i className="fi flaticon-eye"></i></button>
            <button
                onClick={async () => {
                    if (confirm('Bạn có chắc chắn muốn xóa chiến dịch email này?')) {
                        await marketingService.deleteEmailCampaign(row.id);
                        fetchEmails();
                    }
                }}
                className="text-red-600 hover:text-red-800"
                title="Xóa"
            >
                <i className="fi flaticon-delete"></i>
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
                <button
                    onClick={async () => {
                        await marketingService.createEmailCampaign({
                            subject: 'Email Test ' + new Date().toLocaleTimeString(),
                            recipients: 100,
                            sentDate: new Date().toLocaleDateString('vi-VN'),
                            openRate: '0%',
                            clickRate: '0%',
                            status: 'draft'
                        });
                        fetchEmails();
                    }}
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl"
                >
                    + Tạo chiến dịch
                </button>
            </div>
            <DataTable
                columns={columns}
                data={paginatedData}
                loading={loading}
                actions={actions}
                pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }}
            />
        </div>
    );
}
