'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spin, App } from 'antd';
import { useAuth } from '@/providers/AuthProvider';
import authService from '@/services/auth.service';

export default function CallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setSession } = useAuth();
    const { message } = App.useApp();
    const [status, setStatus] = useState('Đang kết nối với Frappe...');
    const hasCalledRef = useRef(false);

    useEffect(() => {
        // Prevent double execution in React Strict Mode
        if (hasCalledRef.current) return;

        const handleCallback = async () => {
            const code = searchParams.get('code');
            const error = searchParams.get('error');

            if (error) {
                message.error(`Lỗi xác thực: ${error}`);
                router.push('/auth/login');
                return;
            }

            if (!code) {
                setStatus('Không tìm thấy mã xác thực. Đang quay lại...');
                setTimeout(() => router.push('/auth/login'), 2000);
                return;
            }

            // Mark as called BEFORE the async operation
            hasCalledRef.current = true;

            try {
                setStatus('Đang trao đổi mã xác thực...');
                const token = await authService.exchangeCodeForToken(code);
                
                setStatus('Đang lấy thông tin người dùng...');
                const user = await authService.fetchUserProfile(token);
                
                setStatus('Đăng nhập thành công!');
                setSession(token, user);
                
                message.success('Sẵn sàng! Chào mừng trở lại.');
                
                // Final Redirect to Home
                router.push('/');
            } catch (err: any) {
                console.error('OAuth Callback Error:', err);
                message.error('Xác thực thất bại. Vui lòng thử lại.');
                router.push('/auth/login');
            }
        };

        handleCallback();
    }, [searchParams, router, setSession, message]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-white space-y-6">
            <Spin size="large" />
            <div className="text-center">
                <h2 className="text-xl font-bold mb-2">{status}</h2>
                <p className="text-white/60 text-sm italic">Vui lòng không đóng cửa sổ này</p>
            </div>
        </div>
    );
}
