"use client";

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Table, Tag, Space, Tabs, Button, Input, Modal, Form, Switch, InputNumber, Select, Tooltip, Avatar, Statistic, Progress, message, Spin, List } from 'antd';
import { 
    DashboardOutlined, 
    TeamOutlined, 
    FileTextOutlined, 
    GiftOutlined, 
    SettingOutlined, 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    GlobalOutlined,
    SafetyCertificateOutlined,
    BellOutlined,
    LinkOutlined,
    EyeOutlined,
    MessageOutlined,
    BookOutlined,
    HistoryOutlined
} from '@ant-design/icons';
import gamificationService, { GamificationStats, PointRule } from '@/services/gamification.service';

const { Title, Text } = Typography;
const { Search } = Input;

// --- MOCK ADMIN DATA ---
const HUB_USERS = [
    { key: '1', name: 'Nguyễn Văn A', role: 'Bác sĩ', hospital: 'Bệnh viện Bạch Mai', activatedAt: '26/04/2026', points: 2450, status: 'Active' },
    { key: '2', name: 'Lê Thị B', role: 'Dược sĩ', hospital: 'Nhà thuốc Long Châu', activatedAt: '25/04/2026', points: 1200, status: 'Active' },
    { key: '3', name: 'Trần Văn C', role: 'Bác sĩ', hospital: 'Bệnh viện Chợ Rẫy', activatedAt: 'Chưa kích hoạt', points: 0, status: 'Pending' },
];

const HUB_NEWS = [
    { key: '1', title: 'Đột phá Ung thư Phổi', category: 'Ung thư học', views: 1250, likes: 156, comments: 24, status: 'Published' },
    { key: '2', title: 'Hướng dẫn điều trị F0', category: 'Hô hấp', views: 3400, likes: 450, comments: 89, status: 'Published' },
    { key: '3', title: 'Sự kiện Tim mạch 2026', category: 'Tim mạch', views: 0, likes: 0, comments: 0, status: 'Scheduled' },
];

const HUB_COURSES_ADMIN = [
    { key: '1', title: 'Cập nhật điều trị Tăng huyết áp 2026', provider: 'Hội Tim mạch học Việt Nam', students: 450, points: 500, status: 'Active' },
    { key: '2', title: 'Kỹ năng tư vấn thuốc chuyên sâu', provider: 'Đại học Y Dược', students: 120, points: 300, status: 'Draft' },
];

