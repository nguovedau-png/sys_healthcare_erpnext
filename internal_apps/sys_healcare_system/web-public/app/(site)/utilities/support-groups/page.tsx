"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const GROUPS = [
    { name: 'Cộng đồng Tiểu đường', members: 1250, posts: 450, image: '🩺' },
    { name: 'Hỗ trợ Ung thư', members: 850, posts: 320, image: '🎗️' },
    { name: 'Sống chung với Trầm cảm', members: 2100, posts: 890, image: '💙' },
];

export default function SupportGroupsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Nhóm Hỗ trợ Bệnh nhân</h1>
                <p className="text-gray-500 mb-12">Cộng đồng người cùng cảnh ngộ - Chia sẻ & Động viên</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {GROUPS.map((group, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all">
                            <div className="text-6xl mb-6 text-center">{group.image}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{group.name}</h3>
                            <div className="flex justify-around text-center mb-6">
                                <div>
                                    <div className="text-2xl font-bold text-primary">{group.members}</div>
                                    <div className="text-xs text-gray-500">Thành viên</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{group.posts}</div>
                                    <div className="text-xs text-gray-500">Bài viết</div>
                                </div>
                            </div>
                            <button className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark">
                                Tham gia nhóm
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
