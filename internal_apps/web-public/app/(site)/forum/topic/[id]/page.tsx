'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { contentService } from '@/services/content.service';
import Spin from '@/components/ui/Spin';
import { message } from '@/components/ui/Message';

interface Comment {
    id: number;
    authorName: string;
    content: string;
    createdAt: string;
    votes?: number;
}

export default function ThreadDetail() {
    const params = useParams<{ id: string }>();
    const [topic, setTopic] = useState<any>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchTopic = async () => {
            if (!params.id) return;
            setLoading(true);
            try {
                const data = await contentService.getForumTopic(parseInt(params.id as string));
                setTopic(data);
                setComments(data.replies || []);
            } catch (err) {
                console.error('Error fetching topic:', err);
                setError('Không thể tải bài viết');
            } finally {
                setLoading(false);
            }
        };
        fetchTopic();
    }, [params.id]);

    const handleSubmitComment = async () => {
        if (!commentText.trim()) {
            message.error('Vui lòng nhập nội dung bình luận');
            return;
        }
        setSubmitting(true);
        try {
            await contentService.createForumReply(
                parseInt(params.id as string),
                commentText,
                'user1',
                'User'
            );
            const newComment: Comment = {
                id: Date.now(),
                authorName: 'User',
                content: commentText,
                createdAt: new Date().toISOString(),
                votes: 0,
            };
            setComments([...comments, newComment]);
            setCommentText('');
            message.success('Bình luận thành công!');
        } catch (error) {
            console.error('Error submitting comment:', error);
            message.error('Không thể gửi bình luận');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-gray-100">
                <Spin size="large" />
                <p className="mt-4 text-gray-400 font-medium text-sm">Đang tải...</p>
            </div>
        );
    }

    if (error || !topic) {
        return (
            <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fi flaticon-warning text-gray-300 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy bài viết</h3>
                <p className="text-gray-500 mb-6">Bài viết này có thể đã bị xóa hoặc không tồn tại.</p>
                <Link href="/forum" className="inline-flex items-center gap-2 text-primary font-bold">
                    <i className="fi flaticon-arrow-left"></i> Quay lại diễn đàn
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Thread Header & Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex">
                    {/* Vote Sidebar */}
                    <div className="w-16 bg-gray-50 flex flex-col items-center py-6 gap-2 border-r border-gray-100">
                        <button className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm text-gray-400 hover:text-orange-500 transition-all flex items-center justify-center">
                            <i className="fi flaticon-up-arrow font-bold text-xl"></i>
                        </button>
                        <span className="font-extrabold text-gray-900 text-lg">{topic.views || 0}</span>
                        <button className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm text-gray-400 hover:text-blue-500 transition-all flex items-center justify-center">
                            <i className="fi flaticon-down-arrow font-bold text-xl"></i>
                        </button>
                    </div>

                    <div className="flex-1 p-6 md:p-8">
                        {/* Breadcrumb / Meta */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Link href="/forum" className="hover:text-primary transition-colors">Diễn đàn</Link>
                            <i className="fi flaticon-next text-[10px]"></i>
                            <span className="text-primary font-medium">{topic.category}</span>
                        </div>

                        {/* Title & Author */}
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
                            {topic.title}
                        </h1>

                        <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full ring-2 ring-white shadow-sm overflow-hidden bg-indigo-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">{topic.authorName?.charAt(0)?.toUpperCase()}</span>
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 text-base">{topic.authorName}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                        <span>{topic.createdAt ? new Date(topic.createdAt).toLocaleDateString('vi-VN') : ''}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><i className="fi flaticon-eye"></i> {topic.views?.toLocaleString()} lượt xem</span>
                                    </div>
                                </div>
                            </div>
                            <button className="hidden md:flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors">
                                <i className="fi flaticon-share"></i> Chia sẻ
                            </button>
                        </div>

                        {/* Main Body */}
                        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-8 whitespace-pre-line">
                            {topic.content}
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all transform hover:-translate-y-0.5">
                                <i className="fi flaticon-speech-bubble"></i> Bình luận
                            </button>
                            <button className="flex items-center gap-2 bg-gray-100 text-gray-700 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors">
                                <i className="fi flaticon-bookmark"></i> Lưu
                            </button>
                            <button className="md:hidden flex items-center gap-2 bg-gray-50 text-gray-600 font-medium px-4 py-2.5 rounded-xl ml-auto">
                                <i className="fi flaticon-menu"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-gray-900 border-l-4 border-primary pl-3">
                        Bình luận <span className="text-gray-400 font-normal ml-1">({comments.length})</span>
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Sắp xếp theo:</span>
                        <select className="border-none bg-transparent font-bold text-gray-900 focus:ring-0 cursor-pointer">
                            <option>Hay nhất</option>
                            <option>Mới nhất</option>
                            <option>Cũ nhất</option>
                        </select>
                    </div>
                </div>

                {/* Input Area */}
                <div className="flex gap-4 mb-10">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0">
                        <img src="/img/user/default.png" alt="User" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <div className="relative">
                            <textarea
                                rows={3}
                                className="w-full border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none shadow-inner bg-gray-50 focus:bg-white"
                                placeholder="Chia sẻ kinh nghiệm hoặc đặt câu hỏi..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            ></textarea>
                            <div className="absolute right-3 bottom-3 flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Chèn ảnh"><i className="fi flaticon-picture"></i></button>
                                <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Emoji"><i className="fi flaticon-smile"></i></button>
                            </div>
                        </div>
                        <div className="flex justify-end mt-3">
                            <button 
                                onClick={handleSubmitComment}
                                disabled={submitting || !commentText.trim()}
                                className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments List */}
                {comments.length > 0 ? (
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                                        <span className="text-white font-bold">{comment.authorName?.charAt(0)?.toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-bold text-gray-900">{comment.authorName}</span>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-xs text-gray-500">
                                                {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('vi-VN') : ''}
                                            </span>
                                        </div>
                                        <div className="text-gray-800 leading-relaxed">
                                            {comment.content}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 ml-3 text-xs font-bold text-gray-500">
                                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                            <i className="fi flaticon-like"></i> Thích ({comment.votes || 0})
                                        </button>
                                        <button className="hover:text-gray-900 transition-colors">Trả lời</button>
                                        <button className="hover:text-gray-900 transition-colors">Chia sẻ</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fi flaticon-speech-bubble text-gray-300 text-3xl"></i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Chưa có bình luận nào</h3>
                        <p className="text-gray-500">Hãy là người đầu tiên bình luận!</p>
                    </div>
                )}
            </div>
        </div>
    );
}