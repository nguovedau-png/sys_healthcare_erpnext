"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Table,
    Typography,
    Card,
    Button,
    Tag,
    Modal,
    message,
    Space,
    Breadcrumb,
    Row,
    Col,
    Tooltip
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    ExclamationCircleOutlined,
    LinkOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import contentService, { StaticPage } from '@/services/content.service';

const { Title, Text } = Typography;

export default function PagesManagement() {
    const [pages, setPages] = useState<StaticPage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPages = async () => {
        setLoading(true);
        try {
            const data = await contentService.getStaticPages();
            setPages(data);
        } catch (error) {
            console.error('Failed to fetch pages', error);
            message.error('Lỗi khi tải danh sách trang tĩnh');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleDelete = (page: StaticPage) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa trang này?',
            icon: <ExclamationCircleOutlined />,
            content: 'Hành động này không thể hoàn tác.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await contentService.deleteStaticPage(page.id);
                    message.success('Xóa trang thành công!');
                    fetchPages();
                } catch (error) {
                    message.error('Xóa thất bại');
                }
            },
        });
    };

    const columns: ColumnsType<StaticPage> = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            render: (slug) => (
                <Space size={4}>
                    <LinkOutlined style={{ fontSize: '12px', color: '#bfbfbf' }} />
                    <Text type="secondary" code>{slug}</Text>
                </Space>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => (
                <Tag color={isActive ? 'green' : 'default'} variant="outlined">
                    {isActive ? 'ĐÃ XUẤT BẢN' : 'TẠM ẨN'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            align: 'right',
            render: (_text, record) => (
                <Space>
                    <Tooltip title="Xem trang">
                        <Link href={`/${record.slug}`} target="_blank">
                            <Button type="text" icon={<EyeOutlined />} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <Link href={`/content/pages/${record.id}/edit`}>
                            <Button type="text" icon={<EditOutlined style={{ color: '#1890ff' }} />} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Trang tĩnh</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Trang tĩnh</Title>
                    <Text type="secondary">Tổng cộng: {pages.length} trang nội dung tĩnh</Text>
                </Col>
                <Col>
                    <Link href="/content/pages/create">
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Tạo trang mới
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Card variant="outlined">
                <Table
                    columns={columns}
                    dataSource={pages}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    locale={{ emptyText: 'Chưa có trang tĩnh nào được tạo.' }}
                />
            </Card>
        </Space>
    );
}
