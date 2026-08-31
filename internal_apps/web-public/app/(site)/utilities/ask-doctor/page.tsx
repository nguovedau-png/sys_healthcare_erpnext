"use client";

import React, { useState, useEffect } from 'react';
import Banner from '@/components/common/Banner';
import { contentService, Question } from '@/services/content.service';
import Spin from '@/components/ui/Spin';
import Empty from '@/components/ui/Empty';

export default function AskDoctorPage() {
    const [activeTab, setActiveTab] = useState('all'); // all, pending, replied
    const [showForm, setShowForm] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                // Fetching all for simplicity as backend meta handling is evolving
                const response = await contentService.getQuestions({ limit: 100 });
                setQuestions(response.data || []);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    // Filter logic
    const filteredQuestions = questions.filter(q => {
        if (activeTab === 'all') return true;
        if (activeTab === 'replied') return q.isResolved;
        if (activeTab === 'pending') return !q.isResolved;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Left Sidebar: Info & Stats */}
                    <div className="md:w-1/3 lg:w-1/4 space-y-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fi flaticon-doctor text-4xl text-blue-600"></i>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Hỏi Bác sĩ</h2>
                            <p className="text-gray-500 text-sm mb-6">
                                Đặt câu hỏi miễn phí và nhận tư vấn từ đội ngũ bác sĩ chuyên khoa uy tín.
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
                            >
                                <i className="fi flaticon-plus"></i> Đặt câu hỏi mới
                            </button>
                        </div>

                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Thống kê của bạn</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between">
                                    <span className="text-gray-600">Tổng câu hỏi</span>
                                    <span className="font-bold text-gray-900">12</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-600">Đã được trả lời</span>
                                    <span className="font-bold text-green-600">10</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-600">Đang chờ</span>
                                    <span className="font-bold text-orange-500">2</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Content: Question List */}
                    <div className="flex-1">
                        {/* Tabs */}
                        <div className="flex items-center gap-2 mb-6 overflow-x-auto hide-scrollbar">
                            {[
                                { id: 'all', label: 'Tất cả' },
                                { id: 'pending', label: 'Đang chờ' },
                                { id: 'replied', label: 'Đã trả lời' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab.id
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* List */}
                        <div className="space-y-6">
                            {isLoading ? (
                                <div className="flex justify-center py-20 bg-white rounded-lg border border-gray-100">
                                    <Spin size="large" tip="Đang tải danh sách câu hỏi..." />
                                </div>
                            ) : filteredQuestions.length > 0 ? (
                                filteredQuestions.map(q => (
                                    <div key={q.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                                                        {q.category}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(q.date).toLocaleDateString('vi-VN')}</span>
                                                </div>
                                                <span className={`text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest ${q.isResolved ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                                                    }`}>
                                                    {q.isResolved ? <><i className="fi flaticon-check"></i> Đã trả lời</> : <><i className="fi flaticon-wall-clock"></i> Đang chờ</>}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{q.title}</h3>
                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">{q.content}</p>

                                            {/* Reply Preview */}
                                            {q.answers && q.answers.length > 0 && (
                                                <div className="bg-slate-50 rounded-lg p-5 flex gap-4 mt-6 border border-slate-100 relative overflow-hidden group">
                                                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-emerald-100 shadow-sm flex-shrink-0 z-10">
                                                        <i className="fi flaticon-doctor text-emerald-500 text-lg"></i>
                                                    </div>
                                                    <div className="z-10">
                                                        <div className="text-xs font-black text-gray-900 mb-1 uppercase tracking-tight">
                                                            {q.answers[0].authorName} 
                                                            <span className="text-gray-400 font-bold ml-2">• {new Date(q.answers[0].date).toLocaleDateString('vi-VN')}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 line-clamp-2 italic leading-relaxed">"{q.answers[0].content}"</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gửi bởi: {q.authorName}</span>
                                            <button className="text-primary font-black text-xs uppercase tracking-widest hover:text-primary-dark transition-colors flex items-center gap-2">
                                                Xem chi tiết <i className="fi flaticon-right-arrow text-[8px]"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-lg p-20 border border-slate-100 shadow-sm">
                                    <Empty 
                                        description={<span className="text-slate-400 font-bold">Chưa có câu hỏi nào trong mục này</span>} 
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Ask Question Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden shadow-2xl animate-scale-up">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-xl font-bold text-gray-900">Đặt câu hỏi cho bác sĩ</h3>
                            <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                                <i className="fi flaticon-close text-gray-500 font-bold"></i>
                            </button>
                        </div>

                        <div className="p-6 md:p-8 space-y-4">
                            {/* Speciality Select */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Chuyên khoa</label>
                                <select className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white">
                                    <option>Nhi khoa</option>
                                    <option>Sản phụ khoa</option>
                                    <option>Da liễu</option>
                                    <option>Tiêu hóa</option>
                                    <option>Tai Mũi Họng</option>
                                    <option>Khác</option>
                                </select>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tiêu đề</label>
                                <input
                                    type="text"
                                    placeholder="Ví dụ: Bé bị sốt cao, Đau bụng..."
                                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nội dung câu hỏi</label>
                                <textarea
                                    rows={5}
                                    placeholder="Mô tả chi tiết triệu chứng, thời gian mắc bệnh..."
                                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                                ></textarea>
                            </div>

                            {/* Attachment */}
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-gray-500 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg border border-dashed border-gray-300 transition-colors">
                                    <i className="fi flaticon-picture"></i> Thêm hình ảnh
                                </button>
                                <button className="flex items-center gap-2 text-gray-500 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg border border-dashed border-gray-300 transition-colors">
                                    <i className="fi flaticon-paper-plane"></i> Thêm hồ sơ bệnh án
                                </button>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-white transition-colors"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors"
                            >
                                Gửi câu hỏi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
