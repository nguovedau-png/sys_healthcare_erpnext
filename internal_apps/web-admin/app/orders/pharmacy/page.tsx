"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import {
    Typography,
    Button,
    Space,
    Breadcrumb,
    Row,
    Col,
    Modal,
    message,
    Tooltip
} from 'antd';
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import bookingService, { PharmacyOrder } from '@/services/booking.service';

const { Title, Text } = Typography;

export default function PharmacyOrdersManagement() {
    const router = useRouter();
    const [orders, setOrders] = useState<PharmacyOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await bookingService.getPharmacyOrders(params);
            setOrders(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch pharmacy orders', error);
            message.error('Lỗi khi tải danh sách đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchOrders();
        }
    }, [searchText]);

    const handleDelete = (row: PharmacyOrder) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa đơn hàng "${row.code}" của khách hàng "${row.customerName}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await bookingService.deletePharmacyOrder(row.id);
                    message.success('Xóa đơn hàng thành công');
                    fetchOrders();
                } catch (error) {
                    message.error('Lỗi khi xóa đơn hàng');
                }
            },
        });
    };

    const columns = [
        {
            key: 'code',
            label: 'Mã đơn',
            render: (val: string) => <Text code strong>{val}</Text>
        },
        {
            key: 'customerName',
            label: 'Khách hàng',
            render: (val: string, row: PharmacyOrder) => (
                <Space orientation="vertical" size={0}>
                    <Text strong>{val}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{row.customerPhone}</Text>
                </Space>
            )
        },
        { key: 'pharmacy', label: 'Nhà thuốc cung cấp' },
        {
            key: 'itemsCount',
            label: 'SL',
            render: (val: number) => <Text strong>{val} món</Text>
        },
        {
            key: 'totalAmount',
            label: 'Tổng tiền',
            render: (val: number) => (
                <Text strong type="success">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}
                </Text>
            )
        },
        { key: 'date', label: 'Ngày đặt' },
        {
            key: 'status',
            label: 'Trạng thái',
            render: (val: string) => <StatusBadge status={val as any} />
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Lịch hẹn & Đơn hàng</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý Đơn thuốc</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Đơn thuốc</Title>
                    <Text type="secondary">Quản lý các đơn thuốc và nhu cầu mua thuốc của người dân</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => router.push('/orders/pharmacy/create')}
                    >
                        Tạo đơn mới
                    </Button>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={orders}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm mã đơn, khách hàng..."
                onSearch={handleSearch}
                pagination={{
                    currentPage: pagination.current,
                    totalPages: Math.ceil(total / pagination.pageSize),
                    pageSize: pagination.pageSize,
                    onPageChange: (page, pageSize) => {
                        setPagination({ current: page, pageSize: pageSize || 10 });
                    }
                }}
                actions={(row) => (
                    <Space size="small">
                        <Tooltip title="Xem chi tiết">
                            <Button
                                type="text"
                                icon={<EyeOutlined style={{ color: '#1890ff' }} />}
                                onClick={() => router.push(`/orders/pharmacy/${row.id}`)}
                            />
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <Button
                                type="text"
                                icon={<EditOutlined style={{ color: '#52c41a' }} />}
                                onClick={() => router.push(`/orders/pharmacy/${row.id}/edit`)}
                            />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(row)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
