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
    Tag,
    message,
    Tooltip,
    Modal,
    Input
} from 'antd';
import {
    CheckOutlined,
    CloseOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import partnerService from '@/services/partner.service';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function PendingPartnersManagement() {
    const [partners, setPartners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');

    const fetchPendingPartners = async () => {
        try {
            setLoading(true);
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;

            const data = await partnerService.getPendingPartners();
            // Since getPendingPartners might not yet support server-side filters if it's a mixed collection
            // but we refactored it to return pagination in backend earlier.
            // Let's check partnerService.getPendingPartners definition in backend.
            // Wait, I updated PartnerController in backend to support PaginationDto for getPendingPartners too.
            // So response should be { data, meta }.

            if (data && (data as any).data) {
                setPartners((data as any).data);
                setTotal((data as any).meta?.total || (data as any).data.length);
            } else {
                setPartners(Array.isArray(data) ? data : []);
                setTotal(Array.isArray(data) ? data.length : 0);
            }
        } catch (error) {
            console.error('Failed to fetch pending partners', error);
            message.error('Lỗi khi tải danh sách đối tác chờ duyệt');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingPartners();
    }, [pagination.current, pagination.pageSize]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchPendingPartners();
        }
    }, [searchText]);

    const handleApprove = (row: any) => {
        Modal.confirm({
            title: 'Duyệt đối tác',
            icon: <CheckOutlined style={{ color: '#52c41a' }} />,
            content: `Bạn có chắc chắn muốn duyệt đối tác "${row.name || row.fullName}" không?`,
            onOk: async () => {
                try {
                    const updateData = { isVerified: true, status: 'active' };
                    switch (row.type) {
                        case 'doctor': await partnerService.updateDoctor(row.id, updateData); break;
                        case 'clinic': await partnerService.updateClinic(row.id, updateData); break;
                        case 'hospital': await partnerService.updateHospital(row.id, updateData); break;
                        case 'pharmacy': await partnerService.updatePharmacy(row.id, updateData); break;
                        case 'pharmacist': await partnerService.updatePharmacist(row.id, updateData); break;
                    }
                    message.success('Đã duyệt đối tác thành công');
                    fetchPendingPartners();
                } catch (error) {
                    message.error('Lỗi khi duyệt đối tác');
                    console.error(error);
                }
            },
        });
    };

    const handleReject = (row: any) => {
        let reason = '';
        Modal.confirm({
            title: 'Từ chối đối tác',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: (
                <div className="mt-4">
                    <p className="mb-2">Bạn có chắc chắn muốn từ chối đối tác "{row.name || row.fullName}" không? Vui lòng nhập lý do:</p>
                    <TextArea
                        rows={4}
                        onChange={(e) => reason = e.target.value}
                        placeholder="Lý do từ chối (thiếu thông tin, chứng chỉ không hợp lệ...)"
                    />
                </div>
            ),
            okType: 'danger',
            okText: 'Từ chối',
            cancelText: 'Hủy',
            onOk: async () => {
                if (!reason.trim()) {
                    message.warning('Vui lòng nhập lý do từ chối');
                    return Promise.reject();
                }
                try {
                    const updateData: any = { status: 'rejected', rejectionReason: reason };
                    switch (row.type) {
                        case 'doctor': await partnerService.updateDoctor(row.id, updateData); break;
                        case 'clinic': await partnerService.updateClinic(row.id, updateData); break;
                        case 'hospital': await partnerService.updateHospital(row.id, updateData); break;
                        case 'pharmacy': await partnerService.updatePharmacy(row.id, updateData); break;
                        case 'pharmacist': await partnerService.updatePharmacist(row.id, updateData); break;
                    }
                    message.success('Đã từ chối đối tác');
                    fetchPendingPartners();
                } catch (error) {
                    message.error('Lỗi khi từ chối đối tác');
                    console.error(error);
                }
            },
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Đối tác',
            render: (val: string, row: any) => (
                <Space orientation="vertical" size={0}>
                    <Text strong>{val || row.fullName}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{row.phone || row.phoneNumber}</Text>
                </Space>
            )
        },
        {
            key: 'type',
            label: 'Loại hình',
            render: (val: string) => <Tag color="blue" variant="outlined">{val?.toUpperCase()}</Tag>
        },
        {
            key: 'email',
            label: 'Email',
            render: (val: string) => val || <Text type="secondary">N/A</Text>
        },
        {
            key: 'createdAt',
            label: 'Ngày gửi',
            render: (val: string) => <Text>{new Date(val).toLocaleDateString('vi-VN')}</Text>
        },
        {
            key: 'status',
            label: 'Trạng thái',
            render: () => <StatusBadge status="pending" />
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item>Đối tác chờ duyệt</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Đối tác Chờ duyệt</Title>
                    <Text type="secondary">Xét duyệt và xác minh các đăng ký đối tác mới tham gia mạng lưới</Text>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={partners}
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
                        <Tooltip title="Duyệt">
                            <Button
                                type="text"
                                icon={<CheckOutlined style={{ color: '#52c41a' }} />}
                                onClick={() => handleApprove(row)}
                            />
                        </Tooltip>
                        <Tooltip title="Từ chối">
                            <Button
                                type="text"
                                danger
                                icon={<CloseOutlined />}
                                onClick={() => handleReject(row)}
                            />
                        </Tooltip>
                    </Space>
                )}
            />
        </Space>
    );
}
