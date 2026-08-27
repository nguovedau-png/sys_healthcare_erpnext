"use client";

import React, { useState, useEffect } from 'react';
import Banner from '@/components/common/Banner';

const DISEASES = [
    { letter: 'A', items: ['Alzheimer', 'Astma (Hen suyễn)', 'Anemia (Thiếu máu)', 'Apnea (Ngưng thở khi ngủ)', 'Autism (Tự kỷ)', 'Arthritis (Viêm khớp)'] },
    { letter: 'B', items: ['Bệnh tim mạch', 'Bệnh tiểu đường', 'Bệnh Parkinson', 'Bại liệt', 'Bạch hầu', 'Bệnh gút', 'Bệnh trĩ'] },
    { letter: 'C', items: ['COVID-19', 'Cúm', 'Cao huyết áp', 'Cataract (Đục thủy tinh thể)', 'Celiac disease (Bệnh Celiac)', 'Cholera (Bệnh tả)', 'Crohn'] },
    { letter: 'D', items: ['Đau đầu Migraine', 'Dị ứng', 'Đột quỵ', 'Đau ruột thừa', 'Đục thủy tinh thể', 'Đau mắt đỏ', 'Đa xơ cứng', 'Động kinh'] },
    { letter: 'E', items: ['Ebola', 'Emphysema (Khí phế thũng)', 'Endometriosis (Lạc nội mạc tử cung)'] },
    { letter: 'G', items: ['Gai cột sống', 'Gout', 'Giang mai', 'Glaucoma (Cườm nước)'] },
    { letter: 'H', items: ['HIV/AIDS', 'Huyết áp thấp', 'Hemophilia (Máu khó đông)', 'Hepatitis (Viêm gan)', 'Herpes', 'Hô hấp nhân tạo'] },
    { letter: 'K', items: ['Khối u', 'Kiết lỵ', 'Kawasaki (Bệnh Kawasaki)'] },
    { letter: 'L', items: ['Lupus ban đỏ', 'Lao', 'Lậu', 'Liệt dây thần kinh số 7', 'Loãng xương'] },
    { letter: 'M', items: ['Meningitis (Viêm màng não)', 'Malaria (Sốt rét)', 'Máu nhiễm mỡ', 'Mề đay', 'Mộng tinh', 'Mụn rộp'] },
    { letter: 'N', items: ['Nhồi máu cơ tim', 'Nhiễm trùng máu', 'Nấm da', 'Não úng thủy'] },
    { letter: 'O', items: ['Osteoporosis (Loãng xương)', 'Osteoarthritis (Viêm xương khớp)', 'Obesity (Béo phì)'] },
    { letter: 'P', items: ['Pneumonia (Viêm phổi)', 'Polio (Bại liệt)', 'Psoriasis (Vảy nến)', 'Phình động mạch', 'Phong thấp', 'Phù thũng'] },
    { letter: 'R', items: ['Rabies (Dại)', 'Rubella', 'Rối loạn tiền đình', 'Rối loạn lo âu', 'Rối loạn cương dương'] },
    { letter: 'S', items: ['Sởi', 'Sốt rết', 'Sốt xuất huyết', 'Syphilis (Giang mai)', 'Sỏi thận', 'Suy gan', 'Suy tim', 'Suy thận'] },
    { letter: 'T', items: ['Tuberculosis (Lao)', 'Thyroid (Tuyến giáp)', 'Tetatus (Uốn ván)', 'Tự kỷ', 'Thoát vị đĩa đệm', 'Thiếu máu não', 'Trĩ'] },
    { letter: 'U', items: ['Ung thư dạ dày', 'Ung thư vú', 'Ung thư phổi', 'Ung thư cổ tử cung', 'Ung thư gan', 'Ung thư đại tràng'] },
    { letter: 'V', items: ['Viêm dạ dày', 'Viêm gan B', 'Viêm gan C', 'Viêm khớp dạ thấp', 'Viêm xoang', 'Viêm màng não', 'Viêm ruột thừa'] },
    { letter: 'X', items: ['Xơ gan', 'Xơ vữa động mạch', 'Xuất huyết dạ dày'] },
    { letter: 'Y', items: ['Yếu sinh lý'] },
];

