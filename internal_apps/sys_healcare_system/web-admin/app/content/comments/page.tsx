"use client";

import React, { useState, useEffect } from 'react';
import {
    Typography,
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
    DeleteOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import contentService, { Comment } from '@/services/content.service';
import DataTable from '@/components/admin/DataTable';

const { Title, Text } = Typography;

export default function CommentsManagement() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const data = await contentService.getAllComments();
            setComments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch comments', error);
            message.error('Lỗi khi tải danh sách bình luận');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleDelete = (comment: Comment) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa bình luận này?',
            icon: <ExclamationCircleOutlined />,
            content: 'Hành động này không thể hoàn tác.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await contentService.deleteComment(comment.id);
                    message.success('Xóa bình luận thành công!');
                    fetchComments();
                } catch (error) {
                    message.error('Xóa thất bại');
                }
            },
        });
    };

    const getTargetLabel = (type: string) => {
        switch (type) {
            case 'post': return { text: 'Bài viết', color: 'blue' };
            case 'question': return { text: 'Hỏi đáp', color: 'orange' };
            case 'video': return { text: 'Video', color: 'purple' };
            default: return { text: type, color: 'default' };
        }
    };

    const columns = [
        {
            key: 'authorName',
            label: 'Người dùng',
            render: (text: string) => (
                <Space size={8}>
                    <UserOutlined style={{ color: '#bfbfbf' }} />
                    <Text strong>{text}</Text>
                </Space>
            ),
        },
        {
            key: 'content',
            label: 'Nội dung',
            render: (text: string) => <Text type="secondary" ellipsis={{ tooltip: text }}>{text}</Text>,
        },
        {
            key: 'targetType',
            label: 'Loại',
            render: (type: string) => {
                const label = getTargetLabel(type);
                return (
                    <Tag color={label.color} variant="borderless">
                        {label.text.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            key: 'date',
            label: 'Ngày',
            render: (date: string) => (
                <Space size={4}>
                    <CalendarOutlined style={{ fontSize: '12px', color: '#bfbfbf' }} />
                    <Text type="secondary" style={{ fontSize: '12px' }}>{date}</Text>
                </Space>
            ),
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý nội dung</Breadcrumb.Item>
                <Breadcrumb.Item>Bình luận</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Bình luận</Title>
                    <Text type="secondary">Quản lý phản hồi và thảo luận từ người dùng trên toàn hệ thống</Text>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={comments}
                loading={loading}
                searchable
                searchPlaceholder="Tìm tên người dùng, nội dung..."
                actions={(record) => (
                    <Tooltip title="Xóa bình luận">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record)}
                        />
                    </Tooltip>
                )}
            />
        </Space>
    );
}
