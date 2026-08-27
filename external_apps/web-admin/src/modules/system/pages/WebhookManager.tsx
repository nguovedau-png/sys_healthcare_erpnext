import React, { useEffect, useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Select, Switch, Tag, Space, Popconfirm, message, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, ThunderboltOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import api from '../../../services/api';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

interface Webhook {
    id: string;
    url: string;
    secret: string;
    events: string[];
    isActive: boolean;
    createdAt: string;
}

const WebhookManager: React.FC = () => {
    const [webhooks, setWebhooks] = useState<Webhook[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchWebhooks = async () => {
        setLoading(true);
        try {
            const response = await api.get('/webhooks');
            if (response.data.success) {
                setWebhooks(response.data.data);
            }
        } catch (error) {
            message.error('Failed to load webhooks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebhooks();
    }, []);

    const handleCreate = async (values: any) => {
        try {
            await api.post('/webhooks', values);
            message.success('Webhook created');
            setIsModalVisible(false);
            form.resetFields();
            fetchWebhooks();
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to create webhook');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/webhooks/${id}`);
            message.success('Webhook deleted');
            fetchWebhooks();
        } catch (error) {
            message.error('Failed to delete webhook');
        }
    };

    const handleTest = async (webhook: Webhook) => {
        try {
            await api.post('/webhooks/trigger', {
                event: 'system.ping',
                payload: {
                    message: 'This is a test event from Admin Panel',
                    timestamp: new Date().toISOString(),
                    target_url: webhook.url
                }
            });
            message.success('Test event triggered. Check your endpoint.');
        } catch (error: any) {
            message.error('Failed to trigger test event');
        }
    };

    const columns = [
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            render: (text: string) => <div style={{ wordBreak: 'break-all' }}>{text}</div>
        },
        {
            title: 'Events',
            dataIndex: 'events',
            key: 'events',
            render: (events: string[]) => (
                <>
                    {events.map(event => (
                        <Tag color="blue" key={event}>
                            {event}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Active',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: boolean) => (
                isActive ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Webhook) => (
                <Space>
                    <Button
                        icon={<ThunderboltOutlined />}
                        size="small"
                        onClick={() => handleTest(record)}
                        title="Send Test Event"
                    />
                    <Popconfirm title="Delete this webhook?" onConfirm={() => handleDelete(record.id)}>
                        <Button icon={<DeleteOutlined />} size="small" danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={2}>Webhook Manager</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                    New Webhook
                </Button>
            </div>

            <Card>
                <Table
                    columns={columns}
                    dataSource={webhooks}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title="Create Webhook"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreate}
                    initialValues={{ isActive: true, events: [] }}
                >
                    <Form.Item
                        name="url"
                        label="Endpoint URL"
                        rules={[
                            { required: true, message: 'Please enter URL' },
                            { type: 'url', message: 'Please enter a valid URL' }
                        ]}
                    >
                        <Input placeholder="https://api.example.com/hooks" />
                    </Form.Item>

                    <Form.Item
                        name="secret"
                        label="Secret Key"
                        rules={[{ required: true, message: 'Please enter a secret key' }]}
                        help="Used to sign requests with HMAC-SHA256 (X-Hub-Signature)"
                    >
                        <Input.Password placeholder="Enter a strong secret" />
                    </Form.Item>

                    <Form.Item
                        name="events"
                        label="Subscribed Events"
                        rules={[{ required: true, message: 'Select at least one event' }]}
                    >
                        <Select mode="multiple" placeholder="Select events">
                            <Option value="user.created">user.created</Option>
                            <Option value="user.updated">user.updated</Option>
                            <Option value="job.completed">job.completed</Option>
                            <Option value="job.failed">job.failed</Option>
                            <Option value="system.ping">system.ping</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="isActive" label="Active" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item>
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Create</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default WebhookManager;
