"use client";

import React from 'react';
import FormBuilder from '@/components/admin/FormBuilder';
import { useRouter } from 'next/navigation';
import {
    Typography,
    Space,
    Breadcrumb,
    Card,
    Button,
    message
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function CreatePharmacyOrder() {
    const router = useRouter();

    const fields = [
        { name: 'customerName', label: 'Tên khách hàng', type: 'text' as const, required: true, placeholder: 'Nhập tên khách hàng...' },
        { name: 'customerPhone', label: 'Số điện thoại', type: 'text' as const, required: true, placeholder: '09...' },
        { name: 'shippingAddress', label: 'Địa chỉ giao hàng', type: 'text' as const, required: true, placeholder: 'Số nhà, tên đường, phường/xã...' },
        {
            name: 'pharmacyId', label: 'Nhà thuốc cung cấp', type: 'select' as const, required: true, options: [
                { value: 'p1', label: 'Nhà thuốc An Khang - Q1' },
                { value: 'p2', label: 'Nhà thuốc Long Châu - Q3' },
                { value: 'p3', label: 'Pharmacity - Q5' }
            ]
        },
        { name: 'products', label: 'Sản phẩm (Nhập mã hoặc tên)', type: 'textarea' as const, required: true, placeholder: '- Paracetamol 500mg (2 vỉ)\n- Vitamin C (1 lọ)\n- Khẩu trang y tế (1 hộp)', rows: 5 },
        {
            name: 'paymentMethod', label: 'Phương thức thanh toán', type: 'select' as const, required: true, options: [
                { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)' },
                { value: 'transfer', label: 'Chuyển khoản ngân hàng' },
                { value: 'momo', label: 'Ví MoMo' },
                { value: 'vnpay', label: 'VNPay QR' }
            ]
        },
        { name: 'note', label: 'Ghi chú giao hàng', type: 'textarea' as const, rows: 2, placeholder: 'Giao trong giờ hành chính...' },
    ];

    const handleSubmit = (data: any) => {
        console.log('Creating pharmacy order:', data);
        message.success('Tạo đơn thuốc thành công!');
        router.push('/orders/pharmacy');
    };

    return (
        <Space orientation="vertical" size="large" style={{ display: 'flex' }}>
            <Breadcrumb>
                <Breadcrumb.Item>Quản lý Đặt lịch</Breadcrumb.Item>
                <Breadcrumb.Item href="/orders/pharmacy">Đơn mua thuốc</Breadcrumb.Item>
                <Breadcrumb.Item>Tạo mới</Breadcrumb.Item>
            </Breadcrumb>

            <Space size="middle">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
                    type="text"
                />
                <div>
                    <Title level={2} style={{ margin: 0 }}>Tạo Đơn thuốc Mới</Title>
                    <Text type="secondary">Tạo đơn đặt hàng thuốc mới cho khách hàng</Text>
                </div>
            </Space>

            <Card variant="borderless">
                <FormBuilder
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitLabel="Tạo đơn hàng"
                    columns={2}
                />
            </Card>
        </Space>
    );
}
