"use client";

import React, { useState, useEffect } from 'react';
import {
    Typography,
    Button,
    Space,
    Tag,
    Breadcrumb,
    Row,
    Col,
    Modal,
    Form,
    Input,
    InputNumber,
    message,
    Tooltip,
    Switch
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
    SearchOutlined
} from '@ant-design/icons';
import contentService, { TopSearchKeyword } from '@/services/content.service';
import DataTable from '@/components/admin/DataTable';

const { Title, Text } = Typography;

export default function TopSearchesManagement() {
    const [keywords, setKeywords] = useState<TopSearchKeyword[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingKeyword, setEditingKeyword] = useState<TopSearchKeyword | null>(null);
    const [form] = Form.useForm();

    const fetchKeywords = async () => {
        try {
            setLoading(true);
            const data = await contentService.getTopSearches();
            setKeywords(data);
        } catch (error) {
            console.error(error);
            message.error('Lỗi khi tải danh sách từ khóa');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKeywords();
    }, []);

    const handleDelete = (keyword: TopSearchKeyword) => {
        Modal.confirm({
            title: 'Xác nhận xóa từ khóa',
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa từ khóa "${keyword.keyword}"?`,
            okText: 'Xóa ngay',
            okType: 'danger',
            cancelText: 'Hủy bỏ',
            onOk: async () => {
                try {
                    await contentService.deleteTopSearch(keyword.id);
                    message.success('Đã xóa từ khóa thành công');
                    fetchKeywords();
                } catch (err) {
                    message.error('Xóa thất bại');
                }
            },
        });
    };

    const handleToggleStatus = async (keyword: TopSearchKeyword) => {
        try {
            await contentService.updateTopSearch(keyword.id, { isActive: !keyword.isActive });
            message.success(`Đã ${!keyword.isActive ? 'hiện' : 'ẩn'} từ khóa`);
            fetchKeywords();
        } catch (err) {
            message.error('Cập nhật thất bại');
        }
    };

    const handleSave = async (values: any) => {
        try {
            if (editingKeyword) {
                await contentService.updateTopSearch(editingKeyword.id, values);
                message.success('Đã cập nhật từ khóa');
            } else {
                await contentService.createTopSearch(values.keyword, values.count);
                message.success('Đã thêm từ khóa mới');
            }
            setIsModalOpen(false);
            fetchKeywords();
        } catch (err) {
            message.error('Lưu thất bại');
        }
    };

    const openCreateModal = () => {
        setEditingKeyword(null);
        form.resetFields();
        form.setFieldsValue({ count: 0 });
        setIsModalOpen(true);
    };

    const openEditModal = (keyword: TopSearchKeyword) => {
        setEditingKeyword(keyword);
        form.setFieldsValue(keyword);
        setIsModalOpen(true);
    };

    const columns = [
        {
            key: 'index',
            label: 'STT',
            width: '60px',
            render: (_: any, __: any, index: number) => index + 1
        },
        {
            key: 'keyword',
            label: 'Từ khóa',
            render: (text: string) => <Text strong>{text}</Text>
        },
        {
            key: 'count',
            label: 'Lượt tìm kiếm',
            align: 'center' as const,
            render: (count: number) => (
                <Tag color="blue" variant="borderless" style={{ fontWeight: 'bold' }}>
                    {count.toLocaleString()}
                </Tag>
            )
        },
        {
            key: 'isActive',
            label: 'Trạng thái',
            align: 'center' as const,
            render: (isActive: boolean, record: TopSearchKeyword) => (
                <Switch
                    checked={isActive}
                    onChange={() => handleToggleStatus(record)}
                    checkedChildren="Hiện"
                    unCheckedChildren="Ẩn"
                />
            )
        }
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Tìm kiếm nhiều nhất</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Tìm kiếm nhiều nhất</Title>
                    <Text type="secondary">Tổng cộng: {keywords.length} từ khóa được quan tâm</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={openCreateModal}
                    >
                        Thêm từ khóa mới
                    </Button>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={keywords}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm từ khóa..."
                actions={(record) => (
                    <Space size="small">
                        <Tooltip title="Chỉnh sửa">
                            <Button
                                type="text"
                                icon={<EditOutlined style={{ color: '#1890ff' }} />}
                                onClick={() => openEditModal(record)}
                            />
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
                )}
            />

            <Modal
                title={editingKeyword ? 'Chỉnh sửa từ khóa' : 'Thêm từ khóa mới'}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                okText={editingKeyword ? 'Cập nhật' : 'Thêm mới'}
                cancelText="Hủy bỏ"
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{ count: 0 }}
                    style={{ marginTop: 24 }}
                >
                    <Form.Item
                        name="keyword"
                        label="Từ khóa"
                        rules={[{ required: true, message: 'Vui lòng nhập từ khóa' }]}
                    >
                        <Input placeholder="Ví dụ: Đau đầu, Khám sức khỏe..." />
                    </Form.Item>
                    <Form.Item
                        name="count"
                        label="Lượt tìm kiếm"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượt tìm kiếm' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Form>
            </Modal>
        </Space>
    );
}