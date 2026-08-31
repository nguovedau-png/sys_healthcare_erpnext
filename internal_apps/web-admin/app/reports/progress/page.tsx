"use client";

import React, { useState, useEffect } from 'react';
import reportService, { LearningProgress as ProgressData } from '@/services/report.service';

export default function LearningProgressPage() {
    const [progress, setProgress] = useState<ProgressData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const data = await reportService.getProgress();
                setProgress(data);
            } catch (error) {
                console.error('Failed to fetch progress', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProgress();
    }, []);

    const lessonEngagement = [
        { id: 1, name: 'Bài 1: Giới thiệu', clicks: 1100, likes: 450, shares: 120, comments: 85, videoCompletion: 95 },
        { id: 2, name: 'Bài 2: Cơ bản', clicks: 980, likes: 380, shares: 95, comments: 72, videoCompletion: 88 },
        { id: 3, name: 'Bài 3: Nâng cao', clicks: 850, likes: 320, shares: 78, comments: 65, videoCompletion: 82 },
        { id: 4, name: 'Bài 4: Thực hành', clicks: 720, likes: 290, shares: 68, comments: 58, videoCompletion: 78 },
    ];

    if (loading) return <div className="p-8 text-center text-gray-500">Đang tải...</div>;
    if (!progress) return <div className="p-8 text-center text-red-500">Không có dữ liệu tiến độ.</div>;

    const quizPerformance = {
        preTest: { total: progress.preTestTotal, passed: progress.preTestPassed, failed: progress.preTestTotal - progress.preTestPassed },
        postTest: { total: progress.postTestTotal, passed: progress.postTestPassed, failed: progress.postTestTotal - progress.postTestPassed },
        scored80Plus: Math.round(progress.totalLearners * 0.55),
    };

    const mostIncorrectAnswers = [
        { question: 'Câu 5: Liều lượng Paracetamol tối đa/ngày?', incorrectCount: 320, lesson: 'Bài 2' },
        { question: 'Câu 12: Tương tác thuốc Warfarin?', incorrectCount: 280, lesson: 'Bài 3' },
        { question: 'Câu 8: Chống chỉ định Aspirin?', incorrectCount: 245, lesson: 'Bài 2' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Tiến độ Học tập & Tương tác</h1>
                <p className="text-gray-500 text-sm mt-1">Theo dõi chi tiết hoạt động học tập của học viên</p>
            </div>

            {/* Video Completion Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-2">Xem ≥70% mỗi bài</p>
                    <p className="text-3xl font-bold text-green-600">{progress.watched70Lesson}</p>
                    <p className="text-xs text-gray-400 mt-1">{((progress.watched70Lesson / progress.totalLearners) * 100).toFixed(1)}% học viên</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-2">Xem ≥70% toàn khóa</p>
                    <p className="text-3xl font-bold text-blue-600">{progress.watched70All}</p>
                    <p className="text-xs text-gray-400 mt-1">{((progress.watched70All / progress.totalLearners) * 100).toFixed(1)}% học viên</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-sm mb-2">Đạt ≥80% Quiz</p>
                    <p className="text-3xl font-bold text-purple-600">{quizPerformance.scored80Plus}</p>
                    <p className="text-xs text-gray-400 mt-1">{((quizPerformance.scored80Plus / progress.totalLearners) * 100).toFixed(1)}% học viên</p>
                </div>
            </div>

            {/* Lesson Engagement Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Tương tác Từng Bài học</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700">Bài học</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Lượt click</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Hoàn thành video</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Likes</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Shares</th>
                                <th className="px-6 py-4 font-bold text-gray-700">Comments</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {lessonEngagement.map((lesson) => (
                                <tr key={lesson.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{lesson.name}</td>
                                    <td className="px-6 py-4 text-blue-600 font-bold">{lesson.clicks}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[80px]">
                                                <div className="h-full bg-green-500" style={{ width: `${lesson.videoCompletion}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-600">{lesson.videoCompletion}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-red-500 font-medium">{lesson.likes}</td>
                                    <td className="px-6 py-4 text-blue-500 font-medium">{lesson.shares}</td>
                                    <td className="px-6 py-4 text-green-600 font-medium">{lesson.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quiz Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Kết quả Pre-test/Post-test</h2>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-gray-700">Pre-test (Trước bài học)</span>
                                <span className="text-sm text-gray-500">{quizPerformance.preTest.total} lượt làm</span>
                            </div>
                            <div className="flex gap-2 h-8">
                                <div className="bg-green-500 rounded-l flex items-center justify-center text-white text-xs font-bold" style={{ width: `${(quizPerformance.preTest.passed / quizPerformance.preTest.total) * 100}%` }}>
                                    Đạt {quizPerformance.preTest.passed}
                                </div>
                                <div className="bg-red-500 rounded-r flex items-center justify-center text-white text-xs font-bold" style={{ width: `${(quizPerformance.preTest.failed / quizPerformance.preTest.total) * 100}%` }}>
                                    Không đạt {quizPerformance.preTest.failed}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-gray-700">Post-test (Sau bài học)</span>
                                <span className="text-sm text-gray-500">{quizPerformance.postTest.total} lượt làm</span>
                            </div>
                            <div className="flex gap-2 h-8">
                                <div className="bg-green-500 rounded-l flex items-center justify-center text-white text-xs font-bold" style={{ width: `${(quizPerformance.postTest.passed / quizPerformance.postTest.total) * 100}%` }}>
                                    Đạt {quizPerformance.postTest.passed}
                                </div>
                                <div className="bg-red-500 rounded-r flex items-center justify-center text-white text-xs font-bold" style={{ width: `${(quizPerformance.postTest.failed / quizPerformance.postTest.total) * 100}%` }}>
                                    Không đạt {quizPerformance.postTest.failed}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Câu trả lời Sai nhiều nhất</h2>
                    <div className="space-y-4">
                        {mostIncorrectAnswers.map((item, idx) => (
                            <div key={idx} className="border-b border-gray-100 pb-4 last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-sm font-medium text-gray-900 flex-1">{item.question}</p>
                                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded ml-2">{item.incorrectCount} sai</span>
                                </div>
                                <p className="text-xs text-gray-500">{item.lesson}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
