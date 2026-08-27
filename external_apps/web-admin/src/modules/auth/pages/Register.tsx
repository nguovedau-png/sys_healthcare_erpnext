import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const { Title } = Typography;

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        if (values.password !== values.confirmPassword) {
            message.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/register', {
                email: values.email,
                password: values.password,
                fullName: values.fullName
            });

            if (response.data.success) {
                message.success('Registration successful! Please login');
                navigate('/login');
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return <Card style={{ width: 440, borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2}>Create Account</Title>
        </div>

        <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            style={{ marginTop: 24 }}
        >
            <Form.Item
                name="fullName"
                rules={[{ required: true, message: 'Please enter your full name' }]}
            >
                <Input placeholder="Full Name" size="large" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                ]}
            >
                <Input placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Please enter your password' },
                    { min: 8, message: 'Password must be at least 8 characters' }
                ]}
            >
                <Input.Password placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: 'Please confirm your password' }]}
            >
                <Input.Password placeholder="Confirm Password" size="large" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block size="large">
                    Register
                </Button>
            </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
            Already have an account? <Link to="/login">Login</Link>
        </div>
    </Card>
};

export default Register;
