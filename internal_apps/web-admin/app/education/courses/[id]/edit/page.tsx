"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Button, Space, Card, Breadcrumb, Row, Col, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import FormBuilder from '@/components/admin/FormBuilder';
import { educationService, Course, Lecturer } from '@/services/education.service';

const { Title, Text } = Typography;

export default function EditCoursePage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [courseData, lecturersData] = await Promise.all([
                    educationService.getCourse(params.id),
                    educationService.getLecturers()
                ]);
                setCourse(courseData);
                setLecturers(lecturersData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                message.error('Không thể tải thông tin khóa học');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    const fields = [
        {
            name: 'name',
            label: 'Tên khóa học',
            type: 'text' as const,
            required: true,
            placeholder: 'Ví dụ: Cập nhật điều trị tăng huyết áp 2025'
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
            name: 'status',
            label: 'Trạng thái',
            type: 'select' as const,
            required: true,
            options: [
                { value: 'active', label: 'Đang hoạt động' },
                { value: 'inactive', label: 'Tạm ngưng' },
                { value: 'draft', label: 'Nháp' },
            ]
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
            setSubmitting(true);
            message.loading({ content: 'Đang cập nhật khóa học...', key: 'update_course' });
            await educationService.updateCourse(params.id, {
                ...values,
                credits: Number(values.credits),
                price: Number(values.price)
            });
            message.success({ content: 'Đã cập nhật khóa học thành công!', key: 'update_course' });
            router.push(`/education/courses/${params.id}`);
        } catch (error) {
            console.error('Failed to update course:', error);
            message.error({ content: 'Không thể cập nhật khóa học. Vui lòng thử lại!', key: 'update_course' });
        } finally {
            setSubmitting(false);
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
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/education/courses">Khóa học CME/CPE</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
                <Breadcrumb.Item>{course?.name}</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Chỉnh sửa Khóa học</Title>
                        <Text type="secondary">Cập nhật nội dung chương trình đào tạo cho mã: {course?.code}</Text>
                    </Space>
                </Col>
                <Col>
                    <Link href={`/education/courses/${params.id}`}>
                        <Button icon={<ArrowLeftOutlined />}>Quay lại chi tiết</Button>
                    </Link>
                </Col>
            </Row>

            <Card variant="outlined" className="shadow-sm">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Lưu thay đổi"
                    initialValues={course}
                    loading={submitting}
                    columns={2}
                />
            </Card>
        </Space>
    );
}
