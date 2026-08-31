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
    CheckCircleOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    FlagOutlined,
    ClockCircleOutlined,
    UserOutlined,
    AlertOutlined,
    FileTextOutlined,
    SafetyOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';
import communityService, { ModerationReport } from '@/services/community.service';

const { Title, Text, Paragraph } = Typography;

export default function ModerationManagement() {
    const [reports, setReports] = useState<ModerationReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchReports = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await communityService.getModerationReports(params);
            setReports(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch moderation reports', error);
            message.error('Không thể tải danh sách báo cáo vi phạm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchReports();
        }
    }, [searchText]);

    const handleResolve = async (id: number) => {
        try {
            await communityService.updateModerationReport(id, { status: 'resolved' });
            message.success('Đã đánh dấu đã giải quyết');
            fetchReports();
        } catch (error) {
            message.error('Lỗi khi cập nhật trạng thái');
        }
    };

    const handleDeleteContent = (id: number, contentPreview: string) => {
        Modal.confirm({
            title: 'Xóa nội dung vi phạm?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: `Bạn có chắc chắn muốn xóa nội dung: "${contentPreview}"? Hành động này sẽ gỡ bỏ nội dung khỏi hệ thống.`,
            okText: 'Xác nhận xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await communityService.deleteModerationReport(id);
                    message.success('Đã gỡ bỏ nội dung vi phạm');
                    fetchReports();
                } catch (error) {
                    message.error('Lỗi khi xóa nội dung');
                }
            },
        });
    };

    const columns = [
        {
            key: 'content',
            label: 'NỘI DUNG BỊ BÁO CÁO',
            render: (_: any, record: ModerationReport) => (
                <Space orientation="vertical" size={0}>
                    <Paragraph ellipsis={{ rows: 2 }} style={{ margin: 0, fontWeight: 500 }}>
                        {record.contentPreview || 'Nội dung không khả dụng'}
                    </Paragraph>
                    <Space size="small">
                        <Tag color="orange" variant="outlined" style={{ fontSize: '11px' }}>{record.contentType?.toUpperCase()}</Tag>
                        <Text type="secondary" style={{ fontSize: '12px' }}>Tác giả: {record.authorName}</Text>
                    </Space>
                </Space>
            )
        },
        {
            key: 'reporter',
            label: 'NGƯỜI BÁO CÁO & LÝ DO',
            render: (_: any, record: ModerationReport) => (
                <Space orientation="vertical" size={0}>
                    <Space size={4}>
                        <UserOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
                        <Text style={{ fontSize: '13px' }}>{record.reportedByName}</Text>
                    </Space>
                    <Text type="danger" style={{ fontSize: '12px' }}>{record.reason}</Text>
                </Space>
            )
        },
        {
            key: 'createdAt',
            label: 'THỜI GIAN',
            render: (val: string) => <Text type="secondary" style={{ fontSize: '13px' }}>{new Date(val).toLocaleString('vi-VN')}</Text>
        },
        {
            key: 'status',
            label: 'TRẠNG THÁI',
            render: (val: string) => {
                const colors: Record<string, string> = {
                    resolved: 'success',
                    pending: 'warning',
                    dismissed: 'default'
                };
                const labels: Record<string, string> = {
                    resolved: 'ĐÃ XỬ LÝ',
                    pending: 'CHỜ DUYỆT',
                    dismissed: 'BỎ QUA'
                };
                return <Tag color={colors[val] || 'default'} variant="outlined">{labels[val] || val.toUpperCase()}</Tag>;
            }
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Cộng đồng</Breadcrumb.Item>
                <Breadcrumb.Item>Kiểm duyệt nội dung</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Kiểm duyệt Nội dung</Title>
                    <Text type="secondary">Xử lý các báo cáo vi phạm tiêu chuẩn cộng đồng từ người dùng</Text>
                </Col>
                <Col>
                    <Button icon={<SafetyOutlined />} size="large">Quy tắc cộng đồng</Button>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#fff2f0' }}>
                        <Statistic title="Tổng báo cáo" value={total} prefix={<FlagOutlined />} valueStyle={{ color: '#cf1322' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#fffbe6' }}>
                        <Statistic title="Chưa xử lý" value={reports.filter(r => r.status === 'pending').length} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#d46b08' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f6ffed' }}>
                        <Statistic title="Đã giải quyết" value={reports.filter(r => r.status === 'resolved').length} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card size="small" variant="outlined" style={{ background: '#f0f5ff' }}>
                        <Statistic title="Nghiêm trọng" value={reports.filter(r => r.reason?.includes('Spam')).length} prefix={<AlertOutlined />} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={reports}
                loading={loading}
                searchable
                searchPlaceholder="Tìm nội dung, tác giả, người báo cáo..."
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
                        <Tooltip title="Xem nội dung chi tiết">
                            <Link href={`/community/moderation/${row.id}`}>
                                <Button type="text" icon={<FileTextOutlined style={{ color: '#1890ff' }} />} />
                            </Link>
                        </Tooltip>
                        {row.status === 'pending' && (
                            <Tooltip title="Đánh dấu đã giải quyết">
                                <Button type="text" icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} onClick={() => handleResolve(row.id)} />
                            </Tooltip>
                        )}
                        <Tooltip title="Xóa nội dung vi phạm">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteContent(row.id, row.contentPreview || '')}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
