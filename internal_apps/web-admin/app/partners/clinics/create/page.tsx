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

export default function CreateClinicPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const fields = [
        { name: 'name', label: 'Tên phòng khám', type: 'text' as const, required: true, placeholder: 'VD: Phòng khám Đa khoa Quốc tế' },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true, placeholder: '028...' },
        { name: 'address', label: 'Địa chỉ cơ sở', type: 'text' as const, required: true, placeholder: 'Số 123, Đường...' },
        { name: 'email', label: 'Email liên hệ', type: 'email' as const, placeholder: 'contact@clinic.com' },
        { name: 'website', label: 'Website', type: 'text' as const, placeholder: 'https://...' },
        {
            name: 'specialtiesRaw',
            label: 'Chuyên khoa (cách nhau bằng dấu phẩy)',
            type: 'textarea' as const,
            placeholder: 'Nội khoa, Nhi khoa, Da liễu...',
            colSpan: 24
        },
        {
            name: 'description',
            label: 'Mô tả phòng khám',
            type: 'textarea' as const,
            placeholder: 'Giới thiệu ngắn về phòng khám...',
            colSpan: 24,
            rows: 4
        },
    ];

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            const processedData = {
                ...data,
                specialties: data.specialtiesRaw ? data.specialtiesRaw.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '') : [],
                isVerified: false,
                rating: 0
            };
            delete processedData.specialtiesRaw;

            await partnerService.createClinic(processedData);
            message.success('Tạo phòng khám thành công!');
            router.push('/partners/clinics');
        } catch (error: any) {
            message.error('Lỗi: ' + (error.message || 'Không thể tạo phòng khám'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/clinics">Phòng khám</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Thêm Phòng khám</Title>
                    <Text type="secondary">Đăng ký cơ sở y tế mới vào hệ thống</Text>
                </div>
            </Space>

            <Card variant="outlined">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Tạo phòng khám"
                    loading={loading}
                    columns={2}
                />
            </Card>
        </Space>
    );
}
