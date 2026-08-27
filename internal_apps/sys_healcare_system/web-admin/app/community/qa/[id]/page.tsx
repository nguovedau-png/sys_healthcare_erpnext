"use client";

import React, { useState, useEffect } from 'react';
import {
    Typography,
    Button,
    Space,
    Card,
    Tag,
    Breadcrumb,
    Row,
    Col,
    Modal,
    message,
    Descriptions,
    Statistic,
    Spin,
    Divider,
    Avatar,
    List,
    Tooltip
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
    UserOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    QuestionCircleOutlined,
    FolderOpenOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import communityService, { QAQuestion } from '@/services/community.service';

const { Title, Text, Paragraph } = Typography;

export default function QADetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [qa, setQA] = useState<QAQuestion | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchQA = async () => {
        try {
            setLoading(true);
            const data = await communityService.getQAQuestion(Number(params.id));
            setQA(data);
        } catch (error) {
            console.error('Failed to fetch QA', error);
            message.error('Không thể tải chi tiết câu hỏi');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchQA();
        }
    }, [params.id]);

    const handleDelete = () => {
        Modal.confirm({
            title: 'Xóa câu hỏi này?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: 'Câu hỏi và toàn bộ các câu trả lời liên quan sẽ bị gỡ bỏ vĩnh viễn.',
            okText: 'Xác nhận xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await communityService.deleteQAQuestion(Number(params.id));
                    message.success('Đã xóa câu hỏi thành công');
                    router.push('/community/qa');
                } catch (error) {
                    message.error('Lỗi khi xóa câu hỏi');
                }
            },
        });
    };

    const handleApprove = async () => {
        try {
            await communityService.updateQAQuestion(Number(params.id), { status: 'approved' });
            message.success('Đã duyệt câu hỏi thành công');
            fetchQA();
        } catch (error) {
            message.error('Lỗi khi duyệt câu hỏi');
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    if (!qa) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Text type="secondary">Không tìm thấy thông tin câu hỏi.</Text>
                <div style={{ marginTop: '20px' }}>
                    <Link href="/community/qa">
                        <Button icon={<ArrowLeftOutlined />}>Quay lại danh sách</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/community/qa">Hỏi đáp chuyên gia</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết câu hỏi</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col flex="auto">
                    <Space orientation="vertical" size={0}>
                        <Space>
                            <Link href="/community/qa">
                                <Button type="text" icon={<ArrowLeftOutlined />} />
                            </Link>
                            <Title level={2} style={{ margin: 0 }}>{qa.question}</Title>
                        </Space>
                        <Space split={<Divider type="vertical" />}>
                            <Space>
                                <UserOutlined />
                                <Text type="secondary">Người gửi: {qa.askedByName}</Text>
                            </Space>
                            <Space>
                                <CalendarOutlined />
                                <Text type="secondary">{new Date(qa.createdAt).toLocaleString('vi-VN')}</Text>
                            </Space>
                            <Tag color={qa.status === 'approved' ? 'success' : qa.status === 'spam' ? 'error' : 'warning'}>
                                {qa.status === 'approved' ? 'ĐÃ DUYỆT' : qa.status === 'spam' ? 'SPAM' : 'CHỜ DUYỆT'}
                            </Tag>
                        </Space>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        {qa.status !== 'approved' && (
                            <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                onClick={handleApprove}
                                style={{ background: '#52c41a', borderColor: '#52c41a' }}
                            >
                                Duyệt câu hỏi
                            </Button>
                        )}
                        <Link href={`/community/qa/${qa.id}/edit`}>
                            <Button icon={<EditOutlined />}>Chỉnh sửa</Button>
                        </Link>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={handleDelete}
                        >
                            Xóa câu hỏi
                        </Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} lg={16}>
                    <Card
                        title={<Space><QuestionCircleOutlined />Nội dung câu hỏi</Space>}
                        variant="outlined"
                        className="shadow-sm"
                        style={{ marginBottom: '24px' }}
                    >
                        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                            {qa.content || 'Không có mô tả chi tiết cho câu hỏi này.'}
                        </Paragraph>
                    </Card>

                    <Card
                        title={<Space><CommentOutlined />Câu trả lời ({qa._count?.answers || 0})</Space>}
                        variant="outlined"
                        className="shadow-sm"
                    >
                        {/* Note: Assuming answers would be fetched or are part of the detailed object in a real API */}
                        {/* For now, we simulate a list if answers were available in the object */}
                        <List
                            itemLayout="horizontal"
                            dataSource={[]} // In real app, this would be qa.answers
                            locale={{ emptyText: 'Chưa có câu trả lời nào cho câu hỏi này.' }}
                            renderItem={(item: any) => (
                                <List.Item
                                    actions={[
                                        <Space key="like"><LikeOutlined /> {item.likes || 0}</Space>,
                                        <Button key="delete" type="text" danger icon={<DeleteOutlined />} size="small" />
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<UserOutlined />} />}
                                        title={<Text strong>{item.author}</Text>}
                                        description={new Date(item.createdDate).toLocaleDateString('vi-VN')}
                                    />
                                    <Paragraph style={{ marginTop: '8px' }}>{item.content}</Paragraph>
                                </List.Item>
                            )}
                        />
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <Button type="dashed" block icon={<CommentOutlined />}>Thêm câu trả lời chuyên gia</Button>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
                        <Card title="Thống kê" variant="outlined" className="shadow-sm">
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Statistic
                                        title="Lượt xem"
                                        value={qa.views}
                                        prefix={<EyeOutlined />}
                                        valueStyle={{ color: '#1890ff' }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Câu trả lời"
                                        value={qa._count?.answers || 0}
                                        prefix={<CommentOutlined />}
                                        valueStyle={{ color: '#52c41a' }}
                                    />
                                </Col>
                            </Row>
                        </Card>

                        <Card title="Phân loại" variant="outlined" className="shadow-sm">
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label={<Space><FolderOpenOutlined />Chuyên khoa</Space>}>
                                    <Tag color="cyan">{qa.category}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><UserOutlined />ID Người hỏi</Space>}>
                                    <Text code>{qa.askedById}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="ID Hệ thống">
                                    <Text type="secondary">#{qa.id}</Text>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card title="Tác vụ nhanh" variant="outlined" className="shadow-sm">
                            <Space orientation="vertical" style={{ width: '100%' }}>
                                <Button block>Yêu cầu chuyên gia trả lời</Button>
                                <Button block ghost type="primary">Gửi thông báo cho người hỏi</Button>
                                <Button block danger ghost onClick={() => message.warning('Chức năng đánh dấu Spam đang được cập nhật')}>Đánh dấu Spam</Button>
                            </Space>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </Space>
    );
}
