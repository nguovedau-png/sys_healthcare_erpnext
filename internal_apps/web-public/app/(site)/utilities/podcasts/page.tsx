"use client";

import React from 'react';
import Banner from '@/components/common/Banner';

const PODCASTS = [
    { id: 1, title: 'Sống khỏe mỗi ngày', host: 'BS. Nguyễn Văn A', episodes: 45, image: '/img/podcast-1.jpg' },
    { id: 2, title: 'Tâm lý & Cuộc sống', host: 'ThS. Trần Thị B', episodes: 32, image: '/img/podcast-2.jpg' },
    { id: 3, title: 'Dinh dưỡng thực chiến', host: 'Chuyên gia Lê C', episodes: 28, image: '/img/podcast-3.jpg' },
];

export default function PodcastsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Podcast Y tế</h1>
                <p className="text-gray-500 mb-12">Nghe chuyên gia chia sẻ mọi lúc mọi nơi</p>

                <div className="space-y-6">
                    {PODCASTS.map(podcast => (
                        <div key={podcast.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex gap-6 hover:shadow-lg transition-all">
                            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <i className="fi flaticon-podcast text-5xl text-white"></i>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{podcast.title}</h3>
                                <p className="text-gray-500 mb-4">Với {podcast.host}</p>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-400">{podcast.episodes} tập</span>
                                    <button className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-green-600">
                                        <i className="fi flaticon-play mr-2"></i> Nghe ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
