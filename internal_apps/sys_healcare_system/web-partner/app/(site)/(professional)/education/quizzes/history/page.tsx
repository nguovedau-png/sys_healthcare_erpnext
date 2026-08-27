"use client";
import React from 'react';

export default function QuizHistoryPage() {
    const history = [
        { id: 1, title: 'Trắc nghiệm: Dược lâm sàng cơ bản', course: 'CPE 2024', score: 85, maxScore: 100, date: '2024-12-20', status: 'Passed' },
        { id: 2, title: 'Kiểm tra: Cập nhật điều trị ĐTĐ', course: 'CME Tim mạch', score: 92, maxScore: 100, date: '2024-12-19', status: 'Passed' },
        { id: 3, title: 'Bài thi cuối khóa: Nhi khoa', course: 'CME Nhi', score: 58, maxScore: 100, date: '2024-12-15', status: 'Failed' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Lịch sử làm bài Trắc nghiệm</h1>
                <p className="text-gray-500 text-sm mt-1">Xem lại các bài trắc nghiệm đã hoàn thành và kết quả đạt được.</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-3xl font-bold text-blue-600">{history.length}</p>
                    <p className="text-sm text-gray-500 mt-1">Bài đã làm</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-3xl font-bold text-green-600">{history.filter(h => h.status === 'Passed').length}</p>
                    <p className="text-sm text-gray-500 mt-1">Bài đạt</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-3xl font-bold text-yellow-600">78</p>
                    <p className="text-sm text-gray-500 mt-1">Điểm TB</p>
                </div>
            </div>

            <div className="space-y-4">
                {history.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    <span className="text-primary font-medium">{item.course}</span> • Làm ngày {item.date}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${item.status === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {item.status === 'Passed' ? 'ĐẠT' : 'KHÔNG ĐẠT'}
                            </span>
                        </div>

                        <div className="flex items-center gap-6 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                                    {item.score}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Điểm số</p>
                                    <p className="font-bold text-gray-700">{item.score}/{item.maxScore}</p>
                                </div>
                            </div>

                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${item.score >= 80 ? 'bg-green-500' : item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${item.score}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-200 transition">
                                Xem đáp án
                            </button>
                            <button className="flex-1 py-2 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary-dark transition">
                                Làm lại
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
