"use client";

import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    Space,
    Card,
    Avatar,
    Row,
    Col,
    Breadcrumb,
    Divider,
    Tag,
    Tooltip,
    message,
    Spin,
    Empty
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    UserOutlined,
    BookOutlined,
    ProfileOutlined,
    MedicineBoxOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { educationService, Lecturer } from '@/services/education.service';

const { Title, Text, Paragraph } = Typography;

export default function LecturerListPage() {
    const router = useRouter();
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                setLoading(true);
                const data = await educationService.getLecturers();
                setLecturers(data);
            } catch (error) {
                console.error('Failed to fetch lecturers:', error);
                message.error('Không thể tải danh sách giảng viên');
            } finally {
                setLoading(false);
            }
        };
        fetchLecturers();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải danh sách chuyên gia..." />
            </div>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý Giảng viên</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Hội đồng Giảng viên & Chuyên gia</Title>
                        <Text type="secondary">Quản lý đội ngũ giảng viên, bác sĩ và chuyên gia tham gia giảng dạy CME/CPE</Text>
                    </Space>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => message.info('Chức năng thêm giảng viên đang được phát triển')}
                    >
                        Thêm giảng viên mới
                    </Button>
                </Col>
            </Row>

            {lecturers.length > 0 ? (
                <Row gutter={[24, 24]}>
                    {lecturers.map((lecturer) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={lecturer.id}>
                            <Card
                                hoverable
                                className="shadow-sm"
                                actions={[
                                    <Tooltip title="Xem hồ sơ" key="profile">
                                        <ProfileOutlined />
                                    </Tooltip>,
                                    <Tooltip title="Gán khóa học" key="assign">
                                        <BookOutlined />
                                    </Tooltip>,
                                    <Tooltip title="Chỉnh sửa" key="edit">
                                        <EditOutlined />
                                    </Tooltip>
                                ]}
                            >
                                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                    <Avatar
                                        size={100}
                                        src={lecturer.avatar}
                                        icon={!lecturer.avatar && <UserOutlined />}
                                        style={{ marginBottom: '16px', border: '4px solid #f0f2f5' }}
                                    />
                                    <Title level={4} style={{ margin: 0 }}>{lecturer.name}</Title>
                                    <Space orientation="vertical" size={2}>
                                        <Text type="secondary" strong>{lecturer.title}</Text>
                                        <Tag color="blue" icon={<MedicineBoxOutlined />}>{lecturer.specialty}</Tag>
                                    </Space>
                                </div>
                                <Divider style={{ margin: '12px 0' }} />
                                <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ fontSize: '13px', textAlign: 'center' }}>
                                    {lecturer.bio || 'Chuyên gia y tế giàu kinh nghiệm trong lĩnh vực đào tạo và thực hành lâm sàng.'}
                                </Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Card>
                    <Empty description="Chưa có giảng viên nào được khởi tạo." />
                </Card>
            )}
        </Space>
    );
}
