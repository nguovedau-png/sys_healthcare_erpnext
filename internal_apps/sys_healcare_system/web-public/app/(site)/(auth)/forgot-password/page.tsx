'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Forgot password submitted:', email);
        setIsSubmitted(true);
    };

    return (
        <div className="flex flex-col h-full justify-center">
            <div className="text-center sm:text-left mb-8">
                <Link href="/" className="lg:hidden inline-block mb-6">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">H</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">Healthcare</span>
                    </div>
                </Link>
                <div className="inline-flex h-16 w-16 bg-gradient-to-tr from-primary to-teal-500 rounded-lg items-center justify-center shadow-lg mb-6 transform -rotate-3">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Khôi phục mật khẩu</h2>
                <p className="mt-2 text-sm text-gray-500 font-medium tracking-wide leading-relaxed">
                    Đừng lo lắng. Hãy nhập email đăng ký và chúng tôi sẽ gửi hướng dẫn khôi phục.
                </p>
            </div>

            {!isSubmitted ? (
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5 ml-1">Email Đăng Ký</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:bg-gray-100 font-medium"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-primary to-teal-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-teal-500/30 transform transition-all duration-200 hover:-translate-y-0.5"
                        >
                            Gửi Link Khôi Phục
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-500 font-medium">
                        Quay lại{' '}
                        <Link href="/login" className="font-bold text-primary hover:text-teal-600 transition-colors">
                            Đăng nhập
                        </Link>
                    </p>
                </form>
            ) : (
                <div className="mt-4 text-center sm:text-left animate-fade-in border border-gray-100 bg-white p-6 rounded-lg shadow-sm">
                    <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-100 mb-6">
                        <p className="text-sm font-bold text-center">Link khôi phục đã được gửi đến<br/><span className="text-green-900 mt-1 block">{email}</span></p>
                    </div>
                    <p className="text-sm text-gray-500 font-medium text-center mb-8">
                        Vui lòng kiểm tra hộp thư đến và thư mục spam của bạn.
                    </p>
                    
                    <div className="space-y-3">
                        <Link href="/login" className="flex items-center justify-center w-full px-4 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-md">
                            Quay lại đăng nhập
                        </Link>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                            Thử lại với email khác
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
