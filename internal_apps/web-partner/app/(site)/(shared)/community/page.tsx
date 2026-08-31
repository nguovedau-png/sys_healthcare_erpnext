"use client";
import React, { useState, useEffect } from 'react';
import { Card, Tabs, Avatar, Typography, Input, Button, Space, Divider, Row, Col, List, Tag, Spin } from 'antd';
import { MessageOutlined, ShareAltOutlined, HeartOutlined, HeartFilled, PictureOutlined, TeamOutlined, UserOutlined, GlobalOutlined, SmileOutlined, RiseOutlined } from '@ant-design/icons';
import communityService from '@/services/community.service';

const { Title, Text, Paragraph } = Typography;

const getFallbackPosts = () => [
    {
        id: 1,
        author: 'Nguyễn Thanh Tùng',
        role: 'Chủ nhà thuốc Á Châu',
        avatar: 'https://i.pravatar.cc/150?img=12',
        time: '2 giờ trước',
        content: 'Mọi người cho em hỏi, dạo này tình hình khan hiếm thuốc huyết áp Amlodipin ở các khu vực khác thế nào ạ? Bên em đang bị đứt hàng liên tục từ đầu tuần đến giờ.',
        likes: 24,
        comments: 5,
        isLiked: false
    },
    {
        id: 2,
        author: 'BS. Lê Trọng Hưng',
        role: 'Giảng viên',
        avatar: 'https://i.pravatar.cc/150?img=14',
        time: '5 giờ trước',
        content: 'Cập nhật phác đồ điều trị tiểu đường type 2 mới nhất từ Bộ Y Tế. Các bạn nhà thuốc lưu ý khi tư vấn bệnh nhân nhé. Link tài liệu đính kèm bên dưới.',
        likes: 156,
        comments: 42,
        isLiked: true
    }
];

