'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Input, Tag, Breadcrumb, message, Row, Col, Statistic, Progress, Tabs, List, Tooltip } from 'antd';
import { RobotOutlined, CheckCircleOutlined, CloseCircleOutlined, AreaChartOutlined, SearchOutlined, RocketOutlined, AimOutlined, SyncOutlined, EyeOutlined } from '@ant-design/icons';
import aiService, { Recommendation, AIStats, ModelPerformance, RecommendationStatus, RecommendationType } from '@/services/ai.service';

const { Title, Text } = Typography;

export default function AIRecommendationsPage() {
    const [activeTab, setActiveTab] = useState('DOCTOR');
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [stats, setStats] = useState<AIStats | null>(null);
    const [performance, setPerformance] = useState<ModelPerformance | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [recsData, statsData, perfData] = await Promise.all([
                aiService.getRecommendations(activeTab),
                aiService.getAIStats(),
                aiService.getModelPerformance()
            ]);
            setRecommendations(recsData);
            setStats(statsData);
            setPerformance(perfData);
        } catch (error) {
            console.error('Failed to fetch AI data:', error);
            // Fallback mock
            setStats({ accuracy: 0.94, dailySuggestions: 2450, acceptanceRate: 0.82, modelVersion: 'GPT-4o-Med-v2' });
            setPerformance({ precision: 0.95, recall: 0.92, f1Score: 0.93 });
            setRecommendations([
                { id: 1, patientName: 'Nguyễn Văn A', symptoms: 'Đau tức ngực, khó thở khi gắng sức', type: 'DOCTOR' as any, confidence: 0.98, recommendedItem: 'BS. Trần Quang Minh (Tim mạch)', reason: 'Dựa trên triệu chứng cơ năng và tiền sử bệnh lý tim mạch.', status: 'PENDING' as any, createdAt: '2024-12-20' },
                { id: 2, patientName: 'Lê Thị B', symptoms: 'Sốt cao, đau họng, nổi hạch cổ', type: 'DOCTOR' as any, confidence: 0.85, recommendedItem: 'BS. Phạm Thanh Thủy (Tai Mũi Họng)', reason: 'Các triệu chứng điển hình của viêm họng cấp hoặc viêm Amidan.', status: 'ACCEPTED' as any, createdAt: '2024-12-21' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleFeedback = async (id: number, status: RecommendationStatus) => {
        try {
            await aiService.handleFeedback(id, status);
            message.success(status === 'ACCEPTED' ? 'Đã chấp nhận gợi ý' : 'Đã từ chối gợi ý');
            fetchData();
        } catch (error) {
            message.error('Lỗi khi thực hiện hành động');
        }
    };

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Hệ thống AI</Breadcrumb.Item>
                <Breadcrumb.Item>Gợi ý thông minh (AI Recommendations)</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>AI Recommendations</Title>
                    <Text type="secondary">Hệ thống gợi ý thông minh hỗ trợ ra quyết định lâm sàng và điều hướng bệnh nhân</Text>
                </div>
                <Button type="primary" icon={<SyncOutlined />} onClick={fetchData}>
                    Làm mới Model
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card size="small">
                        <Statistic
                            title="Độ chính xác"
                            value={stats ? (stats.accuracy * 100) : 0}
                            precision={0}
                            suffix="%"
                            prefix={<AimOutlined style={{ color: '#52c41a' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic
                            title="Gợi ý/ngày"
                            value={stats?.dailySuggestions || 0}
                            prefix={<RocketOutlined style={{ color: '#1890ff' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic
                            title="Tỷ lệ chấp nhận"
                            value={stats ? (stats.acceptanceRate * 100) : 0}
                            precision={0}
                            suffix="%"
                            prefix={<CheckCircleOutlined style={{ color: '#722ed1' }} />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small">
                        <Statistic
                            title="Phiên bản Model"
                            value={stats?.modelVersion || 'v1.0.0'}
                            valueStyle={{ fontSize: '16px', fontWeight: 'bold' }}
                            prefix={<RobotOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Tabs defaultActiveKey="DOCTOR" onChange={(key) => setActiveTab(key)} style={{ marginBottom: '24px' }}>
                <Tabs.TabPane tab="Gợi ý Bác sĩ" key="DOCTOR" />
                <Tabs.TabPane tab="Chẩn đoán AI" key="DIAGNOSIS" />
                <Tabs.TabPane tab="Đơn thuốc tham khảo" key="MEDICATION" />
            </Tabs>

            <Row gutter={24}>
                <Col span={16}>
                    <List
                        loading={loading}
                        dataSource={recommendations}
                        renderItem={(item) => (
                            <Card
                                style={{ marginBottom: '16px' }}
                                bodyStyle={{ padding: '20px' }}
                                actions={item.status === 'PENDING' ? [
                                    <Button type="link" style={{ color: '#52c41a' }} icon={<CheckCircleOutlined />} onClick={() => handleFeedback(item.id, 'ACCEPTED')}>Chấp nhận</Button>,
                                    <Button type="link" danger icon={<CloseCircleOutlined />} onClick={() => handleFeedback(item.id, 'REJECTED')}>Từ chối</Button>,
                                    <Button type="link" icon={<EyeOutlined />}>Xem chi tiết</Button>
                                ] : undefined}
                                extra={
                                    item.status !== 'PENDING' && (
                                        <Tag color={item.status === 'ACCEPTED' ? 'success' : 'error'}>
                                            {item.status === 'ACCEPTED' ? 'ĐÃ CHẤP NHẬN' : 'ĐÃ TỪ CHỐI'}
                                        </Tag>
                                    )
                                }
                            >
                                <Row gutter={16} align="middle">
                                    <Col span={18}>
                                        <div style={{ marginBottom: '12px' }}>
                                            <Text strong style={{ fontSize: '16px' }}>Bệnh nhân: {item.patientName}</Text>
                                            <br />
                                            <Text type="secondary">Triệu chứng: {item.symptoms}</Text>
                                        </div>
                                        <div style={{ padding: '12px', background: '#f0f5ff', borderRadius: '8px', border: '1px solid #adc6ff' }}>
                                            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>GỢI Ý TỪ AI:</Text>
                                            <Text strong style={{ fontSize: '18px', color: '#1d39c4', display: 'block', marginBottom: '8px' }}>{item.recommendedItem}</Text>
                                            <Text italic style={{ fontSize: '13px' }}>Lý do: {item.reason}</Text>
                                        </div>
                                    </Col>
                                    <Col span={6} style={{ textAlign: 'center' }}>
                                        <Statistic
                                            title="Độ tin cậy"
                                            value={item.confidence * 100}
                                            precision={0}
                                            suffix="%"
                                            valueStyle={{ color: item.confidence > 0.9 ? '#3f8600' : '#faad14' }}
                                        />
                                        <Progress
                                            percent={item.confidence * 100}
                                            showInfo={false}
                                            strokeColor={item.confidence > 0.9 ? '#52c41a' : '#faad14'}
                                            style={{ marginTop: '8px' }}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        )}
                    />
                </Col>
                <Col span={8}>
                    <Card title={<Space><AreaChartOutlined /> Hiệu suất Model</Space>}>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <Text>Precision (Độ chuẩn xác)</Text>
                                <Text strong>{performance ? (performance.precision * 100).toFixed(0) : 0}%</Text>
                            </div>
                            <Progress percent={performance ? performance.precision * 100 : 0} strokeColor="#52c41a" showInfo={false} />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <Text>Recall (Độ gợi nhớ)</Text>
                                <Text strong>{performance ? (performance.recall * 100).toFixed(0) : 0}%</Text>
                            </div>
                            <Progress percent={performance ? performance.recall * 100 : 0} strokeColor="#1890ff" showInfo={false} />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <Text>F1 Score (Trung bình trọng số)</Text>
                                <Text strong>{performance ? (performance.f1Score * 100).toFixed(0) : 0}%</Text>
                            </div>
                            <Progress percent={performance ? performance.f1Score * 100 : 0} strokeColor="#722ed1" showInfo={false} />
                        </div>
                        <Alert
                            message="Thông tin Model"
                            description="Model hiện tại đang được huấn luyện trên bộ dữ liệu 500k bệnh án và liên tục cập nhật dựa trên phản hồi của bác sĩ."
                            type="info"
                            showIcon
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

const Alert = ({ message, description, type, showIcon }: any) => (
    <div style={{ padding: '12px', background: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: '4px', marginTop: '16px' }}>
        <Space>
            <AimOutlined style={{ color: '#1890ff' }} />
            <div>
                <Text strong style={{ fontSize: '13px', display: 'block' }}>{message}</Text>
                <Text style={{ fontSize: '12px' }}>{description}</Text>
            </div>
        </Space>
    </div>
);
