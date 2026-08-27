"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Button, Space, Card, Breadcrumb, Row, Col, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import FormBuilder from '@/components/admin/FormBuilder';
import communityService, { SupportGroup } from '@/services/community.service';

const { Title, Text } = Typography;

export default function EditSupportGroup() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [group, setGroup] = useState<SupportGroup | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchGroup = async () => {
        try {
            setLoading(true);
            const data = await communityService.getSupportGroup(Number(params.id));
            setGroup(data);
        } catch (error) {
            console.error('Failed to fetch group', error);
            message.error('Không thể tải thông tin nhóm hỗ trợ');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchGroup();
        }
    }, [params.id]);

    const fields = [
        {
            name: 'name',
            label: 'Tên nhóm hỗ trợ',
            type: 'text' as const,
            required: true
        },
        {
            name: 'category',
            label: 'Lĩnh vực / Chuyên khoa',
            type: 'select' as const,
            required: true,
            options: [
                { value: 'Tiểu đường', label: 'Tiểu đường' },
                { value: 'Huyết áp', label: 'Huyết áp' },
                { value: 'Ung thư', label: 'Ung thư' },
                { value: 'Tâm lý', label: 'Tâm lý' },
                { value: 'Người cao tuổi', label: 'Người cao tuổi' },
                { value: 'Mẹ và bé', label: 'Mẹ và bé' },
            ]
        },
        {
            name: 'moderatorName',
            label: 'Người quản lý',
            type: 'text' as const,
            required: true
        },
        {
            name: 'description',
            label: 'Mô tả',
            type: 'textarea' as const,
            required: true,
            rows: 6
        },
        {
            name: 'status',
            label: 'Trạng thái',
            type: 'select' as const,
            required: true,
            options: [
                { value: 'active', label: 'Đang hoạt động' },
                { value: 'inactive', label: 'Tạm ngưng' },
            ]
        },
    ];

    const handleSubmit = async (values: any) => {
        try {
            message.loading({ content: 'Đang cập nhật nhóm...', key: 'update_group' });
            await communityService.updateSupportGroup(Number(params.id), values);
            message.success({ content: 'Đã cập nhật nhóm thành công!', key: 'update_group' });
            router.push(`/community/support-groups/${params.id}`);
        } catch (error) {
            console.error('Failed to update group:', error);
            message.error({ content: 'Cập nhật thất bại. Vui lòng thử lại!', key: 'update_group' });
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
                    <Link href="/community/support-groups">Nhóm hỗ trợ & Điều trị</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href={`/community/support-groups/${params.id}`}>Chi tiết nhóm</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Chỉnh sửa Nhóm Hỗ Trợ</Title>
                        <Text type="secondary">Cập nhật thông tin cấu hình cho cộng đồng #{params.id}</Text>
                    </Space>
                </Col>
                <Col>
                    <Link href={`/community/support-groups/${params.id}`}>
                        <Button icon={<ArrowLeftOutlined />}>Quay lại chi tiết</Button>
                    </Link>
                </Col>
            </Row>

            <Card variant="borderless" className="shadow-sm">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu thay đổi"
                    initialValues={group || {}}
                    columns={2}
                />
            </Card>
        </Space>
    );
}
