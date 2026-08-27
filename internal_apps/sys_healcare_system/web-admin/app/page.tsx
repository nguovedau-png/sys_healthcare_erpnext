"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Card,
    Row,
    Col,
    Statistic,
    Table,
    Progress,
    Rate,
    Select,
    Typography,
    Space,
    Button,
    Tag,
    Spin,
} from 'antd';
import {
    UserOutlined,
    LineChartOutlined,
    CloseCircleOutlined,
    StarFilled,
    BarChartOutlined,
    ProfileOutlined,
    CommentOutlined,
    TeamOutlined,
    ArrowRightOutlined,
    BookOutlined,
    CheckCircleOutlined,
    BellOutlined,
    ArrowUpOutlined,
    DollarCircleOutlined,
    SettingOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import analyticService from '@/services/analytic.service';
import financeService from '@/services/finance.service';

import { useRouter } from 'next/navigation';
import ActivityFeed from '@/components/admin/ActivityFeed';

const { Title, Text } = Typography;

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [revenueData, setRevenueData] = useState<any[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const [dashStats, revStats] = await Promise.all([
                    analyticService.getDashboardStats(),
                    financeService.getRevenueStats()
                ]);
                setStats(dashStats);
                setRevenueData(revStats.monthly || []);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Spin size="large" /></div>;

    const aggregateStats = stats || {
        totalUsers: 1240,
        activeUsers: 456,
        completionRate: 75,
        totalRevenue: 150000000
    };

    return (
        <div style={{ padding: '0px' }}>
            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Dashboard Tổng quan</Title>
                <Text type="secondary">Thống kê chi tiết và hoạt động thời gian thực của hệ thống</Text>
            </div>

            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={12} md={6}>
                    <Card variant="outlined">
                        <Statistic
                            title="Tổng người dùng"
                            value={aggregateStats.totalUsers}
                            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card variant="outlined">
                        <Statistic
                            title="Đang hoạt động"
                            value={aggregateStats.activeUsers}
                            prefix={<TeamOutlined style={{ color: '#52c41a' }} />}
                            suffix={<ArrowUpOutlined style={{ fontSize: '12px', color: '#52c41a' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card variant="outlined">
                        <Statistic
                            title="Doanh thu tháng (VNĐ)"
                            value={aggregateStats.totalRevenue / 1000000}
                            precision={1}
                            suffix="Tr"
                            prefix={<DollarCircleOutlined style={{ color: '#fa8c16' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card variant="outlined">
                        <Statistic
                            title="Tỷ lệ hoàn thành"
                            value={aggregateStats.completionRate}
                            suffix="%"
                            prefix={<CheckCircleOutlined style={{ color: '#eb2f96' }} />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Biểu đồ Doanh thu & Tăng trưởng" style={{ marginBottom: '16px' }}>
                        <div style={{ height: 350 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData.length > 0 ? revenueData : [
                                    { name: 'Tháng 1', amount: 4000 },
                                    { name: 'Tháng 2', amount: 3000 },
                                    { name: 'Tháng 3', amount: 2000 },
                                    { name: 'Tháng 4', amount: 2780 },
                                    { name: 'Tháng 5', amount: 1890 },
                                    { name: 'Tháng 6', amount: 2390 },
                                ]}>
                                    <defs>
                                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1890ff" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="amount" stroke="#1890ff" fillOpacity={1} fill="url(#colorAmount)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card title="Lối tắt nhanh">
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <Link href="/content/posts">
                                    <Button block icon={<BookOutlined />} style={{ height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <span>Bài viết</span>
                                    </Button>
                                </Link>
                            </Col>
                            <Col span={6}>
                                <Link href="/users">
                                    <Button block icon={<UserOutlined />} style={{ height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <span>Người dùng</span>
                                    </Button>
                                </Link>
                            </Col>
                            <Col span={6}>
                                <Link href="/notifications">
                                    <Button block icon={<BellOutlined />} style={{ height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <span>Thông báo</span>
                                    </Button>
                                </Link>
                            </Col>
                            <Col span={6}>
                                <Link href="/settings/general">
                                    <Button block icon={<SettingOutlined />} style={{ height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <span>Cài đặt</span>
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <ActivityFeed />
                </Col>
            </Row>
        </div>
    );
}
