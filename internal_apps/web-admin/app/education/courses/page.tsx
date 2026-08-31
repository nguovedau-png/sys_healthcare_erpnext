"use client";

import React, { useEffect, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import {
    Button,
    Typography,
    Space,
    Breadcrumb,
    Row,
    Col,
    Tag,
    Tooltip,
    Modal,
    message
} from 'antd';
import {
    PlusOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { educationService, Course } from '@/services/education.service';

const { Title, Text } = Typography;

export default function EducationCoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await educationService.getCourses(params);
            setCourses(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            message.error('Lỗi khi tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchCourses();
        }
    }, [searchText]);

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Xác nhận xóa khóa học',
            content: 'Bạn có chắc chắn muốn xóa khóa học này không? Hành động này không thể hoàn tác.',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await educationService.deleteCourse(id);
                    message.success('Đã xóa khóa học thành công');
                    setCourses(prev => prev.filter(c => c.id !== id));
                } catch (error) {
                    console.error('Failed to delete course:', error);
                    message.error('Không thể xóa khóa học');
                }
            }
        });
    };

    const columns = [
        {
            key: 'id',
            label: 'Mã khóa học',
            render: (val: string) => <Text code>{val}</Text>
        },
        {
            key: 'name',
            label: 'Tên khóa học',
            render: (val: string, row: Course) => (
                <Space orientation="vertical" size={0}>
                    <Text strong>{val}</Text>
                    <Text type="secondary" style={{ fontSize: '11px' }}>{row.provider}</Text>
                </Space>
            )
        },
        {
            key: 'type',
            label: 'Loại hình',
            render: (val: string) => (
                <Tag color={val === 'CME' ? 'blue' : 'purple'} variant="outlined">
                    {val}
                </Tag>
            )
        },
        {
            key: 'credits',
            label: 'Tín chỉ',
            render: (val: number) => <Text>{val} giờ</Text>
        },
        {
            key: 'price',
            label: 'Học phí',
            render: (val: number) => (
                <Text strong type={val === 0 ? 'success' : 'danger'}>
                    {val === 0 ? 'Miễn phí' : val.toLocaleString() + ' đ'}
                </Text>
            )
        },
        {
            key: 'students',
            label: 'Học viên',
            render: (val: number) => <Text>{val || 0} / 200</Text>
        },
        {
            key: 'status',
            label: 'Trạng thái',
            render: (val: string) => <StatusBadge status={val as any} />
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Giáo dục</Breadcrumb.Item>
                <Breadcrumb.Item>Khóa học CME/CPE</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Đào tạo & Tập huấn (CME/CPE)</Title>
                    <Text type="secondary">Quản lý các khóa học giáo dục y khoa liên tục cho nhân viên y tế</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => router.push('/education/courses/create')}
                    >
                        Tạo khóa học mới
                    </Button>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={courses}
                loading={loading}
                searchable
                searchPlaceholder="Tìm tên khóa học, đơn vị tổ chức..."
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
                            <Button
                                type="text"
                                icon={<EyeOutlined style={{ color: '#1890ff' }} />}
                                onClick={() => router.push(`/education/courses/${row.id}`)}
                            />
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <Button
                                type="text"
                                icon={<EditOutlined style={{ color: '#52c41a' }} />}
                                onClick={() => router.push(`/education/courses/${row.id}/edit`)}
                            />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(row.id)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
