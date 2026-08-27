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

export default function CreateHospitalPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const fields = [
        { name: 'name', label: 'Tên bệnh viện', type: 'text' as const, required: true, placeholder: 'Nhập tên bệnh viện...' },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const, required: true, placeholder: '028...' },
        { name: 'address', label: 'Địa chỉ', type: 'text' as const, required: true, placeholder: 'Số nhà, tên đường...', colSpan: 24 },
        { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'email@hospital.vn' },
        { name: 'beds', label: 'Số giường bệnh', type: 'number' as const, placeholder: '0' },
        { name: 'description', label: 'Mô tả', type: 'textarea' as const, placeholder: 'Giới thiệu về bệnh viện...', rows: 4 },
        { name: 'departmentsRaw', label: 'Các khoa (cách nhau bằng dấu phẩy)', type: 'textarea' as const, placeholder: 'Nội khoa, Ngoại khoa, Nhi khoa...', rows: 2 },
        { name: 'facilitiesRaw', label: 'Cơ sở vật chất (cách nhau bằng dấu phẩy)', type: 'textarea' as const, placeholder: 'Máy MRI, CT Scanner, X-Ray...', rows: 2 },
    ];

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            // Process raw comma-separated lists into arrays
            const processedData = {
                ...data,
                departments: data.departmentsRaw ? data.departmentsRaw.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
                facilities: data.facilitiesRaw ? data.facilitiesRaw.split(',').map((s: string) => s.trim()).filter(Boolean) : []
            };
            delete processedData.departmentsRaw;
            delete processedData.facilitiesRaw;

            await partnerService.createHospital(processedData);
            message.success('Tạo bệnh viện thành công!');
            router.push('/partners/hospitals');
        } catch (error: any) {
            message.error('Lỗi: ' + (error.message || 'Không thể tạo bệnh viện'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners/hospitals">Bệnh viện</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Thêm Bệnh viện</Title>
                    <Text type="secondary">Đăng ký cơ sở bệnh viện mới vào hệ thống</Text>
                </div>
            </Space>

            <Card variant="borderless">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Tạo bệnh viện"
                    columns={2}
                    loading={loading}
                />
            </Card>
        </Space>
    );
}
