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
import partnerService from '@/services/partner.service';
import FormBuilder from '@/components/admin/FormBuilder';

const { Title, Text } = Typography;

export default function EditClinicPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = parseInt(params.id);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                setLoading(true);
                const clinic = await partnerService.getClinic(id);
                setInitialValues({
                    ...clinic,
                    specialtiesRaw: clinic.specialties?.join(', ') || ''
                });
            } catch (error) {
                console.error('Failed to fetch clinic detail', error);
                message.error('Không thể tải thông tin phòng khám');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchClinic();
    }, [id]);

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
            rows: 6
        },
        {
            name: 'isVerified',
            label: 'Trạng thái xác thực',
            type: 'select' as const,
            options: [
                { value: 'true', label: 'Đã xác thực (Hiển thị)' },
                { value: 'false', label: 'Chờ xác thực (Ẩn)' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            const processedData = {
                ...data,
                specialties: data.specialtiesRaw ? data.specialtiesRaw.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '') : [],
            };
            delete processedData.specialtiesRaw;

            await partnerService.updateClinic(id, processedData);
            message.success('Cập nhật phòng khám thành công!');
            router.push('/partners/clinics');
        } catch (error: any) {
            message.error('Lỗi: ' + (error.message || 'Không thể cập nhật phòng khám'));
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
                <Breadcrumb.Item href="/partners/clinics">Phòng khám</Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa #{id}</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Chỉnh sửa Phòng khám</Title>
                    <Text type="secondary">Cập nhật thông tin chi tiết của cơ sở y tế</Text>
                </div>
            </Space>

            <Card variant="outlined">
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
