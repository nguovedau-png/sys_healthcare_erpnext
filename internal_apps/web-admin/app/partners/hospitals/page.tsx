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
    Modal,
    message,
    Tag,
    Tooltip,
    Rate
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
    SafetyCertificateOutlined,
    EnvironmentOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import partnerService, { Hospital } from '@/services/partner.service';

const { Title, Text } = Typography;

export default function HospitalsManagement() {
    const router = useRouter();
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchHospitals = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await partnerService.getHospitals(params);
            setHospitals(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch hospitals', error);
            message.error('Lỗi khi tải danh sách bệnh viện');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchHospitals();
        }
    }, [searchText]);

    const handleDelete = (row: Hospital) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa bệnh viện "${row.name}" không? Hành động này không thể hoàn tác.`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await partnerService.deleteHospital(row.id);
                    message.success('Xóa bệnh viện thành công');
                    fetchHospitals();
                } catch (error: any) {
                    message.error('Lỗi: ' + (error.message || 'Không thể xóa bệnh viện'));
                }
            },
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Bệnh viện',
            render: (val: string, row: Hospital) => (
                <Space orientation="vertical" size={0}>
                    <Text strong>{val}</Text>
                    <Space size={4}>
                        <EnvironmentOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
                        <Text type="secondary" style={{ fontSize: '12px' }} ellipsis title={row.address}>
                            {row.address}
                        </Text>
                    </Space>
                </Space>
            )
        },
        {
            key: 'phone',
            label: 'Liên hệ',
            render: (val: string) => (
                <Space size={4}>
                    <PhoneOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
                    <Text>{val}</Text>
                </Space>
            )
        },
        {
            key: 'departments',
            label: 'Khoa chuyên môn',
            render: (val: string[]) => (
                <div style={{ maxWidth: '200px' }}>
                    {val?.slice(0, 2).map((d: string, i: number) => (
                        <Tag key={i} color="purple" style={{ marginBottom: '4px' }} variant="outlined">{d}</Tag>
                    ))}
                    {val?.length > 2 && (
                        <Tag color="default" variant="outlined">+{val.length - 2}</Tag>
                    )}
                </div>
            )
        },
        {
            key: 'beds',
            label: 'Quy mô',
            render: (val: number) => <Text strong>{val || 0} giường</Text>
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
                <Breadcrumb.Item>Quản lý Bệnh viện</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Bệnh viện</Title>
                    <Text type="secondary">Quản lý danh sách các bệnh viện đối tác trong hệ thống</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => router.push('/partners/hospitals/create')}
                    >
                        Thêm bệnh viện
                    </Button>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={hospitals}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm tên, địa chỉ bệnh viện..."
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
                                onClick={() => router.push(`/partners/hospitals/${row.id}/edit`)}
                            />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(row)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
