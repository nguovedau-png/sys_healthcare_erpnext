'use client';

import React, { useState, useEffect } from 'react';
import {
    Table,
    Card,
    Button,
    Tag,
    Space,
    Typography,
    Modal,
    Form,
    Input,
    Select,
    notification,
    Divider,
    Badge
} from 'antd';
import {
    BellOutlined,
    SendOutlined,
    HistoryOutlined,
    GlobalOutlined,
    UserOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import io from 'socket.io-client';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface NotificationItem {
    id: string;
    title: string;
    message: string;
    type: 'INFO' | 'WARNING' | 'ALERT' | 'PROMOTION';
    target: 'ALL' | 'DOCTORS' | 'USERS';
    createdAt: string;
    status: 'SENT' | 'PENDING' | 'FAILED';
}

const NotificationsPage = () => {
    const [data, setData] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [stats, setStats] = useState({ total: 0, today: 0, alerts: 0 });

    useEffect(() => {
        fetchNotifications();

        // Connect to socket to listen for real-time history updates if any
        const socket = io('http://localhost:3000');
        socket.on('notificationCreated', (newNotif) => {
            setData(prev => [newNotif, ...prev.slice(0, 49)]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        // Mock data for now as we don't have a history API yet
        const mockData: NotificationItem[] = [
            { id: '1', title: 'Bảo trì hệ thống', message: 'Hệ thống sẽ bảo trì vào lúc 2h sáng mai.', type: 'WARNING', target: 'ALL', createdAt: new Date().toISOString(), status: 'SENT' },
            { id: '2', title: 'Khuyến mãi mới', message: 'Giảm giá 20% cho dịch vụ khám nhi.', type: 'PROMOTION', target: 'USERS', createdAt: new Date(Date.now() - 3600000).toISOString(), status: 'SENT' },
            { id: '3', title: 'Cảnh báo dịch bệnh', message: 'Số ca sốt xuất huyết đang tăng cao.', type: 'ALERT', target: 'ALL', createdAt: new Date(Date.now() - 7200000).toISOString(), status: 'SENT' },
        ];
        setData(mockData);
        setStats({ total: 156, today: 12, alerts: 3 });
        setLoading(false);
    };

    const handleCreate = async (values: any) => {
        setLoading(true);
        try {
            // In a real app, this would call the API Gateway
            console.log('Sending notification:', values);

            const newNotif: NotificationItem = {
                id: Math.random().toString(36).substr(2, 9),
                ...values,
                createdAt: new Date().toISOString(),
                status: 'SENT'
            };

            setData(prev => [newNotif, ...prev]);
            notification.success({
                message: 'Thành công',
                description: 'Thông báo đã được gửi đi thành công tới ' + values.target,
            });
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            notification.error({ message: 'Lỗi', description: 'Không thể gửi thông báo.' });
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: NotificationItem) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{text}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{record.message.substring(0, 50)}...</Text>
                </Space>
            ),
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => {
                let color = 'blue';
                if (type === 'WARNING') color = 'orange';
                if (type === 'ALERT') color = 'red';
                if (type === 'PROMOTION') color = 'green';
                return <Tag color={color}>{type}</Tag>;
            },
        },
        {
            title: 'Đối tượng',
            dataIndex: 'target',
            key: 'target',
            render: (target: string) => (
                <Tag icon={target === 'ALL' ? <GlobalOutlined /> : <UserOutlined />}>
                    {target === 'ALL' ? 'Tất cả' : target}
                </Tag>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleString('vi-VN'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Badge status={status === 'SENT' ? 'success' : 'processing'} text={status} />
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Thông báo</Title>
                    <Text type="secondary">Gửi và quản lý các thông báo hệ thống trên toàn nền tảng</Text>
                </div>
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    size="large"
                    onClick={() => setIsModalOpen(true)}
                >
                    Gửi thông báo mới
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <Card>
                    <Space>
                        <HistoryOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                        <div>
                            <Text type="secondary">Tổng đã gửi</Text>
                            <Title level={3} style={{ margin: 0 }}>{stats.total}</Title>
                        </div>
                    </Space>
                </Card>
                <Card>
                    <Space>
                        <BellOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                        <div>
                            <Text type="secondary">Gửi trong hôm nay</Text>
                            <Title level={3} style={{ margin: 0 }}>{stats.today}</Title>
                        </div>
                    </Space>
                </Card>
                <Card>
                    <Space>
                        <ExclamationCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />
                        <div>
                            <Text type="secondary">Cảnh báo quan trọng</Text>
                            <Title level={3} style={{ margin: 0 }}>{stats.alerts}</Title>
                        </div>
                    </Space>
                </Card>
            </div>

            <Card title={<Space><HistoryOutlined /> Lịch sử thông báo</Space>}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title="Gửi thông báo hệ thống"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={600}
            >
                <Divider style={{ margin: '12px 0 24px 0' }} />
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreate}
                    initialValues={{ type: 'INFO', target: 'ALL' }}
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                    >
                        <Input placeholder="Nhập tiêu đề thông báo..." prefix={<BellOutlined />} />
                    </Form.Item>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Form.Item name="type" label="Loại thông báo">
                            <Select>
                                <Select.Option value="INFO">Thông tin (Info)</Select.Option>
                                <Select.Option value="WARNING">Cảnh báo (Warning)</Select.Option>
                                <Select.Option value="ALERT">Khẩn cấp (Alert)</Select.Option>
                                <Select.Option value="PROMOTION">Khuyến mãi (Promotion)</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="target" label="Đối tượng nhận">
                            <Select>
                                <Select.Option value="ALL">Tất cả người dùng</Select.Option>
                                <Select.Option value="DOCTORS">Chỉ Bác sĩ</Select.Option>
                                <Select.Option value="USERS">Chỉ Bệnh nhân</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="message"
                        label="Nội dung"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                    >
                        <TextArea rows={4} placeholder="Nhập nội dung chi tiết thông báo..." />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit" loading={loading} icon={<SendOutlined />}>
                                Xác nhận Gửi
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default NotificationsPage;
