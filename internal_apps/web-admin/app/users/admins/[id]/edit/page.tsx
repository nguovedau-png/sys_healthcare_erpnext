'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Typography,
    Card,
    Space,
    Breadcrumb,
    message,
    Spin
} from 'antd';
import userService, { User } from '@/services/user.service';
import roleService from '@/services/role.service';
import FormBuilder from '@/components/admin/FormBuilder';

const { Title, Text } = Typography;

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [userData, rolesData] = await Promise.all([
                    userService.getUser(parseInt(id)),
                    roleService.getRoles()
                ]);
                setUser(userData);
                setRoles(rolesData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                message.error('Lỗi khi tải thông tin người dùng');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);

    const roleOptions = roles.map((r: any) => ({
        label: r.name,
        value: r.id.toString()
    }));

    const handleSubmit = async (values: any) => {
        try {
            setSubmitting(true);
            await userService.updateUser(parseInt(id), {
                name: values.fullName,
                roleId: parseInt(values.roleId),
                isActive: values.isActive === 'true',
                phone: values.phone
            });
            message.success('Cập nhật người dùng thành công');
            router.push('/users/admins');
        } catch (error: any) {
            console.error(error);
            message.error('Lỗi cập nhật: ' + (error.message || 'Không xác định'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div style={{ padding: '100px', textAlign: 'center' }}>
            <Spin size="large" tip="Đang tải dữ liệu..." />
        </div>
    );

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý nhân sự</Breadcrumb.Item>
                <Breadcrumb.Item>Quản trị viên</Breadcrumb.Item>
                <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
            </Breadcrumb>

            <div>
                <Title level={2} style={{ margin: 0 }}>Chỉnh sửa Quản trị viên</Title>
                <Text type="secondary">Cập nhật thông tin và quyền hạn cho nhân sự: <Text strong>{user?.name}</Text></Text>
            </div>

            <Card variant="outlined">
                {user && (
                    <FormBuilder
                        initialValues={{
                            email: user.email,
                            fullName: user.name,
                            roleId: user.roleId?.toString(),
                            phone: user.phone,
                            isActive: user.isActive ? 'true' : 'false'
                        }}
                        fields={[
                            { name: 'email', label: 'Email', type: 'text', disabled: true },
                            { name: 'fullName', label: 'Họ tên', type: 'text', required: true },
                            { name: 'phone', label: 'Số điện thoại', type: 'text' },
                            {
                                name: 'roleId',
                                label: 'Vai trò',
                                type: 'select',
                                required: true,
                                options: roleOptions,
                            },
                            {
                                name: 'isActive',
                                label: 'Trạng thái',
                                type: 'select',
                                required: true,
                                options: [
                                    { label: 'Hoạt động', value: 'true' },
                                    { label: 'Đã khóa', value: 'false' }
                                ],
                            }
                        ]}
                        onSubmit={handleSubmit}
                        submitLabel={submitting ? 'Đang lưu...' : 'Lưu Thay đổi'}
                        loading={submitting}
                        columns={2}
                    />
                )}
            </Card>
        </Space>
    );
}
