"use client";

import React from 'react';
import { Card, Row, Col, Typography, Progress, Avatar, Space, List, Tag, Button, Divider, Table } from 'antd';
import { TrophyFilled, CrownFilled, StarFilled, GiftOutlined, HistoryOutlined, CheckCircleFilled } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function MembershipPage() {
    const currentPoints = 850;
    const nextTierPoints = 1000;
    const progressPercent = (currentPoints / nextTierPoints) * 100;

    const historyData = [
        { id: 1, date: '25/04/2026', action: 'Hoàn thành bài Test: Tiểu đường type 2', points: '+50', type: 'earn' },
        { id: 2, date: '22/04/2026', action: 'Đổi Voucher mua hàng Siêu thị thuốc 50k', points: '-200', type: 'spend' },
        { id: 3, date: '15/04/2026', action: 'Điểm danh Livestream: Viêm khớp dạng thấp', points: '+20', type: 'earn' },
        { id: 4, date: '01/04/2026', action: 'Hoàn thành Khóa học: Kỹ năng chốt sale', points: '+150', type: 'earn' },
    ];

    const rewards = [
        { id: 1, title: 'Voucher 50K - Siêu thị Thuốc', points: 200, color: 'blue' },
        { id: 2, title: 'Mở khóa Khóa học Nâng cao', points: 500, color: 'purple' },
        { id: 3, title: 'Sách Dược Thư Bản Cứng', points: 1500, color: 'gold' },
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <CrownFilled style={{ color: '#faad14' }} /> Hội viên & Điểm học tập CME
                </Title>
                <Text type="secondary">Quản lý hạng thành viên, tích lũy điểm thưởng từ các khóa học và đổi quà hấp dẫn.</Text>
            </div>

            <Row gutter={[24, 24]}>
                {/* User Card */}
                <Col xs={24} lg={10}>
                    <Card style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} bodyStyle={{ padding: 0 }}>
                        <div style={{ background: 'linear-gradient(135deg, #1d39c4 0%, #001529 100%)', padding: 32, color: 'white', position: 'relative' }}>
                            <TrophyFilled style={{ position: 'absolute', right: -20, top: -20, fontSize: 180, opacity: 0.1, color: '#fff' }} />
                            
                            <Space align="center" size="large" style={{ marginBottom: 24 }}>
                                <Avatar size={80} src="https://i.pravatar.cc/150?img=11" style={{ border: '4px solid rgba(255,255,255,0.2)' }} />
                                <div>
                                    <Title level={4} style={{ color: 'white', margin: 0 }}>Nguyễn Thanh Tùng</Title>
                                    <Tag color="gold" style={{ marginTop: 8, fontSize: 12, padding: '2px 12px', borderRadius: 20 }}>
                                        <StarFilled /> THÀNH VIÊN VÀNG
                                    </Tag>
                                </div>
                            </Space>

                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 12, backdropFilter: 'blur(10px)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Điểm hiện tại</Text>
                                    <Text strong style={{ color: 'white', fontSize: 18 }}>{currentPoints} / {nextTierPoints}</Text>
                                </div>
                                <Progress 
                                    percent={progressPercent} 
                                    showInfo={false} 
                                    strokeColor="#faad14" 
                                    trailColor="rgba(255,255,255,0.2)"
                                    strokeWidth={10}
                                />
                                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 8, display: 'block' }}>
                                    Chỉ còn 150 điểm nữa để thăng hạng <b>KIM CƯƠNG</b>
                                </Text>
                            </div>
                        </div>

                        <div style={{ padding: 24 }}>
                            <Title level={5}>Quyền lợi hạng Vàng</Title>
                            <List
                                size="small"
                                dataSource={['Giảm 5% khi mua hàng tại Siêu thị thuốc', 'Miễn phí tham gia các buổi Livestream chuyên sâu', 'Ưu tiên duyệt hồ sơ tuyển dụng']}
                                renderItem={item => (
                                    <List.Item style={{ border: 'none', padding: '8px 0' }}>
                                        <Space><CheckCircleFilled style={{ color: '#52c41a' }} /> <Text>{item}</Text></Space>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Card>
                </Col>

                {/* Main Content */}
                <Col xs={24} lg={14}>
                    {/* Rewards Section */}
                    <Card title={<><GiftOutlined /> Cửa hàng Đổi thưởng</>} style={{ borderRadius: 12, marginBottom: 24 }}>
                        <Row gutter={[16, 16]}>
                            {rewards.map(reward => (
                                <Col span={8} key={reward.id}>
                                    <Card 
                                        hoverable 
                                        bodyStyle={{ padding: 16, textAlign: 'center' }}
                                        style={{ background: '#fafafa', border: '1px dashed #d9d9d9' }}
                                    >
                                        <GiftOutlined style={{ fontSize: 32, color: reward.color === 'gold' ? '#faad14' : '#1890ff', marginBottom: 12 }} />
                                        <Text strong style={{ display: 'block', height: 44 }}>{reward.title}</Text>
                                        <Tag color={reward.color} style={{ margin: '12px 0', fontSize: 14, padding: '4px 12px' }}>{reward.points} Điểm</Tag>
                                        <Button type="primary" block disabled={currentPoints < reward.points}>Đổi ngay</Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card>

                    {/* History Section */}
                    <Card title={<><HistoryOutlined /> Lịch sử Điểm CME</>} style={{ borderRadius: 12 }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={historyData}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<Text strong>{item.action}</Text>}
                                        description={item.date}
                                    />
                                    <div style={{ fontSize: 16, fontWeight: 'bold', color: item.type === 'earn' ? '#52c41a' : '#ff4d4f' }}>
                                        {item.points}
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
