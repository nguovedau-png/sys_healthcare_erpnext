"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Typography,
    Space,
    Breadcrumb,
    Card,
    Button,
    message,
    Spin
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import partnerService, { Patient } from '@/services/partner.service';
import FormBuilder from '@/components/admin/FormBuilder';

const { Title, Text } = Typography;

export default function EditPatient() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = parseInt(params.id);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                setLoading(true);
                const data = await partnerService.getPatient(id);
                setInitialValues(data);
            } catch (error) {
                console.error('Failed to fetch patient detail', error);
                message.error('Không thể tải hồ sơ bệnh nhân');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPatient();
    }, [id]);

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
            rows: 6,
            colSpan: 24,
            placeholder: 'Ghi chú các bệnh nền, dị ứng thuốc...'
        },
        {
            name: 'status',
            label: 'Trạng thái hồ sơ',
            type: 'select' as const,
            options: [
                { value: 'active', label: 'Đang điều trị (Hoạt động)' },
                { value: 'inactive', label: 'Tạm khóa' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            await partnerService.updatePatient(id, data);
            message.success('Cập nhật hồ sơ bệnh nhân thành công!');
            router.push(`/partners/patients/${id}`);
        } catch (error: any) {
            message.error('Lỗi: ' + (error.message || 'Không thể cập nhật hồ sơ bệnh nhân'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải dữ liệu hồ sơ..." />
            </div>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/patients">Bệnh nhân</Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa #{id}</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Chỉnh sửa Bệnh nhân</Title>
                    <Text type="secondary">Cập nhật hồ sơ bệnh nhân ID #{id}</Text>
                </div>
            </Space>

            <Card variant="outlined">
                <FormBuilder
                    fields={fields}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu hồ sơ"
                    loading={submitting}
                    columns={2}
                />
            </Card>
        </Space>
    );
}
