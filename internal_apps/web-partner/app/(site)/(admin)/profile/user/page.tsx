"use client";
import React, { useState } from 'react';
import { Avatar, Button, Card, Col, Row, Tabs, Tag, Typography, Space, Progress, Badge, Statistic, List } from 'antd';
const { Title, Text, Paragraph } = Typography;
import {
    UserOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined,
    CalendarOutlined, HeartOutlined, StarFilled, ClockCircleOutlined,
    EditOutlined, EyeOutlined, MedicineBoxOutlined, BankOutlined,
    ShopOutlined, ExperimentOutlined, TeamOutlined, FileTextOutlined
} from '@ant-design/icons';
import Link from 'next/link';

// ─── Mock Profile ────────────────────────────────────────────────────────────
const PROFILE = {
    name: 'Nguyễn Trần Tuấn Anh',
    role: 'Quản trị viên Hệ thống',
    avatar: '',
    email: 'tuananh@mediportal.vn',
    phone: '090 365 2826',
    address: '527 Sư Vạn Hạnh, Phường 12, Quận 10, TP. HCM',
    joinedDate: '04/01/2021',
    bio: 'Quản lý toàn diện hệ sinh thái y tế số, phụ trách điều phối các đối tác phòng khám, bệnh viện và nhà thuốc trong mạng lưới MediPortal.',
    stats: {
        totalPartners: 42,
        pendingApprovals: 7,
        totalBookings: 1284,
        rating: 4.9,
    }
};

// ─── Mock Linked Entities ────────────────────────────────────────────────────
const LINKED_ENTITIES = [
    { id: 'h-001', type: 'hospital', name: 'Bệnh viện Nhân dân Gia Định', speciality: 'Đa khoa', status: 'active', icon: <BankOutlined /> },
    { id: 'c-001', type: 'clinic',   name: 'Phòng khám Đa khoa Quốc tế', speciality: 'Đa khoa', status: 'active', icon: <MedicineBoxOutlined /> },
    { id: 'c-002', type: 'clinic',   name: 'Phòng khám Tim mạch & Hô hấp', speciality: 'Tim mạch', status: 'pending', icon: <MedicineBoxOutlined /> },
    { id: 'p-001', type: 'pharmacy', name: 'Nhà thuốc An Khang', speciality: 'Dược phẩm', status: 'active', icon: <ShopOutlined /> },
    { id: 'd-001', type: 'doctor',   name: 'BS. Trần Văn Minh', speciality: 'Tim mạch', status: 'active', icon: <ExperimentOutlined /> },
    { id: 'd-002', type: 'doctor',   name: 'BS. Nguyễn Thị Lan', speciality: 'Nhi khoa', status: 'active', icon: <ExperimentOutlined /> },
];

const TYPE_LABELS: Record<string, string> = {
    hospital: 'Bệnh viện',
    clinic: 'Phòng khám',
    pharmacy: 'Nhà thuốc',
    doctor: 'Bác sĩ',
    pharmacist: 'Dược sĩ',
    user: 'Người dùng',
};

const TYPE_COLORS: Record<string, string> = {
    hospital: 'blue',
    clinic: 'green',
    pharmacy: 'orange',
    doctor: 'purple',
    pharmacist: 'cyan',
};

// ─── Mock Activity Log ────────────────────────────────────────────────────────
const ACTIVITIES = [
    { time: '10 phút trước', action: 'Duyệt hồ sơ đối tác', target: 'Phòng khám Đa khoa Bình Thạnh', type: 'approval' },
    { time: '1 giờ trước',   action: 'Cập nhật cấu hình hệ thống', target: 'Cài đặt Telegram Bot', type: 'setting' },
    { time: '2 giờ trước',   action: 'Thêm mới nhân sự', target: 'BS. Lê Thị Hoa – Khoa Nội', type: 'staff' },
    { time: 'Hôm qua',       action: 'Xuất báo cáo doanh thu', target: 'Tháng 04/2026', type: 'report' },
    { time: '2 ngày trước',  action: 'Duyệt đăng ký đối tác mới', target: 'Nhà thuốc An Khang Chi nhánh 3', type: 'approval' },
];

