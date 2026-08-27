'use client';

import React from 'react';
import Link from 'next/link';

const savedThreads = [
    {
        id: 1,
        title: 'Top 10 thực phẩm giàu vitamin C giúp tăng đề kháng',
        author: 'Dinh Dưỡng Vàng',
        avatar: '/styles/img/user/user-3.jpg',
        category: 'Dinh dưỡng',
        createdAt: '1 giờ trước',
        votes: 89,
        comments: 24,
        tags: ['Vitamin C', 'Đề kháng'],
        savedAt: '15/12/2024'
    },
    {
        id: 5,
        title: 'Kinh nghiệm tập yoga tại nhà cho người mới bắt đầu',
        author: 'Yoga Master',
        avatar: '/styles/img/user/user-2.jpg',
        category: 'Thể dục & Thể thao',
        createdAt: '3 ngày trước',
        votes: 450,
        comments: 112,
        tags: ['Yoga', 'Sức khỏe'],
        savedAt: '12/12/2024'
    }
];

export default function SavedPostsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <i className="fi flaticon-bookmark text-green-600"></i>
                Bài viết đã lưu
            </h1>

            <div className="space-y-4">
                {savedThreads.length > 0 ? (
                    savedThreads.map((thread) => (
                        <div key={thread.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex gap-4 hover:border-green-200 transition-colors relative group">
                            <div className="hidden sm:block">
                                <img src={thread.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-200" alt="" />
                            </div>

                            <div className="flex-1">
                                <Link href={`/forum/${thread.id}`} className="text-lg font-bold text-gray-900 hover:text-green-600 transition-colors line-clamp-1">
                                    {thread.title}
                                </Link>
                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                    <span className="font-medium text-gray-700">{thread.author}</span>
                                    <span>•</span>
                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{thread.category}</span>
                                    <span>•</span>
                                    <span>{thread.votes} vote</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Đã lưu: {thread.savedAt}</p>
                            </div>

                            <button className="absolute top-4 right-4 text-green-600 hover:text-red-500 bg-green-50 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Bỏ lưu">
                                <i className="fi flaticon-bookmark font-bold"></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
                        <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            <i className="fi flaticon-bookmark"></i>
                        </div>
                        <p className="text-gray-500">Bạn chưa lưu bài viết nào.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
