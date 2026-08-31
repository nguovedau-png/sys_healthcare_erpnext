'use client';

import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';

export default function VerifyPage() {
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        setTimeout(() => {
            message.success('Xác thực thành công!');
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-white mb-2 text-center">Xác thực tài khoản</h2>
            <p className="text-white/70 text-center mb-6 text-sm">Nhập mã OTP 6 số đã được gửi đến email của bạn.</p>

            <Form
                name="verify_form"
                onFinish={onFinish}
                layout="vertical"
                size="large"
            >
                <div className="flex justify-center mb-6 gap-2">
                    <Form.Item
                        name="otp"
                        rules={[{ required: true, message: 'Nhập mã OTP', len: 6 }]}
                        className="m-0 w-full"
                    >
                        <Input
                            placeholder="Mã OTP"
                            className="h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-400 hover:border-blue-400 focus:border-blue-500 hover:bg-white focus:bg-white text-center tracking-[1em] font-mono text-lg"
                            maxLength={6}
                        />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold border-none hover:from-blue-400 hover:to-teal-400 shadow-lg"
                    >
                        XÁC NHẬN
                    </Button>
                </Form.Item>
            </Form>

            <div className="text-center mt-4 text-white/70 text-sm">
                Chưa nhận được mã? <button className="text-teal-400 font-bold hover:underline hover:text-teal-300 bg-transparent border-none cursor-pointer">Gửi lại</button>
            </div>
            <div className="text-center mt-6">
                <Link href="/auth/login" className="text-teal-400 hover:text-teal-300 transition-colors">
                    &larr; Quay lại đăng nhập
                </Link>
            </div>
        </div>
    );
}
