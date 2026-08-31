"use client";
import React from 'react';
import { useParams } from 'next/navigation';

export default function UserStatsPage() {
    const params = useParams<{ id: string }>();
    // Mock user stats
    const user = {
        name: "Nguyen Van A",
        role: "Bác sĩ",
        joinDate: "01/05/2024",
        stats: {
            likes: 450,
            comments: 120,
            views: 2300,
            shares: 45
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Thống kê Người dùng: {user.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">{user.role}</span>
                <span>Tham gia: {user.joinDate}</span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-3xl font-bold text-primary mb-1">{user.stats.views}</p>
                    <p className="text-gray-500 text-sm">Lượt xem</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-3xl font-bold text-red-500 mb-1">{user.stats.likes}</p>
                    <p className="text-gray-500 text-sm">Lượt thích</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-3xl font-bold text-green-500 mb-1">{user.stats.comments}</p>
                    <p className="text-gray-500 text-sm">Bình luận</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="text-3xl font-bold text-purple-500 mb-1">{user.stats.shares}</p>
                    <p className="text-gray-500 text-sm">Chia sẻ</p>
                </div>
            </div>

            {/* Detailed Graphs / Interest Cloud Mock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Mối quan tâm hàng đầu</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">Tim mạch (45)</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">Tiểu đường (30)</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">Dược lâm sàng (25)</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">Hội thảo (12)</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center bg-gray-50">
                    <p className="text-gray-400 font-medium">[Biểu đồ hoạt động theo thời gian]</p>
                </div>
            </div>
        </div>
    );
}
