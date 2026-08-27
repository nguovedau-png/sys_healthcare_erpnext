'use client';

import React, { useState } from 'react';
import {
    Card, Table, Button, Input, Tag, Space, Modal, Form, Select, DatePicker, message,
    Typography, Statistic, Row, Col
} from 'antd';
import {
    PlusOutlined, MailOutlined, TeamOutlined, SendOutlined,
    CheckCircleOutlined, ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Campaign {
    id: string;
    name: string;
    status: 'draft' | 'scheduled' | 'sent';
    sentCount: number;
    openRate: number;
    date: string;
}

const CampaignPage = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([
        { id: '1', name: 'Chúc mừng năm mới 2024', status: 'sent', sentCount: 15200, openRate: 45.2, date: '2024-01-01' },
        { id: '2', name: 'Khuyễn mãi sức khỏe mùa hè', status: 'draft', sentCount: 0, openRate: 0, date: '2024-06-01' },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleCreate = (values: any) => {
        const newCampaign: Campaign = {
            id: Date.now().toString(),
            name: values.name,
            status: 'scheduled',
            sentCount: 0,
            openRate: 0,
            date: values.date.format('YYYY-MM-DD'),
        };
        setCampaigns([newCampaign, ...campaigns]);
        setIsModalVisible(false);
        form.resetFields();
        message.success('Đã lên lịch chiến dịch thành công');
    };

    const columns = [
        {
            title: 'Tên chiến dịch',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <Text strong>{text}</Text>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const colors: any = { sent: 'green', scheduled: 'blue', draft: 'default' };
                const icons: any = { sent: <CheckCircleOutlined />, scheduled: <ClockCircleOutlined />, draft: null };
                const labels: any = { sent: 'Đã gửi', scheduled: 'Đã lên lịch', draft: 'Nháp' };
                return <Tag color={colors[status]} icon={icons[status]}>{labels[status]}</Tag>;
            }
        },
        {
            title: 'Đã gửi',
            dataIndex: 'sentCount',
            key: 'sentCount',
            render: (count: number) => count.toLocaleString()
        },
        {
            title: 'Tỉ lệ mở',
            dataIndex: 'openRate',
            key: 'openRate',
            render: (rate: number) => rate > 0 ? `${rate}%` : '-'
        },
        {
            title: 'Ngày gửi',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Button size="small">Chỉnh sửa</Button>
                    {record.status === 'draft' && <Button size="small" type="primary">Gửi ngay</Button>}
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Chiến dịch Marketing</Title>
                    <Text type="secondary">Quản lý các chiến dịch email và thông báo đẩy tới người dùng</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setIsModalVisible(true)}>
                    Tạo chiến dịch mới
                </Button>
            </div>

            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Tổng Email đã gửi" value={152000} prefix={<SendOutlined />} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Tỉ lệ mở trung bình" value={32.5} precision={1} suffix="%" prefix={<MailOutlined />} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Người dùng tiếp cận" value={85400} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card>
                <Table columns={columns} dataSource={campaigns} rowKey="id" />
            </Card>

            <Modal
                title="Tạo chiến dịch mới"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={700}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Form.Item name="name" label="Tên chiến dịch" rules={[{ required: true }]}>
                        <Input placeholder="VD: Khuyễn mãi tháng 10" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="segment" label="Phân khúc người dùng" rules={[{ required: true }]}>
                                <Select placeholder="Chọn phân khúc">
                                    <Option value="all">Tất cả người dùng</Option>
                                    <Option value="active">Người dùng thường xuyên</Option>
                                    <Option value="inactive">Người dùng ít hoạt động</Option>
                                    <Option value="vip">Khách hàng VIP</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="date" label="Ngày gửi dự kiến" rules={[{ required: true }]}>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="subject" label="Tiêu đề Email" rules={[{ required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Tiêu đề hấp dẫn..." />
                    </Form.Item>

                    <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}>
                        <TextArea rows={6} placeholder="Nội dung HTML hoặc văn bản..." />
                    </Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
                        <Button type="primary" htmlType="submit">Lên lịch gửi</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default CampaignPage;
