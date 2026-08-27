import React from 'react';
import Link from 'next/link';

interface TopicItem {
    id: string;
    title: string;
    author: {
        name: string;
        avatar: string;
    };
    stats: {
        views: number;
        replies: number;
        likes: number;
    };
    category: string;
    createdAt: string;
}

interface TopicCardProps {
    item: TopicItem;
}

const TopicCard: React.FC<TopicCardProps> = ({ item }) => {
    return (
        <div className="bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300 border border-gray-100 mb-3 group">
            <div className="flex items-start gap-4">
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                    <img
                        src={item.author.avatar}
                        alt={item.author.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            {item.category}
                        </span>
                        <span className="text-xs text-gray-400">
                            • {item.createdAt}
                        </span>
                    </div>

                    <Link href={`/forum/topic/${item.id}`} className="block">
                        <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {item.title}
                        </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center" title="Lượt xem">
                                <i className="fi flaticon-eye mr-1.5"></i> {item.stats.views.toLocaleString()}
                            </span>
                            <span className="flex items-center" title="Trả lời">
                                <i className="fi flaticon-chat-1 mr-1.5"></i> {item.stats.replies}
                            </span>
                            <span className="flex items-center" title="Lượt thích">
                                <i className="fi flaticon-like mr-1.5"></i> {item.stats.likes}
                            </span>
                        </div>

                        <div className="text-xs text-gray-500 font-medium">
                            Đăng bởi <span className="text-gray-900">{item.author.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicCard;
