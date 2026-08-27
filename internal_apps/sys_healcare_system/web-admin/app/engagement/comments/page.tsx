"use client";

import React, { useState, useEffect } from 'react';
import engagementService, { Comment, CommentStats, CommentStatus } from '@/services/engagement.service';

export default function CommentManagementPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [stats, setStats] = useState<CommentStats>({ pending: 0, spam: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const [cData, sData] = await Promise.all([
                engagementService.getComments(),
                engagementService.getCommentStats()
            ]);
            setComments(cData);
            setStats(sData);
        } catch (error) {
            console.error('Failed to fetch engagement data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = async (id: number, action: CommentStatus) => {
        if (action === 'DELETED' && !confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;
        try {
            await engagementService.updateCommentStatus(id, action);
            fetchData();
        } catch (error) {
            alert('Lỗi khi thực hiện hành động');
        }
    };

    const filteredComments = comments.filter(c =>
        c.userName.toLowerCase().includes(filter.toLowerCase()) ||
        c.content.toLowerCase().includes(filter.toLowerCase()) ||
        c.postTitle.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Bình luận & Tương tác</h1>

            <div className="flex gap-4 mb-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <p className="text-gray-500 text-xs uppercase font-bold">Chờ duyệt</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <p className="text-gray-500 text-xs uppercase font-bold">Báo cáo Spam</p>
                    <p className="text-2xl font-bold text-red-600">{stats.spam}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <p className="text-gray-500 text-xs uppercase font-bold">Tổng bình luận</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.total.toLocaleString()}</p>
                </div>
            </div>

            <div className="flex justify-between items-center mb-2">
                <div className="bg-white rounded-xl border border-gray-100 px-4 py-2 flex items-center gap-2 w-96">
                    <i className="fi flaticon-search text-gray-400"></i>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo người dùng, nội dung..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-transparent outline-none text-sm w-full"
                    />
                </div>
                <button onClick={fetchData} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                    <i className="fi flaticon-refresh"></i>
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Người dùng</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Nội dung</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 font-bold text-gray-700 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">Đang tải bình luận...</td>
                            </tr>
                        ) : filteredComments.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">Không tìm thấy bình luận nào</td>
                            </tr>
                        ) : filteredComments.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-gray-900">{item.userName}</p>
                                    <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                                </td>
                                <td className="px-6 py-4 max-w-md">
                                    <p className="text-gray-800 text-sm mb-1">{item.content}</p>
                                    <p className="text-xs text-blue-500 font-medium truncate">Trên: {item.postTitle}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold 
                                        ${item.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                            item.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                item.status === 'SPAM' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {item.status !== 'APPROVED' && (
                                            <button onClick={() => handleAction(item.id, 'APPROVED')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg tooltip" title="Duyệt">
                                                <i className="fi flaticon-checked"></i>
                                            </button>
                                        )}
                                        {item.status !== 'SPAM' && (
                                            <button onClick={() => handleAction(item.id, 'SPAM')} className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg tooltip" title="Báo Spam">
                                                <i className="fi flaticon-warning"></i>
                                            </button>
                                        )}
                                        <button onClick={() => handleAction(item.id, 'DELETED')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg tooltip" title="Xóa">
                                            <i className="fi flaticon-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
