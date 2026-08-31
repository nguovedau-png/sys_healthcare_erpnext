'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { contentService } from '@/services/content.service';
import Spin from '@/components/ui/Spin';
import Pagination from '@/components/ui/Pagination';
import Empty from '@/components/ui/Empty';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { AiOutlineFire as FireOutlined, AiOutlineThunderbolt as ThunderboltOutlined, AiOutlineStar as StarOutlined, AiOutlineArrowUp as ArrowUpOutlined, AiOutlineArrowDown as ArrowDownOutlined, AiOutlineMessage as MessageOutlined, AiOutlineEye as EyeOutlined, AiOutlineCheckCircle as CheckCircleOutlined } from 'react-icons/ai';

const FILTER_OPTS = [
    { key: 'hot', label: 'Nổi bật', icon: <FireOutlined /> },
    { key: 'new', label: 'Mới nhất', icon: <ThunderboltOutlined /> },
    { key: 'top', label: 'Top tuần', icon: <StarOutlined /> },
];

export default function ForumHome() {
    const [topics, setTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({ page: 1, limit: 10 });
    const [filter, setFilter] = useState('hot');

    useEffect(() => {
        fetchTopics();
    }, [pagination.page, filter]);

    const fetchTopics = async () => {
        setLoading(true);
        try {
            const response = await contentService.getForumTopics({
                page: pagination.page,
                limit: pagination.limit
            });
            setTopics(response.data || []);
            setTotal(response.meta?.total || 0);
        } catch (error) {
            console.error('Error fetching topics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
            {/* Filter Tabs */}
            <div className="bg-white rounded-lg border border-slate-100 shadow-sm p-3 flex items-center gap-3">
                {FILTER_OPTS.map(f => (
                    <Button
                        key={f.key}
                        variant={filter === f.key ? 'primary' : 'text'}
                        onClick={() => { setFilter(f.key); setPagination(prev => ({ ...prev, page: 1 })); }}
                        icon={f.icon}
                        className={`rounded-xl px-6 h-11 font-bold ${filter !== f.key && 'text-slate-500 hover:text-primary hover:bg-primary/5'}`}
                    >
                        {f.label}
                    </Button>
                ))}
                <div className="ml-auto text-xs font-black uppercase tracking-widest text-slate-400 px-4 hidden md:block">
                    {total > 0 && `${total.toLocaleString()} CHỦ ĐỀ`}
                </div>
            </div>

            {/* Thread Items */}
            {loading ? (
                <Card className="flex flex-col items-center justify-center py-32 bg-surface rounded-lg border-border shadow-soft">
                    <Spin size="large" tip="Đang tải thảo luận..." />
                </Card>
            ) : topics.length > 0 ? (
                <>
                    <div className="space-y-4 mb-10">
                        {topics.map((thread) => (
                            <div
                                key={thread.id}
                                className="group bg-white rounded-lg border border-slate-100 shadow-sm flex overflow-hidden transition-all hover:shadow-md hover:border-slate-200"
                            >
                                {/* Upvote column */}
                                <div className="w-14 bg-slate-50 flex flex-col items-center justify-center py-4 gap-1.5 border-r border-slate-100 shrink-0">
                                    <button className="w-8 h-8 rounded-lg text-slate-400 hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-colors">
                                        <ArrowUpOutlined className="text-base" />
                                    </button>
                                    <span className="font-bold text-slate-700 text-sm tabular-nums">
                                        {thread.views > 999 ? `${Math.floor(thread.views / 1000)}k` : thread.views}
                                    </span>
                                    <button className="w-8 h-8 rounded-lg text-slate-400 hover:bg-error/10 hover:text-error flex items-center justify-center transition-colors">
                                        <ArrowDownOutlined className="text-base" />
                                    </button>
                                </div>

                                {/* Thread content */}
                                <Link href={`/forum/topic/${thread.id}`} className="flex-1 p-4 block min-w-0">
                                    {/* Meta row */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-white shadow-sm shrink-0">
                                            {thread.authorName?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-xs font-semibold text-slate-600 truncate">{thread.authorName || 'Ẩn danh'}</span>
                                        {thread.category && (
                                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                                                #{thread.category}
                                            </span>
                                        )}
                                        <span className="text-[11px] text-slate-400 ml-auto shrink-0">
                                            {thread.createdAt ? new Date(thread.createdAt).toLocaleDateString('vi-VN') : ''}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <p className="text-[15px] font-bold text-slate-800 mb-2.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                        {thread.title}
                                    </p>

                                    {/* Stats row */}
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                            <MessageOutlined className="text-primary text-[12px]" />
                                            {thread._count?.replies || 0} phản hồi
                                        </span>
                                        <span className="text-slate-200">·</span>
                                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                            <EyeOutlined className="text-slate-400 text-[12px]" />
                                            {thread.views?.toLocaleString()} lượt xem
                                        </span>
                                        {(thread._count?.replies || 0) > 5 && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-success ml-auto">
                                                <CheckCircleOutlined className="text-[11px]" />
                                                Bác sĩ đã trả lời
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Pagination
                            current={pagination.page}
                            total={total}
                            pageSize={pagination.limit}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div>
                </>
            ) : (
                <Card className="py-24 bg-surface rounded-lg border-border flex flex-col items-center justify-center text-center shadow-soft">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-sm">
                        <MessageOutlined className="text-slate-300 text-4xl" />
                    </div>
                    <Title level={3} className="text-2xl font-black text-slate-800 mb-3">Chưa có chủ đề nào</Title>
                    <Paragraph type="secondary" className="mb-8 font-medium">Hãy là người đầu tiên đặt câu hỏi cho cộng đồng.</Paragraph>
                    <Link href="/forum/create">
                        <Button variant="primary" size="large" className="rounded-lg font-black px-8">
                            Tạo chủ đề đầu tiên
                        </Button>
                    </Link>
                </Card>
            )}
        </div>
    );
}
