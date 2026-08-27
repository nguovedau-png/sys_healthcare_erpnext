"use client";

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Avatar, Input, Button, Space, Tag, List, Badge, Carousel, Divider, Tooltip, Modal, FloatButton, message, Tabs, Spin } from 'antd';
import { 
    FireOutlined, 
    GlobalOutlined, 
    MessageOutlined, 
    ShareAltOutlined, 
    HeartOutlined, 
    HeartFilled, 
    BookOutlined, 
    BookFilled,
    TrophyOutlined,
    SearchOutlined,
    BellOutlined,
    UserOutlined,
    HistoryOutlined,
    RightOutlined,
    GiftOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import router from 'next/router';
import HubAvatar, { BadgeTier } from '@/components/hub/HubAvatar';
import gamificationService, { LeaderboardEntry } from '@/services/gamification.service';
import contentService from '@/services/content.service';

const { Title, Text, Paragraph } = Typography;

// --- MOCK DATA FOR FALLBACK ---
const BANNERS = [
    { id: 1, title: 'Hội nghị Tim mạch Quốc tế 2026', subtitle: 'Hành trình 20 năm phát triển y tế Việt Nam', color: '#003a8c', image: 'https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=1200&h=400' },
    { id: 2, title: 'Cập nhật Phác đồ Điều trị Tiểu đường', subtitle: 'Hướng dẫn mới nhất từ ADA/EASD 2026', color: '#092b00', image: 'https://images.unsplash.com/photo-1581594658553-4358a6680375?auto=format&fit=crop&q=80&w=1200&h=400' },
];

const HUB_COURSES = [
    {
        id: 'c-1',
        title: 'Cập nhật điều trị Tăng huyết áp 2026',
        provider: 'Hội Tim mạch học Việt Nam',
        points: 500,
        image: 'https://images.unsplash.com/photo-1505751172107-573225a94791?auto=format&fit=crop&q=80&w=400&h=250',
        duration: '4 tuần'
    },
    {
        id: 'c-2',
        title: 'Kỹ năng tư vấn thuốc chuyên sâu cho Dược sĩ',
        provider: 'Đại học Y Dược',
        points: 300,
        image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400&h=250',
        duration: '2 tuần'
    }
];

const HUB_COMMUNITY_POSTS: { id: string, author: string, avatar: string, content: string, likes: number, comments: number, time: string, tier: BadgeTier, role: string }[] = [
    {
        id: 'cp-1',
        author: 'BS. Trần Văn Khải',
        avatar: 'https://i.pravatar.cc/150?img=21',
        content: 'Mọi người có kinh nghiệm xử lý ca lâm sàng bệnh nhân bị kháng kháng sinh này không ạ?',
        likes: 12,
        comments: 8,
        time: '10 phút trước',
        tier: 'silver',
        role: 'Bác sĩ nội trú'
    },
    {
        id: 'cp-2',
        author: 'DS. Mai Thu Hà',
        avatar: 'https://i.pravatar.cc/150?img=25',
        content: 'Dòng sản phẩm mới của MediJoint+ có vẻ đang nhận được phản hồi rất tốt từ bệnh nhân xương khớp.',
        likes: 24,
        comments: 5,
        time: '45 phút trước',
        tier: 'bronze',
        role: 'Dược sĩ'
    }
];

export default function HubPortalPage() {
    const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);
    const [news, setNews] = useState<any[]>([]);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Show welcome popup for the first time
        const hasVisited = localStorage.getItem('hub_visited');
        if (!hasVisited) {
            setIsWelcomeModalVisible(true);
            localStorage.setItem('hub_visited', 'true');
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [postsRes, leaderboardData] = await Promise.all([
                contentService.getPosts(1, 10),
                gamificationService.getLeaderboard()
            ]);
            
            // Format API News to match UI expectation
            const formattedNews = (postsRes.data || []).map((p: any) => ({
                id: p.id || Math.random().toString(),
                title: p.title || 'Bài viết chưa có tiêu đề',
                category: p.category || 'Tin tức chung',
                author: p.author || 'Quản trị viên',
                time: 'Vừa xong',
                likes: p.likes || 0,
                comments: p.comments || 0,
                isLiked: false,
                isSaved: false,
                image: p.image || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800&h=450',
            }));

            // Format API Leaderboard to match UI expectation
            const formattedLeaderboard = leaderboardData.map((l, index) => ({
                name: l.userName || 'Bác sĩ ẩn danh',
                points: l.points || 0,
                rank: index + 1,
                avatar: `https://i.pravatar.cc/150?img=${11 + index}`, // Fallback API avatar
                tier: l.level?.toLowerCase() || 'none',
                role: 'Chuyên gia y tế',
                hospital: 'Thành viên Hub'
            }));

            setNews(formattedNews.length > 0 ? formattedNews : getFallbackNews());
            setLeaderboard(formattedLeaderboard.length > 0 ? formattedLeaderboard : getFallbackLeaderboard());

        } catch (error) {
            console.error('Failed to fetch hub data:', error);
            // On API failure, use graceful fallback data
            setNews(getFallbackNews());
            setLeaderboard(getFallbackLeaderboard());
        } finally {
            setLoading(false);
        }
    };

    const getFallbackNews = () => [
        {
            id: 'news-1',
            title: 'Đột phá trong điều trị Ung thư Phổi bằng liệu pháp miễn dịch mới',
            category: 'Ung thư học',
            author: 'GS.TS Nguyễn Văn Hiển',
            time: '1 giờ trước',
            likes: 156,
            comments: 24,
            isLiked: false,
            isSaved: true,
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800&h=450',
        },
        {
            id: 'news-2',
            title: 'Xu hướng ứng dụng AI trong chẩn đoán hình ảnh tại các bệnh viện tuyến đầu',
            category: 'Công nghệ Y tế',
            author: 'ThS. Lê Minh Tâm',
            time: '3 giờ trước',
            likes: 89,
            comments: 12,
            isLiked: true,
            isSaved: false,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450',
        }
    ];

    const getFallbackLeaderboard = () => [
        { name: 'BS. Lê Trọng Hưng', points: 12450, rank: 1, avatar: 'https://i.pravatar.cc/150?img=11', tier: 'diamond', role: 'Bác sĩ chuyên khoa II', hospital: 'Bệnh viện Bạch Mai' },
        { name: 'DS. Nguyễn Thanh Tùng', points: 11200, rank: 2, avatar: 'https://i.pravatar.cc/150?img=12', tier: 'gold', role: 'Dược sĩ đại học', hospital: 'Nhà thuốc Long Châu' },
        { name: 'BS. Phạm Mỹ Linh', points: 9850, rank: 3, avatar: 'https://i.pravatar.cc/150?img=13', tier: 'silver', role: 'Bác sĩ nội trú', hospital: 'Bệnh viện Chợ Rẫy' },
    ];

    const toggleLike = (id: string) => {
        setNews(prev => prev.map(item => 
            item.id === id ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 } : item
        ));
    };

    const toggleSave = (id: string) => {
        setNews(prev => prev.map(item => 
            item.id === id ? { ...item, isSaved: !item.isSaved } : item
        ));
        message.success(news.find(n => n.id === id)?.isSaved ? 'Đã bỏ lưu tin tức' : 'Đã lưu tin tức vào thư mục của bạn');
    };

    return (
        <div style={{ background: '#f0f2f5', minHeight: '100vh', paddingBottom: 64 }}>
            {/* Header / Search Bar Area */}
            <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '12px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
                <Row align="middle" gutter={24}>
                    <Col xs={0} sm={4}>
                        <Title level={4} style={{ margin: 0, color: '#1890ff' }}>HUB PORTAL</Title>
                    </Col>
                    <Col xs={18} sm={14}>
                        <Input 
                            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} 
                            placeholder="Tìm kiếm tin tức, chủ đề y khoa, khóa học..." 
                            size="large"
                            style={{ borderRadius: 24 }}
                        />
                    </Col>
                    <Col xs={6} sm={6} style={{ textAlign: 'right' }}>
                        <Space size="middle">
                            <Badge count={5} size="small">
                                <Button shape="circle" icon={<BellOutlined />} />
                            </Badge>
                            <Avatar icon={<UserOutlined />} src="https://i.pravatar.cc/150?img=10" />
                        </Space>
                    </Col>
                </Row>
            </div>

            <div style={{ maxWidth: 1200, margin: '24px auto', padding: '0 16px' }}>
                <Row gutter={24}>
                    {/* Left Sidebar: Categories & Personal */}
                    <Col xs={0} lg={5}>
                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                            <Card bodyStyle={{ padding: 12 }} style={{ borderRadius: 12 }}>
                                <Text strong style={{ fontSize: 12, color: '#8c8c8c', textTransform: 'uppercase' }}>Khám phá</Text>
                                <List 
                                    size="small"
                                    dataSource={[
                                        { icon: <FireOutlined style={{ color: '#ff4d4f' }} />, label: 'Tin nổi bật' },
                                        { icon: <BookOutlined style={{ color: '#52c41a' }} />, label: 'Khóa học của tôi' },
                                        { icon: <GlobalOutlined style={{ color: '#1890ff' }} />, label: 'Tin thế giới' },
                                        { icon: <HistoryOutlined style={{ color: '#722ed1' }} />, label: 'Đã xem gần đây' },
                                        { icon: <BookOutlined style={{ color: '#faad14' }} />, label: 'Thư mục đã lưu' }
                                    ]}
                                    renderItem={item => (
                                        <List.Item style={{ border: 'none', padding: '12px 4px', cursor: 'pointer' }}>
                                            <Space>{item.icon} <Text>{item.label}</Text></Space>
                                        </List.Item>
                                    )}
                                />
                            </Card>

                            <Card title="Chuyên khoa" size="small" style={{ borderRadius: 12 }}>
                                <Space wrap>
                                    <Tag>Tim mạch</Tag>
                                    <Tag>Nội tiết</Tag>
                                    <Tag>Hô hấp</Tag>
                                    <Tag>Da liễu</Tag>
                                    <Tag>Thần kinh</Tag>
                                </Space>
                            </Card>

                            <Card bodyStyle={{ padding: 16, background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', color: '#fff', borderRadius: 12 }}>
                                <Statistic 
                                    title={<Text style={{ color: 'rgba(255,255,255,0.8)' }}>Điểm Hub hiện có</Text>}
                                    value={2450}
                                    valueStyle={{ color: '#fff', fontWeight: 700 }}
                                    suffix={<GiftOutlined />}
                                />
                                <Button ghost size="small" block style={{ marginTop: 12 }} onClick={() => router.push('/hub/rewards')}>Đổi quà ngay</Button>
                            </Card>
                        </Space>
                    </Col>

                    {/* Main Content: Banners & Feed Tabs */}
                    <Col xs={24} lg={13}>
                        <Carousel autoplay autoplaySpeed={4000} style={{ marginBottom: 24, borderRadius: 12, overflow: 'hidden' }}>
                            {BANNERS.map(banner => (
                                <div key={banner.id}>
                                    <div style={{ 
                                        height: 200, 
                                        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${banner.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        padding: '0 40px',
                                        color: '#fff'
                                    }}>
                                        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, textTransform: 'uppercase' }}>Sự kiện nổi bật</Text>
                                        <Title level={3} style={{ color: '#fff', margin: '8px 0' }}>{banner.title}</Title>
                                        <Text style={{ color: '#fff' }}>{banner.subtitle}</Text>
                                    </div>
                                </div>
                            ))}
                        </Carousel>

                        <Tabs 
                            defaultActiveKey="1" 
                            size="large"
                            items={[
                                {
                                    key: '1',
                                    label: 'Bảng tin Y khoa',
                                    children: (
                                        <Spin spinning={loading}>
                                            <Space direction="vertical" size={16} style={{ width: '100%', marginTop: 8 }}>
                                                {news.map(item => (
                                                    <Card 
                                                        key={item.id} 
                                                        bodyStyle={{ padding: 0 }} 
                                                        style={{ borderRadius: 12, overflow: 'hidden', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                                                    >
                                                        <Row>
                                                            <Col xs={24} sm={8}>
                                                                <div style={{ height: '100%', minHeight: 180, backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                                            </Col>
                                                            <Col xs={24} sm={16} style={{ padding: 16 }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                                                    <Tag color="blue" bordered={false}>{item.category}</Tag>
                                                                    <Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text>
                                                                </div>
                                                                <Link href={`/hub/news/${item.id}`}>
                                                                    <Title level={5} style={{ marginBottom: 12, cursor: 'pointer' }}>{item.title}</Title>
                                                                </Link>
                                                                <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ marginBottom: 16 }}>
                                                                    Nghiên cứu mới nhất mang lại kết quả khả quan cho bệnh nhân y khoa chuyên sâu...
                                                                </Paragraph>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <Space size="large">
                                                                        <Space style={{ cursor: 'pointer' }} onClick={() => toggleLike(item.id)}>
                                                                            {item.isLiked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                                                                            <Text size="small">{item.likes}</Text>
                                                                        </Space>
                                                                        <Space>
                                                                            <MessageOutlined />
                                                                            <Text size="small">{item.comments}</Text>
                                                                        </Space>
                                                                        <ShareAltOutlined style={{ cursor: 'pointer' }} />
                                                                    </Space>
                                                                    <div onClick={() => toggleSave(item.id)} style={{ cursor: 'pointer' }}>
                                                                        {item.isSaved ? <BookFilled style={{ color: '#1890ff' }} /> : <BookOutlined />}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                ))}
                                            </Space>
                                        </Spin>
                                    )
                                },
                                {
                                    key: '2',
                                    label: 'Khóa học Hub',
                                    children: (
                                        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                                            {HUB_COURSES.map(course => (
                                                <Col xs={24} sm={12} key={course.id}>
                                                    <Card 
                                                        hoverable 
                                                        cover={<img alt={course.title} src={course.image} style={{ height: 140, objectFit: 'cover' }} />}
                                                        bodyStyle={{ padding: 12 }}
                                                        style={{ borderRadius: 12, overflow: 'hidden' }}
                                                    >
                                                        <Title level={5} style={{ fontSize: 14, marginBottom: 8 }}>{course.title}</Title>
                                                        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>{course.provider}</Text>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Tag color="orange">+{course.points} CME</Tag>
                                                            <Button type="primary" size="small">Đăng ký học</Button>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    )
                                },
                                {
                                    key: '3',
                                    label: 'Cộng đồng Hub',
                                    children: (
                                        <div style={{ marginTop: 16 }}>
                                            <Card style={{ marginBottom: 16, borderRadius: 12 }}>
                                                <Space align="start" style={{ width: '100%' }}>
                                                    <Avatar icon={<UserOutlined />} />
                                                    <div style={{ width: '100%', flex: 1 }}>
                                                        <Input.TextArea placeholder="Chia sẻ thảo luận cùng đồng nghiệp trong Hub..." autoSize={{ minRows: 2 }} style={{ borderRadius: 8 }} />
                                                        <div style={{ textAlign: 'right', marginTop: 12 }}>
                                                            <Button type="primary" shape="round">Đăng bài</Button>
                                                        </div>
                                                    </div>
                                                </Space>
                                            </Card>
                                            <List
                                                dataSource={HUB_COMMUNITY_POSTS}
                                                renderItem={post => (
                                                    <Card style={{ marginBottom: 12, borderRadius: 12 }} bodyStyle={{ padding: 16 }}>
                                                        <Space align="start" style={{ marginBottom: 12 }}>
                                                            <HubAvatar 
                                                                src={post.avatar} 
                                                                name={post.author} 
                                                                tier={post.tier} 
                                                                role={post.role} 
                                                            />
                                                            <div>
                                                                <Text strong>{post.author}</Text>
                                                                <br />
                                                                <Text type="secondary" style={{ fontSize: 12 }}>{post.time}</Text>
                                                            </div>
                                                        </Space>
                                                        <Paragraph>{post.content}</Paragraph>
                                                        <Divider style={{ margin: '12px 0' }} />
                                                        <Space size="large">
                                                            <Space><HeartOutlined /> {post.likes}</Space>
                                                            <Space><MessageOutlined /> {post.comments}</Space>
                                                            <ShareAltOutlined />
                                                        </Space>
                                                    </Card>
                                                )}
                                            />
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </Col>

                    {/* Right Sidebar: Leaderboard & Hot Keywords */}
                    <Col xs={0} lg={6}>
                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                            <Spin spinning={loading}>
                                <Card 
                                    title={<span><TrophyOutlined style={{ color: '#faad14' }} /> Bảng xếp hạng Hub</span>} 
                                    size="small" 
                                    style={{ borderRadius: 12 }}
                                    extra={<Link href="#" style={{ fontSize: 12 }}>Xem tất cả</Link>}
                                >
                                    <Tabs size="small" defaultActiveKey="week" items={[
                                        { label: 'Tuần này', key: 'week' },
                                        { label: 'Tháng này', key: 'month' }
                                    ]} />
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={leaderboard}
                                        renderItem={(item: any) => (
                                            <List.Item style={{ padding: '12px 0' }}>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Badge count={item.rank} color={item.rank===1?'#fadb14':item.rank===2?'#d9d9d9':'#d48806'} offset={[0, 32]}>
                                                            <HubAvatar 
                                                                src={item.avatar} 
                                                                name={item.name} 
                                                                tier={item.tier} 
                                                                role={item.role} 
                                                                hospital={item.hospital} 
                                                                points={item.points} 
                                                            />
                                                        </Badge>
                                                    }
                                                    title={<Text strong>{item.name}</Text>}
                                                    description={<Text type="secondary" style={{ fontSize: 12 }}>{item.points.toLocaleString()} điểm</Text>}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Spin>

                            {/* Sponsor / Brand Zone */}
                            <Card title="Góc Nhà Tài Trợ" size="small" style={{ borderRadius: 12, border: '1px solid #bae0ff' }} headStyle={{ background: '#e6f7ff', borderBottom: 'none' }}>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <div style={{ padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #f0f0f0', textAlign: 'center', cursor: 'pointer' }}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Abbott_Laboratories_logo.svg/1200px-Abbott_Laboratories_logo.svg.png" alt="Abbott" style={{ height: 30, objectFit: 'contain', marginBottom: 8 }} />
                                        <Text strong style={{ display: 'block', fontSize: 13 }}>Hub Similac Dinh Dưỡng Nhi</Text>
                                        <Text type="secondary" style={{ fontSize: 11 }}>Khám phá bài học & nhận quà</Text>
                                    </div>
                                    <div style={{ padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #f0f0f0', textAlign: 'center', cursor: 'pointer' }}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sanofi_logo.svg/2560px-Sanofi_logo.svg.png" alt="Sanofi" style={{ height: 30, objectFit: 'contain', marginBottom: 8 }} />
                                        <Text strong style={{ display: 'block', fontSize: 13 }}>Cộng đồng Tim Mạch Sanofi</Text>
                                        <Text type="secondary" style={{ fontSize: 11 }}>Cập nhật phác đồ mới nhất</Text>
                                    </div>
                                </Space>
                            </Card>

                            <Card title="Từ khóa tìm kiếm phổ biến" size="small" style={{ borderRadius: 12 }}>
                                <Space wrap>
                                    <Button size="small" shape="round">#CME_Online</Button>
                                    <Button size="small" shape="round">#DieuTriTieuDuong</Button>
                                    <Button size="small" shape="round">#Vaccine2026</Button>
                                    <Button size="small" shape="round">#KhangSinhDo</Button>
                                </Space>
                            </Card>

                            <Card title="Thông báo mới nhất" size="small" style={{ borderRadius: 12 }}>
                                <List
                                    size="small"
                                    dataSource={[
                                        'Bạn vừa nhận được 50 điểm từ việc xem tin tức.',
                                        'BS. Hưng vừa phản hồi bình luận của bạn.',
                                        'Đã có bài viết mới về Chuyên khoa Nội tiết.'
                                    ]}
                                    renderItem={item => <List.Item style={{ fontSize: 12 }}><Text ellipsis>{item}</Text></List.Item>}
                                />
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>

            {/* Welcome Animation / Popup */}
            <Modal
                open={isWelcomeModalVisible}
                onCancel={() => setIsWelcomeModalVisible(false)}
                footer={null}
                centered
                closable={false}
                bodyStyle={{ padding: 0, borderRadius: 16, overflow: 'hidden' }}
            >
                <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)', padding: '40px 24px', color: '#fff' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                    <Title level={2} style={{ color: '#fff', margin: 0 }}>Chào mừng bạn đến với Hub!</Title>
                    <Paragraph style={{ color: 'rgba(255,255,255,0.8)', marginTop: 12 }}>
                        Không gian đặc quyền dành cho các chuyên gia y tế hàng đầu. 
                        Cập nhật tin tức, tích điểm đổi quà và giao lưu cùng đồng nghiệp ngay hôm nay.
                    </Paragraph>
                    <Button type="primary" size="large" onClick={() => setIsWelcomeModalVisible(false)} style={{ background: '#fff', color: '#1890ff', border: 'none', fontWeight: 600, height: 48, padding: '0 40px', marginTop: 24 }}>
                        BẮT ĐẦU KHÁM PHÁ
                    </Button>
                </div>
            </Modal>

            <FloatButton.Group trigger="hover" style={{ right: 24 }} icon={<MessageOutlined />}>
                <FloatButton tooltip={<div>Trò chuyện cùng AI Medical</div>} />
                <FloatButton.BackTop visibilityHeight={400} />
            </FloatButton.Group>
        </div>
    );
}

function Statistic({ title, value, valueStyle, suffix, prefix }: any) {
    return (
        <div>
            <div style={{ marginBottom: 4 }}>{title}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                {prefix}
                <span style={valueStyle}>{value}</span>
                <span style={{ fontSize: 14 }}>{suffix}</span>
            </div>
        </div>
    );
}
