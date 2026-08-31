"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

export default function AmbulancePage() {
    const [emergency, setEmergency] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">

            {/* Premium Emergency Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-900 via-red-700 to-red-600 text-white py-24 shadow-2xl">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-white transform rotate-12 blur-[120px]"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-black transform -rotate-12 blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="relative inline-block mb-10">
                        {/* Radar/Pulse rings */}
                        <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30 scale-150"></div>
                        <div className="absolute inset-0 bg-red-300 rounded-full animate-pulse opacity-40 scale-125 duration-1000"></div>
                        <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.4)] backdrop-blur-md border-[6px] border-red-500/30">
                            <i className="fi flaticon-ambulance text-6xl text-red-600 ml-2"></i>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
                        Cấp cứu Khẩn cấp <span className="text-red-200">24/7</span>
                    </h1>
                    <p className="text-red-100 md:text-xl max-w-2xl mx-auto mb-12 drop-shadow-md font-medium leading-relaxed">
                        Đội ngũ y tế chuyên nghiệp và xe cứu thương trang bị đầy đủ thiết bị hồi sức luôn sẵn sàng xuất phát ngay khi bạn cần. Phản ứng cực nhanh trong 5 phút.
                    </p>

                    <button
                        onClick={() => setEmergency(true)}
                        className="group relative bg-white text-red-600 font-black px-12 md:px-16 py-6 rounded-full text-2xl hover:bg-red-50 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] overflow-hidden scale-100 hover:scale-105 active:scale-95 duration-300"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] opacity-50 block"></span>
                        <span className="relative flex items-center gap-3">
                            <i className="fi flaticon-phone-call animate-bounce"></i>
                            GỌI CẤP CỨU NGAY
                        </span>
                    </button>
                    <div className="mt-6 text-red-200 text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Hệ thống đang túc trực
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                {/* Premium Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative -mt-32 z-20 px-4 md:px-0">
                    {[
                        { title: 'Cấp cứu Sinh tử', desc: 'Có mặt trong 5 phút, bao gồm bác sĩ, y tá và máy thở.', price: 'Miễn phí tư vấn', icon: 'flaticon-siren', color: 'from-red-500 to-red-600', shadow: 'shadow-red-500/20', text: 'text-red-600' },
                        { title: 'Chuyển viện An toàn', desc: 'Hỗ trợ chuyển tuyến, xét nghiệm bằng xe cấp cứu chuẩn quốc tế.', price: 'Từ 500.000đ', icon: 'flaticon-hospital', color: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20', text: 'text-blue-600' },
                        { title: 'Đưa đón Khám bệnh', desc: 'Xe lăn, cáng nâng phục vụ người già, người tàn tật tại nhà.', price: 'Từ 300.000đ', icon: 'flaticon-wheelchair', color: 'from-emerald-500 to-emerald-600', shadow: 'shadow-emerald-500/20', text: 'text-emerald-600' }
                    ].map((service, idx) => (
                        <div key={idx} className={`bg-white p-10 rounded-[2rem] shadow-xl ${service.shadow} border border-gray-100/50 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full relative overflow-hidden group`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent opacity-50 rounded-bl-[100px] z-0"></div>

                            <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-8 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform`}>
                                <i className={`fi ${service.icon} text-4xl text-white`}></i>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">{service.title}</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed relative z-10 flex-grow">{service.desc}</p>

                            <div className="border-t border-gray-100 pt-6 mt-auto relative z-10">
                                <p className={`font-black text-xl mb-6 ${service.text}`}>{service.price}</p>
                                <button className="w-full bg-gray-50 text-gray-800 font-bold py-4 rounded-xl hover:bg-gray-900 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2">
                                    Đăng ký <i className="fi flaticon-right-arrow text-xs"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tracking / Features Section (Glassmorphism concept) */}
                <div className="relative rounded-[3rem] p-10 md:p-16 overflow-hidden bg-slate-900 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('/img/pattern.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[150%] bg-blue-600/30 blur-[120px] rounded-full point-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
                        <div>
                            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4 block">Hệ thống Điều phối Thông minh</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Mọi giây phút đều <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">quý giá như sinh mệnh</span></h2>

                            <div className="space-y-6">
                                {[
                                    { icon: 'flaticon-clock', title: 'Phản ứng cực tốc < 5 phút', desc: 'Tổng đài viên kết nối ngay lập tức. Xe cứu thương xuất phát trong vòng 5-10 phút tại khu vực nội ô thành phố.' },
                                    { icon: 'flaticon-doctor', title: 'Y bác sĩ hồi sức đi kèm', desc: 'Đội ngũ chuyên khoa cấp cứu giàu kinh nghiệm, có khả năng xử lý các ca đột quỵ, đa chấn thương ngay trên xe.' },
                                    { icon: 'flaticon-gps', title: 'Định vị GPS Real-time', desc: 'Hệ thống tự động tìm xe gần nhất và hiển thị tọa độ xe cho người nhà theo dõi trực tiếp qua ứng dụng.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-5 p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                                            <i className={`fi ${item.icon} text-2xl text-white`}></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-xl mb-2">{item.title}</h4>
                                            <p className="text-blue-100/70 leading-relaxed text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            {/* Mock Map / Tracking UI snippet */}
                            <div className="rounded-[2.5rem] bg-slate-800 border-8 border-slate-700 shadow-2xl overflow-hidden aspect-[4/5] relative">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Map mockup" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                                <div className="absolute inset-0 bg-blue-900/40"></div>

                                {/* UI Overlays */}
                                <div className="absolute top-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-lg flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                                        <i className="fi flaticon-ambulance text-xl text-white"></i>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">Xe cấp cứu AMB-042</div>
                                        <div className="text-blue-200 text-xs">Đang đến - Cách 2.4 km (4 mins)</div>
                                    </div>
                                </div>

                                {/* Map Path Graphic Placeholder */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" fill="none">
                                    <path d="M 50 400 C 100 350, 150 200, 250 250 S 300 100, 350 150" stroke="url(#paint0_linear)" strokeWidth="6" strokeDasharray="10 10" className="animate-[dash_20s_linear_infinite]" />
                                    <circle cx="350" cy="150" r="8" fill="#ef4444" className="animate-ping" />
                                    <circle cx="350" cy="150" r="4" fill="#ffffff" />
                                    <defs>
                                        <linearGradient id="paint0_linear" x1="50" x2="350" y1="400" y2="150" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#3b82f6" />
                                            <stop offset="1" stopColor="#ef4444" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Glowing Emergency Modal */}
            {emergency && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-fade-in" onClick={() => setEmergency(false)}></div>
                    <div className="bg-white rounded-[2rem] p-10 max-w-md w-full relative z-10 shadow-[0_0_100px_rgba(220,38,38,0.4)] transform hover:scale-[1.01] transition-transform animate-scale-up border-[8px] border-red-50">
                        <button onClick={() => setEmergency(false)} className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 focus:outline-none transition-colors">
                            <i className="fi flaticon-cancel"></i>
                        </button>

                        <div className="text-center mb-8 pt-4">
                            <div className="relative w-28 h-28 mx-auto mb-6">
                                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-60"></div>
                                <div className="relative w-full h-full bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                                    <i className="fi flaticon-phone-call text-5xl text-white animate-[wiggle_1s_ease-in-out_infinite]"></i>
                                </div>
                            </div>
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-3">Đang kết nối...</h3>
                            <p className="text-gray-500 text-lg font-medium">Hệ thống đang chuyển máy tới khoa cấp cứu</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center p-5 bg-red-50 rounded-lg border border-red-100">
                                <span className="text-red-900 font-medium">Hotline Cấp cứu (Nhấn gọi)</span>
                                <a href="tel:115" className="font-black text-3xl text-red-600 hover:scale-105 transition-transform block">115</a>
                            </div>
                            <div className="flex justify-between items-center p-5 bg-blue-50 rounded-lg border border-blue-100">
                                <span className="text-blue-900 font-medium">Tổng đài Hỗ trợ Y tế</span>
                                <a href="tel:1900xxxx" className="font-bold text-xl text-blue-600">1900 xxxx</a>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-400 mb-0">Vui lòng chuẩn bị sẵn thông tin địa chỉ và tình trạng nạn nhân để việc ứng cứu nhanh nhất.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
