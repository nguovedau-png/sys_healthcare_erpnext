"use client";

import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Tag, Space, Avatar, Divider, Tabs, Input, List, Badge } from 'antd';
import { 
    PlayCircleOutlined, 
    ArrowLeftOutlined, 
    ArrowRightOutlined, 
    MessageOutlined, 
    UserOutlined, 
    VideoCameraFilled, 
    QuestionCircleOutlined,
    FileTextOutlined,
    SendOutlined
} from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function LessonDetailPage() {
    const router = useRouter();
    const params = useParams();
    const [comment, setComment] = useState('');

    const lesson = {
        id: params.lessonId,
        title: `Bài ${params.lessonId}: Cập nhật tiêu chuẩn chẩn đoán Viêm khớp dạng thấp`,
        studentCount: 1250,
        type: params.lessonId === '3' ? 'live' : 'video', // Mocking lesson 3 as a live session
        content: 'Trong phần này, chúng ta sẽ đi sâu vào các tiêu chuẩn ACR/EULAR 2010 và cách áp dụng linh hoạt trong thực hành lâm sàng tại Việt Nam. Nội dung bao gồm việc đánh giá số lượng khớp sưng đau, các xét nghiệm huyết thanh học (RF, anti-CCP), các chỉ số viêm và thời gian triệu chứng.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    };

    const qaData = [
        { author: 'BS. Nguyễn Văn A', content: 'Thưa bác sĩ, trong trường hợp bệnh nhân có RF âm tính nhưng anti-CCP dương tính mạnh thì tiên lượng thế nào?', time: '10 phút trước' },
        { author: 'BS. Lê Thị B', content: 'Bài giảng rất hay và chi tiết, cảm ơn PGS!', time: '1 giờ trước' },
    ];

    return (
        <div style={{ padding: '24px 0', maxWidth: 1400, margin: '0 auto', background: '#f5f7fa', minHeight: '100vh' }}>
            <div style={{ padding: '0 24px', marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => router.push(`/courses/${params.id}`)} style={{ borderRadius: 8 }}>
                    Quay lại khóa học
                </Button>
            </div>

            <Row gutter={[24, 24]} style={{ padding: '0 24px' }}>
                {/* Main Content Area */}
                <Col xs={24} lg={17}>
                    <Card style={{ borderRadius: 24, overflow: 'hidden', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ padding: '24px 32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <Tag color="blue" style={{ borderRadius: 100, padding: '2px 12px' }}>Chương 1: Chẩn đoán</Tag>
                                <Space>
                                    <Badge status="processing" text={<Text type="secondary"><UserOutlined /> {lesson.studentCount} học viên đang học</Text>} />
                                </Space>
                            </div>
                            <Title level={3} style={{ margin: 0, fontWeight: 800 }}>{lesson.title}</Title>
                        </div>

                        {/* Video / Live Player Area */}
                        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000' }}>
                            {lesson.type === 'live' ? (
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                    <VideoCameraFilled style={{ fontSize: 80, color: '#ff4d4f', marginBottom: 24 }} />
                                    <Title level={3} style={{ color: '#fff' }}>Buổi học đang Livestream</Title>
                                    <Button 
                                        type="primary" 
                                        danger 
                                        size="large" 
                                        shape="round" 
                                        icon={<VideoCameraFilled />} 
                                        style={{ height: 50, padding: '0 32px' }}
                                        onClick={() => router.push('/education/room')}
                                    >
                                        Tham gia lớp học trực tuyến
                                    </Button>
                                </div>
                            ) : (
                                <iframe 
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    src={lesson.videoUrl}
                                    title="Lesson Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            )}
                        </div>

                        <div style={{ padding: '32px' }}>
                            <Tabs defaultActiveKey="1" items={[
                                {
                                    key: '1',
                                    label: <span style={{ fontSize: 16, fontWeight: 600 }}><FileTextOutlined /> Nội dung bài học</span>,
                                    children: (
                                        <div style={{ paddingTop: 16 }}>
                                            <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: '#444' }}>
                                                {lesson.content}
                                            </Paragraph>
                                            <Divider />
                                            <Title level={5}>Tài liệu đính kèm</Title>
                                            <List
                                                size="small"
                                                bordered
                                                dataSource={['Slide bài giảng.pdf', 'Hướng dẫn điều trị của Bộ Y Tế.docx']}
                                                renderItem={item => <List.Item style={{ cursor: 'pointer', color: '#1890ff' }}><Text underline>{item}</Text></List.Item>}
                                            />
                                        </div>
                                    )
                                },
                                {
                                    key: '2',
                                    label: <span style={{ fontSize: 16, fontWeight: 600 }}><QuestionCircleOutlined /> Hỏi đáp (Q&A)</span>,
                                    children: (
                                        <div style={{ paddingTop: 16 }}>
                                            <div style={{ marginBottom: 32 }}>
                                                <TextArea 
                                                    rows={3} 
                                                    placeholder="Đặt câu hỏi cho giảng viên..." 
                                                    value={comment}
                                                    onChange={e => setComment(e.target.value)}
                                                    style={{ borderRadius: 12, marginBottom: 12 }}
                                                />
                                                <Button type="primary" icon={<SendOutlined />} style={{ borderRadius: 8 }}>Gửi câu hỏi</Button>
                                            </div>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={qaData}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <List.Item.Meta
                                                            avatar={<Avatar icon={<UserOutlined />} />}
                                                            title={<Space><Text strong>{item.author}</Text><Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text></Space>}
                                                            description={item.content}
                                                        />
                                                    </List.Item>
                                                )}
                                            />
                                        </div>
                                    )
                                }
                            ]} />
                        </div>
                    </Card>
                </Col>

                {/* Sidebar Navigation */}
                <Col xs={24} lg={7}>
                    <Card title={<span style={{ fontWeight: 700 }}>Danh sách bài học</span>} style={{ borderRadius: 24, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <div 
                                    key={i} 
                                    onClick={() => router.push(`/courses/${params.id}/lessons/${i}`)}
                                    style={{ 
                                        padding: '12px 16px', 
                                        borderRadius: 12, 
                                        background: params.lessonId === String(i) ? '#e6f7ff' : '#fff',
                                        border: params.lessonId === String(i) ? '1px solid #91d5ff' : '1px solid #f0f0f0',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        {i === 3 ? <VideoCameraFilled style={{ color: '#ff4d4f' }} /> : <PlayCircleOutlined style={{ color: params.lessonId === String(i) ? '#1890ff' : '#bfbfbf' }} />}
                                        <Text strong={params.lessonId === String(i)} style={{ fontSize: 13 }}>
                                            Bài {i}: {i === 3 ? '[LIVE] ' : ''} Cập nhật chẩn đoán...
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Divider />

                        <div style={{ display: 'flex', gap: 12 }}>
                            <Button block disabled={params.lessonId === '1'} icon={<ArrowLeftOutlined />}>Bài trước</Button>
                            <Button block type="primary" disabled={params.lessonId === '5'} icon={<ArrowRightOutlined />} iconPosition="end">Bài kế tiếp</Button>
                        </div>
                    </Card>

                    <Card style={{ marginTop: 24, borderRadius: 24, background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)', border: 'none', color: '#fff' }}>
                        <Title level={5} style={{ color: '#fff' }}>Hỗ trợ học tập</Title>
                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Bạn gặp khó khăn khi học? Hãy liên hệ với đội ngũ hỗ trợ chuyên môn.</Text>
                        <Button block ghost style={{ marginTop: 16, borderRadius: 8 }}>Nhắn tin hỗ trợ</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
