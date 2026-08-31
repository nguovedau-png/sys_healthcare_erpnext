"use client";
import React from 'react';
import Link from 'next/link';
import { Tag, Button, Card, Row, Col, Typography, Space, Statistic, Carousel } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, CalendarOutlined, ExperimentOutlined, HeartFilled, MessageOutlined, UserOutlined, GlobalOutlined, SafetyCertificateOutlined, MedicineBoxOutlined, ShopOutlined, ReadOutlined, TeamOutlined, BookOutlined, BarChartOutlined, SettingOutlined, GiftOutlined, FileTextOutlined, RiseOutlined } from '@ant-design/icons';
const { Text } = Typography;

const StatCard = ({ title, value, icon, color, trend }: any) => (
    <Card className="ehr-card" bodyStyle={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, background: '#f0f5ff', color: '#0050b3' }}>
                {icon}
            </div>
            <Tag color={trend >= 0 ? 'success' : 'error'} bordered={false} style={{ borderRadius: 2 }}>
                {trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(trend)}%
            </Tag>
        </div>
        <Statistic
            title={<Text style={{ fontSize: 11, fontWeight: 700, color: '#8c8c8c', textTransform: 'uppercase' }}>{title}</Text>}
            value={value}
            valueStyle={{ fontSize: 28, fontWeight: 700, color: '#001529' }}
        />
    </Card>
);

const QuickCard = ({ item }: { item: any }) => (
    <Link href={item.link}>
        <Card hoverable className="ehr-card" bodyStyle={{ padding: '20px 12px', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, margin: '0 auto 12px', background: '#f0f5ff', color: '#0050b3' }}>
                {item.icon}
            </div>
            <Text style={{ fontSize: 12, fontWeight: 600, color: '#001529' }}>{item.title}</Text>
        </Card>
    </Link>
);

const QUICK_ACCESS = [
    { title: 'Y vụ & EMR', icon: <MedicineBoxOutlined />, link: '/emr' },
    { title: 'Nhà thuốc', icon: <ShopOutlined />, link: '/pharmacy' },
    { title: 'Lịch hẹn', icon: <CalendarOutlined />, link: '/bookings' },
    { title: 'Đặt số thứ tự', icon: <TeamOutlined />, link: '/queues' },
    { title: 'Đào tạo CME', icon: <ReadOutlined />, link: '/education' },
    { title: 'Tuyển dụng', icon: <TeamOutlined />, link: '/jobs' },
    { title: 'Tài chính', icon: <RiseOutlined />, link: '/revenue' },
    { title: 'Xét nghiệm', icon: <ExperimentOutlined />, link: '/lab-orders' },
    { title: 'Thiết bị y tế', icon: <SafetyCertificateOutlined />, link: '/equipment' },
    { title: 'Cộng đồng', icon: <GlobalOutlined />, link: '/community' },
    { title: 'Sự kiện / CME', icon: <CalendarOutlined />, link: '/events' },
    { title: 'Báo cáo', icon: <BarChartOutlined />, link: '/reports' },
    { title: 'Kiến thức SP', icon: <BookOutlined />, link: '/product-knowledge' },
    { title: 'Cài đặt', icon: <SettingOutlined />, link: '/settings' },
    { title: 'Loyalty', icon: <GiftOutlined />, link: '/loyalty' },
    { title: 'Bài viết', icon: <FileTextOutlined />, link: '/posts' },
    { title: 'Chuyển tuyến', icon: <SafetyCertificateOutlined />, link: '/referrals' },
    { title: 'Phẫu thuật từ xa', icon: <MedicineBoxOutlined />, link: '/tele-surgery' },
    { title: 'Theo dõi sinh tồn', icon: <ExperimentOutlined />, link: '/telemetry' },
    { title: 'Health ID', icon: <FileTextOutlined />, link: '/health-id' },
    { title: 'Tuân thủ PQ', icon: <SafetyCertificateOutlined />, link: '/compliance' },
    { title: 'Hình ảnh PACS', icon: <BookOutlined />, link: '/image-analysis' },
    { title: 'Nhắc thuốc', icon: <MedicineBoxOutlined />, link: '/medication-reminders' },
    { title: 'Hỏi đáp Bác sĩ', icon: <ExperimentOutlined />, link: '/doctor-qa' },
    { title: 'Hotline 24/7', icon: <TeamOutlined />, link: '/hotline' },
    { title: 'Tra cứu BHYT', icon: <SafetyCertificateOutlined />, link: '/insurance' },
    { title: 'Cơ sở y tế', icon: <GlobalOutlined />, link: '/facility-finder' },
    { title: 'SMS Chăm sóc', icon: <FileTextOutlined />, link: '/sms-care' },
    { title: 'Việc làm', icon: <RiseOutlined />, link: '/jobs' },
];

export default function PortalDashboard() {
    return (
        <div style={{ paddingBottom: 48 }}>
            <Space direction="vertical" size={24} style={{ width: '100%' }}>
                
                <Carousel autoplay autoplaySpeed={4000} effect="fade" style={{ borderRadius: 8, overflow: 'hidden' }}>
                    {/* Slide 1 */}
                    <div>
                        <div style={{ background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)', padding: '48px 32px', minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hệ thống quản lý đối tác</Text>
                            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', margin: '8px 0' }}>Xin chào, Bác sĩ MediPartner</h1>
                            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', marginBottom: 32 }}>Hôm nay bạn có 12 ca khám đang chờ và 5 hồ sơ cần duyệt.</p>
                            <Space size="middle">
                                <Button size="large" type="primary" style={{ height: 44, padding: '0 32px' }}>BẮT ĐẦU LÀM VIỆC</Button>
                                <Button size="large" ghost style={{ height: 44, padding: '0 32px', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>XEM LỊCH TRỰC</Button>
                            </Space>
                        </div>
                    </div>
                    {/* Slide 2 */}
                    <div>
                        <div style={{ background: 'linear-gradient(135deg, #0f52ba 0%, #1e90ff 100%)', padding: '48px 32px', minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sự kiện sắp diễn ra</Text>
                            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', margin: '8px 0' }}>Hội nghị Y khoa Toàn quốc 2026</h1>
                            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', marginBottom: 32 }}>Đăng ký tham gia ngay để nhận chứng chỉ CME miễn phí.</p>
                            <Space size="middle">
                                <Button size="large" type="default" style={{ height: 44, padding: '0 32px', color: '#0f52ba', fontWeight: 'bold' }}>ĐĂNG KÝ NGAY</Button>
                            </Space>
                        </div>
                    </div>
                </Carousel>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, padding: '0 4px' }}>
                        <Text style={{ fontSize: 12, fontWeight: 700, color: '#001529', textTransform: 'uppercase' }}>Truy cập nhanh</Text>
                    </div>
                    <Row gutter={[12, 12]}>
                        {QUICK_ACCESS.map((item, index) => (
                            <Col key={index} xs={12} sm={8} md={6} lg={4} xl={3}>
                                <QuickCard item={item} />
                            </Col>
                        ))}
                    </Row>
                </div>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <StatCard title="Lượt xem Profile" value="12,500" icon={<UserOutlined />} trend={12.5} />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <StatCard title="Lịch đặt khám" value="845" icon={<CalendarOutlined />} trend={8.2} />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <StatCard title="Yêu cầu tư vấn" value="128" icon={<MessageOutlined />} trend={-2.4} />
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <StatCard title="Điểm uy tín" value="4.92" icon={<HeartFilled />} trend={0.5} />
                    </Col>
                </Row>
            </Space>
        </div>
    );
}