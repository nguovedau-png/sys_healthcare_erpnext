"use client";
import React, { useState } from 'react';
import { Button, Input, Select, Card, Form } from 'antd';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined, CreditCardOutlined } from '@ant-design/icons';

export default function TopUpPage() {
    const router = useRouter();
    const [amount, setAmount] = useState('100000');

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} />
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Nạp tiền vào ví</h1>
            </div>

            <Form layout="vertical">
                <Card style={{ borderRadius: 9 }}>
                    <div style={{ background: 'linear-gradient(to right, #1677ff, #69b1ff)', borderRadius: 9, padding: 24, marginBottom: 24 }}>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 4 }}>Số dư hiện tại</p>
                        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>1,250,000 đ</h2>
                    </div>

                    <Form.Item label="Chọn số tiền nạp" style={{ marginBottom: 16 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                            {['50000', '100000', '200000', '500000', '1000000', '2000000'].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setAmount(val)}
                                    style={{
                                        padding: '12px 8px',
                                        borderRadius: 9,
                                        border: amount === val ? '1px solid #1677ff' : '1px solid #d9d9d9',
                                        background: amount === val ? '#e6f4ff' : '#fff',
                                        color: amount === val ? '#1677ff' : '#595959',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {parseInt(val).toLocaleString()}đ
                                </button>
                            ))}
                        </div>
                        <Input.Password
                            placeholder="Nhập số tiền khác"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{ height: 40 }}
                        />
                    </Form.Item>

                    <Form.Item label="Phương thức thanh toán">
                        <Select
                            options={[
                                { value: 'momo', label: 'Ví MoMo' },
                                { value: 'vnpay', label: 'VNPAY-QR' },
                                { value: 'bank', label: 'Chuyển khoản ngân hàng' },
                                { value: 'credit', label: 'Thẻ ATM / Visa / Master' }
                            ]}
                            defaultValue="momo"
                        />
                    </Form.Item>

                    <Button type="primary" block icon={<CreditCardOutlined />} size="large" style={{ height: 48 }}>
                        Thanh toán {parseInt(amount).toLocaleString()}đ
                    </Button>
                    <p style={{ textAlign: 'center', color: '#8c8c8c', fontSize: 12, marginTop: 16 }}>
                        Giao dịch được bảo mật bởi cổng thanh toán quốc gia
                    </p>
                </Card>
            </Form>
        </div>
    );
}