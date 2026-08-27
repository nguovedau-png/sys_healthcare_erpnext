"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import {
    Typography,
    Button,
    Space,
    Breadcrumb,
    Row,
    Col,
    Avatar,
    Tag,
    Rate,
    Select,
    message,
    Tooltip
} from 'antd';
import {
    EditOutlined,
    PlusOutlined,
    SafetyCertificateOutlined,
    UserOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import partnerService, { Doctor } from '@/services/partner.service';

const { Title, Text } = Typography;
const { Option } = Select;

export default function DoctorsManagement() {
    const router = useRouter();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('all');

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;
            if (specialtyFilter !== 'all') params.specialty = specialtyFilter;

            const response = await partnerService.getDoctors(params);
            setDoctors(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch doctors', error);
            message.error('Lỗi khi tải danh sách bác sĩ');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [pagination.current, pagination.pageSize, specialtyFilter]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchDoctors();
        }
    }, [searchText]);

    const columns = [
        {
            key: 'id',
            label: 'ID',
            render: (val: any) => <Text type="secondary">#{val}</Text>
        },
        {
            key: 'name',
            label: 'Bác sĩ',
            render: (val: string, row: Doctor) => (
                <Space size="middle">
                    <Avatar
                        size="large"
                        style={{ backgroundColor: '#1890ff' }}
                        icon={<UserOutlined />}
                    >
                        {val.charAt(0)}
                    </Avatar>
                    <Space orientation="vertical" size={0}>
                        <Text strong>{val}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{row.specialty}</Text>
                    </Space>
                </Space>
            )
        },
        {
            key: 'hospital',
            label: 'Bệnh viện',
            render: (val: string) => val ? <Text>{val}</Text> : <Text type="secondary">Tự do</Text>
        },
        {
            key: 'rating',
            label: 'Đánh giá',
            render: (val: number) => <Rate disabled defaultValue={val || 0} style={{ fontSize: '14px' }} allowHalf />
        },
        {
            key: 'isVerified',
            label: 'Trạng thái',
            render: (val: boolean) => (
                val ? (
                    <Tag icon={<SafetyCertificateOutlined />} color="success" variant="outlined">
                        Đã xác thực
                    </Tag>
                ) : (
                    <Tag color="default" variant="outlined">Chưa xác thực</Tag>
                )
            )
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý Bác sĩ</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Bác sĩ</Title>
                    <Text type="secondary">Danh bạ đội ngũ bác sĩ chuyên khoa trong mạng lưới</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => router.push('/partners/doctors/create')}
                    >
                        Thêm bác sĩ mới
                    </Button>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={6}>
                    <Select
                        placeholder="Lọc theo chuyên khoa"
                        style={{ width: '100%', borderRadius: '8px' }}
                        value={specialtyFilter}
                        onChange={(val) => {
                            setSpecialtyFilter(val);
                            setPagination({ ...pagination, current: 1 });
                        }}
                    >
                        <Option value="all">Tất cả chuyên khoa</Option>
                        <Option value="Tim mạch">Tim mạch</Option>
                        <Option value="Nhi khoa">Nhi khoa</Option>
                        <Option value="Tiêu hóa">Tiêu hóa</Option>
                    </Select>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={doctors}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm tên bác sĩ, bệnh viện..."
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
                        <Tooltip title="Chỉnh sửa">
                            <Button
                                type="text"
                                icon={<EditOutlined style={{ color: '#1890ff' }} />}
                                onClick={() => router.push(`/partners/doctors/${row.id}/edit`)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
