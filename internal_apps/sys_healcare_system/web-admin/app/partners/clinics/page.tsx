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
import partnerService, { Clinic } from '@/services/partner.service';

const { Title, Text } = Typography;

export default function ClinicsManagement() {
    const router = useRouter();
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchClinics = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await partnerService.getClinics(params);
            setClinics(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch clinics', error);
            message.error('Lỗi khi tải danh sách phòng khám');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClinics();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchClinics();
        }
    }, [searchText]);

    const handleDelete = (row: Clinic) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa phòng khám "${row.name}" không? Hành động này không thể hoàn tác.`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await partnerService.deleteClinic(row.id);
                    message.success('Xóa phòng khám thành công');
                    fetchClinics();
                } catch (error: any) {
                    message.error('Lỗi: ' + (error.message || 'Không thể xóa phòng khám'));
                }
            },
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Phòng khám',
            render: (val: string, row: Clinic) => (
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
            key: 'specialties',
            label: 'Chuyên khoa',
            render: (val: string[]) => (
                <div style={{ maxWidth: '200px' }}>
                    {val?.slice(0, 2).map((s: string, i: number) => (
                        <Tag key={i} color="blue" style={{ marginBottom: '4px' }} variant="outlined">{s}</Tag>
                    ))}
                    {val?.length > 2 && (
                        <Tag color="default" variant="outlined">+{val.length - 2}</Tag>
                    )}
                </div>
            )
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
                <Breadcrumb.Item>Quản lý Phòng khám</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Phòng khám</Title>
                    <Text type="secondary">Quản lý danh sách các phòng khám trong mạng lưới dịch vụ</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => router.push('/partners/clinics/create')}
                    >
                        Thêm phòng khám
                    </Button>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={clinics}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm tên, địa chỉ phòng khám..."
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
                                onClick={() => router.push(`/partners/clinics/${row.id}/edit`)}
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
