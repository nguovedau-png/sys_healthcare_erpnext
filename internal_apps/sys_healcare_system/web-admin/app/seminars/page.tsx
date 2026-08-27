"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import seminarService, { Seminar } from '@/services/seminar.service';
import { message } from 'antd';

export default function AdminSeminarsPage() {
    const [filter, setFilter] = useState('all');
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchSeminars = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (filter !== 'all') params.status = filter;
            if (searchText) params.search = searchText;

            const response = await seminarService.getSeminars(params);
            setSeminars(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch seminars:', error);
            message.error('Lỗi khi tải danh sách hội thảo');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeminars();
    }, [pagination.current, pagination.pageSize, filter]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchSeminars();
        }
    }, [searchText]);

    const filteredSeminars = seminars.filter(s => {
        if (filter === 'all') return true;
        if (filter === 'published') return s.status === 'published';
        if (filter === 'draft') return s.status === 'draft';
        if (filter === 'upcoming') {
            const seminarDate = new Date(s.date);
            return seminarDate > new Date();
        }
        return true;
    });

    // Stats
    const totalSeminars = total;
    const publishedCount = seminars.filter(s => s.status === 'published').length;
    const totalRegistrations = seminars.reduce((acc, curr) => acc + curr.registrations, 0);
    const upcomingCount = seminars.filter(s => new Date(s.date) > new Date()).length;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Hội thảo</h1>
                    <p className="text-gray-500 text-sm mt-1">Tạo và quản lý các hội thảo offline</p>
                </div>
                <button
                    onClick={async () => {
                        await seminarService.createSeminar({
                            title: 'Hội thảo mới ' + new Date().toLocaleTimeString(),
                            date: new Date().toISOString().split('T')[0],
                            location: 'Địa điểm mặc định',
                            capacity: 100,
                            status: 'draft'
                        });
                        fetchSeminars();
                    }}
                    className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition flex items-center gap-2"
                >
                    <i className="fi flaticon-add"></i> Tạo Hội thảo
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tổng hội thảo</p>
                    <p className="text-3xl font-bold text-gray-900">{totalSeminars}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Đã xuất bản</p>
                    <p className="text-3xl font-bold text-green-600">{publishedCount}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Tổng đăng ký</p>
                    <p className="text-3xl font-bold text-blue-600">{totalRegistrations}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-gray-500 text-sm mb-1">Sắp diễn ra</p>
                    <p className="text-3xl font-bold text-purple-600">{upcomingCount}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {[
                    { key: 'all', label: 'Tất cả' },
                    { key: 'published', label: 'Đã xuất bản' },
                    { key: 'draft', label: 'Nháp' },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => {
                            setFilter(tab.key);
                            setPagination({ ...pagination, current: 1 });
                        }}
                        className={`px-4 py-2 rounded-xl font-bold transition ${filter === tab.key
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-100'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Seminars Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <DataTable
                    columns={[
                        { key: 'title', label: 'Hội thảo', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
                        { key: 'date', label: 'Ngày', render: (val: string) => <span>{new Date(val).toLocaleDateString('vi-VN')}</span> },
                        { key: 'location', label: 'Địa điểm' },
                        {
                            key: 'registrations',
                            label: 'Đăng ký',
                            render: (val: number, row: Seminar) => (
                                <div>
                                    <p className="font-bold text-gray-900">{val}/{row.capacity}</p>
                                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${(val / row.capacity) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )
                        },
                        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
                    ]}
                    data={seminars}
                    loading={loading}
                    searchable
                    searchPlaceholder="Tìm tên hội thảo, địa điểm..."
                    onSearch={handleSearch}
                    pagination={{
                        currentPage: pagination.current,
                        totalPages: Math.ceil(total / pagination.pageSize),
                        pageSize: pagination.pageSize,
                        onPageChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize: pageSize || 10 });
                        }
                    }}
                    actions={(row) => (
                        <div className="flex gap-2">
                            <button
                                onClick={async () => {
                                    const newTitle = prompt('Nhập tiêu đề mới:', row.title);
                                    if (newTitle) {
                                        await seminarService.updateSeminar(row.id, { title: newTitle });
                                        fetchSeminars();
                                    }
                                }}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-bold"
                            >
                                Sửa
                            </button>
                            <button
                                onClick={async () => {
                                    if (confirm('Xóa hội thảo này?')) {
                                        await seminarService.deleteSeminar(row.id);
                                        fetchSeminars();
                                    }
                                }}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-bold"
                            >
                                Xóa
                            </button>
                        </div>
                    )}
                />
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/seminars/banners">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center cursor-pointer">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fi flaticon-image text-purple-600 text-xl"></i>
                        </div>
                        <p className="font-bold text-gray-900">Quản lý Banner</p>
                    </div>
                </Link>
                <Link href="/seminars/speakers">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center cursor-pointer">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fi flaticon-user text-blue-600 text-xl"></i>
                        </div>
                        <p className="font-bold text-gray-900">Diễn giả</p>
                    </div>
                </Link>
                <Link href="/seminars/sessions">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center cursor-pointer">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fi flaticon-calendar text-green-600 text-xl"></i>
                        </div>
                        <p className="font-bold text-gray-900">Phiên hội thảo</p>
                    </div>
                </Link>
                <Link href="/seminars/checkin">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition text-center cursor-pointer">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className="fi flaticon-checked text-orange-600 text-xl"></i>
                        </div>
                        <p className="font-bold text-gray-900">Check-in</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
