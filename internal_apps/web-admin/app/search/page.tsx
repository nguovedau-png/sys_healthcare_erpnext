'use client';

import React, { useEffect, useState } from 'react';
import {
    Tabs,
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
    Select,
} from 'antd';
import { PlusOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface SearchEntity {
    id: number;
    entityType: string;
    entityId: string;
    name: string;
    data: any;
    createdAt: string;
    updatedAt: string;
}

const entityTypes = [
    { key: 'DOCTOR', label: 'Doctors', icon: '👨‍⚕️' },
    { key: 'CLINIC', label: 'Clinics', icon: '🏥' },
    { key: 'HOSPITAL', label: 'Hospitals', icon: '🏨' },
    { key: 'PHARMACY', label: 'Pharmacies', icon: '💊' },
    { key: 'PHARMACIST', label: 'Pharmacists', icon: '👩‍⚕️' },
];

export default function SearchDataPage() {
    const [activeTab, setActiveTab] = useState('DOCTOR');
    const [entities, setEntities] = useState<SearchEntity[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const fetchEntities = (type: string) => {
        setLoading(true);
        fetch(`http://localhost:3000/search/entities?type=${type}`)
            .then((res) => res.json())
            .then((data) => {
                setEntities(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch entities:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEntities(activeTab);
    }, [activeTab]);

    const handleCreate = async (values: any) => {
        try {
            const payload = {
                entityType: activeTab,
                entityId: values.entityId,
                name: values.name,
                data: {
                    ...values,
                },
            };

            const response = await fetch('http://localhost:3000/search/index', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                message.success('Entity indexed successfully');
                setIsModalOpen(false);
                form.resetFields();
                fetchEntities(activeTab);
            } else {
                message.error('Failed to index entity');
            }
        } catch (error) {
            console.error('Error indexing entity:', error);
            message.error('An error occurred');
        }
    };

    const handleDelete = async (entityType: string, entityId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/search/${entityType}/${entityId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('Entity deleted successfully');
                fetchEntities(activeTab);
            } else {
                message.error('Failed to delete entity');
            }
        } catch (error) {
            console.error('Error deleting entity:', error);
            message.error('An error occurred');
        }
    };

    const getFormFields = () => {
        const commonFields = [
            <Form.Item key="entityId" name="entityId" label="Entity ID" rules={[{ required: true }]}>
                <Input placeholder="Unique identifier" />
            </Form.Item>,
            <Form.Item key="name" name="name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="Full name" />
            </Form.Item>,
        ];

        switch (activeTab) {
            case 'DOCTOR':
                return [
                    ...commonFields,
                    <Form.Item key="specialty" name="specialty" label="Specialty">
                        <Input placeholder="e.g. Cardiology" />
                    </Form.Item>,
                    <Form.Item key="qualifications" name="qualifications" label="Qualifications">
                        <TextArea rows={2} placeholder="Degrees and certifications" />
                    </Form.Item>,
                    <Form.Item key="location" name="location" label="Location">
                        <Input placeholder="City or address" />
                    </Form.Item>,
                ];
            case 'CLINIC':
                return [
                    ...commonFields,
                    <Form.Item key="services" name="services" label="Services">
                        <TextArea rows={2} placeholder="Services offered" />
                    </Form.Item>,
                    <Form.Item key="address" name="address" label="Address">
                        <Input placeholder="Full address" />
                    </Form.Item>,
                    <Form.Item key="phone" name="phone" label="Phone">
                        <Input placeholder="Contact number" />
                    </Form.Item>,
                ];
            case 'HOSPITAL':
                return [
                    ...commonFields,
                    <Form.Item key="departments" name="departments" label="Departments">
                        <TextArea rows={2} placeholder="Available departments" />
                    </Form.Item>,
                    <Form.Item key="address" name="address" label="Address">
                        <Input placeholder="Full address" />
                    </Form.Item>,
                    <Form.Item key="facilities" name="facilities" label="Facilities">
                        <TextArea rows={2} placeholder="Available facilities" />
                    </Form.Item>,
                ];
            case 'PHARMACY':
                return [
                    ...commonFields,
                    <Form.Item key="location" name="location" label="Location">
                        <Input placeholder="Address" />
                    </Form.Item>,
                    <Form.Item key="services" name="services" label="Services">
                        <TextArea rows={2} placeholder="Services offered" />
                    </Form.Item>,
                    <Form.Item key="hours" name="hours" label="Operating Hours">
                        <Input placeholder="e.g. Mon-Fri 9AM-6PM" />
                    </Form.Item>,
                ];
            case 'PHARMACIST':
                return [
                    ...commonFields,
                    <Form.Item key="pharmacy" name="pharmacy" label="Pharmacy">
                        <Input placeholder="Associated pharmacy" />
                    </Form.Item>,
                    <Form.Item key="qualifications" name="qualifications" label="Qualifications">
                        <TextArea rows={2} placeholder="Degrees and certifications" />
                    </Form.Item>,
                ];
            default:
                return commonFields;
        }
    };

    const columns: ColumnsType<SearchEntity> = [
        {
            title: 'ID',
            dataIndex: 'entityId',
            key: 'entityId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Details',
            dataIndex: 'data',
            key: 'data',
            render: (data) => (
                <div style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {JSON.stringify(data).substring(0, 100)}...
                </div>
            ),
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    title="Delete entity"
                    description="This will remove the entity from search index"
                    onConfirm={() => handleDelete(record.entityType, record.entityId)}
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

    const tabItems = entityTypes.map((type) => ({
        key: type.key,
        label: `${type.icon} ${type.label}`,
        children: (
            <div>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Title level={4}>{type.label} Management</Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add {type.label.slice(0, -1)}
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={entities}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </div>
        ),
    }));

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Title level={2}>
                    <SearchOutlined /> Search Data Management
                </Title>
                <p style={{ marginBottom: 24, color: '#666' }}>
                    Manage searchable healthcare entities indexed in Elasticsearch
                </p>

                <Tabs
                    activeKey={activeTab}
                    items={tabItems}
                    onChange={setActiveTab}
                />
            </Card>

            <Modal
                title={`Add ${entityTypes.find((t) => t.key === activeTab)?.label.slice(0, -1)}`}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    {getFormFields()}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Index Entity
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
