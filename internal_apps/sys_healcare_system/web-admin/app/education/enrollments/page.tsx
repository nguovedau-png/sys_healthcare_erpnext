"use client";

import React, { useState } from 'react';
import {
    Typography,
    Button,
    Space,
    Card,
    Breadcrumb,
    Row,
    Col,
    Tag,
    Tooltip,
    Avatar,
    message,
    Modal
} from 'antd';
import {
    PlusOutlined,
    UserOutlined,
    MailOutlined,
    BookOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    DeleteOutlined,
    EyeOutlined,
    SyncOutlined
} from '@ant-design/icons';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { educationService, Enrollment } from '@/services/education.service';

const { Title, Text } = Typography;

export default function EnrollmentsPage() {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await educationService.getEnrollments(params);
            setEnrollments(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch enrollments:', error);
            message.error('Lỗi khi tải danh sách ghi danh');
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchEnrollments();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    React.useEffect(() => {
        if (searchText !== undefined) {
            fetchEnrollments();
        }
    }, [searchText]);

    const columns = [
        {
            key: 'student',
            label: 'Học viên',
            render: (_: any, row: any) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Space orientation="vertical" size={0}>
                        <Text strong>{row.studentName}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}><MailOutlined /> {row.email}</Text>
                    </Space>
                </Space>
            )
        },
        {
            key: 'courseName',
            label: 'Khóa học',
            render: (val: string) => (
                <Space>
                    <BookOutlined style={{ color: '#1890ff' }} />
                    <Text>{val}</Text>
                </Space>
            )
        },
        {
            key: 'enrollDate',
            label: 'Ngày ghi danh',
            render: (val: string) => <Space><ClockCircleOutlined /> {val}</Space>
        },
        {
            key: 'progress',
            label: 'Tiến độ',
            render: (val: number) => (
                <Space orientation="vertical" size={0} style={{ width: '120px' }}>
                    <Text strong>{val}%</Text>
                    <div style={{ background: '#f5f5f5', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ background: val === 100 ? '#52c41a' : '#1890ff', width: `${val}%`, height: '100%' }} />
                    </div>
                </Space>
            )
        },
        {
            key: 'status',
            label: 'Trạng thái',
            render: (val: string) => <StatusBadge status={val as any} />
        },
    ];

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Hủy ghi danh học viên?',
            content: 'Bạn có chắc chắn muốn hủy đăng ký khóa học cho học viên này không? Dữ liệu tiến độ học tập sẽ bị mất.',
            okText: 'Xác nhận',
            cancelText: 'Quay lại',
            okType: 'danger',
            onOk: () => {
                message.success('Đã hủy ghi danh thành công');
            }
        });
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>Ghi danh & Học viên</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Space orientation="vertical" size={0}>
                        <Title level={2} style={{ margin: 0 }}>Quản lý Ghi danh</Title>
                        <Text type="secondary">Quản lý danh sách học viên và tiến độ học tập trong các khóa học</Text>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        <Button icon={<SyncOutlined />} onClick={() => message.info('Đã cập nhật dữ liệu mới nhất')}>Làm mới</Button>
                        <Button type="primary" icon={<PlusOutlined />} size="large">Ghi danh học viên</Button>
                    </Space>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={enrollments}
                loading={loading}
                searchable
                searchPlaceholder="Tìm tên học viên, email hoặc tên khóa học..."
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
                        <Tooltip title="Xem báo cáo chi tiết">
                            <Button type="text" icon={<EyeOutlined style={{ color: '#1890ff' }} />} />
                        </Tooltip>
                        <Tooltip title="Hủy ghi danh">
                            <Button type="text" icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />} onClick={() => handleDelete(row.id)} />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
