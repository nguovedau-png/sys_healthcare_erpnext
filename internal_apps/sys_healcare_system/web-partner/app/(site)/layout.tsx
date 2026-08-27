"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/portal/Sidebar';
import Header from '@/components/portal/Header';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout, ConfigProvider } from 'antd';
import { usePathname } from 'next/navigation';

const { Content } = Layout;

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthRoute = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password';
    const [collapsed, setCollapsed] = useState(false);

    return (
        <ProtectedRoute>
            <AntdRegistry>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#0050b3',
                            borderRadius: 4,
                            fontFamily: 'var(--font-family), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                            colorBgContainer: '#ffffff',
                            colorText: '#1f1f1f',
                        },
                        components: {
                            Layout: {
                                bodyBg: '#f0f2f5',
                                headerBg: '#ffffff',
                                headerHeight: 56,
                                siderBg: '#001529',
                            },
                            Menu: {
                                darkItemBg: '#001529',
                                darkItemColor: 'rgba(255, 255, 255, 0.65)',
                                darkItemSelectedBg: '#0050b3',
                                darkItemSelectedColor: '#ffffff',
                                itemBorderRadius: 0,
                                itemMarginInline: 0,
                                itemMarginBlock: 0,
                            },
                            Card: {
                                borderRadiusLG: 4,
                            },
                            Button: {
                                borderRadius: 4,
                                controlHeight: 34,
                            },
                            Tabs: {
                                cardBg: '#f0f2f5',
                                horizontalMargin: 0,
                                titleFontSize: 13,
                            }
                        }
                    }}
                >
                    {isAuthRoute ? (
                        <div style={{ minHeight: '100vh', background: '#f5f5f5', width: '100%' }}>
                            {children}
                        </div>
                    ) : (
                        <Layout style={{ minHeight: '100vh' }}>
                            <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
                            <Layout
                                style={{
                                    marginLeft: collapsed ? 80 : 260,
                                    transition: 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
                                }}
                            >
                                <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
                                <Content style={{ padding: 24, minHeight: 280 }}>
                                    <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
                                        {children}
                                    </div>
                                </Content>
                            </Layout>
                        </Layout>
                    )}
                </ConfigProvider>
            </AntdRegistry>
        </ProtectedRoute>
    );
}
