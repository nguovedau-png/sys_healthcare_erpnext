'use client';

import React, { useState, useEffect, use } from 'react';
import { Typography, Card, Space, Breadcrumb, message, Spin, Row, Col, Button as AntButton } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormBuilder from '@/components/admin/FormBuilder';
import contentService, { Category } from '@/services/content.service';

const { Title, Text } = Typography;

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [initialValues, setInitialValues] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [post, cats] = await Promise.all([
                    contentService.getPost(id),
                    contentService.getCategories()
                ]);

                setCategories(cats);
                setInitialValues({
                    title: post.title,
                    categoryId: post.categoryId,
                    content: post.content,
                    isActive: post.isActive,
                    thumbnail: post.thumbnail,
                    desc: post.desc,
                    author: post.author,
                });
            } catch (error) {
                console.error('Failed to fetch data', error);
                message.error('Không thể tải dữ liệu bài viết');
                router.push('/content/news');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, router]);

    const formFields = [
        {
            name: 'title',
            label: 'Tiêu đề bài viết',
            type: 'text' as const,
            required: true,
            placeholder: 'Nhập tiêu đề cho bài viết...',
            colSpan: 24,
        },
        {
            name: 'categoryId',
            label: 'Danh mục',
            type: 'select' as const,
            required: true,
            colSpan: 12,
            options: categories.map(cat => ({ label: cat.name, value: String(cat.id) })),
        },
        {
            name: 'author',
            label: 'Tác giả',
            type: 'text' as const,
            required: true,
            colSpan: 12,
        },
        {
            name: 'desc',
            label: 'Mô tả ngắn',
            type: 'textarea' as const,
            colSpan: 24,
            rows: 3
        },
        {
            name: 'content',
            label: 'Nội dung chi tiết',
            type: 'textarea' as const,
            required: true,
            colSpan: 24,
            rows: 15
        },
        {
            name: 'thumbnail',
            label: 'Ảnh đại diện (URL)',
            type: 'text' as const,
            colSpan: 24,
        },
        {
            name: 'isActive',
            label: 'Trạng thái xuất bản',
            type: 'select' as const,
            required: true,
            colSpan: 12,
            options: [
                { label: 'Đang hoạt động', value: 'true' },
                { label: 'Tạm ẩn (Nháp)', value: 'false' }
            ]
        }
    ];

    const handleSubmit = async (values: any) => {
        setSubmitting(true);
        try {
            await contentService.updatePost(id, {
                ...values,
                categoryId: parseInt(values.categoryId)
            });
            message.success('Cập nhật bài viết thành công!');
            router.push('/content/news');
        } catch (error) {
            console.error('Failed to update post', error);
            message.error('Lỗi khi cập nhật bài viết');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <Spin size="large" tip="Đang tải dữ liệu bài viết..." />
            </div>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/content/news">Tin bài & Kiến thức</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa bài viết</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space size="middle">
                        <Link href="/content/news">
                            <AntButton icon={<ArrowLeftOutlined />} type="text" size="large" />
                        </Link>
                        <div>
                            <Title level={2} style={{ margin: 0 }}>Chỉnh sửa bài viết</Title>
                            <Text type="secondary">Cập nhật thông tin chi tiết cho bài viết ID: #{id}</Text>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Card variant="borderless" bodyStyle={{ padding: '24px' }}>
                <FormBuilder
                    fields={formFields}
                    onSubmit={handleSubmit}
                    submitLabel="Cập nhật bài viết"
                    loading={submitting}
                    initialValues={initialValues}
                />
            </Card>
        </Space>
    );
}
