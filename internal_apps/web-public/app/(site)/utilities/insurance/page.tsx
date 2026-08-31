"use client";

import React, { useState, useEffect } from 'react';
import Banner from '@/components/common/Banner';
import marketingService, { InsurancePartner } from '@/services/marketing.service';
import Spin from '@/components/ui/Spin';

export default function InsurancePage() {
    const [partners, setPartners] = useState<InsurancePartner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [estimateActive, setEstimateActive] = useState(false);
    const [expense, setExpense] = useState(10000000);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const data = await marketingService.getInsurancePartners();
                setPartners(data);
            } catch (error) {
                console.error('Failed to fetch insurance partners:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPartners();
    }, []);

    return (
        <div className="min-h-screen bg-[#f4f7fc] pb-24 font-sans selection:bg-blue-600 selection:text-white">


            {/* Defense/Security Navy Hero Section */}
            <div className="relative pt-24 pb-48 overflow-hidden bg-[#0a1931]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66cb85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-[0.15] object-cover mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1931] via-[#0a1931]/80 to-transparent"></div>

                {/* Floating Shields Decor */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute top-10 left-10 text-white/5 transform rotate-[-15deg] scale-150 pointer-events-none">
                    <i className="fi flaticon-shield text-[300px]"></i>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-900/50 border border-blue-400/30 text-blue-300 font-bold text-sm tracking-widest uppercase mb-8 backdrop-blur-md">
                        <i className="fi flaticon-shield-1"></i>
                        Mạng Lưới Bảo Lãnh Trực Tiếp
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                        Bảo Hiểm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Toàn Diện</span>
                    </h1>

                    <p className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-light">
                        Liên kết với hơn 30+ công ty bảo hiểm trong và ngoài nước. Tối ưu hóa chi phí khám chữa bệnh với quy trình bảo lãnh viện phí tự động, nhanh chóng, không rườm rà giấy tờ.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-blue-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all">
                            Xem quy trình bồi thường
                        </button>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/20 transition-all">
                            Tra cứu Thẻ/Hợp đồng
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Interface Content */}
            <div className="container mx-auto px-4 relative z-20 -mt-24">

                {/* 3 Pillar Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 max-w-6xl mx-auto">
                    {[
                        { title: 'Thanh toán Tự động', desc: 'Trừ trực tiếp chi phí khám vào hạn mức bảo hiểm, không cần ứng trước tiền mặt.', icon: 'flaticon-credit-card', color: 'text-blue-500', bg: 'bg-blue-500' },
                        { title: 'Đối tác Đa dạng', desc: 'Chấp nhận cả bảo hiểm tư nhân, bảo hiểm quốc tế và bảo hiểm y tế nhà nước (BHYT).', icon: 'flaticon-handshake', color: 'text-indigo-500', bg: 'bg-indigo-500' },
                        { title: 'Giải quyết Siêu tốc', desc: 'Thời gian xét duyệt bảo lãnh nội trú < 30 phút, ngoại trú < 15 phút.', icon: 'flaticon-stopwatch', color: 'text-cyan-500', bg: 'bg-cyan-500' }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 border border-white hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg}/10 rounded-bl-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700`}></div>
                            <div className={`w-16 h-16 rounded-lg ${feature.bg}/10 flex items-center justify-center mb-6`}>
                                <i className={`fi ${feature.icon} text-3xl ${feature.color}`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-[#0a1931] mb-3 relative z-10">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm relative z-10">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 max-w-7xl mx-auto mb-24">

                    {/* Mock Calculator Tool */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-blue-900/5 border border-gray-100 relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 text-blue-50 transform translate-x-1/4 translate-y-1/4">
                            <i className="fi flaticon-calculator text-[200px]"></i>
                        </div>

                        <div className="flex items-center gap-4 mb-8 relative z-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                <i className="fi flaticon-calculating text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#0a1931]">Công cụ Ước tính Bồi thường</h3>
                                <p className="text-gray-500 text-sm">Tính toán số tiền được bảo lãnh dựa trên hạn mức</p>
                            </div>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <div>
                                <label className="block text-sm text-gray-400 font-bold uppercase tracking-widest mb-4">Nhập tổng chi phí dự kiến (VNĐ)</label>
                                <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 flex items-center focus-within:border-blue-500 focus-within:bg-white transition-all">
                                    <span className="text-2xl font-black text-gray-900 mr-2 flex-grow">
                                        {expense.toLocaleString('vi-VN')}
                                    </span>
                                    <span className="text-gray-400 font-medium">VNĐ</span>
                                </div>
                                <input
                                    type="range"
                                    min="1000000"
                                    max="100000000"
                                    step="1000000"
                                    value={expense}
                                    onChange={(e) => {
                                        setExpense(Number(e.target.value));
                                        setEstimateActive(true);
                                    }}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-6"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-500 font-bold mb-2">Loại hình khám</label>
                                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-medium text-gray-700 outline-none focus:border-blue-500">
                                        <option>Ngoại trú (Khám bệnh)</option>
                                        <option>Nội trú (Nằm viện)</option>
                                        <option>Nha khoa</option>
                                        <option>Thai sản</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 font-bold mb-2">Hạng thẻ bảo hiểm</label>
                                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-medium text-gray-700 outline-none focus:border-blue-500">
                                        <option>Hạng Vàng / Titanium</option>
                                        <option>Hạng Bạc / Tiêu chuẩn</option>
                                        <option>Hạng Bạch kim / VIP</option>
                                    </select>
                                </div>
                            </div>

                            <div className={`mt-8 bg-gradient-to-br from-[#0a1931] to-blue-900 rounded-lg p-8 text-white transition-all duration-500 shadow-2xl shadow-blue-900/30 ${estimateActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'}`}>
                                <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-6">
                                    <span className="text-blue-200 font-medium">Công ty bảo hiểm chi trả (Ước tính 80%)</span>
                                    <span className="text-4xl font-black text-green-400">
                                        {(expense * 0.8).toLocaleString('vi-VN')} <span className="text-lg">đ</span>
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-blue-200 font-medium">Bạn cần thanh toán (Đồng chi trả 20%)</span>
                                    <span className="text-2xl font-bold">
                                        {(expense * 0.2).toLocaleString('vi-VN')} <span className="text-lg">đ</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Partners List */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-[#0a1931] mb-2">Mạng lưới Đối tác</h3>
                            <p className="text-gray-500 text-sm">Chấp nhận thanh toán trực tiếp từ các tổ chức bảo hiểm và tài chính hàng đầu.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {isLoading ? (
                                <div className="col-span-2 flex justify-center py-10">
                                    <Spin tip="Đang tải đối tác..." />
                                </div>
                            ) : (
                                <>
                                    {partners.map((partner, idx) => (
                                        <div key={idx} className={`bg-white rounded-lg p-6 flex flex-col items-center justify-center border transition-all ${partner.highlight ? 'border-blue-200 shadow-[0_10px_20px_rgba(37,99,235,0.1)] scale-105 z-10' : 'border-gray-100 shadow-sm hover:shadow-md'}`}>
                                            <div className="h-12 w-full flex items-center justify-center mb-3">
                                                <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                            </div>
                                            <span className="text-sm font-bold text-gray-600">{partner.name}</span>
                                            {partner.highlight && <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full">Bảo lãnh toàn diện</span>}
                                        </div>
                                    ))}
                                    {partners.length === 0 && (
                                        <div className="col-span-2 text-center py-10 bg-white rounded-lg border border-gray-100">
                                            <p className="text-gray-500 text-sm">Hiện tại chưa có đối tác bảo hiểm nào được công khai.</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6 flex items-start gap-4">
                            <i className="fi flaticon-info text-blue-500 text-xl"></i>
                            <p className="text-sm text-blue-900 leading-relaxed font-medium">Ngoài ra, đối với bệnh nhân sử dụng BHYT nhà nước, chúng tôi hỗ trợ xuất phiếu thu, bảng kê chi phí theo đúng quy định để thanh toán hoàn lại tại cơ quan bảo hiểm xã hội.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
