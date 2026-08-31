'use client';
import './globals.css';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout, Menu, ConfigProvider, theme, Avatar, Badge, Dropdown, Button, App } from 'antd';
import type { MenuProps } from 'antd';
import {
    DashboardOutlined,
    FileTextOutlined,
    UserOutlined,
    BankOutlined,
    ReadOutlined,
    BarChartOutlined,
    BellOutlined,
    VideoCameraOutlined,
    ShoppingCartOutlined,
    DollarCircleOutlined,
    NotificationOutlined,
    TeamOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import NotificationBell from '@/components/admin/NotificationBell';

const inter = Inter({ subsets: ['latin'] });
const { Header, Content, Sider } = Layout;

const menuItems = [
    {
        group: 'Tổng quan',
        icon: 'flaticon-dashboard',
        items: [
            { label: 'Dashboard', href: '', icon: 'flaticon-chart' },
            { label: 'Tổng quan', href: '/dashboard', icon: 'flaticon-dashboard' },
            { label: 'Analytics', href: '/dashboard/analytics', icon: 'flaticon-chart' },
            { label: 'Lịch làm việc', href: '/schedule', icon: 'flaticon-calendar' },
            { label: 'Tài chính', href: '/finance', icon: 'flaticon-money' },
            { label: 'Marketing', href: '/marketing/campaigns', icon: 'flaticon-megaphone' },
        ]
    },
    {
        group: 'Quản lý Nội dung',
        icon: 'flaticon-document',
        items: [
            { label: 'Bài viết', href: '/content/posts', icon: 'flaticon-newspaper' },
            { label: 'Chuyên mục', href: '/content/categories', icon: 'flaticon-list' },
            { label: 'Trang tĩnh', href: '/content/pages', icon: 'flaticon-page' },
            { label: 'Banner', href: '/content/banners', icon: 'flaticon-image' },
            { label: 'Video', href: '/content/videos', icon: 'flaticon-video' },
            { label: 'Thư viện Media', href: '/content/media', icon: 'flaticon-image' },
            { label: 'Tìm kiếm nhiều nhất', href: '/content/top-searches', icon: 'flaticon-search' },
        ]
    },
    {
        group: 'Quản lý Người dùng',
        icon: 'flaticon-user',
        items: [
            { label: 'Quản trị viên', href: '/users', icon: 'flaticon-admin' },
            { label: 'Phân quyền', href: '/users/roles', icon: 'flaticon-shield' },
            { label: 'Support (Impersonate)', href: '/users/impersonate', icon: 'flaticon-support' },
        ]
    },
    {
        group: 'Quản lý Đối tác',
        icon: 'flaticon-hospital',
        items: [
            { label: 'Bệnh nhân', href: '/partners/patients', icon: 'flaticon-patient' },
            { label: 'Bác sĩ', href: '/partners/doctors', icon: 'flaticon-doctor' },
            { label: 'Bệnh viện', href: '/partners/hospitals', icon: 'flaticon-building' },
            { label: 'Phòng khám', href: '/partners/clinics', icon: 'flaticon-clinic' },
            { label: 'Nhà thuốc', href: '/partners/pharmacies', icon: 'flaticon-pharmacy' },
            { label: 'Duyệt hồ sơ', href: '/verify', icon: 'flaticon-checked' },
            { label: 'Chờ duyệt', href: '/partners/pending', icon: 'flaticon-hourglass' },
        ]
    },
    {
        group: 'Đào tạo & CME',
        icon: 'flaticon-diploma',
        items: [
            { label: 'Khóa học CME/CPE', href: '/education/courses', icon: 'flaticon-book' },
            { label: 'Quản lý học viên', href: '/education/enrollments', icon: 'flaticon-student' },
            { label: 'Import Học viên', href: '/education/import', icon: 'flaticon-upload' },
            { label: 'Giảng viên', href: '/education/lecturers', icon: 'flaticon-user-1' },
            { label: 'Phân tích & Thống kê', href: '/education/analytics', icon: 'flaticon-stats' },
            { label: 'Trắc nghiệm', href: '/education/quizzes', icon: 'flaticon-list' },
            { label: 'Kết quả Trắc nghiệm', href: '/education/quizzes/results', icon: 'flaticon-checked' },
            { label: 'Khảo sát', href: '/surveys', icon: 'flaticon-edit' },
        ]
    },
    {
        group: 'Báo cáo & Phân tích',
        icon: 'flaticon-stats',
        items: [
            { label: 'Phân tích Người dùng', href: '/reports/users', icon: 'flaticon-user-1' },
            { label: 'Tiến độ Học tập', href: '/reports/progress', icon: 'flaticon-book' },
            { label: 'KPI Khóa học', href: '/reports/kpi', icon: 'flaticon-diploma' },
            { label: 'Xuất Báo cáo', href: '/reports/export', icon: 'flaticon-download' },
            { label: 'Tổng quan', href: '/reports/overview', icon: 'flaticon-dashboard' },
            { label: 'Doanh thu', href: '/reports/revenue', icon: 'flaticon-money' },
        ]
    },
    {
        group: 'Push Notification',
        icon: 'flaticon-bell',
        items: [
            { label: 'Quản lý Notification', href: '/notifications', icon: 'flaticon-notification' },
        ]
    },
    {
        group: 'Hội thảo Offline',
        icon: 'flaticon-presentation',
        items: [
            { label: 'Quản lý Hội thảo', href: '/seminars', icon: 'flaticon-event' },
            { label: 'Banner', href: '/seminars/banners', icon: 'flaticon-image' },
            { label: 'Diễn giả', href: '/seminars/speakers', icon: 'flaticon-user' },
            { label: 'Phiên hội thảo', href: '/seminars/sessions', icon: 'flaticon-calendar' },
            { label: 'Check-in', href: '/seminars/checkin', icon: 'flaticon-checked' },
            { label: 'Mời tham dự', href: '/seminars/invitations', icon: 'flaticon-send' },
        ]
    },
    {
        group: 'Truyền thông & Sự kiện',
        icon: 'flaticon-video-camera',
        items: [
            { label: 'Livestream', href: '/live', icon: 'flaticon-play-button' },
            { label: 'Quản lý Bình luận', href: '/engagement/comments', icon: 'flaticon-comment' },
        ]
    },
    {
        group: 'Quản lý Đơn hàng',
        icon: 'flaticon-shopping-cart',
        items: [
            { label: 'Đặt khám', href: '/orders/appointments', icon: 'flaticon-calendar' },
            { label: 'Mua thuốc', href: '/orders/pharmacy', icon: 'flaticon-pill' },
            { label: 'Xét nghiệm', href: '/orders/lab-tests', icon: 'flaticon-flask' },
            { label: 'Hoàn tiền', href: '/orders/refunds', icon: 'flaticon-refund' },
        ]
    },
    {
        group: 'Tài chính',
        icon: 'flaticon-money',
        items: [
            { label: 'Doanh thu', href: '/finance/revenue', icon: 'flaticon-chart-line' },
            { label: 'Hoa hồng', href: '/finance/commissions', icon: 'flaticon-percentage' },
            { label: 'Rút tiền', href: '/finance/withdrawals', icon: 'flaticon-withdraw' },
            { label: 'Báo cáo', href: '/finance/reports', icon: 'flaticon-report' },
        ]
    },
    {
        group: 'Marketing',
        icon: 'flaticon-megaphone',
        items: [
            { label: 'Khuyến mãi', href: '/marketing/promotions', icon: 'flaticon-discount' },
            { label: 'Voucher', href: '/marketing/vouchers', icon: 'flaticon-ticket' },
            { label: 'Email', href: '/marketing/emails', icon: 'flaticon-email' },
            { label: 'Push Notification', href: '/marketing/push-notifications', icon: 'flaticon-bell' },
        ]
    },
    {
        group: 'Cộng đồng',
        icon: 'flaticon-community',
        items: [
            { label: 'Diễn đàn', href: '/community/forum', icon: 'flaticon-forum' },
            { label: 'Hỏi đáp', href: '/community/qa', icon: 'flaticon-question' },
            { label: 'Nhóm hỗ trợ', href: '/community/support-groups', icon: 'flaticon-group' },
            { label: 'Kiểm duyệt', href: '/community/moderation', icon: 'flaticon-moderation' },
        ]
    },
    {
        group: 'Hệ thống',
        icon: 'flaticon-settings',
        items: [
            { label: 'Cấu hình Loyalty', href: '/settings/loyalty', icon: 'flaticon-star' },
            { label: 'Cấu hình AI', href: '/settings/ai', icon: 'flaticon-robot' },
            { label: 'Sức khỏe hệ thống', href: '/settings/system-health', icon: 'flaticon-dashboard' },
            { label: 'Nhật ký hệ thống', href: '/settings/audit-logs', icon: 'flaticon-list' },
            { label: 'Cài đặt chung', href: '/settings/general', icon: 'flaticon-gear' },
            { label: 'Email/SMS', href: '/settings/notifications', icon: 'flaticon-notification' },
            { label: 'Thanh toán', href: '/settings/payment', icon: 'flaticon-credit-card' },
            { label: 'SEO', href: '/settings/seo', icon: 'flaticon-seo' },
            { label: 'Backup', href: '/settings/backup', icon: 'flaticon-backup' },
        ]
    },
];


function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const themeToken = theme.useToken();
    const { colorBgContainer, borderRadiusLG } = themeToken.token;
    
    const userName = user?.name || 'Admin User';

    const handleLogout = async () => {
        await logout();
    };

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            label: 'Profile',
            icon: <UserOutlined />,
            onClick: () => router.push('/profile')
        },
        {
            key: 'settings',
            label: 'Setting',
            icon: <SettingOutlined />,
            onClick: () => router.push('/settings/general')
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout
        },
    ];

    const items: MenuProps['items'] = menuItems.map((group) => {
        // ... existing menu mapping ...
        const iconMap: Record<string, React.ReactNode> = {
            'flaticon-dashboard': <DashboardOutlined />,
            'flaticon-document': <FileTextOutlined />,
            'flaticon-user': <UserOutlined />,
            'flaticon-hospital': <BankOutlined />,
            'flaticon-diploma': <ReadOutlined />,
            'flaticon-stats': <BarChartOutlined />,
            'flaticon-bell': <BellOutlined />,
            'flaticon-presentation': <VideoCameraOutlined />,
            'flaticon-video-camera': <VideoCameraOutlined />,
            'flaticon-shopping-cart': <ShoppingCartOutlined />,
            'flaticon-money': <DollarCircleOutlined />,
            'flaticon-megaphone': <NotificationOutlined />,
            'flaticon-community': <TeamOutlined />,
            'flaticon-bar-chart': <BarChartOutlined />,
            'flaticon-settings': <SettingOutlined />,
        };

        return {
            key: group.group,
            label: group.group,
            icon: iconMap[group.icon] || <SettingOutlined />,
            children: group.items.map((item) => ({
                key: item.href,
                label: <Link href={item.href}>{item.label}</Link>,
            })),
        };
    });

    if (pathname?.startsWith('/auth')) {
        return (
            <ProtectedRoute redirectTo="/auth/login">
                {children}
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute redirectTo="/auth/login">
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    width={280}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <div style={{ padding: '24px', borderBottom: '1px solid #1f1f1f' }}>
                        <h1 style={{ color: 'white', fontSize: '24px', margin: 0, fontWeight: 'bold' }}>CMS Admin</h1>
                        <p style={{ color: '#4d4d4d', fontSize: '13px', margin: '4px 0 0 0' }}>Healthcare Platform</p>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[pathname]}
                        style={{ padding: '16px 0' }}
                        items={items}
                    />
                </Sider>
                <Layout style={{ marginLeft: 280 }}>
                    <Header
                        style={{
                            padding: '0 24px',
                            background: colorBgContainer,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            width: '100%',
                            borderBottom: '1px solid #f0f0f0'
                        }}
                    >
                        <h2 style={{ fontSize: '20px', margin: 0, fontWeight: 'bold' }}>Admin Panel</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <NotificationBell />
                            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                    <Avatar shape="circle" size="large" style={{ backgroundColor: '#1677ff' }}>
                                        {userName.charAt(0)}
                                    </Avatar>
                                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{userName}</span>
                                        <span style={{ fontSize: '12px', color: '#8c8c8c' }}>Welcome back</span>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ProtectedRoute>
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <AntdRegistry>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#1677ff',
                                borderRadius: 8,
                            },
                        }}
                    >
                        <App>
                            <AuthProvider>
                                <AdminLayoutContent>{children}</AdminLayoutContent>
                            </AuthProvider>
                        </App>
                    </ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
