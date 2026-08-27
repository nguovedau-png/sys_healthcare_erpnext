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
    Divider,
    Tag,
    message
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    CalendarOutlined,
    TeamOutlined
} from '@ant-design/icons';
import partnerService, { Doctor } from '@/services/partner.service';

const { Title, Text, Paragraph } = Typography;

export default function ViewDoctor() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctor = async () => {
            if (!params.id) return;
            try {
                setLoading(true);
                const data = await partnerService.getDoctor(parseInt(params.id));
                setDoctor(data);
            } catch (error) {
                console.error('Failed to fetch doctor', error);
                message.error('Không thể tải thông tin bác sĩ');
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [params.id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải thông tin..." />
            </div>
        );
    }

    if (!doctor) {
        return (
            <Card>
                <Paragraph type="danger">Không tìm thấy thông tin bác sĩ</Paragraph>
                <Button onClick={() => router.back()} type="primary">Quay lại</Button>
            </Card>
        );
    }

    const tabItems = [
        {
            key: 'overview',
            label: 'Tổng quan hồ sơ',
            children: (
                <div style={{ marginTop: '16px' }}>
                    <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item label="Họ và tên">
                            <Text strong>{doctor.name}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Chuyên khoa">
                            <Tag color="cyan">{doctor.specialty}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Bệnh viện / Cơ sở">
                            <Text>{doctor.hospital || 'Đang cập nhật'}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            <Space><PhoneOutlined /><Text>{doctor.phone}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            <Space><MailOutlined /><Text>{doctor.email || 'Chưa cập nhật'}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái xác thực">
                            {doctor.isVerified ? (
                                <Tag icon={<SafetyCertificateOutlined />} color="success">Đã xác thực</Tag>
                            ) : (
                                <Tag color="default">Chưa xác thực</Tag>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giới thiệu chuyên môn" span={2}>
                            <Paragraph style={{ margin: 0 }}>{doctor.description || 'Chưa có thông tin giới thiệu chi tiết'}</Paragraph>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            )
        },
        {
            key: 'schedule',
            label: 'Lịch làm việc',
            children: (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <CalendarOutlined style={{ fontSize: '48px', color: '#bfbfbf' }} />
                    <div style={{ marginTop: '16px' }}>
                        <Text type="secondary">Tính năng hiển thị lịch làm việc đang được phát triển</Text>
                    </div>
                </div>
            )
        },
        {
            key: 'patients',
            label: 'Bệnh nhân & Đánh giá',
            children: (
                <div style={{ marginTop: '16px' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card variant="outlined" bodyStyle={{ padding: '24px' }}>
                                <Statistic title="Bệnh nhân đã khám" value={150} prefix={<TeamOutlined />} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card variant="outlined" bodyStyle={{ padding: '24px' }}>
                                <Statistic title="Đánh giá trung bình" value={doctor.rating || 0} suffix="/ 5" />
                                <Rate disabled defaultValue={doctor.rating || 0} style={{ fontSize: '14px' }} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/doctors">Bác sĩ</Breadcrumb.Item>
                <Breadcrumb.Item>Hồ sơ {doctor.name}</Breadcrumb.Item>
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
                            size={80}
                            src={doctor.image}
                            icon={<UserOutlined />}
                            style={{ backgroundColor: '#1890ff' }}
                        >
                            {doctor.name.charAt(0)}
                        </Avatar>
                        <div>
                            <Space size="small">
                                <Title level={2} style={{ margin: 0 }}>Bs. {doctor.name}</Title>
                                {doctor.isVerified && <SafetyCertificateOutlined style={{ color: '#52c41a', fontSize: '20px' }} title="Bác sĩ đã xác thực" />}
                            </Space>
                            <div style={{ marginTop: '4px' }}>
                                <Text strong type="secondary">{doctor.specialty}</Text>
                                <Divider type="vertical" />
                                <Text type="secondary">{doctor.hospital || 'Tự do'}</Text>
                            </div>
                        </div>
                    </Space>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => router.push(`/partners/doctors/${doctor.id}/edit`)}
                    >
                        Chỉnh sửa hồ sơ
                    </Button>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Số lượng bệnh nhân"
                            value={150}
                            prefix={<TeamOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Đánh giá"
                            value={doctor.rating || 0}
                            suffix="/ 5"
                            precision={1}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Text type="secondary">Độ tin cậy</Text>
                        <div style={{ marginTop: '4px' }}>
                            <Tag color={doctor.isVerified ? 'success' : 'warning'} style={{ margin: 0 }}>
                                {doctor.isVerified ? 'Đã xác thực' : 'Yêu cầu xác thực'}
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
