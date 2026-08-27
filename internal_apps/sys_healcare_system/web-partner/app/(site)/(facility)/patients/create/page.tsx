"use client";
import React from 'react';
import { Button, Input, Select, Card, DatePicker, Space, Form } from 'antd';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

export default function CreatePatientPage() {
    const router = useRouter();
    const [form] = Form.useForm();

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} />
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Thêm hồ sơ bệnh nhân</h1>
            </div>

            <Card style={{ borderRadius: 9 }}>
                <Form form={form} layout="vertical">
                    <Space direction="vertical" size={24} style={{ width: '100%' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Form.Item label="Họ và tên" name="name" rules={[{ required: true }]}>
                                <Input placeholder="Nhập họ tên đầy đủ" />
                            </Form.Item>
                            <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]}>
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item label="Giới tính" name="gender">
                                <Select options={[
                                    { value: 'male', label: 'Nam' },
                                    { value: 'female', label: 'Nữ' },
                                    { value: 'other', label: 'Khác' }
                                ]} />
                            </Form.Item>
                            <Form.Item label="Ngày sinh" name="birthday">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="CMND/CCCD" name="idCard">
                                <Input placeholder="Nhập số CMND/CCCD" />
                            </Form.Item>
                            <Form.Item label="Mã BHYT" name="bhyt">
                                <Input placeholder="Nhập mã thẻ BHYT (nếu có)" />
                            </Form.Item>
                        </div>

                        <Form.Item label="Địa chỉ" name="address">
                            <Input.TextArea placeholder="Nhập địa chỉ liên hệ" rows={2} />
                        </Form.Item>
                        <Form.Item label="Tiền sử bệnh lý" name="medicalHistory">
                            <Input.TextArea placeholder="Ghi chú tiền sử bệnh (nếu có)" rows={2} />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
                            <Button onClick={() => router.back()}>Hủy bỏ</Button>
                            <Button type="primary" icon={<SaveOutlined />}>Lưu hồ sơ</Button>
                        </div>
                    </Space>
                </Form>
            </Card>
        </div>
    );
}