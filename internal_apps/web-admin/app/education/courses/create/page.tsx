"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Button, Space, Card, Breadcrumb, Row, Col, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormBuilder from '@/components/admin/FormBuilder';
import { educationService, Lecturer } from '@/services/education.service';

const { Title, Text } = Typography;

export default function CreateCoursePage() {
    const router = useRouter();
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const data = await educationService.getLecturers();
                setLecturers(data);
            } catch (error) {
                console.error('Failed to fetch lecturers:', error);
            }
        };
        fetchLecturers();
    }, []);

    const fields = [
        {
            name: 'name',
            label: 'Tên khóa học',
            type: 'text' as const,
            required: true,
            placeholder: 'Ví dụ: Cập nhật điều trị tăng huyết áp 2025'
        },
        {
            name: 'code',
            label: 'Mã chương trình (Code)',
            type: 'text' as const,
            required: true,
            placeholder: 'Ví dụ: CME-2025-001'
        },
        {
            name: 'type',
            label: 'Loại hình đào tạo',
            type: 'select' as const,
            required: true,
            options: [
                { value: 'CME', label: 'CME - Đào tạo Y khoa liên tục' },
                { value: 'CPE', label: 'CPE - Đào tạo Dược liên tục' },
                { value: 'Workshop', label: 'Hội thảo / Workshop' },
            ]
        },
        {
            name: 'provider',
            label: 'Đơn vị tổ chức',
            type: 'text' as const,
            required: true,
            placeholder: 'Bệnh viện / Trường / Hội sở'
        },
        {
            name: 'credits',
            label: 'Số tín chỉ / Giờ đào tạo',
            type: 'number' as const,
            required: true,
            placeholder: '4'
        },
        {
            name: 'lecturerId',
            label: 'Giảng viên phụ trách',
            type: 'select' as const,
            required: true,
            options: lecturers.map(l => ({ value: l.id, label: l.name }))
        },
        {
            name: 'price',
            label: 'Học phí (VNĐ)',
            type: 'number' as const,
            required: true,
            placeholder: '0 cho miễn phí'
        },
        {
            name: 'description',
            label: 'Mô tả chi tiết',
            type: 'textarea' as const,
            required: true,
            rows: 6,
            placeholder: 'Nội dung chi tiết, diễn giả, lịch trình...',
            colSpan: 24
        },
    ];

    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            message.loading({ content: 'Đang tạo khóa học...', key: 'create_course' });
            await educationService.createCourse({
                ...values,
                credits: Number(values.credits),
                price: Number(values.price),
                status: 'active',
                students: 0
            });
            message.success({ content: 'Đã tạo khóa học mới thành công!', key: 'create_course' });
            router.push('/education/courses');
        } catch (error) {
            console.error('Failed to create course:', error);
            message.error({ content: 'Không thể tạo khóa học. Vui lòng thử lại!', key: 'create_course' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/education/courses">Khóa học CME/CPE</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tạo mới</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Tạo Khóa học Mới</Title>
                        <Text type="secondary">Thiết lập chương trình đào tạo y khoa liên tục cho nhân viên y tế</Text>
                    </Space>
                </Col>
                <Col>
                    <Link href="/education/courses">
                        <Button icon={<ArrowLeftOutlined />}>Quay lại danh sách</Button>
                    </Link>
                </Col>
            </Row>

            <Card variant="outlined" className="shadow-sm">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Tạo khóa học ngay"
                    loading={loading}
                    columns={2}
                />
            </Card>
        </Space>
    );
}
