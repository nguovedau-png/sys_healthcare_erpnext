"use client";
import React from 'react';
import { Button, Table, Tag, Card, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

export default function PharmacyProductsPage() {
    const products = [
        { id: '1', name: 'Panadol Extra', category: 'Thuốc giảm đau', price: 150000, stock: 100, status: 'Active', sku: 'PND-001' },
        { id: '2', name: 'Vitamin C 500mg', category: 'Vitamin & Khoáng chất', price: 80000, stock: 50, status: 'Active', sku: 'VIT-002' },
        { id: '3', name: 'Khẩu trang Y tế 4 lớp', category: 'Thiết bị y tế', price: 35000, stock: 200, status: 'Active', sku: 'MASK-003' },
        { id: '4', name: 'Nước muối sinh lý', category: 'Vệ sinh cá nhân', price: 10000, stock: 0, status: 'OutOfStock', sku: 'NaCl-004' },
    ];

    const columns = [
        { title: 'Mã SKU', dataIndex: 'sku', key: 'sku' },
        { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', render: (val: string) => <span style={{ fontWeight: 600 }}>{val}</span> },
        { title: 'Danh mục', dataIndex: 'category', key: 'category' },
        { title: 'Giá bán', dataIndex: 'price', key: 'price', render: (val: number) => val ? val.toLocaleString() + ' đ' : '0 đ' },
        { title: 'Tồn kho', dataIndex: 'stock', key: 'stock', render: (val: number) => val === 0 ? <Tag color="red">Hết hàng</Tag> : val },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (val: string) => <Tag color={val === 'Active' ? 'green' : 'red'}>{val}</Tag> },
        {
            title: 'Thao táς', key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Button size="small" type="text" icon={<EditOutlined />}>Sửa</Button>
                    <Button size="small" type="text" danger icon={<DeleteOutlined />}>Xóa</Button>
                </Space>
            )
        },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px' }}>Kho thuốc & Sản phẩm</h1>
                    <p style={{ color: '#8c8c8c', margin: 0 }}>Quản lý danh mục sản phẩm đang bán tại nhà thuốc</p>
                </div>
                <Button type="primary" icon={<PlusOutlined />}>Thêm sản phẩm mới</Button>
            </div>

            <Card style={{ borderRadius: 9 }}>
                <Table dataSource={products} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
            </Card>
        </div>
    );
}