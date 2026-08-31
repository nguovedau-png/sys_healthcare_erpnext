"use client";
import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Tag, Progress, Typography } from 'antd';
import Link from 'next/link';
import { ArrowRightOutlined, PlayCircleOutlined, DownloadOutlined } from '@ant-design/icons';

export default function PharmacyEducationPage() {
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        setEnrollments([
            { id: '1', courseId: '1', status: 'completed', progress: 100, course: { name: 'CME Nội khoa', provider: 'BV Bạch Mai', credits: 5, thumbnail: '' } },
            { id: '2', courseId: '2', status: 'InProgress', progress: 45, course: { name: 'CME Ngoại khoa', provider: 'BV Chợ Rẫy', credits: 3, thumbnail: '' } },
        ]);
    }, []);

    const totalCPE = enrollments.reduce((sum, en) => sum + (en.course?.credits || 0), 0);
    const completedCount = enrollments.filter(en => en.status === 'completed').length;
    const inProgressCount = enrollments.filter(en => en.status === 'InProgress').length;

    const getStatusColor = (status: string) => {
        if (status === 'completed') return 'green';
        if (status === 'InProgress') return 'blue';
        return 'default';
    };

    const getStatusText = (status: string) => {
        if (status === 'completed') return 'Hoàn thành';
        if (status === 'InProgress') return 'Đang học';
        return status;
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Đào tạo & CPE</h1>
                    <p style={{ color: '#8c8c8c', margin: 0 }}>Các khóa học đã tham gia và chứng chỉ đào tạo liên tục</p>
                </div>
                <Link href="/education">
                    <Button icon={<ArrowRightOutlined />}>Tìm khóa học mới</Button>
                </Link>
            </div>

            <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                <Col xs={24} md={8}>
                    <Card>
                        <p style={{ color: '#1677ff', fontWeight: 600, fontSize: 14 }}>Tổng tín chỉ CPE</p>
                        <h3 style={{ fontSize: 32, fontWeight: 900, margin: '8px 0 0' }}>{totalCPE.toFixed(1)}</h3>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <p style={{ color: '#52c41a', fontWeight: 600, fontSize: 14 }}>Khóa hoàn thành</p>
                        <h3 style={{ fontSize: 32, fontWeight: 900, margin: '8px 0 0' }}>{completedCount}</h3>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card>
                        <p style={{ color: '#722ed1', fontWeight: 600, fontSize: 14 }}>Đang học</p>
                        <h3 style={{ fontSize: 32, fontWeight: 900, margin: '8px 0 0' }}>{inProgressCount}</h3>
                    </Card>
                </Col>
            </Row>

            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Khóa học của tôi</h2>
            
            {loading ? (
                <Row gutter={[16, 16]}>
                    {Array.from({ length: 2 }).map((_, i) => (
                        <Col key={i} xs={24} md={12}>
                            <Card loading>...</Card>
                        </Col>
                    ))}
                </Row>
            ) : enrollments.length > 0 ? (
                <Row gutter={[16, 16]}>
                    {enrollments.map((en) => (
                        <Col key={en.id} xs={24} md={12}>
                            <Card hoverable style={{ borderRadius: 9 }}>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    <div style={{ width: 96, height: 96, borderRadius: 9, background: '#f5f5f5', flexShrink: 0 }} />
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <Tag color="blue">{en.course?.credits || 0} CPE</Tag>
                                                <Tag color={getStatusColor(en.status)}>{getStatusText(en.status)}</Tag>
                                            </div>
                                            <Link href={`/education/${en.courseId}`}>
                                                <h3 style={{ fontWeight: 600, marginTop: 8, fontSize: 16 }}>{en.course?.name}</h3>
                                            </Link>
                                            <p style={{ fontSize: 12, color: '#8c8c8c' }}>{en.course?.provider}</p>
                                        </div>
                                        <div style={{ marginTop: 12 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8c8c8c', marginBottom: 4 }}>
                                                <span>Tiến độ</span>
                                                <span>{en.progress}%</span>
                                            </div>
                                            <Progress percent={en.progress} size="small" status={en.status === 'completed' ? 'success' : 'active'} />
                                            {en.status === 'completed' ? (
                                                <Button size="small" icon={<DownloadOutlined />} block style={{ marginTop: 12 }}>Tải chứng chỉ</Button>
                                            ) : (
                                                <Link href={`/education/${en.courseId}`}>
                                                    <Button size="small" type="primary" icon={<PlayCircleOutlined />} block style={{ marginTop: 12 }}>Tiếp tục học</Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Card style={{ textAlign: 'center', padding: 24 }}>
                    <p style={{ color: '#8c8c8c' }}>Bạn chưa tham gia khóa học nào.</p>
                </Card>
            )}
        </div>
    );
}