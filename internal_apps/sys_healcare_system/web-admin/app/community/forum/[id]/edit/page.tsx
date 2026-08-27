"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Button, Space, Card, Breadcrumb, Row, Col, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import FormBuilder from '@/components/admin/FormBuilder';
import communityService, { ForumTopic } from '@/services/community.service';

const { Title, Text } = Typography;

export default function EditForumTopic() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [topic, setTopic] = useState<ForumTopic | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchTopic = async () => {
        try {
            setLoading(true);
            const data = await communityService.getForumTopic(Number(params.id));
            setTopic(data);
        } catch (error) {
            console.error('Failed to fetch topic', error);
            message.error('Không thể tải thông tin chủ đề');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchTopic();
        }
    }, [params.id]);

    const fields = [
        {
            name: 'title',
            label: 'Tiêu đề chủ đề',
            type: 'text' as const,
            required: true,
            placeholder: 'Nhập tiêu đề chủ đề...'
        },
        {
            name: 'category',
            label: 'Danh mục',
            type: 'select' as const,
            required: true,
            options: [
                { value: 'Sức khỏe', label: 'Sức khỏe' },
                { value: 'Dinh dưỡng', label: 'Dinh dưỡng' },
                { value: 'Tâm lý', label: 'Tâm lý' },
                { value: 'Thể thao', label: 'Thể thao' },
                { value: 'Làm đẹp', label: 'Làm đẹp' },
                { value: 'Mẹ và bé', label: 'Mẹ và bé' },
            ]
        },
        {
            name: 'content',
            label: 'Nội dung',
            type: 'textarea' as const,
            required: true,
            rows: 12
        },
        {
            name: 'status',
            label: 'Trạng thái',
            type: 'select' as const,
            required: true,
            options: [
                { value: 'active', label: 'Đang hoạt động' },
                { value: 'pending', label: 'Chờ xét duyệt' },
            ]
        },
    ];

    const handleSubmit = async (values: any) => {
        try {
            message.loading({ content: 'Đang cập nhật chủ đề...', key: 'update_topic' });
            await communityService.updateForumTopic(Number(params.id), values);
            message.success({ content: 'Đã cập nhật chủ đề thành công!', key: 'update_topic' });
            router.push(`/community/forum/${params.id}`);
        } catch (error) {
            console.error('Failed to update topic:', error);
            message.error({ content: 'Cập nhật thất bại. Vui lòng thử lại!', key: 'update_topic' });
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
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/community/forum">Diễn đàn thảo luận</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href={`/community/forum/${params.id}`}>Chi tiết chủ đề</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Chỉnh sửa Chủ đề</Title>
                        <Text type="secondary">Cập nhật thông tin và nội dung cho chủ đề thảo luận #{params.id}</Text>
                    </Space>
                </Col>
                <Col>
                    <Link href={`/community/forum/${params.id}`}>
                        <Button icon={<ArrowLeftOutlined />}>Quay lại chi tiết</Button>
                    </Link>
                </Col>
            </Row>

            <Card variant="outlined" className="shadow-sm">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu thay đổi"
                    initialValues={topic || {}}
                    columns={1}
                />
            </Card>
        </Space>
    );
}
