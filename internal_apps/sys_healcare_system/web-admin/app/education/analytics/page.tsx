"use client";

import React, { useEffect, useState } from 'react';
import {
    Typography,
    Card,
    Row,
    Col,
    Statistic,
    Table,
    Select,
    Space,
    Breadcrumb,
    Divider,
    Progress,
    Rate,
    Tag,
    message
} from 'antd';
import {
    BookOutlined,
    VideoCameraOutlined,
    UserOutlined,
    StarOutlined,
    EyeOutlined,
    LikeOutlined,
    MessageOutlined,
    BarChartOutlined,
    FilterOutlined
} from '@ant-design/icons';
import { educationService } from '@/services/education.service';

const { Title, Text } = Typography;

export default function EducationAnalyticsPage() {
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [stats, setStats] = useState({
        totalCourses: 0,
        totalLessons: 324,
        activeStudents: 1240,
        avgRating: 4.7
    });
    const [topLessons, setTopLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                // const courses = await educationService.getCourses(); // Legacy call
                const analyticsData = await educationService.getAnalytics();
                setStats({
                    totalCourses: analyticsData.totalCourses,
                    totalLessons: analyticsData.totalLessons,
                    activeStudents: analyticsData.activeStudents,
                    avgRating: analyticsData.avgRating
                });

                // Mock top lessons for now
                setTopLessons([
                    { id: 1, title: 'Cập nhật điều trị Đái tháo đường 2024', views: 2340, likes: 450, comments: 120, rating: 4.8 },
                    { id: 2, title: 'Quản lý Tăng huyết áp ở người cao tuổi', views: 1890, likes: 380, comments: 95, rating: 4.7 },
                    { id: 3, title: 'Dược lâm sàng: Kháng sinh hợp lý', views: 1650, likes: 320, comments: 78, rating: 4.6 },
                    { id: 4, title: 'Chăm sóc bệnh nhân tim mạch', views: 1420, likes: 290, comments: 65, rating: 4.5 },
                    { id: 5, title: 'Dinh dưỡng cho trẻ em', views: 1280, likes: 250, comments: 58, rating: 4.4 },
                ]);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
                message.error('Không thể tải dữ liệu phân tích');
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            render: (_: any, __: any, index: number) => index + 1
        },
        {
            title: 'Tên bài học',
            dataIndex: 'title',
            key: 'title',
            render: (text: string) => <Text strong>{text}</Text>
        },
        {
            title: 'Lượt xem',
            dataIndex: 'views',
            key: 'views',
            sorter: (a: any, b: any) => a.views - b.views,
            render: (val: number) => <Text>{val.toLocaleString()}</Text>
        },
        {
            title: 'Tương tác',
            key: 'interaction',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Tooltip title="Thích">
                        <Space><LikeOutlined style={{ color: '#ff4d4f' }} /> {record.likes}</Space>
                    </Tooltip>
                    <Tooltip title="Bình luận">
                        <Space><MessageOutlined style={{ color: '#1890ff' }} /> {record.comments}</Space>
                    </Tooltip>
                </Space>
            )
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (val: number) => (
                <Space>
                    <Rate disabled defaultValue={val} style={{ fontSize: '12px' }} />
                    <Text type="secondary">({val})</Text>
                </Space>
            )
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>Phân tích & Báo cáo</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Phân tích Hiệu quả Đào tạo</Title>
                        <Text type="secondary">Theo dõi tiến độ, tương tác và chất lượng các khóa học trên hệ thống</Text>
                    </Space>
                </Col>
            </Row>

            {/* Overview Stats */}
            <Row gutter={16}>
                <Col xs={24} sm={12} lg={6}>
                    <Card variant="borderless" className="shadow-sm">
                        <Statistic
                            title="Tổng khóa học"
                            value={stats.totalCourses}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                        <Text type="secondary" style={{ fontSize: '12px' }}>+3 khóa học tháng này</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card variant="borderless" className="shadow-sm">
                        <Statistic
                            title="Tổng bài học"
                            value={stats.totalLessons}
                            prefix={<VideoCameraOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                        <Text type="secondary" style={{ fontSize: '12px' }}>Trung bình 6.8 bài/khóa</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card variant="borderless" className="shadow-sm">
                        <Statistic
                            title="Học viên hoạt động"
                            value={stats.activeStudents}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                        <Text type="secondary" style={{ fontSize: '12px' }}>Tăng 12% so với quý trước</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card variant="borderless" className="shadow-sm">
                        <Statistic
                            title="Đánh giá TB"
                            value={stats.avgRating}
                            suffix="/5"
                            prefix={<StarOutlined />}
                            valueStyle={{ color: '#faad14' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Progress percent={94} size="small" showInfo={false} strokeColor="#faad14" />
                            <Text type="secondary" style={{ fontSize: '12px' }}>94% hài lòng</Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={24}>
                    <Card
                        title={<Space><BarChartOutlined />Top Bài học có lượt tương tác cao nhất</Space>}
                        variant="borderless"
                        className="shadow-sm"
                    >
                        <Table
                            loading={loading}
                            columns={columns}
                            dataSource={topLessons}
                            rowKey="id"
                            pagination={false}
                        />
                    </Card>
                </Col>
            </Row>

            <Card
                title={<Space><FilterOutlined />Chi tiết tương tác theo bài học</Space>}
                variant="borderless"
                className="shadow-sm"
            >
                <Row gutter={24} align="bottom">
                    <Col xs={24} md={12}>
                        <Space orientation="vertical" style={{ width: '100%' }}>
                            <Text strong>Chọn khóa học</Text>
                            <Select
                                defaultValue="all"
                                style={{ width: '100%' }}
                                onChange={setSelectedCourse}
                                options={[
                                    { value: 'all', label: 'Tất cả khóa học' },
                                    { value: '1', label: 'CME: Cập nhật Y khoa 2024' },
                                    { value: '2', label: 'CPE: Dược lâm sàng nâng cao' },
                                ]}
                            />
                        </Space>
                    </Col>
                    <Col xs={24} md={12}>
                        <Space orientation="vertical" style={{ width: '100%' }}>
                            <Text strong>Chọn bài học cụ thể</Text>
                            <Select
                                defaultValue="all"
                                style={{ width: '100%' }}
                                options={[
                                    { value: 'all', label: 'Tất cả bài học' },
                                    { value: '1', label: 'Bài 1: Tổng quan' },
                                    { value: '2', label: 'Bài 2: Thực hành' },
                                ]}
                            />
                        </Space>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                        <Card variant="borderless" style={{ background: '#fff1f0', textAlign: 'center' }}>
                            <Statistic title="Lượt thích" value={450} valueStyle={{ color: '#cf1322' }} prefix={<LikeOutlined />} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card variant="borderless" style={{ background: '#e6f7ff', textAlign: 'center' }}>
                            <Statistic title="Bình luận" value={120} valueStyle={{ color: '#096dd9' }} prefix={<MessageOutlined />} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card variant="borderless" style={{ background: '#fffbe6', textAlign: 'center' }}>
                            <Statistic title="Đánh giá" value={4.5} suffix="/5" valueStyle={{ color: '#d48806' }} prefix={<StarOutlined />} />
                        </Card>
                    </Col>
                </Row>
            </Card>
        </Space>
    );
}

// Add Tooltip import if not auto-injected or keep space
import { Tooltip } from 'antd';
