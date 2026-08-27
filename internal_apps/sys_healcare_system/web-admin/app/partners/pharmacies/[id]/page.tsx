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
    SafetyCertificateOutlined,
    ContainerOutlined,
    StarOutlined,
    ShopOutlined,
    MedicineBoxOutlined,
    TeamOutlined
} from '@ant-design/icons';
import partnerService, { Pharmacy } from '@/services/partner.service';
import StatusBadge from '@/components/admin/StatusBadge';

const { Title, Text, Paragraph } = Typography;

export default function PharmacyDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = parseInt(params.id);

    const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPharmacy = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await partnerService.getPharmacy(id);
                setPharmacy(data);
            } catch (error) {
                console.error('Failed to fetch pharmacy detail', error);
                message.error('Không thể tải thông tin nhà thuốc');
            } finally {
                setLoading(false);
            }
        };
        fetchPharmacy();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải thông tin..." />
            </div>
        );
    }

    if (!pharmacy) {
        return (
            <Card>
                <Paragraph type="danger">Không tìm thấy thông tin nhà thuốc</Paragraph>
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
                        <Descriptions.Item label="Tên nhà thuốc">
                            <Text strong>{pharmacy.name}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <StatusBadge status={pharmacy.isVerified ? 'active' : 'inactive'} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            <Space><PhoneOutlined /><Text>{pharmacy.phone}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            <Space><MailOutlined /><Text>{pharmacy.email || 'N/A'}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Giấy phép KD" span={2}>
                            <Text code>GPKD-2024-HEALTHCARE-{pharmacy.id}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Website" span={2}>
                            <Space><GlobalOutlined /><a href={pharmacy.website} target="_blank" rel="noreferrer">{pharmacy.website || 'N/A'}</a></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ" span={2}>
                            <Space align="start"><EnvironmentOutlined /><Text>{pharmacy.address}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mô tả" span={2}>
                            <Paragraph style={{ margin: 0 }}>{pharmacy.description || 'Chưa có mô tả chi tiết cho nhà thuốc này.'}</Paragraph>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            )
        },
        {
            key: 'inventory',
            label: 'Danh mục thuốc',
            children: (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <MedicineBoxOutlined style={{ fontSize: '48px', color: '#bfbfbf' }} />
                    <div style={{ marginTop: '16px' }}>
                        <Text type="secondary">Tính năng quản lý kho thuốc đang được đồng bộ</Text>
                    </div>
                </div>
            )
        }
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/pharmacies">Nhà thuốc</Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết {pharmacy.name}</Breadcrumb.Item>
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
                            src={pharmacy.thumbnail}
                            icon={<ShopOutlined />}
                            style={{ backgroundColor: '#1890ff' }}
                        />
                        <div>
                            <Space size="small">
                                <Title level={2} style={{ margin: 0 }}>{pharmacy.name}</Title>
                                {pharmacy.isVerified && <SafetyCertificateOutlined style={{ color: '#52c41a', fontSize: '20px' }} />}
                            </Space>
                            <div style={{ marginTop: '4px' }}>
                                <Rate disabled defaultValue={pharmacy.rating || 0} style={{ fontSize: '14px' }} />
                                <Text type="secondary" style={{ marginLeft: '8px' }}>({pharmacy.rating || 0} đánh giá)</Text>
                            </div>
                        </div>
                    </Space>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => router.push(`/partners/pharmacies/${pharmacy.id}/edit`)}
                    >
                        Chỉnh sửa thông tin
                    </Button>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic title="Xếp hạng" value={pharmacy.rating || 0} precision={1} prefix={<StarOutlined />} suffix="/ 5" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Dược sĩ" value={(pharmacy as any).pharmacists || 3} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Sản phẩm" value={450} suffix="+" prefix={<MedicineBoxOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Text type="secondary">Độ xác thực</Text>
                        <div style={{ marginTop: '4px' }}>
                            <Tag color={pharmacy.isVerified ? 'success' : 'warning'}>
                                {pharmacy.isVerified ? 'Đã xác thực' : 'Yêu cầu xác thực'}
                            </Tag>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card variant="borderless">
                <Tabs items={tabItems} />
            </Card>
        </Space>
    );
}
