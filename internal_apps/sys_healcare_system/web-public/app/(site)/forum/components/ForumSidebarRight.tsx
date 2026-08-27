'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { contentService } from '@/services/content.service';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import { AiOutlineTrophy as TrophyOutlined, AiOutlineCheck as CheckOutlined, AiOutlineRight as RightOutlined, AiOutlineFire as FireOutlined, AiOutlineEye as EyeOutlined, AiOutlineInfoCircle as InfoCircleOutlined } from 'react-icons/ai';

const TOP_CONTRIBUTORS = [
    { name: 'BS. Lê Phương Anh', title: 'Tim mạch', verified: true, avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80' },
    { name: 'DS. Nguyễn Tuấn', title: 'Dược sĩ', verified: true, avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80' },
    { name: 'Lan Hương', title: 'Thành viên tích cực', verified: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80' },
];

export default function ForumSidebarRight() {
    const [trendingTopics, setTrendingTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const result = await contentService.getForumTopics({ limit: 5 });
                setTrendingTopics(result.data || []);
            } catch (error) {
                console.error('Error fetching trending topics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    const formatViews = (count: number) => {
        return count > 999 ? `${Math.floor(count / 1000)}k` : count;
    };

    return (
        <div className="w-72 flex-shrink-0 hidden xl:block animate-in slide-in-from-right-4 duration-500">
            <div className="space-y-6 sticky top-24">

                {/* Top Contributors */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    {/* Section title */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
                        <div className="w-[3px] h-4 bg-primary rounded-full shrink-0"></div>
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Chuyên gia tích cực</span>
                    </div>
                    <div className="p-3 space-y-1">
                        {TOP_CONTRIBUTORS.map((c, idx) => (
                            <div key={idx} className="flex items-center gap-3 group cursor-pointer px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="relative shrink-0">
                                    <Avatar src={c.avatar} size={32} className="shadow-sm border-2 border-white" />
                                    {c.verified && (
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                                            <CheckOutlined className="text-white text-[7px]" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-primary transition-colors m-0">{c.name}</p>
                                    <p className="text-[11px] text-slate-400 uppercase tracking-wide m-0">{c.title}</p>
                                </div>
                                <RightOutlined className="text-slate-300 text-[9px] group-hover:text-primary transition-colors shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trending Topics */}
                <Card className="bg-surface rounded-lg border-border shadow-soft overflow-hidden p-0">
                    <div className="px-6 py-5 border-b border-border flex items-center gap-3">
                        <FireOutlined className="text-xl text-warning" />
                        <Title level={5} className="font-black text-slate-800 m-0 uppercase tracking-widest">Đang sôi nổi</Title>
                    </div>
                    <div className="p-5 space-y-5">
                        {loading ? (
                            <div className="text-sm font-bold text-slate-400 text-center py-4">Đang tải...</div>
                        ) : (
                            trendingTopics.slice(0, 5).map((topic, index) => (
                                <div key={topic.id} className="flex gap-4 items-start group">
                                    <span className={`text-xl font-black shrink-0 w-6 text-center ${
                                        index === 0 ? 'text-warning' : index === 1 ? 'text-slate-300' : index === 2 ? 'text-orange-500' : 'text-slate-200'
                                    }`}>
                                        {index + 1}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/forum/topic/${topic.id}`} className="text-sm font-bold text-slate-700 hover:text-primary line-clamp-2 transition-colors leading-snug">
                                            {topic.title}
                                        </Link>
                                        <div className="text-[11px] font-bold text-slate-400 mt-2 flex items-center gap-1.5 uppercase tracking-widest">
                                            <EyeOutlined className="text-info text-sm" /> {formatViews(topic.views || 0)} lượt xem
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Rules Block */}
                <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden border border-slate-800 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2 transition-all group-hover:scale-150 duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-primary border border-white/10">
                                <InfoCircleOutlined className="text-xl" />
                            </div>
                            <h5 className="font-black text-white m-0 uppercase tracking-[0.2em] text-sm">Nội quy</h5>
                        </div>
                        <p className="text-sm font-medium text-slate-300 leading-relaxed mb-8">
                            Tôn trọng thành viên khác. Không spam, quảng cáo trái phép hoặc chia sẻ thông tin y tế sai lệch.
                        </p>
                        <Link href="/forum/rules" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-all group/btn">
                            XEM CHI TIẾT 
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                                <RightOutlined className="text-[8px]" />
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
