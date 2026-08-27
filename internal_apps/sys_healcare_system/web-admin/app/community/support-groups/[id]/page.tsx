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
    List
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    TeamOutlined,
    FileTextOutlined,
    UserOutlined,
    CalendarOutlined,
    SafetyCertificateOutlined,
    InfoCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import communityService, { SupportGroup } from '@/services/community.service';

const { Title, Text, Paragraph } = Typography;

export default function SupportGroupDetail() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [group, setGroup] = useState<SupportGroup | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchGroup = async () => {
        try {
            setLoading(true);
            const data = await communityService.getSupportGroup(Number(params.id));
            setGroup(data);
        } catch (error) {
            console.error('Failed to fetch group', error);
            message.error('Không thể tải chi tiết nhóm hỗ trợ');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchGroup();
        }
    }, [params.id]);

    const handleDelete = () => {
        Modal.confirm({
            title: 'Giải tán nhóm hỗ trợ này?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: 'Toàn bộ dữ liệu thành viên và bài viết trong nhóm sẽ bị xóa vĩnh viễn.',
            okText: 'Xác nhận xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await communityService.deleteSupportGroup(Number(params.id));
                    message.success('Đã giải tán nhóm thành công');
                    router.push('/community/support-groups');
                } catch (error) {
                    message.error('Lỗi khi xóa nhóm');
                }
            },
        });
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }

    if (!group) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Text type="secondary">Không tìm thấy thông tin nhóm hỗ trợ.</Text>
                <div style={{ marginTop: '20px' }}>
                    <Link href="/community/support-groups">
                        <Button icon={<ArrowLeftOutlined />}>Quay lại danh sách</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Mock rules for display as they are not in the interface
    const mockRules = [
        'Tôn trọng các thành viên khác trong nhóm.',
        'Không chia sẻ thông tin quảng cáo, spam.',
        'Mọi lời khuyên y tế cần được kiểm chứng bởi chuyên gia.',
        'Bảo mật thông tin riêng tư của các thành viên.'
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link href="/community/support-groups">Nhóm hỗ trợ & Điều trị</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Chi tiết nhóm</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col flex="auto">
                    <Space orientation="vertical" size={0}>
                        <Space>
                            <Link href="/community/support-groups">
                                <Button type="text" icon={<ArrowLeftOutlined />} />
                            </Link>
                            <Title level={2} style={{ margin: 0 }}>{group.name}</Title>
                        </Space>
                        <Space split={<Divider type="vertical" />}>
                            <Space>
                                <UserOutlined />
                                <Text type="secondary">Quản trị: {group.moderatorName}</Text>
                            </Space>
                            <Space>
                                <CalendarOutlined />
                                <Text type="secondary">Thành lập: {new Date(group.createdAt).toLocaleDateString('vi-VN')}</Text>
                            </Space>
                            <Tag color={group.status === 'active' ? 'success' : 'default'}>
                                {group.status === 'active' ? 'ĐANG HOẠT ĐỘNG' : 'TẠM NGƯNG'}
                            </Tag>
                        </Space>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        <Link href={`/community/support-groups/${group.id}/edit`}>
                            <Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button>
                        </Link>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={handleDelete}
                        >
                            Giải tán nhóm
                        </Button>
                    </Space>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} lg={16}>
                    <Card
                        title={<Space><InfoCircleOutlined />Giới thiệu nhóm</Space>}
                        variant="outlined"
                        className="shadow-sm"
                        style={{ marginBottom: '24px' }}
                    >
                        <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                            {group.description || 'Không có mô tả chi tiết cho nhóm này.'}
                        </Paragraph>
                    </Card>

                    <Card
                        title={<Space><SafetyCertificateOutlined />Quy tắc hoạt động</Space>}
                        variant="outlined"
                        className="shadow-sm"
                    >
                        <List
                            dataSource={mockRules}
                            renderItem={(item) => (
                                <List.Item style={{ border: 'none', padding: '8px 0' }}>
                                    <Space align="start">
                                        <CheckCircleOutlined style={{ color: '#52c41a', marginTop: '4px' }} />
                                        <Text>{item}</Text>
                                    </Space>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
                        <Card title="Chỉ số hoạt động" variant="outlined" className="shadow-sm">
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Statistic
                                        title="Thành viên"
                                        value={group.membersCount}
                                        prefix={<TeamOutlined />}
                                        valueStyle={{ color: '#1890ff' }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Bài viết"
                                        value={group.postsCount}
                                        prefix={<FileTextOutlined />}
                                        valueStyle={{ color: '#52c41a' }}
                                    />
                                </Col>
                            </Row>
                        </Card>

                        <Card title="Cấu hình quản trị" variant="outlined" className="shadow-sm">
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="ID Nhóm">
                                    <Text code>#{group.id}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="ID Quản trị">
                                    <Text type="secondary">{group.moderatorId}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Quyền riêng tư">
                                    <Tag color="blue">Công khai</Tag>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card title="Thao tác nâng cao" variant="outlined" className="shadow-sm">
                            <Space orientation="vertical" style={{ width: '100% ' }}>
                                <Button block ghost type="primary">Gửi thông báo toàn nhóm</Button>
                                <Button block>Quản lý thành viên</Button>
                                <Button block danger ghost>Khóa hoạt động tạm thời</Button>
                            </Space>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </Space>
    );
}
