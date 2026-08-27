import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, message, Modal, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../../services/api';
import type { ColumnsType } from 'antd/es/table';
import RoleFormModal from '../components/RoleFormModal';

const { Title } = Typography;

interface Role {
    id: string;
    name: string;
    description: string;
    permissions: any[];
    _count: { users: number };
}

const Roles: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | undefined>();

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const res = await api.get('/roles');
            if (res.data.success) {
                setRoles(res.data.data);
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to fetch roles');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleCreate = () => {
        setSelectedRole(undefined);
        setModalVisible(true);
    };

    const handleEdit = (role: Role) => {
        setSelectedRole(role);
        setModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this role?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            onOk: async () => {
                try {
                    await api.delete(`/roles/${id}`);
                    message.success('Role deleted successfully');
                    fetchRoles();
                } catch (error: any) {
                    message.error(error.response?.data?.message || 'Failed to delete role');
                }
            }
        });
    };

    const handleModalSuccess = () => {
        setModalVisible(false);
        fetchRoles();
    };

    const columns: ColumnsType<Role> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Permissions',
            dataIndex: 'permissions',
            key: 'permissions',
            render: (permissions) => (
                <div>
                    {permissions.slice(0, 3).map((p: any) => (
                        <Tag key={p.id} color="blue">{p.name}</Tag>
                    ))}
                    {permissions.length > 3 && <Tag>+{permissions.length - 3} more</Tag>}
                </div>
            ),
        },
        {
            title: 'Users',
            dataIndex: ['_count', 'users'],
            key: 'users',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Title level={2}>Roles & Permissions</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                    Add Role
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={roles}
                rowKey="id"
                loading={loading}
            />

            <RoleFormModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onSuccess={handleModalSuccess}
                role={selectedRole}
            />
        </div>
    );
};

export default Roles;
