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
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import bookingService, { RefundRequest } from '@/services/booking.service';

const { Title, Text } = Typography;

export default function RefundsManagement() {
    const [refunds, setRefunds] = useState<RefundRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchRefunds = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await bookingService.getRefundRequests(params);
            setRefunds(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch refund requests', error);
            message.error('Lỗi khi tải danh sách yêu cầu hoàn tiền');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRefunds();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchRefunds();
        }
    }, [searchText]);

    const handleUpdateStatus = async (id: any, status: 'approved' | 'rejected') => {
        try {
            await bookingService.updateRefundRequest(id, { status });
            message.success(status === 'approved' ? 'Đã duyệt yêu cầu' : 'Đã từ chối yêu cầu');
            fetchRefunds();
        } catch (error) {
            message.error('Lỗi khi cập nhật trạng thái');
        }
    };

    const handleDelete = (row: RefundRequest) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa yêu cầu hoàn tiền của "${row.customerName}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await bookingService.deleteRefundRequest(row.id);
                    message.success('Xóa yêu cầu thành công');
                    fetchRefunds();
                } catch (error) {
                    message.error('Lỗi khi xóa yêu cầu');
                }
            },
        });
    };

    const columns = [
        {
            key: 'orderCode',
            label: 'Mã yêu cầu',
            render: (val: string) => <Text code strong>{val}</Text>
        },
        { key: 'customerName', label: 'Khách hàng', render: (val: string) => <Text strong>{val}</Text> },
        { key: 'originalOrder', label: 'Đơn gốc' },
        {
            key: 'amount',
            label: 'Số tiền',
            render: (val: number) => (
                <Text strong type="danger">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}
                </Text>
            )
        },
        { key: 'reason', label: 'Lý do' },
        { key: 'requestDate', label: 'Ngày yêu cầu' },
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
                <Breadcrumb.Item>Quản lý Hoàn tiền</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Hoàn tiền</Title>
                    <Text type="secondary">Xử lý các yêu cầu hoàn trả tiền dịch vụ từ người dùng</Text>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={refunds}
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
                        {row.status === 'pending' && (
                            <>
                                <Tooltip title="Duyệt">
                                    <Button
                                        type="text"
                                        icon={<CheckOutlined style={{ color: '#52c41a' }} />}
                                        onClick={() => handleUpdateStatus(row.id, 'approved')}
                                    />
                                </Tooltip>
                                <Tooltip title="Từ chối">
                                    <Button
                                        type="text"
                                        icon={<CloseOutlined style={{ color: '#ff4d4f' }} />}
                                        onClick={() => handleUpdateStatus(row.id, 'rejected')}
                                    />
                                </Tooltip>
                            </>
                        )}
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
