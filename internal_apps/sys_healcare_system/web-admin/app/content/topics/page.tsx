"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
    EyeInvisibleOutlined,
    FileTextOutlined,
    UserOutlined,
    FolderOpenOutlined,
    CommentOutlined
} from '@ant-design/icons';
import communityService, { ForumTopic } from '@/services/community.service';
import DataTable from '@/components/admin/DataTable';

const { Title, Text } = Typography;

export default function TopicsManagement() {
    const [topics, setTopics] = useState<ForumTopic[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const data = await communityService.getForumTopics();
            setTopics(data);
        } catch (error) {
            console.error('Failed to fetch topics', error);
            message.error('Không thể tải danh sách chủ đề');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    const handleDelete = (id: number | string, topicTitle: string) => {
        Modal.confirm({
            title: 'Xóa chủ đề thảo luận',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: `Bạn có chắc chắn muốn xóa chủ đề: "${topicTitle}"? Hành động này sẽ xóa tất cả các phản hồi liên quan và không thể hoàn tác.`,
            okText: 'Xóa chủ đề',
            okType: 'danger',
            cancelText: 'Hủy bỏ',
            onOk: async () => {
                try {
                    await communityService.deleteForumTopic(Number(id));
                    message.success('Đã xóa chủ đề thành công');
                    fetchTopics();
                } catch (error) {
                    message.error('Xóa thất bại');
                }
            },
        });
    };

    const columns = [
        {
            key: 'title',
            label: 'Chủ đề',
            render: (_: any, record: ForumTopic) => (
                <Space orientation="vertical" size={0}>
                    <Text strong style={{ fontSize: '15px' }}>{record.title}</Text>
                    <Space size="small" split={<Text type="secondary" style={{ fontSize: '10px' }}>•</Text>}>
                        <Tag color="blue" variant="borderless" style={{ fontSize: '11px', borderRadius: '4px' }}>
                            {record.category}
                        </Tag>
                        <Space size={4}>
                            <UserOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
                            <Text type="secondary" style={{ fontSize: '12px' }}>{record.authorName}</Text>
                        </Space>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                            {new Date(record.createdAt).toLocaleDateString()}
                        </Text>
                    </Space>
                </Space>
            )
        },
        {
            key: 'interaction',
            label: 'Tương tác',
            align: 'center' as const,
            render: (_: any, record: ForumTopic) => (
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
                            <Text strong color="blue">{record._count?.replies || 0}</Text>
                        </Space>
                    </Tooltip>
                </Space>
            )
        },
        {
            key: 'status',
            label: 'Trạng thái',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'success' : 'default'} variant="borderless">
                    {status === 'active' ? 'HOẠT ĐỘNG' : 'ĐÃ KHÓA'}
                </Tag>
            )
        }
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>Diễn đàn thảo luận</Breadcrumb.Item>
                <Breadcrumb.Item>Tổng hợp chủ đề</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Diễn đàn</Title>
                    <Text type="secondary">Xét duyệt và quản lý các chủ đề thảo luận từ cộng đồng người dùng</Text>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f0f5ff' }}>
                        <Statistic
                            title="Tổng chủ đề"
                            value={topics.length}
                            prefix={<FileTextOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f6ffed' }}>
                        <Statistic
                            title="Hoạt động"
                            value={topics.filter(t => t.status === 'active').length}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<MessageOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#fff7e6' }}>
                        <Statistic
                            title="Lượt xem"
                            value={topics.reduce((acc, t) => acc + (t.views || 0), 0)}
                            valueStyle={{ color: '#faad14' }}
                            prefix={<EyeOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f9f0ff' }}>
                        <Statistic
                            title="Danh mục"
                            value={new Set(topics.map(t => t.category)).size}
                            prefix={<FolderOpenOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={topics}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm tên chủ đề, tác giả..."
                actions={(record) => (
                    <Space size="small">
                        <Tooltip title="Xem chi tiết">
                            <Link href={`/community/forum/topics/${record.id}`}>
                                <Button type="text" icon={<EyeOutlined style={{ color: '#1890ff' }} />} />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Khóa chủ đề">
                            <Button type="text" icon={<EyeInvisibleOutlined style={{ color: '#faad14' }} />} />
                        </Tooltip>
                        <Tooltip title="Xóa chủ đề">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(record.id, record.title)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
