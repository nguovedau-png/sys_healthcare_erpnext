"use client";

import React, { useState, useEffect } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
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
import partnerService from '@/services/partner.service';

const { Title, Text } = Typography;

export default function EditDoctor() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = parseInt(params.id);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                setLoading(true);
                const doctor = await partnerService.getDoctor(id);
                // Map description to bio for the form (rough estimation)
                setInitialValues({
                    ...doctor,
                    status: doctor.isVerified ? 'active' : 'inactive',
                    bio: doctor.description
                });
            } catch (error) {
                console.error('Failed to fetch doctor', error);
                message.error('Không thể tải thông tin bác sĩ');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDoctor();
    }, [id]);

    const fields = [
        { name: 'name', label: 'Họ và tên bác sĩ', type: 'text' as const, required: true, placeholder: 'VD: Bs. Nguyễn Văn A' },
        {
            name: 'specialty',
            label: 'Chuyên khoa',
            type: 'select' as const,
            required: true,
            options: [
                { value: 'Tim mạch', label: 'Tim mạch' },
                { value: 'Nhi khoa', label: 'Nhi khoa' },
                { value: 'Tiêu hóa', label: 'Tiêu hóa' },
                { value: 'Da liễu', label: 'Da liễu' },
                { value: 'Sản phụ khoa', label: 'Sản phụ khoa' },
                { value: 'Cơ xương khớp', label: 'Cơ xương khớp' },
            ]
        },
        { name: 'hospital', label: 'Bệnh viện / Cơ sở công tác', type: 'text' as const, required: true, placeholder: 'VD: Bệnh viện Chợ Rẫy' },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true, placeholder: '090...' },
        { name: 'email', label: 'Email', type: 'email' as const, required: true, placeholder: 'doctor@example.com' },
        { name: 'bio', label: 'Tiểu sử / Giới thiệu chuyên môn', type: 'textarea' as const, placeholder: 'Giới thiệu ngắn về bác sĩ...', colSpan: 24, rows: 6 },
        {
            name: 'status',
            label: 'Trạng thái xác thực',
            type: 'select' as const,
            options: [
                { value: 'active', label: 'Đã xác thực (Hiển thị)' },
                { value: 'inactive', label: 'Chờ xác thực (Ẩn)' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            const processedData = {
                ...data,
                description: data.bio,
                isVerified: data.status === 'active'
            };
            delete processedData.status;
            delete processedData.bio;

            await partnerService.updateDoctor(id, processedData);
            message.success('Cập nhật bác sĩ thành công!');
            router.push('/partners/doctors');
        } catch (error: any) {
            message.error('Lỗi: ' + (error.message || 'Không thể cập nhật bác sĩ'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/doctors">Bác sĩ</Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa #{id}</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Chỉnh sửa Bác sĩ</Title>
                    <Text type="secondary">Cập nhật thông tin chi tiết của bác sĩ</Text>
                </div>
            </Space>

            <Card variant="borderless">
                <FormBuilder
                    fields={fields}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu thay đổi"
                    columns={2}
                    loading={submitting}
                />
            </Card>
        </Space>
    );
}
