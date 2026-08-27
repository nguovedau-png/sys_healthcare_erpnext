"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import { useRouter } from 'next/navigation';
import {
    Button,
    Typography,
    Space,
    Modal,
    message,
    Tag,
    Breadcrumb,
    Row,
    Col,
    Tooltip
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    LockOutlined,
    PlusOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import userService, { User } from '@/services/user.service';

const { Title, Text } = Typography;

export default function AdminsManagement() {
    const router = useRouter();
    const [admins, setAdmins] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const data = await userService.getUsers();
            // Filter only admins if needed, but for now we'll show all as per original logic
            setAdmins(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            message.error('Lỗi khi tải danh sách quản trị viên');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const columns = [
        {
            key: 'name',
            label: 'Họ tên',
            render: (val: string) => <Text strong>{val || 'N/A'}</Text>
        },
        { key: 'email', label: 'Email' },
        { key: 'department', label: 'Phòng ban' },
        {
            key: 'roleId',
            label: 'Vai trò',
            render: (val: number) => (
                <Tag color={val === 1 ? 'purple' : 'default'} variant="borderless">
                    {val === 1 ? 'Quản trị viên' : 'Nhân sự'}
                </Tag>
            )
        },
        {
            key: 'createdAt',
            label: 'Ngày tạo',
            render: (val: string) => val ? new Date(val).toLocaleDateString('vi-VN') : '-'
        },
        {
            key: 'isActive',
            label: 'Trạng thái',
            render: (val: boolean) => (
                <Tag color={val ? 'green' : 'red'} variant="borderless">
                    {val ? 'Hoạt động' : 'Đã khóa'}
                </Tag>
            )
        },
    ];

    const handleCreate = () => {
        router.push('/users/admins/create');
    };

    const handleEdit = (id: number) => {
        router.push(`/users/admins/${id}/edit`);
    };

    const confirmDelete = (user: User) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa nhân sự này?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <Text>
                    Bạn đang thực hiện xóa tài khoản <Text strong style={{ color: 'red' }}>{user.name}</Text>.
                    Hành động này không thể hoàn tác.
                </Text>
            ),
            okText: 'Xóa nhân sự',
            okType: 'danger',
            cancelText: 'Hủy bỏ',
            onOk: async () => {
                try {
                    await userService.deleteUser(user.id);
                    message.success('Đã xóa người dùng thành công');
                    fetchAdmins();
                } catch (error: any) {
                    message.error('Lỗi khi xóa: ' + (error.message || 'Không xác định'));
                }
            },
        });
    };

    const confirmReset = (user: User) => {
        Modal.confirm({
            title: 'Reset Mật Khẩu',
            icon: <LockOutlined />,
            content: (
                <Space orientation="vertical">
                    <Text>Bạn có chắc muốn đặt lại mật khẩu cho <Text strong>{user.name}</Text>?</Text>
                    <Text type="secondary">Mật khẩu sẽ được đặt về mặc định: <Text code>password123</Text></Text>
                </Space>
            ),
            okText: 'Xác nhận reset',
            cancelText: 'Hủy bỏ',
            onOk: async () => {
                try {
                    // Simulating API call for reset
                    message.info('Tính năng đang được cập nhật cho API mới');
                } catch (error: any) {
                    message.error('Lỗi reset mật khẩu: ' + error.message);
                }
            },
        });
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý nhân sự</Breadcrumb.Item>
                <Breadcrumb.Item>Quản trị viên</Breadcrumb.Item>
            </Breadcrumb>

            <Row justify="space-between" align="middle">
                <Col>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Quản trị viên</Title>
                    <Text type="secondary">Tổng cộng: {admins.length} nhân sự có quyền truy cập quản trị</Text>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={handleCreate}
                    >
                        Thêm Admin
                    </Button>
                </Col>
            </Row>

            <DataTable
                columns={columns}
                data={admins}
                loading={loading}
                searchable
                searchPlaceholder="Tìm kiếm theo tên, email..."
                actions={(row) => (
                    <Space size="small">
                        <Tooltip title="Reset Mật khẩu">
                            <Button
                                type="text"
                                icon={<LockOutlined style={{ color: '#fa8c16' }} />}
                                onClick={() => confirmReset(row)}
                            />
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                            <Button
                                type="text"
                                icon={<EditOutlined style={{ color: '#1890ff' }} />}
                                onClick={() => handleEdit(row.id)}
                            />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => confirmDelete(row)}
                            />
                        </Tooltip>
                    </Space>
                )}
                pagination={{
                    currentPage: 1,
                    totalPages: 1,
                    onPageChange: () => { }
                }}
            />
        </Space>
    );
}
