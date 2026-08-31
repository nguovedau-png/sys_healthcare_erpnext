"use client";

import React, { useState } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
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

const { Title, Text } = Typography;

export default function CreateDoctor() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
        { name: 'experience', label: 'Số năm kinh nghiệm', type: 'number' as const, placeholder: 'VD: 10' },
        { name: 'bio', label: 'Tiểu sử / Giới thiệu chuyên môn', type: 'textarea' as const, placeholder: 'Giới thiệu ngắn về quá trình đào tạo và công tác...', colSpan: 24 },
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
        setLoading(true);
        try {
            const processedData = {
                name: data.name,
                specialty: data.specialty,
                hospital: data.hospital,
                phone: data.phone,
                email: data.email,
                description: `Kinh nghiệm: ${data.experience || 0} năm. \n${data.bio || ''}`,
                isVerified: data.status === 'active',
                rating: 0
            };

            await partnerService.createDoctor(processedData);
            message.success('Thêm bác sĩ thành công!');
            router.push('/partners/doctors');
        } catch (error: any) {
            message.error('Lỗi: ' + (error.message || 'Không thể thêm bác sĩ'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/doctors">Bác sĩ</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Thêm Bác sĩ mới</Title>
                    <Text type="secondary">Đăng ký thông tin bác sĩ vào mạng lưới y tế</Text>
                </div>
            </Space>

            <Card variant="outlined">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Thêm bác sĩ"
                    columns={2}
                    loading={loading}
                    initialValues={{ specialty: 'Tim mạch', status: 'active' }}
                />
            </Card>
        </Space>
    );
}
