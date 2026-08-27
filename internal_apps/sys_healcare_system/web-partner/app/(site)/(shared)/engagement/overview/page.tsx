"use client";
import React, { useState, useEffect } from 'react';
import engagementService from '@/services/engagement.service';

export default function EngagementOverviewPage() {
    const [activeTab, setActiveTab] = useState<'saved' | 'liked' | 'comments'>('saved');

    // Mock Data (fallback)
    const [stats, setStats] = useState({
        liked: 124,
        following: 15,
        videosWatched: 48,
        comments: 32
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await engagementService.getActivities();
                if (data && typeof data === 'object') {
                    setStats(prev => ({
                        liked: data.liked || prev.liked,
                        following: data.following || prev.following,
                        videosWatched: data.videosWatched || prev.videosWatched,
                        comments: data.comments || prev.comments,
                    }));
                }
            } catch (e) { console.error('Failed to fetch engagement stats:', e); }
        };
        fetchData();
    }, []);

    const savedPosts = [
        { id: 1, title: 'Cập nhật phác đồ điều trị Tăng huyết áp 2024', type: 'Article', date: '20/12/2024' },
        { id: 2, title: 'Webinar: Quản lý đái tháo đường thai kỳ', type: 'Video', date: '18/12/2024' },
    ];

    const likedItems = [
        { id: 1, title: 'Dr. Hai - Chuyên khoa Tim mạch', type: 'Doctor' },
        { id: 2, title: 'Bài viết: Dinh dưỡng cho trẻ nhỏ', type: 'Post' },
        { id: 3, title: 'Bệnh viện Đa khoa Quốc tế', type: 'Hospital' },
    ];

    const comments = [
        { id: 1, content: 'Bài viết rất hữu ích, cảm ơn bác sĩ!', post: 'Cập nhật phác đồ...', date: '21/12/2024', status: 'Approved' },
        { id: 2, content: 'Cho mình hỏi về liều dùng...', post: 'Hỏi đáp Dược lâm sàng', date: '19/12/2024', status: 'Pending' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Tổng quan Tương tác</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-3">
                        <i className="fi flaticon-heart"></i>
                    </div>
                    <p className="text-gray-500 text-sm">Đã yêu thích</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.liked}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-3">
                        <i className="fi flaticon-user-1"></i>
                    </div>
                    <p className="text-gray-500 text-sm">Đang theo dõi</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.following}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-3">
                        <i className="fi flaticon-video-camera"></i>
                    </div>
                    <p className="text-gray-500 text-sm">Video đã xem</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.videosWatched}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-3">
                        <i className="fi flaticon-comment"></i>
                    </div>
                    <p className="text-gray-500 text-sm">Bình luận</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.comments}</p>
                </div>
            </div>

            {/* Main Content Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`px-6 py-4 text-sm font-bold transition ${activeTab === 'saved' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <i className="fi flaticon-bookmark mr-2"></i> Đã lưu
                    </button>
                    <button
                        onClick={() => setActiveTab('liked')}
                        className={`px-6 py-4 text-sm font-bold transition ${activeTab === 'liked' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <i className="fi flaticon-heart mr-2"></i> Yêu thích
                    </button>
                    <button
                        onClick={() => setActiveTab('comments')}
                        className={`px-6 py-4 text-sm font-bold transition ${activeTab === 'comments' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <i className="fi flaticon-comment mr-2"></i> Bình luận
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'saved' && (
                        <div className="space-y-4">
                            {savedPosts.map(item => (
                                <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                                            <i className={`fi ${item.type === 'Video' ? 'flaticon-play-button' : 'flaticon-document'}`}></i>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.type} • Đã lưu ngày {item.date}</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-500 px-3 py-1 rounded-lg hover:bg-red-50 transition text-sm font-bold">
                                        Bỏ lưu
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'liked' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {likedItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl">
                                        {item.title[0]}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900">{item.title}</p>
                                        <p className="text-xs text-gray-500">{item.type}</p>
                                    </div>
                                    <i className="fi flaticon-heart text-red-500"></i>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'comments' && (
                        <div className="space-y-4">
                            {comments.map(cmt => (
                                <div key={cmt.id} className="p-4 border border-gray-100 rounded-xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-sm font-bold text-gray-900">Trên bài: <span className="text-primary">{cmt.post}</span></p>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${cmt.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {cmt.status === 'Approved' ? 'Đã duyệt' : 'Đang chờ'}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm italic">"{cmt.content}"</p>
                                    <p className="text-xs text-gray-400 mt-2 text-right">{cmt.date}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
