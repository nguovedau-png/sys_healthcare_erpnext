'use client';

import React, { useState } from 'react';
import { Typography, Card, Space, Breadcrumb, message, Row, Col, Button as AntButton } from 'antd';
import { ArrowLeftOutlined, PictureOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormBuilder from '@/components/admin/FormBuilder';
import contentService from '@/services/content.service';

const { Title, Text } = Typography;

export default function CreateBannerPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const formFields = [
        {
            name: 'title',
            label: 'Tiêu đề Banner',
            type: 'text' as const,
            required: true,
            placeholder: 'Nhập tiêu đề banner (VD: Khuyến mãi mùa hè)...',
            colSpan: 24,
        },
        {
            name: 'image',
            label: 'Hình ảnh (URL)',
            type: 'text' as const,
            required: true,
            placeholder: 'https://example.com/banner-image.jpg...',
            colSpan: 24,
        },
        {
            name: 'link',
            label: 'Liên kết điều hướng (URL)',
            type: 'text' as const,
            placeholder: '/news/123 hoặc https://...',
            colSpan: 24,
        },
        {
            name: 'position',
            label: 'Vị trí hiển thị',
            type: 'select' as const,
            required: true,
            colSpan: 12,
            options: [
                { value: 'home_hero', label: 'Trang chủ - Hero Banner' },
                { value: 'sidebar', label: 'Thanh bên (Sidebar)' },
                { value: 'news_top', label: 'Tin tức - Đầu trang' },
                { value: 'popup', label: 'Thông báo - Popup' },
            ],
        },
        {
            name: 'isActive',
            label: 'Trạng thái hoạt động',
            type: 'select' as const,
            required: true,
            colSpan: 12,
            options: [
                { label: 'Kích hoạt ngay', value: 'true' },
                { label: 'Tạm ngưng', value: 'false' },
            ],
        },
    ];

    const handleSubmit = async (values: any) => {
        setSubmitting(true);
        try {
            await contentService.createBanner({
                ...values,
                isActive: values.isActive === true || values.isActive === 'true'
            });
            message.success('Đã tạo banner mới thành công!');
            router.push('/content/banners');
        } catch (error) {
            console.error('Failed to create banner', error);
            message.error('Lỗi khi tạo banner');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/content/banners">Banner quảng cáo</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tạo banner mới</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space size="middle">
                        <Link href="/content/banners">
                            <AntButton icon={<ArrowLeftOutlined />} type="text" size="large" />
                        </Link>
                        <div>
                            <Title level={2} style={{ margin: 0 }}>Tạo banner mới</Title>
                            <Text type="secondary">Thêm banner quảng cáo hoặc thông báo mới lên website</Text>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Card variant="outlined" bodyStyle={{ padding: '24px' }}>
                <FormBuilder
                    fields={formFields}
                    onSubmit={handleSubmit}
                    submitLabel="Tạo Banner"
                    loading={submitting}
                    initialValues={{ isActive: true, position: 'home_hero' }}
                />
            </Card>
        </Space>
    );
}
