'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Card, Space, Breadcrumb, message, Row, Col } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from 'antd/es/button';
import FormBuilder from '@/components/admin/FormBuilder';
import contentService, { Category } from '@/services/content.service';

const { Title, Text } = Typography;

export default function CreateNewsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [catLoading, setCatLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await contentService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
                message.error('Không thể tải danh sách danh mục');
            } finally {
                setCatLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const formFields = [
        {
            name: 'title',
            label: 'Tiêu đề bài viết',
            type: 'text' as const,
            required: true,
            placeholder: 'Nhập tiêu đề hấp dẫn cho bài viết...',
            colSpan: 24,
        },
        {
            name: 'categoryId',
            label: 'Danh mục',
            type: 'select' as const,
            required: true,
            colSpan: 12,
            options: categories.map(cat => ({ label: cat.name, value: String(cat.id) })),
            loading: catLoading
        },
        {
            name: 'author',
            label: 'Tác giả',
            type: 'text' as const,
            required: true,
            colSpan: 12,
            placeholder: 'Họ tên tác giả...'
        },
        {
            name: 'desc',
            label: 'Mô tả ngắn',
            type: 'textarea' as const,
            colSpan: 24,
            placeholder: 'Tóm tắt nội dung bài viết (hiển thị ở danh sách)...',
            rows: 3
        },
        {
            name: 'content',
            label: 'Nội dung chi tiết',
            type: 'textarea' as const,
            required: true,
            colSpan: 24,
            placeholder: 'Nhập nội dung chi tiết của bài viết...',
            rows: 15
        },
        {
            name: 'thumbnail',
            label: 'Ảnh đại diện (URL)',
            type: 'text' as const,
            colSpan: 24,
            placeholder: 'Link hình ảnh (ví dụ: https://example.com/image.jpg)...'
        },
        {
            name: 'isActive',
            label: 'Trạng thái xuất bản',
            type: 'select' as const,
            required: true,
            colSpan: 12,
            options: [
                { label: 'Xuất bản ngay', value: 'true' },
                { label: 'Lưu bản nháp', value: 'false' }
            ]
        }
    ];

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            await contentService.createPost({
                ...values,
                categoryId: parseInt(values.categoryId),
                type: 'article'
            });
            message.success('Đã tạo bài viết mới thành công!');
            router.push('/content/news');
        } catch (error) {
            console.error('Failed to create post', error);
            message.error('Lỗi khi tạo bài viết');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/content/news">Tin bài & Kiến thức</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tạo bài viết mới</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space size="middle">
                        <Link href="/content/news">
                            <Button icon={<ArrowLeftOutlined />} type="text" size="large" />
                        </Link>
                        <div>
                            <Title level={2} style={{ margin: 0 }}>Tạo bài viết mới</Title>
                            <Text type="secondary">Thêm nội dung chuyên môn hoặc tin tức y tế mới vào hệ thống</Text>
                        </div>
                    </Space>
                </Col>
            </Row>

            <Card variant="outlined" bodyStyle={{ padding: '24px' }}>
                <FormBuilder
                    fields={formFields}
                    onSubmit={handleSubmit}
                    submitLabel="Xuất bản bài viết"
                    loading={loading}
                    initialValues={{ isActive: 'true', author: 'Ban Biên Tập' }}
                />
            </Card>
        </Space>
    );
}
