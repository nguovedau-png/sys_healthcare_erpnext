"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Layout, Avatar, Badge, Dropdown, Button, Tabs, List, Typography } from 'antd';
const { Text } = Typography;
import type { MenuProps } from 'antd';
import {
    BellOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const PAGE_TITLES: Record<string, string> = {
    '/': 'Bảng điều khiển',
    '/bookings': 'Lịch hẹn khám',
    '/queues': 'Xếp số & Hàng chờ',
    '/consultation': 'Khám bệnh & Kê đơn',
    '/emr': 'Hồ sơ bệnh án',
    '/lab-orders': 'Cận lâm sàng',
    '/inventory': 'Kho thuốc',
    '/prescriptions': 'Duyệt đơn thuốc',
    '/schedule': 'Lịch trực',
    '/beds': 'Quản lý Giường bệnh',
    '/staff': 'Nhân sự',
    '/equipment': 'Vật tư & Thiết bị',
    '/departments': 'Khoa & Phòng',
    '/services': 'Dịch vụ & Bảng giá',
    '/chat': 'Tư vấn trực tuyến',
    '/reviews': 'Đánh giá',
    '/loyalty': 'Khách hàng thân thiết',
    '/learning': 'Đào tạo CME/CPE',
    '/handbook': 'Sổ tay Dược sĩ & Y khoa',
    '/community': 'Cộng đồng Nhà thuốc',
    '/health-community': 'Cộng đồng sức khỏe',
    '/market': 'Siêu thị Thuốc',
    '/courses': 'Học viện Y khoa Trực tuyến',
    '/membership': 'Điểm & Thành viên',
    '/learning-report': 'Báo cáo E-Learning',
    '/professional': 'Hồ sơ chuyên môn',
    '/certifications': 'Chứng chỉ hành nghề',
    '/jobs': 'Việc làm & Tuyển dụng',
    '/orders': 'Đơn hàng',
    '/posts': 'Bài viết',
    '/education': 'Giáo dục & Đào tạo',
    '/surveys': 'Khảo sát',
    '/reports': 'Báo cáo & Thống kê',
    '/finance': 'Tài chính',
    '/revenue': 'Doanh thu',
    '/notifications': 'Thông báo',
    '/settings': 'Cài đặt hệ thống',
    '/profile': 'Hồ sơ cá nhân',
    '/referrals': 'Chuyển tuyến & Hội chẩn',
    '/tele-surgery': 'Phẫu thuật từ xa',
    '/telemetry': 'Theo dõi sinh tồn IoT',
    '/health-id': 'Health ID — Hồ sơ cá nhân',
    '/compliance': 'Tuân thủ pháp quy',
    '/image-analysis': 'Chẩn đoán hình ảnh AI-PACS',
    '/medication-reminders': 'Nhắc lịch uống thuốc',
    '/doctor-qa': 'Hỏi đáp với Bác sĩ',
    '/hotline': 'Tổng đài 24/7',
    '/insurance': 'Tra cứu BHYT / BHSK',
    '/facility-finder': 'Cơ sở y tế & Nhà thuốc',
    '/sms-care': 'SMS Brandname Chăm sóc',
    '/health-news': 'Tin tức y tế',
    '/events': 'Sự kiện & Hội thảo',
    '/seminars': 'Seminar chuyên khoa',
    '/paraclinical': 'Cận lâm sàng',
    '/addresses': 'Địa chỉ',
    '/engagement': 'Tương tác bệnh nhân',
    '/pharmacy': 'Nhà thuốc',
    '/product-knowledge': 'Kiến thức sản phẩm',
    '/reception': 'Tiếp đón',
    '/live': 'Live Stream y tế',
    '/medical-journal': 'Tạp chí y học',
    '/export-reports': 'Xuất báo cáo',
};

interface HeaderProps {
    collapsed: boolean;
    onToggle: () => void;
}

export default function Header({ collapsed, onToggle }: HeaderProps) {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const userName = user?.name || 'User';
    const userRole = (user as any)?.role === 'doctor' || user?.roleId === 2 ? 'Bác sĩ' : 'Người dùng';

    const pageTitle = PAGE_TITLES[pathname] || PAGE_TITLES[Object.keys(PAGE_TITLES).find(k => pathname.startsWith(k) && k !== '/') || ''] || 'Bảng điều khiển';

    const handleLogout = async () => {
        if (logout) await logout();
        router.push('/login');
    };

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            label: <span style={{ fontWeight: 500, fontSize: 14 }}>Hồ sơ cá nhân</span>,
            icon: <UserOutlined />,
            onClick: () => router.push('/profile')
        },
        {
            key: 'settings',
            label: <span style={{ fontWeight: 500, fontSize: 14 }}>Cài đặt</span>,
            icon: <SettingOutlined />,
            onClick: () => router.push('/settings')
        },
        { type: 'divider' },
        {
            key: 'logout',
            label: <span style={{ fontWeight: 500, fontSize: 14 }}>Đăng xuất</span>,
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout
        },
    ];

    const notificationDropdownRender = () => (
        <div style={{ width: 450, background: '#fff', borderRadius: 8, boxShadow: '0 6px 16px rgba(0,0,0,0.12)', padding: '16px 16px 0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 600, fontSize: 16 }}>Thông báo của bạn</span>
                <Button type="link" size="small">Đánh dấu tất cả đã đọc</Button>
            </div>
            <Tabs
                defaultActiveKey="1"
                size="small"
                items={[
                    {
                        key: '1',
                        label: 'Hệ thống',
                        children: (
                            <List
                                itemLayout="horizontal"
                                dataSource={[{ title: 'Cập nhật phiên bản mới', desc: 'Hệ thống EHR đã được nâng cấp thêm tính năng mới.', time: '10 phút trước' }]}
                                renderItem={item => <List.Item><List.Item.Meta title={item.title} description={<><Text type="secondary" style={{ display: 'block' }}>{item.desc}</Text><Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text></>} /></List.Item>}
                            />
                        )
                    },
                    {
                        key: '2',
                        label: 'Cộng đồng',
                        children: (
                            <List
                                itemLayout="horizontal"
                                dataSource={[{ title: 'Bình luận mới', desc: 'Bs. Tuấn đã trả lời ca lâm sàng của bạn.', time: '1 giờ trước' }]}
                                renderItem={item => <List.Item><List.Item.Meta title={item.title} description={<><Text type="secondary" style={{ display: 'block' }}>{item.desc}</Text><Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text></>} /></List.Item>}
                            />
                        )
                    },
                    {
                        key: '3',
                        label: 'Khóa học',
                        children: (
                            <List
                                itemLayout="horizontal"
                                dataSource={[{ title: 'Bài giảng mới', desc: 'Đã có video mới trong khoá "Cập nhật Nội khoa 2024".', time: '3 giờ trước' }]}
                                renderItem={item => <List.Item><List.Item.Meta title={item.title} description={<><Text type="secondary" style={{ display: 'block' }}>{item.desc}</Text><Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text></>} /></List.Item>}
                            />
                        )
                    },
                    {
                        key: '4',
                        label: 'Event',
                        children: (
                            <List
                                itemLayout="horizontal"
                                dataSource={[{ title: 'Nhắc nhở sự kiện', desc: 'Hội thảo Tim mạch sẽ diễn ra vào 14:00 chiều nay.', time: 'Hôm nay' }]}
                                renderItem={item => <List.Item><List.Item.Meta title={item.title} description={<><Text type="secondary" style={{ display: 'block' }}>{item.desc}</Text><Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text></>} /></List.Item>}
                            />
                        )
                    },
                    {
                        key: '5',
                        label: 'Siêu thị thuốc',
                        children: (
                            <List
                                itemLayout="horizontal"
                                dataSource={[{ title: 'Cập nhật đơn hàng', desc: 'Đơn hàng #ORD-12345 đang được giao đến bạn.', time: '1 ngày trước' }]}
                                renderItem={item => <List.Item><List.Item.Meta title={item.title} description={<><Text type="secondary" style={{ display: 'block' }}>{item.desc}</Text><Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text></>} /></List.Item>}
                            />
                        )
                    },
                    {
                        key: '6',
                        label: 'Việc làm',
                        children: (
                            <List
                                itemLayout="horizontal"
                                dataSource={[{ title: 'Hồ sơ được xem', desc: 'Bệnh viện Chợ Rẫy đã xem hồ sơ ứng tuyển của bạn.', time: '2 ngày trước' }]}
                                renderItem={item => <List.Item><List.Item.Meta title={item.title} description={<><Text type="secondary" style={{ display: 'block' }}>{item.desc}</Text><Text type="secondary" style={{ fontSize: 12 }}>{item.time}</Text></>} /></List.Item>}
                            />
                        )
                    },
                ]}
            />
            <div style={{ textAlign: 'center', borderTop: '1px solid #f0f0f0', padding: '12px 0' }}>
                <Button type="link" onClick={() => router.push('/notifications/info')}>Xem tất cả thông báo</Button>
            </div>
        </div>
    );

    return (
        <AntHeader
            style={{
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                width: '100%',
                background: '#ffffff',
                height: 56,
                lineHeight: '56px',
                borderBottom: '1px solid #f0f0f0',
                boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
                overflow: 'hidden',
            }}
        >
            {/* Left: toggle + page title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, lineHeight: 1 }}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={onToggle}
                    style={{ fontSize: 16, width: 32, height: 32, borderRadius: 4, color: '#595959', lineHeight: 1 }}
                />
                <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#1f1f1f', lineHeight: 1 }}>
                    {pageTitle}
                </h2>
            </div>

            {/* Right: bell + user */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, lineHeight: 1 }}>
                <Dropdown dropdownRender={notificationDropdownRender} placement="bottomRight" trigger={['click']}>
                    <Badge count={3} size="small" offset={[-4, 4]}>
                        <Button
                            type="text"
                            style={{ width: 34, height: 34, borderRadius: 4, lineHeight: 1 }}
                            icon={<BellOutlined style={{ fontSize: 17, color: '#595959' }} />}
                        />
                    </Badge>
                </Dropdown>

                <div style={{ width: 1, height: 18, background: '#e8e8e8' }} />

                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        cursor: 'pointer', padding: '0 6px', borderRadius: 4,
                        height: 40, lineHeight: 1,
                    }}>
                        <div style={{ textAlign: 'right', lineHeight: 1 }}>
                            <div style={{
                                fontWeight: 600, fontSize: 12, color: '#1f1f1f',
                                whiteSpace: 'nowrap', maxWidth: 120,
                                overflow: 'hidden', textOverflow: 'ellipsis',
                                lineHeight: '16px',
                            }}>
                                {userName}
                            </div>
                            <div style={{
                                fontSize: 10, fontWeight: 700, color: '#0050b3',
                                textTransform: 'uppercase', letterSpacing: '0.04em',
                                lineHeight: '14px', whiteSpace: 'nowrap',
                            }}>
                                {userRole}
                            </div>
                        </div>
                        <Avatar
                            shape="circle"
                            size={30}
                            src={(user as any)?.avatar || "/styles/img/user/user-1.jpg"}
                            style={{ border: '2px solid #e8e8e8', flexShrink: 0 }}
                        >
                            {!(user as any)?.avatar && userName.charAt(0)}
                        </Avatar>
                    </div>
                </Dropdown>
            </div>
        </AntHeader>
    );
}