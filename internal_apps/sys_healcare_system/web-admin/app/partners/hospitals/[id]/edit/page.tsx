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

export default function EditHospitalPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = parseInt(params.id);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                setLoading(true);
                const hospital = await partnerService.getHospital(id);
                setInitialValues({
                    ...hospital,
                    departmentsRaw: hospital.departments?.join(', ') || '',
                    facilitiesRaw: (hospital as any).facilities?.join(', ') || ''
                });
            } catch (error) {
                console.error('Failed to fetch hospital', error);
                message.error('Không thể tải thông tin bệnh viện');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchHospital();
    }, [id]);

    const fields = [
        { name: 'name', label: 'Tên bệnh viện', type: 'text' as const, required: true, placeholder: 'Nhập tên bệnh viện...' },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true, placeholder: '028...' },
        { name: 'address', label: 'Địa chỉ', type: 'text' as const, required: true, placeholder: 'Số nhà, tên đường...', colSpan: 24 },
        { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'email@hospital.vn' },
        { name: 'website', label: 'Website', type: 'text' as const, placeholder: 'www.hospital.vn' },
        { name: 'beds', label: 'Số giường bệnh', type: 'number' as const, placeholder: '0' },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, placeholder: 'Giới thiệu về bệnh viện...', rows: 4 },
        { name: 'departmentsRaw', label: 'Các khoa (cách nhau bằng dấu phẩy)', type: 'textarea' as const, placeholder: 'Nội khoa, Ngoại khoa, Nhi khoa...', rows: 2 },
        { name: 'facilitiesRaw', label: 'Cơ sở vật chất (cách nhau bằng dấu phẩy)', type: 'textarea' as const, placeholder: 'Máy MRI, CT Scanner, X-Ray...', rows: 2 },
    ];

    const handleSubmit = async (data: any) => {
        setSubmitting(true);
        try {
            const processedData = {
                ...data,
                departments: data.departmentsRaw ? data.departmentsRaw.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
                facilities: data.facilitiesRaw ? data.facilitiesRaw.split(',').map((s: string) => s.trim()).filter(Boolean) : []
            };
            delete processedData.departmentsRaw;
            delete processedData.facilitiesRaw;

            await partnerService.updateHospital(id, processedData);
            message.success('Cập nhật bệnh viện thành công!');
            router.push('/partners/hospitals');
        } catch (error: any) {
            message.error('Lỗi: ' + (error.message || 'Không thể cập nhật bệnh viện'));
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
                <Breadcrumb.Item href="/partners/hospitals">Bệnh viện</Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa #{id}</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Chỉnh sửa Bệnh viện</Title>
                    <Text type="secondary">Cập nhật thông tin chi tiết của cơ sở</Text>
                </div>
            </Space>

            <Card variant="outlined">
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
