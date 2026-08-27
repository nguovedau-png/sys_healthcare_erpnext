"use client";

import React, { useState } from 'react';
import {
    Typography,
    Button,
    Space,
    Card,
    Breadcrumb,
    Row,
    Col,
    Statistic,
    Select,
    Tag,
    Tooltip,
    Progress
} from 'antd';
import {
    ArrowLeftOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    UserOutlined,
    SearchOutlined,
    BarChartOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/DataTable';

const { Title, Text } = Typography;

export default function QuizResultsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const results = [
        { id: 1, student: 'Nguyễn Văn A', quiz: 'Dược lâm sàng cơ bản', score: 85, time: '12 phút', date: '2024-12-20', status: 'Passed' },
        { id: 2, student: 'Trần Thị B', quiz: 'Cập nhật điều trị ĐTĐ', score: 92, time: '10 phút', date: '2024-12-19', status: 'Passed' },
        { id: 3, student: 'Lê Văn C', quiz: 'Dược lâm sàng cơ bản', score: 58, time: '15 phút', date: '2024-12-18', status: 'Failed' },
        { id: 4, student: 'Phạm Thị D', quiz: 'Bài thi cuối khóa: Nhi khoa', score: 78, time: '25 phút', date: '2024-12-17', status: 'Passed' },
    ];

    const columns = [
        {
            key: 'student',
            label: 'Học viên',
            render: (val: string) => (
                <Space>
                    <Avatar icon={<UserOutlined />} size="small" />
                    <Text strong>{val}</Text>
                </Space>
            )
        },
        {
            key: 'quiz',
            label: 'Bài trắc nghiệm',
            render: (val: string) => <Text>{val}</Text>
        },
        {
            key: 'score',
            label: 'Điểm số',
            render: (val: number) => (
                <Space orientation="vertical" size={0}>
                    <Text strong style={{ fontSize: '16px', color: val >= 80 ? '#52c41a' : val >= 60 ? '#faad14' : '#ff4d4f' }}>
                        {val}/100
                    </Text>
                    <Progress
                        percent={val}
                        size="small"
                        showInfo={false}
                        strokeColor={val >= 80 ? '#52c41a' : val >= 60 ? '#faad14' : '#ff4d4f'}
                        style={{ width: '60px' }}
                    />
                </Space>
            )
        },
        {
            key: 'time',
            label: 'Thời gian làm bài',
            render: (val: string) => <Space><ClockCircleOutlined /> {val}</Space>
        },
        {
            key: 'date',
            label: 'Ngày nộp',
            render: (val: string) => <Text type="secondary">{val}</Text>
        },
        {
            key: 'status',
            label: 'Kết quả',
            render: (val: string) => (
                <Tag color={val === 'Passed' ? 'success' : 'error'} icon={val === 'Passed' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}>
                    {val === 'Passed' ? 'ĐẠT' : 'KHÔNG ĐẠT'}
                </Tag>
            )
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý Bài thi</Breadcrumb.Item>
                <Breadcrumb.Item>Kết quả trắc nghiệm</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Kết quả Trắc nghiệm</Title>
                        <Text type="secondary">Theo dõi điểm số và chất lượng làm bài của học viên</Text>
                    </Space>
                </Col>
                <Col>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => router.push('/education/quizzes')}
                    >
                        Quay lại danh sách
                    </Button>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={8}>
                    <Card variant="outlined" className="shadow-sm">
                        <Statistic
                            title="Tổng lượt làm bài"
                            value={245}
                            prefix={<FileTextOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card variant="outlined" className="shadow-sm">
                        <Statistic
                            title="Tỷ lệ đạt"
                            value={78}
                            suffix="%"
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card variant="outlined" className="shadow-sm">
                        <Statistic
                            title="Điểm trung bình"
                            value={75.5}
                            prefix={<BarChartOutlined />}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card variant="outlined" className="shadow-sm">
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={8}>
                        <Select
                            placeholder="Tất cả bài trắc nghiệm"
                            style={{ width: '100%' }}
                            allowClear
                            options={[
                                { value: '1', label: 'Dược lâm sàng cơ bản' },
                                { value: '2', label: 'Cập nhật điều trị ĐTĐ' },
                            ]}
                        />
                    </Col>
                    <Col span={8}>
                        <Select
                            placeholder="Tất cả trạng thái"
                            style={{ width: '100%' }}
                            allowClear
                            options={[
                                { value: 'Passed', label: 'Đạt' },
                                { value: 'Failed', label: 'Không đạt' },
                            ]}
                        />
                    </Col>
                </Row>

                <DataTable
                    columns={columns}
                    data={results}
                    loading={loading}
                    searchable
                    searchPlaceholder="Tìm tên học viên..."
                    actions={(row) => (
                        <Tooltip title="Xem chi tiết bài làm">
                            <Button type="text" icon={<SearchOutlined style={{ color: '#1890ff' }} />} />
                        </Tooltip>
                    )}
                />
            </Card>
        </Space>
    );
}

// Add Avatar import
import { Avatar } from 'antd';
