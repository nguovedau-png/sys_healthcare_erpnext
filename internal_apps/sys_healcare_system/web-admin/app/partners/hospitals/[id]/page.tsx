"use client";

import React, { useState, useEffect } from 'react';
import StatusBadge from '@/components/admin/StatusBadge';
import { useParams, useRouter } from 'next/navigation';
import {
    Typography,
    Button,
    Space,
    Breadcrumb,
    Card,
    Descriptions,
    Statistic,
    Row,
    Col,
    Rate,
    Avatar,
    Tabs,
    Spin,
    Divider,
    Tag,
    message
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    GlobalOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    UserOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import partnerService, { Hospital } from '@/services/partner.service';

const { Title, Text, Paragraph } = Typography;

export default function HospitalDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [hospital, setHospital] = useState<Hospital | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!params.id) return;
            try {
                setLoading(true);
                const data = await partnerService.getHospital(parseInt(params.id));
                setHospital(data);
            } catch (error) {
                console.error('Failed to fetch hospital detail', error);
                message.error('Không thể tải thông tin bệnh viện');
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [params.id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải thông tin..." />
            </div>
        );
    }

    if (!hospital) {
        return (
            <Card>
                <Paragraph type="danger">Không tìm thấy thông tin bệnh viện</Paragraph>
                <Button onClick={() => router.back()} type="primary">Quay lại</Button>
            </Card>
        );
    }

    const tabItems = [
        {
            key: 'overview',
            label: 'Tổng quan',
            children: (
                <div style={{ marginTop: '16px' }}>
                    <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item label="Tên cơ sở">
                            <Text strong>{hospital.name}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <StatusBadge status={hospital.status as any} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            <Space><PhoneOutlined /><Text>{hospital.phone}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            <Space><MailOutlined /><Text>{hospital.email || 'N/A'}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Website" span={2}>
                            <Space><GlobalOutlined /><a href={hospital.website} target="_blank" rel="noreferrer">{hospital.website || 'N/A'}</a></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ" span={2}>
                            <Space align="start"><EnvironmentOutlined /><Text>{hospital.address}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mô tả" span={2}>
                            <Paragraph style={{ margin: 0 }}>{hospital.description || 'Không có mô tả chi tiết'}</Paragraph>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            )
        },
        {
            key: 'doctors',
            label: 'Danh sách Bác sĩ',
            children: (
                <div style={{ padding: '24px', textAlign: 'center' }}>
                    <Statistic title="Tổng số bác sĩ" value={hospital.beds || 0} prefix={<UserOutlined />} />
                    <Button type="link">Xem tất cả bác sĩ tại đây</Button>
                </div>
            )
        },
        {
            key: 'services',
            label: 'Dịch vụ & Chuyên khoa',
            children: (
                <div style={{ marginTop: '16px' }}>
                    <Title level={5}>Chuyên khoa trọng tâm</Title>
                    <Space wrap>
                        {(hospital as any).departments?.map((dept: string) => (
                            <Tag color="blue" key={dept}>{dept}</Tag>
                        )) || <Text type="secondary">Chưa cập nhật chuyên khoa</Text>}
                    </Space>
                </div>
            )
        }
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/hospitals">Bệnh viện</Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết {hospital.name}</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space size="middle" align="start">
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => router.back()}
                            type="text"
                        />
                        <Avatar
                            size={64}
                            src={hospital.thumbnail}
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#1890ff' }}
                        />
                        <div>
                            <Space size="small">
                                <Title level={2} style={{ margin: 0 }}>{hospital.name}</Title>
                                {hospital.isVerified && <SafetyCertificateOutlined style={{ color: '#52c41a', fontSize: '20px' }} />}
                            </Space>
                            <div style={{ marginTop: '4px' }}>
                                <Rate disabled defaultValue={hospital.rating || 0} style={{ fontSize: '14px' }} />
                                <Text type="secondary" style={{ marginLeft: '8px' }}>({hospital.rating || 0} đánh giá)</Text>
                            </div>
                        </div>
                    </Space>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => router.push(`/partners/hospitals/${hospital.id}/edit`)}
                    >
                        Chỉnh sửa thông tin
                    </Button>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic title="Xếp hạng" value={hospital.level || 'Hạng 1'} valueStyle={{ color: '#cf1322' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Số giường bệnh" value={hospital.beds || 0} prefix={<UserOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Đánh giá" value={hospital.rating || 0} suffix="/ 5" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Text type="secondary">Độ tin cậy</Text>
                        <div style={{ marginTop: '4px' }}>
                            <Tag color={hospital.isVerified ? 'success' : 'warning'}>
                                {hospital.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                            </Tag>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card variant="outlined">
                <Tabs items={tabItems} />
            </Card>
        </Space>
    );
}
