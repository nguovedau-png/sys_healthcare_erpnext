import React, { useState, useMemo } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Typography } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    DashboardOutlined,
    CalendarOutlined,
    ApartmentOutlined,
    MessageOutlined,
    SafetyOutlined,
    TeamOutlined, // Added from original, not in snippet
    FileTextOutlined,
    ThunderboltOutlined,
    PictureOutlined,
    ApiOutlined,
    DatabaseOutlined, // For Jobs
    KeyOutlined, // For OIDC
    GlobalOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import NotificationBell from '../components/NotificationBell';
import { PERMISSIONS, hasPermission, isAdmin } from '../utils/permissions';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const DashboardLayout: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);

    // Get user permissions from user object
    const userPermissions = useMemo(() => {
        if (!user) return [];
        // If user has role with permissions array
        if (user.role?.permissions) {
            return user.role.permissions.map((p: any) => p.name || p);
        }
        // If permissions are directly on user
        if (user.permissions) {
            return user.permissions.map((p: any) => p.name || p);
        }
        return [];
    }, [user]);

    const userRole = user?.role?.name || user?.role || '';

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    };

    const userMenu = {
        items: [
            {
                key: 'profile',
                label: t('common.profile'),
                icon: <UserOutlined />,
                onClick: () => navigate('/profile')
            },
            {
                key: 'logout',
                label: t('common.logout'),
                icon: <LogoutOutlined />,
                onClick: handleLogout,
                danger: true
            }
        ]
    };

    // Define menu items with permission requirements
    const allMenuItems = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: t('common.dashboard'),
            permission: null, // Always visible
        },
        {
            key: '/healthcare/operations',
            icon: <CalendarOutlined />,
            label: 'Vận hành phòng khám',
            permission: null,
        },
        {
            key: '/users',
            icon: <UserOutlined />,
            label: t('common.users'),
            permission: PERMISSIONS.VIEW_USERS,
        },
        {
            key: '/employees',
            icon: <TeamOutlined />,
            label: 'Employees', // TODO: Add to locale
            permission: PERMISSIONS.VIEW_EMPLOYEES,
        },
        {
            key: '/departments',
            icon: <ApartmentOutlined />,
            label: 'Departments', // TODO: Add to locale
            permission: PERMISSIONS.VIEW_DEPARTMENTS,
        },
        {
            key: '/chat',
            icon: <MessageOutlined />,
            label: 'Chat',
            permission: PERMISSIONS.VIEW_CHAT,
        },
        {
            key: '/roles',
            icon: <SafetyOutlined />,
            label: 'Roles',
            permission: PERMISSIONS.VIEW_ROLES,
        },
        {
            key: '/audit-logs',
            icon: <FileTextOutlined />,
            label: 'Audit Logs',
            permission: PERMISSIONS.VIEW_AUDIT_LOGS,
        },
        {
            key: '/jobs',
            icon: <ThunderboltOutlined />,
            label: 'Jobs & Queues',
            permission: null,
        },
        {
            key: '/media',
            icon: <PictureOutlined />,
            label: 'Media Manager',
            permission: null,
        },
        {
            key: '/webhooks',
            icon: <ApiOutlined />,
            label: 'Webhooks',
            permission: 'admin',
        },
        {
            key: '/oidc-clients',
            icon: <KeyOutlined />,
            label: 'OAuth Apps',
            permission: 'admin',
        },
        {
            key: '/cache',
            icon: <DatabaseOutlined />,
            label: 'Cache Manager',
            permission: 'admin',
        },
        {
            key: '/system/status',
            icon: <DashboardOutlined />,
            label: 'System Status',
            permission: 'admin',
        },
        {
            key: '/settings',
            icon: <SettingOutlined />,
            label: t('common.settings'),
            permission: PERMISSIONS.VIEW_SETTINGS,
        },
    ];

    // Filter menu items based on permissions
    const menuItems = useMemo(() => {
        // Admin sees everything
        if (isAdmin(userRole)) {
            return allMenuItems;
        }

        // Filter based on permissions
        const filtered = allMenuItems.filter(item => {
            // Items without permission requirement are always visible
            if (!item.permission) return true;
            // Check if user has the required permission
            const hasAccess = hasPermission(userPermissions, item.permission);
            return hasAccess;
        });

        return filtered;
    }, [userPermissions, userRole, user]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: 'linear-gradient(180deg, #1a1f3a 0%, #0f1419 100%)',
                    boxShadow: '2px 0 8px rgba(0,0,0,0.15)'
                }}
            >
                <div style={{
                    height: 64,
                    margin: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 8,
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: collapsed ? 16 : 18,
                    letterSpacing: 1
                }}>
                    {collapsed ? 'HD' : 'HD Admin'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    onClick={({ key }) => navigate(key)}
                    items={menuItems}
                    style={{
                        background: 'transparent',
                        border: 'none'
                    }}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: '0 24px',
                    background: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    zIndex: 1
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '18px',
                            width: 48,
                            height: 48,
                            color: '#1a1f3a'
                        }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <NotificationBell />
                        <Dropdown menu={userMenu} placement="bottomRight">
                            <div style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '8px 16px',
                                borderRadius: 8,
                                transition: 'all 0.3s',
                                background: '#f5f5f5'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#e8e8e8'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
                            >
                                <Avatar
                                    icon={<UserOutlined />}
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Text strong style={{ fontSize: 14, color: '#1a1f3a' }}>
                                        {user?.fullName || 'Admin User'}
                                    </Text>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {userRole || 'Administrator'}
                                    </Text>
                                </div>
                            </div>
                        </Dropdown>
                        <Dropdown menu={{
                            items: [
                                { key: 'en', label: 'English', onClick: () => i18n.changeLanguage('en') },
                                { key: 'vi', label: 'Tiếng Việt', onClick: () => i18n.changeLanguage('vi') }
                            ]
                        }}>
                            <Button icon={<GlobalOutlined />} type="text" />
                        </Dropdown>
                    </div>
                </Header>
                <Content style={{
                    margin: '24px',
                    minHeight: 280,
                    background: '#f0f2f5',
                    borderRadius: 8,
                    overflow: 'auto'
                }}>
                    <div style={{
                        background: '#fff',
                        padding: 24,
                        borderRadius: 8,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.03)',
                        minHeight: 'calc(100vh - 160px)',
                        width: '100%'
                    }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
