'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Card, Space, Row, Col, Statistic, Table, Tag, Button, Empty } from 'antd';
import { DollarCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

interface Subscription {
    id: number;
    plan: string;
    amount: number;
    currency: string;
    status: string;
    nextBillingDate: string;
}

interface PaymentMethod {
    id: number;
    type: string;
    lastFourDigits: string;
    expirationDate: string;
}

const methodColumns: ColumnsType<PaymentMethod> = [
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
        title: 'Ending In',
        dataIndex: 'lastFourDigits',
        key: 'lastFourDigits',
        render: (text) => `**** **** **** ${text}`,
    },
    {
        title: 'Expires',
        dataIndex: 'expirationDate',
        key: 'expirationDate',
        render: (text) => new Date(text).toLocaleDateString(),
    },
];

import { useAuth } from '@/providers/AuthProvider';

export default function SubscriptionsPage() {
    const { user } = useAuth();
    const userId = user?.userId;
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const [subRes, methodsRes] = await Promise.all([
                fetch(`http://localhost:3000/payments/subscription?userId=${userId}`),
                fetch(`http://localhost:3000/payments/methods?userId=${userId}`)
            ]);

            if (subRes.ok) {
                const subData = await subRes.json();
                setSubscription(subData);
            }

            if (methodsRes.ok) {
                const methodsData = await methodsRes.json();
                setMethods(Array.isArray(methodsData) ? methodsData : []);
            }

        } catch (err) {
            console.error('Failed to fetch payment data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchData();
    }, [userId]);

    return (
        <div style={{ padding: '24px' }}>
            <Space orientation="vertical" style={{ width: '100%', marginBottom: 24 }}>
                <Title level={2}>Subscription & Billing</Title>

                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="Current Subscription" loading={loading}>
                            {subscription ? (
                                <Space orientation="vertical">
                                    <Statistic title="Plan" value={subscription.plan} prefix={<DollarCircleOutlined />} />
                                    <Statistic title="Amount" value={subscription.amount} precision={2} suffix={subscription.currency} />
                                    <Text>Next Billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}</Text>
                                    <Tag color={subscription.status === 'ACTIVE' ? 'green' : 'red'}>{subscription.status}</Tag>
                                </Space>
                            ) : (
                                <Empty description="No active subscription" />
                            )}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Payment Methods" loading={loading} extra={<Button type="link">Add Method</Button>}>
                            <Table
                                columns={methodColumns}
                                dataSource={methods}
                                rowKey="id"
                                pagination={false}
                            />
                        </Card>
                    </Col>
                </Row>
            </Space>
        </div>
    );
}
