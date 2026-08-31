"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock Doctors
const ONLINE_DOCTORS = [
    { id: 1, name: 'ThS.BS Nguyễn Thị Mai', speciality: 'Nhi khoa', hospital: 'BV Nhi Đồng 1', price: 200000, avatar: '/img/doctor/doc-1.jpg', rating: 4.9, status: 'online' },
    { id: 2, name: 'BS.CKI Trần Văn Hùng', speciality: 'Tim mạch', hospital: 'Viện Tim TP.HCM', price: 300000, avatar: '/img/doctor/doc-2.jpg', rating: 4.8, status: 'busy' },
    { id: 3, name: 'TS.BS Lê Thu Hà', speciality: 'Da liễu', hospital: 'Da Liễu TP.HCM', price: 250000, avatar: '/img/doctor/doc-3.jpg', rating: 5.0, status: 'online' },
    { id: 4, name: 'BS.CKII Phạm Văn Dũng', speciality: 'Tâm lý', hospital: 'BV Tâm Thần', price: 500000, avatar: '/img/doctor/doc-4.jpg', rating: 4.7, status: 'offline' },
    { id: 5, name: 'ThS.BS Phan Tuấn Anh', speciality: 'Tiêu hoá', hospital: 'BV Bạch Mai', price: 280000, avatar: '/img/doctor/doc-6.jpg', rating: 4.9, status: 'online' }
];

