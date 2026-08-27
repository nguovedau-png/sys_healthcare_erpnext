"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';

const FAMILY_MEMBERS = [
    { id: '1', name: 'Nguyễn Văn Nam', relation: 'Chủ hộ (Bản thân)', age: 45, status: 'good', healthScore: 92, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', alerts: [] },
    { id: '2', name: 'Trần Thị Lan', relation: 'Vợ', age: 42, status: 'warning', healthScore: 78, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', alerts: ['Đến lịch siêu âm tuyến giáp'] },
    { id: '3', name: 'Nguyễn Văn Minh', relation: 'Bố', age: 75, status: 'critical', healthScore: 54, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', alerts: ['Huyết áp cao (Sáng nay)', 'Quên uống thuốc tiểu đường'] },
    { id: '4', name: 'Nguyễn Bảo Phương', relation: 'Con gái', age: 8, status: 'good', healthScore: 98, avatar: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', alerts: ['Lịch tiêm phòng HPV tháng sau'] },
];

export default function FamilyManagementPage() {
    return (
        <div className="min-h-screen bg-[#fffdfa] pb-24 font-sans selection:bg-rose-500 selection:text-white">


            {/* Warm/Connectivity Hero Section */}
            <div className="relative pt-24 pb-24 overflow-hidden bg-white border-b border-rose-100">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-rose-100/50 via-orange-50/50 to-transparent rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-amber-100/30 to-transparent rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-orange-400 rounded-lg flex items-center justify-center transform rotate-12 mb-8 shadow-[0_15px_30px_rgba(244,63,94,0.3)]">
                        <i className="fi flaticon-family text-4xl text-white transform -rotate-12"></i>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight">
                        Quản lý <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Sức khỏe Gia đình</span>
                    </h1>

                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
                        Trung tâm kết nối và theo dõi chỉ số y tế của mọi thành viên trong nhà. Quản lý lịch tiêm chủng, hồ sơ bệnh án, và nhận Cảnh báo bất thường ngay lập tức.
                    </p>

                    <div className="flex bg-white rounded-full p-2 border border-slate-200 shadow-sm shadow-slate-100/50 max-w-md w-full justify-between items-center transition-all focus-within:shadow-md focus-within:border-rose-300">
                        <input type="email" placeholder="Mời thành viên qua Email/SĐT..." className="flex-grow px-6 outline-none bg-transparent font-medium text-slate-700 placeholder-slate-400" />
                        <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all">
                            <i className="fi flaticon-plus"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">

                {/* Unified Dashboard UI */}
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-[0_30px_60px_rgba(244,63,94,0.05)] p-6 md:p-12 mb-16 overflow-hidden relative">

                    {/* Abstract Tree Connectors (SVG) - Decorative background */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 50% 20% C 20% 50%, 80% 50%, 50% 80%" stroke="#f43f5e" strokeWidth="20" fill="none" className="animate-[dash_60s_linear_infinite]" strokeDasharray="50 50" strokeLinecap="round" />
                        <path d="M 20% 20% C 50% 50%, 50% 50%, 80% 80%" stroke="#f43f5e" strokeWidth="10" fill="none" />
                    </svg>

                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800">Sơ đồ Y tế (4 Thành viên)</h2>
                            <p className="text-slate-500 font-medium">Theo dõi tình trạng sức khỏe thời gian thực</p>
                        </div>
                        <div className="hidden md:flex gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm"></span> Tốt</div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></span> Lưu ý</div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm"></span> Khẩn cấp</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
                        {FAMILY_MEMBERS.map(member => {
                            const statusColor = member.status === 'good' ? 'emerald' : member.status === 'warning' ? 'amber' : 'rose';

                            return (
                                <div key={member.id} className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                                    {member.alerts.length > 0 && (
                                        <div className="absolute top-4 right-4 bg-rose-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold z-10 animate-bounce shadow-md">
                                            {member.alerts.length}
                                        </div>
                                    )}

                                    {/* Avatar with pulsing ring based on status */}
                                    <div className="flex justify-center mb-6 relative">
                                        <div className={`absolute inset-0 bg-${statusColor}-400 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                                        <div className="relative">
                                            <div className={`absolute -inset-1 rounded-full border-2 border-${statusColor}-400 ${member.status !== 'good' ? 'animate-ping opacity-75' : 'opacity-0'}`}></div>
                                            <img src={member.avatar} alt={member.name} className={`w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg relative z-10`} />

                                            {/* Score Badge */}
                                            <div className={`absolute -bottom-2 -right-2 bg-${statusColor}-100 text-${statusColor}-700 font-bold border-2 border-white rounded-full w-10 h-10 flex items-center justify-center text-sm shadow-sm z-20`}>
                                                {member.healthScore}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-rose-600 transition-colors">{member.name}</h3>
                                        <div className="text-xs font-bold tracking-widest uppercase text-slate-400 mt-1">{member.relation} • {member.age} tuổi</div>
                                    </div>

                                    {member.alerts.length > 0 ? (
                                        <div className={`bg-${statusColor}-50 rounded-lg p-4 text-xs font-medium text-slate-700 space-y-2 border border-${statusColor}-100/50 mb-6 h-28 overflow-y-auto custom-scrollbar`}>
                                            {member.alerts.map((alert, idx) => (
                                                <div key={idx} className="flex gap-2 items-start">
                                                    <i className={`fi flaticon-warning text-${statusColor}-500 mt-0.5 text-[10px]`}></i>
                                                    <span className="leading-snug">{alert}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-slate-50 rounded-lg p-4 text-xs font-medium text-slate-500 flex flex-col items-center justify-center gap-2 border border-slate-100 mb-6 h-28">
                                            <i className="fi flaticon-check text-emerald-500 text-xl"></i>
                                            <span>Mọi chỉ số đều ổn định</span>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-2 mt-auto">
                                        <button className="bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-1 border border-slate-100 hover:border-rose-200">
                                            <i className="fi flaticon-medical-file"></i> Hồ sơ
                                        </button>
                                        <button className="bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-1 border border-slate-100 hover:border-rose-200">
                                            <i className="fi flaticon-calendar"></i> Đặt lịch
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Integration Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Block 1 */}
                    <div className="bg-white rounded-lg p-8 border border-slate-100 shadow-sm hover:border-orange-300 transition-colors flex flex-col justify-between">
                        <div className="flex items-start justify-between mb-8">
                            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-2xl">
                                <i className="fi flaticon-devices"></i>
                            </div>
                            <span className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Thiết bị</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Đồng bộ Thiết bị Sinh tồn</h3>
                            <p className="text-slate-500 leading-relaxed max-w-sm">Kết nối với máy đo huyết áp, đồng hồ thông minh (Apple Watch, Garmin), máy đo đường huyết để tự động cập nhật và phân tích chỉ số cho từng thành viên hàng ngày.</p>
                        </div>
                        <button className="mt-8 text-left font-bold text-orange-500 flex items-center gap-2 hover:gap-3 transition-all">
                            Quản lý thiết bị kết nối <i className="fi flaticon-right-arrow text-xs"></i>
                        </button>
                    </div>

                    {/* Block 2 */}
                    <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-lg p-8 shadow-xl shadow-rose-500/20 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl rounded-bl-full pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-2xl border border-white/30">
                                <i className="fi flaticon-emergency-call"></i>
                            </div>
                            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">SOS Khẩn cấp</span>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-3">Bộ Phận Phản Ứng Nhanh</h3>
                            <p className="text-rose-100 leading-relaxed max-w-sm mb-6">Thiết lập danh bạ Cấp cứu trung tâm và khai báo trước tiểu sử của gia đình đo lường (nhóm máu, dị ứng thuốc). Bấm gọi 115 xe cứu thương sẽ nhận đủ mọi Data gốc.</p>

                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 flex items-center justify-between">
                                <span className="font-medium">Chỉ số sinh tồn của Bố <strong className="text-red-200 block">Đang cảnh báo</strong></span>
                                <button className="bg-white text-rose-600 font-bold px-4 py-2 rounded-xl text-sm hover:shadow-lg hover:scale-105 transition-all">Kiểm tra ngay</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
