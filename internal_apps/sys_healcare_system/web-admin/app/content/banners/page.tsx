"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Typography,
    Card,
    Button,
    Tag,
    Modal,
    message,
    Row,
    Col,
    Space,
    Empty,
    Breadcrumb,
    Tooltip,
    Statistic,
    Divider
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    PictureOutlined,
    CheckCircleOutlined,
    StopOutlined,
    EyeOutlined
} from '@ant-design/icons';
import contentService, { Banner } from '@/services/content.service';

const { Title, Text } = Typography;
const { Meta } = Card;

export default function BannersManagement() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const data = await contentService.getBanners();
            setBanners(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch banners', error);
            message.error('Không thể tải danh sách banner');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleDelete = (banner: Banner) => {
        Modal.confirm({
            title: 'Xóa banner khỏi hệ thống?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: `Bạn có chắc chắn muốn xóa banner "${banner.title}"? Hành động này không thể hoàn tác.`,
            okText: 'Xóa banner',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await contentService.deleteBanner(banner.id);
                    message.success('Đã xóa banner thành công');
                    fetchBanners();
                } catch (error) {
                    message.error('Lỗi khi xóa banner');
                }
            },
        });
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Thư viện Truyền thông</Breadcrumb.Item>
                <Breadcrumb.Item>Banner quảng cáo</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Banner</Title>
                    <Text type="secondary">Cấu hình các banner quảng cáo, chương trình khuyến mãi và thông báo quan trọng</Text>
                </Col>
                <Col>
                    <Link href="/content/banners/create">
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Tạo banner mới
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f0f5ff' }}>
                        <Statistic
                            title="Tổng số Banner"
                            value={banners.length}
                            prefix={<PictureOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f6ffed' }}>
                        <Statistic
                            title="Đang hoạt động"
                            value={banners.filter(b => b.isActive).length}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#fff1f0' }}>
                        <Statistic
                            title="Đang tạm ngưng"
                            value={banners.filter(b => !b.isActive).length}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<StopOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f9f0ff' }}>
                        <Statistic
                            title="Vị trí hiển thị"
                            value={new Set(banners.map(b => b.position)).size}
                            prefix={<EyeOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            {loading ? (
                <Row gutter={[24, 24]}>
                    {[1, 2, 3].map(i => (
                        <Col xs={24} sm={12} lg={8} key={i}>
                            <Card loading variant="borderless" bodyStyle={{ padding: '0px' }} />
                        </Col>
                    ))}
                </Row>
            ) : banners.length > 0 ? (
                <Row gutter={[24, 24]}>
                    {banners.map(banner => (
                        <Col xs={24} sm={12} lg={8} key={banner.id}>
                            <Card
                                hoverable
                                variant="borderless"
                                bodyStyle={{ padding: '16px' }}
                                cover={
                                    <div style={{ position: 'relative', height: 180, overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
                                        <img
                                            alt={banner.title}
                                            src={banner.image || '/img/placeholder.png'}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div style={{ position: 'absolute', top: 12, left: 12 }}>
                                            <Tag color={banner.isActive ? 'success' : 'default'} variant="borderless" style={{ borderRadius: '4px' }}>
                                                {banner.isActive ? 'HOẠT ĐỘNG' : 'TẠM NGƯNG'}
                                            </Tag>
                                        </div>
                                    </div>
                                }
                                actions={[
                                    <Tooltip title="Chỉnh sửa banner" key="edit">
                                        <Link href={`/content/banners/${banner.id}/edit`}>
                                            <EditOutlined style={{ color: '#faad14' }} />
                                        </Link>
                                    </Tooltip>,
                                    <Tooltip title="Xóa banner" key="delete">
                                        <DeleteOutlined
                                            style={{ color: '#ff4d4f' }}
                                            onClick={() => handleDelete(banner)}
                                        />
                                    </Tooltip>
                                ]}
                            >
                                <Meta
                                    title={<Text strong style={{ display: 'block', fontSize: '15px' }}>{banner.title}</Text>}
                                    description={
                                        <Space orientation="vertical" size={12} style={{ display: 'flex', marginTop: 8 }}>
                                            <Space split={<Divider type="vertical" style={{ margin: 0, height: '10px' }} />} style={{ fontSize: '12px' }}>
                                                <Tag color="processing" variant="borderless" style={{ textTransform: 'uppercase', fontSize: '10px' }}>
                                                    {banner.position}
                                                </Tag>
                                                <Text type="secondary" style={{ fontSize: '12px' }}>ID: {banner.id}</Text>
                                            </Space>
                                        </Space>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Hiện chưa có banner nào được cấu hình."
                    style={{ padding: '64px 0', background: '#fff', borderRadius: '12px' }}
                >
                    <Link href="/content/banners/create">
                        <Button type="primary">Tạo banner đầu tiên</Button>
                    </Link>
                </Empty>
            )}
        </Space>
    );
}
