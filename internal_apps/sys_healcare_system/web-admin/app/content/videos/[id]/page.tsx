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
    Empty
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    YoutubeOutlined,
    ClockCircleOutlined,
    UserOutlined,
    EyeOutlined,
    LikeOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import contentService, { Video } from '@/services/content.service';

const { Title, Text, Paragraph } = Typography;

export default function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [video, setVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const videos = await contentService.getVideos();
                const found = videos.find(v => String(v.id) === id);
                if (found) {
                    setVideo(found);
                } else {
                    message.error('Không tìm thấy video');
                    router.push('/content/videos');
                }
            } catch (error) {
                console.error('Failed to fetch video', error);
                message.error('Lỗi khi tải dữ liệu video');
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [id, router]);

    const getEmbedUrl = (url: string) => {
        if (!url) return null;
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            if (match && match[2].length === 11) {
                return `https://www.youtube.com/embed/${match[2]}`;
            }
        }
        return null;
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Spin size="large" tip="Đang tải thông tin video..." />
            </div>
        );
    }

    if (!video) return null;

    const embedUrl = getEmbedUrl(video.url);

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/content/videos">Thư viện Video</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết video</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space size="middle">
                        <Link href="/content/videos">
                            <Button icon={<ArrowLeftOutlined />} type="text" size="large" />
                        </Link>
                        <div>
                            <Title level={2} style={{ margin: 0 }}>{video.title}</Title>
                            <Text type="secondary">ID: #{id} • Cập nhật ngày {video.date}</Text>
                        </div>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        <Link href={`/content/videos/${id}/edit`}>
                            <Button type="primary" icon={<EditOutlined />} size="large">
                                Chỉnh sửa
                            </Button>
                        </Link>
                        <Button danger icon={<DeleteOutlined />} size="large">
                            Xóa video
                        </Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} lg={16}>
                    <Card variant="outlined" bodyStyle={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ position: 'relative', background: '#000', paddingTop: '56.25%' }}>
                            {embedUrl ? (
                                <iframe
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    src={embedUrl}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#fff'
                                }}>
                                    <VideoCameraAddOutlined style={{ fontSize: '64px', opacity: 0.2 }} />
                                    <Paragraph style={{ color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>
                                        Hệ thống trình phát: {video.url}
                                    </Paragraph>
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card variant="outlined" style={{ marginTop: 24 }}>
                        <Title level={4}>Mô tả và Ghi chú</Title>
                        <Paragraph style={{ fontSize: '15px', color: '#595959' }}>
                            {video.description || 'Không có mô tả chi tiết cho video này.'}
                        </Paragraph>
                        <Divider />
                        <Space wrap>
                            {video.tags?.split(',').map((tag: string) => (
                                <Tag key={tag} variant="outlined">#{tag.trim()}</Tag>
                            )) || <Tag variant="outlined">#healthcare</Tag>}
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
                        <Card title="Thông tin chi tiết" variant="outlined">
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="Trạng thái">
                                    <Tag color={video.isActive ? 'success' : 'default'}>
                                        {video.isActive ? 'ĐÃ XUẤT BẢN' : 'TẠM ẨN'}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Tác giả">
                                    <Space>
                                        <UserOutlined style={{ color: '#1890ff' }} />
                                        {video.author}
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Thời lượng">
                                    <Space>
                                        <ClockCircleOutlined style={{ color: '#eb2f96' }} />
                                        {video.duration}
                                    </Space>
                                </Descriptions.Item>
                                <Descriptions.Item label="Ngày đăng">
                                    <Space>
                                        <CalendarOutlined style={{ color: '#52c41a' }} />
                                        {video.date}
                                    </Space>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card title="Chỉ số tương tác" variant="outlined">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title="Lượt xem" value={video.view || 0} prefix={<EyeOutlined />} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Yêu thích" value={342} prefix={<LikeOutlined />} valueStyle={{ color: '#cf1322' }} />
                                </Col>
                            </Row>
                        </Card>

                        <div style={{ background: '#fff7e6', padding: '20px', borderRadius: '12px', border: '1px solid #ffe7ba' }}>
                            <Title level={5} style={{ color: '#d46b08', marginTop: 0 }}>Lưu ý bản quyền</Title>
                            <Text type="secondary" style={{ fontSize: '13px' }}>
                                Video này thuộc quyền sở hữu của {video.author} và được cấp phép hiển thị trên nền tảng Healthcare SaaS. Vui lòng không tự ý sao chép.
                            </Text>
                        </div>
                    </Space>
                </Col>
            </Row>
        </Space>
    );
}

import { VideoCameraAddOutlined } from '@ant-design/icons';
