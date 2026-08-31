"use client";

import React, { useState, useEffect } from 'react';
import StatsCard from '@/components/admin/StatsCard';
import reportService, { SystemOverview } from '@/services/report.service';

export default function OverviewReports() {
    const [overview, setOverview] = useState<SystemOverview | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const data = await reportService.getOverview();
                setOverview(data);
            } catch (error) {
                console.error('Failed to fetch overview', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOverview();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;
    if (!overview) return <div className="p-8 text-center text-red-500">Không có dữ liệu tổng quan.</div>;

    const formatRevenue = (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        return value.toLocaleString();
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Báo cáo Tổng quan</h1>
                <p className="text-gray-500 mt-1">Thống kê tổng quan hệ thống</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Tổng doanh thu"
                    value={formatRevenue(overview.totalRevenue)}
                    icon="flaticon-money"
                    color="green"
                    trend={{ value: overview.revenueTrend, isPositive: overview.revenueTrend.startsWith('+') }}
                />
                <StatsCard
                    title="Đơn hàng"
                    value={overview.totalOrders.toLocaleString()}
                    icon="flaticon-shopping-cart"
                    color="blue"
                    trend={{ value: overview.ordersTrend, isPositive: overview.ordersTrend.startsWith('+') }}
                />
                <StatsCard
                    title="Người dùng"
                    value={overview.totalUsers.toLocaleString()}
                    icon="flaticon-user"
                    color="purple"
                    trend={{ value: overview.usersTrend, isPositive: overview.usersTrend.startsWith('+') }}
                />
                <StatsCard
                    title="Đối tác"
                    value={overview.totalPartners.toLocaleString()}
                    icon="flaticon-hospital"
                    color="orange"
                    trend={{ value: overview.partnersTrend, isPositive: overview.partnersTrend.startsWith('+') }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Doanh thu theo tháng</h3>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        [Biểu đồ doanh thu thực tế]
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4">Đơn hàng theo dịch vụ</h3>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        [Biểu đồ phân bổ thực tế]
                    </div>
                </div>
            </div>
        </div>
    );
}
