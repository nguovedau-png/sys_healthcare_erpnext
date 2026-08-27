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
    Modal,
    message,
    Spin,
    Image,
    Tag,
    Alert
} from 'antd';
import {
    ArrowLeftOutlined,
    CheckOutlined,
    CloseOutlined,
    DollarOutlined,
    BankOutlined,
    FileImageOutlined,
    SolutionOutlined
} from '@ant-design/icons';
import bookingService, { RefundRequest } from '@/services/booking.service';

const { Title, Text } = Typography;

export default function RefundDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [refund, setRefund] = useState<RefundRequest | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!params.id) return;
            try {
                setLoading(true);
                const data = await bookingService.getRefundRequest(parseInt(params.id));
                setRefund(data);
            } catch (error) {
                console.error('Failed to fetch refund request detail', error);
                message.error('Không thể tải thông tin yêu cầu hoàn tiền');
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [params.id]);

    const handleAction = (type: 'approve' | 'reject') => {
        const isApprove = type === 'approve';
        Modal.confirm({
            title: isApprove ? 'Duyệt hoàn tiền' : 'Từ chối yêu cầu',
            content: `Bạn có chắc chắn muốn ${isApprove ? 'duyệt' : 'từ chối'} yêu cầu hoàn tiền này?`,
            okText: isApprove ? 'Duyệt' : 'Từ chối',
            okType: isApprove ? 'primary' : 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await bookingService.updateRefundRequest(parseInt(params.id), {
                        status: isApprove ? 'approved' : 'rejected'
                    });
                    message.success(`${isApprove ? 'Duyệt' : 'Từ chối'} hoàn tiền thành công`);
                    router.refresh();
                } catch (error) {
                    message.error('Thao tác thất bại');
                }
            },
        });
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải thông tin..." />
            </div>
        );
    }

    if (!refund) {
        return (
            <Card>
                <Text type="danger">Không tìm thấy thông tin yêu cầu hoàn tiền</Text>
                <br />
                <Button onClick={() => router.back()} type="primary" style={{ marginTop: '16px' }}>Quay lại</Button>
            </Card>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Đặt lịch</Breadcrumb.Item>
                <Breadcrumb.Item href="/orders/refunds">Yêu cầu hoàn tiền</Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết #{refund.orderCode}</Breadcrumb.Item>
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
                            <Title level={2} style={{ margin: 0 }}>Yêu cầu hoàn tiền #{refund.orderCode}</Title>
                            <Text type="secondary">Ngày yêu cầu: {new Date(refund.createdAt).toLocaleString()}</Text>
                        </div>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        {refund.status === 'pending' && (
                            <>
                                <Button
                                    danger
                                    icon={<CloseOutlined />}
                                    onClick={() => handleAction('reject')}
                                >
                                    Từ chối
                                </Button>
                                <Button
                                    type="primary"
                                    icon={<CheckOutlined />}
                                    onClick={() => handleAction('approve')}
                                >
                                    Duyệt hoàn tiền
                                </Button>
                            </>
                        )}
                    </Space>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Số tiền hoàn"
                            value={refund.amount}
                            suffix="đ"
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<DollarOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Đơn hàng gốc"
                            value={refund.orderCode}
                            formatter={(val) => <Text code>{val}</Text>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Text type="secondary">Trạng thái hiện tại</Text>
                        <div style={{ marginTop: '12px' }}>
                            <StatusBadge status={refund.status as any} />
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card title="Thông tin khách hàng & Lý do" variant="outlined">
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Khách hàng">
                        <Text strong>{refund.customerName}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Lý do hoàn tiền">
                        <Tag color="red">{refund.reason}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Mô tả chi tiết">
                        {refund.reason || 'Không có mô tả bổ sung'}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Card title="Hình ảnh minh chứng" variant="outlined">
                <Space size="large" wrap>
                    <Image.PreviewGroup>
                        {[1, 2].map((idx) => (
                            <Image
                                key={idx}
                                width={200}
                                height={200}
                                src={`https://via.placeholder.com/200?text=Evidence+${idx}`}
                                fallback="https://via.placeholder.com/200?text=No+Image"
                                style={{ borderRadius: '8px', objectFit: 'cover' }}
                            />
                        ))}
                    </Image.PreviewGroup>
                </Space>
            </Card>

            <Card title="Thông tin nhận tiền" variant="outlined">
                <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                    <Descriptions.Item label={<><BankOutlined /> Ngân hàng</>}>
                        <Text strong>Vietcombank</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<><SolutionOutlined /> Số tài khoản</>}>
                        <Text copyable>1234567890</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Chủ tài khoản" span={2}>
                        <Text strong>{refund.customerName?.toUpperCase()}</Text>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </Space>
    );
}
