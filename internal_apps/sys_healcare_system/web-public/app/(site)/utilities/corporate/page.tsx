"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';

const PACKAGES = [
    { 
        name: 'Essential Care', 
        employees: 'Doanh nghiệp < 50 NV', 
        price: '5.000.000', 
        unit: 'đ/năm',
        desc: 'Gói chăm sóc cơ bản đáp ứng đầy đủ yêu cầu y tế doanh nghiệp theo quy định nhà nước.',
        isPopular: false,
        features: ['Khám sức khỏe định kỳ 1 lần/năm', '20 Danh mục xét nghiệm cơ bản', 'Đánh giá nguy cơ sức khỏe tổng quát', 'Lập hồ sơ y tế điện tử cho mỗi NV', 'Tư vấn sức khỏe trực tuyến 24/7'] 
    },
    { 
        name: 'Premium Shield', 
        employees: 'Doanh nghiệp 50-200 NV', 
        price: '15.000.000', 
        unit: 'đ/năm',
        desc: 'Giải pháp bảo vệ toàn diện với các danh mục nâng cao, giúp phát hiện sớm bệnh lý nghề nghiệp.',
        isPopular: true,
        features: ['Khám y tế định kỳ 2 lần/năm', 'Khám lâm sàng đa khoa (Mắt, TMH, RHM...)', 'Tầm soát ung thư cơ bản (Nam/Nữ)', 'Siêu âm ổ bụng & X-quang tim phổi', 'Tổ chức tiêm phòng cúm tại văn phòng', 'Bác sĩ chuyên khoa hỗ trợ tư vấn dinh dưỡng'] 
    },
    { 
        name: 'Enterprise VIP', 
        employees: 'Doanh nghiệp > 200 NV', 
        price: 'Tùy chỉnh', 
        unit: '',
        desc: 'Xây dựng thiết kế chuyên biệt theo từng đặc thù ngành nghề của Tập đoàn.',
        isPopular: false,
        features: ['Khám sức khỏe theo yêu cầu đặc thù', 'Tầm soát chuyên sâu toàn thân', 'Khám bệnh VIP không chờ đợi', 'Hệ thống báo cáo dịch tễ nôi bộ', 'Bác sĩ gia đình chăm sóc lãnh đạo', 'Ưu tiên khẩn cấp cấp cứu 24/7 (3 phút)'] 
    },
];

