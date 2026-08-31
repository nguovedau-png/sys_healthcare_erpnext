'use client';

import React from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full flex overflow-hidden bg-white font-sans">
            {/* Left side branding - Partner Specific */}
            <div className="hidden lg:flex w-[50%] relative bg-gradient-to-br from-teal-800 to-teal-600 items-center justify-center p-12 lg:p-20 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-teal-900 mix-blend-multiply opacity-50"></div>
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1551076805-e18690c5e561?auto=format&fit=crop&q=80&w=1600" 
                        alt="Medical Professionals" 
                        className="object-cover opacity-30 w-full h-full grayscale mix-blend-overlay"
                    />
                </div>
                
                <div className="relative z-10 w-full max-w-[480px] text-white">
                    <Link href="/" className="inline-block mb-10 hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
                                <span className="text-white font-black text-3xl">M</span>
                            </div>
                            <span className="text-3xl font-bold tracking-tight">MediPortal</span>
                        </div>
                    </Link>
                    
                    <h1 className="text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
                        Nền tảng đối tác<br />y tế toàn diện
                    </h1>
                    <p className="text-lg text-white/90 font-medium mb-12 max-w-md leading-relaxed drop-shadow-sm">
                        Dành riêng cho Bác sĩ, Phòng khám, Bệnh viện và Nhà thuốc. Quản lý lịch hẹn, bệnh án và doanh thu trên một hệ sinh thái duy nhất.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl">
                            <i className="fi flaticon-stethoscope text-2xl mb-3 block opacity-80"></i>
                            <p className="font-bold text-sm">Chẩn đoán thông minh</p>
                            <p className="text-xs text-white/70 mt-1">Hồ sơ bệnh án điện tử liền mạch</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl">
                            <i className="fi flaticon-medicine text-2xl mb-3 block opacity-80"></i>
                            <p className="font-bold text-sm">Quản lý nhà thuốc</p>
                            <p className="text-xs text-white/70 mt-1">Kiểm soát kho, xuất nhập tức thì</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side form */}
            <div className="w-full lg:w-[50%] flex items-center justify-center p-6 sm:p-10 lg:p-20 relative bg-white h-full overflow-y-auto">
                <div className="w-full max-w-[420px] animate-fade-in relative z-10 pb-4">
                    {children}
                </div>
            </div>
            
            <style jsx global>{`
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
