"use client";
import React from 'react';
import { Button, Input, Select, Card, Avatar, Space, Form } from 'antd';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined, CameraOutlined, SaveOutlined } from '@ant-design/icons';

export default function EditProfilePage() {
    const router = useRouter();
    const [form] = Form.useForm();

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} />
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Chỉnh sửa thông tin cá nhân</h1>
            </div>

            <Card style={{ borderRadius: 9 }}>
                <div style={{ textAlign: 'center', padding: 24, borderBottom: '1px solid #f0f0f0', marginBottom: 24 }}>
                    <Avatar size={96} style={{ backgroundColor: '#e6f7ff', color: '#1677ff', fontSize: 36, fontWeight: 700 }}>MH</Avatar>
                    <div style={{ marginTop: 12 }}>
                        <Button type="link" icon={<CameraOutlined />}>Thay đổi ảnh đại diện</Button>
                    </div>
                </div>

                <Form form={form} layout="vertical">
                    <Space direction="vertical" size={24} style={{ width: '100%' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Form.Item label="Họ và tên hiển thị" name="displayName" initialValue="Mithang" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Email" name="email" initialValue="mithang@example.com" rules={[{ required: true, type: 'email' }]}>
                                <Input disabled />
                            </Form.Item>
<Form.Item label="Số điện thoại" name="phone" initialValue="0987xxx678">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="Giới tính" name="gender" initialValue="male">
                                <Select options={[
                                    { value: 'male', label: 'Nam' },
                                    { value: 'female', label: 'Nữ' },
                                    { value: 'other', label: 'Khác' }
                                ]} />
                            </Form.Item>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
                            <Button onClick={() => router.back()}>Hủy thay đổi</Button>
                            <Button type="primary" icon={<SaveOutlined />}>Lưu thông tin</Button>
                        </div>
                    </Space>
                </Form>
            </Card>
        </div>
    );
}