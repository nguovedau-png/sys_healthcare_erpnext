'use client';

import React from 'react';
import { Card, Row, Col, Typography, Statistic, Select, DatePicker } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DollarOutlined, UserOutlined, CalendarOutlined, StarOutlined } from '@ant-design/icons';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock Data
const revenueData = [
    { name: 'T1', revenue: 4000, appointments: 240 },
    { name: 'T2', revenue: 3000, appointments: 139 },
    { name: 'T3', revenue: 2000, appointments: 980 },
    { name: 'T4', revenue: 2780, appointments: 390 },
    { name: 'T5', revenue: 1890, appointments: 480 },
    { name: 'T6', revenue: 2390, appointments: 380 },
    { name: 'T7', revenue: 3490, appointments: 430 },
    { name: 'T8', revenue: 4200, appointments: 520 },
    { name: 'T9', revenue: 3800, appointments: 450 },
    { name: 'T10', revenue: 5100, appointments: 610 },
    { name: 'T11', revenue: 4600, appointments: 550 },
    { name: 'T12', revenue: 6200, appointments: 720 },
];

const specialtyData = [
    { name: 'Tim mạch', value: 400 },
    { name: 'Nhi khoa', value: 300 },
    { name: 'Da liễu', value: 300 },
    { name: 'Thần kinh', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsPage = () => {
    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Tổng quan Analytics</Title>
                    <Text type="secondary">Số liệu thống kê chi tiết về hoạt động của hệ thống</Text>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <RangePicker />
                    <Select defaultValue="all" style={{ width: 150 }}>
                        <Option value="all">Tất cả chi nhánh</Option>
                        <Option value="hcm">Hồ Chí Minh</Option>
                        <Option value="hn">Hà Nội</Option>
                    </Select>
                </div>
            </div>

            {/* KPI Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-xl">
                        <Statistic
                            title="Tổng doanh thu"
                            value={112893000}
                            precision={0}
                            valueStyle={{ color: '#3f8600', fontSize: '24px', fontWeight: 'bold' }}
                            prefix={<DollarOutlined />}
                            suffix="đ"
                        />
                        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <ArrowUpOutlined style={{ color: '#3f8600' }} />
                            <Text type="success">12.5%</Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>so với tháng trước</Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-xl">
                        <Statistic
                            title="Lượt đặt khám"
                            value={2345}
                            valueStyle={{ color: '#1677ff', fontSize: '24px', fontWeight: 'bold' }}
                            prefix={<CalendarOutlined />}
                        />
                        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <ArrowUpOutlined style={{ color: '#3f8600' }} />
                            <Text type="success">8.2%</Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>so với tháng trước</Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-xl">
                        <Statistic
                            title="Người dùng mới"
                            value={189}
                            valueStyle={{ color: '#722ed1', fontSize: '24px', fontWeight: 'bold' }}
                            prefix={<UserOutlined />}
                        />
                        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <ArrowDownOutlined style={{ color: '#cf1322' }} />
                            <Text type="danger">2.1%</Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>so với tháng trước</Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-xl">
                        <Statistic
                            title="Đánh giá trung bình"
                            value={4.8}
                            precision={1}
                            valueStyle={{ color: '#faad14', fontSize: '24px', fontWeight: 'bold' }}
                            prefix={<StarOutlined />}
                            suffix="/ 5"
                        />
                        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>Dựa trên 850 đánh giá</Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Main Charts */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Xu hướng Doanh thu & Đặt lịch" bordered={false} className="shadow-sm rounded-xl h-full">
                        <div style={{ height: 350, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" yAxisId="left" name="Doanh thu ($)" />
                                    <Area type="monotone" dataKey="appointments" stroke="#82ca9d" fillOpacity={1} fill="url(#colorApps)" yAxisId="right" name="Lượt khám" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Phân bố Chuyên khoa" bordered={false} className="shadow-sm rounded-xl h-full">
                        <div style={{ height: 350, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={specialtyData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {specialtyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AnalyticsPage;
