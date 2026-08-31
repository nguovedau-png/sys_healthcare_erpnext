"use client";

import React, { useEffect, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import {
    Typography,
    Card,
    Space,
    Button,
    Input,
    Select,
    Tag,
    Avatar,
    message,
    Modal,
    Form,
    Row,
    Col,
    Statistic,
    Breadcrumb,
    Tooltip
} from 'antd';
import {
    UserOutlined,
    PlusOutlined,
    EditOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    StarFilled,
    IdcardOutlined,
    CheckOutlined
} from '@ant-design/icons';
import partnerService, { Pharmacist } from '@/services/partner.service';
import { MEMBER_RANKS } from '@/types/pharmacy';

const { Title, Text } = Typography;
const { Option } = Select;

export default function PharmacistsPage() {
    const [pharmacists, setPharmacists] = useState<Pharmacist[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [specialistFilter, setSpecialistFilter] = useState('all');
    const [selectedPharmacist, setSelectedPharmacist] = useState<Pharmacist | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const params: any = {
                page: pagination.current,
                limit: pagination.pageSize,
            };
            if (searchText) params.search = searchText;
            if (statusFilter !== 'all') params.status = statusFilter;
            if (specialistFilter !== 'all') params.specialistly = specialistFilter;

            const response = await partnerService.getPharmacists(params);
            setPharmacists(response.data);
            setTotal(response.meta.total);
        } catch (error) {
            console.error('Failed to fetch pharmacists:', error);
            message.error('Không thể tải danh sách dược sĩ');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagination.current, pagination.pageSize, statusFilter, specialistFilter]);

    const handleSearch = (query: string) => {
        setSearchText(query);
        setPagination({ ...pagination, current: 1 });
    };

    useEffect(() => {
        if (searchText !== undefined) {
            fetchData();
        }
    }, [searchText]);

    const handleVerify = async (id: number) => {
        try {
            await partnerService.updatePharmacist(id, { isVerified: true, status: 'active' });
            message.success('Đã duyệt dược sĩ');
            fetchData();
        } catch (error) {
            message.error('Lỗi khi duyệt dược sĩ');
        }
    };

    const handleEdit = (pharmacist: Pharmacist) => {
        setSelectedPharmacist(pharmacist);
        form.setFieldsValue({
            ...pharmacist,
            createdAt: pharmacist.createdAt ? new Date(pharmacist.createdAt).toLocaleDateString() : '---'
        });
        setIsModalOpen(true);
    };

    const onFinish = async (values: any) => {
        if (!selectedPharmacist) return;
        try {
            await partnerService.updatePharmacist(selectedPharmacist.id, values);
            message.success('Cập nhật thành công');
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            message.error('Lỗi khi cập nhật dược sĩ');
        }
    };

    const columns = [
        {
            key: 'fullName',
            label: 'Dược sĩ',
            render: (text: string, record: Pharmacist) => (
                <Space>
                    <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#722ed1' }} />
                    <Space orientation="vertical" size={0}>
                        <Text strong>{text}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.phoneNumber}</Text>
                    </Space>
                </Space>
            ),
        },
        {
            key: 'specialistly',
            label: 'Chuyên môn',
            render: (text: string) => text ? <Tag color="purple">{text}</Tag> : '---',
        },
        {
            key: 'career',
            label: 'Vị trí',
            render: (text: string) => <Text strong>{text || '---'}</Text>,
        },
        {
            key: 'pointsCMEOnline',
            label: 'Điểm CME',
            render: (points: number) => <Text strong style={{ color: '#1890ff' }}>{(points || 0).toLocaleString()}</Text>,
        },
        {
            key: 'memberRank',
            label: 'Hạng',
            render: (rank: string) => {
                const rankInfo = (MEMBER_RANKS as any)[rank || 'bronze'];
                return (
                    <Space>
                        <span style={{ fontSize: '18px' }}>{rankInfo.icon}</span>
                        <Text strong style={{ color: rankInfo.color, fontSize: '11px' }}>{rank?.toUpperCase()}</Text>
                    </Space>
                );
            },
        },
        {
            key: 'status',
            label: 'Trạng thái',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'success' : status === 'pending' ? 'orange' : 'default'} style={{ borderRadius: '10px' }} variant="outlined">
                    {status === 'active' ? 'HOẠT ĐỘNG' : status === 'pending' ? 'CHỜ DUYỆT' : 'TẠM DỪNG'}
                </Tag>
            ),
        },
    ];

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Đối tác & Mạng lưới</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý Dược sĩ</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Dược sĩ</Title>
                    <Text type="secondary">Quản lý đội ngũ dược sĩ chuyên môn trong mạng lưới đối tác</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => message.info('Tính năng đang phát triển')}
                    >
                        Thêm dược sĩ mới
                    </Button>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={4}>
                    <Card size="small" variant="outlined" style={{ background: '#f6ffed' }}>
                        <Statistic
                            title="Hoạt động"
                            value={total} // Using total for simplicity or filter local if needed
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Card bodyStyle={{ padding: '16px' }}>
                <Row gutter={16} align="middle">
                    <Col span={6}>
                        <Select
                            defaultValue="all"
                            style={{ width: '100%', borderRadius: '8px' }}
                            onChange={(val) => {
                                setStatusFilter(val);
                                setPagination({ ...pagination, current: 1 });
                            }}
                            placeholder="Trạng thái"
                        >
                            <Option value="all">Tất cả trạng thái</Option>
                            <Option value="active">Hoạt động</Option>
                            <Option value="pending">Chờ duyệt</Option>
                            <Option value="inactive">Tạm dừng</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            defaultValue="all"
                            style={{ width: '100%', borderRadius: '8px' }}
                            onChange={(val) => {
                                setSpecialistFilter(val);
                                setPagination({ ...pagination, current: 1 });
                            }}
                            placeholder="Chuyên môn"
                        >
                            <Option value="all">Tất cả chuyên môn</Option>
                            <Option value="Dược lâm sàng">Dược lâm sàng</Option>
                            <Option value="Quản lý dược">Quản lý dược</Option>
                        </Select>
                    </Col>
                </Row>
            </Card>

            <DataTable
                columns={columns}
                data={pharmacists}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm tên, số điện thoại hoặc địa chỉ..."
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
                                icon={<EditOutlined style={{ color: '#1890ff' }} />}
                                onClick={() => handleEdit(row)}
                            />
                        </Tooltip>
                        {row.status === 'pending' && (
                            <Tooltip title="Duyệt">
                                <Button
                                    type="text"
                                    icon={<CheckOutlined style={{ color: '#52c41a' }} />}
                                    onClick={() => handleVerify(row.id)}
                                />
                            </Tooltip>
                        )}
                    </Space>
                )}
            />

            <Modal
                title="Chi tiết Dược sĩ"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                width={800}
                footer={[
                    <Button key="back" onClick={() => setIsModalOpen(false)}>Đóng</Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>Lưu thay đổi</Button>
                ]}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="fullName" label="Họ và tên">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="phoneNumber" label="Số điện thoại">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="specialistly" label="Chuyên môn">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="career" label="Vị trí/Nghề nghiệp">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="address" label="Địa chỉ đầy đủ">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="pointsCMEOnline" label="Điểm CME Online">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="memberRank" label="Hạng thành viên">
                                <Select>
                                    <Option value="bronze">Bronze</Option>
                                    <Option value="silver">Silver</Option>
                                    <Option value="gold">Gold</Option>
                                    <Option value="platinum">Platinum</Option>
                                    <Option value="diamond">Diamond</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="createdAt" label="Ngày tạo">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="status" label="Trạng thái">
                                <Select>
                                    <Option value="active">Hoạt động</Option>
                                    <Option value="inactive">Tạm dừng</Option>
                                    <Option value="pending">Chờ duyệt</Option>
                                    <Option value="suspended">Đình chỉ</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="dynamicLink" label="Dynamic Link">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Space>
    );
}
