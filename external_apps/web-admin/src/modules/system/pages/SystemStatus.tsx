import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Badge, Typography, Button, Spin, Descriptions, Alert } from 'antd';
import { ReloadOutlined, DatabaseOutlined, FolderOpenOutlined, DashboardOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import api from '../../../services/api';

const { Title, Text } = Typography;

const SystemStatus: React.FC = () => {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [error, setError] = useState<string | null>(null);

    const fetchStatus = async () => {
        setLoading(true);
        try {
            const res = await api.get('/health');
            setStatus(res.data?.data ?? res.data);
            setLastUpdated(new Date());
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch status');
            setStatus(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 30000); // 30s auto refresh
        return () => clearInterval(interval);
    }, []);

    const StatusBadge = ({ up }: { up: boolean }) => (
        <Badge status={up ? 'success' : 'error'} text={up ? 'Operational' : 'Down'} />
    );
    const serviceMap = status?.services
        ? Array.isArray(status.services)
            ? Object.fromEntries(status.services.map((service: any) => [service.service || service.name, service]))
            : status.services
        : {};

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Title level={2}>System Status</Title>
                    <Text type="secondary">Last updated: {lastUpdated.toLocaleTimeString()}</Text>
                </div>
                <Button
                    icon={<ReloadOutlined />}
                    onClick={fetchStatus}
                    loading={loading}
                >
                    Refresh
                </Button>
            </div>

            {error && <Alert message="System Unreachable" description={error} type="error" showIcon className="mb-6" />}

            {status && (
                <div className="space-y-6">
                    {/* Overall Status Hero */}
                    <Card className={`border-l-4 ${status.status === 'ok' ? 'border-l-green-500' : 'border-l-red-500'}`}>
                        <div className="flex items-center gap-4">
                            {status.status === 'ok' ?
                                <CheckCircleOutlined className="text-4xl text-green-500" /> :
                                <CloseCircleOutlined className="text-4xl text-red-500" />
                            }
                            <div>
                                <Title level={4} className="m-0">{status.status === 'ok' ? 'All Systems Operational' : 'System Issues Detected'}</Title>
                                <Text>The system is currently {status.status === 'ok' ? 'healthy' : 'experiencing issues'}.</Text>
                            </div>
                        </div>
                    </Card>

                    <Row gutter={[16, 16]}>
                        {/* Database */}
                        <Col span={8}>
                            <Card title={<span><DatabaseOutlined /> Database</span>}>
                                <div className="text-center py-4">
                                    <StatusBadge up={serviceMap.database?.status === 'up'} />
                                    {serviceMap.database?.error && (
                                        <div className="mt-2 text-red-500 text-xs">{serviceMap.database.error}</div>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        {/* File System */}
                        <Col span={8}>
                            <Card title={<span><FolderOpenOutlined /> Storage (Uploads)</span>}>
                                <div className="text-center py-4">
                                    <StatusBadge up={serviceMap.uploads?.status === 'up'} />
                                    {serviceMap.uploads?.path && (
                                        <div className="mt-2 text-gray-400 text-xs truncate max-w-full px-4" title={serviceMap.uploads.path}>
                                            {serviceMap.uploads.path}
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        {/* Resources */}
                        <Col span={8}>
                            <Card title={<span><DashboardOutlined /> Server Resource</span>}>
                                <Descriptions column={1} size="small" bordered>
                                    <Descriptions.Item label="Checked At">{status.timestamp ? new Date(status.timestamp).toLocaleString() : '-'}</Descriptions.Item>
                                    <Descriptions.Item label="Services">{Object.keys(serviceMap).length}</Descriptions.Item>
                                    <Descriptions.Item label="Overall">{status.status || '-'}</Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}

            {loading && !status && !error && (
                <div className="text-center py-20">
                    <Spin size="large" />
                </div>
            )}
        </div>
    );
};

export default SystemStatus;
