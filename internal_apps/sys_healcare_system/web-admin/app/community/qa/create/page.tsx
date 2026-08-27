"use client";

import React from 'react';
import { Typography, Button, Space, Card, Breadcrumb, Row, Col, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormBuilder from '@/components/admin/FormBuilder';
import communityService from '@/services/community.service';

const { Title, Text } = Typography;

export default function CreateQA() {
    const router = useRouter();

    const fields = [
        {
            name: 'question',
            label: 'Câu hỏi tóm tắt',
            type: 'text' as const,
            required: true,
            placeholder: 'Ví dụ: Làm thế nào để giảm HA tự nhiên?'
        },
        {
            name: 'category',
            label: 'Chuyên khoa / Danh mục',
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
            rows: 8,
            placeholder: 'Mô tả chi tiết tình trạng hoặc thắc mắc của người bệnh...'
        },
        {
            name: 'status',
            label: 'Trạng thái xử lý',
            type: 'select' as const,
            required: true,
            defaultValue: 'pending',
            options: [
                { value: 'approved', label: 'Đã duyệt (Công khai)' },
                { value: 'pending', label: 'Chờ duyệt' },
                { value: 'spam', label: 'Spam' },
            ]
        },
    ];

    const handleSubmit = async (values: any) => {
        try {
            message.loading({ content: 'Đang tạo câu hỏi...', key: 'create_qa' });
            await communityService.createQAQuestion({
                ...values,
                askedById: 'admin', // Simulation
                askedByName: 'Quản trị viên',
                views: 0
            });
            message.success({ content: 'Đã tạo câu hỏi chuyên gia thành công!', key: 'create_qa' });
            router.push('/community/qa');
        } catch (error) {
            console.error('Failed to create QA:', error);
            message.error({ content: 'Không thể tạo câu hỏi. Vui lòng thử lại!', key: 'create_qa' });
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/community/qa">Hỏi đáp chuyên gia</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tạo câu hỏi mới</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Thêm Câu hỏi Mới</Title>
                        <Text type="secondary">Tạo câu hỏi mới để kết nối người bệnh với chuyên gia y tế</Text>
                    </Space>
                </Col>
                <Col>
                    <Link href="/community/qa">
                        <Button icon={<ArrowLeftOutlined />}>Quay lại danh sách</Button>
                    </Link>
                </Col>
            </Row>

            <Card variant="borderless" className="shadow-sm">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu câu hỏi"
                    columns={1}
                />
            </Card>
        </Space>
    );
}
