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
    message,
    Tooltip
} from 'antd';
import {
    EyeOutlined,
    EditOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import partnerService, { Patient } from '@/services/partner.service';

const { Title, Text } = Typography;

export default function PatientsManagement() {
    const router = useRouter();
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await partnerService.getPatients(params);
            setPatients(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch patients', error);
            message.error('Lỗi khi tải danh sách bệnh nhân');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchPatients();
        }
    }, [searchText]);

    const columns = [
        {
            key: 'name',
            label: 'Bệnh nhân',
            render: (val: string, row: Patient) => (
                <Space size="middle">
                    <Avatar
                        size="large"
                        style={{ backgroundColor: '#87d068' }}
                        icon={<UserOutlined />}
                    >
                        {val.charAt(0)}
                    </Avatar>
                    <Space orientation="vertical" size={0}>
                        <Text strong>{val}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{row.phone}</Text>
                    </Space>
                </Space>
            )
        },
        {
            key: 'email',
            label: 'Email',
            render: (val: string) => val || <Text type="secondary">N/A</Text>
        },
        {
            key: 'visits',
            label: 'Lượt khám',
            render: (val: number) => <Text strong>{val || 0}</Text>
        },
        {
            key: 'lastVisit',
            label: 'Lần cuối',
            render: (val: string) => val ? <Text>{val}</Text> : <Text type="secondary">Chưa khám</Text>
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
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý Bệnh nhân</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Bệnh nhân</Title>
                    <Text type="secondary">Quản lý hồ sơ y tế và thông tin người bệnh trong hệ thống</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => router.push('/partners/patients/create')}
                    >
                        Thêm bệnh nhân
                    </Button>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={patients}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm tên, email, số điện thoại..."
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
                                onClick={() => router.push(`/partners/patients/${row.id}`)}
                            />
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <Button
                                type="text"
                                icon={<EditOutlined style={{ color: '#52c41a' }} />}
                                onClick={() => router.push(`/partners/patients/${row.id}/edit`)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
