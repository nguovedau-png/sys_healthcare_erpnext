"use client";

import React, { useState, useEffect } from 'react';
import {
    Typography,
    Button,
    Space,
    Tag,
    Breadcrumb,
    Row,
    Col,
    Modal,
    message,
    Tooltip,
    Card,
    Statistic
} from 'antd';
import {
    EyeOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    UserOutlined,
    CommentOutlined,
    FolderOpenOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';
import communityService, { QAQuestion } from '@/services/community.service';

const { Title, Text } = Typography;

export default function QAManagement() {
    const [questions, setQuestions] = useState<QAQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await communityService.getQAQuestions(params);
            setQuestions(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch QA questions', error);
            message.error('Không thể tải danh sách hỏi đáp');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchQuestions();
        }
    }, [searchText]);

    const handleApprove = async (id: number) => {
        try {
            await communityService.updateQAQuestion(id, { status: 'approved' });
            message.success('Đã duyệt câu hỏi');
            fetchQuestions();
        } catch (error) {
            message.error('Lỗi khi duyệt câu hỏi');
        }
    };

    const handleDelete = (id: number, question: string) => {
        Modal.confirm({
            title: 'Xóa câu hỏi này?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: `Bạn có chắc chắn muốn xóa câu hỏi: "${question}"?`,
            okText: 'Xóa ngay',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await communityService.deleteQAQuestion(id);
                    message.success('Đã xóa câu hỏi thành công');
                    fetchQuestions();
                } catch (error) {
                    message.error('Lỗi khi xóa câu hỏi');
                }
            },
        });
    };

    const columns = [
        {
            key: 'question',
            label: 'CÂU HỎI & NGƯỜI GỬI',
            render: (_: any, record: QAQuestion) => (
                <Space orientation="vertical" size={0}>
                    <Text strong style={{ fontSize: '15px' }}>{record.question}</Text>
                    <Space size="small" split={<Text type="secondary" style={{ fontSize: '10px' }}>•</Text>}>
                        <Tag color="blue" variant="outlined" style={{ fontSize: '11px' }}>{record.category}</Tag>
                        <Space size={4}>
                            <UserOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
                            <Text type="secondary" style={{ fontSize: '12px' }}>{record.askedByName}</Text>
                        </Space>
                    </Space>
                </Space>
            )
        },
        {
            key: 'interaction',
            label: 'TƯƠNG TÁC',
            align: 'center' as const,
            render: (_: any, record: QAQuestion) => (
                <Space size="large">
                    <Tooltip title="Lượt xem">
                        <Space size={4}>
                            <EyeOutlined style={{ color: '#8c8c8c' }} />
                            <Text strong>{record.views || 0}</Text>
                        </Space>
                    </Tooltip>
                    <Tooltip title="Câu trả lời">
                        <Space size={4}>
                            <CommentOutlined style={{ color: '#1890ff' }} />
                            <Text strong color="blue">{record._count?.answers || 0}</Text>
                        </Space>
                    </Tooltip>
                </Space>
            )
        },
        {
            key: 'createdAt',
            label: 'NGÀY GỬI',
            render: (val: string) => <Text type="secondary">{new Date(val).toLocaleDateString('vi-VN')}</Text>
        },
        {
            key: 'status',
            label: 'TRẠNG THÁI',
            render: (val: string) => {
                const colors: Record<string, string> = {
                    approved: 'success',
                    pending: 'warning',
                    spam: 'error'
                };
                const labels: Record<string, string> = {
                    approved: 'ĐÃ DUYỆT',
                    pending: 'CHỜ DUYỆT',
                    spam: 'SPAM'
                };
                return <Tag color={colors[val] || 'default'} variant="outlined">{labels[val] || val.toUpperCase()}</Tag>;
            }
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>Hỏi đáp y tế</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Hỏi đáp</Title>
                    <Text type="secondary">Giải đáp và kiểm soát các thắc mắc từ cộng đồng</Text>
                </Col>
                <Col>
                    <Link href="/community/qa/create">
                        <Button type="primary" size="large" icon={<QuestionCircleOutlined />}>Tạo câu hỏi mới</Button>
                    </Link>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f0f5ff' }}>
                        <Statistic title="Tổng câu hỏi" value={total} prefix={<QuestionCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#fff7e6' }}>
                        <Statistic title="Chờ xét duyệt" value={questions.filter(q => q.status === 'pending').length} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#fa8c16' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f6ffed' }}>
                        <Statistic title="Đã trả lời" value={questions.filter(q => (q._count?.answers || 0) > 0).length} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f9f0ff' }}>
                        <Statistic title="Chuyên khoa" value={new Set(questions.map(q => q.category)).size} prefix={<FolderOpenOutlined />} valueStyle={{ color: '#722ed1' }} />
                    </Card>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={questions}
                loading={loading}
                searchable
                searchPlaceholder="Tìm câu hỏi, người hỏi..."
                onSearch={handleSearch}
                pagination={{
                    currentPage: pagination.current,
                    totalPages: Math.ceil(total / pagination.pageSize),
                    pageSize: pagination.pageSize,
                    onPageChange: (page, pageSize) => {
                        setPagination({ current: page, pageSize: pageSize || 10 });
                    }
                }}
                actions={(row) => (
                    <Space size="small">
                        <Tooltip title="Xem chi tiết">
                            <Link href={`/community/qa/${row.id}`}>
                                <Button type="text" icon={<EyeOutlined style={{ color: '#1890ff' }} />} />
                            </Link>
                        </Tooltip>
                        {row.status === 'pending' && (
                            <Tooltip title="Duyệt câu hỏi">
                                <Button type="text" icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} onClick={() => handleApprove(row.id)} />
                            </Tooltip>
                        )}
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(row.id, row.question)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
