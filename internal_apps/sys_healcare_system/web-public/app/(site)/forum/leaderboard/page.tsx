'use client';

import React from 'react';
import Link from 'next/link';

const users = [
    { rank: 1, name: 'Bs. Tuấn', avatar: '/styles/img/user/user-4.jpg', role: 'Bác sĩ', points: 2540, posts: 45 },
    { rank: 2, name: 'Minh Anh', avatar: '/styles/img/user/user-1.jpg', role: 'Thành viên', points: 1540, posts: 24 },
    { rank: 3, name: 'Dinh Dưỡng Vàng', avatar: '/styles/img/user/user-3.jpg', role: 'Chuyên gia', points: 1250, posts: 89 },
    { rank: 4, name: 'Lan Hương', avatar: '/styles/img/user/user-5.jpg', role: 'Thành viên', points: 980, posts: 15 },
    { rank: 5, name: 'Hoàng Nam', avatar: '/styles/img/user/user-2.jpg', role: 'Thành viên', points: 875, posts: 12 },
];

export default function LeaderboardPage() {
    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Bảng Xếp Hạng Thành Viên</h1>
                <p className="text-gray-500">
                    Vinh danh những thành viên tích cực đóng góp cho cộng đồng.
                    Điểm uy tín được tính dựa trên số bài viết, bình luận và lượt bình chọn hữu ích.
                </p>
            </div>

            {/* Top 3 Podium */}
            <div className="flex items-end justify-center gap-4 py-8">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                    <Link href={`/forum/user/${users[1].rank}`} className="relative group">
                        <div className="w-20 h-20 rounded-full border-4 border-gray-300 overflow-hidden relative z-10 transition-transform group-hover:scale-105">
                            <img src={users[1].avatar} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-300 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full z-20">
                            #2
                        </div>
                    </Link>
                    <div className="text-center mt-3">
                        <p className="font-bold text-gray-900">{users[1].name}</p>
                        <p className="text-sm text-green-600 font-bold">{users[1].points} điểm</p>
                    </div>
                    <div className="h-24 w-24 bg-gradient-to-t from-gray-100 to-white rounded-t-2xl mt-2"></div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center">
                    <div className="mb-2 text-yellow-500 text-2xl animate-bounce">
                        <i className="fi flaticon-star"></i>
                    </div>
                    <Link href={`/forum/user/${users[0].rank}`} className="relative group">
                        <div className="w-28 h-28 rounded-full border-4 border-yellow-400 overflow-hidden relative z-10 transition-transform group-hover:scale-105 shadow-xl shadow-yellow-500/20">
                            <img src={users[0].avatar} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white text-sm font-bold px-3 py-1 rounded-full z-20 flex items-center gap-1">
                            <i className="fi flaticon-crown text-xs"></i> #1
                        </div>
                    </Link>
                    <div className="text-center mt-5">
                        <p className="font-bold text-gray-900 text-lg">{users[0].name}</p>
                        <p className="text-green-600 font-bold">{users[0].points} điểm</p>
                    </div>
                    <div className="h-32 w-32 bg-gradient-to-t from-yellow-50 to-white rounded-t-2xl mt-2 border-t border-yellow-100"></div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                    <Link href={`/forum/user/${users[2].rank}`} className="relative group">
                        <div className="w-20 h-20 rounded-full border-4 border-orange-300 overflow-hidden relative z-10 transition-transform group-hover:scale-105">
                            <img src={users[2].avatar} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-orange-300 text-white text-xs font-bold px-2 py-0.5 rounded-full z-20">
                            #3
                        </div>
                    </Link>
                    <div className="text-center mt-3">
                        <p className="font-bold text-gray-900">{users[2].name}</p>
                        <p className="text-sm text-green-600 font-bold">{users[2].points} điểm</p>
                    </div>
                    <div className="h-20 w-24 bg-gradient-to-t from-orange-50 to-white rounded-t-2xl mt-2 border-t border-orange-100"></div>
                </div>
            </div>

            {/* Full List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm font-semibold uppercase border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 w-20 text-center">Hạng</th>
                            <th className="px-6 py-4">Thành viên</th>
                            <th className="px-6 py-4 text-center">Bài viết</th>
                            <th className="px-6 py-4 text-right">Điểm uy tín</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.rank} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-center font-bold text-gray-500">#{user.rank}</td>
                                <td className="px-6 py-4">
                                    <Link href={`/forum/user/${user.rank}`} className="flex items-center gap-3 group">
                                        <img src={user.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                                        <div>
                                            <p className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.role}</p>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-center text-gray-600">{user.posts}</td>
                                <td className="px-6 py-4 text-right font-bold text-green-600">{user.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
