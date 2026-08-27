"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import liveService, { Livestream } from '@/services/live.service';

export default function LiveListPage() {
    const [sessions, setSessions] = useState<Livestream[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSessions = async () => {
        console.log('Fetching sessions...');
        try {
            const data = await liveService.getLiveSessions();
            setSessions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch sessions', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa buổi live này?')) return;
        try {
            await liveService.deleteLiveSession(id);
            setSessions(sessions.filter(s => s.id !== id));
        } catch (error) {
            alert('Lỗi khi xóa buổi live');
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    if (loading) return <div className="p-12 text-center text-gray-500 italic">Đang tải danh sách...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý Livestream</h1>
                    <p className="text-gray-500 text-sm mt-1">Danh sách các buổi phát trực tiếp và hội thảo.</p>
                </div>
                <Link href="/live/create" className="px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition shadow-lg flex items-center gap-2">
                    <i className="fi flaticon-plus"></i> Tạo buổi live mới
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 font-bold text-sm">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Tiêu đề</th>
                            <th className="px-6 py-4">Nền tảng</th>
                            <th className="px-6 py-4">Trạng thái</th>
                            <th className="px-6 py-4 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sessions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                                    Chưa có buổi live nào. Hãy tạo mới ngay!
                                </td>
                            </tr>
                        ) : (
                            sessions.map((session) => (
                                <tr key={session.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-500">#{session.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div className="flex flex-col">
                                            <span>{session.title}</span>
                                            <span className="text-xs text-gray-400 font-normal truncate max-w-xs">{session.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-bold rounded-lg ${session.provider === 'WEBRTC' ? 'bg-blue-100 text-blue-600' :
                                            session.provider === 'ZOOM' ? 'bg-sky-100 text-sky-600' :
                                                session.provider === 'AGORA' ? 'bg-purple-100 text-purple-600' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>
                                            {session.provider}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {session.isStreaming ? (
                                            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full animate-pulse">
                                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div> On Air
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-sm">Offline</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/live/${session.id}`} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium transition">
                                                Chi tiết
                                            </Link>
                                            <button onClick={() => handleDelete(session.id)} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium transition">
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
