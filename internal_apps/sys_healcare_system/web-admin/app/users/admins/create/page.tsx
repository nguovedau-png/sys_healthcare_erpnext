"use client";

import React, { useState, useEffect } from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import {
    Typography,
    Card,
    Space,
    Breadcrumb,
    message
} from 'antd';
import userService from '@/services/user.service';
import roleService from '@/services/role.service';

const { Title, Text } = Typography;

export default function CreateAdmin() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [roles, setRoles] = useState<any[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await roleService.getRoles();
                setRoles(data);
            } catch (error) {
                console.error('Failed to fetch roles', error);
                message.error('Lỗi khi tải danh sách vai trò');
            }
        };
        fetchRoles();
    }, []);

    const roleOptions = roles.length > 0 ? roles.map(r => ({
        value: r.id.toString(),
        label: r.name
    })) : [];

    const fields = [
        { name: 'name', label: 'Họ và tên', type: 'text' as const, required: true, placeholder: 'Nguyen Van A' },
        { name: 'email', label: 'Email đăng nhập', type: 'email' as const, required: true, placeholder: 'admin@healthcare.vn' },
        { name: 'password', label: 'Mật khẩu', type: 'password' as const, required: true },
        { name: 'phone', label: 'Số điện thoại', type: 'text' as const },
        {
            name: 'roleId', label: 'Phân quyền', type: 'select' as const, required: true, options: roleOptions
        },
        {
            name: 'status', label: 'Trạng thái', type: 'select' as const, required: true, options: [
                { value: 'active', label: 'Đang hoạt động' },
                { value: 'inactive', label: 'Tạm khóa' },
            ]
        },
    ];

    const handleSubmit = async (data: any) => {
        try {
            setSubmitting(true);
            await userService.createUser({
                userId: crypto.randomUUID(),
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                roleId: parseInt(data.roleId || '2'),
                isActive: data.status === 'active'
            });
            message.success('Tạo tài khoản quản trị viên thành công!');
            router.push('/users/admins');
        } catch (error: any) {
            message.error('Lỗi khi tạo tài khoản: ' + (error.message || 'Không xác định'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Hệ thống</Breadcrumb.Item>
                <Breadcrumb.Item>Quản lý nhân sự</Breadcrumb.Item>
                <Breadcrumb.Item>Quản trị viên</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm mới</Breadcrumb.Item>
            </Breadcrumb>

            <div>
                <Title level={2} style={{ margin: 0 }}>Thêm Quản trị viên mới</Title>
                <Text type="secondary">Tạo tài khoản truy cập hệ thống quản trị cho nhân sự mới</Text>
            </div>

            <Card variant="borderless">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel={submitting ? "Đang tạo..." : "Tạo tài khoản"}
                    loading={submitting}
                    columns={2}
                />
            </Card>
        </Space>
    );
}
