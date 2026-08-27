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
    MessageOutlined,
    TeamOutlined,
    FileTextOutlined,
    PlusOutlined,
    ArrowLeftOutlined,
    CommentOutlined,
    UserOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';
import communityService, { ForumTopic } from '@/services/community.service';

const { Title, Text } = Typography;

export default function ForumManagement() {
    const [topics, setTopics] = useState<ForumTopic[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await communityService.getForumTopics(params);
            setTopics(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch forum topics', error);
            message.error('Không thể tải danh sách chủ đề thảo luận');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchTopics();
        }
    }, [searchText]);

    const handleDelete = (id: number, title: string) => {
        Modal.confirm({
            title: 'Xóa chủ đề thảo luận?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: `Bạn có chắc chắn muốn xóa chủ đề "${title}"? Mọi bình luận liên quan cũng sẽ bị xóa.`,
            okText: 'Xóa ngay',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await communityService.deleteForumTopic(id);
                    message.success('Đã xóa chủ đề thành công');
                    fetchTopics();
                } catch (error) {
                    message.error('Lỗi khi xóa chủ đề');
                }
            },
        });
    };

    const columns = [
        {
            key: 'topic',
            label: 'CHỦ ĐỀ & TÁC GIẢ',
            render: (_: any, record: ForumTopic) => (
                <Space orientation="vertical" size={0}>
                    <Text strong style={{ fontSize: '15px' }}>{record.title}</Text>
                    <Space size="small" split={<Text type="secondary" style={{ fontSize: '10px' }}>•</Text>}>
                        <Tag color="cyan" variant="borderless" style={{ fontSize: '11px' }}>{record.category}</Tag>
                        <Space size={4}>
                            <UserOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
                            <Text type="secondary" style={{ fontSize: '12px' }}>{record.authorName}</Text>
                        </Space>
                    </Space>
                </Space>
            )
        },
        {
            key: 'stats',
            label: 'TƯƠNG TÁC',
            align: 'center' as const,
            render: (_: any, record: ForumTopic) => (
                <Space size="large">
                    <Tooltip title="Lượt xem">
                        <Space size={4}>
                            <EyeOutlined style={{ color: '#8c8c8c' }} />
                            <Text strong>{record.views || 0}</Text>
                        </Space>
                    </Tooltip>
                    <Tooltip title="Phản hồi">
                        <Space size={4}>
                            <CommentOutlined style={{ color: '#1890ff' }} />
                            <Text strong color="blue">{record._count?.replies || 0}</Text>
                        </Space>
                    </Tooltip>
                </Space>
            )
        },
        {
            key: 'createdAt',
            label: 'NGÀY TẠO',
            render: (val: string) => <Text type="secondary">{new Date(val).toLocaleDateString('vi-VN')}</Text>
        },
        {
            key: 'status',
            label: 'TRẠNG THÁI',
            render: (val: string) => (
                <Tag color={val === 'active' ? 'success' : 'default'} variant="borderless">
                    {val === 'active' ? 'HOẠT ĐỘNG' : 'ĐÃ KHÓA'}
                </Tag>
            )
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>Diễn đàn thảo luận</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Diễn đàn</Title>
                    <Text type="secondary">Điều phối và kiểm soát các cuộc thảo luận từ người dùng</Text>
                </Col>
                <Col>
                    <Link href="/community/forum/create">
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Tạo chủ đề mới
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f0f5ff' }}>
                        <Statistic title="Tổng chủ đề" value={total} prefix={<FileTextOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f6ffed' }}>
                        <Statistic title="Đang hoạt động" value={topics.filter(t => t.status === 'active').length} prefix={<MessageOutlined />} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#e6f7ff' }}>
                        <Statistic title="Tổng lượt xem" value={topics.reduce((acc, t) => acc + (t.views || 0), 0)} prefix={<EyeOutlined />} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#fff7e6' }}>
                        <Statistic title="Thành viên" value={new Set(topics.map(t => t.authorId)).size} prefix={<TeamOutlined />} valueStyle={{ color: '#fa8c16' }} />
                    </Card>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={topics}
                loading={loading}
                searchable
                searchPlaceholder="Tìm tên chủ đề, tác giả..."
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
                            <Link href={`/community/forum/${row.id}`}>
                                <Button type="text" icon={<EyeOutlined style={{ color: '#1890ff' }} />} />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(row.id, row.title)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
