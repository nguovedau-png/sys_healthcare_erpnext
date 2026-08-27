"use client";
import React, { useState } from "react";
import { Layout, Menu, List, Typography, Avatar, Tag, Button, Empty, Space, Divider, Card } from "antd";
import { 
    AppstoreOutlined, 
    TeamOutlined, 
    BookOutlined, 
    CalendarOutlined, 
    ShopOutlined, 
    SolutionOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    BellOutlined
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

// Mock Data
const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'system', title: 'Cập nhật phiên bản hệ thống 2.0', desc: 'Hệ thống đã được cập nhật thêm nhiều tính năng mới nhằm nâng cao trải nghiệm người dùng.', fullContent: 'Chào bạn,\n\nHệ thống EHR đã chính thức được nâng cấp lên phiên bản 2.0. Trong phiên bản này, chúng tôi đã bổ sung:\n- Tính năng Siêu thị Thuốc dành cho đối tác.\n- Tính năng tìm kiếm Việc làm chuyên ngành Y tế.\n- Nâng cấp tốc độ tải trang và sửa một số lỗi giao diện.\n\nTrân trọng,\nĐội ngũ phát triển', date: '2023-10-27T10:00:00Z', isRead: false },
    { id: 2, type: 'system', title: 'Bảo trì máy chủ định kỳ', desc: 'Máy chủ sẽ được bảo trì vào lúc 00:00 ngày mai.', fullContent: 'Hệ thống sẽ tạm ngưng hoạt động từ 00:00 đến 02:00 sáng ngày mai để thực hiện bảo trì định kỳ. Mong bạn thông cảm vì sự bất tiện này.', date: '2023-10-25T08:00:00Z', isRead: true },
    { id: 3, type: 'community', title: 'Bs. Tuấn đã trả lời bài viết của bạn', desc: 'Có một bình luận mới trong ca lâm sàng "Bệnh nhân tiểu đường tuýp 2".', fullContent: 'Bs. Tuấn đã để lại bình luận:\n\n"Theo tôi phác đồ hiện tại khá ổn, tuy nhiên cần theo dõi thêm chức năng thận của bệnh nhân trong 2 tuần tới."\n\nHãy nhấn vào đây để xem toàn bộ cuộc thảo luận.', date: '2023-10-26T14:30:00Z', isRead: false },
    { id: 4, type: 'course', title: 'Bài giảng mới đã được mở', desc: 'Bài 3: Cập nhật điều trị tăng huyết áp đã có sẵn.', fullContent: 'Chào bạn,\n\nBài giảng số 3 trong khoá học "Cập nhật Nội khoa 2024" đã được mở khoá. Bạn có thể truy cập ngay bây giờ để tiếp tục việc học của mình.\n\nChúc bạn học tập hiệu quả!', date: '2023-10-27T09:15:00Z', isRead: false },
    { id: 5, type: 'event', title: 'Nhắc nhở: Hội thảo Tim mạch trực tuyến', desc: 'Sự kiện sẽ bắt đầu sau 30 phút nữa.', fullContent: 'Hội thảo "Cập nhật chẩn đoán và điều trị Suy tim" sẽ bắt đầu lúc 14:00 chiều nay.\n\nLink tham dự (Zoom): https://zoom.us/j/123456789\nPasscode: 123456\n\nVui lòng vào phòng sớm 5 phút để ổn định kết nối.', date: '2023-10-27T13:30:00Z', isRead: true },
    { id: 6, type: 'market', title: 'Đơn hàng #ORD-12345 đang được giao', desc: 'Đơn hàng mua từ Siêu thị Thuốc đang trên đường đến địa chỉ của bạn.', fullContent: 'Đơn hàng #ORD-12345 của bạn đã được đối tác giao hàng tiếp nhận và đang trên đường giao. Bạn có thể kiểm tra định vị tài xế trong phần Chi tiết đơn hàng.\n\nTổng thanh toán (COD): 1.250.000đ', date: '2023-10-26T11:20:00Z', isRead: true },
    { id: 7, type: 'job', title: 'Nhà tuyển dụng đã xem hồ sơ của bạn', desc: 'Bệnh viện Đa khoa Tâm Anh vừa xem CV của bạn.', fullContent: 'Tuyệt vời! Hồ sơ ứng tuyển vị trí "Bác sĩ Nội tổng hợp" của bạn đã được bộ phận nhân sự Bệnh viện Đa khoa Tâm Anh xem xét vào lúc 10:00 sáng nay.\n\nHãy chuẩn bị tinh thần có thể nhận được cuộc gọi phỏng vấn sớm nhé!', date: '2023-10-25T10:00:00Z', isRead: false },
];

const CATEGORIES = [
    { key: 'all', icon: <AppstoreOutlined />, label: 'Tất cả thông báo' },
    { key: 'system', icon: <TeamOutlined />, label: 'Hệ thống' },
    { key: 'community', icon: <TeamOutlined />, label: 'Cộng đồng' },
    { key: 'course', icon: <BookOutlined />, label: 'Khóa học' },
    { key: 'event', icon: <CalendarOutlined />, label: 'Sự kiện' },
    { key: 'market', icon: <ShopOutlined />, label: 'Siêu thị thuốc' },
    { key: 'job', icon: <SolutionOutlined />, label: 'Việc làm' },
];

