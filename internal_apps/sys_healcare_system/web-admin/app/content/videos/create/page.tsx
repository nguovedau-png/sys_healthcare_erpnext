'use client';

import React, { useState } from 'react';
import { Typography, Card, Space, Breadcrumb, message, Row, Col, Button } from 'antd';
import { ArrowLeftOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormBuilder from '@/components/admin/FormBuilder';
import contentService from '@/services/content.service';

const { Title, Text } = Typography;

export default function CreateVideoPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const formFields = [
        {
            name: 'title',
            label: 'Tiêu đề video',
            type: 'text' as const,
            required: true,
            placeholder: 'Nhập tiêu đề video...',
            colSpan: 24,
        },
        {
            name: 'url',
            label: 'URL Video (YouTube/Vimeo)',
            type: 'text' as const,
            required: true,
            placeholder: 'https://www.youtube.com/watch?v=...',
            colSpan: 24,
        },
        {
            name: 'thumbnail',
            label: 'Ảnh thumbnail (URL)',
            type: 'text' as const,
            placeholder: 'https://example.com/thumb.jpg',
            colSpan: 24,
        },
        {
            name: 'author',
            label: 'Tác giả / Bác sĩ',
            type: 'text' as const,
            required: true,
            placeholder: 'Họ tên người thực hiện...',
            colSpan: 12,
        },
        {
            name: 'duration',
            label: 'Thời lượng',
            type: 'text' as const,
            required: true,
            placeholder: 'Ví dụ: 15:30',
            colSpan: 12,
        },
        {
            name: 'isActive',
            label: 'Trạng thái',
            type: 'select' as const,
            required: true,
            colSpan: 12,
            options: [
                { label: 'Xuất bản công khai', value: 'true' },
                { label: 'Tạm ẩn', value: 'false' },
            ],
        },
    ];

    const handleSubmit = async (values: any) => {
        setSubmitting(true);
        try {
            await contentService.createVideo({
                ...values,
                isActive: values.isActive === true || values.isActive === 'true'
            });
            message.success('Đã tải video mới lên thành công!');
            router.push('/content/videos');
        } catch (error) {
            console.error('Failed to create video', error);
            message.error('Lỗi khi đăng tải video');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/content/videos">Thư viện Video</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tải video mới</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space size="middle">
                        <Link href="/content/videos">
                            <Button icon={<ArrowLeftOutlined />} type="text" size="large" />
                        </Link>
                        <div>
                            <Title level={2} style={{ margin: 0 }}>Tải video mới lên</Title>
                            <Text type="secondary">Thêm video hướng dẫn, tin tức y tế vào thư viện truyền thông</Text>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Card variant="borderless" bodyStyle={{ padding: '24px' }}>
                <FormBuilder
                    fields={formFields}
                    onSubmit={handleSubmit}
                    submitLabel="Tải lên thư viện"
                    loading={submitting}
                    initialValues={{ isActive: true }}
                />
            </Card>
        </Space>
    );
}
