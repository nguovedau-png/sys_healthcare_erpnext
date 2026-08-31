"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import financeService, { Commission } from '@/services/finance.service';

export default function CommissionsPage() {
    const [commissions, setCommissions] = useState<Commission[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchCommissions = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await financeService.getCommissions(params);
            setCommissions(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch commissions:', error);
            // Assuming 'message' is available globally or imported from an Ant Design-like library
            // message.error('Lỗi khi tải danh sách hoa hồng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommissions();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchCommissions();
        }
    }, [searchText]);

    const columns = [
        { key: 'partner', label: 'Đối tác', render: (val: string) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'partnerType', label: 'Loại hình' },
        { key: 'revenue', label: 'Doanh thu', render: (val: number) => <span>{val.toLocaleString()} đ</span> },
        { key: 'rate', label: 'Tỷ lệ' },
        { key: 'commission', label: 'Hoa hồng', render: (val: number) => <span className="font-bold text-green-600">{val.toLocaleString()} đ</span> },
        { key: 'month', label: 'Tháng' },
        { key: 'status', label: 'Trạng thái', render: (val: string) => <StatusBadge status={val as any} /> },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Hoa hồng</h1>
                <button
                    onClick={async () => {
                        await financeService.createCommission({
                            partner: 'Đối tác mới ' + new Date().toLocaleTimeString(),
                            partnerType: 'Pharmacy',
                            revenue: 1000000,
                            commission: 100000,
                            rate: '10%',
                            month: '12/2024',
                            status: 'pending'
                        });
                        fetchCommissions();
                    }}
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl"
                >
                    + Tạo hoa hồng
                </button>
            </div>
            <DataTable
                columns={columns}
                data={commissions}
                loading={loading}
                searchable
                searchPlaceholder="Tìm đối tác, loại đối tác..."
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
    );
}
