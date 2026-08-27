'use client';

import React, { useState, useEffect, use } from 'react';
import { Typography, Card, Space, Breadcrumb, message, Spin, Row, Col, Button as AntButton } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormBuilder from '@/components/admin/FormBuilder';
import contentService, { Banner } from '@/services/content.service';

const { Title, Text } = Typography;

export default function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const banners = await contentService.getBanners();
                const banner = banners.find(b => String(b.id) === id);

                if (banner) {
                    setInitialValues({
                        ...banner,
                        isActive: banner.isActive
                    });
                } else {
                    message.error('Không tìm thấy banner');
                    router.push('/content/banners');
                }
            } catch (error) {
                console.error('Failed to fetch banner', error);
                message.error('Lỗi khi tải dữ liệu banner');
            } finally {
                setLoading(false);
            }
        };
        fetchBanner();
    }, [id, router]);

    const formFields = [
        {
            name: 'title',
            label: 'Tiêu đề Banner',
            type: 'text' as const,
            required: true,
            placeholder: 'Nhập tiêu đề banner...',
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
                { label: 'Kích hoạt', value: 'true' },
                { label: 'Tạm ngưng', value: 'false' },
            ],
        },
    ];

    const handleSubmit = async (values: any) => {
        setSubmitting(true);
        try {
            await contentService.updateBanner(id, {
                ...values,
                isActive: values.isActive === true || values.isActive === 'true'
            });
            message.success('Cập nhật banner thành công!');
            router.push('/content/banners');
        } catch (error) {
            console.error('Failed to update banner', error);
            message.error('Lỗi khi cập nhật banner');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Spin size="large" tip="Đang tải dữ liệu banner..." />
            </div>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/content/banners">Banner quảng cáo</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa banner</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space size="middle">
                        <Link href="/content/banners">
                            <AntButton icon={<ArrowLeftOutlined />} type="text" size="large" />
                        </Link>
                        <div>
                            <Title level={2} style={{ margin: 0 }}>Chỉnh sửa banner</Title>
                            <Text type="secondary">Cập nhật thông tin chi tiết cho banner ID: #{id}</Text>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Card variant="outlined" bodyStyle={{ padding: '24px' }}>
                <FormBuilder
                    fields={formFields}
                    onSubmit={handleSubmit}
                    submitLabel="Cập nhật Banner"
                    loading={submitting}
                    initialValues={initialValues}
                />
            </Card>
        </Space>
    );
}