export default function DiseasesPage() {
    const [search, setSearch] = useState('');
    const [activeLetter, setActiveLetter] = useState('A');

    // Filter diseases based on search
    const filteredDiseases = DISEASES.map(group => ({
        ...group,
        items: group.items.filter(item => item.toLowerCase().includes(search.toLowerCase()))
    })).filter(group => group.items.length > 0);

    // Scroll spy logic
    useEffect(() => {
        const handleScroll = () => {
            const letterSections = document.querySelectorAll('.disease-section');
            let current = 'A';
            
            letterSections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id')?.split('-')[1] || 'A';
                }
            });
            
            if (current !== activeLetter) {
                setActiveLetter(current);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeLetter]);

    const scrollToLetter = (e: React.MouseEvent, letter: string) => {
        e.preventDefault();
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans">
            {/* Elegant Encylopedia Hero */}
            <div className="relative overflow-hidden bg-white border-b border-gray-100">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
                <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-6 border border-blue-100">
                            <i className="fi flaticon-book"></i> Từ điển Y khoa
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Tra cứu Bệnh lý <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">A-Z</span>
                        </h1>
                        <p className="text-gray-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            Cơ sở dữ liệu y khoa chuẩn xác, được xác thực bởi các chuyên gia y tế hàng đầu. Tìm hiểu nguồn gốc, triệu chứng và cách điều trị.
                        </p>

                        {/* Premium Search Bar */}
                        <div className="relative max-w-3xl mx-auto group">
                            <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <div className="relative flex items-center bg-white rounded-lg border-2 border-transparent focus-within:border-blue-500 shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden transition-all">
                                <span className="pl-6 text-gray-400">
                                    <i className="fi flaticon-search text-xl"></i>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Có phải bạn đang tìm chứng Đau đầu, Sốt, hoặc Tiểu đường?"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full py-5 px-4 outline-none text-gray-700 text-lg font-medium bg-transparent"
                                />
                                {search && (
                                    <button onClick={() => setSearch('')} className="pr-6 text-gray-400 hover:text-red-500 transition-colors">
                                        <i className="fi flaticon-cancel"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
                    
                    {/* Sticky Alphabet Sidebar (Desktop) */}
                    <div className="hidden lg:block w-20 sticky top-28 bottom-10 self-start z-10 flex-shrink-0">
                        <div className="bg-white rounded-full py-6 flex flex-col items-center gap-1 shadow-lg border border-gray-100">
                            {DISEASES.map(group => {
                                const isActive = activeLetter === group.letter;
                                const hasResults = filteredDiseases.some(g => g.letter === group.letter);
                                
                                if (!hasResults && search) return null;
                                
                                return (
                                    <a
                                        key={group.letter}
                                        href={`#letter-${group.letter}`}
                                        onClick={(e) => scrollToLetter(e, group.letter)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300 ${
                                            isActive 
                                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md transform scale-110' 
                                            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                                        }`}
                                    >
                                        {group.letter}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 w-full relative">
                        {filteredDiseases.length === 0 ? (
                            <div className="bg-white rounded-lg p-16 text-center shadow-sm border border-gray-100">
                                <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-full mx-auto mb-6">
                                    <i className="fi flaticon-search text-4xl text-gray-400"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy bệnh lý nào</h3>
                                <p className="text-gray-500">Từ khóa "{search}" chưa trùng khớp với từ điển y khoa hiện tại. Vui lòng thử từ khóa khác.</p>
                                <button onClick={() => setSearch('')} className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-colors">
                                    Xóa tìm kiếm
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                {filteredDiseases.map(group => (
                                    <div key={group.letter} id={`letter-${group.letter}`} className="disease-section scroll-mt-28 relative">
                                        
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 text-blue-600 rounded-lg flex items-center justify-center text-3xl font-black shadow-sm transform -rotate-3 hover:rotate-0 transition-transform">
                                                {group.letter}
                                            </div>
                                            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
                                        </div>
                                        
                                        {/* Masonry-like grid for varying content sizes */}
                                        <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-4">
                                            {group.items.map((disease, idx) => {
                                                // Extract text in parentheses if any for better UI
                                                const hasSubtext = disease.includes('(') && disease.includes(')');
                                                let mainText = disease;
                                                let subText = '';
                                                
                                                if (hasSubtext) {
                                                    const match = disease.match(/(.*?)\s*\((.*?)\)/);
                                                    if (match) {
                                                        mainText = match[1];
                                                        subText = match[2];
                                                    }
                                                }

                                                return (
                                                    <a key={idx} href="#" className="break-inside-avoid flex items-center justify-between p-5 bg-white border border-gray-100 rounded-lg hover:border-blue-300 hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300 group">
                                                        <div>
                                                            <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors text-[1.05rem]">
                                                                {mainText}
                                                            </div>
                                                            {subText && (
                                                                <div className="text-sm font-medium text-gray-400 mt-1">
                                                                    {subText}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-4">
                                                            <i className="fi flaticon-right-arrow text-xs"></i>
                                                        </div>
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            
            {/* Disclaimer Footer */}
            <div className="container mx-auto px-4 mt-8">
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-6 flex gap-4 items-start max-w-4xl mx-auto shadow-sm">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0">
                        <i className="fi flaticon-info text-xl"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-orange-900 mb-1">Cảnh báo Y tế</h4>
                        <p className="text-orange-800 text-sm leading-relaxed">
                            Thông tin trên từ điển này chỉ mang tính chất tham khảo. Bạn không được tự ý dùng nó để tự chẩn đoán bệnh hay thay thế cho các chỉ định lâm sàng của chuyên gia y tế. Xin vui lòng <strong>liên hệ trực tiếp</strong> với bác sĩ khi có bất kỳ dấu hiệu bệnh lý nào.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
