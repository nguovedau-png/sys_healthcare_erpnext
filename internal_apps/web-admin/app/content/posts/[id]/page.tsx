"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ViewPost() {
    const params = useParams<{ id: string }>();
    // Mock data
    const post = {
        id: params.id,
        title: '10 thực phẩm tốt cho tim mạch',
        category: 'Dinh dưỡng',
        author: 'Admin',
        date: '15/12/2024',
        status: 'published',
        views: 1200,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/content/posts" className="text-gray-600 hover:text-gray-900">
                        <i className="fi flaticon-arrow-left text-xl"></i>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Chi tiết bài viết</h1>
                        <p className="text-gray-500 mt-1">ID: #{post.id}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link
                        href={`/content/posts/${post.id}/edit`}
                        className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600"
                    >
                        <i className="fi flaticon-edit mr-2"></i> Chỉnh sửa
                    </Link>
                    <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600">
                        <i className="fi flaticon-delete mr-2"></i> Xóa
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h2>

                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                            <span className="flex items-center gap-2">
                                <i className="fi flaticon-user"></i> {post.author}
                            </span>
                            <span className="flex items-center gap-2">
                                <i className="fi flaticon-calendar"></i> {post.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <i className="fi flaticon-eye"></i> {post.views} lượt xem
                            </span>
                        </div>

                        <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Thông tin</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Trạng thái</p>
                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {post.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Danh mục</p>
                                <p className="font-bold text-gray-900 mt-1">{post.category}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tác giả</p>
                                <p className="font-bold text-gray-900 mt-1">{post.author}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ngày tạo</p>
                                <p className="font-bold text-gray-900 mt-1">{post.date}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Thống kê</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Lượt xem</span>
                                <span className="font-bold text-gray-900">{post.views}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Lượt thích</span>
                                <span className="font-bold text-gray-900">45</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Bình luận</span>
                                <span className="font-bold text-gray-900">12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
