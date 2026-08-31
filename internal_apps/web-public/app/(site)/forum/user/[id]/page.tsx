'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ForumUserProfile() {
    const params = useParams<{ id: string }>();
    // Mock Data
    const user = {
        id: params.id,
        name: 'Minh Anh',
        avatar: '/styles/img/user/user-1.jpg',
        role: 'Thành viên Tích cực',
        joinDate: '15/08/2023',
        reputation: 1540,
        posts_count: 24,
        comments_count: 156,
        about: 'Quan tâm đến sức khỏe gia đình và dinh dưỡng cho người cao tuổi.',
        recent_activity: [
            { id: 1, type: 'post', title: 'Xin kinh nghiệm chăm sóc người già bị tiểu đường type 2', date: '2 giờ trước' },
            { id: 2, type: 'comment', title: 'Trả lời: Chế độ ăn Keto có thực sự tốt?', date: '1 ngày trước' },
            { id: 3, type: 'post', title: 'Địa chỉ mua máy đo huyết áp uy tín tại Hà Nội', date: '3 ngày trước' }
        ]
    };

    return (
        <div className="space-y-6">
            {/* User Stats Card */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-green-500 to-teal-500"></div>
                <div className="px-8 pb-8 relative">
                    <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-white absolute -top-12 object-cover shadow-md" alt="" />

                    <div className="mt-14 flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                {user.name}
                                <i className="fi flaticon-verified text-blue-500 text-lg"></i>
                            </h1>
                            <p className="text-green-600 font-medium">{user.role}</p>
                            <p className="text-gray-500 text-sm mt-2 max-w-lg">{user.about}</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-center px-4 py-2 bg-gray-50 rounded-xl">
                                <div className="text-xl font-bold text-gray-900">{user.reputation}</div>
                                <div className="text-xs text-gray-500 font-medium uppercase">Uy tín</div>
                            </div>
                            <div className="text-center px-4 py-2 bg-gray-50 rounded-xl">
                                <div className="text-xl font-bold text-gray-900">{user.posts_count}</div>
                                <div className="text-xs text-gray-500 font-medium uppercase">Bài viết</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mt-6 text-sm text-gray-500 border-t border-gray-50 pt-4">
                        <span className="flex items-center gap-2">
                            <i className="fi flaticon-calendar"></i>
                            Tham gia: {user.joinDate}
                        </span>
                        <span className="flex items-center gap-2">
                            <i className="fi flaticon-chat"></i>
                            {user.comments_count} bình luận
                        </span>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <h3 className="font-bold text-gray-900">Hoạt động gần đây</h3>
            <div className="space-y-4">
                {user.recent_activity.map((act) => (
                    <div key={act.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${act.type === 'post' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                            }`}>
                            <i className={`fi ${act.type === 'post' ? 'flaticon-edit' : 'flaticon-chat'}`}></i>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-1">
                                {act.type === 'post' ? 'Đã đăng bài thảo luận' : 'Đã bình luận trong bài viết'}
                            </p>
                            <Link href="#" className="font-bold text-gray-900 hover:text-green-600 transition-colors block">
                                {act.title}
                            </Link>
                        </div>
                        <span className="text-xs text-gray-400">{act.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
