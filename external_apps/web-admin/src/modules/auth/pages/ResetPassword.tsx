import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../../services/api';

const { Title, Text } = Typography;

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const onFinish = async (values: { password: string; confirmPassword: string }) => {
        if (values.password !== values.confirmPassword) {
            message.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/reset-password', {
                token,
                newPassword: values.password
            });

            if (response.data.success) {
                message.success('Password reset successfully');
                navigate('/login');
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to reset password');
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
                <Title level={2}>Reset Password</Title>
                <Text type="secondary">Enter your new password</Text>
            </div>

            <Form
                name="reset-password"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="password"
                    label={<span style={{ fontWeight: 500 }}>New Password</span>}
                    rules={[
                        { required: true, message: 'Please enter your new password' },
                        { min: 8, message: 'Password must be at least 8 characters' }
                    ]}
                >
                    <Input.Password
                        placeholder="Enter new password"
                        size="large"
                        style={{ borderRadius: 8, padding: '10px 12px' }}
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label={<span style={{ fontWeight: 500 }}>Confirm Password</span>}
                    rules={[
                        { required: true, message: 'Please confirm your password' }
                    ]}
                >
                    <Input.Password
                        placeholder="Confirm new password"
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
                            marginTop: 16,
                            boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)'
                        }}
                    >
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ResetPassword;
