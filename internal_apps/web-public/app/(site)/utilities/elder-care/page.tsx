"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';
import { contentService, ElderService } from '@/services/content.service';
import Spin from '@/components/ui/Spin';

export default function ElderCarePage() {
    const [services, setServices] = useState<ElderService[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await contentService.getElderServices();
                setServices(data);
            } catch (error) {
                console.error('Failed to fetch elder services:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchServices();
    }, []);
    return (
        <div className="min-h-screen bg-[#fcf9f2] pb-24 font-sans selection:bg-emerald-600 selection:text-white text-lg">
            {/* Accessibility Optimized: High contrast, larger default text size, warm cream background to reduce eye strain */}

            {/* Compassionate Hero Section */}
            <div className="relative pt-20 pb-32 overflow-hidden bg-white border-b-2 border-[#e8efe6]">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50/80 to-transparent"></div>
                <div className="absolute -bottom-20 left-0 w-full h-[600px] bg-[#f2f6f1] rounded-[100%] rounded-b-none pointer-events-none transform scale-x-150 origin-bottom"></div>
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="w-full lg:w-1/2 space-y-8">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#edf4ea] text-emerald-800 font-bold tracking-wide border border-emerald-100">
                                <i className="fi flaticon-heart-rate text-xl text-emerald-600"></i>
                                Tận Tâm & Thấu Hiểu
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2d4a3e] leading-tight tracking-tight">
                                Chăm sóc Sức khỏe <br/>
                                <span className="text-emerald-600">Người Cao Tuổi</span>
                            </h1>
                            
                            {/* Larger text for readability */}
                            <p className="text-[#4a5e55] text-xl md:text-2xl leading-relaxed font-medium max-w-xl">
                                Dịch vụ Y tế dưỡng lão toàn diện giúp cha mẹ an hưởng tuổi già ngay tại ngôi nhà thân thuộc, mang lại sự an tâm tuyệt đối cho con cái.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-5 pt-6">
                                <button className="bg-emerald-600 text-white font-bold text-xl px-10 py-5 rounded-lg hover:bg-emerald-700 shadow-[0_15px_30px_rgba(5,150,105,0.2)] hover:shadow-[0_20px_40px_rgba(5,150,105,0.3)] transition-all transform hover:-translate-y-1">
                                    Tìm Điều Dưỡng Ngay
                                </button>
                                <button className="bg-white border-2 border-[#cce0d6] text-[#2d4a3e] font-bold text-xl px-10 py-5 rounded-lg hover:bg-[#f2f6f1] hover:border-emerald-600 transition-all flex items-center justify-center gap-3">
                                    <i className="fi flaticon-phone-call"></i> Gọi Tư Vấn: 1900 1234
                                </button>
                            </div>
                        </div>
                        
                        <div className="w-full lg:w-1/2 relative">
                            {/* Emotional & Compassionate Hero Image Group */}
                            <div className="relative w-full max-w-lg mx-auto aspect-square">
                                <div className="absolute inset-0 bg-[#e3efe7] rounded-[3rem] transform rotate-3 scale-105"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1576766125535-b04e15fd0273?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                    alt="Elderly care" 
                                    className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-xl"
                                />
                                
                                {/* Floating Trust Card */}
                                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-2xl border border-[#edf4ea] flex items-center gap-5 max-w-xs animate-[bounce_5s_ease-in-out_infinite]">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                        <i className="fi flaticon-medal text-3xl"></i>
                                    </div>
                                    <div>
                                        <div className="font-black text-2xl text-[#2d4a3e]">10+ Năm</div>
                                        <div className="text-[#4a5e55] font-medium text-lg leading-tight">Tuyển chọn y tá kinh nghiệm</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-24">
                
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-[#2d4a3e] mb-6">Dịch vụ tại nhà <br/> Chuẩn Y khoa Bệnh viện</h2>
                    <p className="text-[#4a5e55] text-xl">Không cần di chuyển mệt mỏi, chúng tôi mang cả hệ thống chăm sóc cao cấp đến phòng ngủ của cha mẹ bạn.</p>
                </div>

                {/* Services Section with high contrast, clear readability */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Spin size="large" tip="Đang tải dịch vụ..." />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden shadow-md shadow-[#e8efe6] hover:shadow-2xl hover:shadow-[#cce0d6] transition-all duration-500 border border-[#f2f6f1] group flex flex-col">
                                <div className="relative h-64 overflow-hidden">
                                    <img src={service.image || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2d4a3e]/80 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/50 shadow-lg">
                                        <i className={`fi ${service.icon} text-3xl text-white`}></i>
                                    </div>
                                </div>
                                <div className="p-8 md:p-10 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-black text-[#2d4a3e] mb-4 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{service.title}</h3>
                                    <p className="text-[#4a5e55] text-lg leading-relaxed flex-grow">{service.description}</p>
                                    
                                    {service.price && (
                                        <div className="mt-4 mb-4 font-bold text-emerald-600 text-xl">{service.price}</div>
                                    )}

                                    <button className="mt-4 w-full bg-[#f2f6f1] text-[#2d4a3e] hover:bg-emerald-600 hover:text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-sm">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                        {services.length === 0 && (
                            <div className="col-span-full text-center py-20 bg-white rounded-[2.5rem] border border-[#f2f6f1]">
                                <p className="text-[#4a5e55] text-xl font-medium">Hiện tại chưa có dịch vụ chăm sóc người già nào được công khai.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Process for Elders */}
                <div className="mt-32 bg-[#2d4a3e] rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden text-center text-white shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full point-events-none"></div>

                    <h2 className="text-3xl md:text-5xl font-black mb-16 relative z-10">Kết nối Dễ dàng cho Người Thân</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {[
                            { step: '1', title: 'Chọn Y tá/Điều dưỡng', icon: 'flaticon-search', desc: 'Xem hồ sơ lý lịch rõ ràng' },
                            { step: '2', title: 'Đặt lịch Hẹn', icon: 'flaticon-calendar', desc: 'Chọn ngày giờ linh hoạt' },
                            { step: '3', title: 'Khảo sát Tại nhà', icon: 'flaticon-home', desc: 'Bác sĩ đến tận nơi khám sơ bộ' },
                            { step: '4', title: 'An tâm Làm việc', icon: 'flaticon-target', desc: 'Nhận báo cáo sức khỏe hàng ngày' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-emerald-300 text-4xl mb-6 relative border border-white/20">
                                    <i className={`fi ${item.icon}`}></i>
                                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-lg border-2 border-[#2d4a3e]">
                                        {item.step}
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                <p className="text-emerald-100/70 text-base">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
