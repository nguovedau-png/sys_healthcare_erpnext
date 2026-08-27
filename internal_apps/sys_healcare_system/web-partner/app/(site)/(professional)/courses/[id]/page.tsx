"use client";

import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Tag, Space, Avatar, Divider, message, Breadcrumb } from 'antd';
import { BookOutlined, ClockCircleOutlined, UserOutlined, SafetyCertificateFilled, ShareAltOutlined, HeartOutlined, HeartFilled, PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';

const { Title, Text, Paragraph } = Typography;

export default function CourseDetailPage() {
    const router = useRouter();
    const params = useParams();
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // Mock data matching ID
    const course = { 
        id: params?.id || 1, 
        title: 'Cập nhật điều trị Viêm khớp dạng thấp 2026', 
        instructor: 'PGS.TS Nguyễn Văn Chuyên', 
        category: 'CME', 
        points: 4, 
        duration: '2 giờ', 
        image: 'https://via.placeholder.com/800x400?text=CME+Khop',
        description: 'Khóa học cung cấp các cập nhật mới nhất về chẩn đoán và phác đồ điều trị Viêm khớp dạng thấp theo tiêu chuẩn của Bộ Y Tế. Học viên sẽ được trang bị kỹ năng nhận diện sớm, đánh giá mức độ bệnh và lựa chọn thuốc sinh học phù hợp.',
        curriculum: [
            'Phần 1: Tổng quan và chẩn đoán sớm Viêm khớp dạng thấp',
            'Phần 2: Cập nhật phác đồ điều trị nền (DMARDs cơ bản)',
            'Phần 3: Ứng dụng thuốc sinh học trong điều trị nhắm đích',
            'Phần 4: Quản lý tác dụng phụ và theo dõi bệnh nhân dài hạn',
            'Bài kiểm tra cuối khóa (Trắc nghiệm 20 câu)'
        ]
    };

    const handleRegister = () => {
        setIsRegistered(true);
        message.success('Đăng ký khóa học thành công! Bạn có thể bắt đầu học ngay.');
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        message.info('Đã sao chép liên kết để chia sẻ!');
    };

    return (
        <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto', paddingBottom: 60 }}>
            <Breadcrumb style={{ marginBottom: 24 }}>
                <Breadcrumb.Item><a onClick={() => router.push('/courses')}>Khóa học</a></Breadcrumb.Item>
                <Breadcrumb.Item>{course.title}</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={32}>
                {/* Left Content */}
                <Col xs={24} lg={16}>
                    <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
                        <img src={course.image} alt="Course cover" style={{ width: '100%', display: 'block' }} />
                    </div>

                    <Title level={2}>{course.title}</Title>
                    
                    <div style={{ marginBottom: 24 }}>
                        <Tag color="orange" style={{ fontSize: 14, padding: '4px 12px' }}>{course.category}</Tag>
                        {course.points > 0 && (
                            <Tag color="green" icon={<SafetyCertificateFilled />} style={{ fontSize: 14, padding: '4px 12px' }}>+{course.points} Điểm CME</Tag>
                        )}
                    </div>

                    <Divider />

                    <Title level={4}>Giới thiệu khóa học</Title>
                    <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                        {course.description}
                    </Paragraph>

                    <div style={{ background: '#f9f9f9', padding: 24, borderRadius: 16 }}>
                        {course.curriculum.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => isRegistered && router.push(`/courses/${course.id}/lessons/${index + 1}`)}
                                style={{ 
                                    padding: '16px 12px', 
                                    borderBottom: index !== course.curriculum.length - 1 ? '1px solid #e8e8e8' : 'none', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    cursor: isRegistered ? 'pointer' : 'default',
                                    borderRadius: 8,
                                    transition: 'all 0.3s'
                                }}
                                className={isRegistered ? "hover:bg-blue-50" : ""}
                            >
                                <Space size="middle">
                                    <div style={{ width: 32, height: 32, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                        <PlayCircleOutlined style={{ color: '#1890ff', fontSize: 16 }} />
                                    </div>
                                    <Text style={{ fontSize: 15, fontWeight: 500 }}>{item}</Text>
                                </Space>
                                {isRegistered && <Tag color="blue" ghost>Học ngay</Tag>}
                            </div>
                        ))}
                    </div>
                </Col>

                {/* Right Sticky Card */}
                <Col xs={24} lg={8}>
                    <Card style={{ position: 'sticky', top: 24, borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <Title level={3} style={{ color: '#ff4d4f', margin: 0 }}>Miễn phí</Title>
                        </div>

                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text type="secondary"><ClockCircleOutlined /> Thời lượng</Text>
                                <Text strong>{course.duration}</Text>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text type="secondary"><SafetyCertificateFilled /> Chứng chỉ</Text>
                                <Text strong>Cấp CME điện tử</Text>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text type="secondary"><UserOutlined /> Giảng viên</Text>
                                <Text strong>{course.instructor}</Text>
                            </div>

                            <Divider style={{ margin: '12px 0' }} />

                            {isRegistered ? (
                                <Button type="primary" size="large" block icon={<CheckCircleOutlined />} style={{ background: '#52c41a', borderColor: '#52c41a' }} onClick={() => router.push(`/courses/${course.id}/lessons/1`)}>
                                    Vào lớp học ngay
                                </Button>
                            ) : (
                                <Button type="primary" size="large" block onClick={handleRegister}>
                                    Đăng ký học
                                </Button>
                            )}

                            <div style={{ display: 'flex', gap: 16 }}>
                                <Button 
                                    size="large" 
                                    block 
                                    icon={isLiked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />} 
                                    onClick={() => setIsLiked(!isLiked)}
                                >
                                    Yêu thích
                                </Button>
                                <Button size="large" block icon={<ShareAltOutlined />} onClick={handleShare}>
                                    Chia sẻ
                                </Button>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
