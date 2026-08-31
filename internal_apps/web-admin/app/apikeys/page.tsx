'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Modal, Form, Input, message, Tag, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface ApiKey {
    id: number;
    name: string;
    key: string;
    isActive: boolean;
    createdAt: string;
}


import { useAuth } from '@/providers/AuthProvider';

export default function ApiKeysPage() {
    const { user } = useAuth();
    const userId = user?.userId;
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const fetchApiKeys = () => {
        if (!userId) return;
        setLoading(true);
        fetch(`http://localhost:3000/apikeys?userId=${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setApiKeys(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch api keys:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (userId) fetchApiKeys();
    }, [userId]);

    const handleCreate = async (values: any) => {
        if (!userId) return;
        try {
            const response = await fetch('http://localhost:3000/apikeys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, userId }),
            });

            if (response.ok) {
                message.success('API Key created successfully');
                setIsModalOpen(false);
                form.resetFields();
                fetchApiKeys();
            } else {
                message.error('Failed to create API Key');
            }
        } catch (error) {
            console.error('Error creating API Key:', error);
            message.error('An error occurred');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/apikeys/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('API Key deleted successfully');
                fetchApiKeys();
            } else {
                message.error('Failed to delete API Key');
            }
        } catch (error) {
            console.error('Error deleting API Key:', error);
            message.error('An error occurred');
        }
    };

    const columns: ColumnsType<ApiKey> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <Typography.Text copyable>{text}</Typography.Text>,
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (active) => (
                <Tag color={active ? 'green' : 'red'}>{active ? 'Active' : 'Inactive'}</Tag>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    title="Delete API Key"
                    description="Are you sure you want to delete this API key? This action cannot be undone."
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="link" danger icon={<DeleteOutlined />}>
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Space orientation="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title level={2}>API Keys</Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                            Generate New Key
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={apiKeys}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                    />
                </Space>
            </Card>

            <Modal
                title="Generate New API Key"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Form.Item name="name" label="Key Name" rules={[{ required: true }]}>
                        <Input placeholder="e.g. My Website Integration" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Generate
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
