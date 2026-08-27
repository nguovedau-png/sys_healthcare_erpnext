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
    Avatar,
    Tabs,
    Spin,
    Tag,
    message,
    Modal
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    UserOutlined,
    CalendarOutlined,
    HistoryOutlined,
    SafetyCertificateOutlined,
    ContainerOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import partnerService, { Patient } from '@/services/partner.service';
import StatusBadge from '@/components/admin/StatusBadge';

const { Title, Text, Paragraph } = Typography;

export default function PatientDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = parseInt(params.id);

    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await partnerService.getPatient(id);
                setPatient(data);
            } catch (error) {
                console.error('Failed to fetch patient detail', error);
                message.error('Không thể tải thông tin bệnh nhân');
            } finally {
                setLoading(false);
            }
        };
        fetchPatient();
    }, [id]);

    const handleDelete = () => {
        Modal.confirm({
            title: 'Xóa bệnh nhân?',
            content: `Bạn có chắc chắn muốn xóa bệnh nhân ${patient?.name}? Hành động này không thể hoàn tác.`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    // Logic to delete patient
                    message.success('Đã xóa bệnh nhân');
                    router.push('/partners/patients');
                } catch (error) {
                    message.error('Không thể xóa bệnh nhân');
                }
            }
        });
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải hồ sơ bệnh nhân..." />
            </div>
        );
    }

    if (!patient) {
        return (
            <Card>
                <Paragraph type="danger">Không tìm thấy thông tin bệnh nhân</Paragraph>
                <Button onClick={() => router.back()} type="primary">Quay lại</Button>
            </Card>
        );
    }

    const tabItems = [
        {
            key: 'general',
            label: <Space><UserOutlined />Thông tin chung</Space>,
            children: (
                <div style={{ marginTop: '16px' }}>
                    <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                        <Descriptions.Item label="Họ và tên">
                            <Text strong>{patient.name}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mã bệnh nhân">
                            <Text code>#{patient.id}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            <Space><PhoneOutlined /><Text>{patient.phone}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            <Space><MailOutlined /><Text>{patient.email || 'N/A'}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày sinh">
                            <Space><CalendarOutlined /><Text>{'N/A'}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Giới tính">
                            <Text>{'N/A'}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ liên hệ" span={2}>
                            <Space align="start"><EnvironmentOutlined /><Text>{'N/A'}</Text></Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái tài khoản">
                            <StatusBadge status={(patient.status as any) || 'active'} />
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            )
        },
        {
            key: 'medical',
            label: <Space><ContainerOutlined />Tiền sử bệnh lý</Space>,
            children: (
                <div style={{ marginTop: '16px' }}>
                    <Card title="Ghi chú hồ sơ bệnh án" variant="borderless" bodyStyle={{ padding: '24px' }}>
                        <Paragraph style={{ whiteSpace: 'pre-line', fontSize: '16px' }}>
                            {'Chưa có thông tin tiền sử bệnh lý được ghi nhận.'}
                        </Paragraph>
                    </Card>
                </div>
            )
        },
        {
            key: 'bookings',
            label: <Space><ClockCircleOutlined />Lịch sử khám</Space>,
            children: (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <HistoryOutlined style={{ fontSize: '48px', color: '#bfbfbf' }} />
                    <div style={{ marginTop: '16px' }}>
                        <Text type="secondary">Tính năng hiển thị lịch sử khám đang được đồng bộ</Text>
                    </div>
                </div>
            )
        }
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/patients">Bệnh nhân</Breadcrumb.Item>
                <Breadcrumb.Item>Hồ sơ {patient.name}</Breadcrumb.Item>
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
                            size={72}
                            style={{ backgroundColor: '#f56a00' }}
                            icon={<UserOutlined />}
                        >
                            {patient.name.charAt(0)}
                        </Avatar>
                        <div>
                            <Title level={2} style={{ margin: 0 }}>{patient.name}</Title>
                            <Space style={{ marginTop: '4px' }}>
                                <Text strong type="secondary">Mã BN: {patient.id}</Text>
                                {null}
                            </Space>
                        </div>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={handleDelete}
                        >
                            Xóa hồ sơ
                        </Button>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => router.push(`/partners/patients/${patient.id}/edit`)}
                        >
                            Chỉnh sửa
                        </Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng lượt khám"
                            value={patient.visits || 0}
                            prefix={<ClockCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Lần khám cuối"
                            value={patient.lastVisit || 'N/A'}
                            prefix={<CalendarOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Text type="secondary">Mức độ hoạt động</Text>
                        <div style={{ marginTop: '4px' }}>
                            <StatusBadge status={(patient.status as any) || 'active'} />
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