export default function TelemedicinePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">

            {/* Neo-Tech Hero Section */}
            <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0f172a]">
                {/* Advanced Background Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-[#1e1b4b] opacity-90"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen opacity-50 transform translate-x-1/2 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[150px] mix-blend-screen opacity-50 transform -translate-x-1/4 translate-y-1/4"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 space-y-8">
                            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-indigo-300 font-bold text-sm shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                                <span className="w-2 h-2 rounded-full bg-green-400 absolute"></span>
                                <span className="ml-1">Sẵn sàng Kết nối Trực tuyến 24/7</span>
                            </div>
                            
                            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                                Y Tế Từ Xa <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                                    Giải pháp Tương lai
                                </span>
                            </h1>
                            
                            <p className="text-slate-300 text-lg lg:text-xl max-w-xl leading-relaxed font-light">
                                Khám bệnh tức thì qua Video Call chuẩn 4K, an toàn tuyệt đối và bảo mật y tế chuyên sâu. Kết nối với chuyên gia hàng đầu chỉ với 1 chạm.
                            </p>
                            
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="group relative bg-white text-indigo-900 font-black px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 overflow-hidden">
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-indigo-100 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] opacity-50 block"></span>
                                    <span className="relative flex items-center gap-2">
                                        <i className="fi flaticon-video-camera text-xl"></i> Gọi Tư vấn Ngay
                                    </span>
                                </button>
                                <button className="border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all">
                                    Hướng dẫn sử dụng
                                </button>
                            </div>
                            
                            <div className="pt-8 flex items-center gap-6 border-t border-white/10">
                                <div className="flex -space-x-4">
                                    <img className="w-12 h-12 rounded-full border-2 border-[#0f172a] object-cover" src="/img/doctor/doc-1.jpg" alt="Doctor" onError={(e) => (e.target as HTMLImageElement).src = '/img/user/user-1.JPG'} />
                                    <img className="w-12 h-12 rounded-full border-2 border-[#0f172a] object-cover" src="/img/doctor/doc-2.jpg" alt="Doctor" onError={(e) => (e.target as HTMLImageElement).src = '/img/user/user-2.JPG'} />
                                    <img className="w-12 h-12 rounded-full border-2 border-[#0f172a] object-cover" src="/img/doctor/doc-3.jpg" alt="Doctor" onError={(e) => (e.target as HTMLImageElement).src = '/img/user/user-3.JPG'} />
                                    <div className="w-12 h-12 rounded-full border-2 border-[#0f172a] bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">+500</div>
                                </div>
                                <div className="text-sm text-slate-300">
                                    <span className="text-white font-bold text-lg block">500+ Bác sĩ</span>
                                    đang trực tuyến sẵn sàng
                                </div>
                            </div>
                        </div>
                        
                        {/* 3D Mockup / Glassmorphism Concept */}
                        <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0 perspective-1000">
                            {mounted && (
                                <div className="relative w-full max-w-lg mx-auto aspect-[4/3] transform-gpu rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out z-10">
                                    {/* Main Device Frame */}
                                    <div className="absolute inset-0 bg-slate-800 rounded-lg border-[6px] border-slate-700 shadow-[20px_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
                                        <div className="h-0 flex-1 relative bg-slate-900">
                                            {/* Screen Content - User View */}
                                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Video Call Main" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                            
                                            {/* UI Overlay */}
                                            <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-center text-white">
                                                <div className="flex flex-col">
                                                    <span className="font-bold">Khám Da liễu</span>
                                                    <span className="text-xs text-green-400">Đang mã hoá End-to-End <i className="fi flaticon-lock text-[10px]"></i></span>
                                                </div>
                                                <div className="bg-red-500/20 text-red-100 px-3 py-1 rounded-full text-xs font-bold border border-red-500/50 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> 12:45
                                                </div>
                                            </div>
                                            
                                            {/* Self Camera PiP */}
                                            <div className="absolute bottom-24 right-4 w-28 aspect-[3/4] bg-slate-800 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Caller" className="w-full h-full object-cover" />
                                            </div>
                                            
                                            {/* Call Controls Box - Glassmorphism */}
                                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                                                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"><i className="fi flaticon-microphone"></i></button>
                                                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"><i className="fi flaticon-video-camera"></i></button>
                                                <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition shadow-lg shadow-red-500/30 transform hover:scale-105"><i className="fi flaticon-phone-call rotate-[135deg]"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Floating Elements (Decorative) */}
                                    <div className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-xl p-4 rounded-lg border border-white/20 shadow-2xl transform translate-z-10 animate-[bounce_4s_ease-in-out_infinite]">
                                        <div className="flex items-center gap-3">
                                            <i className="fi flaticon-shield text-2xl text-green-400"></i>
                                            <div>
                                                <div className="text-white font-bold text-sm">Bảo mật chuẩn y tế</div>
                                                <div className="text-slate-300 text-xs">HIPAA Compliant</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl p-4 rounded-lg border border-white/20 shadow-2xl transform translate-z-10 animate-[bounce_5s_ease-in-out_infinite_reverse]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                                <i className="fi flaticon-heart-rate text-xl text-indigo-400"></i>
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-sm">Chẩn đoán HD</div>
                                                <div className="text-slate-300 text-xs">Độ trễ thấp</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-24">

                {/* Animated Timeline Process */}
                <div className="text-center mb-20 relative z-10">
                    <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2">Quy trình thông minh</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900">3 Bước Kết Nối Chuyên Gia</h3>
                </div>

                <div className="max-w-5xl mx-auto mb-32 relative">
                    {/* Animated Line Connection */}
                    <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-1 bg-indigo-100 rounded-full -z-10">
                        {/* Progress indicator */}
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-[progress_3s_ease-in-out_infinite] w-0"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
                        {[
                            { step: 1, title: 'Chọn Bác sĩ & Khung giờ', desc: 'Lọc bác sĩ theo chuyên khoa, kinh nghiệm. Chọn giờ rảnh trong lịch trình của bạn.', icon: 'flaticon-search' },
                            { step: 2, title: 'Thanh toán An toàn', desc: 'Xác nhận lịch và thanh toán tiện lợi qua Thẻ tín dụng/Ví điện tử. Nhận mã định danh.', icon: 'flaticon-credit-card' },
                            { step: 3, title: 'Bắt đầu Cuộc gọi', desc: 'Đăng nhập phòng khám ảo đúng giờ. Bác sĩ tư vấn, kê đơn và lưu kết quả vào app.', icon: 'flaticon-video-camera' }
                        ].map((item) => (
                            <div key={item.step} className="group flex flex-col items-center">
                                <div className="w-24 h-24 rounded-lg bg-white border-2 border-indigo-50 shadow-xl shadow-indigo-100/50 flex items-center justify-center transform rotate-45 group-hover:rotate-0 group-hover:border-indigo-400 transition-all duration-300 mb-8 relative">
                                    <div className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                        <i className={`fi ${item.icon} text-3xl text-indigo-600`}></i>
                                    </div>
                                    {/* Number badge */}
                                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center shadow-lg transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300">
                                        {item.step}
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Online Doctors List - Neumorphic / Glass styling */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2">Trực tuyến ngay bây giờ</h2>
                        <h3 className="text-3xl font-bold text-slate-900">Bác sĩ Sẵn sàng Kết nối</h3>
                    </div>
                    <Link href="/search?type=doctor" className="group flex items-center gap-2 font-bold text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-full hover:bg-indigo-600 hover:text-white transition-all">
                        Xem tất cả Bác sĩ <i className="fi flaticon-right-arrow text-xs transform group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {ONLINE_DOCTORS.map(doc => {
                        const statusColor = doc.status === 'online' ? 'bg-green-500 shadow-green-500/50' : doc.status === 'busy' ? 'bg-orange-500 shadow-orange-500/50' : 'bg-slate-400';
                        const statusText = doc.status === 'online' ? 'Sẵn sàng' : doc.status === 'busy' ? 'Đang bận' : 'Ngoại tuyến';
                        
                        return (
                            <div key={doc.id} className="bg-white rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col group relative overflow-hidden">
                                
                                {/* Background glow effect on hover */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-indigo-500/10 transition-colors"></div>

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 shadow-sm">
                                        <span className={`w-2 h-2 rounded-full ${statusColor} shadow-sm`}></span>
                                        {statusText}
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                                        <i className="fi flaticon-star-1"></i> {doc.rating}
                                    </div>
                                </div>
                                
                                <div className="text-center mb-5 relative z-10">
                                    <div className="relative inline-block mb-4">
                                        <img src={doc.avatar} alt={doc.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto" onError={(e) => (e.target as HTMLImageElement).src = '/img/user/user-1.JPG'} />
                                        {doc.status === 'online' && (
                                            <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm animate-ping"></span>
                                        )}
                                        {doc.status === 'online' && (
                                            <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></span>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{doc.name}</h4>
                                    <p className="text-indigo-600 text-xs font-bold uppercase tracking-wider mt-1 mb-2">{doc.speciality}</p>
                                    <p className="text-slate-500 text-sm flex items-center justify-center gap-1 line-clamp-1">
                                        <i className="fi flaticon-hospital text-[10px]"></i> {doc.hospital}
                                    </p>
                                </div>
                                
                                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between relative z-10">
                                    <span className="font-black text-slate-900">{doc.price.toLocaleString()}<sup className="text-xs text-slate-400 font-normal">đ</sup></span>
                                    <button className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                                        <i className="fi flaticon-video-camera text-sm"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
