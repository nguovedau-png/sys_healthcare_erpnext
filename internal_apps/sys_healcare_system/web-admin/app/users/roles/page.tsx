'use client';

import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Space, Button, Modal, Form, Input, message, Popconfirm, Checkbox, Collapse, Tag, Breadcrumb, Row, Col, Statistic, Tooltip, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SafetyCertificateOutlined, SafetyOutlined, LockOutlined, KeyOutlined, SearchOutlined, CheckSquareOutlined, BorderOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import roleService, { Role } from '@/services/role.service';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

// Grouped permissions for better organization (matching backend seed data)
const permissionGroups: Record<string, string[]> = {
    'Quản lý Người dùng': [
        'users.view',
        'users.create',
        'users.edit',
        'users.delete',
    ],
    'Quản lý Vai trò & Quyền': [
        'roles.view',
        'roles.create',
        'roles.edit',
        'roles.delete',
    ],
    'Quản lý Đối tác': [
        'partners.hospitals.view',
        'partners.hospitals.create',
        'partners.hospitals.edit',
        'partners.hospitals.delete',
        'partners.doctors.view',
        'partners.doctors.create',
        'partners.doctors.edit',
        'partners.doctors.delete',
        'partners.clinics.view',
        'partners.clinics.create',
        'partners.clinics.edit',
        'partners.clinics.delete',
        'partners.pharmacies.view',
        'partners.pharmacies.create',
        'partners.pharmacies.edit',
        'partners.pharmacies.delete',
        'partners.pharmacists.view',
        'partners.pharmacists.create',
        'partners.pharmacists.edit',
        'partners.pharmacists.delete',
        'partners.patients.view',
        'partners.patients.create',
        'partners.patients.edit',
        'partners.patients.delete',
        'partners.verify',
    ],
    'Quản lý Giáo dục': [
        'education.courses.view',
        'education.courses.create',
        'education.courses.edit',
        'education.courses.delete',
        'education.lessons.view',
        'education.lessons.create',
        'education.lessons.edit',
        'education.lessons.delete',
        'education.enrollments.view',
        'education.enrollments.manage',
    ],
    'Quản lý Nội dung': [
        'content.view',
        'content.create',
        'content.edit',
        'content.delete',
        'content.publish',
    ],
    'Quản lý Tài chính': [
        'finance.view',
        'finance.withdrawals',
        'finance.commissions',
        'finance.payments',
    ],
    'Hệ thống & Cài đặt': [
        'settings.view',
        'settings.edit',
        'logs.view',
        'backup.manage',
    ],
};

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');
    const [permissionSearch, setPermissionSearch] = useState('');
    const [form] = Form.useForm();

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const data = await roleService.getRoles();
            setRoles(data);
        } catch (error) {
            console.error('Failed to fetch roles:', error);
            message.error('Lỗi khi tải danh sách vai trò');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleCreate = async (values: any) => {
        try {
            await roleService.createRole({
                ...values,
                permissions: selectedPermissions,
            });
            message.success('Đã tạo vai trò mới thành công');
            setIsModalOpen(false);
            form.resetFields();
            setSelectedPermissions([]);
            fetchRoles();
        } catch (error) {
            console.error('Error creating role:', error);
            message.error('Lỗi khi tạo vai trò');
        }
    };

    const handleEdit = async (values: any) => {
        if (!editingRole) return;
        try {
            await roleService.updateRole(editingRole.id, {
                ...values,
                permissions: selectedPermissions,
            });
            message.success('Đã cập nhật vai trò thành công');
            setIsModalOpen(false);
            setEditingRole(null);
            form.resetFields();
            setSelectedPermissions([]);
            fetchRoles();
        } catch (error) {
            console.error('Error updating role:', error);
            message.error('Lỗi khi cập nhật vai trò');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await roleService.deleteRole(id);
            message.success('Đã xóa vai trò thành công');
            fetchRoles();
        } catch (error) {
            console.error('Error deleting role:', error);
            message.error('Lỗi khi xóa vai trò');
        }
    };

    const openCreateModal = () => {
        setEditingRole(null);
        form.resetFields();
        setSelectedPermissions([]);
        setIsModalOpen(true);
    };

    const openEditModal = (role: Role) => {
        setEditingRole(role);
        form.setFieldsValue({
            name: role.name,
            description: role.description,
        });
        setSelectedPermissions(role.permissions || []);
        setIsModalOpen(true);
    };

    const handlePermissionChange = (permission: string, checked: boolean) => {
        if (checked) {
            setSelectedPermissions([...selectedPermissions, permission]);
        } else {
            setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
        }
    };

    const handleGroupChange = (groupPermissions: string[], checked: boolean) => {
        if (checked) {
            const newPermissions = Array.from(new Set([...selectedPermissions, ...groupPermissions]));
            setSelectedPermissions(newPermissions);
        } else {
            setSelectedPermissions(selectedPermissions.filter(p => !groupPermissions.includes(p)));
        }
    };

    const handleSelectAll = () => {
        const all = Object.values(permissionGroups).flat();
        setSelectedPermissions(all);
    };

    const handleDeselectAll = () => {
        setSelectedPermissions([]);
    };

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (role.description && role.description.toLowerCase().includes(searchText.toLowerCase()))
    );

    const columns: ColumnsType<Role> = [
        {
            title: 'Vai trò',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <Space>
                    <SafetyOutlined style={{ color: '#1890ff' }} />
                    <Text strong>{text}</Text>
                </Space>
            )
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <Text type="secondary">{text || 'Không có mô tả'}</Text>
        },
        {
            title: 'Quyền hạn',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions: string[]) => (
                <Tag color="blue">{permissions ? permissions.length : 0} quyền</Tag>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            align: 'right',
            render: (_, record) => {
                const isSystemRole = record.name === 'Super Admin';
                return (
                    <Space>
                        <Tooltip title="Chỉnh sửa quyền">
                            <Button
                                type="text"
                                icon={<EditOutlined style={{ color: '#1890ff' }} />}
                                onClick={() => openEditModal(record)}
                            />
                        </Tooltip>
                        {!isSystemRole && (
                            <Popconfirm
                                title="Xóa vai trò"
                                description={`Bạn có chắc muốn xóa vai trò "${record.name}"?`}
                                onConfirm={() => handleDelete(record.id)}
                                okText="Xóa"
                                cancelText="Hủy"
                                okType="danger"
                            >
                                <Tooltip title="Xóa">
                                    <Button type="text" danger icon={<DeleteOutlined />} />
                                </Tooltip>
                            </Popconfirm>
                        )}
                    </Space>
                );
            },
        },
    ];

    return (
        <div style={{ padding: '0px' }}>
            <Breadcrumb style={{ marginBottom: '16px' }}>
                <Breadcrumb.Item>Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý người dùng</Breadcrumb.Item>
                <Breadcrumb.Item>Phân quyền</Breadcrumb.Item>
            </Breadcrumb>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>Quản lý Vai trò</Title>
                    <Text type="secondary">Định nghĩa các nhóm quyền hạn và vai trò phục vụ việc phân quyền người dùng</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={openCreateModal}>
                    Tạo vai trò mới
                </Button>
            </div>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={8}>
                    <Card variant="borderless">
                        <Statistic title="Tổng số vai trò" value={roles.length} prefix={<SafetyCertificateOutlined style={{ color: '#1890ff' }} />} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card variant="borderless">
                        <Statistic title="Phạm vi quyền" value={Object.keys(permissionGroups).length} suffix="Nhóm" prefix={<LockOutlined style={{ color: '#52c41a' }} />} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card variant="borderless">
                        <Statistic title="Tổng đầu quyền" value={Object.values(permissionGroups).flat().length} prefix={<KeyOutlined style={{ color: '#fa8c16' }} />} />
                    </Card>
                </Col>
            </Row>

            <Card>
                <div style={{ marginBottom: '16px' }}>
                    <Input
                        placeholder="Tìm kiếm vai trò..."
                        prefix={<SearchOutlined />}
                        style={{ width: 400 }}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        allowClear
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredRoles}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title={editingRole ? 'Cấu hình vai trò & quyền hạn' : 'Tạo vai trò mới'}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    setEditingRole(null);
                    form.resetFields();
                    setSelectedPermissions([]);
                }}
                footer={null}
                width={900}
                centered
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={editingRole ? handleEdit : handleCreate}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Tên vai trò"
                                rules={[{ required: true, message: 'Vui lòng nhập tên vai trò' }]}
                            >
                                <Input placeholder="ví dụ: Quản trị viên, Bác sĩ, Nhân viên hỗ trợ..." size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Mô tả chức năng"
                            >
                                <Input.TextArea rows={2} placeholder="Nhập mô tả về trách nhiệm của vai trò này" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider>Thiết lập quyền hạn ({selectedPermissions.length})</Divider>

                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                        <Input
                            placeholder="Tìm kiếm quyền hạn (ví dụ: users.create)..."
                            prefix={<SearchOutlined />}
                            style={{ width: '60%' }}
                            value={permissionSearch}
                            onChange={e => setPermissionSearch(e.target.value)}
                        />
                        <Space>
                            <Button size="small" icon={<CheckSquareOutlined />} onClick={handleSelectAll}>Chọn tất cả</Button>
                            <Button size="small" icon={<BorderOutlined />} onClick={handleDeselectAll}>Bỏ chọn tất cả</Button>
                        </Space>
                    </div>

                    <div style={{ maxHeight: '450px', overflowY: 'auto', border: '1px solid #f0f0f0', padding: '16px', borderRadius: '8px', background: '#fafafa' }}>
                        <Collapse defaultActiveKey={['0']} ghost expandIconPosition="start">
                            {Object.entries(permissionGroups).map(([groupName, permissions], index) => {
                                const filteredGroupPermissions = permissions.filter(p =>
                                    p.toLowerCase().includes(permissionSearch.toLowerCase())
                                );

                                if (permissionSearch && filteredGroupPermissions.length === 0) return null;

                                const groupSelectedCount = permissions.filter(p => selectedPermissions.includes(p)).length;
                                const isAllGroupSelected = groupSelectedCount === permissions.length;
                                const isSomeGroupSelected = groupSelectedCount > 0 && !isAllGroupSelected;

                                return (
                                    <Panel
                                        key={index.toString()}
                                        header={
                                            <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                                <Checkbox
                                                    checked={isAllGroupSelected}
                                                    indeterminate={isSomeGroupSelected}
                                                    onChange={(e) => handleGroupChange(permissions, e.target.checked)}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Text strong>{groupName}</Text>
                                                </Checkbox>
                                                <Tag color={groupSelectedCount > 0 ? 'blue' : 'default'}>
                                                    {groupSelectedCount}/{permissions.length}
                                                </Tag>
                                            </div>
                                        }
                                        style={{ marginBottom: '8px', background: '#fff', border: '1px solid #f0f0f0', borderRadius: '8px' }}
                                    >
                                        <Row gutter={[16, 8]}>
                                            {filteredGroupPermissions.map((permission) => (
                                                <Col span={8} key={permission}>
                                                    <Checkbox
                                                        checked={selectedPermissions.includes(permission)}
                                                        onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                                                    >
                                                        <Text style={{ fontSize: '13px' }}>{permission}</Text>
                                                    </Checkbox>
                                                </Col>
                                            ))}
                                            {filteredGroupPermissions.length === 0 && permissionSearch && (
                                                <Col span={24}><Text type="secondary" italic>Không có kết quả khớp</Text></Col>
                                            )}
                                        </Row>
                                    </Panel>
                                );
                            })}
                        </Collapse>
                    </div>

                    <div style={{ textAlign: 'right', marginTop: '24px' }}>
                        <Space>
                            <Button onClick={() => setIsModalOpen(false)} size="large">Hủy</Button>
                            <Button type="primary" htmlType="submit" size="large" style={{ padding: '0 48px' }}>
                                {editingRole ? 'Lưu thay đổi' : 'Xác nhận tạo'}
                            </Button>
                        </Space>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
