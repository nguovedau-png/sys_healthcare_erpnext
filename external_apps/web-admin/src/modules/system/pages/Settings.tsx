import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Select, Button, message, Divider, Typography, Switch } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import api from '../../../services/api';

const { Title } = Typography;

const Settings: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState<any[]>([]);

    useEffect(() => {
        fetchSettings();
        fetchLanguages();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get('/system/settings');
            if (res.data.success) {
                const settings = res.data.data.reduce((acc: any, setting: any) => {
                    acc[setting.key] = setting.value;
                    return acc;
                }, {});
                form.setFieldsValue(settings);
            }
        } catch (error) {
            console.error('Failed to fetch settings');
        }
    };

    const fetchLanguages = async () => {
        try {
            const res = await api.get('/system/languages');
            if (res.data.success) {
                setLanguages(res.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch languages');
        }
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            // Convert form values to settings array
            const settings = Object.entries(values).map(([key, value]) => ({
                key,
                value: String(value)
            }));

            await api.put('/system/settings', { settings });
            message.success('Settings saved successfully');
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Title level={2}>System Settings</Title>

            <Card>
                <Form form={form} layout="vertical">
                    <Title level={4}>General Settings</Title>

                    <Form.Item
                        name="app_name"
                        label="Application Name"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="My Application" />
                    </Form.Item>

                    <Form.Item
                        name="default_language"
                        label="Default Language"
                    >
                        <Select placeholder="Select Language">
                            {languages.map(lang => (
                                <Select.Option key={lang.id} value={lang.code}>
                                    {lang.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Divider />

                    <Title level={4}>Email Settings</Title>

                    <Form.Item
                        name="smtp_host"
                        label="SMTP Host"
                    >
                        <Input placeholder="smtp.gmail.com" />
                    </Form.Item>

                    <Form.Item
                        name="smtp_port"
                        label="SMTP Port"
                    >
                        <Input placeholder="587" />
                    </Form.Item>

                    <Form.Item
                        name="smtp_user"
                        label="SMTP Username"
                    >
                        <Input placeholder="user@example.com" />
                    </Form.Item>

                    <Form.Item
                        name="from_email"
                        label="From Email"
                    >
                        <Input placeholder="noreply@example.com" />
                    </Form.Item>

                    <Divider />

                    <Title level={4}>Security Settings</Title>

                    <Form.Item
                        name="session_timeout"
                        label="Session Timeout (minutes)"
                    >
                        <Input type="number" placeholder="30" />
                    </Form.Item>

                    <Form.Item
                        name="max_login_attempts"
                        label="Max Login Attempts"
                    >
                        <Input type="number" placeholder="5" />
                    </Form.Item>

                    <Form.Item
                        name="require_2fa"
                        label="Require 2FA for All Users"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Divider />

                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={handleSave}
                        loading={loading}
                        size="large"
                    >
                        Save Settings
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Settings;
