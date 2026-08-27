'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const threads = [
    {
        id: 1,
        title: 'Top 10 thực phẩm giàu vitamin C giúp tăng đề kháng',
        author: 'Dinh Dưỡng Vàng',
        avatar: '/styles/img/user/user-3.jpg',
        category: 'Dinh dưỡng',
        createdAt: '1 giờ trước',
        votes: 89,
        comments: 24,
        preview: 'Vitamin C đóng vai trò quan trọng trong việc tăng cường hệ miễn dịch. Dưới đây là danh sách các loại thực phẩm giàu vitamin C bạn nên bổ sung hàng ngày...',
        tags: ['Vitamin C', 'Đề kháng']
    },
    {
        id: 4,
        title: 'Uống Vitamin C thời điểm nào trong ngày là tốt nhất?',
        author: 'Lan Anh',
        avatar: '/styles/img/user/user-2.jpg',
        category: 'Sức khỏe chung',
        createdAt: '2 ngày trước',
        votes: 34,
        comments: 10,
        preview: 'Mọi người cho mình hỏi nên uống C vào buổi sáng hay tối? Mình nghe nói uống tối dễ bị sỏi thận...',
        tags: ['Vitamin C', 'Hỏi đáp']
    }
];

export default function TagPage() {
    const params = useParams<{ tag: string }>();
    const tagName = decodeURIComponent(params.tag);

    return (
        <div className="space-y-6">
            {/* Tag Header */}
            <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm flex items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -mr-16 -mt-16"></div>

                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-4xl font-bold flex-shrink-0 relative z-10">
                    #
                </div>
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Thẻ: <span className="text-blue-600">#{tagName}</span>
                    </h1>
                    <p className="text-gray-500">
                        Danh sách các bài thảo luận được gắn thẻ <strong>#{tagName}</strong>.
                    </p>
                </div>
            </div>

            {/* Thread List */}
            <div className="space-y-4">
                {threads.map((thread) => (
                    <div key={thread.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-1 flex hover:border-green-200 transition-colors cursor-pointer group">
                        <div className="w-12 bg-gray-50 rounded-l-xl flex flex-col items-center p-2 gap-1 flex-shrink-0">
                            <button className="text-gray-400 hover:text-orange-500 hover:bg-orange-50 w-8 h-8 rounded flex items-center justify-center transition-colors">
                                <i className="fi flaticon-up-arrow font-bold"></i>
                            </button>
                            <span className="font-bold text-gray-700 text-sm">{thread.votes}</span>
                            <button className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 w-8 h-8 rounded flex items-center justify-center transition-colors">
                                <i className="fi flaticon-down-arrow font-bold"></i>
                            </button>
                        </div>

                        <Link href={`/forum/${thread.id}`} className="flex-1 p-3 pl-4 block">
                            <div className="flex items-center gap-2 mb-2 text-xs">
                                <img src={thread.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                                <span className="font-bold text-gray-700">{thread.author}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-green-600 font-medium">{thread.category}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-400">{thread.createdAt}</span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                {thread.title}
                            </h3>

                            <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                                {thread.preview}
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-lg">
                                    <i className="fi flaticon-speech-bubble"></i>
                                    {thread.comments}
                                </div>
                                {thread.tags.map((tag) => (
                                    <span key={tag} className={`text-xs px-2 py-1 rounded-full ${tag === tagName ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
