'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-[calc(100vh-70px)] w-full flex overflow-hidden bg-white font-sans">
            {/* Left side branding */}
            <div className="hidden lg:flex w-[45%] relative bg-gradient-to-br from-primary to-teal-600 items-center justify-center p-12 lg:p-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1600" 
                        alt="Background" 
                        className="object-cover opacity-20 w-full h-full"
                    />
                </div>
                <div className="relative z-10 w-full max-w-[420px] text-white">
                    <Link href="/" className="inline-block mb-10 hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-primary font-bold text-2xl">H</span>
                            </div>
                            <span className="text-3xl font-bold tracking-tight">Healthcare</span>
                        </div>
                    </Link>
                    <h1 className="text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
                        Khởi đầu cho<br />sức khỏe số
                    </h1>
                    <p className="text-lg text-white/90 font-medium mb-12 max-w-md leading-relaxed drop-shadow-sm">
                        Hệ sinh thái y tế toàn diện nhất. Đặt lịch, mua thuốc, khám bệnh trực tuyến và quản lý hồ sơ gia đình.
                    </p>
                    
                    <div className="relative">
                        <div className="absolute top-0 right-0 -mr-8 -mt-4 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 flex items-center gap-4 max-w-sm shadow-xl relative z-10">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 opacity-90">
                                <img src="https://i.pravatar.cc/150?img=11" alt="Doctor" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-sm font-bold capitalize">Trải nghiệm tuyệt vời</p>
                                <p className="text-xs text-white/80 mt-0.5">Tiện lợi, Nhanh chóng & Bảo mật</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side form */}
            <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-10 relative bg-white h-full overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                
                <div className="w-full max-w-md animate-fade-in relative z-10 pb-4">
                    {children}
                </div>
            </div>
            
            <style jsx global>{`
                footer {
                    display: none !important;
                }
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