const ACTIVITY_COLORS: Record<string, string> = {
    approval: '#52c41a',
    setting: '#1890ff',
    staff: '#722ed1',
    report: '#faad14',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState('overview');

    const initials = PROFILE.name.split(' ').slice(-2).map(n => n[0]).join('').toUpperCase();

    return (
        <div style={{ paddingBottom: 48 }}>

            {/* ── HERO HEADER ─────────────────────────────────────────── */}
            <div style={{
                background: 'linear-gradient(135deg, #001529 0%, #003a70 50%, #0050b3 100%)',
                borderRadius: 16, padding: '40px 48px', marginBottom: 24,
                position: 'relative', overflow: 'hidden'
            }}>
                {/* BG Decoration */}
                <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                <div style={{ position: 'absolute', bottom: -80, right: 120, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

                <Row align="middle" gutter={[32, 24]}>
                    {/* Avatar */}
                    <Col>
                        <Badge dot color="#52c41a" offset={[-8, 8]}>
                            <Avatar size={96} style={{ background: 'linear-gradient(135deg, #1890ff, #722ed1)', fontSize: 32, fontWeight: 800, border: '3px solid rgba(255,255,255,0.2)' }}>
                                {initials}
                            </Avatar>
                        </Badge>
                    </Col>

                    {/* Info */}
                    <Col flex={1}>
                        <Title level={2} style={{ color: '#fff', margin: 0, fontWeight: 800 }}>{PROFILE.name}</Title>
                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, display: 'block', marginBottom: 12 }}>
                            {PROFILE.role}
                        </Text>
                        <Space wrap>
                            <Tag icon={<EnvironmentOutlined />} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'rgba(255,255,255,0.85)', borderRadius: 20 }}>
                                {PROFILE.address.split(',').slice(-1)[0].trim()}
                            </Tag>
                            <Tag icon={<CalendarOutlined />} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'rgba(255,255,255,0.85)', borderRadius: 20 }}>
                                Tham gia {PROFILE.joinedDate}
                            </Tag>
                            <Tag icon={<StarFilled />} style={{ background: 'rgba(250,173,20,0.2)', border: '1px solid rgba(250,173,20,0.4)', color: '#faad14', borderRadius: 20 }}>
                                {PROFILE.stats.rating} / 5.0
                            </Tag>
                        </Space>
                    </Col>

                    {/* Actions */}
                    <Col>
                        <Space direction="vertical">
                            <Button type="primary" ghost icon={<EditOutlined />} style={{ borderRadius: 8, fontWeight: 600 }}>
                                Chỉnh sửa hồ sơ
                            </Button>
                        </Space>
                    </Col>
                </Row>

                {/* Stat row */}
                <Row gutter={[24, 0]} style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                    {[
                        { label: 'Đối tác quản lý', value: PROFILE.stats.totalPartners, suffix: 'đối tác', color: '#1890ff' },
                        { label: 'Chờ duyệt', value: PROFILE.stats.pendingApprovals, suffix: 'hồ sơ', color: '#faad14' },
                        { label: 'Tổng lượt đặt khám', value: PROFILE.stats.totalBookings, suffix: 'lượt', color: '#52c41a' },
                        { label: 'Đánh giá trung bình', value: PROFILE.stats.rating, suffix: '/ 5', color: '#722ed1' },
                    ].map((s, i) => (
                        <Col key={i} flex={1}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{s.label}</div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* ── TABS ────────────────────────────────────────────────── */}
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                size="large"
                style={{ marginBottom: 24 }}
                items={[
                    { key: 'overview',  label: <><UserOutlined /> Tổng quan</> },
                    { key: 'entities',  label: <><TeamOutlined /> Hồ sơ liên kết ({LINKED_ENTITIES.length})</> },
                    { key: 'activity',  label: <><ClockCircleOutlined /> Hoạt động gần đây</> },
                ]}
            />

            {/* ── OVERVIEW ────────────────────────────────────────────── */}
            {activeTab === 'overview' && (
                <Row gutter={[20, 20]}>
                    <Col xs={24} lg={16}>
                        <Card bordered={false} style={{ borderRadius: 12, marginBottom: 20 }}>
                            <Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>Giới thiệu</Title>
                            <Paragraph style={{ color: '#595959', lineHeight: 1.8 }}>{PROFILE.bio}</Paragraph>
                        </Card>
                        <Card bordered={false} style={{ borderRadius: 12 }}>
                            <Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>Hồ sơ đối tác nổi bật</Title>
                            <Row gutter={[12, 12]}>
                                {LINKED_ENTITIES.slice(0, 4).map(e => (
                                    <Col xs={24} sm={12} key={e.id}>
                                        <Link href={`/profile/${e.type}/${e.id}`}>
                                            <Card size="small" hoverable style={{ borderRadius: 10, border: '1px solid #f0f0f0', cursor: 'pointer' }}>
                                                <Space>
                                                    <Avatar style={{ background: '#f0f5ff', color: '#0050b3' }}>{e.icon}</Avatar>
                                                    <div>
                                                        <Text strong style={{ fontSize: 13, display: 'block' }}>{e.name}</Text>
                                                        <Tag color={TYPE_COLORS[e.type]} style={{ fontSize: 10, marginTop: 2 }}>{TYPE_LABELS[e.type]}</Tag>
                                                    </div>
                                                </Space>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card bordered={false} style={{ borderRadius: 12, marginBottom: 20 }}>
                            <Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>Thông tin liên hệ</Title>
                            <Space direction="vertical" style={{ width: '100%' }} size={14}>
                                {[
                                    { icon: <MailOutlined style={{ color: '#1890ff' }} />, label: 'Email', value: PROFILE.email },
                                    { icon: <PhoneOutlined style={{ color: '#52c41a' }} />, label: 'Điện thoại', value: PROFILE.phone },
                                    { icon: <EnvironmentOutlined style={{ color: '#fa8c16' }} />, label: 'Địa chỉ', value: PROFILE.address },
                                    { icon: <CalendarOutlined style={{ color: '#722ed1' }} />, label: 'Ngày tham gia', value: PROFILE.joinedDate },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: '#fafafa', borderRadius: 10 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fff', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <Text type="secondary" style={{ fontSize: 11, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5 }}>{item.label}</Text>
                                            <Text strong style={{ fontSize: 13 }}>{item.value}</Text>
                                        </div>
                                    </div>
                                ))}
                            </Space>
                        </Card>

                        <Card bordered={false} style={{ borderRadius: 12 }}>
                            <Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>Mức độ hoàn thiện hồ sơ</Title>
                            <Space direction="vertical" style={{ width: '100%' }} size={10}>
                                {[
                                    { label: 'Thông tin cơ bản', pct: 100 },
                                    { label: 'Liên hệ & Mạng xã hội', pct: 80 },
                                    { label: 'Quản lý đối tác', pct: 65 },
                                    { label: 'Báo cáo & Phân tích', pct: 40 },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <Text style={{ fontSize: 12 }}>{item.label}</Text>
                                            <Text strong style={{ fontSize: 12 }}>{item.pct}%</Text>
                                        </div>
                                        <Progress percent={item.pct} size="small" showInfo={false}
                                            strokeColor={item.pct === 100 ? '#52c41a' : item.pct >= 60 ? '#1890ff' : '#faad14'} />
                                    </div>
                                ))}
                            </Space>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* ── ENTITIES (linked profiles) ───────────────────────────── */}
            {activeTab === 'entities' && (
                <Row gutter={[16, 16]}>
                    {LINKED_ENTITIES.map(entity => (
                        <Col xs={24} sm={12} lg={8} key={entity.id}>
                            <Card
                                bordered={false}
                                hoverable
                                style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #f0f0f0' }}
                                bodyStyle={{ padding: 0 }}
                            >
                                {/* Color header strip */}
                                <div style={{
                                    height: 6,
                                    background: entity.status === 'active'
                                        ? 'linear-gradient(90deg, #52c41a, #73d13d)'
                                        : 'linear-gradient(90deg, #faad14, #ffc53d)'
                                }} />
                                <div style={{ padding: '20px 24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                        <Avatar size={48} style={{ background: '#f0f5ff', color: '#0050b3', fontSize: 22 }}>
                                            {entity.icon}
                                        </Avatar>
                                        <Space direction="vertical" align="end" size={4}>
                                            <Tag color={TYPE_COLORS[entity.type]} style={{ fontSize: 10, fontWeight: 700 }}>
                                                {TYPE_LABELS[entity.type].toUpperCase()}
                                            </Tag>
                                            <Tag
                                                bordered={false}
                                                color={entity.status === 'active' ? 'success' : 'warning'}
                                                style={{ fontSize: 10, fontWeight: 700 }}
                                            >
                                                {entity.status === 'active' ? 'HOẠT ĐỘNG' : 'CHỜ DUYỆT'}
                                            </Tag>
                                        </Space>
                                    </div>

                                    <Title level={5} style={{ margin: 0, marginBottom: 4, fontSize: 15 }}>{entity.name}</Title>
                                    <Text type="secondary" style={{ fontSize: 12 }}>{entity.speciality}</Text>

                                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #f5f5f5', display: 'flex', gap: 8 }}>
                                        <Link href={`/profile/${entity.type}/${entity.id}`} style={{ flex: 1 }}>
                                            <Button block size="small" icon={<EyeOutlined />} type="primary" ghost style={{ borderRadius: 8, fontWeight: 600 }}>
                                                Xem hồ sơ
                                            </Button>
                                        </Link>
                                        <Button size="small" icon={<EditOutlined />} style={{ borderRadius: 8 }} />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* ── ACTIVITY ────────────────────────────────────────────── */}
            {activeTab === 'activity' && (
                <Card bordered={false} style={{ borderRadius: 14 }}>
                    <Title level={5} style={{ marginTop: 0, marginBottom: 20 }}>
                        <ClockCircleOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                        Nhật ký hoạt động gần đây
                    </Title>
                    <List
                        dataSource={ACTIVITIES}
                        renderItem={(item) => (
                            <List.Item style={{ padding: '14px 0', borderBottom: '1px solid #f5f5f5' }}>
                                <Space align="start" size={16} style={{ width: '100%' }}>
                                    <div style={{
                                        width: 10, height: 10, borderRadius: '50%',
                                        background: ACTIVITY_COLORS[item.type] || '#d9d9d9',
                                        marginTop: 6, flexShrink: 0
                                    }} />
                                    <div style={{ flex: 1 }}>
                                        <Text strong style={{ fontSize: 14, display: 'block' }}>{item.action}</Text>
                                        <Text style={{ fontSize: 13, color: '#595959' }}>{item.target}</Text>
                                    </div>
                                    <Text type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{item.time}</Text>
                                </Space>
                            </List.Item>
                        )}
                    />
                </Card>
            )}
        </div>
    );
}