export default function CorporatePage() {
    const [annual, setAnnual] = useState(true);

    return (
        <div className="min-h-screen bg-[#fafafa] pb-20 font-sans">
            
            {/* Enterprise Hero Section */}
            <div className="relative pt-24 pb-40 overflow-hidden bg-[#0a0f2c]">
                {/* Premium Abstract Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0f2c] via-[#1a1c4b] to-[#120c3a]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/20 mix-blend-screen blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 mix-blend-screen blur-[100px] rounded-full"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 font-bold text-xs uppercase tracking-widest mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> B2B Health Solutions
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Đầu tư vào Sức khỏe <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
                            Sinh lời vào Hiệu suất
                        </span>
                    </h1>
                    
                    <p className="text-[#a0a8c2] text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
                        Chương trình chăm sóc sức khỏe doanh nghiệp toàn diện, thiết kế riêng biệt giúp gia tăng gắn kết nhân sự, giảm tỷ lệ nghỉ ốm và tối ưu hóa chi phí phúc lợi.
                    </p>

                    <div className="flex justify-center items-center gap-8 text-white/50 mb-10 overflow-hidden filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {/* Mock Logos */}
                        <div className="text-2xl font-black font-serif italic">TechCorp</div>
                        <div className="text-2xl font-black uppercase tracking-wider">ApexGlobal</div>
                        <div className="text-2xl font-black tracking-tighter">Infinia</div>
                        <div className="text-2xl font-black uppercase">NexusViet</div>
                    </div>
                </div>
                
                {/* Curve Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                    <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#fafafa"></path>
                    </svg>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="container mx-auto px-4 relative z-20 pb-24">
                
                {/* Billing Toggle */}
                <div className="flex justify-center mb-16 relative -mt-32">
                    <div className="bg-[#1a1c4b] backdrop-blur-md border border-white/10 p-1.5 rounded-full inline-flex relative shadow-2xl">
                        <div 
                            className={`absolute inset-y-1.5 w-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-transform duration-300 shadow-[0_0_15px_rgba(251,191,36,0.4)] ${annual ? 'translate-x-0' : 'translate-x-[calc(100%-12px)]'}`}
                            style={{ width: 'calc(50% - 3px)' }}
                        ></div>
                        <button 
                            onClick={() => setAnnual(true)} 
                            className={`relative z-10 px-8 py-2.5 text-sm font-bold rounded-full transition-colors ${annual ? 'text-[#0a0f2c]' : 'text-white/70 hover:text-white'}`}
                        >
                            Thanh toán Năm
                        </button>
                        <button 
                            onClick={() => setAnnual(false)} 
                            className={`relative z-10 px-8 py-2.5 text-sm font-bold rounded-full transition-colors flex items-center gap-2 ${!annual ? 'text-[#0a0f2c]' : 'text-white/70 hover:text-white'}`}
                        >
                            Thanh toán Tháng <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">-20%</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-7xl mx-auto">
                    {PACKAGES.map((pkg, idx) => (
                        <div 
                            key={idx} 
                            className={`relative flex-1 w-full bg-white rounded-[2rem] transition-all duration-500 ${
                                pkg.isPopular 
                                ? 'shadow-[0_20px_60px_rgba(0,0,0,0.1)] lg:scale-105 border-2 border-amber-400 z-10' 
                                : 'shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-0'
                            }`}
                        >
                            {/* Popular Badge */}
                            {pkg.isPopular && (
                                <div className="absolute -top-5 inset-x-0 flex justify-center">
                                    <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-[#0a0f2c] text-xs font-black uppercase tracking-widest py-2 px-6 rounded-full shadow-lg">
                                        Đề xuất & Bán chạy nhất
                                    </span>
                                </div>
                            )}

                            <div className={`p-10 ${pkg.isPopular ? 'pt-12' : ''}`}>
                                <div className="text-sm font-bold tracking-widest text-[#a0a8c2] uppercase mb-2">{pkg.employees}</div>
                                <h3 className={`text-3xl font-extrabold mb-4 ${pkg.isPopular ? 'text-[#0a0f2c]' : 'text-gray-900'}`}>{pkg.name}</h3>
                                
                                <div className="flex items-end gap-1 mb-6">
                                    {pkg.unit ? (
                                        <>
                                            <span className={`text-4xl lg:text-5xl font-black tracking-tighter ${pkg.isPopular ? 'text-amber-500' : 'text-gray-900'}`}>
                                                {!annual ? Math.round(parseInt(pkg.price.replace(/\./g, '')) / 12 * 1.2).toLocaleString('vi-VN') : pkg.price}
                                            </span>
                                            <span className="text-gray-500 font-medium mb-1 font-sans">{!annual ? 'đ/tháng' : pkg.unit}</span>
                                        </>
                                    ) : (
                                        <span className={`text-4xl lg:text-5xl font-black tracking-tighter ${pkg.isPopular ? 'text-amber-500' : 'text-gray-900'}`}>
                                            {pkg.price}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-500 leading-relaxed text-sm mb-8">{pkg.desc}</p>
                                
                                <button className={`w-full py-4 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                                    pkg.isPopular 
                                    ? 'bg-[#0a0f2c] text-white hover:bg-amber-400 hover:text-[#0a0f2c] hover:shadow-lg' 
                                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white'
                                }`}>
                                    Đăng ký Hợp đồng <i className="fi flaticon-right-arrow text-xs"></i>
                                </button>
                            </div>

                            <div className="bg-slate-50/50 p-10 border-t border-gray-100 rounded-b-[2rem]">
                                <div className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Bao gồm các dịch vụ:</div>
                                <ul className="space-y-4">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-4 text-gray-700">
                                            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${pkg.isPopular ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                                <i className="fi flaticon-check text-[10px] font-bold"></i>
                                            </div>
                                            <span className="text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Trust Footer */}
            <div className="container mx-auto px-4 mt-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between p-8 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center gap-6 mb-6 md:mb-0">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl shrink-0">
                            <i className="fi flaticon-user"></i>
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-xl">Bạn cần gói quy mô lớn hơn?</div>
                            <div className="text-gray-500">Giám đốc Y tế của chúng tôi sẽ tư vấn trực tiếp kịch bản.</div>
                        </div>
                    </div>
                    <button className="bg-white border-2 border-[#0a0f2c] text-[#0a0f2c] px-8 py-3 rounded-full font-bold hover:bg-[#0a0f2c] hover:text-white transition-colors shrink-0">
                        Lên lịch Gọi
                    </button>
                </div>
            </div>
        </div>
    );
}
