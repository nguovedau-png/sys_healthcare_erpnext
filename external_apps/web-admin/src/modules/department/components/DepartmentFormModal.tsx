import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import api from '../../../services/api';

interface DepartmentFormModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    department?: any;
}

const DepartmentFormModal: React.FC<DepartmentFormModalProps> = ({ visible, onCancel, onSuccess, department }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            if (department) {
                form.setFieldsValue({
                    name: department.name,
                    description: department.description
                });
            } else {
                form.resetFields();
            }
        }
    }, [visible, department]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            if (department) {
                await api.put(`/departments/${department.id}`, values);
                message.success('Department updated successfully');
            } else {
                await api.post('/departments', values);
                message.success('Department created successfully');
            }

            onSuccess();
            form.resetFields();
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={department ? 'Edit Department' : 'Create Department'}
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
            confirmLoading={loading}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Department Name"
                    rules={[{ required: true, message: 'Please enter department name' }]}
                >
                    <Input placeholder="Department Name" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea placeholder="Description" rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DepartmentFormModal;
