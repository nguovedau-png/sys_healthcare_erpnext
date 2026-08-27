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
    message,
    Tooltip,
    Card,
    Statistic
} from 'antd';
import {
    EyeOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    TeamOutlined,
    PlusOutlined,
    ArrowLeftOutlined,
    FileTextOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';
import communityService, { SupportGroup } from '@/services/community.service';

const { Title, Text } = Typography;

export default function SupportGroupsManagement() {
    const [groups, setGroups] = useState<SupportGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchGroups = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await communityService.getSupportGroups(params);
            setGroups(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch support groups', error);
            message.error('Không thể tải danh sách nhóm hỗ trợ');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchGroups();
        }
    }, [searchText]);

    const handleDelete = (id: number, name: string) => {
        Modal.confirm({
            title: 'Giải tán nhóm hỗ trợ?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: `Bạn có chắc chắn muốn xóa nhóm "${name}"? Toàn bộ dữ liệu thành viên và bài viết trong nhóm sẽ bị gỡ bỏ.`,
            okText: 'Xác nhận xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await communityService.deleteSupportGroup(id);
                    message.success('Đã giải tán nhóm thành công');
                    fetchGroups();
                } catch (error) {
                    message.error('Lỗi khi xóa nhóm');
                }
            },
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'TÊN NHÓM & QUẢN TRỊ',
            render: (_: any, record: SupportGroup) => (
                <Space orientation="vertical" size={0}>
                    <Text strong style={{ fontSize: '15px' }}>{record.name}</Text>
                    <Space size="small">
                        <UserOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
                        <Text type="secondary" style={{ fontSize: '12px' }}>Admin: {record.moderatorName}</Text>
                    </Space>
                </Space>
            )
        },
        {
            key: 'members',
            label: 'THÀNH VIÊN',
            align: 'center' as const,
            render: (_: any, record: SupportGroup) => (
                <Space orientation="vertical" align="center" size={0}>
                    <Text strong>{record.membersCount || 0}</Text>
                    <Text type="secondary" style={{ fontSize: '11px' }}>thành viên</Text>
                </Space>
            )
        },
        {
            key: 'activity',
            label: 'HOẠT ĐỘNG',
            align: 'center' as const,
            render: (_: any, record: SupportGroup) => (
                <Space orientation="vertical" align="center" size={0}>
                    <Text strong>{record.postsCount || 0}</Text>
                    <Text type="secondary" style={{ fontSize: '11px' }}>bài viết</Text>
                </Space>
            )
        },
        {
            key: 'createdAt',
            label: 'NGÀY TẠO',
            render: (val: string) => <Text type="secondary">{new Date(val).toLocaleDateString('vi-VN')}</Text>
        },
        {
            key: 'status',
            label: 'TRẠNG THÁI',
            render: (val: string) => (
                <Tag color={val === 'active' ? 'success' : 'default'} variant="borderless">
                    {val === 'active' ? 'ĐANG HOẠT ĐỘNG' : 'TẠM NGƯNG'}
                </Tag>
            )
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>Nhóm hỗ trợ & Điều trị</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Nhóm hỗ trợ</Title>
                    <Text type="secondary">Xây dựng và duy trì các nhóm hỗ trợ bệnh nhân theo chuyên khoa</Text>
                </Col>
                <Col>
                    <Link href="/community/support-groups/create">
                        <Button type="primary" size="large" icon={<PlusOutlined />}>Tạo nhóm mới</Button>
                    </Link>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f0f5ff' }}>
                        <Statistic title="Tổng số nhóm" value={total} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#f6ffed' }}>
                        <Statistic title="Tổng thành viên" value={groups.reduce((acc, g) => acc + (g.membersCount || 0), 0)} prefix={<SafetyCertificateOutlined />} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#e6f7ff' }}>
                        <Statistic title="Tổng bài viết" value={groups.reduce((acc, g) => acc + (g.postsCount || 0), 0)} prefix={<FileTextOutlined />} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="borderless" style={{ background: '#fff7e6' }}>
                        <Statistic title="Đang hoạt động" value={groups.filter(g => g.status === 'active').length} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#fa8c16' }} />
                    </Card>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={groups}
                loading={loading}
                searchable
                searchPlaceholder="Tìm tên nhóm, người quản lý..."
                onSearch={handleSearch}
                pagination={{
                    currentPage: pagination.current,
                    totalPages: Math.ceil(total / pagination.pageSize),
                    pageSize: pagination.pageSize,
                    onPageChange: (page, pageSize) => {
                        setPagination({ current: page, pageSize: pageSize || 10 });
                    }
                }}
                actions={(row) => (
                    <Space size="small">
                        <Tooltip title="Xem chi tiết">
                            <Link href={`/community/support-groups/${row.id}`}>
                                <Button type="text" icon={<EyeOutlined style={{ color: '#1890ff' }} />} />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <Link href={`/community/support-groups/${row.id}/edit`}>
                                <Button type="text" icon={<EditOutlined style={{ color: '#faad14' }} />} />
                            </Link>
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(row.id, row.name)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
