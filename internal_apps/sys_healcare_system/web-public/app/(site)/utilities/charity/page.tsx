"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';
import marketingService, { CharityCampaign } from '@/services/marketing.service';
import Spin from '@/components/ui/Spin';

export default function CharityPage() {
    const [campaigns, setCampaigns] = useState<CharityCampaign[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const data = await marketingService.getCharityCampaigns();
                setCampaigns(data);
            } catch (error) {
                console.error('Failed to fetch charity campaigns:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCampaigns();
    }, []);
    return (
        <div className="min-h-screen bg-rose-50/30 pb-24 font-sans selection:bg-rose-500 selection:text-white">

            {/* Emotional Storytelling Hero Section */}
            <div className="relative pt-24 pb-32 overflow-hidden bg-rose-900 border-b-8 border-rose-500">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-20 object-cover mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-900/80 to-rose-900/40"></div>
                
                {/* Glowing Aura Effect */}
                <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-rose-500/20 rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(244,63,94,0.6)] animate-pulse">
                        <i className="fi flaticon-like text-4xl text-white mt-1"></i>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                        Giọt Máu Cho Đi <br/>
                        <span className="text-rose-300">Cuộc Đời Ở Lại</span>
                    </h1>
                    
                    <p className="text-rose-100/90 text-xl max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
                        Khi mỗi cá nhân đóng góp một viên gạch nhỏ, chúng ta sẽ xây dựng được một tương lai rạng ngời cho những bệnh nhân có hoàn cảnh khó khăn.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-white text-rose-600 font-bold px-12 py-5 rounded-full text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all shadow-xl">
                            Quyên góp ngay <i className="fi flaticon-favorite-heart text-rose-500 ml-2 animate-bounce"></i>
                        </button>
                        <button className="bg-transparent border-2 border-rose-300 text-rose-100 font-bold px-12 py-5 rounded-full text-lg hover:bg-rose-800 transition-all">
                            Xem sao kê minh bạch
                        </button>
                    </div>
                </div>

                {/* Floating "Tấm lòng vàng" Donators Mockup */}
                <div className="absolute bottom-8 right-8 hidden xl:flex flex-col gap-3">
                    {[
                        { name: 'Anh Tuấn', amount: '5.000.000đ', time: 'Vừa xong' },
                        { name: 'Chị Mai Lan', amount: '200.000đ', time: '5 phút trước' }
                    ].map((donor, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-lg flex items-center gap-3 shadow-2xl animate-fade-in-up" style={{ animationDelay: `${idx * 0.5}s` }}>
                            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white"><i className="fi flaticon-user"></i></div>
                            <div>
                                <div className="text-white font-bold text-sm">{donor.name} vừa quyên góp <span className="text-yellow-300">{donor.amount}</span></div>
                                <div className="text-rose-200 text-xs">{donor.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Campaign Statistics Dashboard */}
            <div className="container mx-auto px-4 relative z-20 -mt-10 mb-20">
                <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 border border-rose-100 flex flex-col md:flex-row justify-around items-center text-center gap-8 divide-x-0 md:divide-x-2 divide-rose-50">
                    <div className="flex-1 w-full">
                        <div className="text-5xl font-black text-slate-800 mb-2">15.4<span className="text-2xl text-rose-500">+ Tỷ VNĐ</span></div>
                        <div className="text-slate-500 font-medium uppercase tracking-widest text-sm">Đã Quyên Góp</div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="text-5xl font-black text-slate-800 mb-2">48<span className="text-2xl text-rose-500">+ Ngàn</span></div>
                        <div className="text-slate-500 font-medium uppercase tracking-widest text-sm">Nhà Hảo Tâm</div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="text-5xl font-black text-slate-800 mb-2">320<span className="text-2xl text-rose-500">+ Ca</span></div>
                        <div className="text-slate-500 font-medium uppercase tracking-widest text-sm">Đã Được Sinh Ra Lần 2</div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Hoàn cảnh Cần giúp đỡ</h2>
                        <p className="text-slate-500">Mỗi chiến dịch đều được y bác sĩ bệnh viện xác minh trực tiếp.</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Spin size="large" tip="Đang tải chiến dịch..." />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {campaigns.map(camp => (
                            <div key={camp.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-rose-100 hover:shadow-[0_20px_40px_rgba(244,63,94,0.1)] transition-all duration-300 group flex flex-col">
                                
                                <div className="relative h-64 overflow-hidden">
                                    <img src={camp.image} alt={camp.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                                    
                                    {camp.urgent && (
                                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-pulse flex items-center gap-1">
                                            <i className="fi flaticon-siren"></i> Khẩn cấp
                                        </div>
                                    )}
                                    
                                    <div className="absolute bottom-4 left-6 right-6">
                                        <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-md">{camp.title}</h3>
                                    </div>
                                </div>
                                
                                <div className="p-8 flex flex-col flex-grow">
                                    <p className="text-slate-500 leading-relaxed text-sm mb-6 flex-grow line-clamp-3">{camp.description}</p>
                                    
                                    {camp.hospital && (
                                        <div className="text-xs text-rose-400 font-bold mb-4 flex items-center gap-1 uppercase">
                                            <i className="fi flaticon-hospital"></i> {camp.hospital}
                                        </div>
                                    )}
                                    
                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-base font-black mb-2">
                                            <span className="text-slate-800">{Number(camp.raised).toLocaleString('vi-VN')} đ</span>
                                            <span className="text-rose-500">{camp.percent}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-rose-100 rounded-full overflow-hidden">
                                            <div className={`h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-1000 relative`} style={{ width: `${camp.percent}%` }}>
                                                <div className="absolute top-0 right-0 w-4 h-full bg-white/40 skew-x-12 animate-[shimmer_2s_infinite]"></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight">
                                            <span>Mục tiêu: {Number(camp.goal).toLocaleString('vi-VN')} đ</span>
                                            <span className="flex items-center gap-1"><i className="fi flaticon-user"></i> {camp.donators} lượt quyên góp</span>
                                        </div>
                                    </div>
                                    
                                    <button className="w-full bg-rose-50 text-rose-600 font-black py-4 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2">
                                        Đóng Góp Ngay <i className="fi flaticon-like text-sm"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {campaigns.length === 0 && (
                            <div className="col-span-full text-center py-20 bg-white rounded-[2rem] border border-rose-100">
                                <p className="text-slate-500 text-lg">Hiện tại không có chiến dịch quyên góp nào.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Banner Khác */}
            <div className="container mx-auto px-4 mt-24">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px]"></div>
                    <div className="relative z-10 w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center text-rose-400 text-3xl mb-6 border border-white/20">
                        <i className="fi flaticon-briefcase"></i>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4 relative z-10">Bạn là Doanh nghiệp muốn đồng hành?</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto relative z-10">Chương trình CSR (Corporate Social Responsibility) Y tế bảo lãnh viện phí cung cấp giấy xác nhận, bằng khen và truyền thông doanh nghiệp chuyên nghiệp.</p>
                    <button className="bg-white text-slate-900 font-bold px-10 py-4 rounded-full hover:bg-rose-500 hover:text-white transition-colors relative z-10">Liên hệ Hợp tác Ban Cán sự</button>
                </div>
            </div>
        </div>
    );
}
