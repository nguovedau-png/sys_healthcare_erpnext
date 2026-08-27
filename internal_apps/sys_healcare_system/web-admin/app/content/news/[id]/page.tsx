'use client';

import React, { useState, useEffect, use } from 'react';
import {
    Typography,
    Card,
    Space,
    Breadcrumb,
    message,
    Spin,
    Row,
    Col,
    Button,
    Tag,
    Descriptions,
    Statistic,
    Divider,
    Avatar
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    UserOutlined,
    CalendarOutlined,
    FolderOpenOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import contentService, { Post } from '@/services/content.service';

const { Title, Text, Paragraph } = Typography;

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await contentService.getPost(id);
                setPost(data);
            } catch (error) {
                console.error('Failed to fetch post', error);
                message.error('Không thể tải bài viết');
                router.push('/content/news');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id, router]);

    const handleDelete = () => {
        message.warning('Tính năng xóa đang được phát triển');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Spin size="large" tip="Đang tải nội dung bài viết..." />
            </div>
        );
    }

    if (!post) return null;

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/content/news">Tin bài & Kiến thức</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết bài viết</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space size="middle">
                        <Link href="/content/news">
                            <Button icon={<ArrowLeftOutlined />} type="text" size="large" />
                        </Link>
                        <div>
                            <Title level={2} style={{ margin: 0 }}>Chi tiết bài viết</Title>
                            <Text type="secondary">ID: #{id} • Đăng ngày {post.date}</Text>
                        </div>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        <Link href={`/content/news/${id}/edit`}>
                            <Button type="primary" icon={<EditOutlined />} size="large">
                                Chỉnh sửa
                            </Button>
                        </Link>
                        <Button danger icon={<DeleteOutlined />} size="large" onClick={handleDelete}>
                            Xóa bài viết
                        </Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} lg={16}>
                    <Card variant="borderless" bodyStyle={{ padding: '32px' }}>
                        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
                            <div>
                                <Tag color="processing" style={{ marginBottom: 16 }}>{post.category?.toUpperCase()}</Tag>
                                <Title level={2}>{post.title}</Title>
                                <Row gutter={24}>
                                    <Col>
                                        <Space>
                                            <Avatar size="small" icon={<UserOutlined />} />
                                            <Text type="secondary">{post.author}</Text>
                                        </Space>
                                    </Col>
                                    <Col>
                                        <Space>
                                            <CalendarOutlined style={{ color: '#8c8c8c' }} />
                                            <Text type="secondary">{post.date}</Text>
                                        </Space>
                                    </Col>
                                </Row>
                            </div>

                            {post.thumbnail && (
                                <div style={{ width: '100%', maxHeight: '400px', overflow: 'hidden', borderRadius: '12px' }}>
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            <Divider />

                            <div className="prose max-w-none">
                                <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                                    {post.content}
                                </Paragraph>
                            </div>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
                        <Card title="Thông tin xuất bản" variant="borderless">
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="Trạng thái">
                                    <Tag color={post.isActive ? 'success' : 'default'}>
                                        {post.isActive ? 'ĐÃ XUẤT BẢN' : 'BẢN NHÁP'}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Danh mục">
                                    <Space>
                                        <FolderOpenOutlined style={{ color: '#1890ff' }} />
                                        {post.category}
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Lượt xem">
                                    <Space>
                                        <EyeOutlined style={{ color: '#faad14' }} />
                                        {post.view || 0}
                                    </Space>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card title="Thống kê tương tác" variant="borderless">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title="Bình luận" value={12} prefix={<FileTextOutlined />} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Chia sẻ" value={45} prefix={<ArrowLeftOutlined rotate={135} />} />
                                </Col>
                            </Row>
                        </Card>

                        <div style={{ background: '#f0f5ff', padding: '20px', borderRadius: '12px', border: '1px solid #d6e4ff' }}>
                            <Title level={5} style={{ color: '#003a8c', marginTop: 0 }}>Ghi chú quản trị</Title>
                            <Text type="secondary" style={{ fontSize: '13px' }}>
                                Bài viết này đã được duyệt bởi Ban Biên Tập. Mọi thay đổi về nội dung sẽ được lưu lịch sử chỉnh sửa.
                            </Text>
                        </div>
                    </Space>
                </Col>
            </Row>
        </Space>
    );
}
