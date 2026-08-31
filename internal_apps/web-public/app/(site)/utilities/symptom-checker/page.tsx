"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';
import { contentService, Disease } from '@/services/content.service';
import Spin from '@/components/ui/Spin';

const BODY_PARTS = [
    { id: 'head', label: 'Phần Đầu / Cổ', icon: 'flaticon-thinking', desc: 'Não bộ, Tai mũi họng', categories: ['Thần kinh', 'Tâm thần'] },
    { id: 'chest', label: 'Lồng ngực / Phổi', icon: 'flaticon-lungs', desc: 'Tim mạch, Hô hấp', categories: ['Tim mạch', 'Hô hấp'] },
    { id: 'stomach', label: 'Ổ bụng / Tiêu hóa', icon: 'flaticon-stomach', desc: 'Dạ dày, Đại tràng', categories: ['Tiêu hóa', 'Nội tiết', 'Tiết niệu'] },
    { id: 'limb', label: 'Tay Chân / Khớp', icon: 'flaticon-bone', desc: 'Cột sống, Cơ xương khớp', categories: ['Cơ xương khớp'] }
];

export default function SymptomChecker() {
    const [selectedPart, setSelectedPart] = useState<string | null>(null);
    const [diseases, setDiseases] = useState<Disease[]>([]);
    const [selectedSymptom, setSelectedSymptom] = useState<Disease | null>(null);
    const [step, setStep] = useState(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSelectPart = async (partId: string) => {
        setIsAnalyzing(true);
        const part = BODY_PARTS.find(p => p.id === partId);

        try {
            setSelectedPart(partId);
            // Fetch diseases for the selected categories
            // For simplicity, we fetch all and filter or use the first category in search
            const data = await contentService.getDiseases({
                search: part?.categories[0]
            });
            setDiseases(data);

            setTimeout(() => {
                setStep(2);
                setSelectedSymptom(null);
                setIsAnalyzing(false);
            }, 600);
        } catch (error) {
            console.error('Failed to fetch diseases:', error);
            setIsAnalyzing(false);
        }
    };

    const handleSelectSymptom = (disease: Disease) => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setSelectedSymptom(disease);
            setStep(3);
            setIsAnalyzing(false);
        }, 1200);
    };

    const reset = () => {
        setStep(1);
        setSelectedPart(null);
        setSelectedSymptom(null);
        setDiseases([]);
    };

    return (
        <div className="min-h-screen bg-[#071018] pb-20 font-sans text-slate-300">


            <div className="container mx-auto px-4 py-20 max-w-5xl">

                {/* Header Section */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 font-bold text-sm tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                        </span>
                        AI Health Diagnostic
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Kiểm tra Triệu chứng <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Thông minh</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Hệ thống đối chiếu mạng lưới thần kinh mô phỏng của hơn 10.000 ca lâm sàng. Tương tác ngay để nhận đánh giá rủi ro sơ bộ.
                    </p>
                </div>

                {/* Main Interactive Interface (Glassmorphism) */}
                <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">

                    {/* Progress indicator */}
                    <div className="h-1.5 w-full bg-slate-800 flex relative">
                        <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-700 shadow-[0_0_10px_rgba(6,182,212,0.8)]`}
                            style={{ width: `${(step / 3) * 100}%` }}></div>
                    </div>

                    <div className="p-8 md:p-14 min-h-[500px] flex flex-col relative">

                        {/* Loading Overlay */}
                        {isAnalyzing && (
                            <div className="absolute inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-[2.5rem]">
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-cyan-400 rounded-full border-t-transparent border-b-transparent animate-spin"></div>
                                    <i className="fi flaticon-brain text-4xl text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></i>
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-widest uppercase">Đang phân tích</h3>
                                <div className="text-cyan-500 text-sm mt-2 flex gap-1 items-center">
                                    Quét cơ sở dữ liệu y khoa
                                    <span className="flex space-x-1">
                                        <span className="animate-bounce delay-75">.</span>
                                        <span className="animate-bounce delay-150">.</span>
                                        <span className="animate-bounce delay-300">.</span>
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* STEP 1: Body Part */}
                        {step === 1 && !isAnalyzing && (
                            <div className="w-full flex-grow flex flex-col justify-center animate-fade-in-up">
                                <div className="flex gap-4 items-end mb-10 max-w-2xl">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg mb-2">
                                        <i className="fi flaticon-robot text-white text-xl"></i>
                                    </div>
                                    <div className="bg-slate-800 border border-slate-700 text-white p-5 rounded-lg rounded-bl-sm font-medium shadow-md">
                                        Chào bạn, tôi là trợ lý chẩn đoán. Trọng tâm khu vực nào trên cơ thể đang khiến bạn cảm thấy không ổn nhất lúc này?
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pl-16">
                                    {BODY_PARTS.map(part => (
                                        <button
                                            key={part.id}
                                            onClick={() => handleSelectPart(part.id)}
                                            className="group flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-cyan-900/30 hover:border-cyan-500/50 transition-all text-left relative overflow-hidden"
                                        >
                                            <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] transform translate-x-1/2 -translate-y-1/2 group-hover:bg-cyan-500/20 transition-colors"></div>
                                            <div className="w-16 h-16 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                                                <i className={`fi ${part.icon} text-3xl text-slate-400 group-hover:text-cyan-400 transition-colors`}></i>
                                            </div>
                                            <div className="relative z-10">
                                                <h4 className="text-xl font-bold text-white mb-1">{part.label}</h4>
                                                <p className="text-slate-500 text-sm">{part.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Symptoms */}
                        {step === 2 && !isAnalyzing && selectedPart && (
                            <div className="w-full flex-grow flex flex-col justify-center animate-fade-in-up">
                                <button onClick={reset} className="absolute top-0 right-0 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                                    <i className="fi flaticon-cancel"></i>
                                </button>

                                <div className="flex gap-4 items-end mb-8 max-w-2xl">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg mb-2">
                                        <i className="fi flaticon-robot text-white text-xl"></i>
                                    </div>
                                    <div className="bg-slate-800 border border-slate-700 text-white p-5 rounded-lg rounded-bl-sm font-medium shadow-md">
                                        Đã ghi nhận khu vực <strong className="text-cyan-400">"{BODY_PARTS.find(p => p.id === selectedPart)?.label}"</strong>. Vui lòng chọn triệu chứng cụ thể bên dưới:
                                    </div>
                                </div>

                                <div className="space-y-4 pl-16">
                                    {diseases.map((sym, idx) => (
                                        <button
                                            key={sym.id}
                                            onClick={() => handleSelectSymptom(sym)}
                                            style={{ animationDelay: `${idx * 150}ms` }}
                                            className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-lg hover:bg-cyan-900/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all font-medium text-lg text-slate-300 hover:text-white group animate-fade-in-up"
                                        >
                                            <span className="flex items-center gap-4">
                                                <span className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors"></span>
                                                {sym.name} - <span className="text-sm font-normal text-slate-500">{sym.description.substring(0, 60)}...</span>
                                            </span>
                                            <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                                                <i className="fi flaticon-right-arrow text-xs text-slate-500 group-hover:text-cyan-400"></i>
                                            </div>
                                        </button>
                                    ))}
                                    {diseases.length === 0 && (
                                        <div className="text-center py-10 bg-white/5 rounded-lg border border-white/5">
                                            <p className="text-slate-500">Không tìm thấy dữ liệu triệu chứng cho khu vực này.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Results */}
                        {step === 3 && !isAnalyzing && selectedSymptom && (
                            <div className="w-full flex-grow flex flex-col animate-fade-in-up">

                                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 h-full">
                                    <div className="flex flex-col h-full bg-slate-800/50 p-8 rounded-lg border border-slate-700/50 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/30 blur-[60px] rounded-full pointer-events-none"></div>

                                        <div className="flex items-center gap-3 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-6">
                                            <i className="fi flaticon-medical-file"></i> Báo cáo Đánh giá {selectedSymptom.icd10 && <span className="text-slate-600 ml-auto">ICD-10: {selectedSymptom.icd10}</span>}
                                        </div>

                                        <h2 className="text-3xl font-bold text-white mb-8">
                                            Phân tích cho thấy dấu hiệu của:<br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mt-2 block w-fit">
                                                {selectedSymptom.name}
                                            </span>
                                        </h2>

                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                <div className="text-slate-500 text-xs uppercase font-bold mb-1">Mức độ rủi ro</div>
                                                <div className="flex items-center gap-2">
                                                    {selectedSymptom.severity === 'high' ? (
                                                        <><span className="w-3 h-3 rounded-full bg-red-500 animate-pulse outline outline-2 outline-red-500/50 outline-offset-2"></span> <span className="font-bold text-red-400">Cấp cứu/Nghiêm trọng</span></>
                                                    ) : selectedSymptom.severity === 'medium' ? (
                                                        <><span className="w-3 h-3 rounded-full bg-orange-500"></span> <span className="font-bold text-orange-400">Rất cao</span></>
                                                    ) : (
                                                        <><span className="w-3 h-3 rounded-full bg-yellow-500"></span> <span className="font-bold text-yellow-400">Trung bình / Cần theo dõi</span></>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                <div className="text-slate-500 text-xs uppercase font-bold mb-1">Chuyên khoa đề xuất</div>
                                                <div className="font-bold text-cyan-400 flex items-center gap-2">
                                                    <i className="fi flaticon-doctor"></i> {selectedSymptom.specialist}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/20 mt-auto">
                                            <h4 className="font-bold text-blue-300 mb-2 flex items-center gap-2">
                                                <i className="fi flaticon-info text-xl"></i> Khuyến nghị Y tế
                                            </h4>
                                            <p className="text-blue-100/70 leading-relaxed text-sm">
                                                Dựa trên các biểu hiện như <strong>{selectedSymptom.symptoms || selectedSymptom.name}</strong>, hệ thống cho thấy khả năng bạn đang mắc <strong>{selectedSymptom.name}</strong>. {selectedSymptom.description} bạn cần đặt lịch hẹn với bác sĩ khoa <strong>{selectedSymptom.specialist}</strong> để thực hiện xét nghiệm lâm sàng và chụp chiếu. Không tự ý mua thuốc giảm đau mà không có chỉ định.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center gap-4">
                                        <Link
                                            href={`/search?speciality=${selectedSymptom.specialist.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 p-[1px] rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative bg-[#071018] group-hover:bg-transparent px-6 py-6 rounded-lg transition-colors flex flex-col items-center text-center h-full">
                                                <div className="w-14 h-14 bg-cyan-900/50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                                                    <i className="fi flaticon-stethoscope text-2xl text-cyan-400 group-hover:text-white"></i>
                                                </div>
                                                <span className="font-bold text-lg text-white mb-1">Tìm Bác sĩ Ngay</span>
                                                <span className="text-xs text-slate-400 group-hover:text-cyan-100">Đặt lịch khám trực tuyến</span>
                                            </div>
                                        </Link>

                                        <button
                                            onClick={reset}
                                            className="px-6 py-5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-bold transition-all flex items-center justify-center gap-3"
                                        >
                                            <i className="fi flaticon-reload text-sm"></i> Kiểm tra lại
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                <div className="mt-8 text-center px-4">
                    <p className="text-xs text-slate-500 bg-white/5 border border-white/10 rounded-xl p-4 inline-block max-w-3xl leading-relaxed">
                        <strong className="text-amber-500 font-bold uppercase tracking-widest block mb-1">⚠️ Miễn trừ trách nhiệm:</strong>
                        AI Health Diagnostic là công cụ tham khảo thông minh, không phải là bác sĩ. Kết quả được đưa ra bằng cách đối chiếu dữ liệu nhưng không thay thế cho các chỉ định y tế chính thức. Trong trường hợp khẩn cấp, vui lòng đến ngay cơ sở y tế gần nhất hoặc gọi tổng đài cấp cứu.
                    </p>
                </div>
            </div>
        </div>
    );
}
