"use client";

import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter, useParams } from 'next/navigation';
import {
    Typography,
    Space,
    Breadcrumb,
    Card,
    Button,
    message
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function EditAppointment() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const initialValues = {
        patientId: '1',
        serviceType: 'offline',
        specialty: 'cardiology',
        doctorId: 'dr_minh',
        appointmentDate: '2024-12-20',
        appointmentTime: '08:30',
        symptoms: 'Đau ngực, khó thở nhẹ',
        status: 'confirmed'
    };

    const fields = [
        {
            name: 'patientId', label: 'Bệnh nhân', type: 'select' as const, disabled: true, options: [
                { value: '1', label: 'Nguyễn Văn A' }
            ]
        },
        {
            name: 'serviceType', label: 'Loại dịch vụ', type: 'select' as const, required: true, options: [
                { value: 'offline', label: 'Khám tại viện' },
                { value: 'online', label: 'Tư vấn trực tuyến' },
                { value: 'home', label: 'Khám tại nhà' }
            ]
        },
        {
            name: 'specialty', label: 'Chuyên khoa', type: 'select' as const, required: true, options: [
                { value: 'general', label: 'Đa khoa' },
                { value: 'cardiology', label: 'Tim mạch' },
                { value: 'dermatology', label: 'Da liễu' }
            ]
        },
        {
            name: 'doctorId', label: 'Bác sĩ', type: 'select' as const, required: true, options: [
                { value: 'dr_minh', label: 'BS. Nguyễn Minh' },
                { value: 'dr_hoa', label: 'BS. Lê Thị Hoa' }
            ]
        },
        { name: 'appointmentDate', label: 'Ngày khám', type: 'date' as const, required: true },
        {
            name: 'appointmentTime', label: 'Giờ khám', type: 'select' as const, required: true, options: [
                { value: '08:00', label: '08:00' },
                { value: '08:30', label: '08:30' },
                { value: '09:00', label: '09:00' }
            ]
        },
        { name: 'symptoms', label: 'Triệu chứng', type: 'textarea' as const, rows: 2 },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'pending', label: 'Chờ xác nhận' },
                { value: 'confirmed', label: 'Đã xác nhận' },
                { value: 'completed', label: 'Hoàn thành' },
                { value: 'cancelled', label: 'Đã hủy' }
            ]
        }
    ];

    const handleSubmit = (data: any) => {
        console.log('Updating appointment:', data);
        message.success('Cập nhật lịch khám thành công!');
        router.push(`/orders/appointments/${params.id}`);
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Đặt lịch</Breadcrumb.Item>
                <Breadcrumb.Item href="/orders/appointments">Lịch hẹn bệnh viện</Breadcrumb.Item>
                <Breadcrumb.Item href={`/orders/appointments/${params.id}`}>Chi tiết #{params.id}</Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Chỉnh sửa lịch khám</Title>
                    <Text type="secondary">Cập nhật thông tin lịch hẹn cho bệnh nhân</Text>
                </div>
            </Space>

            <Card variant="outlined">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu thay đổi"
                    initialValues={initialValues}
                    columns={2}
                />
            </Card>
        </Space>
    );
}
