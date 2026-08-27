import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Tag, message, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, KeyOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { usePermissions } from '../../../utils/permissions';
import api from '../../../services/api';
import type { ColumnsType } from 'antd/es/table';
import UserFormModal from '../components/UserFormModal';
import PasswordResetModal from '../components/PasswordResetModal';

const { Title } = Typography;

interface User {
    id: string;
    email: string;
    fullName: string;
    role: { id: string; name: string };
    isActive: boolean;
}

const Users: React.FC = () => {
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    const permissions = usePermissions(currentUser);

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>();
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [selectedUserForPassword, setSelectedUserForPassword] = useState<User | undefined>();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/users');
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    const res = await api.delete(`/ users / ${id} `);
                    if (res.data.success) {
                        message.success('User deleted successfully');
                        fetchUsers();
                    }
                } catch (error: any) {
                    message.error(error.response?.data?.message || 'Failed to delete user');
                }
            },
        });
    };

    const handleCreate = () => {
        setSelectedUser(undefined);
        setModalVisible(true);
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const handleModalClose = (refresh?: boolean) => {
        setModalVisible(false);
        setSelectedUser(undefined);
        if (refresh) {
            fetchUsers();
        }
    };

    const columns: ColumnsType<User> = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            key: 'role',
            render: (_, record) => record.role?.name || 'N/A',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Tag color={record.isActive ? 'green' : 'red'}>
                    {record.isActive ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="small">
                    {permissions.canEdit('user') && (
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        >
                            Edit
                        </Button>
                    )}
                    {permissions.canEdit('user') && (
                        <Button
                            type="link"
                            icon={<KeyOutlined />}
                            onClick={() => {
                                setSelectedUserForPassword(record);
                                setPasswordModalVisible(true);
                            }}
                            style={{ color: '#faad14' }}
                        >
                            Password
                        </Button>
                    )}
                    {permissions.canDelete('user') && (
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        >
                            Delete
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Title level={2}>Users</Title>
                {permissions.canCreate('user') && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreate}
                    >
                        Add User
                    </Button>
                )}
            </div>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                loading={loading}
            />
            <UserFormModal
                visible={modalVisible}
                user={selectedUser}
                onClose={handleModalClose}
            />

            <PasswordResetModal
                visible={passwordModalVisible}
                user={selectedUserForPassword}
                onCancel={() => {
                    setPasswordModalVisible(false);
                    setSelectedUserForPassword(undefined);
                }}
                onSuccess={() => {
                    setPasswordModalVisible(false);
                    setSelectedUserForPassword(undefined);
                }}
            />
        </div>
    );
};

export default Users;
