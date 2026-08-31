"use client";

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Input, Button, Tag, Space, Avatar, Spin, Select, Empty, Skeleton, Badge } from 'antd';
import { 
    SearchOutlined, 
    BookOutlined, 
    ClockCircleOutlined, 
    UserOutlined, 
    ArrowRightOutlined, 
    SafetyCertificateFilled,
    FilterOutlined,
    FireOutlined,
    StarFilled,
    GlobalOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import educationService from '@/services/education.service';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const getFallbackCourses = () => [
    { id: 1, title: 'Cập nhật điều trị Viêm khớp dạng thấp 2026', instructor: 'PGS.TS Nguyễn Văn Chuyên', category: 'CME', points: 4, duration: '2 giờ', image: 'https://picsum.photos/seed/med1/800/400', rating: 4.8, students: 1250 },
    { id: 2, title: 'Kỹ năng tư vấn Khách hàng mạn tính', instructor: 'Dược sĩ Lê Minh Tâm', category: 'Kỹ năng mềm', points: 0, duration: '1.5 giờ', image: 'https://picsum.photos/seed/med2/800/400', rating: 4.5, students: 850 },
    { id: 3, title: 'Ứng dụng công nghệ trong Quản lý Nhà thuốc', instructor: 'Chuyên gia IT Y Tế', category: 'Quản trị', points: 0, duration: '3 giờ', image: 'https://picsum.photos/seed/med3/800/400', rating: 4.9, students: 2100 },
    { id: 4, title: 'Kiểm soát Hen phế quản & COPD', instructor: 'BS. Trần Hữu Khang', category: 'CME', points: 5, duration: '4 giờ', image: 'https://picsum.photos/seed/med4/800/400', rating: 4.7, students: 1100 },
];

export default function CoursesPortalPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await educationService.getCourses();
                const courseList = response?.data || response;
                if (Array.isArray(courseList) && courseList.length > 0) {
                    const mapped = courseList.map((c: any) => ({
                        id: c.id, 
                        title: c.name || c.title || 'Khóa học', 
                        instructor: c.lecturer?.name || c.instructor || 'Giảng viên',
                        category: c.type || c.category || 'CME', 
                        points: c.credits || c.points || 0,
                        duration: c.duration || '2 giờ', 
                        image: c.thumbnail || c.image || `https://picsum.photos/seed/course${c.id}/800/400`,
                        rating: 4.5 + (Math.random() * 0.5),
                        students: 100 + Math.floor(Math.random() * 2000)
                    }));
                    setCourses(mapped);
                } else {
                    setCourses(getFallbackCourses());
                }
            } catch (e) { 
                console.error('Failed to fetch courses:', e);
                setCourses(getFallbackCourses());
            }
            finally { setLoading(false); }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = category === 'all' || c.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ background: '#f5f7fa', minHeight: '100vh', paddingBottom: 60 }}>
            {/* Premium Hero Section */}
            <div style={{ 
                background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)', 
                padding: '80px 24px 120px', 
                textAlign: 'center', 
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
                
                <Space direction="vertical" size="large" style={{ maxWidth: 800, zIndex: 1 }}>
                    <Tag color="gold" icon={<StarFilled />} style={{ padding: '4px 16px', borderRadius: 100, fontWeight: 600 }}>ACADEMY PREMIUM</Tag>
                    <Title level={1} style={{ color: 'white', margin: 0, fontSize: '3rem', fontWeight: 800 }}>
                        Học viện Y khoa Trực tuyến
                    </Title>
                    <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: 20, margin: '16px auto', maxWidth: 650 }}>
                        Nền tảng đào tạo chuyên môn hàng đầu dành cho y bác sĩ và dược sĩ. 
                        Tích lũy điểm CME, cập nhật phác đồ điều trị và nâng tầm sự nghiệp.
                    </Paragraph>
                    
                    <div style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        backdropFilter: 'blur(10px)', 
                        padding: '16px', 
                        borderRadius: 24, 
                        border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex',
                        gap: 12,
                        maxWidth: 700,
                        margin: '32px auto 0'
                    }}>
                        <Input 
                            placeholder="Tìm kiếm khóa học, giảng viên..." 
                            size="large" 
                            prefix={<SearchOutlined style={{ color: 'rgba(255,255,255,0.5)' }} />}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: 'white', flex: 1 }}
                            className="premium-input"
                        />
                        <Select 
                            defaultValue="all" 
                            size="large" 
                            onChange={setCategory}
                            style={{ width: 160, background: 'rgba(255,255,255,0.1)', borderRadius: 12 }}
                            className="premium-select"
                        >
                            <Option value="all">Tất cả danh mục</Option>
                            <Option value="CME">Chứng chỉ CME</Option>
                            <Option value="Kỹ năng mềm">Kỹ năng mềm</Option>
                            <Option value="Quản trị">Quản trị</Option>
                        </Select>
                        <Button type="primary" size="large" shape="round" style={{ height: 48, padding: '0 32px', fontWeight: 700, background: '#faad14', border: 'none', color: '#001529' }}>
                            Tìm kiếm
                        </Button>
                    </div>
                </Space>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: 1200, margin: '-60px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                <Row gutter={[32, 32]}>
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <Col xs={24} sm={12} md={8} key={i}>
                                <Card style={{ borderRadius: 24 }} cover={<Skeleton.Image style={{ width: '100%', height: 200 }} />}>
                                    <Skeleton active />
                                </Card>
                            </Col>
                        ))
                    ) : filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <Col xs={24} sm={12} md={8} key={course.id}>
                                <Card 
                                    hoverable
                                    className="premium-course-card"
                                    onClick={() => router.push(`/courses/${course.id}`)}
                                    cover={
                                        <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                                            <img alt={course.title} src={course.image} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                                            <div style={{ position: 'absolute', top: 16, left: 16 }}>
                                                <Tag color="rgba(0,0,0,0.6)" style={{ backdropFilter: 'blur(4px)', border: 'none', borderRadius: 8, padding: '4px 12px' }}>
                                                    <span style={{ color: '#fff', fontWeight: 600 }}>{course.category}</span>
                                                </Tag>
                                            </div>
                                            {course.points > 0 && (
                                                <div style={{ position: 'absolute', top: 16, right: 16 }}>
                                                    <Badge count={`+${course.points} CME`} style={{ backgroundColor: '#52c41a' }} />
                                                </div>
                                            )}
                                        </div>
                                    }
                                    bodyStyle={{ padding: '24px' }}
                                    style={{ borderRadius: 24, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                        <Space size={4}>
                                            <StarFilled style={{ color: '#faad14' }} />
                                            <Text strong>{course.rating.toFixed(1)}</Text>
                                            <Text type="secondary" style={{ fontSize: 12 }}>({course.students}+ học viên)</Text>
                                        </Space>
                                        {course.students > 1000 && <Tag color="error" icon={<FireOutlined />} style={{ borderRadius: 4, margin: 0 }}>Hot</Tag>}
                                    </div>
                                    
                                    <Title level={4} style={{ marginTop: 0, marginBottom: 16, flex: 1, fontSize: 18, lineHeight: 1.4 }}>
                                        {course.title}
                                    </Title>
                                    
                                    <div style={{ background: '#fafafa', padding: '12px 16px', borderRadius: 16, marginBottom: 20 }}>
                                        <Space direction="vertical" size={8} style={{ width: '100%' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <Avatar size="small" icon={<UserOutlined />} />
                                                <Text type="secondary" style={{ fontSize: 13 }}>{course.instructor}</Text>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
                                                <Text type="secondary" style={{ fontSize: 13 }}>{course.duration}</Text>
                                            </div>
                                        </Space>
                                    </div>

                                    <Button 
                                        type="primary" 
                                        block 
                                        size="large"
                                        shape="round"
                                        style={{ height: 48, fontWeight: 700, boxShadow: '0 4px 12px rgba(24,144,255,0.3)' }}
                                    >
                                        Xem chi tiết <ArrowRightOutlined />
                                    </Button>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col span={24}>
                            <Card style={{ borderRadius: 24, textAlign: 'center', padding: '60px 0' }}>
                                <Empty description="Không tìm thấy khóa học nào phù hợp" />
                            </Card>
                        </Col>
                    )}
                </Row>

                {/* Benefits Section */}
                <div style={{ marginTop: 80 }}>
                    <Row gutter={[40, 40]} align="middle">
                        <Col xs={24} lg={10}>
                            <Title level={2} style={{ fontWeight: 800 }}>Tại sao chọn Học viện Y khoa của chúng tôi?</Title>
                            <Paragraph style={{ fontSize: 16, color: '#666', lineHeight: 1.8 }}>
                                Chúng tôi cung cấp các khóa học đạt chuẩn quốc tế, được biên soạn bởi các giáo sư, tiến sĩ đầu ngành. 
                                Không chỉ học kiến thức, bạn còn được tham gia cộng đồng chuyên môn năng động.
                            </Paragraph>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 32 }}>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    <div style={{ width: 48, height: 48, background: '#e6f7ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <SafetyCertificateFilled style={{ color: '#1890ff', fontSize: 24 }} />
                                    </div>
                                    <div>
                                        <Text strong style={{ fontSize: 16, display: 'block' }}>Chứng chỉ CME Uy tín</Text>
                                        <Text type="secondary">Cấp chứng chỉ điện tử có giá trị quy đổi điểm đào tạo liên tục.</Text>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    <div style={{ width: 48, height: 48, background: '#f6ffed', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <GlobalOutlined style={{ color: '#52c41a', fontSize: 24 }} />
                                    </div>
                                    <div>
                                        <Text strong style={{ fontSize: 16, display: 'block' }}>Học mọi lúc mọi nơi</Text>
                                        <Text type="secondary">Nền tảng tối ưu cho cả máy tính và thiết bị di động.</Text>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} lg={14}>
                            <div style={{ position: 'relative' }}>
                                <img src="https://picsum.photos/seed/academy/800/500" style={{ width: '100%', borderRadius: 40, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
                                <div style={{ position: 'absolute', bottom: -20, left: -20, background: '#fff', padding: '24px', borderRadius: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <Avatar.Group>
                                        <Avatar src="https://i.pravatar.cc/100?u=1" />
                                        <Avatar src="https://i.pravatar.cc/100?u=2" />
                                        <Avatar src="https://i.pravatar.cc/100?u=3" />
                                    </Avatar.Group>
                                    <div>
                                        <Text strong style={{ display: 'block' }}>50,000+</Text>
                                        <Text type="secondary" style={{ fontSize: 12 }}>Bác sĩ đã tham gia</Text>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            <style jsx global>{`
                .premium-input::placeholder { color: rgba(255,255,255,0.5); }
                .premium-course-card:hover img { transform: scale(1.1); }
                .premium-select .ant-select-selector { 
                    background: transparent !important; 
                    border: none !important; 
                    color: white !important; 
                }
                .premium-select .ant-select-arrow { color: rgba(255,255,255,0.6); }
            `}</style>
        </div>
    );
}
