"use client";

import React, { useState, useEffect } from 'react';
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
    Tag,
    message
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
    ShopOutlined,
    SafetyCertificateOutlined,
    SolutionOutlined,
    StarOutlined,
    TeamOutlined
} from '@ant-design/icons';
import partnerService, { Clinic } from '@/services/partner.service';
import StatusBadge from '@/components/admin/StatusBadge';

const { Title, Text, Paragraph } = Typography;

export default function ClinicDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [clinic, setClinic] = useState<Clinic | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClinic = async () => {
            if (!params.id) return;
            try {
                setLoading(true);
                const data = await partnerService.getClinic(parseInt(params.id));
                setClinic(data);
            } catch (error) {
                console.error('Failed to fetch clinic detail', error);
                message.error('Không thể tải thông tin phòng khám');
            } finally {
                setLoading(false);
            }
        };
        fetchClinic();
    }, [params.id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải thông tin..." />
            </div>
        );
    }

    if (!clinic) {
        return (
            <Card>
                <Paragraph type="danger">Không tìm thấy thông tin phòng khám</Paragraph>
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
                            <Text strong>{clinic.name}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <StatusBadge status={clinic.isVerified ? 'active' : 'inactive'} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            <Space><PhoneOutlined /><Text>{clinic.phone}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            <Space><MailOutlined /><Text>{clinic.email || 'N/A'}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Website" span={2}>
                            <Space><GlobalOutlined /><a href={clinic.website} target="_blank" rel="noreferrer">{clinic.website || 'N/A'}</a></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ" span={2}>
                            <Space align="start"><EnvironmentOutlined /><Text>{clinic.address}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mô tả" span={2}>
                            <Paragraph style={{ margin: 0 }}>{clinic.description || 'Chưa có mô tả chi tiết cho phòng khám này.'}</Paragraph>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            )
        },
        {
            key: 'specialty',
            label: 'Chuyên khoa & Dịch vụ',
            children: (
                <div style={{ padding: '16px' }}>
                    <Title level={5}>Danh mục chuyên khoa</Title>
                    <Space wrap>
                        {clinic.specialties?.length ? (
                            clinic.specialties.map(s => <Tag color="blue" key={s}>{s}</Tag>)
                        ) : (
                            <Text type="secondary">Chưa cập nhật chuyên khoa</Text>
                        )}
                    </Space>
                </div>
            )
        }
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/clinics">Phòng khám</Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết {clinic.name}</Breadcrumb.Item>
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
                            src={clinic.thumbnail}
                            icon={<ShopOutlined />}
                            style={{ backgroundColor: '#1890ff' }}
                        />
                        <div>
                            <Space size="small">
                                <Title level={2} style={{ margin: 0 }}>{clinic.name}</Title>
                                {clinic.isVerified && <SafetyCertificateOutlined style={{ color: '#52c41a', fontSize: '20px' }} />}
                            </Space>
                            <div style={{ marginTop: '4px' }}>
                                <Rate disabled defaultValue={clinic.rating || 0} style={{ fontSize: '14px' }} />
                                <Text type="secondary" style={{ marginLeft: '8px' }}>({clinic.rating || 0} đánh giá)</Text>
                            </div>
                        </div>
                    </Space>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => router.push(`/partners/clinics/${clinic.id}/edit`)}
                    >
                        Chỉnh sửa thông tin
                    </Button>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic title="Xếp hạng" value={clinic.rating || 0} precision={1} prefix={<StarOutlined />} suffix="/ 5" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Bác sĩ" value={12} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Lượt khám" value={450} suffix="+" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Text type="secondary">Độ xác thực</Text>
                        <div style={{ marginTop: '4px' }}>
                            <Tag color={clinic.isVerified ? 'success' : 'warning'}>
                                {clinic.isVerified ? 'Đã xác thực' : 'Yêu cầu xác thực'}
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
