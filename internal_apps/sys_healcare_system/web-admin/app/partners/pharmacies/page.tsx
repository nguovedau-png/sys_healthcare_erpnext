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
import partnerService, { Pharmacy } from '@/services/partner.service';

const { Title, Text } = Typography;

export default function PharmaciesManagement() {
    const router = useRouter();
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchPharmacies = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const response = await partnerService.getPharmacies(params);
            setPharmacies(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch pharmacies', error);
            message.error('Lỗi khi tải danh sách nhà thuốc');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPharmacies();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchPharmacies();
        }
    }, [searchText]);

    const handleDelete = (row: Pharmacy) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            icon: <ExclamationCircleOutlined />,
            content: `Bạn có chắc chắn muốn xóa nhà thuốc "${row.name}" không? Hành động này không thể hoàn tác.`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await partnerService.deletePharmacy(row.id);
                    message.success('Xóa nhà thuốc thành công');
                    fetchPharmacies();
                } catch (error: any) {
                    message.error('Lỗi: ' + (error.message || 'Không thể xóa nhà thuốc'));
                }
            },
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Nhà thuốc',
            render: (val: string, row: Pharmacy) => (
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
            key: 'rating',
            label: 'Đánh giá',
            render: (val: number) => <Rate disabled defaultValue={val || 0} style={{ fontSize: '14px' }} allowHalf />
        },
        {
            key: 'isVerified',
            label: 'Trạng thái',
            render: (val: boolean) => (
                val ? (
                    <Tag icon={<SafetyCertificateOutlined />} color="success" variant="borderless">
                        Đã xác thực
                    </Tag>
                ) : (
                    <Tag color="default" variant="borderless">Chưa xác thực</Tag>
                )
            )
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý Nhà thuốc</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Nhà thuốc</Title>
                    <Text type="secondary">Quản lý hệ thống các nhà thuốc đối tác cung ứng dược phẩm</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => router.push('/partners/pharmacies/create')}
                    >
                        Thêm nhà thuốc
                    </Button>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={pharmacies}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm tên, địa chỉ nhà thuốc..."
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
                                onClick={() => router.push(`/partners/pharmacies/${row.id}/edit`)}
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
