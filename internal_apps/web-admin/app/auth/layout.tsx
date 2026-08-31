'use client';

import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 relative overflow-hidden">
            {/* Animated Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Glassmorphism Container */}
            <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl mx-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">CMS Admin</h1>
                    <p className="text-white/80">Healthcare Management Platform</p>
                </div>
                {children}
            </div>

            <div className="absolute bottom-4 text-white/50 text-xs">
                &copy; {new Date().getFullYear()} Healthcare SaaS. All rights reserved.
            </div>
        </div>
    );
}
