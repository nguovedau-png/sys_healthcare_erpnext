'use client';

import React, { useState, useEffect } from 'react';
import { Card, Tabs, Table, Typography, DatePicker, Row, Col, Statistic } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BarChartOutlined, CalendarOutlined, GlobalOutlined, TeamOutlined } from '@ant-design/icons';
import cpeService, { CpeDashboardDay, CpeDashboardWeek, CpeDashboardMonth } from '@/services/cpe.service';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

export default function CPEDashboard() {
    const [activeTab, setActiveTab] = useState('day');

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Báo cáo CPE Dashboard</Title>
            <Text type="secondary">Thống kê hoạt động đào tạo theo thời gian</Text>

            <Card style={{ marginTop: '24px' }}>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: 'day',
                            label: 'Báo cáo Ngày',
                            children: <DayView />,
                        },
                        {
                            key: 'week',
                            label: 'Báo cáo Tuần',
                            children: <WeekView />,
                        },
                        {
                            key: 'month',
                            label: 'Báo cáo Tháng',
                            children: <MonthView />,
                        },
                    ]}
                />
            </Card>
        </div>
    );
}

const DayView = () => {
    const [data, setData] = useState<CpeDashboardDay[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await cpeService.getDayDashboard();
            setData(res);
        } catch (error) {
            console.error('Failed to fetch day data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns: ColumnsType<CpeDashboardDay> = [
        {
            title: 'Ngày',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Tổng khóa học',
            dataIndex: 'totalCourses',
            key: 'totalCourses',
        },
        {
            title: 'Tổng Active Users',
            dataIndex: 'totalActiveUsers',
            key: 'totalActiveUsers',
        },
        {
            title: 'Tổng User học',
            dataIndex: 'totalUserLearn',
            key: 'totalUserLearn',
        },
        {
            title: 'Tổng Clicks',
            dataIndex: 'totalClicks',
            key: 'totalClicks',
        },
    ];

    return (
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
    );
};

const WeekView = () => {
    const [data, setData] = useState<CpeDashboardWeek[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await cpeService.getWeekDashboard();
            setData(res);
        } catch (error) {
            console.error('Failed to fetch week data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns: ColumnsType<CpeDashboardWeek> = [
        {
            title: 'Tuần',
            dataIndex: 'week',
            key: 'week',
            render: (text, record) => `Tuần ${text} - ${record.year}`,
        },
        {
            title: 'Tổng khóa học',
            dataIndex: 'totalCourses',
            key: 'totalCourses',
        },
        {
            title: 'Total Active Users',
            dataIndex: 'totalActiveUsers',
            key: 'totalActiveUsers',
        },
        {
            title: 'Total User Learn',
            dataIndex: 'totalUserLearn',
            key: 'totalUserLearn',
        },
        {
            title: 'Tổng Clicks',
            dataIndex: 'totalClicks',
            key: 'totalClicks',
        },
    ];

    return (
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
    );
};

const MonthView = () => {
    const [data, setData] = useState<CpeDashboardMonth[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await cpeService.getMonthDashboard();
            setData(res);
        } catch (error) {
            console.error('Failed to fetch month data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns: ColumnsType<CpeDashboardMonth> = [
        {
            title: 'Tháng',
            dataIndex: 'month',
            key: 'month',
            render: (text, record) => `Tháng ${text}/${record.year}`,
        },
        {
            title: 'Tổng khóa học',
            dataIndex: 'totalCourses',
            key: 'totalCourses',
        },
        {
            title: 'Total Active Users',
            dataIndex: 'totalActiveUsers',
            key: 'totalActiveUsers',
        },
        {
            title: 'Total User Learn',
            dataIndex: 'totalUserLearn',
            key: 'totalUserLearn',
        },
        {
            title: 'Tổng Clicks',
            dataIndex: 'totalClicks',
            key: 'totalClicks',
        },
    ];

    return (
        <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
    );
};
