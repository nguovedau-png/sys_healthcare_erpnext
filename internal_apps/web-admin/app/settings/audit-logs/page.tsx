'use client';

import React, { useState } from 'react';
import { Card, Table, Tag, DatePicker, Input, Button, Space, Typography } from 'antd';
import { SearchOutlined, FilterOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const AuditLogsPage = () => {
    // Mock Data
    const [logs] = useState([
        { id: 1, action: 'LOGIN', actor: 'admin@system.com', resource: 'Auth', details: 'Successful login from IP 192.168.1.1', timestamp: '2025-10-20 08:30:00' },
        { id: 2, action: 'UPDATE_USER', actor: 'manager@hospital.com', resource: 'User: 123', details: 'Changed status to Active', timestamp: '2025-10-20 09:15:00' },
        { id: 3, action: 'DELETE_BOOKING', actor: 'doctor@clinic.com', resource: 'Booking: 456', details: 'Cancelled appointment due to emergency', timestamp: '2025-10-20 10:00:00' },
        { id: 4, action: 'EXPORT_DATA', actor: 'admin@system.com', resource: 'Analytics', details: 'Exported monthly revenue report', timestamp: '2025-10-20 11:20:00' },
        { id: 5, action: 'FAILED_LOGIN', actor: 'unknown@hacker.com', resource: 'Auth', details: 'Invalid password attempt', timestamp: '2025-10-20 12:05:00', status: 'FAILURE' },
    ]);

    const columns = [
        {
            title: 'Thời gian',
            dataIndex: 'timestamp',
            key: 'timestamp',
            width: 180,
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (action: string) => {
                let color = 'blue';
                if (action.includes('DELETE')) color = 'red';
                if (action.includes('UPDATE')) color = 'orange';
                if (action.includes('LOGIN')) color = 'green';
                return <Tag color={color}>{action}</Tag>;
            }
        },
        {
            title: 'Người thực hiện',
            dataIndex: 'actor',
            key: 'actor',
        },
        {
            title: 'Tài nguyên',
            dataIndex: 'resource',
            key: 'resource',
        },
        {
            title: 'Chi tiết',
            dataIndex: 'details',
            key: 'details',
            ellipsis: true,
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: () => <Button icon={<EyeOutlined />} size="small">Xem</Button>
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <Title level={2} style={{ margin: 0 }}>Nhật ký hệ thống (Audit Logs)</Title>
                    <Typography.Text type="secondary">Theo dõi mọi hoạt động trong hệ thống để đảm bảo an ninh.</Typography.Text>
                </div>
                <Space>
                    <Button icon={<FilterOutlined />}>Bộ lọc nâng cao</Button>
                    <Button type="primary">Xuất báo cáo</Button>
                </Space>
            </div>

            <Card className="shadow-sm">
                <div className="flex gap-4 mb-4">
                    <RangePicker showTime />
                    <Input placeholder="Tìm kiếm theo User, Action..." prefix={<SearchOutlined />} style={{ width: 300 }} />
                    <Button type="primary" icon={<SearchOutlined />}>Tìm kiếm</Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={logs}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
};

export default AuditLogsPage;
