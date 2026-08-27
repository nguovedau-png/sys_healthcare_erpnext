import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProLayout,
  PageContainer,
  ProCard,
} from '@ant-design/pro-components';
import {
  HomeOutlined,
  MedicineBoxOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BookOutlined,
  FolderOutlined,
  TagsOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Avatar, Space } from 'antd';
import { useAuth } from '../context/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { user, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Get current page title from URL
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const currentPath = pathname.replace('/frontend', '') || '/dashboard';
  const getPageTitle = () => {
    if (pathname.includes('/profile')) return 'My Profile';
    if (pathname.includes('/products')) return 'Products';
    if (pathname.includes('/orders')) return 'Orders';
    if (pathname.includes('/reports')) return 'Reports';
    if (pathname.includes('/settings')) return 'Settings';
    if (pathname.includes('/subjects')) return 'Subjects';
    if (pathname.includes('/folders')) return 'Folders';
    if (pathname.includes('/topics')) return 'Topics';
    if (pathname.includes('/tags')) return 'Tags';
    if (pathname.includes('/comments')) return 'Comments';
    return 'Dashboard';
  };

  // User menu dropdown
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
      onClick: () => {
        window.location.href = '/frontend/profile';
      },
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: () => {
        logout().then(() => {
          window.location.href = '/frontend/login';
        });
      },
    },
  ];

  return (
    <ProLayout
      title="LM Pharma"
      logo={
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="8" fill="#1890ff" />
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontWeight="bold"
          >
            LM
          </text>
        </svg>
      }
      layout="mix"
      fixSiderbar
      fixedHeader
      collapsed={collapsed}
      onCollapse={(isCollapsed) => setCollapsed(isCollapsed)}
      breakpoint={false}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            if (item.path) {
              navigate(`/frontend${item.path}`);
            }
          }}
        >
          {dom}
        </div>
      )}
      avatarProps={{
        src: user?.user_image || undefined,
        title: currentUser || 'User',
        render: (_: any, avatarChildren: any) => {
          return (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  src={user?.user_image}
                  size="small"
                  icon={!user?.user_image ? <UserOutlined /> : undefined}
                />
                <span style={{ color: 'inherit' }}>{currentUser || 'User'}</span>
              </Space>
            </Dropdown>
          );
        },
      }}
      menuHeaderRender={(logo, title) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '0 12px',
            cursor: 'pointer',
          }}
        >
          {logo}
          {title}
        </div>
      )}
      menuDataRender={() => [
        {
          path: '/dashboard',
          name: 'Dashboard',
          icon: <HomeOutlined />,
        },
        {
          path: '/subjects',
          name: 'Subjects',
          icon: <BookOutlined />,
        },
        {
          path: '/folders',
          name: 'Folders',
          icon: <FolderOutlined />,
        },
        {
          path: '/topics',
          name: 'Topics',
          icon: <BookOutlined />,
        },
        {
          path: '/tags',
          name: 'Tags',
          icon: <TagsOutlined />,
        },
        {
          path: '/comments',
          name: 'Comments',
          icon: <MessageOutlined />,
        },
        {
          path: '/products',
          name: 'Products',
          icon: <MedicineBoxOutlined />,
        },
        {
          path: '/orders',
          name: 'Orders',
          icon: <ShoppingCartOutlined />,
        },
        {
          path: '/profile',
          name: 'My Profile',
          icon: <UserOutlined />,
        },
        {
          path: '/reports',
          name: 'Reports',
          icon: <BarChartOutlined />,
          children: [
            {
              path: '/reports/sales',
              name: 'Sales Reports',
            },
            {
              path: '/reports/inventory',
              name: 'Inventory Reports',
            },
          ],
        },
        {
          path: '/settings',
          name: 'Settings',
          icon: <SettingOutlined />,
        },
      ] as any}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        return [
          <Button key="notifications" type="text" shape="circle">
            🔔
          </Button>,
        ];
      }}
      menuFooterRender={(props) => {
        return (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ color: '#999', fontSize: 12 }}>LM Pharma v1.0</div>
          </div>
        );
      }}
      route={{
        path: '/',
        routes: [],
      }}
      location={{
        pathname: currentPath,
      }}
    >
      <PageContainer
        header={{
          title: getPageTitle(),
          subTitle: pathname.includes('/profile') 
            ? 'Manage your personal information' 
            : 'Welcome to LM Pharma Management System',
        }}
      >
        <ProCard>
          {children}
        </ProCard>
      </PageContainer>
    </ProLayout>
  );
};

export default MainLayout;
