import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Modal, Form, Input, message, Tag, Space, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../hooks/redux';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;

interface OidcClient {
    id: string;
    clientId: string;
    clientName: string;
    redirectUris: string[];
    createdAt: string;
}

const OidcClientManager: React.FC = () => {
    const [clients, setClients] = useState<OidcClient[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [newClient, setNewClient] = useState<{ clientId: string; clientSecret: string } | null>(null);
    const [form] = Form.useForm();

    const fetchClients = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/v1/oidc/clients');
            setClients(res.data.data);
        } catch (error) {
            message.error('Failed to load clients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleCreate = async (values: any) => {
        try {
            // Split redirect URIs by comma or newline
            const redirectUris = values.redirectUris.split(/[\n,]+/).map((u: string) => u.trim()).filter((u: string) => u);

            const res = await axios.post('/api/v1/oidc/clients', {
                clientName: values.clientName,
                redirectUris,
                clientUri: values.clientUri,
            });

            setNewClient(res.data.data);
            setIsModalOpen(false);
            setIsSuccessModalOpen(true);
            form.resetFields();
            fetchClients();
            message.success('Client created successfully');
        } catch (error) {
            message.error('Failed to create client');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/v1/oidc/clients/${id}`);
            message.success('Client deleted');
            fetchClients();
        } catch (error) {
            message.error('Failed to delete client');
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'clientName',
            key: 'clientName',
        },
        {
            title: 'Client ID',
            dataIndex: 'clientId',
            key: 'clientId',
            render: (text: string) => <Text code copyable>{text}</Text>,
        },
        {
            title: 'Redirect URIs',
            dataIndex: 'redirectUris',
            key: 'redirectUris',
            render: (uris: string[]) => (
                <>
                    {uris.map(uri => (
                        <div key={uri}><Tag>{uri}</Tag></div>
                    ))}
                </>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: OidcClient) => (
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => Modal.confirm({
                        title: 'Delete Client',
                        content: 'Are you sure?',
                        onOk: () => handleDelete(record.id)
                    })}
                />
            ),
        },
    ];

    return (
        <div className="p-6">
            <Card
                title={<Title level={4}>OAuth Apps (OIDC Clients)</Title>}
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                        Create New App
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={clients}
                    rowKey="id"
                    loading={loading}
                />
            </Card>

            {/* Create Modal */}
            <Modal
                title="Create OAuth App"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Form.Item name="clientName" label="App Name" rules={[{ required: true }]}>
                        <Input placeholder="e.g. My Website" />
                    </Form.Item>
                    <Form.Item name="clientUri" label="Homepage URL">
                        <Input placeholder="https://example.com" />
                    </Form.Item>
                    <Form.Item name="redirectUris" label="Redirect URIs (comma or newline separated)" rules={[{ required: true }]}>
                        <Input.TextArea rows={4} placeholder="https://example.com/callback" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Success Modal (Show Secrets) */}
            <Modal
                title="App Created Successfully"
                open={isSuccessModalOpen}
                onCancel={() => setIsSuccessModalOpen(false)}
                footer={[
                    <Button key="ok" type="primary" onClick={() => setIsSuccessModalOpen(false)}>
                        I have saved these credentials
                    </Button>
                ]}
            >
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                    <Text strong className="text-yellow-800">Warning:</Text>
                    <Text className="block text-yellow-700">Client Secret will only be shown once. Please copy it now.</Text>
                </div>

                <div className="mb-4">
                    <Text type="secondary">Client ID</Text>
                    <div className="flex gap-2">
                        <Input value={newClient?.clientId} readOnly />
                        <Button icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(newClient?.clientId || '')} />
                    </div>
                </div>

                <div className="mb-4">
                    <Text type="secondary" strong>Client Secret</Text>
                    <div className="flex gap-2">
                        <Input.Password value={newClient?.clientSecret} visibilityToggle readOnly />
                        <Button icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(newClient?.clientSecret || '')} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default OidcClientManager;
