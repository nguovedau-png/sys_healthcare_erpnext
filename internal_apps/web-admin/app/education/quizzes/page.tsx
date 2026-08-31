"use client";

import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    Space,
    Card,
    Breadcrumb,
    Row,
    Col,
    Statistic,
    Tag,
    Tooltip,
    message,
    Badge
} from 'antd';
import {
    PlusOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    BarChartOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/DataTable';
import { educationService } from '@/services/education.service';

const { Title, Text } = Typography;

export default function QuizManagerPage() {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                setLoading(true);
                // Fetching all quizzes (using 'all' as a convention for the dashboard)
                const data = await educationService.getQuizzes('all');
                setQuizzes(data || []);
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
                message.error('Không thể tải danh sách trắc nghiệm');
            } finally {
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    const columns = [
        {
            key: 'title',
            label: 'Tên bài trắc nghiệm',
            render: (val: string) => <Text strong>{val}</Text>
        },
        {
            key: 'course',
            label: 'Khóa học',
            render: (val: any) => <Text type="secondary">{val?.name || 'Chưa gán'}</Text>
        },
        {
            key: 'questions',
            label: 'Số câu hỏi',
            render: (val: any[]) => <Badge count={val?.length || 0} showZero color="#1890ff" />
        },
        {
            key: 'attempts',
            label: 'Lượt làm bài',
            render: (val: number) => <Text strong>{val || 0}</Text>
        },
        {
            key: 'avgScore',
            label: 'Điểm TB',
            render: (val: number) => (
                <Tag color={val >= 80 ? 'success' : val >= 60 ? 'warning' : 'error'} variant="outlined">
                    {val || 0}%
                </Tag>
            )
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý Trắc nghiệm</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Ngân hàng Câu hỏi & Trắc nghiệm</Title>
                        <Text type="secondary">Xây dựng và quản lý các bộ câu hỏi kiểm tra kiến thức cho học viên</Text>
                    </Space>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => router.push('/education/quizzes/builder')}
                    >
                        Tạo bài trắc nghiệm
                    </Button>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Card variant="outlined" className="shadow-sm">
                        <Statistic
                            title="Tổng số bài thi"
                            value={quizzes.length}
                            prefix={<FileTextOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card variant="outlined" className="shadow-sm">
                        <Statistic
                            title="Lượt thi hoàn tất"
                            value={quizzes.reduce((acc, q) => acc + (q.attempts || 0), 0)}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card variant="outlined" className="shadow-sm">
                        <Statistic
                            title="Tỷ lệ đạt TB"
                            value={quizzes.length ? (quizzes.reduce((acc, q) => acc + (q.avgScore || 0), 0) / quizzes.length).toFixed(1) : 0}
                            suffix="%"
                            prefix={<BarChartOutlined />}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={quizzes}
                loading={loading}
                searchable
                searchPlaceholder="Tìm tên bài thi, khóa học..."
                actions={(row) => (
                    <Space size="small">
                        <Tooltip title="Xem kết quả">
                            <Link href={`/education/quizzes/results?quiz=${row.id}`}>
                                <Button type="text" icon={<BarChartOutlined style={{ color: '#1890ff' }} />} />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <Button type="text" icon={<EditOutlined style={{ color: '#52c41a' }} />} />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button type="text" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
