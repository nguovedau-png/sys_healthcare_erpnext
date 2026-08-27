'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register submitted:', formData);
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
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Tạo tài khoản mới</h2>
                <p className="mt-1 text-sm text-gray-500 font-medium tracking-wide">Tham gia cộng đồng chăm sóc sức khỏe</p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
                {/* Full name field */}
                <div>
                    <input
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:bg-gray-100 font-medium text-sm"
                        placeholder="Họ và tên"
                    />
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:bg-gray-100 font-medium text-sm"
                        placeholder="Địa chỉ Email"
                    />
                    <input
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:bg-gray-100 font-medium text-sm"
                        placeholder="Số điện thoại"
                    />
                </div>

                {/* Password Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <input
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:bg-gray-100 font-medium text-sm"
                        placeholder="Mật khẩu (>6 ký tự)"
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:bg-gray-100 font-medium text-sm"
                        placeholder="Xác nhận mật khẩu"
                    />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start pt-1 pb-2">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            name="agreeToTerms"
                            type="checkbox"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary cursor-pointer accent-primary"
                        />
                    </div>
                    <label htmlFor="terms" className="ml-2 text-xs text-gray-500 font-medium leading-tight cursor-pointer">
                        Tôi đồng ý với <Link href="/terms" className="text-primary hover:underline font-bold">Điều khoản</Link> và <Link href="/privacy" className="text-primary hover:underline font-bold">Bảo mật</Link>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-primary to-teal-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-teal-500/30 transform transition-all duration-200 hover:-translate-y-0.5"
                >
                    Tạo Tài Khoản
                </button>
            </form>
            
            <div className="mt-5">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-white text-gray-400 font-medium text-xs tracking-widest uppercase">Đăng ký bằng</span>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <button type="button" className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-200 bg-white rounded-xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        <img className="h-4 w-4" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                        Google
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-200 bg-white rounded-xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                        <img className="h-4 w-4" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" />
                        Facebook
                    </button>
                </div>
            </div>

            <p className="mt-5 text-center text-sm text-gray-500 font-medium">
                Đã có tài khoản?{' '}
                <Link href="/login" className="font-bold text-primary hover:text-teal-600 transition-colors">
                    Đăng nhập
                </Link>
            </p>
        </div>
    );
}
