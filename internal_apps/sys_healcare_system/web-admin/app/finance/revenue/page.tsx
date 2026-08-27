"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import StatsCard from '@/components/admin/StatsCard';
import financeService, { Revenue } from '@/services/finance.service';
// Assuming 'message' is imported from an Ant Design like library or similar for error notifications
// import { message } from 'antd'; 

export default function RevenuePage() {
    const [revenue, setRevenue] = useState<Revenue[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchRevenue = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await financeService.getRevenue(params);
            setRevenue(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch revenue:', error);
            // message.error('Lỗi khi tải danh sách doanh thu'); // Uncomment if 'message' is available
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenue();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchRevenue();
        }
    }, [searchText]);

    // Dynamic stats (simplified for demo)
    const totalAmount = revenue.reduce((acc, curr) => acc + curr.amount, 0);
    const totalFee = revenue.reduce((acc, curr) => acc + curr.fee, 0);
    const totalNet = revenue.reduce((acc, curr) => acc + curr.net, 0);

    const columns = [
        { label: 'Thời gian', key: 'timestamp', render: (val: string) => <span>{new Date(val).toLocaleString('vi-VN')}</span> },
        { label: 'Loại', key: 'type' },
        { label: 'Chi tiết', key: 'details' },
        { label: 'Số tiền', key: 'amount', render: (val: number) => <span className="font-bold text-green-600">{val.toLocaleString()} đ</span> },
        { label: 'Trạng thái', key: 'status', render: (val: string) => <StatusBadge status={val === 'Done' ? 'approved' : 'pending'} /> }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Quản lý Doanh thu</h1>
                <button
                    onClick={async () => {
                        await financeService.createRevenue({
                            type: 'Đặt khám',
                            details: 'Khám bệnh nhi khoa',
                            amount: 500000,
                            fee: 50000,
                            net: 450000,
                            status: 'Done'
                        });
                        fetchRevenue();
                    }}
                    className="bg-primary text-white font-bold px-6 py-3 rounded-xl"
                >
                    + Ghi nhận doanh thu
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard title="Tổng doanh thu" value={(totalAmount / 1000000).toFixed(1) + "M"} icon="flaticon-money" color="green" />
                <StatsCard title="Thực nhận" value={(totalNet / 1000000).toFixed(1) + "M"} icon="flaticon-chart-line" color="blue" />
                <StatsCard title="Phí hệ thống" value={(totalFee / 1000000).toFixed(1) + "M"} icon="flaticon-percentage" color="orange" />
                <StatsCard title="Số giao dịch" value={total.toString()} icon="flaticon-wallet" color="purple" />
            </div>

            <DataTable
                columns={columns}
                data={revenue}
                loading={loading}
                searchable
                searchPlaceholder="Tìm loại giao dịch, chi tiết..."
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
```
