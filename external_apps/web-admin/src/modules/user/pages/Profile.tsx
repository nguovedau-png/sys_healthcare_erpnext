import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Form, Input, message, Switch, Modal, Tabs, QRCode } from 'antd';
import { EditOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import api from '../../../services/api';

const { TabPane } = Tabs;

const Profile: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber
            });
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            await api.put(`/users/${user.id}`, values);
            message.success('Profile updated successfully');
            setEditMode(false);
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        try {
            const values = await passwordForm.validateFields();
            if (values.newPassword !== values.confirmPassword) {
                message.error('Passwords do not match');
                return;
            }
            setLoading(true);
            await api.post('/auth/change-password', {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword
            });
            message.success('Password changed successfully');
            passwordForm.resetFields();
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const handleSetup2FA = async () => {
        try {
            const res = await api.post('/auth/setup-2fa');
            if (res.data.success) {
                Modal.info({
                    title: 'Setup 2FA',
                    width: 500,
                    content: (
                        <div style={{ textAlign: 'center' }}>
                            <p>Scan this QR code with your authenticator app:</p>
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                <QRCode value={res.data.data.qrCode} size={200} />
                            </div>
                            <p>Or enter this secret manually:</p>
                            <Input value={res.data.data.secret} readOnly />
                            <p style={{ marginTop: 16 }}>After scanning, enter the 6-digit code to verify:</p>
                            <Form
                                onFinish={async (values) => {
                                    try {
                                        await api.post('/auth/verify-2fa-setup', {
                                            code: values.code,
                                            secret: res.data.data.secret
                                        });
                                        message.success('2FA enabled successfully');
                                        Modal.destroyAll();
                                    } catch (error: any) {
                                        message.error('Invalid code');
                                    }
                                }}
                            >
                                <Form.Item name="code" rules={[{ required: true, pattern: /^\d{6}$/ }]}>
                                    <Input placeholder="Enter 6-digit code" maxLength={6} />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Verify and Enable
                                </Button>
                            </Form>
                        </div>
                    )
                });
            }
        } catch (error: any) {
            message.error('Failed to setup 2FA');
        }
    };

    const handleDisable2FA = async () => {
        Modal.confirm({
            title: 'Disable 2FA',
            content: 'Are you sure you want to disable two-factor authentication?',
            onOk: async () => {
                try {
                    await api.post('/auth/disable-2fa');
                    message.success('2FA disabled successfully');
                } catch (error: any) {
                    message.error('Failed to disable 2FA');
                }
            }
        });
    };

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile Information" key="1" icon={<EditOutlined />}>
                    <Card
                        title="Profile Information"
                        extra={
                            editMode ? (
                                <div>
                                    <Button onClick={() => setEditMode(false)} style={{ marginRight: 8 }}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" onClick={handleUpdateProfile} loading={loading}>
                                        Save
                                    </Button>
                                </div>
                            ) : (
                                <Button icon={<EditOutlined />} onClick={() => setEditMode(true)}>
                                    Edit
                                </Button>
                            )
                        }
                    >
                        {editMode ? (
                            <Form form={form} layout="vertical">
                                <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                    <Input disabled />
                                </Form.Item>
                                <Form.Item name="phoneNumber" label="Phone Number">
                                    <Input />
                                </Form.Item>
                            </Form>
                        ) : (
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Full Name">{user?.fullName}</Descriptions.Item>
                                <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                                <Descriptions.Item label="Phone Number">{user?.phoneNumber || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Role">{user?.role}</Descriptions.Item>
                            </Descriptions>
                        )}
                    </Card>
                </TabPane>

                <TabPane tab="Change Password" key="2" icon={<LockOutlined />}>
                    <Card title="Change Password">
                        <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
                            <Form.Item
                                name="currentPassword"
                                label="Current Password"
                                rules={[{ required: true }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                label="New Password"
                                rules={[{ required: true, min: 8 }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirm New Password"
                                rules={[{ required: true }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Change Password
                            </Button>
                        </Form>
                    </Card>
                </TabPane>

                <TabPane tab="Two-Factor Authentication" key="3" icon={<SafetyOutlined />}>
                    <Card title="Two-Factor Authentication">
                        <div style={{ marginBottom: 16 }}>
                            <p>
                                Two-factor authentication adds an extra layer of security to your account.
                                When enabled, you'll need to enter a code from your authenticator app in addition to your password.
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <span>2FA Status:</span>
                            <Switch
                                checked={user?.is2FAEnabled}
                                onChange={(checked) => {
                                    if (checked) {
                                        handleSetup2FA();
                                    } else {
                                        handleDisable2FA();
                                    }
                                }}
                            />
                            <span>{user?.is2FAEnabled ? 'Enabled' : 'Disabled'}</span>
                        </div>
                    </Card>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Profile;
