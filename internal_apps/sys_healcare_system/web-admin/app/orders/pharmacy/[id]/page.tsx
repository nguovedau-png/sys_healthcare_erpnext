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
    Table,
    Divider
} from 'antd';
import {
    ArrowLeftOutlined,
    CheckOutlined,
    CloseOutlined,
    PrinterOutlined,
    ShoppingOutlined,
    EnvironmentOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import bookingService, { PharmacyOrder } from '@/services/booking.service';

const { Title, Text } = Typography;

export default function PharmacyOrderDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [order, setOrder] = useState<PharmacyOrder | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!params.id) return;
            try {
                setLoading(true);
                const data = await bookingService.getPharmacyOrder(parseInt(params.id));
                setOrder(data);
            } catch (error) {
                console.error('Failed to fetch pharmacy order detail', error);
                message.error('Không thể tải thông tin đơn mua thuốc');
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [params.id]);

    const handleAction = (type: 'approve' | 'reject') => {
        const isApprove = type === 'approve';
        Modal.confirm({
            title: isApprove ? 'Xác nhận đơn hàng' : 'Hủy đơn hàng',
            content: `Bạn có chắc chắn muốn ${isApprove ? 'xác nhận' : 'hủy'} đơn hàng này?`,
            okText: isApprove ? 'Xác nhận' : 'Hủy đơn',
            okType: isApprove ? 'primary' : 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await bookingService.updatePharmacyOrder(parseInt(params.id), {
                        status: isApprove ? 'confirmed' : 'cancelled'
                    });
                    message.success(`${isApprove ? 'Xác nhận' : 'Hủy'} đơn hàng thành công`);
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

    if (!order) {
        return (
            <Card>
                <Text type="danger">Không tìm thấy thông tin đơn hàng</Text>
                <br />
                <Button onClick={() => router.back()} type="primary" style={{ marginTop: '16px' }}>Quay lại</Button>
            </Card>
        );
    }

    // Mock items since PharmacyOrder interface only has itemsCount
    const mockItems = [
        { key: '1', name: 'Paracetamol 500mg', quantity: 2, price: 50000, total: 100000 },
        { key: '2', name: 'Vitamin C 1000mg', quantity: 1, price: 150000, total: 150000 },
    ];

    const columns = [
        { title: 'Sản phẩm', dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
        { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Đơn giá', dataIndex: 'price', key: 'price', render: (val: number) => `${val.toLocaleString()} đ` },
        { title: 'Thành tiền', dataIndex: 'total', key: 'total', align: 'right' as const, render: (val: number) => <Text strong>{val.toLocaleString()} đ</Text> },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Đặt lịch</Breadcrumb.Item>
                <Breadcrumb.Item href="/orders/pharmacy">Đơn mua thuốc</Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết #{order.code}</Breadcrumb.Item>
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
                            <Title level={2} style={{ margin: 0 }}>Đơn mua thuốc #{order.code}</Title>
                            <Text type="secondary">Ngày đặt: {new Date(order.createdAt).toLocaleString()}</Text>
                        </div>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        {order.status === 'pending' && (
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
                                    Xác nhận
                                </Button>
                            </>
                        )}
                        <Button icon={<PrinterOutlined />}>In đơn hàng</Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Tổng tiền"
                            value={order.totalAmount}
                            suffix="đ"
                            valueStyle={{ color: '#52c41a' }}
                            prefix={<ShoppingOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Số mặt hàng"
                            value={order.itemsCount}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Text type="secondary">Trạng thái hiện tại</Text>
                        <div style={{ marginTop: '12px' }}>
                            <StatusBadge status={order.status as any} />
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={16}>
                    <Card title="Chi tiết sản phẩm" variant="borderless">
                        <Table
                            dataSource={mockItems}
                            columns={columns}
                            pagination={false}
                            size="middle"
                        />
                        <Divider />
                        <div style={{ float: 'right', width: '300px' }}>
                            <Space orientation="vertical" style={{ width: '100%' }}>
                                <Row justify="space-between"><Col><Text type="secondary">Tạm tính:</Text></Col><Col><Text>250.000 đ</Text></Col></Row>
                                <Row justify="space-between"><Col><Text type="secondary">Phí vận chuyển:</Text></Col><Col><Text>30.000 đ</Text></Col></Row>
                                <Row justify="space-between"><Col><Title level={4} style={{ margin: 0 }}>Tổng cộng:</Title></Col><Col><Title level={4} style={{ margin: 0, color: '#52c41a' }}>{order.totalAmount.toLocaleString()} đ</Title></Col></Row>
                            </Space>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Thông tin giao hàng" variant="borderless" style={{ height: '100%' }}>
                        <Descriptions column={1}>
                            <Descriptions.Item label={<><PhoneOutlined /> Khách hàng</>}>
                                <Space orientation="vertical" size={0}>
                                    <Text strong>{order.customerName}</Text>
                                    <Text type="secondary">{order.customerPhone}</Text>
                                </Space>
                            </Descriptions.Item>
                            <Descriptions.Item label={<><ShoppingOutlined /> Nhà thuốc</>}>
                                <Text strong>{order.pharmacy}</Text>
                            </Descriptions.Item>
                            <Divider style={{ margin: '12px 0' }} />
                            <Descriptions.Item label={<><EnvironmentOutlined /> Địa chỉ</>}>
                                <Text>123 Đường ABC, Quận 1, TP.HCM</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Ghi chú">
                                <Text type="secondary">Giao hàng giờ hành chính</Text>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </Space>
    );
}
