import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message, Checkbox, Collapse, Typography } from 'antd';
import api from '../../../services/api';

const { Panel } = Collapse;
const { Text } = Typography;

interface RoleFormModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    role?: any;
}

// Utility function to extract and format action from permission
const extractAction = (permission: any): string => {
    const action = permission.action || '';

    // Map database actions to display names
    if (action === 'create') return 'Add';
    if (action === 'read' || action === 'view') return 'View';
    if (action === 'update' || action === 'edit') return 'Edit';
    if (action === 'delete') return 'Delete';
    if (action === 'manage') return 'Manage';

    // Capitalize first letter if not mapped
    return action.charAt(0).toUpperCase() + action.slice(1);
};

// Utility function to format resource name
const formatResourceName = (resource: string): string => {
    if (!resource) return 'Other';

    // Capitalize first letter
    return resource.charAt(0).toUpperCase() + resource.slice(1);
};

// Group permissions by resource
const groupPermissions = (permissions: any[]) => {
    const groups: { [key: string]: any[] } = {};

    permissions.forEach(permission => {
        const resource = formatResourceName(permission.resource || 'other');

        if (!groups[resource]) {
            groups[resource] = [];
        }
        groups[resource].push(permission);
    });

    // Sort groups - prioritize common resources, then alphabetically
    const priority = ['User', 'Role', 'Employee', 'Department', 'Job', 'Audit-log', 'Setting'];
    const sortedGroups: { [key: string]: any[] } = {};

    // Add priority groups first
    priority.forEach(key => {
        if (groups[key]) {
            // Sort permissions within group by action order
            const actionOrder = ['view', 'read', 'create', 'update', 'edit', 'delete', 'manage'];
            groups[key].sort((a, b) => {
                const aIndex = actionOrder.indexOf(a.action?.toLowerCase() || '');
                const bIndex = actionOrder.indexOf(b.action?.toLowerCase() || '');
                return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
            });
            sortedGroups[key] = groups[key];
        }
    });

    // Add remaining groups alphabetically
    Object.keys(groups).sort().forEach(key => {
        if (!priority.includes(key)) {
            // Sort permissions within group by action order
            const actionOrder = ['view', 'read', 'create', 'update', 'edit', 'delete', 'manage'];
            groups[key].sort((a, b) => {
                const aIndex = actionOrder.indexOf(a.action?.toLowerCase() || '');
                const bIndex = actionOrder.indexOf(b.action?.toLowerCase() || '');
                return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
            });
            sortedGroups[key] = groups[key];
        }
    });

    return sortedGroups;
};

const RoleFormModal: React.FC<RoleFormModalProps> = ({ visible, onCancel, onSuccess, role }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState<any[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [groupedPermissions, setGroupedPermissions] = useState<{ [key: string]: any[] }>({});

    useEffect(() => {
        if (visible) {
            fetchPermissions();
            if (role) {
                form.setFieldsValue({
                    name: role.name,
                    description: role.description
                });

                // Extract permission IDs - handle both permissionId and id fields
                const permissionIds = role.permissions?.map((p: any) => {
                    const permId = p.permissionId || p.id || p.permission?.id;
                    return permId;
                }).filter((id: any) => id !== undefined) || [];

                setSelectedPermissions(permissionIds);
            } else {
                form.resetFields();
                setSelectedPermissions([]);
            }
        }
    }, [visible, role, form]);

    const fetchPermissions = async () => {
        try {
            const res = await api.get('/permissions');
            if (res.data.success) {
                setPermissions(res.data.data);
                setGroupedPermissions(groupPermissions(res.data.data));
            }
        } catch (error) {
            console.error('Failed to fetch permissions:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const payload = {
                ...values,
                permissionIds: selectedPermissions
            };

            if (role) {
                await api.put(`/roles/${role.id}`, payload);
                message.success('Role updated successfully');
            } else {
                await api.post('/roles', payload);
                message.success('Role created successfully');
            }

            onSuccess();
            form.resetFields();
            setSelectedPermissions([]);
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={role ? 'Edit Role' : 'Create Role'}
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
            confirmLoading={loading}
            width={800}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Role Name"
                    rules={[{ required: true, message: 'Please enter role name' }]}
                >
                    <Input placeholder="Role Name" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea placeholder="Description" rows={3} />
                </Form.Item>

                <Form.Item label="Permissions">
                    <Checkbox.Group
                        value={selectedPermissions}
                        onChange={(values) => setSelectedPermissions(values as string[])}
                        style={{ width: '100%' }}
                    >
                        <Collapse
                            defaultActiveKey={Object.keys(groupedPermissions)}
                            style={{ marginBottom: '16px' }}
                        >
                            {Object.entries(groupedPermissions).map(([groupName, groupPerms]) => (
                                <Panel
                                    header={
                                        <Text strong style={{ fontSize: '14px' }}>
                                            {groupName} ({groupPerms.length})
                                        </Text>
                                    }
                                    key={groupName}
                                >
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gap: '8px',
                                        padding: '8px 0'
                                    }}>
                                        {groupPerms.map(permission => (
                                            <Checkbox
                                                key={permission.id}
                                                value={permission.id}
                                                style={{
                                                    marginLeft: 0,
                                                    padding: '6px 10px',
                                                    border: '1px solid #e8e8e8',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#fafafa'
                                                }}
                                            >
                                                <span style={{ fontSize: '13px' }}>
                                                    {extractAction(permission)}
                                                </span>
                                            </Checkbox>
                                        ))}
                                    </div>
                                </Panel>
                            ))}
                        </Collapse>
                    </Checkbox.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RoleFormModal;
