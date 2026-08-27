'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';


export default function LoginPage() {
    const { login, loading } = useAuth();
    // const [email, setEmail] = useState('admin@healthcare.vn');
    // const [password, setPassword] = useState('password123');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <div className="flex flex-col h-full justify-center">
            <div className="text-center sm:text-left mb-6">
                <Link href="/" className="lg:hidden inline-block mb-6">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">H</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">Healthcare</span>
                    </div>
                </Link>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Chào mừng trở lại</h2>
                <p className="mt-2 text-sm text-gray-500 font-medium tracking-wide">Đăng nhập tài khoản để tiếp tục</p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-5 rounded-r-lg">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:bg-gray-100 font-medium"
                        placeholder="name@company.com"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5 ml-1 pr-1">
                        <label htmlFor="password" className="block text-xs font-bold text-gray-700 uppercase tracking-widest">Mật khẩu</label>
                        <Link href="/forgot-password" className="text-xs font-bold text-primary hover:text-teal-600 transition-colors">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all hover:bg-gray-100 font-medium"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors text-sm font-medium focus:outline-none"
                        >
                            {showPassword ? 'Ẩn' : 'Hiện'}
                        </button>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-primary to-teal-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-teal-500/30 transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                    </button>
                </div>
            </form>

            <div className="mt-7">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-400 font-medium text-xs tracking-widest uppercase">Hoặc tiếp tục với</span>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button type='button' className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-200 bg-white rounded-xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        <img className="h-4 w-4" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                        Google
                    </button>
                    <button type='button' className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-200 bg-white rounded-xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        <img className="h-4 w-4" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" />
                        Facebook
                    </button>
                </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500 font-medium">
                Chưa có tài khoản?{' '}
                <Link href="/register" className="font-bold text-primary hover:text-teal-600 transition-colors">
                    Tạo tài khoản mới
                </Link>
            </p>
        </div>
    );
}
