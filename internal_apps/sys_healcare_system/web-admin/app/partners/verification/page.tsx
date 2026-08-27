"use client";

import React, { useState } from 'react';
import {
    Table,
    Typography,
    Card,
    Space,
    Button,
    Tag,
    Avatar,
    Row,
    Col,
    Statistic,
    Breadcrumb,
    Tabs,
    message,
    Tooltip
} from 'antd';
import {
    IdcardOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    WarningOutlined,
    EyeOutlined,
    CheckOutlined,
    StopOutlined,
    TrophyOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

export default function VerificationPage() {
    const [activeTab, setActiveTab] = useState('doctors');

    const verifications = [
        { id: 1, name: 'BS. Nguyễn Văn A', specialty: 'Tim mạch', hospital: 'BV Chợ Rẫy', license: 'BS-12345', status: 'pending', date: '20/12/2024' },
        { id: 2, name: 'BS. Trần Thị B', specialty: 'Nhi khoa', hospital: 'BV Nhi Đồng 1', license: 'BS-23456', status: 'pending', date: '19/12/2024' },
        { id: 3, name: 'BS. Lê Văn C', specialty: 'Da liễu', hospital: 'PK Đa khoa', license: 'BS-34567', status: 'verified', date: '18/12/2024' },
    ];

    const columns: ColumnsType<any> = [
        {
            title: 'Đối tác',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar icon={<IdcardOutlined />} style={{ backgroundColor: '#1890ff' }} />
                    <Space orientation="vertical" size={0}>
                        <Text strong>{text}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.specialty} • {record.hospital}</Text>
                    </Space>
                </Space>
            ),
        },
        {
            title: 'Số chứng chỉ',
            dataIndex: 'license',
            key: 'license',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'pending' ? 'orange' : status === 'verified' ? 'success' : 'error'} icon={
                    status === 'pending' ? <ClockCircleOutlined /> : status === 'verified' ? <CheckCircleOutlined /> : <CloseCircleOutlined />
                }>
                    {status === 'pending' ? 'Chờ xác minh' : status === 'verified' ? 'Đã xác minh' : 'Từ chối'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Xem tài liệu">
                        <Button icon={<EyeOutlined />} type="text" />
                    </Tooltip>
                    {record.status === 'pending' && (
                        <>
                            <Tooltip title="Duyệt">
                                <Button icon={<CheckOutlined />} type="text" style={{ color: '#52c41a' }} onClick={() => message.success('Đã phê duyệt')} />
                            </Tooltip>
                            <Tooltip title="Từ chối">
                                <Button icon={<StopOutlined />} type="text" danger onClick={() => message.error('Đã từ chối')} />
                            </Tooltip>
                        </>
                    )}
                    {record.status === 'verified' && (
                        <Tooltip title="Cấp badge">
                            <Button icon={<TrophyOutlined />} type="text" style={{ color: '#722ed1' }} />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    const tabItems = [
        {
            key: 'doctors',
            label: 'Bác sĩ',
            children: <Table columns={columns} dataSource={verifications} rowKey="id" pagination={{ pageSize: 5 }} />
        },
        {
            key: 'pharmacies',
            label: 'Nhà thuốc',
            children: <Table columns={columns} dataSource={[]} locale={{ emptyText: 'Không có yêu cầu xác minh nhà thuốc' }} />
        },
        {
            key: 'pharmacists',
            label: 'Dược sĩ',
            children: <Table columns={columns} dataSource={[]} locale={{ emptyText: 'Không có yêu cầu xác minh dược sĩ' }} />
        }
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item>Xác minh chứng chỉ</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Xác minh Đối tác</Title>
                    <Text type="secondary">Kiểm tra và xác minh chứng chỉ hành nghề của bác sĩ và cơ sở y tế</Text>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#fff7e6' }}>
                        <Statistic title="Chờ xác minh" value={45} valueStyle={{ color: '#faad14' }} prefix={<ClockCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f6ffed' }}>
                        <Statistic title="Đã xác minh" value={1234} valueStyle={{ color: '#3f8600' }} prefix={<CheckCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#fff1f0' }}>
                        <Statistic title="Từ chối" value={12} valueStyle={{ color: '#cf1322' }} prefix={<CloseCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#fffbe6' }}>
                        <Statistic title="Hết hạn" value={8} valueStyle={{ color: '#d48806' }} prefix={<WarningOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card bodyStyle={{ padding: '0 24px 24px 24px' }}>
                <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
            </Card>
        </Space>
    );
}
