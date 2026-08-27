"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Typography,
    List,
    Card,
    Tag,
    Avatar,
    Button,
    Space,
    Breadcrumb,
    Row,
    Col,
    Modal,
    message,
    Tooltip
} from 'antd';
import {
    DeleteOutlined,
    ArrowRightOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import communityService, { QAQuestion } from '@/services/community.service';

const { Title, Text, Paragraph } = Typography;

export default function QuestionsManagement() {
    const [questions, setQuestions] = useState<QAQuestion[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const data = await communityService.getQAQuestions();
            setQuestions(data.data);
        } catch (error) {
            console.error('Failed to fetch questions', error);
            message.error('Lỗi khi tải danh sách câu hỏi');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleDelete = (id: number | string, questionText: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa câu hỏi',
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa câu hỏi: "${questionText}"?`,
            okText: 'Xóa câu hỏi',
            okType: 'danger',
            cancelText: 'Hủy bỏ',
            onOk: async () => {
                try {
                    await communityService.deleteQAQuestion(Number(id));
                    message.success('Đã xóa câu hỏi thành công');
                    fetchQuestions();
                } catch (error) {
                    message.error('Xóa thất bại');
                }
            },
        });
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>Hỏi đáp & Tư vấn</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Hỏi đáp & Tư vấn</Title>
                    <Text type="secondary">Quản lý câu hỏi từ người dùng và phản hồi chuyên môn của bác sĩ</Text>
                </Col>
            </Row>

            <List
                loading={loading}
                dataSource={questions}
                grid={{ gutter: 16, column: 1 }}
                renderItem={(q) => (
                    <List.Item>
                        <Card
                            hoverable
                            className="group"
                            actions={[
                                <Link key="view" href={`/content/questions/${q.id}`}>
                                    <Space>
                                        Xem chi tiết & Trả lời <ArrowRightOutlined />
                                    </Space>
                                </Link>
                            ]}
                            extra={
                                <Tooltip title="Xóa câu hỏi">
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDelete(q.id, q.question)}
                                        className="opacity-0 group-hover:opacity-100"
                                    />
                                </Tooltip>
                            }
                        >
                            <Space orientation="vertical" size="middle" style={{ display: 'flex' }}>
                                <Space>
                                    <Tag
                                        icon={q.status === 'resolved' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                                        color={q.status === 'resolved' ? 'success' : 'warning'}
                                        variant="outlined"
                                    >
                                        {q.status === 'resolved' ? 'Đã trả lời' : 'Chờ trả lời'}
                                    </Tag>
                                    <Tag color="processing" variant="outlined">{q.category}</Tag>
                                </Space>

                                <div>
                                    <Title level={4} style={{ marginBottom: 8 }}>{q.question}</Title>
                                    <Paragraph type="secondary" ellipsis={{ rows: 2 }}>{q.content}</Paragraph>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Space>
                                        <Avatar style={{ backgroundColor: '#1890ff' }}>
                                            {q.askedByName.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Space orientation="vertical" size={0}>
                                            <Text strong>{q.askedByName}</Text>
                                            <Text type="secondary" style={{ fontSize: '11px' }}>
                                                {new Date(q.createdAt).toLocaleDateString()}
                                            </Text>
                                        </Space>
                                    </Space>
                                </div>
                            </Space>
                        </Card>
                    </List.Item>
                )}
                locale={{
                    emptyText: 'Chưa có câu hỏi nào cần xử lý.'
                }}
            />
        </Space>
    );
}
