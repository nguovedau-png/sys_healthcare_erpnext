'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Avatar from '@/components/ui/Avatar';
import { AiOutlineFolder as FolderOutlined, AiOutlineArrowUp as ArrowUpOutlined, AiOutlineArrowDown as ArrowDownOutlined, AiOutlineMessage as MessageOutlined } from 'react-icons/ai';

const threads = [
    {
        id: 1,
        title: 'Top 10 thực phẩm giàu vitamin C giúp tăng đề kháng',
        author: 'Dinh Dưỡng Vàng',
        avatar: '/img/user/default.png',
        category: 'Dinh dưỡng',
        createdAt: '1 giờ trước',
        votes: 89,
        comments: 24,
        preview: 'Vitamin C đóng vai trò quan trọng trong việc tăng cường hệ miễn dịch. Dưới đây là danh sách các loại thực phẩm giàu vitamin C bạn nên bổ sung hàng ngày...',
        tags: ['Vitamin C', 'Đề kháng']
    },
    {
        id: 2,
        title: 'Chế độ ăn cho người tập Gym muốn tăng cơ giảm mỡ',
        author: 'Muscle Man',
        avatar: '/img/user/default.png',
        category: 'Dinh dưỡng',
        createdAt: '3 giờ trước',
        votes: 156,
        comments: 42,
        preview: 'Protein là yếu tố then chốt. Cần tính toán macro (Đạm/Béo/Tinh bột) phù hợp với cân nặng và cường độ tập luyện...',
        tags: ['Gym', 'Tăng cơ']
    },
    {
        id: 3,
        title: 'Có nên uống sữa hạt thay thế sữa bò hoàn toàn?',
        author: 'Healthy Life',
        avatar: '/img/user/default.png',
        category: 'Dinh dưỡng',
        createdAt: '1 ngày trước',
        votes: 45,
        comments: 15,
        preview: 'Sữa hạt đang là xu hướng, nhưng liệu nó có đủ dưỡng chất như sữa bò? Cùng phân tích ưu nhược điểm nhé...',
        tags: ['Sữa hạt', 'Sữa bò']
    }
];

export default function CategoryPage() {
    const params = useParams<{ slug: string }>();
    // Map slug to category name for demo
    const categoryNames: Record<string, string> = {
        nutrition: 'Dinh dưỡng',
        general: 'Sức khỏe chung',
        mental: 'Tâm lý',
        fitness: 'Thể dục & Thể thao',
        disease: 'Bệnh lý',
        obs: 'Sản phụ khoa',
        pediatrics: 'Nhi khoa'
    };

    const categoryName = categoryNames[params.slug] || 'Chuyên mục';

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            {/* Category Header */}
            <Card className="bg-surface p-10 rounded-lg border-border shadow-soft relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full -mr-12 -mt-12 transition-all"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-5 mb-4">
                        <div className="w-14 h-14 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-3xl shadow-soft">
                            <FolderOutlined />
                        </div>
                        <Title level={1} className="text-3xl font-black text-slate-900 m-0 tracking-tight">{categoryName}</Title>
                    </div>
                    <Paragraph className="text-slate-500 max-w-2xl text-base font-medium leading-relaxed m-0">
                        Nơi thảo luận, chia sẻ kiến thức và kinh nghiệm về các vấn đề liên quan đến {categoryName.toLowerCase()}.
                        Hãy cùng xây dựng cộng đồng khỏe mạnh!
                    </Paragraph>
                </div>
            </Card>

            {/* Thread List */}
            <div className="space-y-6">
                {threads.map((thread) => (
                    <div 
                        key={thread.id} 
                        className="bg-white rounded-3xl shadow-sm border border-slate-100 flex transition-all group overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer"
                    >
                        {/* Vote Sidebar */}
                        <div className="w-16 md:w-20 bg-slate-50/50 border-r border-slate-100 flex flex-col items-center py-6 gap-3 flex-shrink-0">
                            <button className="text-slate-300 hover:text-orange-500 hover:bg-orange-50 w-10 h-10 rounded-2xl flex items-center justify-center transition-all">
                                <ArrowUpOutlined className="text-xl font-black" />
                            </button>
                            <span className="font-black text-slate-800 text-base">{thread.votes}</span>
                            <button className="text-slate-300 hover:text-blue-500 hover:bg-blue-50 w-10 h-10 rounded-2xl flex items-center justify-center transition-all">
                                <ArrowDownOutlined className="text-xl font-black" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <Link href={`/forum/${thread.id}`} className="flex-1 p-6 md:p-8 min-w-0 flex flex-col">
                            {/* Meta Row */}
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-2 pr-3 border-r border-slate-100">
                                    <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200">
                                        <img src={thread.avatar} alt={thread.author} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-slate-900">{thread.author}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 border-r border-slate-100">
                                    <span className="text-primary">{thread.category}</span>
                                </div>
                                <div className="pl-3">
                                    <span>{thread.createdAt}</span>
                                </div>
                            </div>

                            {/* Title & Preview */}
                            <div className="mb-6 flex-1">
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 group-hover:text-primary transition-colors leading-snug tracking-tight">
                                    {thread.title}
                                </h3>
                                <p className="text-slate-500 text-sm md:text-base line-clamp-2 font-medium leading-relaxed">
                                    {thread.preview}
                                </p>
                            </div>

                            {/* Actions & Tags */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                    <MessageOutlined className="text-base" />
                                    {thread.comments} <span>bình luận</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {thread.tags.map((tag) => (
                                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-slate-50 text-slate-400 rounded-xl border border-slate-100 group-hover:border-primary/20 transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
