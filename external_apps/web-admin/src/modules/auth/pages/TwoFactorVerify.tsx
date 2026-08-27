import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../../services/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';

const { Title, Text } = Typography;

const TwoFactorVerify = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { email } = location.state || {};
    const storedTempToken = location.state?.tempToken || localStorage.getItem('tempToken');

    const onFinish = async (values: { code: string }) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/verify-2fa', {
                email,
                code: values.code,
                tempToken: storedTempToken
            });

            const payload = response.data?.data ?? response.data;
            const accessToken = payload?.accessToken ?? payload?.access_token;
            if (!accessToken) throw new Error('2FA response did not include an access token');
            localStorage.setItem('accessToken', accessToken);
            if (payload?.refreshToken) localStorage.setItem('refreshToken', payload.refreshToken);
            localStorage.removeItem('tempToken');
            dispatch(setCredentials({ user: payload?.user, accessToken, refreshToken: payload?.refreshToken }));
            message.success('2FA verified successfully');
            navigate('/');
        } catch (error: any) {
            message.error(error.response?.data?.message || '2FA verification failed');
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
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <Title level={2}>Security Check</Title>
                <Text type="secondary">Enter the 6-digit code from your authenticator app</Text>
            </div>

            <Form
                name="2fa-verify"
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="code"
                    rules={[
                        { required: true, message: 'Please enter the 6-digit code' },
                        { pattern: /^\d{6}$/, message: 'Code must be 6 digits' }
                    ]}
                >
                    <Input
                        placeholder="000000"
                        maxLength={6}
                        size="large"
                        style={{
                            textAlign: 'center',
                            fontSize: '32px',
                            letterSpacing: '12px',
                            height: 60,
                            borderRadius: 12,
                            fontWeight: 'bold'
                        }}
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
                        Verify Code
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default TwoFactorVerify;
