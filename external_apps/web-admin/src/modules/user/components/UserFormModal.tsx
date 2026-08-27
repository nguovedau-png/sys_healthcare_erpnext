import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Switch, message } from 'antd';
import api from '../../../services/api';

const { Option } = Select;

interface UserFormModalProps {
    visible: boolean;
    user?: any;
    onClose: (refresh?: boolean) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ visible, user, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<any[]>([]);

    useEffect(() => {
        if (visible) {
            fetchRoles();
            if (user) {
                form.setFieldsValue({
                    email: user.email,
                    fullName: user.fullName,
                    roleId: user.role?.id,
                    isActive: user.isActive,
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, user, form]);

    const fetchRoles = async () => {
        try {
            const res = await api.get('/roles');
            if (res.data.success) {
                setRoles(res.data.data);
            }
        } catch (error: any) {
            message.error('Failed to fetch roles');
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            if (user) {
                // Update existing user
                const res = await api.put(`/users/${user.id}`, values);
                if (res.data.success) {
                    message.success('User updated successfully');
                    onClose(true);
                }
            } else {
                // Create new user
                const res = await api.post('/users', values);
                if (res.data.success) {
                    message.success('User created successfully');
                    onClose(true);
                }
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                message.error(error.response.data.message);
            } else if (error.errorFields) {
                message.error('Please fill in all required fields');
            } else {
                message.error('Failed to save user');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={user ? 'Edit User' : 'Create User'}
            open={visible}
            onOk={handleSubmit}
            onCancel={() => onClose()}
            confirmLoading={loading}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    isActive: true,
                }}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input placeholder="user@example.com" />
                </Form.Item>

                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter full name' }]}
                >
                    <Input placeholder="John Doe" />
                </Form.Item>

                {!user && (
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            { required: true, message: 'Please enter password' },
                            { min: 6, message: 'Password must be at least 6 characters' },
                        ]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>
                )}

                <Form.Item
                    name="roleId"
                    label="Role"
                    rules={[{ required: true, message: 'Please select a role' }]}
                >
                    <Select placeholder="Select role" loading={roles.length === 0}>
                        {roles.map((role) => (
                            <Option key={role.id} value={role.id}>
                                {role.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="isActive"
                    label="Active Status"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserFormModal;
