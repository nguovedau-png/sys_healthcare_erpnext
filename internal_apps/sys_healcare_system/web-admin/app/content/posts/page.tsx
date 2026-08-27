"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Table,
    Typography,
    Card,
    Space,
    Button,
    Input,
    Select,
    Tag,
    Modal,
    message,
    Tooltip,
    Row,
    Col,
    Avatar
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    MessageOutlined,
    ExclamationCircleOutlined,
    SendOutlined,
    CloudUploadOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Checkbox } from 'antd';
import contentService, { Post } from '@/services/content.service';
import DataTable from '@/components/admin/DataTable';
import { exportToExcel, mapDataForExport } from '@/lib/export';

const { Title, Text } = Typography;
const { Option } = Select;

export default function NewsManagement() {
    const [allNews, setAllNews] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [filter, setFilter] = useState({ category: 'all', status: 'all', search: '' });
    const [isPushModalVisible, setIsPushModalVisible] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [pushing, setPushing] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (filter.search) params.search = filter.search;
            if (filter.category !== 'all') params.category = filter.category;
            if (filter.status !== 'all') params.isActive = filter.status === 'published';

            const response = await contentService.getPosts(params);
            setAllNews(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch news', error);
            message.error('Lỗi khi tải danh sách tin tức');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [pagination.current, pagination.pageSize, filter.category, filter.status]);

    const handleSearch = () => {
        setPagination({ ...pagination, current: 1 });
        fetchNews();
    };

    const handleBulkDelete = (keys: React.Key[]) => {
        Modal.confirm({
            title: `Bạn có chắc muốn xóa ${keys.length} bài viết đã chọn?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Hành động này không thể hoàn tác.',
            okText: 'Xóa tất cả',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await Promise.all(keys.map(key => contentService.deletePost(key as number)));
                    message.success(`Đã xóa ${keys.length} bài viết!`);
                    setSelectedRowKeys([]);
                    fetchNews();
                } catch (err: any) {
                    message.error('Có lỗi xảy ra khi xóa hàng loạt');
                }
            },
        });
    };

    const handlePushToBots = async () => {
        if (!selectedPostId || selectedPlatforms.length === 0) {
            message.warning('Vui lòng chọn ít nhất một nền tảng');
            return;
        }

        setPushing(true);
        try {
            await contentService.pushPostToBots(selectedPostId, selectedPlatforms);
            message.success('Đã gửi nội dung lên các bot thành công!');
            setIsPushModalVisible(false);
            setSelectedPlatforms([]);
        } catch (error) {
            console.error('Failed to push to bots', error);
            message.error('Lỗi khi gửi nội dung lên bot');
        } finally {
            setPushing(false);
        }
    };

    const filteredNews = allNews;
    const categories = ['Sức khỏe', 'Đời sống', 'Công nghệ', 'Y học']; // Should ideally come from an API

    const columns: ColumnsType<Post> = [
        {
            title: 'STT',
            key: 'index',
            width: 60,
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <Space>
                    <Avatar
                        shape="square"
                        size={64}
                        src={record.thumbnail || '/img/placeholder.png'}
                        style={{ minWidth: 64 }}
                    />
                    <Text strong style={{ maxWidth: 300 }} ellipsis={{ tooltip: text }}>
                        {text}
                    </Text>
                </Space>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            render: (category) => (
                <Tag color="blue" variant="borderless">
                    {category}
                </Tag>
            ),
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
            render: (author) => <Text type="secondary">{author}</Text>,
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'date',
            key: 'date',
            render: (date) => <Text type="secondary">{date}</Text>,
        },
        {
            title: 'Lượt xem',
            key: 'views',
            align: 'center',
            render: () => (
                <Tooltip title="Quản lý bình luận">
                    <Button type="link" icon={<MessageOutlined />} onClick={() => { }}>
                        QL
                    </Button>
                </Tooltip>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            align: 'center',
            render: (isActive) => (
                <Tag color={isActive ? 'success' : 'default'} variant="borderless">
                    {isActive ? 'ĐÃ XUẤT BẢN' : 'TẠM ẨN'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'actions',
            align: 'center',
            render: (_text, record) => (
                <Space>
                    <Tooltip title="Xem">
                        <Link href={`/news/${record.id}`} target="_blank">
                            <Button type="text" icon={<EyeOutlined />} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Đẩy nội dung lên Bot">
                        <Button
                            type="text"
                            icon={<SendOutlined style={{ color: '#1890ff' }} />}
                            onClick={() => {
                                setSelectedPostId(record.id);
                                setIsPushModalVisible(true);
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <Link href={`/content/posts/${record.id}/edit`}>
                            <Button type="text" icon={<EditOutlined style={{ color: '#52c41a' }} />} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const handleExport = (keys: React.Key[]) => {
        const selectedData = allNews.filter(item => keys.includes(item.id));
        const mappedData = mapDataForExport(selectedData, {
            id: 'ID',
            title: 'Tiêu đề',
            category: 'Danh mục',
            author: 'Tác giả',
            date: 'Ngày đăng',
            isActive: 'Trạng thái'
        });
        exportToExcel(mappedData, `Danh_sach_tin_tuc_${new Date().getTime()}`);
        message.success(`Đã xuất ${keys.length} bài viết ra Excel`);
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Tin tức</Title>
                    <Text type="secondary">Tổng: {filteredNews.length} bài viết</Text>
                </Col>
                <Col>
                    <Link href="/content/posts/create">
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Tạo tin tức mới
                        </Button>
                    </Link>
                </Col>
            </Row>

            <DataTable
                columns={[
                    { key: 'id', label: 'ID', width: '70px' },
                    {
                        key: 'title',
                        label: 'Tiêu đề',
                        render: (text, record) => (
                            <Space>
                                <Avatar shape="square" size={48} src={record.thumbnail || '/img/placeholder.png'} />
                                <Text strong ellipsis={{ tooltip: text }}>{text}</Text>
                            </Space>
                        )
                    },
                    {
                        key: 'category',
                        label: 'Danh mục',
                        render: (cat) => <Tag color="blue">{cat}</Tag>
                    },
                    { key: 'author', label: 'Tác giả' },
                    { key: 'date', label: 'Ngày đăng' },
                    {
                        key: 'isActive',
                        label: 'Trạng thái',
                        render: (isActive) => (
                            <Tag color={isActive ? 'success' : 'default'}>
                                {isActive ? 'ĐÃ XUẤT BẢN' : 'TẠM ẨN'}
                            </Tag>
                        )
                    }
                ]}
                data={allNews}
                loading={loading}
                pagination={{
                    currentPage: pagination.current,
                    totalPages: Math.ceil(total / pagination.pageSize),
                    onPageChange: (page) => setPagination({ ...pagination, current: page }),
                    pageSize: pagination.pageSize
                }}
                searchable
                searchPlaceholder="Tìm kiếm tiêu đề bài viết..."
                onSearch={(val) => {
                    setFilter({ ...filter, search: val });
                    setPagination({ ...pagination, current: 1 });
                }}
                filters={[
                    {
                        key: 'category',
                        label: 'Danh mục',
                        options: categories.map(c => ({ value: c, label: c })),
                        value: filter.category,
                        onChange: (val) => setFilter({ ...filter, category: val || 'all' })
                    },
                    {
                        key: 'status',
                        label: 'Trạng thái',
                        options: [
                            { value: 'published', label: 'Đã xuất bản' },
                            { value: 'draft', label: 'Tạm ẩn' }
                        ],
                        value: filter.status,
                        onChange: (val) => setFilter({ ...filter, status: val || 'all' })
                    }
                ]}
                rowSelection={{
                    selectedRowKeys,
                    onChange: (keys) => setSelectedRowKeys(keys)
                }}
                bulkActions={[
                    {
                        label: 'Xóa đã chọn',
                        icon: <DeleteOutlined />,
                        danger: true,
                        onClick: handleBulkDelete
                    },
                    {
                        label: 'Xuất Excel',
                        icon: <CloudUploadOutlined />,
                        onClick: handleExport
                    }
                ]}
                actions={(record) => (
                    <Space>
                        <Tooltip title="Xem">
                            <Link href={`/news/${record.id}`} target="_blank">
                                <Button type="text" icon={<EyeOutlined />} size="small" />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Đẩy nội dung">
                            <Button
                                type="text"
                                icon={<SendOutlined style={{ color: '#1890ff' }} />}
                                size="small"
                                onClick={() => {
                                    setSelectedPostId(record.id);
                                    setIsPushModalVisible(true);
                                }}
                            />
                        </Tooltip>
                        <Tooltip title="Sửa">
                            <Link href={`/content/posts/${record.id}/edit`}>
                                <Button type="text" icon={<EditOutlined style={{ color: '#52c41a' }} />} size="small" />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                size="small"
                                onClick={() => {
                                    Modal.confirm({
                                        title: 'Xóa bài viết?',
                                        content: 'Bạn có chắc chắn muốn xóa bài viết này?',
                                        onOk: () => {
                                            contentService.deletePost(record.id);
                                            fetchNews();
                                        }
                                    });
                                }}
                            />
                        </Tooltip>
                    </Space>
                )}
            />

            <Modal
                title={<span><SendOutlined /> Đẩy nội dung lên Bot</span>}
                open={isPushModalVisible}
                onOk={handlePushToBots}
                onCancel={() => {
                    setIsPushModalVisible(false);
                    setSelectedPlatforms([]);
                }}
                okText="Gửi ngay"
                cancelText="Hủy"
                confirmLoading={pushing}
                centered
            >
                <div style={{ padding: '10px 0' }}>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                        Chọn các nền tảng bạn muốn đẩy bài viết này lên:
                    </Text>
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        value={selectedPlatforms}
                        onChange={(checkedValues) => setSelectedPlatforms(checkedValues as string[])}
                    >
                        <Space orientation="vertical" style={{ width: '100%' }}>
                            <Card size="small" hoverable style={{ marginBottom: 8 }}>
                                <Checkbox value="facebook">
                                    <Space>
                                        <Avatar src="/img/facebook-icon.png" size="small" />
                                        Facebook Page
                                    </Space>
                                </Checkbox>
                            </Card>
                            <Card size="small" hoverable style={{ marginBottom: 8 }}>
                                <Checkbox value="telegram">
                                    <Space>
                                        <Avatar src="/img/telegram-icon.png" size="small" />
                                        Telegram Bot
                                    </Space>
                                </Checkbox>
                            </Card>
                            <Card size="small" hoverable style={{ marginBottom: 8 }}>
                                <Checkbox value="slack">
                                    <Space>
                                        <Avatar src="/img/slack-icon.png" size="small" />
                                        Slack Notification
                                    </Space>
                                </Checkbox>
                            </Card>
                        </Space>
                    </Checkbox.Group>
                </div>
            </Modal>
        </Space>
    );
}
