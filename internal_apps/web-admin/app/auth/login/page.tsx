'use client';

import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { SiFrappe } from 'react-icons/si'; // I'll use a generic icon or custom if possible, but for now Ant Design or React Icons

export default function LoginPage() {
    const { loginWithFrappe } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleOAuthLogin = () => {
        setLoading(true);
        try {
            loginWithFrappe();
        } catch (err: any) {
            message.error('Không thể kết nối với máy chủ xác thực');
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-white mb-2">Hệ thống Quản trị</h1>
                <p className="text-white/60">Vui lòng đăng nhập qua hệ thống trung tâm</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <Button
                    type="primary"
                    block
                    size="large"
                    loading={loading}
                    onClick={handleOAuthLogin}
                    className="h-14 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 border-none rounded-2xl text-lg font-bold shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    <SiFrappe className="text-2xl" />
                    TIẾP TỤC VỚI FRAPPE
                </Button>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-white/50 text-sm mb-4">
                        Bằng cách đăng nhập, bạn đồng ý với các điều khoản bảo mật của hệ thống Healthcare ERP.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link href="/" className="text-teal-400 hover:text-teal-300 text-xs font-medium uppercase tracking-wider">
                            Trang chủ
                        </Link>
                        <Link href="/support" className="text-teal-400 hover:text-teal-300 text-xs font-medium uppercase tracking-wider">
                            Hỗ trợ
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12 text-white/40 text-xs uppercase tracking-widest">
                &copy; 2026 Healthcare Global Ecosystem
            </div>
        </div>
    );
}