export default function CommunityPage() {
    const [posts, setPosts] = useState(getFallbackPosts());
    const [newPostContent, setNewPostContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const data = await communityService.getForumTopics();
                if (data && data.length > 0) {
                    const mapped = data.map((t: any) => ({
                        id: t.id, author: t.author?.name || 'Thành viên', role: t.category || 'Cộng đồng',
                        avatar: `https://i.pravatar.cc/150?img=${t.id % 20}`, time: t.createdAt || 'Gần đây',
                        content: t.content || t.title, likes: t.likes || 0, comments: t.comments || 0, isLiked: false
                    }));
                    setPosts(mapped);
                }
            } catch (e) { console.error('Failed to fetch community posts:', e); }
            finally { setLoading(false); }
        };
        fetchPosts();
    }, []);

    const handleCreatePost = () => {
        if (!newPostContent.trim()) return;
        const newPost = {
            id: Date.now(),
            author: 'Bạn (Người dùng)',
            role: 'Dược sĩ',
            avatar: 'https://i.pravatar.cc/150?img=10',
            time: 'Vừa xong',
            content: newPostContent,
            likes: 0,
            comments: 0,
            isLiked: false
        };
        setPosts([newPost, ...posts]);
        setNewPostContent('');
    };

    const toggleLike = (postId: number) => {
        setPosts(posts.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    isLiked: !p.isLiked,
                    likes: p.isLiked ? p.likes - 1 : p.likes + 1
                };
            }
            return p;
        }));
    };

    return (
        <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <TeamOutlined style={{ color: '#1890ff' }} /> Cộng đồng Nhà thuốc
                </Title>
                <Text type="secondary">Nơi giao lưu, chia sẻ kinh nghiệm, cập nhật tin tức và tìm kiếm cơ hội việc làm.</Text>
            </div>

            <Row gutter={24}>
                <Col xs={24} md={16}>
                    <Card bodyStyle={{ padding: 0 }} style={{ borderRadius: 12, overflow: 'hidden' }}>
                        <Tabs
                            defaultActiveKey="1"
                            size="large"
                            items={[
                                {
                                    key: '1',
                                    label: <span><GlobalOutlined /> Bảng tin</span>,
                                    children: (
                                        <div style={{ padding: 24, background: '#f5f5f5' }}>
                                            {/* Create Post Box */}
                                            <Card style={{ marginBottom: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                                <Space align="start" style={{ width: '100%' }}>
                                                    <Avatar size="large" icon={<UserOutlined />} src="https://i.pravatar.cc/150?img=10" />
                                                    <div style={{ width: '100%', flex: 1 }}>
                                                        <Input.TextArea
                                                            value={newPostContent}
                                                            onChange={(e) => setNewPostContent(e.target.value)}
                                                            placeholder="Bạn đang nghĩ gì? Hãy chia sẻ kiến thức hoặc đặt câu hỏi..."
                                                            autoSize={{ minRows: 2, maxRows: 6 }}
                                                            style={{ border: 'none', backgroundColor: '#f0f2f5', borderRadius: 8, padding: 12 }}
                                                        />
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
                                                            <Button type="text" icon={<PictureOutlined />}>Đính kèm Ảnh/Video</Button>
                                                            <Button type="primary" shape="round" onClick={handleCreatePost}>Đăng bài</Button>
                                                        </div>
                                                    </div>
                                                </Space>
                                            </Card>

                                            {/* Feed / Posts List */}
                                            <List
                                                dataSource={posts}
                                                renderItem={post => (
                                                    <Card style={{ marginBottom: 16, borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }} bodyStyle={{ padding: 20 }}>
                                                        <Card.Meta
                                                            avatar={<Avatar src={post.avatar} size={48} />}
                                                            title={
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                                    <Text strong>{post.author}</Text>
                                                                    <Tag color="blue" bordered={false} style={{ margin: 0 }}>{post.role}</Tag>
                                                                </div>
                                                            }
                                                            description={<Text type="secondary" style={{ fontSize: 12 }}>{post.time}</Text>}
                                                        />
                                                        <Paragraph style={{ marginTop: 16, fontSize: 15, lineHeight: 1.6 }}>
                                                            {post.content}
                                                        </Paragraph>

                                                        <Divider style={{ margin: '12px 0' }} />

                                                        <div style={{ display: 'flex', gap: 24 }}>
                                                            <Button
                                                                type="text"
                                                                icon={post.isLiked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                                                                onClick={() => toggleLike(post.id)}
                                                                style={{ color: post.isLiked ? '#ff4d4f' : 'inherit' }}
                                                            >
                                                                {post.likes} Thích
                                                            </Button>
                                                            <Button type="text" icon={<MessageOutlined />}>
                                                                {post.comments} Bình luận
                                                            </Button>
                                                            <Button type="text" icon={<ShareAltOutlined />}>
                                                                Chia sẻ
                                                            </Button>
                                                        </div>
                                                    </Card>
                                                )}
                                            />
                                        </div>
                                    )
                                },
                                {
                                    key: '2',
                                    label: <span><SmileOutlined /> Giải trí</span>,
                                    children: (
                                        <div style={{ padding: 40, textAlign: 'center' }}>
                                            <SmileOutlined style={{ fontSize: 64, color: '#faad14', marginBottom: 16 }} />
                                            <Title level={4}>Góc Xả Stress</Title>
                                            <Text type="secondary">Nơi tổng hợp các mẩu truyện cười, meme dược sĩ và những câu chuyện dở khóc dở cười ở quầy thuốc.</Text>
                                        </div>
                                    )
                                },
                                {
                                    key: '3',
                                    label: <span><RiseOutlined /> Việc làm</span>,
                                    children: (
                                        <div style={{ padding: 40, textAlign: 'center' }}>
                                            <RiseOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 16 }} />
                                            <Title level={4}>Tuyển dụng & Tìm việc</Title>
                                            <Text type="secondary">Chuyên trang tuyển dụng Dược sĩ, Quản lý nhà thuốc và Trình dược viên.</Text>
                                            <br /><br />
                                            <Button type="primary">Truy cập Trang Tuyển Dụng</Button>
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    {/* Right Sidebar Widget */}
                    <Card title="Góc nổi bật" size="small" style={{ marginBottom: 16, borderRadius: 8 }}>
                        <List
                            size="small"
                            dataSource={[
                                'Cuộc thi: Dược sĩ nhí nhảnh 2026',
                                'Luật Dược sửa đổi: 10 điểm cần lưu ý',
                                'Workshop: Kỹ năng chốt sale online'
                            ]}
                            renderItem={item => <List.Item><Typography.Link>{item}</Typography.Link></List.Item>}
                        />
                    </Card>

                    <Card title="Thành viên năng nổ" size="small" style={{ borderRadius: 8 }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={posts.slice(0, 5)}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href="#">{item.author}</a>}
                                        description={`${item.likes} lượt thích`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}