"use client";

import React, { useState, useEffect } from 'react';
import {
    Typography,
    Button,
    Space,
    Card,
    Tag,
    Breadcrumb,
    Row,
    Col,
    Modal,
    message,
    Descriptions,
    Statistic,
    Spin,
    Divider,
    Avatar
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
    UserOutlined,
    CalendarOutlined,
    FolderOpenOutlined,
    CheckCircleOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import communityService, { ForumTopic } from '@/services/community.service';

const { Title, Text, Paragraph } = Typography;

export default function ForumTopicDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [topic, setTopic] = useState<ForumTopic | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchTopic = async () => {
        try {
            setLoading(true);
            const data = await communityService.getForumTopic(Number(params.id));
            setTopic(data);
        } catch (error) {
            console.error('Failed to fetch topic', error);
            message.error('Không thể tải chi tiết chủ đề');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchTopic();
        }
    }, [params.id]);

    const handleDelete = () => {
        Modal.confirm({
            title: 'Xác nhận xóa chủ đề?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: 'Toàn bộ nội dung thảo luận và phản hồi sẽ bị gỡ bỏ vĩnh viễn khỏi hệ thống.',
            okText: 'Xóa ngay',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await communityService.deleteForumTopic(Number(params.id));
                    message.success('Đã xóa chủ đề thành công');
                    router.push('/community/forum');
                } catch (error) {
                    message.error('Lỗi khi xóa chủ đề');
                }
            },
        });
    };

    const handleApprove = async () => {
        try {
            await communityService.updateForumTopic(Number(params.id), { status: 'active' });
            message.success('Đã duyệt chủ đề thành công');
            fetchTopic();
        } catch (error) {
            message.error('Lỗi khi duyệt chủ đề');
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    if (!topic) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Text type="secondary">Không tìm thấy thông tin chủ đề.</Text>
                <div style={{ marginTop: '20px' }}>
                    <Link href="/community/forum">
                        <Button icon={<ArrowLeftOutlined />}>Quay lại danh sách</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/community/forum">Diễn đàn thảo luận</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết chủ đề</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col flex="auto">
                    <Space orientation="vertical" size={0}>
                        <Space>
                            <Link href="/community/forum">
                                <Button type="text" icon={<ArrowLeftOutlined />} />
                            </Link>
                            <Title level={2} style={{ margin: 0 }}>{topic.title}</Title>
                        </Space>
                        <Space split={<Divider type="vertical" />}>
                            <Space>
                                <UserOutlined />
                                <Text type="secondary">Tác giả: {topic.authorName}</Text>
                            </Space>
                            <Space>
                                <CalendarOutlined />
                                <Text type="secondary">{new Date(topic.createdAt).toLocaleString('vi-VN')}</Text>
                            </Space>
                            <Tag color={topic.status === 'active' ? 'success' : 'warning'}>
                                {topic.status === 'active' ? 'ĐANG HOẠT ĐỘNG' : 'ĐANG CHỜ'}
                            </Tag>
                        </Space>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        {topic.status !== 'active' && (
                            <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                onClick={handleApprove}
                                style={{ background: '#52c41a', borderColor: '#52c41a' }}
                            >
                                Duyệt chủ đề
                            </Button>
                        )}
                        <Link href={`/community/forum/${topic.id}/edit`}>
                            <Button icon={<EditOutlined />}>Chỉnh sửa</Button>
                        </Link>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={handleDelete}
                        >
                            Xóa chủ đề
                        </Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} lg={16}>
                    <Card
                        title={<Space><FileTextOutlined />Nội dung thảo luận</Space>}
                        variant="outlined"
                        className="shadow-sm"
                    >
                        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                            {topic.content}
                        </Paragraph>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
                        <Card title="Thống kê tương tác" variant="outlined" className="shadow-sm">
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Statistic
                                        title="Lượt xem"
                                        value={topic.views}
                                        prefix={<EyeOutlined />}
                                        valueStyle={{ color: '#1890ff' }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Phản hồi"
                                        value={topic._count?.replies || 0}
                                        prefix={<CommentOutlined />}
                                        valueStyle={{ color: '#52c41a' }}
                                    />
                                </Col>
                            </Row>
                        </Card>

                        <Card title="Thông tin chi tiết" variant="outlined" className="shadow-sm">
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label={<Space><FolderOpenOutlined />Danh mục</Space>}>
                                    <Tag color="blue">{topic.category}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><UserOutlined />ID Tác giả</Space>}>
                                    <Text code>{topic.authorId}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><ArrowLeftOutlined />ID Chủ đề</Space>}>
                                    <Text type="secondary">#{topic.id}</Text>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card title="Kiểm duyệt" variant="outlined" className="shadow-sm">
                            <Space orientation="vertical" style={{ width: '100% ' }}>
                                <Text>Trạng thái hiện tại: {topic.status === 'active' ? <Text type="success">Đã duyệt</Text> : <Text type="warning">Chờ duyệt</Text>}</Text>
                                <Button block>Yêu cầu chỉnh sửa</Button>
                                <Button danger block>Đánh dấu vi phạm</Button>
                            </Space>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </Space>
    );
}
