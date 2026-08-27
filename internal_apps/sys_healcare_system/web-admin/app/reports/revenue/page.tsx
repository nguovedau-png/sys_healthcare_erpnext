"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import reportService, { RevenueReport } from '@/services/report.service';

export default function RevenueReports() {
    const [revenueData, setRevenueData] = useState<RevenueReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const data = await reportService.getRevenue();
                setRevenueData(data);
            } catch (error) {
                console.error('Failed to fetch revenue', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRevenue();
    }, []);

    const totalPages = Math.ceil(revenueData.length / itemsPerPage);
    const paginatedData = revenueData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const columns = [
        { key: 'month', label: 'Tháng' },
        {
            key: 'revenue',
            label: 'Doanh thu',
            render: (val: number) => <span className="font-bold text-green-600">{val.toLocaleString()}đ</span>
        },
        { key: 'orders', label: 'Đơn hàng' },
        {
            key: 'avgOrderValue',
            label: 'Giá trị TB',
            render: (val: number) => <span>{val.toLocaleString()}đ</span>
        },
        {
            key: 'growth',
            label: 'Tăng trưởng',
            render: (val: number) => <span className="text-blue-600">+{val}%</span>
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Báo cáo Doanh thu</h1>
            {loading ? (
                <div className="p-8 text-center text-gray-500">Đang tải...</div>
            ) : (
                <DataTable columns={columns} data={paginatedData} pagination={{ currentPage, totalPages, onPageChange: setCurrentPage }} />
            )}
        </div>
    );
}
