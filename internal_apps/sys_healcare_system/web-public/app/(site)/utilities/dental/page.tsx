"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

const SERVICES = [
    { name: 'Khám & Tư vấn Miễn phí', price: '0đ', desc: 'Kiểm tra tổng quát, chụp X-quang và lên phác đồ điều trị 1:1', icon: 'flaticon-tooth', tag: 'Cơ bản' },
    { name: 'Tẩy trắng răng Laser', price: '1.500.000đ', desc: 'Trắng lên 2-3 tone chỉ sau 45 phút, không ê buốt kéo dài', icon: 'flaticon-teeth-whitening', tag: 'Thẩm mỹ' },
    { name: 'Nhổ răng khôn Piezotome', price: 'Từ 800.000đ', desc: 'Nhổ răng sóng siêu âm không đau, phục hồi siêu nhanh', icon: 'flaticon-dental-care', tag: 'Điều trị' },
    { name: 'Niềng răng Invisalign', price: 'Từ 50.000.000đ', desc: 'Khay trong suốt chuẩn Hoa Kỳ, niềng như không niềng', icon: 'flaticon-braces', tag: 'Chuyên sâu' },
    { name: 'Cấy ghép Implant', price: 'Từ 15.000.000đ', desc: 'Chân răng Thụy Sĩ/Hàn Quốc tích hợp xương vĩnh viễn', icon: 'flaticon-tooth-1', tag: 'Chuyên sâu' },
    { name: 'Bọc răng sứ vi phẫu', price: 'Từ 3.000.000đ/răng', desc: 'Bảo tồn răng thật tối đa, độ bền màu lên đến 20 năm', icon: 'flaticon-dentist', tag: 'Thẩm mỹ' },
];

