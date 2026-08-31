'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import authService from '@/services/auth.service';

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setSession } = useAuth();
    const [status, setStatus] = useState('Đang kết nối khối nội bộ Frappe...');
    const hasCalledRef = useRef(false);

    useEffect(() => {
        if (hasCalledRef.current) return;

        const handleCallback = async () => {
            const code = searchParams.get('code');
            const error = searchParams.get('error');

            if (error) {
                setStatus(`Lỗi xác thực: ${error}`);
                setTimeout(() => router.push('/login'), 2000);
                return;
            }

            if (!code) {
                setStatus('Không tìm thấy mã uỷ quyền. Đang quay lại...');
                setTimeout(() => router.push('/login'), 2000);
                return;
            }

            hasCalledRef.current = true;

            try {
                setStatus('Đang thiết lập phiên bảo mật Frappe...');
                const token = await authService.exchangeCodeForToken(code);
                
                setStatus('Đang đồng bộ hồ sơ Đối tác...');
                const user = await authService.fetchUserProfile(token);
                
                setStatus('Xác thực thành công. Đang chuyển hướng...');
                setSession(token, user);
                
                router.push('/');
            } catch (err: any) {
                console.error('OAuth Callback Error:', err);
                setStatus('Xác thực thất bại. Vui lòng thử lại.');
                setTimeout(() => router.push('/login'), 2000);
            }
        };

        handleCallback();
    }, [searchParams, router, setSession]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-gray-800 space-y-6">
            <div className="w-16 h-16 border-t-4 border-b-4 border-[#0f766e] rounded-full animate-spin"></div>
            <div className="text-center">
                <h2 className="text-xl font-bold mb-2 text-[#0f766e]">{status}</h2>
                <p className="text-gray-500 text-sm italic">Vui lòng không đóng trình duyệt</p>
            </div>
        </div>
    );
}

export default function CallbackPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-16 h-16 border-t-4 border-b-4 border-[#0f766e] rounded-full animate-spin"></div></div>}>
            <CallbackContent />
        </Suspense>
    );
}
