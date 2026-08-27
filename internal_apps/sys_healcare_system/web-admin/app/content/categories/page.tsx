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
    Form,
    message,
    Modal,
    Row,
    Col,
    Breadcrumb,
    Tooltip,
    Statistic,
    Divider
} from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    ExclamationCircleOutlined,
    FolderOpenOutlined,
    AppstoreOutlined,
    TagsOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import contentService, { Category } from '@/services/content.service';

const { Title, Text } = Typography;

export default function NewsCategoriesAdmin() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [form] = Form.useForm();

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await contentService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
            message.error('Không thể tải danh sách chuyên mục');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (values: { name: string }) => {
        setIsCreating(true);
        try {
            await contentService.createCategory(values.name);
            await fetchCategories();
            form.resetFields();
            message.success('Đã thêm danh mục mới thành công!');
        } catch (err: any) {
            message.error('Lỗi khi thêm danh mục: ' + (err.message || err));
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = (id: string, name: string) => {
        Modal.confirm({
            title: 'Xóa danh mục này?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: `Bạn có chắc chắn muốn xóa danh mục Bài viết "${name}"? Các bài viết thuộc danh mục này sẽ mất phân loại nhưng không bị xóa.`,
            okText: 'Xóa danh mục',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await contentService.deleteCategory(id);
                    await fetchCategories();
                    message.success('Đã xóa danh mục thành công');
                } catch (err: any) {
                    message.error('Lỗi khi xóa: ' + (err.message || err));
                }
            },
        });
    };

    const columns: ColumnsType<Category> = [
        {
            title: 'TÊN DANH MỤC',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <Space>
                    <FolderOpenOutlined style={{ color: '#1890ff' }} />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'MÃ ĐỊNH DANH (ID)',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <Text type="secondary" code>{text}</Text>,
        },
        {
            title: 'HÀNH ĐỘNG',
            key: 'actions',
            align: 'right',
            render: (_text, record) => (
                <Tooltip title="Gỡ bỏ danh mục">
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id.toString(), record.name)}
                    />
                </Tooltip>
            ),
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Cấu hình Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Danh mục & Phân loại</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Danh mục</Title>
                    <Text type="secondary">Phân loại các bài viết, kiến thức y tế và tin tức theo chuyên đề</Text>
                </Col>
                <Col>
                    <Link href="/content/news">
                        <Button icon={<ArrowLeftOutlined />} size="large">Danh sách bài viết</Button>
                    </Link>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Card size="small" variant="borderless" style={{ background: '#f0f5ff' }}>
                        <Statistic
                            title="Số lượng Danh mục"
                            value={categories.length}
                            prefix={<AppstoreOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small" variant="borderless" style={{ background: '#f6ffed' }}>
                        <Statistic
                            title="Phân loại chính"
                            value={categories.length > 5 ? 5 : categories.length}
                            prefix={<TagsOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small" variant="borderless" style={{ background: '#fff7e6' }}>
                        <Statistic
                            title="Đang sử dụng"
                            value={100}
                            suffix="%"
                            prefix={<Divider type="vertical" />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} lg={8}>
                    <Card title={<Space><PlusOutlined />Thêm danh mục mới</Space>} variant="borderless">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleCreate}
                        >
                            <Form.Item
                                name="name"
                                label="Tên danh mục bài viết"
                                rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
                            >
                                <Input placeholder="VD: Sống khỏe, Dinh dưỡng..." size="large" />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isCreating}
                                    block
                                    size="large"
                                >
                                    Tạo danh mục mới
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} lg={16}>
                    <Card variant="borderless" bodyStyle={{ padding: 0 }}>
                        <Table
                            columns={columns}
                            dataSource={categories}
                            rowKey="id"
                            loading={loading}
                            pagination={{ pageSize: 8, showSizeChanger: false }}
                            locale={{ emptyText: 'Hệ thống chưa có danh mục nào.' }}
                        />
                    </Card>
                </Col>
            </Row>
        </Space>
    );
}
