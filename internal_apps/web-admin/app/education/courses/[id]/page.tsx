"use client";

import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    Space,
    Card,
    Tag,
    Breadcrumb,
    Row,
    Col,
    Divider,
    Descriptions,
    Statistic,
    Spin,
    Empty,
    List,
    Avatar,
    Tooltip,
    Modal,
    message
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    BookOutlined,
    UserOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    CheckCircleOutlined,
    QuestionCircleOutlined,
    PlayCircleOutlined,
    MedicineBoxOutlined
} from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { educationService, Course } from '@/services/education.service';
import StatusBadge from '@/components/admin/StatusBadge';

const { Title, Text, Paragraph } = Typography;

export default function CourseDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const data = await educationService.getCourse(params.id);
                setCourse(data);
            } catch (error) {
                console.error('Failed to fetch course:', error);
                message.error('Không thể tải thông tin khóa học');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [params.id]);

    const handleDelete = () => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa khóa học này?',
            content: 'Hành động này không thể hoàn tác và sẽ ảnh hưởng đến các học viên đã đăng ký.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await educationService.deleteCourse(params.id);
                    message.success('Đã xóa khóa học thành công');
                    router.push('/education/courses');
                } catch (error) {
                    message.error('Không thể xóa khóa học');
                }
            },
        });
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải chi tiết khóa học..." />
            </div>
        );
    }

    if (!course) {
        return (
            <Card>
                <Empty description="Không tìm thấy thông tin khóa học" />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => router.push('/education/courses')}>
                        Quay lại danh sách
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/education/courses">Khóa học CME/CPE</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{course.name}</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col flex="1">
                    <Space orientation="vertical" size={0}>
                        <Space align="center">
                            <Title level={2} style={{ margin: 0 }}>{course.name}</Title>
                            <StatusBadge status={course.status as any} />
                        </Space>
                        <Text type="secondary">Cung cấp bởi {course.provider} • Mã: {course.code}</Text>
                    </Space>
                </Col>
                <Col>
                    <Space size="middle">
                        <Link href={`/education/courses/${params.id}/edit`}>
                            <Button icon={<EditOutlined />}>Chỉnh sửa</Button>
                        </Link>
                        <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>Xóa khóa học</Button>
                        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => router.push('/education/courses')}>
                            Quay lại
                        </Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={16}>
                    <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
                        <Card variant="outlined" className="shadow-sm">
                            <Title level={4}>Mô tả chương trình</Title>
                            <Paragraph>
                                {course.description || 'Chưa có mô tả chi tiết cho khóa học này. Chương trình đào tạo bao gồm các cập nhật mới nhất về kiến thức y khoa chuyên sâu và thực hành lâm sàng.'}
                            </Paragraph>
                        </Card>

                        <Card variant="outlined" className="shadow-sm">
                            <Title level={4}>Cấu trúc khóa học</Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={course.lessons || []}
                                locale={{ emptyText: 'Chưa có bài học nào được tạo.' }}
                                renderItem={(item, index) => (
                                    <List.Item
                                        actions={[
                                            <Button type="link" icon={<PlayCircleOutlined />}>Xem bài giảng</Button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>{index + 1}</Avatar>}
                                            title={item.title}
                                            description={`Thứ tự: ${item.order}`}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Space>
                </Col>
                <Col span={8}>
                    <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
                        <Card variant="outlined" className="shadow-sm">
                            <Title level={4}>Thông tin tóm tắt</Title>
                            <Divider style={{ margin: '12px 0' }} />
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Statistic title="Học phí" value={course.price} suffix="đ" prefix={<DollarOutlined />} valueStyle={{ fontSize: '18px' }} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Tín chỉ" value={course.credits} suffix="giờ" prefix={<ClockCircleOutlined />} valueStyle={{ fontSize: '18px' }} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Học viên" value={course.students || 0} prefix={<UserOutlined />} valueStyle={{ fontSize: '18px' }} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Bài học" value={course.lessons?.length || 0} prefix={<BookOutlined />} valueStyle={{ fontSize: '18px' }} />
                                </Col>
                            </Row>
                        </Card>

                        <Card variant="outlined" className="shadow-sm">
                            <Title level={4}>Giảng viên phụ trách</Title>
                            <Divider style={{ margin: '12px 0' }} />
                            {course.lecturer ? (
                                <Space align="start">
                                    <Avatar size={64} src={course.lecturer.avatar} icon={<UserOutlined />} />
                                    <div>
                                        <Text strong style={{ fontSize: '16px', display: 'block' }}>{course.lecturer.name}</Text>
                                        <Text type="secondary">{course.lecturer.title}</Text>
                                        <br />
                                        <Tag color="blue" style={{ marginTop: '8px' }}>{course.lecturer.specialty}</Tag>
                                    </div>
                                </Space>
                            ) : (
                                <Empty description="Chưa gán giảng viên" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                        </Card>

                        <Card variant="outlined" className="shadow-sm">
                            <Title level={4}>Kiểm tra & Đánh giá</Title>
                            <Divider style={{ margin: '12px 0' }} />
                            <List
                                dataSource={course.quizzes || []}
                                locale={{ emptyText: 'Chưa có bài trắc nghiệm.' }}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Space>
                                            <QuestionCircleOutlined style={{ color: '#faad14' }} />
                                            <Text>{item.title}</Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Space>
                </Col>
            </Row>
        </Space>
    );
}
