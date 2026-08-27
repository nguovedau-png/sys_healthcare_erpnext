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
import partnerService, { Pharmacy } from '@/services/partner.service';
import FormBuilder from '@/components/admin/FormBuilder';

const { Title, Text } = Typography;

export default function EditPharmacy() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = parseInt(params.id);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState<Pharmacy | null>(null);

    useEffect(() => {
        const fetchPharmacy = async () => {
            try {
                setLoading(true);
                const data = await partnerService.getPharmacy(id);
                setInitialValues({
                    ...data,
                    isVerified: data.isVerified ? 'true' : 'false'
                } as any);
            } catch (error) {
                console.error('Failed to fetch pharmacy detail', error);
                message.error('Không thể tải thông tin nhà thuốc');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPharmacy();
    }, [id]);

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
            rows: 6
        },
        {
            name: 'isVerified', label: 'Trạng thái xác thực', type: 'select' as const, required: true, options: [
                { value: 'true', label: 'Đã xác thực (Hiển thị)' },
                { value: 'false', label: 'Chờ xác thực (Ẩn)' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            await partnerService.updatePharmacy(parseInt(params.id as string), {
                ...data,
                isVerified: data.isVerified === 'true'
            });
            message.success('Cập nhật nhà thuốc thành công!');
            router.push(`/partners/pharmacies/${id}`);
        } catch (error: any) {
            message.error('Lỗi: ' + (error.message || 'Không thể cập nhật nhà thuốc'));
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

    if (!initialValues) {
        return (
            <Card>
                <div style={{ textAlign: 'center', padding: '24px' }}>
                    <Text type="danger">Không tìm thấy thông tin nhà thuốc</Text>
                    <div style={{ marginTop: '16px' }}>
                        <Button onClick={() => router.back()}>Quay lại</Button>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/pharmacies">Nhà thuốc</Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa #{id}</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Chỉnh sửa Nhà thuốc</Title>
                    <Text type="secondary">Cập nhật thông tin cơ sở ID #{id}</Text>
                </div>
            </Space>

            <Card variant="borderless">
                <FormBuilder
                    fields={fields}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu thay đổi"
                    loading={submitting}
                    columns={2}
                />
            </Card>
        </Space>
    );
}
