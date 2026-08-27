'use client';

import React, { useState } from 'react';
import { Card, Tag, Input, Table, Button, Tabs, Space, Typography, Switch } from 'antd';
import { SearchOutlined, PlusOutlined, RobotOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AIConfigPage = () => {
    const [keywords, setKeywords] = useState([
        { id: 1, word: 'đau đầu', specialty: 'Thần kinh', urgency: 'Trung bình', active: true },
        { id: 2, word: 'đau ngực', specialty: 'Tim mạch', urgency: 'Cao', active: true },
        { id: 3, word: 'gãy xương', specialty: 'Chấn thương chỉnh hình', urgency: 'Cao', active: true },
        { id: 4, word: 'nổi mẩn', specialty: 'Da liễu', urgency: 'Thấp', active: true },
    ]);

    const columns = [
        { title: 'Từ khóa', dataIndex: 'word', key: 'word', render: (t: string) => <Tag color="blue">{t}</Tag> },
        { title: 'Chuyên khoa đề xuất', dataIndex: 'specialty', key: 'specialty' },
        {
            title: 'Mức độ',
            dataIndex: 'urgency',
            key: 'urgency',
            render: (u: string) => {
                const colors: any = { 'Cao': 'red', 'Trung bình': 'orange', 'Thấp': 'green' };
                return <Tag color={colors[u]}>{u}</Tag>;
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            key: 'active',
            render: (active: boolean) => <Switch size="small" checked={active} />
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: () => <Button type="link" size="small">Sửa</Button>
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0 }}>Cấu hình AI Diagnosis</Title>
                <Text type="secondary">Quản lý từ khóa và quy tắc cho Symptom Checker</Text>
            </div>

            <Row gutter={[24, 24]}>
                <Col span={16}>
                    <Card title="Danh sách Từ khóa & Triệu chứng" extra={<Button type="primary" icon={<PlusOutlined />}>Thêm từ khóa</Button>}>
                        <Input prefix={<SearchOutlined />} placeholder="Tìm kiếm từ khóa..." style={{ marginBottom: 16 }} />
                        <Table dataSource={keywords} columns={columns} rowKey="id" pagination={false} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Cấu hình Model" className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <span>Model Version</span>
                            <Tag color="purple">Healthcare-BERT-v2.1</Tag>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span>Độ chính xác (Accuracy)</span>
                            <Text strong>94.2%</Text>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Ngưỡng tin cậy (Confidence)</span>
                            <Input style={{ width: 60 }} defaultValue="0.8" size="small" />
                        </div>
                    </Card>
                    <Card title="Unmatched Queries (Học hỏi)">
                        <div className="space-y-2">
                            <div className="p-2 bg-gray-50 rounded flex justify-between">
                                <span>"đau nhói ở sườn phải"</span>
                                <Button size="small" type="dashed">Map</Button>
                            </div>
                            <div className="p-2 bg-gray-50 rounded flex justify-between">
                                <span>"mắt bị mờ đi"</span>
                                <Button size="small" type="dashed">Map</Button>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
import { Row, Col } from 'antd';

export default AIConfigPage;
