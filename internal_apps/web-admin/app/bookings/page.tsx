'use client';

import React, { useState } from 'react';
import DataTable from '@/components/common/DataTable';
import { Tag, Dropdown, Button, Modal, message } from 'antd';
import {
    MoreOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    EyeOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import bookingService, { type Appointment } from '@/services/booking.service';
import dayjs from 'dayjs';


export default function BookingsPage() {
    const [reloadKey, setReloadKey] = useState(0);

    const handleAction = async (key: string, record: Appointment) => {
        if (key === 'approve') {
            try {
                await bookingService.updateAppointment(record.id, { status: 'CONFIRMED' });
                message.success('Đã xác nhận lịch hẹn');
                setReloadKey(prev => prev + 1);
            } catch {
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
                    } catch {
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
            render: (text: string) => text || 'Khách vãng lai'
        },
        {
            title: 'Bác sĩ / Dịch vụ',
            key: 'service',
            render: (_value: unknown, record: Appointment) => (
                <div className="flex flex-col">
                    <span className="font-medium">{record.doctorName || 'Chưa chỉ định'}</span>
                    <span className="text-xs text-gray-500">{record.service}</span>
                </div>
            )
        },
        {
            title: 'Thời gian',
            key: 'time',
            render: (_value: unknown, record: Appointment) => (
                <div className="flex flex-col">
                    <span className="font-medium">{record.time}</span>
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
            render: (_value: unknown, record: Appointment) => (
                <Dropdown
                    menu={{
                        onClick: ({ key }) => handleAction(key, record),
                        items: [
                            { key: 'view', icon: <EyeOutlined />, label: 'Xem chi tiết' },
                            ...(record.status === 'PENDING' ? [
                                { key: 'approve', icon: <CheckCircleOutlined />, label: 'Xác nhận', className: 'text-green-600' },
                                { key: 'reject', icon: <CloseCircleOutlined />, label: 'Hủy lịch', className: 'text-red-500' },
                            ] : []),
                        ],
                    }}
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

            <DataTable<Appointment>
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
                        total: res.meta?.total ?? res.data.length
                    };
                }}
                title="Danh sách lịch hẹn"
                searchPlaceholder="Tìm kiếm theo tên bệnh nhân..."
            />
        </div>
    );
}
