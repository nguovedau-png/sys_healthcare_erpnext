"use client";
import React from 'react';
import { Button, Card, Row, Col, Tag } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftOutlined, CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, UserOutlined, DollarOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

export default function BookingDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const booking = {
        id: params.id,
        doctor: 'BS. CKII Nguyễn Văn A',
        specialty: 'Tim mạch',
        clinic: 'Phòng khám đa khoa Quốc tế',
        address: '201 Nguyễn Thị Minh Khai, Q1, TP.HCM',
        date: '20/12/2024',
        time: '09:30',
        status: 'confirmed',
        price: '500,000 đ',
        patientName: 'Trần Văn B'
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} style={{ padding: 8 }} />
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Chi tiết lịch hẹn</h1>
            </div>

            <Card style={{ borderRadius: 9, marginBottom: 24, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, background: '#d9f7be', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                        <Tag color="green" style={{ fontSize: 20, padding: '4px 12px' }}>✓</Tag>
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#389e0d', marginBottom: 4 }}>Đặt lịch thành công</h2>
                    <p style={{ color: '#389e0d' }}>Mã đặt chỗ: <span style={{ fontWeight: 700 }}>{booking.id}</span></p>
                </div>
            </Card>

            <Card style={{ borderRadius: 9, marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Thông tin bác sĩ</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 64, height: 64, background: '#e6f7ff', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                    </div>
                    <div>
                        <p style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{booking.doctor}</p>
                        <p style={{ color: '#8c8c8c' }}>{booking.specialty} • {booking.clinic}</p>
                    </div>
                </div>
            </Card>

            <Card style={{ borderRadius: 9, marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Thời gian & Địa điểm</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8c8c8c' }}>
                        <CalendarOutlined />
                    </div>
                    <div>
                        <p style={{ fontSize: 12, color: '#8c8c8c' }}>Ngày khám</p>
                        <p style={{ fontWeight: 700 }}>{booking.date}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8c8c8c' }}>
                        <ClockCircleOutlined />
                    </div>
                    <div>
                        <p style={{ fontSize: 12, color: '#8c8c8c' }}>Giờ khám</p>
                        <p style={{ fontWeight: 700 }}>{booking.time}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 40, height: 40, background: '#f5f5f5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8c8c8c' }}>
                        <EnvironmentOutlined />
                    </div>
                    <div>
                        <p style={{ fontSize: 12, color: '#8c8c8c' }}>Địa chỉ</p>
                        <p style={{ fontWeight: 700 }}>{booking.address}</p>
                    </div>
                </div>
            </Card>

            <Card style={{ borderRadius: 9, marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ color: '#595959' }}>Bệnh nhân</span>
                    <span style={{ fontWeight: 700 }}>{booking.patientName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#595959' }}>Phí khám</span>
                    <span style={{ fontWeight: 700, color: '#1677ff' }}>{booking.price}</span>
                </div>
            </Card>

            <Row gutter={16}>
                <Col span={12}>
                    <Button block icon={<EditOutlined />} style={{ borderRadius: 9 }}>Dời lịch</Button>
                </Col>
                <Col span={12}>
                    <Button block icon={<CloseOutlined />} danger style={{ borderRadius: 9 }}>Hủy lịch</Button>
                </Col>
            </Row>
        </div>
    );
}