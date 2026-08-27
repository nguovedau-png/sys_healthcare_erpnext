import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, message, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { usePermissions } from '../../../utils/permissions';
import api from '../../../services/api';
import type { ColumnsType } from 'antd/es/table';
import DepartmentFormModal from '../components/DepartmentFormModal';

const { Title } = Typography;

interface Department {
    id: string;
    name: string;
    description: string;
    _count: { employees: number };
}

const Departments: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const permissions = usePermissions(user);

    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>();

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const res = await api.get('/departments');
            if (res.data.success) {
                setDepartments(res.data.data);
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to fetch departments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleDelete = async (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this department?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    const res = await api.delete(`/departments/${id}`);
                    if (res.data.success) {
                        message.success('Department deleted successfully');
                        fetchDepartments();
                    }
                } catch (error: any) {
                    message.error(error.response?.data?.message || 'Failed to delete department');
                }
            },
        });
    };

    const handleCreate = () => {
        setSelectedDepartment(undefined);
        setModalVisible(true);
    };

    const handleEdit = (department: Department) => {
        setSelectedDepartment(department);
        setModalVisible(true);
    };

    const handleModalClose = (refresh?: boolean) => {
        setModalVisible(false);
        setSelectedDepartment(undefined);
        if (refresh) {
            fetchDepartments();
        }
    };

    const columns: ColumnsType<Department> = [
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
            title: 'Employees',
            key: 'employees',
            render: (_, record) => record._count?.employees || 0,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="small">
                    {permissions.canEdit('department') && (
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        >
                            Edit
                        </Button>
                    )}
                    {permissions.canDelete('department') && (
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
                <Title level={2}>Departments</Title>
                {permissions.canCreate('department') && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreate}
                    >
                        Add Department
                    </Button>
                )}
            </div>
            <Table
                columns={columns}
                dataSource={departments}
                rowKey="id"
                loading={loading}
            />
            <DepartmentFormModal
                visible={modalVisible}
                department={selectedDepartment}
                onCancel={() => handleModalClose(false)}
                onSuccess={() => handleModalClose(true)}
            />
        </div>
    );
};

export default Departments;
