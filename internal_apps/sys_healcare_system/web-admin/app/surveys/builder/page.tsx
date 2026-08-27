"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import surveyService, { Question, SurveyStatus, QuestionType } from '@/services/survey.service';

export default function SurveyBuilderPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const surveyId = searchParams.get('id');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Omit<Question, 'id'>[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (surveyId) {
            const fetchSurvey = async () => {
                try {
                    setLoading(true);
                    const data = await surveyService.getSurveyById(parseInt(surveyId));
                    setTitle(data.title);
                    setDescription(data.description || '');
                    setQuestions(data.questions?.map(q => ({
                        text: q.text,
                        type: q.type,
                        options: q.options,
                        required: q.required
                    })) || []);
                } catch (error) {
                    console.error('Failed to fetch survey', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchSurvey();
        }
    }, [surveyId]);

    const addQuestion = (type: QuestionType) => {
        const newQ: Omit<Question, 'id'> = {
            text: '',
            type,
            required: true,
            options: (type === 'SINGLE_CHOICE' || type === 'MULTIPLE_CHOICE') ? ['Tùy chọn 1', 'Tùy chọn 2'] : undefined
        };
        setQuestions([...questions, newQ]);
    };

    const updateQuestion = (index: number, field: keyof Question, value: any) => {
        const newQs = [...questions];
        newQs[index] = { ...newQs[index], [field]: value };
        // Reset options if switching away from choice types
        if (field === 'type') {
            if (value === 'SINGLE_CHOICE' || value === 'MULTIPLE_CHOICE') {
                if (!newQs[index].options) {
                    newQs[index].options = ['Tùy chọn 1', 'Tùy chọn 2'];
                }
            } else {
                newQs[index].options = undefined;
            }
        }
        setQuestions(newQs);
    };

    const updateOption = (qIndex: number, optIndex: number, value: string) => {
        const newQs = [...questions];
        if (newQs[qIndex].options) {
            const newOptions = [...newQs[qIndex].options!];
            newOptions[optIndex] = value;
            newQs[qIndex] = { ...newQs[qIndex], options: newOptions };
            setQuestions(newQs);
        }
    };

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleSave = async (status: SurveyStatus) => {
        if (!title.trim()) {
            alert('Vui lòng nhập tiêu đề khảo sát');
            return;
        }

        try {
            setLoading(true);
            const data = {
                title,
                description,
                status,
                questions
            };

            if (surveyId) {
                await surveyService.updateSurvey(parseInt(surveyId), data);
            } else {
                await surveyService.createSurvey(data);
            }
            router.push('/surveys');
        } catch (error) {
            console.error('Failed to save survey', error);
            alert('Lỗi khi lưu khảo sát');
        } finally {
            setLoading(false);
        }
    };

    if (loading && surveyId) return <div className="p-12 text-center text-gray-500">Đang tải dữ liệu khảo sát...</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2">
                        <i className="fi flaticon-left-arrow-1 text-xs"></i> Quay lại
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">{surveyId ? 'Chỉnh sửa khảo sát' : 'Tạo khảo sát mới'}</h1>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => handleSave('DRAFT')}
                        disabled={loading}
                        className="px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-bold disabled:opacity-50"
                    >
                        Lưu nháp
                    </button>
                    <button
                        onClick={() => handleSave('ACTIVE')}
                        disabled={loading}
                        className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark shadow-lg disabled:opacity-50"
                    >
                        {surveyId ? 'Cập nhật & Xuất bản' : 'Xuất bản'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Thông tin chung</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề khảo sát</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="VD: Khảo sát mức độ hài lòng..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Mô tả mục đích khảo sát..."
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-4">
                        <h3 className="font-bold text-gray-800 mb-4">Thêm câu hỏi</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <button onClick={() => addQuestion('SINGLE_CHOICE')} className="p-3 border border-gray-200 rounded-xl text-left hover:border-primary hover:text-primary hover:bg-primary/5 transition flex items-center gap-3">
                                <i className="fi flaticon-list text-lg"></i> Trắc nghiệm (1 đáp án)
                            </button>
                            <button onClick={() => addQuestion('MULTIPLE_CHOICE')} className="p-3 border border-gray-200 rounded-xl text-left hover:border-primary hover:text-primary hover:bg-primary/5 transition flex items-center gap-3">
                                <i className="fi flaticon-list text-lg"></i> Trắc nghiệm (Nhiều đáp án)
                            </button>
                            <button onClick={() => addQuestion('RATING')} className="p-3 border border-gray-200 rounded-xl text-left hover:border-primary hover:text-primary hover:bg-primary/5 transition flex items-center gap-3">
                                <i className="fi flaticon-star text-lg"></i> Thang điểm (Rating)
                            </button>
                            <button onClick={() => addQuestion('TEXT')} className="p-3 border border-gray-200 rounded-xl text-left hover:border-primary hover:text-primary hover:bg-primary/5 transition flex items-center gap-3">
                                <i className="fi flaticon-edit text-lg"></i> Văn bản (Tự luận)
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {questions.map((q, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Câu hỏi {index + 1} • {q.type === 'SINGLE_CHOICE' ? 'Trắc nghiệm (1 đáp án)' : q.type === 'MULTIPLE_CHOICE' ? 'Trắc nghiệm (Nhiều đáp án)' : q.type === 'RATING' ? 'Đánh giá' : 'Tự luận'}
                                </span>
                                <div className="flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition">
                                    <button onClick={() => removeQuestion(index)} className="text-gray-400 hover:text-red-500"><i className="fi flaticon-trash"></i></button>
                                </div>
                            </div>

                            <input
                                type="text"
                                value={q.text}
                                onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                                placeholder="Nhập nội dung câu hỏi..."
                                className="w-full text-lg font-bold placeholder-gray-300 border-none focus:ring-0 p-0 mb-4"
                            />

                            {q.type === 'RATING' && (
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <i key={star} className="fi flaticon-star text-2xl text-gray-200"></i>
                                    ))}
                                </div>
                            )}

                            {q.type === 'TEXT' && (
                                <div className="w-full h-24 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                                    Khu vực cho người dùng nhập câu trả lời...
                                </div>
                            )}

                            {(q.type === 'SINGLE_CHOICE' || q.type === 'MULTIPLE_CHOICE') && q.options && (
                                <div className="space-y-3">
                                    {q.options.map((opt, optIndex) => (
                                        <div key={optIndex} className="flex items-center gap-3">
                                            {q.type === 'SINGLE_CHOICE' ? (
                                                <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                                            ) : (
                                                <div className="w-4 h-4 rounded border border-gray-300"></div>
                                            )}
                                            <input
                                                type="text"
                                                value={opt}
                                                onChange={(e) => updateOption(index, optIndex, e.target.value)}
                                                className="flex-1 px-3 py-2 bg-gray-50 border border-transparent hover:border-gray-200 focus:bg-white focus:border-primary rounded-lg transition outline-none text-sm"
                                            />
                                            <button
                                                onClick={() => {
                                                    const newOpts = q.options!.filter((_, i) => i !== optIndex);
                                                    updateQuestion(index, 'options', newOpts);
                                                }}
                                                className="text-gray-300 hover:text-red-500"
                                            >
                                                <i className="fi flaticon-close text-xs"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => updateQuestion(index, 'options', [...q.options!, `Tùy chọn ${q.options!.length + 1}`])}
                                        className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                                    >
                                        <i className="fi flaticon-add"></i> Thêm tùy chọn
                                    </button>
                                </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={q.required}
                                        onChange={(e) => updateQuestion(index, 'required', e.target.checked)}
                                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-600">Bắt buộc trả lời</span>
                                </label>
                            </div>
                        </div>
                    ))}

                    {questions.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 mb-2">Chưa có câu hỏi nào</p>
                            <p className="text-sm text-gray-500">Chọn loại câu hỏi từ menu bên trái để bắt đầu</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
