import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const AuthLayout: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                zIndex: 0
            }} />

            {/* Abstract Shapes for visual interest */}
            <div style={{
                position: 'absolute',
                top: -100,
                left: -100,
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                filter: 'blur(80px)',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                bottom: -50,
                right: -50,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.2)',
                filter: 'blur(60px)',
                zIndex: 0
            }} />

            <Content style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default AuthLayout;
