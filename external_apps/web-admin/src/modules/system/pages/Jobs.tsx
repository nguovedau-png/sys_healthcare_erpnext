import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Row, Col, Statistic, Tag, Button, Tabs, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import { ReloadOutlined, MailOutlined, BellOutlined, ThunderboltOutlined, PlusOutlined, DeleteOutlined, RedoOutlined } from '@ant-design/icons';
import api from '../../../services/api';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

interface Job {
    id: string;
    name: string;
    type: string;
    status: string;
    result: any;
    error: string;
    createdAt: string;
    finishedAt: string;
    data?: any;
}

interface ScheduledJob {
    key: string;
    name: string;
    id: string;
    cron: string;
    next: number;
    type: string;
}

const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [scheduledJobs, setScheduledJobs] = useState<ScheduledJob[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [jobType, setJobType] = useState('email');
    const [filterType, setFilterType] = useState<string | undefined>(undefined);
    const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const [jobsRes, statsRes, scheduledRes] = await Promise.all([
                api.get('/jobs', {
                    params: {
                        page,
                        limit: pagination.pageSize,
                        type: filterType,
                        status: filterStatus
                    }
                }),
                api.get('/jobs/stats'),
                api.get('/jobs/scheduled')
            ]);

            if (jobsRes.data.success) {
                setJobs(jobsRes.data.data);
                setPagination({
                    ...pagination,
                    current: page,
                    total: jobsRes.data.pagination?.total || 0
                });
            }

            if (statsRes.data.success) {
                setStats(statsRes.data.data);
            }

            if (scheduledRes.data.success) {
                setScheduledJobs(scheduledRes.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch jobs data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filterType, filterStatus]); // Refetch when filters change

    const handleCreateJob = async (values: any) => {
        try {
            const payload = {
                type: values.type,
                name: values.name,
                data: JSON.parse(values.data || '{}'),
                cron: values.cron
            };

            const endpoint = values.cron ? '/jobs/schedule' : '/jobs';
            await api.post(endpoint, payload);
            message.success(values.cron ? 'Job scheduled' : 'Job created');
            setIsModalVisible(false);
            form.resetFields();
            fetchData(1);
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDeleteJob = async (id: string) => {
        try {
            await api.delete(`/jobs/${id}`);
            message.success('Job log deleted');
            fetchData(pagination.current);
        } catch (error) {
            message.error('Failed to delete job');
        }
    };

    const handleRetryJob = async (id: string) => {
        try {
            await api.post(`/jobs/${id}/retry`);
            message.success('Job retried');
            fetchData(pagination.current);
        } catch (error) {
            message.error('Failed to retry job');
        }
    };

    const [detailJob, setDetailJob] = useState<Job | null>(null);

    // ... existing prune handler ...
    const handlePrune = async () => {
        try {
            await api.post('/jobs/prune', { days: 7, status: ['COMPLETED', 'FAILED'] });
            message.success('Pruned old completed/failed jobs');
            fetchData(1);
        } catch (error) {
            message.error('Failed to prune jobs');
        }
    };

    const handleDeleteScheduled = async (key: string, type: string) => {
        try {
            await api.delete(`/jobs/scheduled/${encodeURIComponent(key)}?type=${type}`);
            message.success('Scheduled job removed');
            fetchData(1);
        } catch (error) {
            message.error('Failed to remove scheduled job');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'green';
            case 'FAILED': return 'red';
            case 'PROCESSING': return 'blue';
            default: return 'orange';
        }
    };

    const columns: ColumnsType<Job> = [
        {
            title: 'Job Name',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            render: (type) => <Tag>{type}</Tag>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>
        },
        {
            title: 'Result/Error',
            key: 'result',
            render: (_, record) => {
                if (record.status === 'FAILED') {
                    return <span style={{ color: 'red' }}>{record.error}</span>;
                }
                return record.result ? JSON.stringify(record.result).substring(0, 50) : '-';
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 180,
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button size="small" onClick={() => setDetailJob(record)}>View</Button>
                    {record.status === 'FAILED' && (
                        <Button size="small" icon={<RedoOutlined />} onClick={() => handleRetryJob(record.id)}>Retry</Button>
                    )}
                    <Popconfirm title="Delete this job log?" onConfirm={() => handleDeleteJob(record.id)}>
                        <Button size="small" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
            )
        }
    ];

    const scheduledColumns: ColumnsType<ScheduledJob> = [
        { title: 'Job Name', dataIndex: 'name', key: 'name' },
        { title: 'Type', dataIndex: 'type', key: 'type', render: (t) => <Tag>{t.toUpperCase()}</Tag> },
        { title: 'Cron Pattern', dataIndex: 'cron', key: 'cron', render: (c) => <Tag color="blue">{c}</Tag> },
        { title: 'Next Execution', dataIndex: 'next', key: 'next', render: (n) => n ? new Date(n).toLocaleString() : '-' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm title="Stop this schedule?" onConfirm={() => handleDeleteScheduled(record.key, record.type)}>
                    <Button size="small" danger icon={<DeleteOutlined />}>Remove</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0 }}>Jobs & Queues</Title>
                <div style={{ display: 'flex', gap: 12 }}>
                    <Select placeholder="Filter Type" style={{ width: 120 }} allowClear value={filterType} onChange={setFilterType}>
                        <Option value="email">Email</Option>
                        <Option value="notification">Notification</Option>
                        <Option value="heavy">Heavy</Option>
                    </Select>
                    <Select
                        placeholder="Filter Status"
                        style={{ width: 120 }}
                        allowClear
                        value={filterStatus}
                        onChange={(val) => { setFilterStatus(val); setTimeout(() => fetchData(1), 0); }}
                    >
                        <Option value="PENDING">Pending</Option>
                        <Option value="PROCESSING">Processing</Option>
                        <Option value="COMPLETED">Completed</Option>
                        <Option value="FAILED">Failed</Option>
                    </Select>
                    <Button icon={<ReloadOutlined />} onClick={() => fetchData(pagination.current)}>Refresh</Button>
                    <Popconfirm title="Delete COMPLETED/FAILED jobs older than 7 days?" onConfirm={handlePrune}>
                        <Button danger icon={<DeleteOutlined />}>Prune Old Jobs</Button>
                    </Popconfirm>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Create Job</Button>
                </div>
            </div>

            {stats && (
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Email Queue"
                                value={stats.email?.active || 0}
                                suffix={`/ ${stats.email?.waiting || 0} waiting`}
                                prefix={<MailOutlined />}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Notification Queue"
                                value={stats.notification?.active || 0}
                                suffix={`/ ${stats.notification?.waiting || 0} waiting`}
                                prefix={<BellOutlined />}
                                valueStyle={{ color: '#cf1322' }}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Heavy Jobs"
                                value={stats.heavy?.active || 0}
                                suffix={`Active`}
                                prefix={<ThunderboltOutlined />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                            <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
                                Completed: {stats.heavy?.completed} | Failed: {stats.heavy?.failed}
                            </div>
                        </Card>
                    </Col>
                </Row>
            )}

            <Tabs defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: 'Job History',
                    children: (
                        <Table
                            columns={columns}
                            dataSource={jobs}
                            rowKey="id"
                            loading={loading}
                            pagination={{
                                ...pagination,
                                onChange: (page) => fetchData(page)
                            }}
                        />
                    )
                },
                {
                    key: '2',
                    label: 'Scheduled Jobs',
                    children: (
                        <Table
                            columns={scheduledColumns}
                            dataSource={scheduledJobs}
                            rowKey="key"
                            loading={loading}
                        />
                    )
                }
            ]} />

            <Modal
                title="Create New Job"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleCreateJob} initialValues={{ type: 'email' }}>
                    <Form.Item name="type" label="Job Type" rules={[{ required: true }]}>
                        <Select onChange={setJobType}>
                            <Option value="email">Email</Option>
                            <Option value="notification">Notification</Option>
                            <Option value="heavy">Heavy Task</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="name" label="Job Name">
                        <Input placeholder="Optional name" />
                    </Form.Item>

                    {jobType === 'email' && (
                        <Form.Item label="Data JSON Preview" help="For email: { to, subject, html }">
                            <Input.TextArea disabled value='{ "to": "user@example.com", "subject": "Test", "html": "<p>Hi</p>" }' />
                        </Form.Item>
                    )}

                    <Form.Item name="data" label="Data (JSON)" rules={[{ required: true, message: 'JSON data is required' }]}>
                        <Input.TextArea rows={4} placeholder='{ "key": "value" }' />
                    </Form.Item>

                    <Form.Item name="cron" label="Schedule (Cron Expression)" help="Leave empty for immediate execution. Example: '0 * * * *' (Every hour)">
                        <Input placeholder="* * * * * *" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form>
            </Modal>

            <Modal
                title="Job Details"
                open={!!detailJob}
                onCancel={() => setDetailJob(null)}
                footer={[<Button key="close" onClick={() => setDetailJob(null)}>Close</Button>]}
                width={700}
            >
                {detailJob && (
                    <div>
                        <p><strong>ID:</strong> {detailJob.id}</p>
                        <p><strong>Name:</strong> {detailJob.name}</p>
                        <p><strong>Type:</strong> <Tag>{detailJob.type}</Tag></p>
                        <p><strong>Status:</strong> <Tag color={getStatusColor(detailJob.status)}>{detailJob.status}</Tag></p>
                        <p><strong>Created At:</strong> {new Date(detailJob.createdAt).toLocaleString()}</p>
                        <p><strong>Finished At:</strong> {detailJob.finishedAt ? new Date(detailJob.finishedAt).toLocaleString() : '-'}</p>
                        <div style={{ marginTop: 16 }}>
                            <strong>Result:</strong>
                            <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4, maxHeight: 200, overflow: 'auto' }}>
                                {detailJob.result ? JSON.stringify(detailJob.result, null, 2) : (detailJob.error || '-')}
                            </pre>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Jobs;
