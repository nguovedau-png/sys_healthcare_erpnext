"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import seminarService, { SeminarInvitation, Seminar } from '@/services/seminar.service';
import { message } from 'antd';

export default function SeminarInvitationsPage() {
    const [selectedSeminarId, setSelectedSeminarId] = useState('');
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [invitations, setInvitations] = useState<SeminarInvitation[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const [invitationResponse, seminarData] = await Promise.all([
                seminarService.getInvitations(params),
                seminarService.getSeminars({ limit: 100 })
            ]);
            setInvitations(invitationResponse.data);
            setTotal(invitationResponse.meta.total);
            setSeminars(seminarData.data);
        } catch (error) {
            console.error('Failed to fetch invitation data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchData();
        }
    }, [searchText]);

    const handleSendInvitation = async () => {
        if (!selectedSeminarId) return alert('Vui lòng chọn hội thảo');
        try {
            await seminarService.createInvitation({
                seminarId: parseInt(selectedSeminarId),
                sent: 500, // Mock count
                opened: 0,
                registered: 0,
                date: new Date().toISOString().split('T')[0]
            });
            alert('Đã gửi lời mời thành công!');
            fetchData();
        } catch (error) {
            console.error('Failed to send invitation', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mời tham dự Hội thảo</h1>
                    <p className="text-gray-500 text-sm mt-1">Gửi email mời và theo dõi phản hồi</p>
                </div>
            </div>

            {/* Send Invitation Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Gửi Lời mời</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Chọn Hội thảo</label>
                        <select
                            value={selectedSeminarId}
                            onChange={(e) => setSelectedSeminarId(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white"
                        >
                            <option value="">-- Chọn hội thảo --</option>
                            {seminars.map(s => (
                                <option key={s.id} value={s.id}>{s.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Người nhận</label>
                        <div className="grid grid-cols-2 gap-4">
                            <select className="px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                <option>Tất cả học viên</option>
                                <option>Theo khóa học</option>
                                <option>Theo địa bàn</option>
                            </select>
                            <select className="px-4 py-3 border border-gray-200 rounded-xl bg-white">
                                <option>TP.HCM</option>
                                <option>Hà Nội</option>
                                <option>Đà Nẵng</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề Email</label>
                        <input
                            type="text"
                            defaultValue="Mời tham dự Hội thảo"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung Email</label>
                        <textarea
                            rows={8}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
                            defaultValue="Kính gửi {name},\n\nChúng tôi trân trọng kính mời Quý Anh/Chị tham dự Hội thảo.\n\nThời gian: {date}\nĐịa điểm: {location}\n\nVui lòng đăng ký tại: {link}\n\nTrân trọng!"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-2">
                            Variables: {'{'}name{'}'}, {'{'}date{'}'}, {'{'}location{'}'}, {'{'}link{'}'}
                        </p>
                    </div>
                    <button
                        onClick={handleSendInvitation}
                        className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition"
                    >
                        Gửi Lời mời
                    </button>
                </div>
            </div>

            {/* Invitation History */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <DataTable
                    columns={[
                        { key: 'seminar', label: 'Hội thảo', render: (val: any) => <span className="font-medium text-gray-900">{val?.title}</span> },
                        { key: 'sent', label: 'Đã gửi', render: (val: number) => <span className="font-bold text-gray-900">{val}</span> },
                        {
                            key: 'opened',
                            label: 'Đã mở',
                            render: (val: number, row: SeminarInvitation) => (
                                <span>
                                    <span className="text-blue-600 font-bold">{val}</span>
                                    <span className="text-xs text-gray-500 ml-1">
                                        ({row.sent > 0 ? ((val / row.sent) * 100).toFixed(1) : '0'}%)
                                    </span>
                                </span>
                            )
                        },
                        {
                            key: 'registered',
                            label: 'Đã đăng ký',
                            render: (val: number, row: SeminarInvitation) => (
                                <span>
                                    <span className="text-green-600 font-bold">{val}</span>
                                    <span className="text-xs text-gray-500 ml-1">
                                        ({row.sent > 0 ? ((val / row.sent) * 100).toFixed(1) : '0'}%)
                                    </span>
                                </span>
                            )
                        },
                        {
                            key: 'conversion',
                            label: 'Tỷ lệ chuyển đổi',
                            render: (_: any, row: SeminarInvitation) => (
                                <span className="font-bold text-purple-600">
                                    {row.opened > 0 ? ((row.registered / row.opened) * 100).toFixed(1) : '0'}%
                                </span>
                            )
                        },
                        { key: 'date', label: 'Ngày gửi', render: (val: string) => <span className="text-gray-600">{val}</span> },
                    ]}
                    data={invitations}
                    loading={loading}
                    searchable
                    searchPlaceholder="Tìm lời mời theo hội thảo..."
                    onSearch={handleSearch}
                    pagination={{
                        currentPage: pagination.current,
                        totalPages: Math.ceil(total / pagination.pageSize),
                        pageSize: pagination.pageSize,
                        onPageChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize: pageSize || 10 });
                        }
                    }}
                />
            </div>
        </div>
    );
}
