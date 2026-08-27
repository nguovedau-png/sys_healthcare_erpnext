"use client";
import React from 'react';
import { Button, Input, Select, Card, DatePicker, Space, Popconfirm, Form } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeftOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';

export default function EditPatientPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const [form] = Form.useForm();

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} />
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Cập nhật hồ sơ</h1>
                    <p style={{ color: '#8c8c8c', fontSize: 14 }}>Mã hồ sơ: {params.id}</p>
                </div>
            </div>

            <Card style={{ borderRadius: 9 }}>
                <Form form={form} layout="vertical">
                    <Space direction="vertical" size={24} style={{ width: '100%' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Form.Item label="Họ và tên" name="name" initialValue="Trần Văn A" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Số điện thoại" name="phone" initialValue="0901234567" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Giới tính" name="gender" initialValue="male">
                                <Select options={[
                                    { value: 'male', label: 'Nam' },
                                    { value: 'female', label: 'Nữ' },
                                    { value: 'other', label: 'Khác' }
                                ]} />
                            </Form.Item>
                            <Form.Item label="Ngày sinh" name="birthday">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="CMND/CCCD" name="idCard" initialValue="079123456789">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Mã BHYT" name="bhyt" initialValue="DN479123456789">
                                <Input />
                            </Form.Item>
                        </div>

                        <Form.Item label="Địa chỉ" name="address" initialValue="123 Nguyễn Văn Cừ, Q5, TP.HCM">
                            <Input.TextArea rows={2} />
                        </Form.Item>
                        <Form.Item label="Tiền sử bệnh lý" name="medicalHistory" initialValue="Cao huyết áp nhẹ">
                            <Input.TextArea rows={2} />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
                            <Popconfirm title="Xóa hồ sơ này?" okText="Xóa" cancelText="Hủy">
                                <Button danger icon={<DeleteOutlined />}>Xóa hồ sơ</Button>
                            </Popconfirm>
                            <Button onClick={() => router.back()}>Hủy bỏ</Button>
                            <Button type="primary" icon={<SaveOutlined />}>Cập nhật</Button>
                        </div>
                    </Space>
                </Form>
            </Card>
        </div>
    );
}