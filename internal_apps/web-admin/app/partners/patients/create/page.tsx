"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Typography,
    Space,
    Breadcrumb,
    Card,
    Button,
    message
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import partnerService from '@/services/partner.service';
import FormBuilder from '@/components/admin/FormBuilder';

const { Title, Text } = Typography;

export default function CreatePatient() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const fields = [
        { name: 'name', label: 'Họ và tên', type: 'text' as const, required: true, placeholder: 'VD: Nguyễn Văn A' },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true, placeholder: '090...' },
        { name: 'email', label: 'Email', type: 'email' as const, required: true, placeholder: 'patient@email.com' },
        { name: 'dob', label: 'Ngày sinh', type: 'date' as const, required: true },
        {
            name: 'gender',
            label: 'Giới tính',
            type: 'select' as const,
            required: true,
            options: [
                { value: 'Nam', label: 'Nam' },
                { value: 'Nữ', label: 'Nữ' },
                { value: 'Khác', label: 'Khác' },
            ]
        },
        {
            name: 'address',
            label: 'Địa chỉ thường trú',
            type: 'textarea' as const,
            required: true,
            rows: 3,
            colSpan: 24
        },
        {
            name: 'medicalHistory',
            label: 'Tiền sử bệnh lý',
            type: 'textarea' as const,
            rows: 4,
            colSpan: 24,
            placeholder: 'Ghi chú các bệnh nền, dị ứng thuốc...'
        },
    ];

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            await partnerService.createPatient(data);
            message.success('Tạo hồ sơ bệnh nhân thành công!');
            router.push('/partners/patients');
        } catch (error: any) {
            message.error('Lỗi: ' + (error.message || 'Không thể tạo hồ sơ bệnh nhân'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/patients">Bệnh nhân</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Thêm Bệnh nhân mới</Title>
                    <Text type="secondary">Khởi tạo hồ sơ quản lý sức khỏe cho bệnh nhân</Text>
                </div>
            </Space>

            <Card variant="outlined">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Tạo hồ sơ bệnh nhân"
                    loading={loading}
                    columns={2}
                />
            </Card>
        </Space>
    );
}
