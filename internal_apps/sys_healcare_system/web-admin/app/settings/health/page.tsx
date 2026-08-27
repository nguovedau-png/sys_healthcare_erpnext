'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Badge, Typography, Button, message } from 'antd';
import { CheckCircleOutlined, DatabaseOutlined, ReloadOutlined, SyncOutlined } from '@ant-design/icons';
import { erpNextService, ErpNextHealth } from '../../../services/erpnext.service';

const { Title, Text } = Typography;

type HealthService = { status?: string };
type HealthResponse = { status?: string; info?: Record<string, HealthService> };

const HealthPage = () => {
    const [loading, setLoading] = useState(false);
    const [healthData, setHealthData] = useState<HealthResponse | null>(null);
    const [erpNextHealth, setErpNextHealth] = useState<ErpNextHealth | null>(null);

    const fetchHealth = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/v1/health');
            if (res.ok) {
                const data = await res.json();
                setHealthData(data);
                const integrationHealth = await erpNextService.getHealth().catch(() => null);
                setErpNextHealth(integrationHealth);
                message.success('System status updated');
            } else {
                message.error('Failed to fetch system status');
            }
        } catch {
            message.error('Network error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHealth();
    }, []);

    // Helper to determine status color
    const getStatusColor = (status?: string) => status === 'up' ? '#52c41a' : '#f5222d';

    return (
        <div style={{ padding: '24px' }}>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <Title level={2} style={{ margin: 0 }}>System Health</Title>
                    <Text type="secondary">Real-time microservices monitoring</Text>
                </div>
                <Button type="primary" icon={<ReloadOutlined />} loading={loading} onClick={fetchHealth}>
                    Refresh
                </Button>
            </div>

            {/* Overall Status */}
            <Row gutter={[24, 24]} className="mb-8">
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Overall Status"
                            value={healthData?.status === 'ok' || healthData?.status === 'up' ? 'Healthy' : 'Issues'}
                            valueStyle={{ color: healthData?.status === 'ok' || healthData?.status === 'up' ? '#52c41a' : '#f5222d' }}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card>
                        <Statistic
                            title="Database"
                            value={healthData?.info?.database?.status === 'up' ? 'Connected' : 'Disconnected'}
                            prefix={<DatabaseOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card>
                        <Statistic
                            title="ERPNext sync"
                            value={erpNextHealth?.configured ? (erpNextHealth.consecutiveFailures === 0 ? 'Ready' : 'Degraded') : 'Not configured'}
                            valueStyle={{ color: !erpNextHealth?.configured ? '#8c8c8c' : erpNextHealth.consecutiveFailures === 0 ? '#52c41a' : '#fa8c16' }}
                            prefix={<SyncOutlined />}
                            suffix={erpNextHealth?.configured && erpNextHealth.consecutiveFailures > 0 ? `${erpNextHealth.consecutiveFailures} failures` : undefined}
                        />
                    </Card>
                </Col>
            </Row>

            <Title level={4}>Microservices</Title>
            <Row gutter={[16, 16]}>
                {healthData?.info && Object.entries(healthData.info).map(([key, value]) => (
                    key !== 'database' && (
                        <Col xs={24} sm={12} lg={8} key={key}>
                            <Card size="small" bordered={false} className="shadow-sm border-l-4"
                                style={{ borderLeftColor: getStatusColor(value.status) }}
                            >
                                <div className="flex justify-between items-center">
                                    <Text strong className="capitalize">{key.replace('_', ' ')}</Text>
                                    <Badge status={value.status === 'up' ? 'success' : 'error'} text={(value.status || 'unknown').toUpperCase()} />
                                </div>
                            </Card>
                        </Col>
                    )
                ))}
            </Row>
        </div>
    );
};

export default HealthPage;
