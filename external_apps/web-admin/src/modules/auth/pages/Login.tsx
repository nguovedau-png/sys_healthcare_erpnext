import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import api from '../../../services/api';

const { Title, Text } = Typography;

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/login', values);
            if (res.data.success) {
                if (res.data.data.requires2FA) {
                    localStorage.setItem('tempToken', res.data.data.tempToken);
                    navigate('/2fa-verify');
                } else {
                    const { accessToken, refreshToken, user } = res.data.data;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    dispatch(setCredentials({ user, accessToken, refreshToken }));
                    message.success('Login successful!');
                    navigate('/');
                }
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            bordered={false}
            style={{
                width: '100%',
                maxWidth: 440,
                borderRadius: 20,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                overflow: 'hidden'
            }}
            bodyStyle={{ padding: '40px 32px' }}
        >
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{
                    width: 48,
                    height: 48,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 12,
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                    boxShadow: '0 4px 10px rgba(102, 126, 234, 0.4)'
                }}>
                    HD
                </div>
                <Title level={3} style={{ marginBottom: 8, color: '#1a1f3a', fontSize: '28px' }}>
                    Welcome Back
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                    Sign in to manage your application
                </Text>
            </div>

            <Form
                name="login"
                onFinish={onFinish}
                autoComplete="off"
                size="large"
                layout="vertical"
            >
                <Form.Item
                    name="email"
                    label={<span style={{ fontWeight: 500 }}>Email</span>}
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                        placeholder="name@example.com"
                        style={{ borderRadius: 8, padding: '10px 12px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={<span style={{ fontWeight: 500 }}>Password</span>}
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    style={{ marginBottom: 16 }}
                >
                    <Input.Password
                        prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                        placeholder="Enter your password"
                        style={{ borderRadius: 8, padding: '10px 12px' }}
                    />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
                    <Link to="/forgot-password" style={{ color: '#667eea', fontWeight: 500 }}>
                        Forgot Password?
                    </Link>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        style={{
                            height: 48,
                            borderRadius: 10,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            fontSize: 16,
                            fontWeight: 600,
                            boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)'
                        }}
                    >
                        Sign In
                    </Button>
                </Form.Item>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Text type="secondary">
                        Don't have an account? <Link to="/register" style={{ color: '#667eea', fontWeight: 600 }}>Create an account</Link>
                    </Text>
                </div>
            </Form>
        </Card>
    );
};

export default Login;
