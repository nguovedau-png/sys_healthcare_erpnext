'use client';

import React from 'react';
import Link from 'next/link';

const notifications = [
    {
        id: 1,
        type: 'reply',
        user: 'Bs. Tuấn',
        avatar: '/styles/img/user/user-4.jpg',
        content: 'đã trả lời bình luận của bạn trong bài viết',
        target: 'Xin kinh nghiệm chăm sóc người già bị tiểu đường type 2',
        link: '/forum/1',
        time: '15 phút trước',
        read: false
    },
    {
        id: 2,
        type: 'vote',
        user: 'Lan Hương và 5 người khác',
        avatar: '/styles/img/user/user-5.jpg',
        content: 'đã thích bài viết của bạn',
        target: 'Review chi tiết gói khám tổng quát tại Bệnh viện Y',
        link: '/forum/2',
        time: '2 giờ trước',
        read: true
    },
    {
        id: 3,
        type: 'system',
        user: 'Hệ thống',
        avatar: '/favicon.ico', // Placeholder
        content: 'Chào mừng bạn đến với Diễn đàn Sức khỏe! Hãy đọc qua nội quy trước khi đăng bài nhé.',
        target: '',
        link: '/forum/rules',
        time: '1 ngày trước',
        read: true
    }
];

export default function NotificationsPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
                <button className="text-sm font-medium text-green-600 hover:text-green-700">
                    Đánh dấu tất cả là đã đọc
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                {notifications.map((notif) => (
                    <Link
                        key={notif.id}
                        href={notif.link}
                        className={`block p-4 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}
                    >
                        <div className="flex gap-4">
                            <div className="relative">
                                <img src={notif.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-200" alt="" />
                                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white text-xs text-white ${notif.type === 'reply' ? 'bg-green-500' :
                                        notif.type === 'vote' ? 'bg-orange-500' : 'bg-blue-500'
                                    }`}>
                                    <i className={`fi ${notif.type === 'reply' ? 'flaticon-chat' :
                                            notif.type === 'vote' ? 'flaticon-favorite' : 'flaticon-info'
                                        }`}></i>
                                </div>
                            </div>

                            <div className="flex-1">
                                <p className="text-gray-900 text-sm leading-relaxed">
                                    <span className="font-bold">{notif.user}</span> {notif.content} <span className="font-bold text-gray-700">"{notif.target}"</span>
                                </p>
                                <span className={`text-xs font-medium mt-1 inline-block ${!notif.read ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {notif.time}
                                </span>
                            </div>

                            {!notif.read && (
                                <div className="self-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {notifications.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <i className="fi flaticon-bell text-4xl mb-3 block text-gray-300"></i>
                    Bạn chưa có thông báo nào.
                </div>
            )}
        </div>
    );
}
