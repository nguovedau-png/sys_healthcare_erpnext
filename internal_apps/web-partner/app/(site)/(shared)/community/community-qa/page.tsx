"use client";

import React, { useEffect, useState } from 'react';
import Banner from '@/components/common/Banner';
import { contentService, Question } from '@/services/content.service';
import { Spin, Pagination, Empty } from 'antd';

export default function CommunityQAPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });

    useEffect(() => {
        fetchQuestions();
    }, [pagination.page]);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await contentService.getQuestions({
                page: pagination.page,
                limit: pagination.limit
            });
            setQuestions(response.data || []);
            setTotal(response.meta?.total || 0);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hỏi đáp Cộng đồng</h1>
                        <p className="text-gray-500">Chia sẻ kiến thức - Cùng nhau học hỏi</p>
                    </div>
                    <button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark">
                        Đặt câu hỏi
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Spin size="large" />
                    </div>
                ) : questions.length > 0 ? (
                    <>
                        <div className="space-y-4 mb-8">
                            {questions.map(q => (
                                <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-primary cursor-pointer">{q.title}</h3>
                                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                                        <span>Bởi <strong>{q.authorName}</strong></span>
                                        <span className="flex items-center gap-1">
                                            <i className="fi flaticon-comment"></i> {q.answers?.length || 0} câu trả lời
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <i className="fi flaticon-eye"></i> Phổ biến
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                                            {q.category || 'Hỏi đáp'}
                                        </span>
                                        {q.isResolved && (
                                            <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                                                Đã giải quyết
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-12">
                            <Pagination
                                current={pagination.page}
                                total={total}
                                pageSize={pagination.limit}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                            />
                        </div>
                    </>
                ) : (
                    <div className="py-20">
                        <Empty description="Chưa có câu hỏi nào" />
                    </div>
                )}
            </div>
        </div>
    );
}
