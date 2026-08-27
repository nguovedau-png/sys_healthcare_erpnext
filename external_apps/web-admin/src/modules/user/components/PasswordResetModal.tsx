import React, { useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import api from '../../../services/api';

interface PasswordResetModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    user?: any;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
    visible,
    onCancel,
    onSuccess,
    user
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            await api.put(`/users/${user.id}/password`, {
                newPassword: values.newPassword
            });

            message.success('Password updated successfully');
            form.resetFields();
            onSuccess();
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title={`Reset Password - ${user?.fullName || user?.email}`}
            open={visible}
            onOk={handleSubmit}
            onCancel={handleCancel}
            confirmLoading={loading}
            okText="Update Password"
            width={500}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                        { required: true, message: 'Please enter new password' },
                        { min: 6, message: 'Password must be at least 6 characters' }
                    ]}
                >
                    <Input.Password
                        placeholder="Enter new password"
                        autoComplete="new-password"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: 'Please confirm password' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                    />
                </Form.Item>

                <div style={{
                    padding: '12px',
                    backgroundColor: '#f0f5ff',
                    borderRadius: '4px',
                    marginTop: '8px'
                }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                        <strong>Note:</strong> The user will need to use this new password on their next login.
                    </p>
                </div>
            </Form>
        </Modal>
    );
};

export default PasswordResetModal;
