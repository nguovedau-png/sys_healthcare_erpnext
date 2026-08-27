'use client';

import React, { useState } from 'react';
import DataTable from '@/components/common/DataTable';
import { Tag, Menu, Dropdown, Button, Modal, message, Space, DatePicker } from 'antd';
import {
    MoreOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    EyeOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import bookingService from '@/services/booking.service';
import dayjs from 'dayjs';

interface AppointmentType {
    id: number;
    patientName: string; // aggregated
    doctorName?: string; // aggregated
    serviceName?: string;
    date: string;
    startTime: string;
    status: string;
    type: string;
}

export default function BookingsPage() {
    const [reloadKey, setReloadKey] = useState(0);

    const handleAction = async (key: string, record: AppointmentType) => {
        if (key === 'approve') {
            try {
                await bookingService.updateAppointment(record.id, { status: 'CONFIRMED' });
                message.success('Đã xác nhận lịch hẹn');
                setReloadKey(prev => prev + 1);
            } catch (error) {
                message.error('Lỗi khi cập nhật trạng thái');
            }
        } else if (key === 'reject') {
            Modal.confirm({
                title: 'Hủy lịch hẹn',
                content: 'Bạn có chắc chắn muốn hủy lịch hẹn này?',
                okText: 'Hủy lịch',
                okType: 'danger',
                cancelText: 'Quay lại',
                onOk: async () => {
                    try {
                        await bookingService.updateAppointment(record.id, { status: 'CANCELLED' });
                        message.success('Đã hủy lịch hẹn');
                        setReloadKey(prev => prev + 1);
                    } catch (error) {
                        message.error('Lỗi khi hủy lịch');
                    }
                }
            });
        }
    };

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (text: string) => <span className="font-mono text-gray-500">#{text}</span>
        },
        {
            title: 'Bệnh nhân',
            dataIndex: 'patientName', // We might need to map 'patientInfo' from backend
            key: 'patientName',
            render: (text: string, record: any) => record.patientInfo?.fullName || 'Khách vãng lai'
        },
        {
            title: 'Bác sĩ / Dịch vụ',
            key: 'service',
            render: (_: any, record: any) => (
                <div className="flex flex-col">
                    <span className="font-medium">{record.doctor?.name || 'Chưa chỉ định'}</span>
                    <span className="text-xs text-gray-500">{record.service?.name}</span>
                </div>
            )
        },
        {
            title: 'Thời gian',
            key: 'time',
            render: (_: any, record: any) => (
                <div className="flex flex-col">
                    <span className="font-medium">{record.startTime}</span>
                    <span className="text-xs text-gray-500">{dayjs(record.date).format('DD/MM/YYYY')}</span>
                </div>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'default';
                let text = status;
                switch (status) {
                    case 'CONFIRMED': color = 'success'; text = 'Đã xác nhận'; break;
                    case 'PENDING': color = 'warning'; text = 'Chờ xử lý'; break;
                    case 'CANCELLED': color = 'error'; text = 'Đã hủy'; break;
                    case 'COMPLETED': color = 'blue'; text = 'Hoàn thành'; break;
                }
                return <Tag color={color}>{text}</Tag>;
            }
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: AppointmentType) => (
                <Dropdown
                    overlay={
                        <Menu onClick={({ key }) => handleAction(key, record)}>
                            <Menu.Item key="view" icon={<EyeOutlined />}>Xem chi tiết</Menu.Item>
                            {record.status === 'PENDING' && (
                                <>
                                    <Menu.Item key="approve" icon={<CheckCircleOutlined />} className="text-green-600">Xác nhận</Menu.Item>
                                    <Menu.Item key="reject" icon={<CloseCircleOutlined />} className="text-red-500">Hủy lịch</Menu.Item>
                                </>
                            )}
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
            )
        }
    ];

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Lịch hẹn</h1>
                    <p className="text-gray-500">Theo dõi và xử lý các yêu cầu đặt lịch khám</p>
                </div>
                <Button type="primary" icon={<CalendarOutlined />}>Lịch làm việc</Button>
            </div>

            <DataTable
                key={reloadKey}
                columns={columns}
                fetchData={async (params) => {
                    const res = await bookingService.getAppointments({
                        page: params.page,
                        limit: params.limit,
                        search: params.search,
                        // We can add filters here
                    });
                    // Flatten or map data if structure is nested
                    return {
                        data: res.data,
                        total: res.total
                    };
                }}
                title="Danh sách lịch hẹn"
                searchPlaceholder="Tìm kiếm theo tên bệnh nhân..."
            />
        </div>
    );
}
