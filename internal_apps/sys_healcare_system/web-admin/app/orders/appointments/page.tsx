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
    CalendarOutlined,
    PlusOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import bookingService, { Appointment } from '@/services/booking.service';

const { Title, Text } = Typography;

export default function AppointmentsManagement() {
    const router = useRouter();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await bookingService.getAppointments(params);
            setAppointments(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch appointments', error);
            message.error('Lỗi khi tải danh sách lịch hẹn');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchAppointments();
        }
    }, [searchText]);

    const handleDelete = (row: Appointment) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa lịch hẹn của bệnh nhân "${row.patientName}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await bookingService.deleteAppointment(row.id);
                    message.success('Xóa lịch hẹn thành công');
                    fetchAppointments();
                } catch (error) {
                    message.error('Lỗi khi xóa lịch hẹn');
                }
            },
        });
    };

    const columns = [
        {
            key: 'patientName',
            label: 'Bệnh nhân',
            render: (val: string, row: Appointment) => (
                <Space orientation="vertical" size={0}>
                    <Text strong>{val}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{row.patientPhone}</Text>
                </Space>
            )
        },
        {
            key: 'doctorName',
            label: 'Bác sĩ',
            render: (val: string) => <Text strong style={{ color: '#1890ff' }}>{val}</Text>
        },
        {
            key: 'date',
            label: 'Thời gian',
            render: (val: string, row: Appointment) => (
                <Space orientation="vertical" size={0}>
                    <Text strong>{val}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{row.time}</Text>
                </Space>
            )
        },
        { key: 'service', label: 'Dịch vụ' },
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
                <Breadcrumb.Item>Đặt lịch khám</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Đặt lịch khám</Title>
                    <Text type="secondary">Quản lý và điều phối lịch hẹn khám bệnh của người dân</Text>
                </Col>
                <Col>
                    <Space>
                        <Button
                            icon={<CalendarOutlined />}
                            onClick={() => router.push('/orders/appointments/calendar')}
                        >
                            Xem Lịch
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => router.push('/orders/appointments/create')}
                        >
                            Đặt lịch mới
                        </Button>
                    </Space>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={appointments}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm bệnh nhân, bác sĩ..."
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
                                onClick={() => router.push(`/orders/appointments/${row.id}`)}
                            />
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <Button
                                type="text"
                                icon={<EditOutlined style={{ color: '#52c41a' }} />}
                                onClick={() => router.push(`/orders/appointments/${row.id}/edit`)}
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
