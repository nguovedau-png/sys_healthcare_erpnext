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
    Tag,
    Select,
    DatePicker,
} from 'antd';
import { PlusOutlined, DeleteOutlined, ReloadOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface BackgroundJob {
    id: number;
    jobType: string;
    jobId: string;
    name: string;
    data: any;
    status: string;
    progress: number;
    attempts: number;
    maxAttempts: number;
    error: string | null;
    result: any;
    scheduledAt: string | null;
    startedAt: string | null;
    completedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

const jobTypes = [
    { key: 'FILE_PROCESSING', label: 'File Processing', icon: '📁' },
    { key: 'EMAIL', label: 'Email', icon: '📧' },
    { key: 'SMS', label: 'SMS', icon: '📱' },
    { key: 'NOTIFICATION', label: 'Notification', icon: '🔔' },
    { key: 'SCHEDULED', label: 'Scheduled', icon: '⏰' },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'PENDING': return 'default';
        case 'PROCESSING': return 'processing';
        case 'COMPLETED': return 'success';
        case 'FAILED': return 'error';
        case 'RETRYING': return 'warning';
        default: return 'default';
    }
};

export default function BackgroundJobsPage() {
    const [activeTab, setActiveTab] = useState('ALL');
    const [jobs, setJobs] = useState<BackgroundJob[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const fetchJobs = (type?: string) => {
        setLoading(true);
        const url = type && type !== 'ALL'
            ? `http://localhost:3000/jobs?type=${type}`
            : 'http://localhost:3000/jobs';

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch jobs:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchJobs(activeTab);
        const interval = setInterval(() => fetchJobs(activeTab), 5000); // Auto-refresh every 5s
        return () => clearInterval(interval);
    }, [activeTab]);

    const handleCreate = async (values: any) => {
        try {
            const payload = {
                jobType: values.jobType,
                name: values.name,
                data: JSON.parse(values.data || '{}'),
                scheduledAt: values.scheduledAt ? values.scheduledAt.toISOString() : undefined,
            };

            const response = await fetch('http://localhost:3000/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                message.success('Job created successfully');
                setIsModalOpen(false);
                form.resetFields();
                fetchJobs(activeTab);
            } else {
                message.error('Failed to create job');
            }
        } catch (error) {
            console.error('Error creating job:', error);
            message.error('Invalid JSON data or error occurred');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/jobs/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('Job deleted successfully');
                fetchJobs(activeTab);
            } else {
                message.error('Failed to delete job');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            message.error('An error occurred');
        }
    };

    const columns: ColumnsType<BackgroundJob> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
        },
        {
            title: 'Type',
            dataIndex: 'jobType',
            key: 'jobType',
            render: (type) => {
                const jobType = jobTypes.find(t => t.key === type);
                return jobType ? `${jobType.icon} ${jobType.label}` : type;
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress) => `${progress}%`,
        },
        {
            title: 'Attempts',
            dataIndex: 'attempts',
            key: 'attempts',
            render: (attempts, record) => `${attempts}/${record.maxAttempts}`,
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Completed',
            dataIndex: 'completedAt',
            key: 'completedAt',
            render: (text) => text ? new Date(text).toLocaleString() : '-',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    title="Delete job"
                    description="Are you sure you want to delete this job?"
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

    const tabItems = [
        { key: 'ALL', label: '📋 All Jobs' },
        ...jobTypes.map((type) => ({
            key: type.key,
            label: `${type.icon} ${type.label}`,
        })),
    ].map((tab) => ({
        key: tab.key,
        label: tab.label,
        children: (
            <div>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Space>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => fetchJobs(activeTab)}
                        >
                            Refresh
                        </Button>
                    </Space>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Create Job
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={jobs}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 20 }}
                    expandable={{
                        expandedRowRender: (record) => (
                            <div style={{ padding: 16, background: '#f5f5f5' }}>
                                <p><strong>Job ID:</strong> {record.jobId}</p>
                                <p><strong>Data:</strong> <pre>{JSON.stringify(record.data, null, 2)}</pre></p>
                                {record.error && <p style={{ color: 'red' }}><strong>Error:</strong> {record.error}</p>}
                                {record.result && <p><strong>Result:</strong> <pre>{JSON.stringify(record.result, null, 2)}</pre></p>}
                            </div>
                        ),
                    }}
                />
            </div>
        ),
    }));

    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Title level={2}>
                    <ClockCircleOutlined /> Background Jobs
                </Title>
                <p style={{ marginBottom: 24, color: '#666' }}>
                    Monitor and manage background jobs (auto-refreshes every 5 seconds)
                </p>

                <Tabs
                    activeKey={activeTab}
                    items={tabItems}
                    onChange={setActiveTab}
                />
            </Card>

            <Modal
                title="Create New Job"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Form.Item
                        name="jobType"
                        label="Job Type"
                        rules={[{ required: true, message: 'Please select job type' }]}
                    >
                        <Select placeholder="Select job type">
                            {jobTypes.map((type) => (
                                <Option key={type.key} value={type.key}>
                                    {type.icon} {type.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Job Name"
                        rules={[{ required: true, message: 'Please input job name' }]}
                    >
                        <Input placeholder="e.g. Send Welcome Email" />
                    </Form.Item>
                    <Form.Item
                        name="data"
                        label="Job Data (JSON)"
                        rules={[{ required: true, message: 'Please input job data' }]}
                    >
                        <TextArea
                            rows={6}
                            placeholder='{"to": "user@example.com", "subject": "Welcome!"}'
                        />
                    </Form.Item>
                    <Form.Item
                        name="scheduledAt"
                        label="Schedule For (Optional)"
                    >
                        <DatePicker
                            showTime
                            style={{ width: '100%' }}
                            placeholder="Leave empty for immediate execution"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Create Job
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
