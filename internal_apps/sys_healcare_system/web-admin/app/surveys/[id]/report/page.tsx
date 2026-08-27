"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import surveyService, { Survey } from '@/services/survey.service';

export default function SurveyReportPage() {
    const params = useParams<{ id: string }>();
    const surveyId = parseInt(params.id);
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await surveyService.getSurveyAnalytics(surveyId);
                setAnalytics(data);
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        if (surveyId) {
            fetchData();
        }
    }, [surveyId]);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>;
    }

    if (!analytics) {
        return <div className="p-8 text-center text-red-500">Không tìm thấy dữ liệu khảo sát.</div>;
    }

    const formatStatus = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'Đang chạy';
            case 'DRAFT': return 'Bản nháp';
            case 'CLOSED': return 'Đã đóng';
            default: return status;
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <Link href="/surveys" className="text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2 font-medium">
                        <i className="fi flaticon-left-arrow-1 text-xs"></i> Quay lại danh sách
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{analytics.title}</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Trạng thái: <span className={`${analytics.status === 'ACTIVE' ? 'text-green-600' : 'text-gray-600'} font-bold`}>
                            {formatStatus(analytics.status)}
                        </span> • {analytics.totalResponses} phản hồi
                    </p>
                </div>
                <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl border border-gray-200 font-bold flex items-center gap-2 transition-colors">
                    <i className="fi flaticon-download"></i> Xuất Excel
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Tổng phản hồi</p>
                    <p className="text-3xl font-bold text-gray-900">{analytics.totalResponses}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Số câu hỏi</p>
                    <p className="text-3xl font-bold text-blue-600">{analytics.analytics?.length || 0}</p>
                </div>
                {/* Mock data for these since we don't have views yet */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Tỷ lệ hoàn thành</p>
                    <p className="text-3xl font-bold text-gray-900">100%</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">Thời gian hoàn thành</p>
                    <p className="text-3xl font-bold text-gray-900">--</p>
                </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-6">
                {analytics.analytics?.map((q: any, idx: number) => (
                    <div key={q.questionId} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-bold text-gray-800 text-lg">{idx + 1}. {analytics.analytics[idx].questionContent || `Câu hỏi ${idx + 1}`}</h3>
                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-bold uppercase">{q.type}</span>
                        </div>

                        {q.type === 'RATING' && (
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1 w-full space-y-3">
                                    {q.distribution?.map((dist: any) => (
                                        <div key={dist.rating} className="flex items-center gap-3">
                                            <span className="w-4 font-bold text-gray-600 text-sm">{dist.rating}</span>
                                            <i className="fi flaticon-star text-xs text-yellow-400"></i>
                                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${dist.percentage}%` }}></div>
                                            </div>
                                            <span className="text-xs text-gray-500 w-24 text-right">{dist.count} ({dist.percentage}%)</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center p-6 bg-gray-50 rounded-xl min-w-[150px]">
                                    <p className="text-sm text-gray-500 mb-1">Điểm trung bình</p>
                                    <p className="text-4xl font-bold text-gray-900">{q.average}<span className="text-lg text-gray-400">/5</span></p>
                                    <div className="flex justify-center mt-2 text-yellow-400 gap-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <i key={star} className={`fi ${star <= Math.round(q.average) ? 'flaticon-star' : 'flaticon-star-1'}`}></i>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {(q.type === 'SINGLE_CHOICE' || q.type === 'MULTIPLE_CHOICE') && (
                            <div className="space-y-4">
                                {q.options?.map((opt: any, oIdx: number) => (
                                    <div key={oIdx}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-700">{opt.content}</span>
                                            <span className="text-gray-500">{opt.count} phiếu ({opt.percentage}%)</span>
                                        </div>
                                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${opt.percentage}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {q.type === 'TEXT' && (
                            <div className="space-y-3">
                                <p className="text-sm text-gray-500 mb-2">{q.totalResponses} phản hồi gần nhất:</p>
                                {q.responses?.map((resp: string, rIdx: number) => (
                                    <div key={rIdx} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 italic border-l-4 border-blue-400">
                                        "{resp}"
                                    </div>
                                ))}
                                {q.totalResponses === 0 && <p className="text-sm text-gray-400">Chưa có phản hồi văn bản.</p>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
