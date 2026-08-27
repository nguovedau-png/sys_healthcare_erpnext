import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import api from '../../../services/api';

const { Option } = Select;

interface EmployeeFormModalProps {
    visible: boolean;
    employee?: any;
    onClose: (refresh?: boolean) => void;
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ visible, employee, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        if (visible) {
            fetchDepartments();
            fetchUsers();
            if (employee) {
                form.setFieldsValue({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    position: employee.position,
                    departmentId: employee.department?.id,
                    userId: employee.user?.id,
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, employee, form]);

    const fetchDepartments = async () => {
        try {
            const res = await api.get('/departments');
            if (res.data.success) {
                setDepartments(res.data.data);
            }
        } catch (error: any) {
            message.error('Failed to fetch departments');
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error: any) {
            message.error('Failed to fetch users');
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            if (employee) {
                // Update existing employee
                const res = await api.put(`/employees/${employee.id}`, values);
                if (res.data.success) {
                    message.success('Employee updated successfully');
                    onClose(true);
                }
            } else {
                // Create new employee
                const res = await api.post('/employees', values);
                if (res.data.success) {
                    message.success('Employee created successfully');
                    onClose(true);
                }
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                message.error(error.response.data.message);
            } else if (error.errorFields) {
                message.error('Please fill in all required fields');
            } else {
                message.error('Failed to save employee');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={employee ? 'Edit Employee' : 'Create Employee'}
            open={visible}
            onOk={handleSubmit}
            onCancel={() => onClose()}
            confirmLoading={loading}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter first name' }]}
                >
                    <Input placeholder="John" />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter last name' }]}
                >
                    <Input placeholder="Doe" />
                </Form.Item>

                <Form.Item
                    name="position"
                    label="Position"
                    rules={[{ required: true, message: 'Please enter position' }]}
                >
                    <Input placeholder="Software Engineer" />
                </Form.Item>

                <Form.Item
                    name="departmentId"
                    label="Department"
                    rules={[{ required: true, message: 'Please select a department' }]}
                >
                    <Select placeholder="Select department" loading={departments.length === 0}>
                        {departments.map((dept) => (
                            <Option key={dept.id} value={dept.id}>
                                {dept.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="userId"
                    label="User Account"
                    rules={[{ required: true, message: 'Please select a user' }]}
                >
                    <Select
                        placeholder="Select user account"
                        loading={users.length === 0}
                        showSearch
                        filterOption={(input, option) =>
                            (option?.children as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {users.map((user) => (
                            <Option key={user.id} value={user.id}>
                                {user.fullName} ({user.email})
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EmployeeFormModal;
