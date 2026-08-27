import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Tag, message, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { usePermissions } from '../../../utils/permissions';
import api from '../../../services/api';
import type { ColumnsType } from 'antd/es/table';
import EmployeeFormModal from '../components/EmployeeFormModal';

const { Title } = Typography;

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    department: { id: string; name: string };
    user: { id: string; email: string };
}

const Employees: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const permissions = usePermissions(user);

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await api.get('/employees');
            if (res.data.success) {
                setEmployees(res.data.data);
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this employee?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    const res = await api.delete(`/employees/${id}`);
                    if (res.data.success) {
                        message.success('Employee deleted successfully');
                        fetchEmployees();
                    }
                } catch (error: any) {
                    message.error(error.response?.data?.message || 'Failed to delete employee');
                }
            },
        });
    };

    const handleCreate = () => {
        setSelectedEmployee(undefined);
        setModalVisible(true);
    };

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setModalVisible(true);
    };

    const handleModalClose = (refresh?: boolean) => {
        setModalVisible(false);
        setSelectedEmployee(undefined);
        if (refresh) {
            fetchEmployees();
        }
    };

    const columns: ColumnsType<Employee> = [
        {
            title: 'Name',
            key: 'name',
            render: (_, record) => `${record.firstName} ${record.lastName}`,
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Department',
            key: 'department',
            render: (_, record) => record.department?.name || 'N/A',
        },
        {
            title: 'Email',
            key: 'email',
            render: (_, record) => record.user?.email || 'N/A',
        },
        {
            title: 'Status',
            key: 'status',
            render: () => <Tag color="green">Active</Tag>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => navigate(`/employees/${record.id}`)}
                    >
                        View
                    </Button>
                    {permissions.canEdit('employee') && (
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        >
                            Edit
                        </Button>
                    )}
                    {permissions.canDelete('employee') && (
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
                <Title level={2}>Employees</Title>
                {permissions.canCreate('employee') && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreate}
                    >
                        Add Employee
                    </Button>
                )}
            </div>
            <Table
                columns={columns}
                dataSource={employees}
                rowKey="id"
                loading={loading}
            />
            <EmployeeFormModal
                visible={modalVisible}
                employee={selectedEmployee}
                onClose={handleModalClose}
            />
        </div>
    );
};

export default Employees;
