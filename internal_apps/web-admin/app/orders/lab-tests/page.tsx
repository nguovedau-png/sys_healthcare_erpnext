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
    FileTextOutlined,
    DeleteOutlined,
    PlusOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import bookingService, { LabTest } from '@/services/booking.service';

const { Title, Text } = Typography;

export default function LabTestsManagement() {
    const router = useRouter();
    const [labTests, setLabTests] = useState<LabTest[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchLabTests = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await bookingService.getLabTests(params);
            setLabTests(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch lab tests', error);
            message.error('Lỗi khi tải danh sách hồ sơ xét nghiệm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLabTests();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchLabTests();
        }
    }, [searchText]);

    const handleDelete = (row: LabTest) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa hồ sơ xét nghiệm "${row.orderCode}" của bệnh nhân "${row.patientName}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await bookingService.deleteLabTest(row.id);
                    message.success('Xóa hồ sơ thành công');
                    fetchLabTests();
                } catch (error) {
                    message.error('Lỗi khi xóa hồ sơ');
                }
            },
        });
    };

    const columns = [
        {
            key: 'orderCode',
            label: 'Mã hồ sơ',
            render: (val: string) => <Text code strong>{val}</Text>
        },
        {
            key: 'patientName',
            label: 'Bệnh nhân',
            render: (val: string, row: LabTest) => (
                <Space orientation="vertical" size={0}>
                    <Text strong>{val}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{row.patientPhone}</Text>
                </Space>
            )
        },
        { key: 'testType', label: 'Loại xét nghiệm' },
        { key: 'hospital', label: 'Đơn vị thực hiện' },
        {
            key: 'fee',
            label: 'Phí dịch vụ',
            render: (val: number) => (
                <Text strong type="success">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)}
                </Text>
            )
        },
        { key: 'testDate', label: 'Ngày thực hiện' },
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
                <Breadcrumb.Item>Quản lý Xét nghiệm</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Xét nghiệm</Title>
                    <Text type="secondary">Quản lý hồ sơ và kết quả xét nghiệm của người dân</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => router.push('/orders/lab-tests/create')}
                    >
                        Đặt lịch xét nghiệm
                    </Button>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={labTests}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm mã hồ sơ, bệnh nhân..."
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
                                onClick={() => router.push(`/orders/lab-tests/${row.id}`)}
                            />
                        </Tooltip>
                        <Tooltip title="Cập nhật kết quả">
                            <Button
                                type="text"
                                icon={<FileTextOutlined style={{ color: '#52c41a' }} />}
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
