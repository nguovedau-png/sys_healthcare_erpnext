"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Table, Tag, Space, Tabs, Input, Modal, Form, Switch, InputNumber, Select, Tooltip, Divider, DatePicker, Spin, Avatar } from 'antd';
import { 
    VideoCameraOutlined, 
    BookOutlined,
    TrophyOutlined,
    GiftOutlined,
    SettingOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    HistoryOutlined,
    LineChartOutlined,
    CrownOutlined,
    PlayCircleOutlined,
    BarChartOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

import marketingService from '@/services/marketing.service';
import gamificationService from '@/services/gamification.service';

// --- MOCK DATA ---
const MOCK_CAMPAIGNS = [
    { id: 'ED-001', name: 'Giới thiệu MediJoint+', sponsor: 'MediPharma', status: 'Active', points: 150, viewers: 1250, date: '01/05/2026' },
    { id: 'ED-002', name: 'Hướng dẫn sử dụng Omron X5', sponsor: 'Omron Healthcare', status: 'Draft', points: 100, viewers: 0, date: '10/05/2026' },
];

const MOCK_QUIZZES = [
    { id: 'QZ-001', name: 'Trắc nghiệm MediJoint+', totalQuestions: 10, passingScore: 8, associatedCampaign: 'ED-001', status: 'Active' },
    { id: 'QZ-002', name: 'Trắc nghiệm Huyết áp', totalQuestions: 5, passingScore: 4, associatedCampaign: 'ED-002', status: 'Draft' },
];

const MOCK_POINT_RULES = [
    { id: 1, action: 'Xem Video > 80%', points: 50, type: 'Cố định' },
    { id: 2, action: 'Hoàn thành bài Test', points: 100, type: 'Cố định' },
    { id: 3, action: 'Chia sẻ lên MXH', points: 20, type: 'Mỗi lần' },
    { id: 4, action: 'Like/Tương tác', points: 5, type: 'Mỗi lần' },
];

const MOCK_REWARDS = [
    { id: 'RW-001', name: 'Voucher Mua hàng 100K', requiredPoints: 500, stock: 150, type: 'Voucher' },
    { id: 'RW-002', name: 'Áo Blouse cao cấp', requiredPoints: 1200, stock: 50, type: 'Hiện vật' },
];

const MOCK_RANKING = [
    { rank: 1, user: 'Nguyễn Văn A', phone: '090***1234', totalPoints: 12500, rewardsClaimed: 5 },
    { rank: 2, user: 'Lê Thị B', phone: '091***5678', totalPoints: 9800, rewardsClaimed: 3 },
    { rank: 3, user: 'Trần Văn C', phone: '098***9012', totalPoints: 7450, rewardsClaimed: 2 },
];

const MOCK_LOGS = [
    { id: 1, time: '10:05 27/04', user: 'Nguyễn Văn A', action: 'Hoàn thành bài Test MediJoint+', change: '+100', type: 'earn' },
    { id: 2, time: '09:30 27/04', user: 'Lê Thị B', action: 'Đổi Voucher Mua hàng 100K', change: '-500', type: 'spend' },
    { id: 3, time: '08:15 27/04', user: 'Trần Văn C', action: 'Xem Video Huyết áp', change: '+50', type: 'earn' },
];

export default function EDetailingAdminDashboard() {
    const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
    const [pointRules, setPointRules] = useState(MOCK_POINT_RULES);
    const [ranking, setRanking] = useState(MOCK_RANKING);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [apiCampaigns, apiRules, apiLeaderboard] = await Promise.all([
                    marketingService.getCampaigns(),
                    gamificationService.getPointRules(),
                    gamificationService.getLeaderboard()
                ]);
                if (apiCampaigns && apiCampaigns.length > 0) {
                    const mapped = apiCampaigns.map((c: any) => ({
                        id: c.id || `ED-${c.id}`, name: c.name, sponsor: c.sponsor || 'N/A',
                        status: c.status || 'Active', points: c.points || 0, viewers: c.viewers || 0, date: c.date || ''
                    }));
                    setCampaigns(mapped);
                }
                if (apiRules && apiRules.length > 0) {
                    const mapped = apiRules.map((r: any) => ({
                        id: r.id, action: r.action, points: r.points, type: 'Cố định'
                    }));
                    setPointRules(mapped);
                }
                if (apiLeaderboard && apiLeaderboard.length > 0) {
                    const mapped = apiLeaderboard.map((u: any, i: number) => ({
                        rank: i + 1, user: u.user?.name || `User ${u.userId}`,
                        phone: '***', totalPoints: u.points || 0, rewardsClaimed: 0
                    }));
                    setRanking(mapped);
                }
            } catch (e) { console.error('Failed to fetch e-detailing data:', e); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    // --- SUB-COMPONENTS FOR TABS ---

    // 1. Tab Chiến dịch E-Detailing
    const CampaignTab = () => (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Input.Search placeholder="Tìm chiến dịch, hãng dược..." style={{ width: 300 }} />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCampaignModalOpen(true)}>Tạo Chiến dịch Mới</Button>
            </div>
            <Table 
                dataSource={campaigns} 
                rowKey="id"
                columns={[
                    { title: 'Mã', dataIndex: 'id', width: 100 },
                    { title: 'Tên Chiến dịch', dataIndex: 'name', render: (text) => <a>{text}</a> },
                    { title: 'Nhà Tài Trợ', dataIndex: 'sponsor' },
                    { title: 'Điểm thưởng', dataIndex: 'points', render: val => <Tag color="green">+{val} CME</Tag> },
                    { title: 'Lượt tham gia', dataIndex: 'viewers' },
                    { title: 'Trạng thái', dataIndex: 'status', render: val => <Tag color={val === 'Active' ? 'blue' : 'default'}>{val}</Tag> },
                    { 
                        title: 'Thao tác', 
                        key: 'action',
                        render: () => (
                            <Space>
                                <Tooltip title="Cấu hình luồng Video"><Button type="text" icon={<PlayCircleOutlined />} /></Tooltip>
                                <Tooltip title="Sửa"><Button type="text" icon={<EditOutlined />} /></Tooltip>
                                <Tooltip title="Báo cáo"><Button type="text" icon={<BarChartOutlined />} /></Tooltip>
                            </Space>
                        ) 
                    }
                ]}
            />
        </div>
    );

    // 2. Tab Cấu hình Trắc nghiệm
    const QuizTab = () => (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Input.Search placeholder="Tìm bài Test..." style={{ width: 300 }} />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsQuizModalOpen(true)}>Tạo Bộ câu hỏi Mới</Button>
            </div>
            <Table 
                dataSource={MOCK_QUIZZES} 
                rowKey="id"
                columns={[
                    { title: 'Mã', dataIndex: 'id', width: 100 },
                    { title: 'Tên Bài Test', dataIndex: 'name', render: (text) => <a>{text}</a> },
                    { title: 'Chiến dịch gắn kèm', dataIndex: 'associatedCampaign' },
                    { title: 'Tổng câu hỏi', dataIndex: 'totalQuestions' },
                    { title: 'Điều kiện Đỗ', dataIndex: 'passingScore', render: (val, record) => <Text strong color="success">≥ {val}/{record.totalQuestions}</Text> },
                    { title: 'Trạng thái', dataIndex: 'status', render: val => <Tag color={val === 'Active' ? 'blue' : 'default'}>{val}</Tag> },
                    { 
                        title: 'Thao tác', 
                        key: 'action',
                        render: () => (
                            <Space>
                                <Button type="text" icon={<EditOutlined />} />
                                <Button type="text" danger icon={<DeleteOutlined />} />
                            </Space>
                        ) 
                    }
                ]}
            />
        </div>
    );

    // 3. Tab Cấu hình Điểm & Quà tặng
    const LoyaltyConfigTab = () => (
        <Row gutter={24}>
            <Col span={12}>
                <Card title="Cấu hình Nhận Điểm (Earning Rules)" extra={<Button size="small" type="primary" icon={<PlusOutlined />}>Thêm Rule</Button>}>
                    <Table 
                        size="small"
                        dataSource={pointRules} 
                        rowKey="id"
                        pagination={false}
                        columns={[
                            { title: 'Hành động', dataIndex: 'action' },
                            { title: 'Loại tính', dataIndex: 'type' },
                            { title: 'Số điểm', dataIndex: 'points', render: val => <Text strong style={{ color: '#52c41a' }}>+{val}</Text> },
                            { title: '', key: 'action', render: () => <Button type="text" size="small" icon={<EditOutlined />} /> }
                        ]}
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Kho Quà Tặng (Rewards)" extra={<Button size="small" type="primary" icon={<PlusOutlined />}>Thêm Quà</Button>}>
                    <Table 
                        size="small"
                        dataSource={MOCK_REWARDS} 
                        rowKey="id"
                        pagination={false}
                        columns={[
                            { title: 'Tên quà', dataIndex: 'name' },
                            { title: 'Loại', dataIndex: 'type', render: val => <Tag>{val}</Tag> },
                            { title: 'Điểm cần đổi', dataIndex: 'requiredPoints', render: val => <Text strong style={{ color: '#faad14' }}>{val}</Text> },
                            { title: 'Tồn kho', dataIndex: 'stock' },
                            { title: '', key: 'action', render: () => <Button type="text" size="small" icon={<EditOutlined />} /> }
                        ]}
                    />
                </Card>
            </Col>
        </Row>
    );

    // 4. Tab Dữ liệu User & Báo cáo
    const UserDataTab = () => (
        <Row gutter={24}>
            <Col span={14}>
                <Card title={<><CrownOutlined style={{ color: '#faad14' }} /> Bảng xếp hạng Điểm User (Ranking)</>} bodyStyle={{ padding: 0 }}>
                    <Table 
                        dataSource={ranking} 
                        rowKey="rank"
                        pagination={false}
                        columns={[
                            { title: 'Hạng', dataIndex: 'rank', render: val => val <= 3 ? <Avatar style={{ backgroundColor: val===1?'#fadb14':val===2?'#d9d9d9':'#d48806' }}>{val}</Avatar> : val },
                            { title: 'User', dataIndex: 'user', render: text => <Text strong>{text}</Text> },
                            { title: 'SĐT', dataIndex: 'phone' },
                            { title: 'Tổng điểm tích lũy', dataIndex: 'totalPoints', render: val => <Text strong style={{ color: '#faad14', fontSize: 16 }}>{val.toLocaleString()}</Text> },
                            { title: 'Số lần đổi quà', dataIndex: 'rewardsClaimed' }
                        ]}
                    />
                </Card>
            </Col>
            <Col span={10}>
                <Card title={<><HistoryOutlined /> Log Lịch sử Hệ thống</>} bodyStyle={{ padding: 0 }}>
                    <Table 
                        size="small"
                        dataSource={MOCK_LOGS} 
                        rowKey="id"
                        pagination={false}
                        columns={[
                            { title: 'Thời gian', dataIndex: 'time' },
                            { title: 'User', dataIndex: 'user' },
                            { title: 'Hoạt động', dataIndex: 'action' },
                            { title: 'Thay đổi', dataIndex: 'change', render: (val, record) => <Text strong style={{ color: record.type === 'earn' ? '#52c41a' : '#ff4d4f' }}>{val}</Text> }
                        ]}
                    />
                </Card>
            </Col>
        </Row>
    );

    return (
        <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0, color: '#001529' }}>Quản trị E-Detailing & Điểm thưởng</Title>
                <Text type="secondary">Thiết lập các chiến dịch học tập, cấu hình bài test trắc nghiệm và quản lý kho quà tặng Loyalty.</Text>
            </div>

            <Card bodyStyle={{ padding: 0 }} style={{ borderRadius: 8, overflow: 'hidden' }}>
                <Tabs 
                    defaultActiveKey="1" 
                    size="large" 
                    tabBarStyle={{ padding: '0 24px', backgroundColor: '#f5f5f5', margin: 0 }}
                    items={[
                        {
                            key: '1',
                            label: <span><VideoCameraOutlined /> Chiến dịch Video</span>,
                            children: <div style={{ padding: 24 }}><CampaignTab /></div>
                        },
                        {
                            key: '2',
                            label: <span><BookOutlined /> Ngân hàng Trắc nghiệm</span>,
                            children: <div style={{ padding: 24 }}><QuizTab /></div>
                        },
                        {
                            key: '3',
                            label: <span><SettingOutlined /> Cấu hình Loyalty</span>,
                            children: <div style={{ padding: 24, background: '#f5f5f5' }}><LoyaltyConfigTab /></div>
                        },
                        {
                            key: '4',
                            label: <span><LineChartOutlined /> Dữ liệu & Xếp hạng</span>,
                            children: <div style={{ padding: 24, background: '#f5f5f5' }}><UserDataTab /></div>
                        }
                    ]}
                />
            </Card>

            {/* MODALS CẤU HÌNH */}
            <Modal title="Tạo Chiến dịch E-Detailing Mới" open={isCampaignModalOpen} onCancel={() => setIsCampaignModalOpen(false)} onOk={() => setIsCampaignModalOpen(false)} width={700}>
                <Form layout="vertical">
                    <Form.Item label="Tên chiến dịch" required><Input placeholder="Nhập tên chiến dịch" /></Form.Item>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="Hãng dược (Sponsor)" required><Select placeholder="Chọn hãng tài trợ"><Option value="1">MediPharma</Option></Select></Form.Item></Col>
                        <Col span={12}><Form.Item label="Số điểm thưởng CME" required><InputNumber style={{ width: '100%' }} min={0} defaultValue={100} /></Form.Item></Col>
                    </Row>
                    <Form.Item label="URL Video E-Detailing" required><Input placeholder="https://youtube.com/..." /></Form.Item>
                    <Form.Item label="Cấu hình tracking video">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Switch checkedChildren="Bắt buộc xem tối thiểu 80% thời lượng" unCheckedChildren="Cho phép tua video" defaultChecked />
                            <Switch checkedChildren="Tắt âm thanh (Mute) mặc định" unCheckedChildren="Mở âm thanh mặc định" />
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Tạo Bộ Trắc nghiệm (Quiz)" open={isQuizModalOpen} onCancel={() => setIsQuizModalOpen(false)} onOk={() => setIsQuizModalOpen(false)} width={700}>
                <Form layout="vertical">
                    <Form.Item label="Tên Bộ câu hỏi" required><Input placeholder="Nhập tên bài test" /></Form.Item>
                    <Row gutter={16}>
                        <Col span={12}><Form.Item label="Gắn với chiến dịch"><Select placeholder="Chọn chiến dịch"><Option value="1">Giới thiệu MediJoint+</Option></Select></Form.Item></Col>
                        <Col span={12}><Form.Item label="Điều kiện vượt qua (Passing Score)" required><InputNumber style={{ width: '100%' }} min={1} defaultValue={8} addonAfter="câu đúng" /></Form.Item></Col>
                    </Row>
                    <Divider>Danh sách câu hỏi</Divider>
                    <Button type="dashed" block icon={<PlusOutlined />}>Thêm câu hỏi mới</Button>
                </Form>
            </Modal>
        </div>
    );
}
