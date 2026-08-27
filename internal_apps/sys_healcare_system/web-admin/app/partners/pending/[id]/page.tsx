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
    Row,
    Col,
    Tag,
    message,
    Modal,
    Divider,
    List
} from 'antd';
import {
    ArrowLeftOutlined,
    CheckOutlined,
    CloseOutlined,
    InfoCircleOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    FilePdfOutlined,
    DownloadOutlined,
    SafetyCertificateOutlined,
    QuestionCircleOutlined,
    AuditOutlined
} from '@ant-design/icons';
import partnerService from '@/services/partner.service';
import StatusBadge from '@/components/admin/StatusBadge';

const { Title, Text, Paragraph } = Typography;

export default function PendingPartnerDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const id = parseInt(params.id);

    // Mocking data since specific detail service might not be fully implemented as expected
    // but structure it for future API integration
    const request = {
        id: params.id,
        name: 'Phòng khám Đa khoa Quốc tế',
        type: 'Clinic',
        representative: 'Dr. John Doe',
        phone: '0987654321',
        email: 'contact@pkqa.vn',
        address: '123 Nguyễn Văn Cừ, Q.5, TP.HCM',
        licenseNumber: '012345/BYT-GPHĐ',
        licenseDate: '2023-01-01',
        documents: [
            { name: 'Giấy phép kinh doanh.pdf', url: '#', size: '2.4 MB' },
            { name: 'Chứng chỉ hành nghề.pdf', url: '#', size: '1.8 MB' },
            { name: 'Hợp đồng hợp tác.pdf', url: '#', size: '3.1 MB' }
        ],
        submissionDate: '18/12/2024',
        status: 'pending'
    };

    const handleApprove = () => {
        Modal.confirm({
            title: 'Phê duyệt đối tác này?',
            icon: <CheckOutlined style={{ color: '#52c41a' }} />,
            content: `Sau khi phê duyệt, "${request.name}" sẽ chính thức hoạt động trên hệ thống.`,
            okText: 'Phê duyệt ngay',
            okType: 'primary',
            cancelText: 'Hủy',
            onOk: () => {
                message.success('Đã phê duyệt đối tác');
                router.push('/partners/pending');
            }
        });
    };

    const handleReject = () => {
        Modal.confirm({
            title: 'Từ chối hồ sơ đối tác?',
            icon: <QuestionCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: 'Vui lòng cung cấp lý do từ chối để đối tác có thể cập nhật lại.',
            // In a real app, this might be a more complex modal with a textarea
            okText: 'Xác nhận từ chối',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => {
                message.success('Đã từ chối hồ sơ đối tác');
                router.push('/partners/pending');
            }
        });
    };

    const handleRequestMore = () => {
        message.info('Đã gửi yêu cầu bổ sung thông tin cho đối tác');
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/pending">Đối tác chờ duyệt</Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết hồ sơ #{id}</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space size="middle">
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => router.back()}
                            type="text"
                        />
                        <div>
                            <Title level={2} style={{ margin: 0 }}>Thẩm định hồ sơ đối tác</Title>
                            <Space split={<Divider type="vertical" />}>
                                <Text type="secondary">ID yêu cầu: {request.id}</Text>
                                <Text type="secondary">Ngày nộp: {request.submissionDate}</Text>
                                <StatusBadge status="pending" />
                            </Space>
                        </div>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        <Button
                            icon={<InfoCircleOutlined />}
                            onClick={handleRequestMore}
                        >
                            Yêu cầu bổ sung
                        </Button>
                        <Button
                            danger
                            icon={<CloseOutlined />}
                            onClick={handleReject}
                        >
                            Từ chối
                        </Button>
                        <Button
                            type="primary"
                            icon={<CheckOutlined />}
                            onClick={handleApprove}
                        >
                            Phê duyệt hồ sơ
                        </Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col lg={16} md={24} sm={24} xs={24}>
                    <Card title={<Space><AuditOutlined />Thông tin doanh nghiệp</Space>} style={{ height: '100%' }}>
                        <Descriptions bordered column={2}>
                            <Descriptions.Item label="Tên đối tác" span={2}>
                                <Text strong style={{ fontSize: '16px' }}>{request.name}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Loại hình">
                                <Tag color="blue">{request.type}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Số giấy phép">
                                <Text code>{request.licenseNumber}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Người đại diện">
                                {request.representative}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày cấp phép">
                                {request.licenseDate}
                            </Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ hoạt động" span={2}>
                                <Space align="start">
                                    <EnvironmentOutlined style={{ color: '#bfbfbf', marginTop: '4px' }} />
                                    {request.address}
                                </Space>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col lg={8} md={24} sm={24} xs={24}>
                    <Card title={<Space><PhoneOutlined />Thông tin liên hệ</Space>} style={{ height: '100%' }}>
                        <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                            <div>
                                <Text type="secondary" style={{ display: 'block' }}>Số điện thoại liên lạc</Text>
                                <Text strong style={{ fontSize: '18px' }} copyable>{request.phone}</Text>
                            </div>
                            <div>
                                <Text type="secondary" style={{ display: 'block' }}>Thư điện tử (Email)</Text>
                                <Text strong copyable>{request.email}</Text>
                            </div>
                            <Divider style={{ margin: '12px 0' }} />
                            <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
                                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                                    <InfoCircleOutlined style={{ marginRight: '8px' }} />
                                    Lưu ý: Cần xác minh số điện thoại và email trước khi phê duyệt hồ sơ.
                                </Paragraph>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Card title={<Space><FilePdfOutlined />Hồ sơ tài liệu đính kèm</Space>}>
                <List
                    grid={{ gutter: 16, xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
                    dataSource={request.documents}
                    renderItem={(item) => (
                        <List.Item>
                            <Card hoverable size="small" bodyStyle={{ padding: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Space>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: '#fff1f0',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <FilePdfOutlined style={{ fontSize: '20px', color: '#ff4d4f' }} />
                                        </div>
                                        <div>
                                            <Text strong style={{ maxWidth: '180px', display: 'block' }} ellipsis>{item.name}</Text>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>{item.size}</Text>
                                        </div>
                                    </Space>
                                    <Button type="text" icon={<DownloadOutlined />} />
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>
        </Space>
    );
}
