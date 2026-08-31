"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Button, Space, Card, Breadcrumb, Row, Col, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import FormBuilder from '@/components/admin/FormBuilder';
import communityService, { QAQuestion } from '@/services/community.service';

const { Title, Text } = Typography;

export default function EditQA() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [qa, setQA] = useState<QAQuestion | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchQA = async () => {
        try {
            setLoading(true);
            const data = await communityService.getQAQuestion(Number(params.id));
            setQA(data);
        } catch (error) {
            console.error('Failed to fetch QA', error);
            message.error('Không thể tải thông tin câu hỏi');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchQA();
        }
    }, [params.id]);

    const fields = [
        {
            name: 'question',
            label: 'Câu hỏi tóm tắt',
            type: 'text' as const,
            required: true
        },
        {
            name: 'category',
            label: 'Chuyên khoa',
            type: 'select' as const,
            required: true,
            options: [
                { value: 'Tim mạch', label: 'Tim mạch' },
                { value: 'Tiêu hóa', label: 'Tiêu hóa' },
                { value: 'Da liễu', label: 'Da liễu' },
                { value: 'Nội khoa', label: 'Nội khoa' },
                { value: 'Nhi khoa', label: 'Nhi khoa' },
                { value: 'Sản phụ khoa', label: 'Sản phụ khoa' },
            ]
        },
        {
            name: 'content',
            label: 'Nội dung chi tiết',
            type: 'textarea' as const,
            required: true,
            rows: 10
        },
        {
            name: 'status',
            label: 'Trạng thái',
            type: 'select' as const,
            required: true,
            options: [
                { value: 'approved', label: 'Đã duyệt' },
                { value: 'pending', label: 'Chờ duyệt' },
                { value: 'spam', label: 'Spam' },
            ]
        },
    ];

    const handleSubmit = async (values: any) => {
        try {
            message.loading({ content: 'Đang cập nhật câu hỏi...', key: 'update_qa' });
            await communityService.updateQAQuestion(Number(params.id), values);
            message.success({ content: 'Đã cập nhật câu hỏi thành công!', key: 'update_qa' });
            router.push(`/community/qa/${params.id}`);
        } catch (error) {
            console.error('Failed to update QA:', error);
            message.error({ content: 'Cập nhật thất bại. Vui lòng thử lại!', key: 'update_qa' });
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
                    <Link href="/community/qa">Hỏi đáp chuyên gia</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href={`/community/qa/${params.id}`}>Chi tiết câu hỏi</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Chỉnh sửa Câu hỏi</Title>
                        <Text type="secondary">Cập nhật nội dung câu hỏi #{params.id} từ người dùng</Text>
                    </Space>
                </Col>
                <Col>
                    <Link href={`/community/qa/${params.id}`}>
                        <Button icon={<ArrowLeftOutlined />}>Quay lại chi tiết</Button>
                    </Link>
                </Col>
            </Row>

            <Card variant="outlined" className="shadow-sm">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu thay đổi"
                    initialValues={qa || {}}
                    columns={1}
                />
            </Card>
        </Space>
    );
}
