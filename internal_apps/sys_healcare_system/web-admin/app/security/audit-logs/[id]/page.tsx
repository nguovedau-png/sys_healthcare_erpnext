"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Breadcrumb, Typography, Tag, Button, Descriptions, Space } from 'antd';
import { ArrowLeftOutlined, CopyOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function AuditLogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    // Mock detailed data - in a real app this would be fetched from API by ID
    const logDetails = {
        id: id,
        timestamp: '2024-12-20T14:30:00Z',
        user: 'admin@hospital.com',
        userRole: 'Administrator',
        action: 'UPDATE_USER_PERMISSIONS',
        module: 'Security',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36...',
        status: 'SUCCESS',
        riskLevel: 'MEDIUM',
        payload: {
            userId: 'user_12345',
            changes: {
                previous: {
                    roles: ['DOCTOR'],
                    permissions: ['view_records']
                },
                current: {
                    roles: ['DOCTOR', 'DEPT_HEAD'],
                    permissions: ['view_records', 'edit_records', 'approve_requests']
                }
            },
            reason: 'Promotion to Department Head'
        },
        metadata: {
            transactionId: 'tx_abc123xyz',
            executionTime: '45ms'
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(logDetails.payload, null, 2));
    };

    return (
        <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
            <Breadcrumb
                items={[
                    { title: <a onClick={() => router.push('/')}>Dashboard</a> },
                    { title: <a onClick={() => router.push('/security/audit-logs')}>Audit Logs</a> },
                    { title: `Log #${id}` },
                ]}
                className="mb-4"
            />

            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <Space direction="vertical" size={0}>
                    <Title level={3} style={{ margin: 0 }}>Chi tiết Nhật ký Hệ thống</Title>
                    <Text type="secondary">ID: {id}</Text>
                </Space>
                <Space>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>Quay lại</Button>
                    <Button type="primary" icon={<CopyOutlined />} onClick={handleCopy}>Sao chép JSON</Button>
                </Space>
            </div>

            <Row gutter={[24, 24]}>
                <Col span={16}>
                    <Card title="Dữ liệu Payload (JSON)" bordered={false} className="rounded-2xl shadow-sm overflow-hidden">
                        <pre className="bg-gray-900 text-green-400 p-6 rounded-xl overflow-auto text-xs leading-relaxed max-h-[600px]">
                            {JSON.stringify(logDetails.payload, null, 2)}
                        </pre>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Thông tin Tổng hợp" bordered={false} className="rounded-2xl shadow-sm space-y-6">
                        <Descriptions column={1} bordered size="small">
                            <Descriptions.Item label="Thời gian">
                                {new Date(logDetails.timestamp).toLocaleString('vi-VN')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Người thực hiện">
                                <Text strong>{logDetails.user}</Text>
                                <br />
                                <Text type="secondary" text-xs>{logDetails.userRole}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Hành động">
                                <Tag color="blue">{logDetails.action}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                <Tag color="green">{logDetails.status}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="IP Address">
                                <code className="text-xs">{logDetails.ipAddress}</code>
                            </Descriptions.Item>
                            <Descriptions.Item label="Mức độ rủi ro">
                                <Tag color="orange">{logDetails.riskLevel}</Tag>
                            </Descriptions.Item>
                        </Descriptions>

                        <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                            <Space align="start">
                                <SafetyCertificateOutlined className="text-blue-500 text-lg" />
                                <div>
                                    <Text strong className="text-blue-700 block">Xác thực Toàn vẹn</Text>
                                    <Text className="text-blue-600 text-xs">
                                        Bản ghi này đã được ký số và đảm bảo không bị thay đổi sau khi ghi nhận.
                                    </Text>
                                </div>
                            </Space>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

// Helper for Layout
import { Row, Col } from 'antd';
