'use client';

import React, { useState, useEffect, use } from 'react';
import { Typography, Card, Space, Breadcrumb, message, Spin, Row, Col, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormBuilder from '@/components/admin/FormBuilder';
import contentService, { Video } from '@/services/content.service';

const { Title, Text } = Typography;

export default function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const videos = await contentService.getVideos();
                const video = videos.find(v => String(v.id) === id);

                if (video) {
                    setInitialValues({
                        ...video,
                        isActive: video.isActive
                    });
                } else {
                    message.error('Không tìm thấy video');
                    router.push('/content/videos');
                }
            } catch (error) {
                console.error('Failed to fetch video', error);
                message.error('Lỗi khi tải dữ liệu video');
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [id, router]);

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
            await contentService.updateVideo(id, {
                ...values,
                isActive: values.isActive === true || values.isActive === 'true'
            });
            message.success('Cập nhật video thành công!');
            router.push('/content/videos');
        } catch (error) {
            console.error('Failed to update video', error);
            message.error('Lỗi khi cập nhật video');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Spin size="large" tip="Đang tải dữ liệu video..." />
            </div>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/content/videos">Thư viện Video</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa video</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space size="middle">
                        <Link href="/content/videos">
                            <Button icon={<ArrowLeftOutlined />} type="text" size="large" />
                        </Link>
                        <div>
                            <Title level={2} style={{ margin: 0 }}>Chỉnh sửa video</Title>
                            <Text type="secondary">Cập nhật thông tin chi tiết cho video ID: #{id}</Text>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Card variant="borderless" bodyStyle={{ padding: '24px' }}>
                <FormBuilder
                    fields={formFields}
                    onSubmit={handleSubmit}
                    submitLabel="Cập nhật video"
                    loading={submitting}
                    initialValues={initialValues}
                />
            </Card>
        </Space>
    );
}
