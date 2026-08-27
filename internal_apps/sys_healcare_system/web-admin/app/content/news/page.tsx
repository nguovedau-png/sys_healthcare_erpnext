'use client';

import React, { useEffect, useState } from 'react';
import {
    Typography,
    Card,
    Space,
    Button,
    Tag,
    Avatar,
    Row,
    Col,
    Statistic,
    Breadcrumb,
    Select,
    message,
    Modal,
    Tooltip
} from 'antd';
import {
    FileTextOutlined,
    PlusOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    MessageOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    FolderOpenOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import contentService, { Post } from '@/services/content.service';
import DataTable from '@/components/admin/DataTable';

const { Title, Text } = Typography;
const { Option } = Select;

export default function NewsPage() {
    const [allNews, setAllNews] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchNews = async () => {
        setLoading(true);
        try {
            const data = await contentService.getPosts();
            setAllNews(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch news:', error);
            message.error('Không thể tải danh sách bài viết');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = (id: number | string) => {
        Modal.confirm({
            title: 'Xóa bài viết',
            icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
            content: 'Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.',
            okText: 'Xóa bài viết',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await contentService.deletePost(id);
                    message.success('Đã xóa bài viết thành công');
                    fetchNews();
                } catch (error) {
                    message.error('Lỗi khi xóa bài viết');
                }
            }
        });
    };

    const categories = Array.from(new Set((allNews || []).map((n) => n.category))).filter((c): c is string => !!c);

    const filteredData = (allNews || []).filter((news) => {
        const matchesCategory = categoryFilter === 'all' || news.category === categoryFilter;
        const matchesStatus = statusFilter === 'all' || (statusFilter === 'published' ? news.isActive : !news.isActive);
        return matchesCategory && matchesStatus;
    });

    const columns = [
        {
            key: 'title',
            label: 'Bài viết',
            render: (text: string, record: Post) => (
                <Space align="start">
                    <Avatar
                        shape="square"
                        size={56}
                        src={record.thumbnail}
                        icon={<FileTextOutlined />}
                        style={{ borderRadius: '8px' }}
                    />
                    <div style={{ maxWidth: '400px' }}>
                        <Text strong style={{ display: 'block', fontSize: '15px' }}>{text}</Text>
                        <Space size="small" split={<Text type="secondary" style={{ fontSize: '10px' }}>•</Text>}>
                            <Space size={4}>
                                <UserOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
                                <Text type="secondary" style={{ fontSize: '12px' }}>{record.author}</Text>
                            </Space>
                            <Text type="secondary" style={{ fontSize: '12px' }}>{record.date}</Text>
                        </Space>
                    </div>
                </Space>
            ),
        },
        {
            key: 'category',
            label: 'Danh mục',
            render: (text: string) => (
                <Tag color="processing" variant="outlined" icon={<FolderOpenOutlined />}>
                    {text?.toUpperCase()}
                </Tag>
            ),
        },
        {
            key: 'status',
            label: 'Trạng thái',
            render: (_: any, record: Post) => (
                <Tag color={record.isActive ? 'success' : 'default'} variant="outlined">
                    {record.isActive ? 'ĐÃ XUẤT BẢN' : 'BẢN NHÁP'}
                </Tag>
            ),
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Tin bài & Kiến thức</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Tin tức</Title>
                    <Text type="secondary">Quản lý bài viết chuyên môn, tin tức y tế và nội dung đào tạo</Text>
                </Col>
                <Col>
                    <Link href="/content/news/create">
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Tạo bài viết mới
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f0f5ff' }}>
                        <Statistic
                            title="Tổng bài viết"
                            value={allNews.length}
                            prefix={<FileTextOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f6ffed' }}>
                        <Statistic
                            title="Đã xuất bản"
                            value={allNews.filter(n => n.isActive).length}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#fff7e6' }}>
                        <Statistic
                            title="Bản nháp"
                            value={allNews.filter(n => !n.isActive).length}
                            valueStyle={{ color: '#faad14' }}
                            prefix={<ClockCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f9f0ff' }}>
                        <Statistic
                            title="Danh mục"
                            value={categories.length}
                            prefix={<Tag color="purple" style={{ marginRight: 0 }} />}
                        />
                    </Card>
                </Col>
            </Row>

            <Card bodyStyle={{ padding: '16px' }}>
                <Space wrap>
                    <Select
                        defaultValue="all"
                        style={{ width: 220 }}
                        onChange={setCategoryFilter}
                        placeholder="Lọc theo danh mục"
                    >
                        <Option value="all">Tất cả danh mục</Option>
                        {categories.map(cat => <Option key={cat} value={cat}>{cat}</Option>)}
                    </Select>
                    <Select
                        defaultValue="all"
                        style={{ width: 180 }}
                        onChange={setStatusFilter}
                        placeholder="Lọc trạng thái"
                    >
                        <Option value="all">Tất cả trạng thái</Option>
                        <Option value="published">Đã xuất bản</Option>
                        <Option value="draft">Bản nháp</Option>
                    </Select>
                </Space>
            </Card>

            <DataTable
                columns={columns}
                data={filteredData}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm theo tiêu đề bài viết..."
                actions={(record) => (
                    <Space size="small">
                        <Tooltip title="Xem bài viết">
                            <Button icon={<EyeOutlined />} type="text" style={{ color: '#1890ff' }} />
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <Link href={`/content/news/${record.id}/edit`}>
                                <Button icon={<EditOutlined />} type="text" style={{ color: '#faad14' }} />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Phản hồi">
                            <Button icon={<MessageOutlined />} type="text" style={{ color: '#52c41a' }} />
                        </Tooltip>
                        <Tooltip title="Xóa bài viết">
                            <Button
                                icon={<DeleteOutlined />}
                                type="text"
                                danger
                                onClick={() => handleDelete(record.id)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