export default function NotificationsInboxPage() {
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedNotifId, setSelectedNotifId] = useState<number | null>(null);

    const filteredNotifs = activeTab === 'all' 
        ? notifications 
        : notifications.filter(n => n.type === activeTab);

    const selectedNotif = notifications.find(n => n.id === selectedNotifId);

    const handleSelectNotif = (id: number) => {
        setSelectedNotifId(id);
        // Mark as read
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const getIconForType = (type: string) => {
        const cat = CATEGORIES.find(c => c.key === type);
        return cat ? cat.icon : <BellOutlined />;
    };

    return (
        <Layout style={{ minHeight: 'calc(100vh - 56px)', background: '#f5f5f5', padding: '24px' }}>
            <Card bodyStyle={{ padding: 0 }} style={{ height: 'calc(100vh - 104px)', display: 'flex', flexDirection: 'column', borderRadius: 8, overflow: 'hidden' }}>
                <Layout style={{ background: '#fff', height: '100%' }}>
                    {/* LEFT SIDEBAR - CATEGORIES */}
                    <Sider width={220} style={{ background: '#fafafa', borderRight: '1px solid #f0f0f0' }}>
                        <div style={{ padding: '24px 16px 16px', borderBottom: '1px solid #f0f0f0' }}>
                            <Title level={4} style={{ margin: 0 }}>Hộp thư</Title>
                        </div>
                        <Menu
                            mode="inline"
                            selectedKeys={[activeTab]}
                            style={{ borderRight: 0, background: 'transparent' }}
                            items={CATEGORIES}
                            onClick={({ key }) => {
                                setActiveTab(key);
                                setSelectedNotifId(null);
                            }}
                        />
                    </Sider>

                    {/* MIDDLE - NOTIFICATION LIST */}
                    <div style={{ width: 380, borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text strong style={{ fontSize: 16 }}>{CATEGORIES.find(c => c.key === activeTab)?.label}</Text>
                            <Button type="link" size="small" onClick={handleMarkAllRead}>Đánh dấu đã đọc</Button>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            <List
                                itemLayout="horizontal"
                                dataSource={filteredNotifs}
                                renderItem={item => (
                                    <List.Item 
                                        onClick={() => handleSelectNotif(item.id)}
                                        style={{ 
                                            padding: '16px 24px', 
                                            cursor: 'pointer', 
                                            background: selectedNotifId === item.id ? '#e6f7ff' : (item.isRead ? '#fff' : '#f0f5ff'),
                                            borderLeft: selectedNotifId === item.id ? '3px solid #1890ff' : '3px solid transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar 
                                                    style={{ backgroundColor: item.isRead ? '#d9d9d9' : '#1890ff' }}
                                                    icon={getIconForType(item.type)}
                                                />
                                            }
                                            title={
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text strong={!item.isRead} ellipsis style={{ maxWidth: 200 }}>{item.title}</Text>
                                                    {!item.isRead && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1890ff' }} />}
                                                </div>
                                            }
                                            description={
                                                <div>
                                                    <Text type="secondary" ellipsis style={{ maxWidth: 250 }}>{item.desc}</Text>
                                                    <div style={{ marginTop: 8 }}>
                                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                                            <ClockCircleOutlined style={{ marginRight: 4 }} />
                                                            {new Date(item.date).toLocaleString('vi-VN')}
                                                        </Text>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>

                    {/* RIGHT - NOTIFICATION DETAIL */}
                    <Content style={{ padding: '0', background: '#fff', flex: 1, overflowY: 'auto' }}>
                        {selectedNotif ? (
                            <div style={{ padding: 40, maxWidth: 800 }}>
                                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                                    <div>
                                        <Space size={12} style={{ marginBottom: 16 }}>
                                            <Tag color="blue" icon={getIconForType(selectedNotif.type)}>
                                                {CATEGORIES.find(c => c.key === selectedNotif.type)?.label}
                                            </Tag>
                                            <Text type="secondary">
                                                {new Date(selectedNotif.date).toLocaleString('vi-VN')}
                                            </Text>
                                        </Space>
                                        <Title level={2} style={{ margin: 0 }}>{selectedNotif.title}</Title>
                                    </div>
                                    
                                    <Divider style={{ margin: 0 }} />

                                    <div style={{ fontSize: 15, lineHeight: 1.8, color: '#262626', whiteSpace: 'pre-wrap' }}>
                                        {selectedNotif.fullContent}
                                    </div>

                                    {selectedNotif.type === 'market' && (
                                        <Button type="primary" style={{ marginTop: 16 }}>Xem chi tiết đơn hàng</Button>
                                    )}
                                    {selectedNotif.type === 'job' && (
                                        <Button type="primary" style={{ marginTop: 16 }}>Đến trang Quản lý hồ sơ</Button>
                                    )}
                                    {selectedNotif.type === 'course' && (
                                        <Button type="primary" style={{ marginTop: 16 }}>Vào học ngay</Button>
                                    )}
                                </Space>
                            </div>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Empty 
                                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                                    description={<Text type="secondary">Chọn một thông báo để xem chi tiết</Text>}
                                />
                            </div>
                        )}
                    </Content>
                </Layout>
            </Card>
        </Layout>
    );
}