'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Button, Switch, Divider, Typography, InputNumber, Table, Tag, message } from 'antd';
import { GiftOutlined, SaveOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const LoyaltySettingsPage = () => {
    const [loading, setLoading] = useState(false);
    const [rules, setRules] = useState([
        { id: 1, action: 'Đăng nhập hàng ngày', points: 10, limit: '1 lần/ngày', active: true },
        { id: 2, action: 'Hoàn thành đặt lịch khám', points: 50, limit: 'Không giới hạn', active: true },
        { id: 3, action: 'Đánh giá bác sĩ', points: 20, limit: '1 lần/lượt khám', active: true },
        { id: 4, action: 'Giới thiệu bạn bè', points: 100, limit: '5 lần/tháng', active: false },
    ]);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            message.success('Cập nhật cấu hình điểm thưởng thành công');
        }, 1000);
    };

    const columns = [
        { title: 'Hành động', dataIndex: 'action', key: 'action' },
        {
            title: 'Điểm thưởng',
            dataIndex: 'points',
            key: 'points',
            render: (points: number) => <InputNumber defaultValue={points} />
        },
        { title: 'Giới hạn', dataIndex: 'limit', key: 'limit' },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            key: 'active',
            render: (active: boolean) => <Switch defaultChecked={active} />
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Cấu hình Loyalty</Title>
                <Text type="secondary">Thiết lập quy tắc tích điểm và đổi quà</Text>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <Card title="Quy tắc tích điểm" extra={<Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleSave}>Lưu thay đổi</Button>}>
                    <Table columns={columns} dataSource={rules} rowKey="id" pagination={false} />
                </Card>

                <Card title="Cấu hình chung">
                    <Form layout="vertical">
                        <Form.Item label="Tỷ lệ quy đổi (1 điểm = ? VND)">
                            <InputNumber defaultValue={100} style={{ width: '100%' }} addonAfter="VND" />
                        </Form.Item>
                        <Form.Item label="Điểm tối thiểu để đổi quà">
                            <InputNumber defaultValue={1000} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Thời hạn điểm (ngày)">
                            <InputNumber defaultValue={365} style={{ width: '100%' }} />
                            <Text type="secondary" style={{ fontSize: '12px' }}>0 = Vĩnh viễn</Text>
                        </Form.Item>
                        <Divider />
                        <Form.Item label="Kích hoạt hệ thống Loyalty">
                            <Switch defaultChecked />
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default LoyaltySettingsPage;
