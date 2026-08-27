"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
    DashboardOutlined,
    BarChartOutlined,
    CalendarOutlined,
    UnorderedListOutlined,
    FormOutlined,
    FileTextOutlined,
    MedicineBoxOutlined,
    HistoryOutlined,
    HomeOutlined,
    TeamOutlined,
    ToolOutlined,
    AppstoreOutlined,
    CommentOutlined,
    LikeOutlined,
    HeartOutlined,
    UserOutlined,
    ReadOutlined,
    IdcardOutlined,
    SolutionOutlined,
    BellOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    EditOutlined,
    BookOutlined,
    GlobalOutlined,
    FileSearchOutlined,
    DollarOutlined,
    SafetyOutlined,
    VideoCameraOutlined,
    TrophyOutlined,
    AuditOutlined,
    ShopOutlined,
    CrownOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (val: boolean) => void;
}

const menuGroups = [
    {
        key: 'overview',
        group: 'Quản trị & Tổng quan',
        icon: <DashboardOutlined />,
        items: [
            { label: 'Bảng điều khiển', href: '/', icon: <DashboardOutlined /> },
            { label: 'Báo cáo & Thống kê', href: '/reports', icon: <BarChartOutlined /> },
            { label: 'Tài chính & Doanh thu', href: '/finance', icon: <DollarOutlined /> },
            { label: 'Đơn hàng & Giao dịch', href: '/orders', icon: <ShoppingCartOutlined /> },
        ]
    },
    {
        key: 'medical_ops',
        group: 'Vận hành Y tế',
        icon: <MedicineBoxOutlined />,
        items: [
            { label: 'Lịch hẹn & Tiếp đón', href: '/bookings', icon: <CalendarOutlined /> },
            { label: 'Phòng khám & Kê đơn', href: '/consultation', icon: <FormOutlined /> },
            { label: 'Hồ sơ bệnh án (EMR)', href: '/emr', icon: <FileTextOutlined /> },
            { label: 'Kho thuốc & GPP', href: '/inventory', icon: <ShopOutlined /> },
            { label: 'Nhân sự & Lịch trực', href: '/staff', icon: <TeamOutlined /> },
            { label: 'Vật tư & Thiết bị', href: '/equipment', icon: <ToolOutlined /> },
        ]
    },
    {
        key: 'hubs',
        group: 'Hệ sinh thái Hub',
        icon: <GlobalOutlined />,
        items: [
            { label: 'Bác sĩ Hub', href: '/hub?type=doctor', icon: <UserOutlined /> },
            { label: 'Nhà thuốc Hub', href: '/hub?type=pharmacy', icon: <ShopOutlined /> },
            { label: 'Bệnh viện Hub', href: '/hub?type=hospital', icon: <HomeOutlined /> },
            { label: 'Phòng khám Hub', href: '/hub?type=clinic', icon: <MedicineBoxOutlined /> },
            { label: 'Việc làm Hub', href: '/job-market', icon: <SolutionOutlined /> },
            { label: 'Đào tạo Hub', href: '/hub?type=education', icon: <ReadOutlined /> },
        ]
    },
    {
        key: 'crm_social',
        group: 'CSKH & Cộng đồng',
        icon: <HeartOutlined />,
        items: [
            { label: 'Tư vấn & Telemedicine', href: '/zoom', icon: <CommentOutlined /> },
            { label: 'Dữ liệu Bệnh nhân', href: '/patients', icon: <UserOutlined /> },
            { label: 'Bài viết & Blog', href: '/posts', icon: <EditOutlined /> },
            { label: 'Cộng đồng sức khỏe', href: '/health-community', icon: <GlobalOutlined /> },
            { label: 'Đánh giá & Phản hồi', href: '/reviews', icon: <LikeOutlined /> },
        ]
    },
    {
        key: 'education_career',
        group: 'Đào tạo & Sự nghiệp',
        icon: <ReadOutlined />,
        items: [
            { label: 'Giáo dục y khoa', href: '/education', icon: <ReadOutlined /> },
            { label: 'Khóa học CME/CPE', href: '/courses', icon: <BookOutlined /> },
            { label: 'Báo cáo học tập', href: '/education/learning-report', icon: <BarChartOutlined /> },
            { label: 'Hồ sơ chuyên môn', href: '/professional', icon: <IdcardOutlined /> },
            { label: 'Chứng chỉ & Giải thưởng', href: '/certifications', icon: <TrophyOutlined /> },
            { label: 'Tuyển dụng & Việc làm', href: '/jobs', icon: <SolutionOutlined /> },
        ]
    },
    {
        key: 'personal',
        group: 'Cá nhân & Hệ thống',
        icon: <UserOutlined />,
        items: [
            { label: 'Thông báo', href: '/notifications', icon: <BellOutlined /> },
            { label: 'Cài đặt tài khoản', href: '/settings', icon: <SettingOutlined /> },
            { label: 'Thành viên & Điểm', href: '/membership', icon: <CrownOutlined /> },
        ]
    },
];

export default function Sidebar({ collapsed, onCollapse }: SidebarProps) {
    const pathname = usePathname();
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    // Find the current selected item and its parent group
    const currentItem = Object.values(menuGroups)
        .flatMap(g => g.items)
        .find(item => item.href !== '/' && pathname.startsWith(item.href));

    const selectedKey = pathname === '/' ? '/' : currentItem?.href || pathname;

    // Set openKeys initially based on the current path, but only once when component mounts
    useEffect(() => {
        if (!collapsed) {
            const activeGroup = menuGroups.find(g =>
                g.items.some(item => item.href !== '/' && pathname.startsWith(item.href))
            );
            if (activeGroup) {
                setOpenKeys([activeGroup.key]);
            } else if (pathname === '/') {
                setOpenKeys(['overview']);
            }
        } else {
            setOpenKeys([]);
        }
    }, [pathname, collapsed]);

    const onOpenChange = (keys: string[]) => {
        // Only keep the latest opened menu (accordion mode)
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (latestOpenKey) {
            setOpenKeys([latestOpenKey]);
        } else {
            setOpenKeys([]);
        }
    };

    const items: MenuProps['items'] = menuGroups.map((group) => ({
        key: group.key,
        icon: group.icon,
        label: <span style={{ fontWeight: 600 }}>{group.group}</span>,
        children: group.items.map((item) => ({
            key: item.href,
            icon: item.icon,
            label: <Link href={item.href} style={{ fontWeight: 500 }}>{item.label}</Link>,
        })),
    }));

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            trigger={null}
            width={260}
            collapsedWidth={80}
            theme="dark"
            style={{
                overflow: 'hidden',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 100,
                background: '#001529',
                boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Logo Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px', height: 56, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden', background: '#002140', flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, background: '#0050b3', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>M</span>
                </div>
                {!collapsed && (
                    <div style={{ minWidth: 0, overflow: 'hidden' }}>
                        <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: '#fff', lineHeight: 1.2, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>MediPortal</h2>
                        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Partner</span>
                    </div>
                )}
            </div>

            {/* Menu Section */}
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[selectedKey]}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                inlineIndent={24}
                style={{
                    borderRight: 0,
                    padding: '8px 0',
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}
                items={items}
            />
        </Sider>
    );
}