export default function HubAdminDashboard() {
    const [activeTab, setActiveTab] = useState('1');
    const [stats, setStats] = useState<GamificationStats | null>(null);
    const [pointRules, setPointRules] = useState<PointRule[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsData, rulesData] = await Promise.all([
                gamificationService.getStats(),
                gamificationService.getPointRules()
            ]);
            setStats(statsData);
            setPointRules(rulesData);
        } catch (error) {
            console.error('Failed to fetch gamification data:', error);
            message.error('Không thể tải dữ liệu từ server. Vui lòng kiểm tra lại kết nối.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản trị Hub Y Khoa</Title>
                    <Text type="secondary">Quản lý người dùng, nội dung tin tức, khóa học, quà tặng và cấu hình hệ thống Hub.</Text>
                </div>
                <Space>
                    <Button icon={<BellOutlined />}>Thông báo hệ thống</Button>
                    <Button type="primary" icon={<PlusOutlined />}>Tạo Chiến dịch Mới</Button>
                </Space>
            </div>

            {/* Top Statistics */}
            <Spin spinning={loading}>
                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                    <Col xs={24} sm={6}>
                        <Card bordered={false} style={{ borderRadius: 12 }}>
                            <Statistic title="Tổng User Hub" value={stats?.totalPlayers || 0} prefix={<TeamOutlined />} valueStyle={{ color: '#1890ff' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card bordered={false} style={{ borderRadius: 12 }}>
                            <Statistic title="Luật tính điểm (Rules)" value={stats?.totalRules || 0} prefix={<SettingOutlined />} valueStyle={{ color: '#722ed1' }} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card bordered={false} style={{ borderRadius: 12 }}>
                            <Statistic title="Huy hiệu hệ thống" value={stats?.totalBadges || 0} prefix={<FileTextOutlined />} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={6}>
                        <Card bordered={false} style={{ borderRadius: 12 }}>
                            <Statistic title="Điểm đã cấp" value={(stats?.totalPoints as any)?._sum?.points || 0} prefix={<StarFilled style={{ color: '#faad14' }} />} />
                        </Card>
                    </Col>
                </Row>
            </Spin>

            <Card style={{ borderRadius: 12, overflow: 'hidden' }} bodyStyle={{ padding: 0 }}>
                <Tabs 
                    activeKey={activeTab} 
                    onChange={setActiveTab}
                    size="large"
                    tabBarStyle={{ padding: '0 24px', background: '#fff', margin: 0 }}
                    items={[
                        {
                            key: '1',
                            label: <span><TeamOutlined /> Masterdata User</span>,
                            children: (
                                <div style={{ padding: 24 }}>
                                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                                        <Search placeholder="Tìm theo tên, SĐT, Bệnh viện..." style={{ width: 350 }} />
                                        <Space>
                                            <Button>Xuất Excel</Button>
                                            <Button type="primary" icon={<PlusOutlined />}>Thêm User</Button>
                                        </Space>
                                    </div>
                                    <Table 
                                        dataSource={HUB_USERS}
                                        columns={[
                                            { title: 'Họ tên', dataIndex: 'name', key: 'name', render: (text) => <Text strong>{text}</Text> },
                                            { title: 'Vai trò', dataIndex: 'role', key: 'role' },
                                            { title: 'Bệnh viện / Nhà thuốc', dataIndex: 'hospital', key: 'hospital' },
                                            { title: 'Ngày kích hoạt', dataIndex: 'activatedAt', key: 'activatedAt' },
                                            { title: 'Điểm tích lũy', dataIndex: 'points', key: 'points', render: (val) => <Text style={{ color: '#faad14' }}>{val.toLocaleString()}</Text> },
                                            { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (val) => <Tag color={val==='Active'?'green':'orange'}>{val}</Tag> },
                                            { title: 'Thao tác', key: 'action', render: () => <Space><Button type="text" icon={<EditOutlined />} /><Button type="text" icon={<HistoryOutlined />} /></Space> }
                                        ]}
                                    />
                                </div>
                            )
                        },
                        {
                            key: '2',
                            label: <span><FileTextOutlined /> Tin tức & Cộng đồng</span>,
                            children: (
                                <div style={{ padding: 24 }}>
                                    <Tabs defaultActiveKey="news" items={[
                                        {
                                            key: 'news',
                                            label: 'Quản lý Bài viết',
                                            children: (
                                                <div style={{ marginTop: 16 }}>
                                                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                                                        <Space>
                                                            <Button type="primary">Thêm bài viết</Button>
                                                            <Button>Quản lý Chuyên mục</Button>
                                                        </Space>
                                                        <Search placeholder="Tìm tiêu đề tin..." style={{ width: 300 }} />
                                                    </div>
                                                    <Table 
                                                        dataSource={HUB_NEWS}
                                                        columns={[
                                                            { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
                                                            { title: 'Chuyên mục', dataIndex: 'category', key: 'category' },
                                                            { title: 'Lượt xem', dataIndex: 'views', key: 'views' },
                                                            { title: 'Tương tác', key: 'engagement', render: (_, record) => <Space><Text size="small"><EyeOutlined /> {record.views}</Text><Text size="small"><MessageOutlined /> {record.comments}</Text></Space> },
                                                            { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (val) => <Tag color={val==='Published'?'blue':'default'}>{val}</Tag> },
                                                            { title: 'Thao tác', key: 'action', render: () => <Space><Button type="text" icon={<EditOutlined />} /><Button type="text" danger icon={<DeleteOutlined />} /></Space> }
                                                        ]}
                                                    />
                                                </div>
                                            )
                                        },
                                        {
                                            key: 'comm',
                                            label: 'Kiểm duyệt Cộng đồng',
                                            children: (
                                                <div style={{ marginTop: 16 }}>
                                                    <Table 
                                                        dataSource={[
                                                            { user: 'BS. Khải', content: 'Ca lâm sàng kháng thuốc...', time: '10 phút trước', status: 'Pending' }
                                                        ]}
                                                        columns={[
                                                            { title: 'Người đăng', dataIndex: 'user' },
                                                            { title: 'Nội dung', dataIndex: 'content', ellipsis: true },
                                                            { title: 'Thời gian', dataIndex: 'time' },
                                                            { title: 'Thao tác', render: () => <Space><Button type="link">Duyệt</Button><Button type="link" danger>Xóa</Button></Space> }
                                                        ]}
                                                    />
                                                </div>
                                            )
                                        }
                                    ]} />
                                </div>
                            )
                        },
                        {
                            key: 'courses',
                            label: <span><BookOutlined /> Khóa học Hub</span>,
                            children: (
                                <div style={{ padding: 24 }}>
                                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                                        <Button type="primary" icon={<PlusOutlined />}>Thêm Khóa học mới</Button>
                                        <Search placeholder="Tìm khóa học..." style={{ width: 300 }} />
                                    </div>
                                    <Table 
                                        dataSource={HUB_COURSES_ADMIN}
                                        columns={[
                                            { title: 'Tên Khóa học', dataIndex: 'title' },
                                            { title: 'Đơn vị cấp', dataIndex: 'provider' },
                                            { title: 'Học viên', dataIndex: 'students' },
                                            { title: 'Điểm thưởng', dataIndex: 'points', render: val => <Tag color="orange">+{val} CME</Tag> },
                                            { title: 'Trạng thái', dataIndex: 'status', render: val => <Tag color={val==='Active'?'green':'default'}>{val}</Tag> },
                                            { title: 'Thao tác', render: () => <Space><Button type="text" icon={<EditOutlined />} /><Button type="text" danger icon={<DeleteOutlined />} /></Space> }
                                        ]}
                                    />
                                </div>
                            )
                        },
                        {
                            key: '3',
                            label: <span><GiftOutlined /> Quà tặng & Loyalty</span>,
                            children: (
                                <div style={{ padding: 24 }}>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <Card title="Quy tắc tính điểm (Point Configuration)" extra={<Button type="link">Chỉnh sửa & Ghi Log</Button>}>
                                                <List
                                                    dataSource={pointRules.length > 0 ? pointRules : [
                                                        { action: 'Kích hoạt Hub thành công', points: 500 },
                                                        { action: 'Đọc 1 bài viết (>1 phút)', points: 50 },
                                                        { action: 'Thích (Like) bài viết', points: 5 },
                                                        { action: 'Lưu (Bookmark) bài viết', points: 10 },
                                                        { action: 'Bình luận / Thảo luận', points: 20 },
                                                        { action: 'Chia sẻ (Share) bài viết', points: 30 },
                                                        { action: 'Hoàn thành Trắc nghiệm (Pass)', points: 200 },
                                                    ]}
                                                    renderItem={(item: any) => <List.Item><span>{item.action || item.label}</span><Text strong style={{ color: '#52c41a' }}>+{item.points}</Text></List.Item>}
                                                />
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card title="Quản lý kho quà" extra={<Button type="link">Thêm quà</Button>} style={{ marginBottom: 24 }}>
                                                <Table 
                                                    size="small"
                                                    pagination={false}
                                                    dataSource={[
                                                        { name: 'Voucher VinID 100k', stock: 15, points: 5000 },
                                                        { name: 'Bình giữ nhiệt Lock&Lock', stock: 42, points: 2500 },
                                                        { name: 'Khóa học Y khoa Online', stock: 'Vô hạn', points: 10000 }
                                                    ]}
                                                    columns={[
                                                        { title: 'Tên quà', dataIndex: 'name' },
                                                        { title: 'Điểm', dataIndex: 'points' },
                                                        { title: 'Tồn', dataIndex: 'stock' }
                                                    ]}
                                                />
                                            </Card>
                                            <Card title="Nhật ký cấu hình (Audit Logs)">
                                                <Table 
                                                    size="small"
                                                    pagination={false}
                                                    dataSource={[
                                                        { time: '26/04/2026 10:30', user: 'Admin Hằng', action: 'Thay đổi điểm "Like" từ +2 lên +5' },
                                                        { time: '25/04/2026 14:15', user: 'Admin Khang', action: 'Thêm quà "Khóa học Y khoa Online"' },
                                                    ]}
                                                    columns={[
                                                        { title: 'Thời gian', dataIndex: 'time' },
                                                        { title: 'Tài khoản', dataIndex: 'user' },
                                                        { title: 'Thao tác (Log)', dataIndex: 'action' },
                                                    ]}
                                                />
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        },
                        {
                            key: '4',
                            label: <span><SafetyCertificateOutlined /> E-Consent & Cấu hình</span>,
                            children: (
                                <div style={{ padding: 24 }}>
                                    <Row gutter={24}>
                                        <Col span={16}>
                                            <Card title="Nội dung E-Consent (Điều khoản tham gia)">
                                                <Form layout="vertical">
                                                    <Form.Item label="Phiên bản hiện tại">
                                                        <Tag color="blue">v2.1 - Cập nhật ngày 20/04/2026</Tag>
                                                    </Form.Item>
                                                    <Form.Item label="Nội dung điều khoản">
                                                        <Input.TextArea rows={10} defaultValue="Hub Y Khoa là không gian trao đổi chuyên môn dành riêng cho cán bộ y tế được xác thực..." />
                                                    </Form.Item>
                                                    <Button type="primary">Lưu phiên bản mới</Button>
                                                </Form>
                                            </Card>
                                        </Col>
                                        <Col span={8}>
                                            <Card title="Cấu hình Banner & Noti">
                                                <Space direction="vertical" style={{ width: '100%' }}>
                                                    <Button block icon={<GlobalOutlined />}>Cấu hình Banner Animation</Button>
                                                    <Button block icon={<BellOutlined />}>Quản lý Push Notification</Button>
                                                    <Button block icon={<LinkOutlined />}>Cấu hình Promotion Links</Button>
                                                </Space>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        }
                    ]}
                />
            </Card>
        </div>
    );
}

function StarFilled({ style }: any) {
    return <span style={{ ...style, fontSize: 18 }}>★</span>;
}
