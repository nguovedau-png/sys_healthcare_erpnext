"use client";

import React from 'react';
import { Typography, Button, Space, Card, Breadcrumb, Row, Col, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormBuilder from '@/components/admin/FormBuilder';
import communityService from '@/services/community.service';

const { Title, Text } = Typography;

export default function CreateForumTopic() {
    const router = useRouter();

    const fields = [
        {
            name: 'title',
            label: 'Tiêu đề chủ đề',
            type: 'text' as const,
            required: true,
            placeholder: 'Nhập tiêu đề thu hút sự chú ý...'
        },
        {
            name: 'category',
            label: 'Danh mục thảo luận',
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
            label: 'Nội dung thảo luận',
            type: 'textarea' as const,
            required: true,
            rows: 12,
            placeholder: 'Viết nội dung chi tiết cho cuộc thảo luận này...'
        },
        {
            name: 'status',
            label: 'Trạng thái ban đầu',
            type: 'select' as const,
            required: true,
            defaultValue: 'pending',
            options: [
                { value: 'active', label: 'Hoạt động ngay (Đã duyệt)' },
                { value: 'pending', label: 'Chờ xét duyệt (Mặc định)' },
            ]
        },
    ];

    const handleSubmit = async (values: any) => {
        try {
            message.loading({ content: 'Đang tạo chủ đề...', key: 'create_topic' });
            await communityService.createForumTopic({
                ...values,
                authorId: 'admin', // Simulation
                authorName: 'Quản trị viên',
                views: 0
            });
            message.success({ content: 'Đã tạo chủ đề thảo luận mới thành công!', key: 'create_topic' });
            router.push('/community/forum');
        } catch (error) {
            console.error('Failed to create topic:', error);
            message.error({ content: 'Không thể tạo chủ đề. Vui lòng thử lại!', key: 'create_topic' });
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/community/forum">Diễn đàn thảo luận</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tạo chủ đề mới</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Tạo Chủ đề Mới</Title>
                        <Text type="secondary">Khởi tạo một cuộc thảo luận mới cho cộng đồng người dùng</Text>
                    </Space>
                </Col>
                <Col>
                    <Link href="/community/forum">
                        <Button icon={<ArrowLeftOutlined />}>Quay lại danh sách</Button>
                    </Link>
                </Col>
            </Row>

            <Card variant="borderless" className="shadow-sm">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Đăng chủ đề ngay"
                    columns={1}
                />
            </Card>
        </Space>
    );
}