export default function DentalPage() {
    const [activeTag, setActiveTag] = useState<string>('Tất cả');
    const tags = ['Tất cả', 'Cơ bản', 'Thẩm mỹ', 'Điều trị', 'Chuyên sâu'];

    const filteredServices = activeTag === 'Tất cả' 
        ? SERVICES 
        : SERVICES.filter(s => s.tag === activeTag);

    return (
        <div className="min-h-screen bg-[#f1f8f9] pb-20 font-sans selection:bg-teal-500 selection:text-white">
            
            {/* Elegant Hero Section */}
            <div className="relative pt-24 pb-32 overflow-hidden bg-white">
                <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-cyan-50/50 to-transparent"></div>
                <div className="absolute -right-64 top-10 w-[800px] h-[800px] bg-teal-100/40 rounded-full blur-3xl opacity-60"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 rounded-full text-teal-600 font-bold text-sm shadow-sm md:mx-0 mx-auto">
                                <i className="fi flaticon-dental-care"></i> Trung tâm Nha khoa Quốc tế
                            </div>
                            
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-800 leading-[1.1] tracking-tight">
                                Nụ Cười Mới <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500 block mt-2">
                                    Cuộc Sống Mới
                                </span>
                            </h1>
                            
                            <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-lg md:mx-0 mx-auto">
                                Đội ngũ chuyên gia trên 10 năm kinh nghiệm cùng hệ thống trang thiết bị nhập khẩu 100% từ Châu Âu. Chúng tôi cam kết mang lại trải nghiệm nhẹ nhàng, chuẩn xác nhất.
                            </p>
                            
                            <div className="flex flex-wrap gap-4 pt-4 md:justify-start justify-center">
                                <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold px-10 py-5 rounded-full hover:shadow-[0_15px_30px_rgba(20,184,166,0.3)] transform hover:-translate-y-1 transition-all overflow-hidden relative group">
                                    <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                                    Đặt lịch Khám Miễn phí
                                </button>
                                <button className="bg-white border-2 border-slate-200 text-slate-700 font-bold px-10 py-5 rounded-full hover:border-teal-500 hover:text-teal-600 transition-all">
                                    Bảng giá chi tiết
                                </button>
                            </div>
                            
                            <div className="pt-10 flex gap-12 md:justify-start justify-center border-t border-slate-100">
                                <div>
                                    <div className="text-3xl font-black text-slate-800">15.000+</div>
                                    <div className="text-sm font-medium text-slate-500">Khách hàng <br/>thành công</div>
                                </div>
                                <div className="w-px h-12 bg-slate-200"></div>
                                <div>
                                    <div className="text-3xl font-black text-slate-800 flex items-center gap-1">5.0 <i className="fi flaticon-star text-amber-400 text-xl"></i></div>
                                    <div className="text-sm font-medium text-slate-500">Đánh giá <br/>hài lòng</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-full md:w-1/2 relative flex justify-center">
                            {/* Abstract Image Frame Frame */}
                            <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(20,184,166,0.15)] border-8 border-white group">
                                <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Beautiful smile" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 via-transparent to-transparent"></div>
                                
                                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-lg flex items-center gap-4 border border-white/50 shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                                        <i className="fi flaticon-like text-xl"></i>
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800 text-sm">"Cam kết KHÔNG ĐAU"</div>
                                        <div className="text-teal-600 text-xs font-semibold">Công nghệ sóng siêu âm</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Floating Stats */}
                            <div className="absolute top-20 -left-10 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-[bounce_4s_ease-in-out_infinite] hidden md:block">
                                <div className="flex items-center gap-3">
                                    <img src="/img/icon/shield.png" alt="shield" className="w-8 h-8 opacity-50" onError={(e) => e.currentTarget.style.display = 'none'} />
                                    <div>
                                        <div className="font-black text-slate-800">Bảo hành 20 năm</div>
                                        <div className="text-xs text-slate-500">Răng sứ thẩm mỹ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="container mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-2">Bảng Giá Vinh Danh</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">Dịch Vụ Nổi Bật</h3>
                    
                    {/* Tag Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {tags.map(tag => (
                            <button 
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                                    activeTag === tag 
                                    ? 'bg-slate-800 text-white shadow-md transform scale-105' 
                                    : 'bg-white text-slate-500 border border-slate-200 hover:border-teal-300 hover:text-teal-600'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((s, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(20,184,166,0.1)] border border-slate-100 hover:border-teal-100 transition-all duration-300 group flex flex-col relative overflow-hidden">
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 bg-teal-50 rounded-lg flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300 shadow-inner">
                                    <i className={`fi ${s.icon} text-3xl text-teal-500 group-hover:text-white transition-colors`}></i>
                                </div>
                                <span className="bg-slate-50 text-slate-500 text-xs font-bold px-3 py-1 rounded-full border border-slate-100">
                                    {s.tag}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-colors">{s.name}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{s.desc}</p>
                            
                            <div className="flex items-center justify-between border-t border-slate-50 pt-6 mt-auto">
                                <div className="text-2xl font-black text-teal-600">{s.price}</div>
                                <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-colors">
                                    <i className="fi flaticon-right-arrow text-sm"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Testimonial / Story Section */}
            <div className="bg-white py-24 border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                        {/* Decorative BG */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                        
                        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                            <div className="w-full md:w-1/2 space-y-6">
                                <i className="fi flaticon-quote text-5xl text-teal-500/30"></i>
                                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    "Tôi đã tự tin cười rạng rỡ trở lại sau hành trình bọc răng sứ 2 ngày tại đây."
                                </h3>
                                <p className="text-slate-300 text-lg">
                                    Từ một người khép kín vì hàm răng khấp khểnh xỉn màu, kỹ thuật bọc sứ sinh học đã tái sinh tôi hoàn toàn. Cảm ơn đội ngũ y bác sĩ rất nhiều vì sự tỉ mỉ và chuyên nghiệp!
                                </p>
                                <div className="pt-4 flex items-center gap-4">
                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Customer" className="w-14 h-14 rounded-full border-2 border-teal-500 object-cover" />
                                    <div>
                                        <div className="font-bold text-white">Chị Diệu Nhi</div>
                                        <div className="text-teal-400 text-sm">Doanh nhân / Làm Răng sứ Cercon</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="relative rounded-lg overflow-hidden border-4 border-slate-800 shadow-[0_0_50px_rgba(20,184,166,0.2)]">
                                    <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Clinic Interior" className="w-full aspect-video object-cover opacity-90" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50 hover:bg-white hover:text-teal-600 hover:scale-110 transition-all duration-300 shadow-xl">
                                            <i className="fi flaticon-play-button ml-1 text-2xl"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
