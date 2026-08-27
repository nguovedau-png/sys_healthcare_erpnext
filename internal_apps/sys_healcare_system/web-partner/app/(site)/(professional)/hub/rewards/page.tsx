"use client";

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Avatar, Button, Space, Tag, List, Statistic, Table, Modal, Result, Divider, Progress, Spin } from 'antd';
import { 
    GiftOutlined, 
    HistoryOutlined, 
    TrophyOutlined, 
    StarFilled, 
    CheckCircleOutlined,
    ShoppingOutlined,
    ArrowLeftOutlined,
    FireOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import gamificationService from '@/services/gamification.service';

const { Title, Text, Paragraph } = Typography;

// --- FALLBACK DATA ---
const getFallbackRewards = () => [
    { id: 1, name: 'Voucher VinID 500k', points: 5000, category: 'Voucher', image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&q=80&w=200&h=200', stock: 15 },
    { id: 2, name: 'Bình giữ nhiệt Lock&Lock', points: 2500, category: 'Đồ dùng', image: 'https://images.unsplash.com/photo-1602143399827-7211ec3a61f2?auto=format&fit=crop&q=80&w=200&h=200', stock: 42 },
    { id: 3, name: 'Khóa học CME Nội khoa nâng cao', points: 3000, category: 'Học thuật', image: 'https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=200&h=200', stock: 99 },
    { id: 4, name: 'Sạc dự phòng Anker 10000mAh', points: 4000, category: 'Phụ kiện', image: 'https://images.unsplash.com/photo-1619948307046-20c9e196c56e?auto=format&fit=crop&q=80&w=200&h=200', stock: 8 },
];

const getFallbackHistory = () => [
    { id: 101, action: 'Làm trắc nghiệm: Đột phá Ung thư Phổi', change: '+100', time: 'Hôm nay, 16:00', type: 'earn' },
    { id: 102, action: 'Xem bài viết: AI trong Y tế', change: '+50', time: 'Hôm nay, 14:20', type: 'earn' },
    { id: 103, action: 'Đổi Voucher VinID 500k', change: '-5000', time: '25/04/2026', type: 'redeem' },
    { id: 104, action: 'Thưởng kích hoạt Hub', change: '+500', time: '24/04/2026', type: 'earn' },
];

export default function HubRewardsPage() {
    const router = useRouter();
    const [selectedReward, setSelectedReward] = useState<any>(null);
    const [isRedeemModalVisible, setIsRedeemModalVisible] = useState(false);
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [userPoints, setUserPoints] = useState(2450);
    const [rewards, setRewards] = useState<any[]>(getFallbackRewards());
    const [pointHistory, setPointHistory] = useState<any[]>(getFallbackHistory());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [badges, rules] = await Promise.all([
                    gamificationService.getBadges(),
                    gamificationService.getPointRules()
                ]);
                if (badges && badges.length > 0) {
                    const mapped = badges.map((b: any) => ({
                        id: b.id, name: b.name || b.description, points: b.awarded || 1000,
                        category: 'Huy hiệu', image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&q=80&w=200&h=200', stock: 99
                    }));
                    setRewards([...mapped, ...getFallbackRewards()]);
                }
                if (rules && rules.length > 0) {
                    const mapped = rules.map((r: any, i: number) => ({
                        id: 200 + i, action: r.action, change: `+${r.points}`, time: 'Quy tắc hệ thống', type: 'earn'
                    }));
                    setPointHistory([...getFallbackHistory(), ...mapped]);
                }
            } catch (e) { console.error('Failed to fetch rewards data:', e); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const handleRedeem = (reward: any) => {
        setSelectedReward(reward);
        setIsRedeemModalVisible(true);
    };

    const confirmRedeem = () => {
        if (userPoints < selectedReward.points) {
            Modal.error({ title: 'Không đủ điểm!', content: 'Bạn cần tích lũy thêm điểm để đổi món quà này.' });
            return;
        }
        setIsRedeemModalVisible(false);
        setIsSuccessVisible(true);
        setUserPoints(prev => prev - selectedReward.points);
    };

    return (
        <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '24px 16px' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />} 
                    onClick={() => router.push('/hub')} 
                    style={{ marginBottom: 16 }}
                >
                    Quay lại Hub
                </Button>

                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        {/* Points Dashboard */}
                        <Card 
                            bodyStyle={{ padding: 0 }} 
                            style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', marginBottom: 24 }}
                        >
                            <div style={{ background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)', padding: '40px 32px', color: '#fff' }}>
                                <Row align="middle">
                                    <Col flex="auto">
                                        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>Điểm Hub hiện tại</Text>
                                        <Title level={1} style={{ color: '#fff', margin: '4px 0', fontSize: 48 }}>{userPoints.toLocaleString()} <StarFilled style={{ color: '#fadb14' }} /></Title>
                                    </Col>
                                    <Col>
                                        <div style={{ textAlign: 'center' }}>
                                            <TrophyOutlined style={{ fontSize: 48, color: '#fadb14' }} />
                                            <br />
                                            <Tag color="gold" style={{ marginTop: 8 }}>Hạng Bạc</Tag>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider style={{ background: 'rgba(255,255,255,0.1)', margin: '24px 0' }} />
                                <Row justify="space-between" align="middle">
                                    <Col flex="auto">
                                        <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Còn 550 điểm để lên Hạng Vàng</Text>
                                        <Progress percent={80} showInfo={false} strokeColor="#fadb14" trailColor="rgba(255,255,255,0.2)" style={{ marginTop: 8 }} />
                                    </Col>
                                    <Col style={{ marginLeft: 24 }}>
                                        <Button ghost icon={<FireOutlined />}>Cách kiếm thêm điểm</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>

                        {/* Reward Catalog */}
                        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Title level={4} style={{ margin: 0 }}>Kho quà tặng dành cho bạn</Title>
                            <Space>
                                <Tag color="blue">Tất cả</Tag>
                                <Tag>Voucher</Tag>
                                <Tag>Học thuật</Tag>
                                <Tag>Vật phẩm</Tag>
                            </Space>
                        </div>

                        <Row gutter={[16, 16]}>
                            {rewards.map(item => (
                                <Col xs={12} sm={12} md={8} key={item.id}>
                                    <Card 
                                        hoverable 
                                        bodyStyle={{ padding: 12 }} 
                                        style={{ borderRadius: 12, overflow: 'hidden' }}
                                        cover={<img src={item.image} style={{ height: 160, objectFit: 'cover' }} />}
                                    >
                                        <Text type="secondary" style={{ fontSize: 12 }}>{item.category}</Text>
                                        <Title level={5} style={{ margin: '4px 0 12px 0', height: 44, overflow: 'hidden' }}>{item.name}</Title>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text strong style={{ color: '#faad14', fontSize: 16 }}>{item.points.toLocaleString()} <StarFilled /></Text>
                                            <Button type="primary" size="small" shape="round" onClick={() => handleRedeem(item)}>Đổi</Button>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    <Col xs={24} lg={8}>
                        {/* History */}
                        <Card 
                            title={<span><HistoryOutlined /> Lịch sử điểm Hub</span>} 
                            style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
                            bodyStyle={{ padding: 0 }}
                        >
                            <List
                                dataSource={pointHistory}
                                renderItem={item => (
                                    <List.Item style={{ padding: '16px 20px' }}>
                                        <List.Item.Meta
                                            title={<Text strong style={{ fontSize: 13 }}>{item.action}</Text>}
                                            description={<Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text>}
                                        />
                                        <div style={{ textAlign: 'right' }}>
                                            <Text strong style={{ color: item.type === 'earn' ? '#52c41a' : '#ff4d4f' }}>
                                                {item.change}
                                            </Text>
                                            <br />
                                            <Text type="secondary" style={{ fontSize: 10 }}>điểm</Text>
                                        </div>
                                    </List.Item>
                                )}
                            />
                            <div style={{ padding: 16, textAlign: 'center' }}>
                                <Button type="link" size="small">Xem tất cả lịch sử</Button>
                            </div>
                        </Card>

                        {/* Point Rules Info */}
                        <Card 
                            title="Cách nhận thêm điểm" 
                            size="small" 
                            style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', marginTop: 24 }}
                        >
                            <List
                                size="small"
                                dataSource={[
                                    { action: 'Đọc bài viết mới', points: '50' },
                                    { action: 'Hoàn thành trắc nghiệm', points: '100' },
                                    { action: 'Bình luận hữu ích', points: '20' },
                                    { action: 'Tham gia Livestream', points: '200' },
                                ]}
                                renderItem={item => (
                                    <List.Item style={{ padding: '8px 0' }}>
                                        <Space size={4}><CheckCircleOutlined style={{ color: '#52c41a' }} /> {item.action}</Space>
                                        <Text strong style={{ color: '#52c41a' }}>+{item.points}</Text>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Redemption Confirmation Modal */}
            <Modal
                title="Xác nhận đổi quà"
                open={isRedeemModalVisible}
                onCancel={() => setIsRedeemModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsRedeemModalVisible(false)}>Hủy</Button>,
                    <Button key="confirm" type="primary" onClick={confirmRedeem}>Xác nhận đổi</Button>
                ]}
                centered
            >
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                    <img src={selectedReward?.image} style={{ width: 120, height: 120, borderRadius: 12, marginBottom: 16 }} />
                    <Title level={4}>{selectedReward?.name}</Title>
                    <Paragraph>Bạn có chắc chắn muốn dùng <Text strong color="gold">{selectedReward?.points}</Text> điểm để đổi món quà này?</Paragraph>
                    <div style={{ padding: '12px', background: '#fff7e6', borderRadius: 8 }}>
                        <Text type="secondary">Sau khi đổi, quà sẽ được gửi thông tin xác nhận qua Email/SMS trong vòng 24h.</Text>
                    </div>
                </div>
            </Modal>

            {/* Success Modal */}
            <Modal
                open={isSuccessVisible}
                footer={null}
                onCancel={() => setIsSuccessVisible(false)}
                centered
                closable={false}
            >
                <Result
                    status="success"
                    title="Đổi quà thành công!"
                    subTitle="Vui lòng kiểm tra hộp thư Email hoặc Tin nhắn để nhận thông báo xác nhận."
                    extra={[
                        <Button type="primary" key="close" onClick={() => setIsSuccessVisible(false)}>ĐÓNG</Button>,
                        <Button key="history" icon={<HistoryOutlined />}>Xem lịch sử</Button>
                    ]}
                />
            </Modal>
        </div>
    );
}
