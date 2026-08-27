"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Typography,
    Card,
    Button,
    Tag,
    Modal,
    message,
    Row,
    Col,
    Space,
    Empty,
    Breadcrumb,
    Tooltip,
    Statistic,
    Divider
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    PlayCircleOutlined,
    ClockCircleOutlined,
    UserOutlined,
    VideoCameraOutlined,
    EyeOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import contentService, { Video } from '@/services/content.service';

const { Title, Text } = Typography;
const { Meta } = Card;

export default function VideosManagement() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const data = await contentService.getVideos();
            setVideos(data);
        } catch (error) {
            console.error('Failed to fetch videos', error);
            message.error('Không thể tải danh sách video');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleDelete = (video: Video) => {
        Modal.confirm({
            title: 'Xóa video khỏi hệ thống?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: `Bạn có chắc chắn muốn xóa video "${video.title}"? Hành động này sẽ gỡ video khỏi ứng dụng người dùng và không thể hoàn tác.`,
            okText: 'Xóa video',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await contentService.deleteVideo(video.id);
                    message.success('Đã xóa video thành công');
                    fetchVideos();
                } catch (error) {
                    message.error('Lỗi khi xóa video');
                }
            },
        });
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Thư viện Truyền thông</Breadcrumb.Item>
                <Breadcrumb.Item>Video & Livestream</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Thư viện Video</Title>
                    <Text type="secondary">Đăng tải và quản lý các video hướng dẫn, tin tức y tế và sự kiện trực tiếp</Text>
                </Col>
                <Col>
                    <Link href="/content/videos/create">
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Tải video mới lên
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f0f5ff' }}>
                        <Statistic
                            title="Tổng số Video"
                            value={videos.length}
                            prefix={<VideoCameraOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f6ffed' }}>
                        <Statistic
                            title="Đã xuất bản"
                            value={videos.filter(v => v.isActive).length}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#fff7e6' }}>
                        <Statistic
                            title="Lượt xem"
                            value={videos.reduce((acc, v) => acc + (v.view || 0), 0)}
                            valueStyle={{ color: '#faad14' }}
                            prefix={<EyeOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f9f0ff' }}>
                        <Statistic
                            title="Thời lượng (ước tính)"
                            value={videos.length * 15}
                            suffix="phút"
                            prefix={<ClockCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            {loading ? (
                <Row gutter={[24, 24]}>
                    {[1, 2, 3].map(i => (
                        <Col xs={24} sm={12} lg={8} key={i}>
                            <Card loading variant="outlined" bodyStyle={{ padding: '0px' }} />
                        </Col>
                    ))}
                </Row>
            ) : videos.length > 0 ? (
                <Row gutter={[24, 24]}>
                    {videos.map(video => (
                        <Col xs={24} sm={12} lg={8} key={video.id}>
                            <Card
                                hoverable
                                variant="outlined"
                                bodyStyle={{ padding: '16px' }}
                                cover={
                                    <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#000', borderRadius: '8px 8px 0 0' }}>
                                        <img
                                            alt={video.title}
                                            src={video.thumbnail || '/img/placeholder.png'}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            fontSize: '48px',
                                            color: 'rgba(255,255,255,0.8)'
                                        }}>
                                            <PlayCircleOutlined />
                                        </div>
                                        <div style={{ position: 'absolute', top: 12, left: 12 }}>
                                            <Tag color={video.isActive ? 'success' : 'default'} variant="outlined" style={{ borderRadius: '4px' }}>
                                                {video.isActive ? 'ĐÃ XUẤT BẢN' : 'TẠM ẨN'}
                                            </Tag>
                                        </div>
                                        {video.duration && (
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 12,
                                                right: 12,
                                                background: 'rgba(0,0,0,0.6)',
                                                color: '#fff',
                                                padding: '2px 8px',
                                                borderRadius: 4,
                                                fontSize: '11px',
                                                fontWeight: 'bold'
                                            }}>
                                                {video.duration}
                                            </div>
                                        )}
                                    </div>
                                }
                                actions={[
                                    <Tooltip title="Chỉnh sửa nội dung" key="edit">
                                        <Link href={`/content/videos/${video.id}/edit`}>
                                            <EditOutlined style={{ color: '#faad14' }} />
                                        </Link>
                                    </Tooltip>,
                                    <Tooltip title="Xóa video" key="delete">
                                        <DeleteOutlined
                                            style={{ color: '#ff4d4f' }}
                                            onClick={() => handleDelete(video)}
                                        />
                                    </Tooltip>
                                ]}
                            >
                                <Meta
                                    title={<Text strong style={{ display: 'block', fontSize: '15px' }} ellipsis={{ tooltip: video.title }}>{video.title}</Text>}
                                    description={
                                        <Space orientation="vertical" size={12} style={{ display: 'flex', marginTop: 8 }}>
                                            <Space split={<Divider type="vertical" style={{ margin: 0, height: '10px' }} />} style={{ fontSize: '12px' }}>
                                                <Space size={4}>
                                                    <UserOutlined style={{ fontSize: '12px', color: '#bfbfbf' }} />
                                                    <Text type="secondary">{video.author}</Text>
                                                </Space>
                                                <Space size={4}>
                                                    <ClockCircleOutlined style={{ fontSize: '12px', color: '#bfbfbf' }} />
                                                    <Text type="secondary">{video.date}</Text>
                                                </Space>
                                            </Space>
                                        </Space>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Thư viện hiện chưa có video nào."
                    style={{ padding: '64px 0', background: '#fff', borderRadius: '12px' }}
                >
                    <Link href="/content/videos/create">
                        <Button type="primary">Tải lên video đầu tiên</Button>
                    </Link>
                </Empty>
            )}
        </Space>
    );
}
