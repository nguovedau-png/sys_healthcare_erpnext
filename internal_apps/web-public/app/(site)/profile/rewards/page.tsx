'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import { Row, Col } from '@/components/ui/Grid';
import { Title, Text } from '@/components/ui/Typography';
import Progress from '@/components/ui/Progress';
import List from '@/components/ui/List';
import Avatar from '@/components/ui/Avatar';
import Tabs from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import { AiOutlineTrophy as TrophyOutlined, AiOutlineThunderbolt as ThunderboltOutlined, AiOutlineGift as GiftOutlined } from 'react-icons/ai';

const RewardsPage = () => {
    const userStats = {
        points: 12500,
        level: 'Platinum',
        nextLevelPoints: 20000,
        badges: 15
    };

    const badges = [
        { name: 'Early Bird', icon: '🌅', desc: 'Đăng nhập sớm 7 ngày' },
        { name: 'Health Champion', icon: '🏆', desc: 'Hoàn thành 30 nhiệm vụ' },
        { name: 'Social Butterfly', icon: '🦋', desc: 'Chia sẻ 10 bài viết' },
        { name: 'Top Reviewer', icon: '⭐', desc: 'Đánh giá 5 bác sĩ' },
    ];

    const history = [
        { action: 'Hoàn thành khám bệnh', points: '+100', date: '2024-01-01' },
        { action: 'Đánh giá bác sĩ', points: '+20', date: '2024-01-01' },
        { action: 'Đăng nhập hàng ngày', points: '+10', date: '2024-01-02' },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 animate-in fade-in duration-700">
            <Title level={2} className="font-black tracking-tight mb-8">Hệ thống phần thưởng</Title>

            {/* Hero Card */}
            <Card className="mb-8 bg-gradient-to-br from-primary to-secondary border-none text-white rounded-lg overflow-hidden shadow-premium p-8 relative">
                <div className="flex justify-between items-center text-white relative z-10">
                    <div>
                        <Text className="text-white/80 uppercase font-black tracking-[0.2em] text-xs">Tổng điểm tích lũy</Text>
                        <Title className="text-white m-0 font-black mt-2" style={{ color: 'white' }}>{userStats.points.toLocaleString()}</Title>
                        <div className="mt-4">
                            <Tag color="warning" className="text-sm px-4 py-1.5 border-none bg-white/20 backdrop-blur-md text-white font-black">
                                {userStats.level} Member
                            </Tag>
                        </div>
                    </div>
                    <TrophyOutlined className="text-[120px] opacity-20 absolute -right-4 -top-4 rotate-12" />
                </div>
                <div className="mt-12 relative z-10">
                    <div className="flex justify-between text-white/90 text-xs font-bold uppercase tracking-wider mb-3">
                        <span>{userStats.points.toLocaleString()} / {userStats.nextLevelPoints.toLocaleString()}</span>
                        <span>Cấp tiếp theo: Diamond</span>
                    </div>
                    <Progress percent={62} showInfo={false} strokeColor="#ffffff" trailColor="rgba(255,255,255,0.2)" size="small" />
                </div>
            </Card>

            <Row gutter={[24, 24]}>
                <Col xs={24} md={16}>
                    <Card title={<div className="flex items-center gap-2"><GiftOutlined className="text-primary" /> Quà tặng khả dụng</div>} className="rounded-lg shadow-soft h-full border border-border">
                        <Tabs defaultActiveKey="1" items={[
                            {
                                key: '1',
                                label: 'Mã giảm giá',
                                children: (
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={[
                                            { title: 'Giảm 20% phí khám', cost: 1000 },
                                            { title: 'Miễn phí vận chuyển thuốc', cost: 500 },
                                            { title: 'Gói khám tổng quát miễn phí', cost: 5000 },
                                        ]}
                                        renderItem={item => (
                                            <List.Item actions={[<Button variant="primary" size="small" className="rounded-lg font-bold">Đổi {item.cost} điểm</Button>]}>
                                                <List.Item.Meta
                                                    avatar={<Avatar icon={<GiftOutlined />} className="bg-primary/10 text-primary border-none" />}
                                                    title={<Text strong className="text-slate-800">{item.title}</Text>}
                                                    description={<Text type="secondary" className="text-xs">Áp dụng cho tất cả dịch vụ y tế</Text>}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                )
                            },
                            {
                                key: '2',
                                label: 'Quà tặng vật lý',
                                children: (
                                    <div className="py-20 text-center flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                            <GiftOutlined className="text-slate-300 text-3xl" />
                                        </div>
                                        <Text type="secondary" className="font-medium italic">Hiện chưa có quà tặng hiện vật</Text>
                                    </div>
                                )
                            }
                        ]} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card title={<div className="flex items-center gap-2"><ThunderboltOutlined className="text-primary" /> Hoạt động gần đây</div>} className="rounded-lg shadow-soft h-full border border-border">
                        <List
                            dataSource={history}
                            renderItem={item => (
                                <List.Item className="px-0">
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="font-bold text-slate-800 text-sm">{item.action}</div>
                                            <div className="text-[10px] text-muted font-bold uppercase mt-1">{new Date(item.date).toLocaleDateString('vi-VN')}</div>
                                        </div>
                                        <div className="text-primary font-black text-sm">{item.points}</div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            <Title level={4} className="mt-12 mb-6 font-black tracking-tight flex items-center gap-2">
                Danh hiệu của tôi
                <div className="h-px flex-1 bg-border ml-4"></div>
            </Title>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {badges.map(badge => (
                    <Card key={badge.name} hoverable className="text-center rounded-lg border border-border bg-surface">
                        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{badge.icon}</div>
                        <div className="font-bold text-slate-900">{badge.name}</div>
                        <div className="text-[10px] text-muted font-bold uppercase mt-2 tracking-wider">{badge.desc}</div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RewardsPage;
