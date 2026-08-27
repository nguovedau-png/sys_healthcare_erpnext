import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Badge, Typography, Button, Spin, Descriptions, Alert } from 'antd';
import { ReloadOutlined, DatabaseOutlined, FolderOpenOutlined, DashboardOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const SystemStatus: React.FC = () => {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [error, setError] = useState<string | null>(null);

    const fetchStatus = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/v1/system/health');
            setStatus(res.data.data);
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
                                    <StatusBadge up={status.services?.database?.status === 'up'} />
                                    {status.services?.database?.error && (
                                        <div className="mt-2 text-red-500 text-xs">{status.services.database.error}</div>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        {/* File System */}
                        <Col span={8}>
                            <Card title={<span><FolderOpenOutlined /> Storage (Uploads)</span>}>
                                <div className="text-center py-4">
                                    <StatusBadge up={status.services?.uploads?.status === 'up'} />
                                    {status.services?.uploads?.path && (
                                        <div className="mt-2 text-gray-400 text-xs truncate max-w-full px-4" title={status.services.uploads.path}>
                                            {status.services.uploads.path}
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        {/* Resources */}
                        <Col span={8}>
                            <Card title={<span><DashboardOutlined /> Server Resource</span>}>
                                <Descriptions column={1} size="small" bordered>
                                    <Descriptions.Item label="Uptime">{status.system?.uptime}</Descriptions.Item>
                                    <Descriptions.Item label="Memory (RSS)">{status.system?.memory?.rss}</Descriptions.Item>
                                    <Descriptions.Item label="Heap Used">{status.system?.memory?.heapUsed}</Descriptions.Item>
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
