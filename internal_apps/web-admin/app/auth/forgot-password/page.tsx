'use client';

import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const onFinish = (values: any) => {
        message.success('Email khôi phục mật khẩu đã được gửi!');
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-white mb-2 text-center">Quên mật khẩu?</h2>
            <p className="text-white/70 text-center mb-6 text-sm">Nhập email của bạn để nhận liên kết đặt lại mật khẩu.</p>

            <Form
                name="forgot_password_form"
                onFinish={onFinish}
                layout="vertical"
                size="large"
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
                >
                    <Input
                        prefix={<MailOutlined className="text-gray-400" />}
                        placeholder="Email đăng ký"
                        className="h-10 bg-white border-gray-300 text-gray-900 placeholder-gray-400 hover:border-blue-400 focus:border-blue-500 hover:bg-white focus:bg-white"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold border-none hover:from-blue-400 hover:to-teal-400 shadow-lg"
                    >
                        GỬI YÊU CẦU
                    </Button>
                </Form.Item>
            </Form>

            <div className="text-center mt-4">
                <Link href="/auth/login" className="text-teal-400 hover:text-teal-300 transition-colors">
                    &larr; Quay lại đăng nhập
                </Link>
            </div>
        </div>
    );
}
