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

export default function CreatePharmacyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const fields = [
        { name: 'name', label: 'Tên nhà thuốc', type: 'text' as const, required: true, placeholder: 'VD: Nhà thuốc PharmaCity' },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true, placeholder: '028...' },
        { name: 'address', label: 'Địa chỉ cơ sở', type: 'text' as const, required: true, placeholder: 'Số 123, Đường...' },
        { name: 'email', label: 'Email liên hệ', type: 'email' as const, placeholder: 'contact@pharmacy.com' },
        { name: 'website', label: 'Website', type: 'text' as const, placeholder: 'https://...' },
        {
            name: 'description',
            label: 'Mô tả nhà thuốc',
            type: 'textarea' as const,
            placeholder: 'Giới thiệu ngắn về nhà thuốc...',
            colSpan: 24,
            rows: 4
        },
    ];

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            await partnerService.createPharmacy({
                ...data,
                isVerified: false,
                rating: 0
            });
            message.success('Tạo nhà thuốc thành công!');
            router.push('/partners/pharmacies');
        } catch (error: any) {
            message.error('Lỗi: ' + (error.message || 'Không thể tạo nhà thuốc'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/pharmacies">Nhà thuốc</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Thêm Nhà thuốc</Title>
                    <Text type="secondary">Cung cấp thông tin của cơ sở bán lẻ thuốc mới</Text>
                </div>
            </Space>

            <Card variant="borderless">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Tạo nhà thuốc"
                    loading={loading}
                    columns={2}
                />
            </Card>
        </Space>
    );
}
