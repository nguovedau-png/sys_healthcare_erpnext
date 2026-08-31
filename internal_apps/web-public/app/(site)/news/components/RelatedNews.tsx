import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import contentService, { Post } from '@/services/content.service';
import { Title, Text } from '@/components/ui/Typography';
import Card from '@/components/ui/Card';
import Spin from '@/components/ui/Spin';
import { AiOutlineEye as EyeOutlined, AiOutlineClockCircle as ClockCircleOutlined, AiOutlineRead as ReadOutlined } from 'react-icons/ai';

const RelatedNews: React.FC = () => {
    const [relatedItems, setRelatedItems] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await contentService.getPosts();
                const data = response.data || response;
                setRelatedItems(Array.isArray(data) ? data.filter((item: any) => item.isActive).slice(0, 3) : []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="py-12 flex justify-center">
                <Spin tip="Đang tải bài viết liên quan..." />
            </div>
        );
    }

    if (relatedItems.length === 0) return null;

    return (
        <div className="animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ReadOutlined className="text-xl" />
                </div>
                <Title level={4} className="m-0 font-black tracking-tight text-slate-900 uppercase">Bài viết liên quan</Title>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedItems.map((item: any) => (
                    <Link key={item.id} href={`/news/${item.id}`} className="block h-full">
                        <Card hoverable className="group h-full bg-surface rounded-lg p-4 shadow-soft border-border overflow-hidden transition-all">
                            <div className="aspect-video rounded-lg overflow-hidden mb-6 relative shadow-soft">
                                <img
                                    src={item.thumbnail || '/img/placeholder.png'}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="px-2">
                                <Title level={5} className="font-black text-slate-800 group-hover:text-primary transition-colors line-clamp-2 text-base leading-snug mb-4">
                                    {item.title}
                                </Title>
                                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4 border-t border-slate-50">
                                    <span className="flex items-center gap-1.5"><ClockCircleOutlined className="text-primary" /> {item.date}</span>
                                    <span className="flex items-center gap-1.5"><EyeOutlined className="text-primary" /> {item.view || 0}</span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedNews;
