'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Progress, Badge, List, Typography, Button } from 'antd';
import { CheckCircleOutlined, SyncOutlined, DatabaseOutlined, CloudServerOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SystemHealthPage = () => {
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([
        { name: 'API Gateway', status: 'ONLINE', uptime: '99.9%', version: 'v1.2.0', latency: '45ms' },
        { name: 'Auth Service', status: 'ONLINE', uptime: '99.8%', version: 'v1.1.5', latency: '55ms' },
        { name: 'Booking Service', status: 'ONLINE', uptime: '99.5%', version: 'v1.3.0', latency: '120ms' },
        { name: 'Patient Service', status: 'ONLINE', uptime: '99.9%', version: 'v1.1.0', latency: '60ms' },
        { name: 'Doctor Service', status: 'ONLINE', uptime: '99.9%', version: 'v1.1.2', latency: '65ms' },
        { name: 'Payment Service', status: 'ONLINE', uptime: '99.9%', version: 'v1.0.0', latency: '80ms' },
        { name: 'Notification Service', status: 'MAINTENANCE', uptime: '98.5%', version: 'v1.0.5', latency: '-' },
        { name: 'AI Service', status: 'ONLINE', uptime: '95.0%', version: 'v0.9.0', latency: '500ms' },
    ]);

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Simulate random latency changes
            setServices(prev => prev.map(s => ({
                ...s,
                latency: s.status === 'ONLINE' ? `${Math.floor(Math.random() * 100) + 20}ms` : '-'
            })));
        }, 1000);
    };

    return (
        <div style={{ padding: '24px' }}>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <Title level={2} style={{ margin: 0 }}>Health Status Dashboard</Title>
                    <Text type="secondary">Real-time supervision of microservices ecosystem</Text>
                </div>
                <Button type="primary" icon={<ReloadOutlined />} loading={loading} onClick={handleRefresh}>
                    Refresh Status
                </Button>
            </div>

            <Row gutter={[24, 24]}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="System Uptime (30 Days)"
                            value={99.85}
                            precision={2}
                            suffix="%"
                            prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                        />
                        <Progress percent={99.85} status="active" strokeColor="#52c41a" showInfo={false} className="mt-2" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Active Connections"
                            value={1284}
                            prefix={<CloudServerOutlined style={{ color: '#1890ff' }} />}
                        />
                        <div className="mt-2 text-green-500 font-semibold text-xs">
                            +12% vs last hour
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Database Load"
                            value={35}
                            suffix="%"
                            prefix={<DatabaseOutlined style={{ color: '#faad14' }} />}
                        />
                        <Progress percent={35} size="small" status="normal" strokeColor="#faad14" showInfo={false} className="mt-2" />
                    </Card>
                </Col>
            </Row>

            <Title level={4} style={{ marginTop: '32px', marginBottom: '16px' }}>Microservices Status</Title>

            <Row gutter={[16, 16]}>
                {services.map((service, idx) => (
                    <Col span={8} key={idx}>
                        <Card size="small" bordered={false} className="shadow-sm border-l-4"
                            style={{
                                borderLeftColor: service.status === 'ONLINE' ? '#52c41a' :
                                    service.status === 'MAINTENANCE' ? '#faad14' : '#f5222d'
                            }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <Text strong style={{ fontSize: 16 }}>{service.name}</Text>
                                {service.status === 'ONLINE' && <Badge status="success" text="Online" />}
                                {service.status === 'MAINTENANCE' && <Badge status="warning" text="Maintenance" />}
                                {service.status === 'OFFLINE' && <Badge status="error" text="Offline" />}
                            </div>
                            <div className="flex justify-between text-gray-500 text-xs mt-4">
                                <span>Version: {service.version}</span>
                                <span>Latency: {service.latency}</span>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default SystemHealthPage;
