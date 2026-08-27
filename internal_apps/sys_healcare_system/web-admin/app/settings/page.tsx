'use client';

import React, { useEffect, useState } from 'react';
import {
    Table,
    Typography,
    Card,
    Space,
    Button,
    Modal,
    Form,
    Input,
    message,
    Popconfirm,
    Switch,
    Select,
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface Setting {
    id: number;
    key: string;
    value: string;
    description: string | null;
    category: string | null;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Setting[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSetting, setEditingSetting] = useState<Setting | null>(null);
    const [form] = Form.useForm();

    const fetchSettings = () => {
        setLoading(true);
        fetch('http://localhost:3000/settings')
            .then((res) => res.json())
            .then((data) => {
                setSettings(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch settings:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleCreate = async (values: any) => {
        try {
            const response = await fetch('http://localhost:3000/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Setting created successfully');
                setIsModalOpen(false);
                form.resetFields();
                fetchSettings();
            } else {
                message.error('Failed to create setting');
            }
        } catch (error) {
            console.error('Error creating setting:', error);
            message.error('An error occurred');
        }
    };

    const handleEdit = async (values: any) => {
        if (!editingSetting) return;
        try {
            const response = await fetch(`http://localhost:3000/settings/${editingSetting.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Setting updated successfully');
                setIsModalOpen(false);
                setEditingSetting(null);
                form.resetFields();
                fetchSettings();
            } else {
                message.error('Failed to update setting');
            }
        } catch (error) {
            console.error('Error updating setting:', error);
            message.error('An error occurred');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/settings/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('Setting deleted successfully');
                fetchSettings();
            } else {
                message.error('Failed to delete setting');
            }
        } catch (error) {
            console.error('Error deleting setting:', error);
            message.error('An error occurred');
        }
    };

    const openCreateModal = () => {
        setEditingSetting(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEditModal = (setting: Setting) => {
        setEditingSetting(setting);
        form.setFieldsValue({
            key: setting.key,
            value: setting.value,
            description: setting.description,
            category: setting.category,
            isPublic: setting.isPublic,
        });
        setIsModalOpen(true);
    };

    const columns: ColumnsType<Setting> = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            ellipsis: true,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => text || '-',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            render: (text) => text || '-',
        },
        {
            title: 'Public',
            dataIndex: 'isPublic',
            key: 'isPublic',
            render: (isPublic) => (
                <Switch checked={isPublic} disabled size="small" />
            ),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete setting"
                        description="Are you sure you want to delete this setting?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Space orientation="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title level={2}>System Settings</Title>
                        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
                            Create Setting
                        </Button>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={settings}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                    />
                </Space>
            </Card>

            <Modal
                title={editingSetting ? 'Edit Setting' : 'Create New Setting'}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingSetting(null);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={editingSetting ? handleEdit : handleCreate}
                >
                    <Form.Item
                        name="key"
                        label="Key"
                        rules={[{ required: true, message: 'Please input key' }]}
                    >
                        <Input placeholder="e.g. app.name" />
                    </Form.Item>
                    <Form.Item
                        name="value"
                        label="Value"
                        rules={[{ required: true, message: 'Please input value' }]}
                    >
                        <Input.TextArea rows={3} placeholder="Setting value" />
                    </Form.Item>
                    <Form.Item name="category" label="Category">
                        <Select placeholder="Select category" allowClear>
                            <Option value="general">General</Option>
                            <Option value="email">Email</Option>
                            <Option value="security">Security</Option>
                            <Option value="api">API</Option>
                            <Option value="ui">UI</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea rows={2} placeholder="Optional description" />
                    </Form.Item>
                    <Form.Item name="isPublic" label="Public" valuePropName="checked" initialValue={false}>
                        <Switch />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {editingSetting ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
