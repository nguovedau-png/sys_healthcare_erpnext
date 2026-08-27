import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

const { Title, Text } = Typography;

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const onFinish = async (values: { email: string }) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/forgot-password', values);
            if (response.data.success) {
                message.success('Password reset link sent to your email');
                setEmailSent(true);
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to send reset link');
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
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Title level={2}>Forgot Password</Title>
            </div>
            {!emailSent ? (
                <>
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <Text type="secondary">Enter your email address and we'll send you a link to reset your password</Text>
                    </div>

                    <Form
                        name="forgot-password"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            label={<span style={{ fontWeight: 500 }}>Email</span>}
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email', message: 'Please enter a valid email' }
                            ]}
                        >
                            <Input
                                placeholder="name@example.com"
                                size="large"
                                style={{ borderRadius: 8, padding: '10px 12px' }}
                            />
                        </Form.Item>

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
                                Send Reset Link
                            </Button>
                        </Form.Item>
                    </Form>

                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                        <Link to="/login" style={{ color: '#667eea', fontWeight: 500 }}>Back to Login</Link>
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Text style={{ fontSize: 16 }}>Check your email for the password reset link</Text>
                    <div style={{ marginTop: 24 }}>
                        <Link to="/login">
                            <Button type="primary" block style={{
                                height: 48,
                                borderRadius: 10,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                            }}>
                                Back to Login
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default ForgotPassword;
