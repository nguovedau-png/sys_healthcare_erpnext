import React from 'react';
import _ from 'lodash';
import Link from 'next/link';
import { TOP_FORUM_POSTS } from '@/components/common/Constant';
import Card from '@/components/ui/Card';
import { Title, Text } from '@/components/ui/Typography';
import { AiOutlineEye as EyeOutlined, AiOutlineMessage as MessageOutlined } from 'react-icons/ai';

interface Author {
  userId: string;
  name: string;
  avatar: string;
}

interface ForumPost {
  author: Author;
  title: string;
  link: string;
  views: number;
  comments: number;
}

const TopForum: React.FC = () => {
  const data = TOP_FORUM_POSTS as ForumPost[];

  return (
    <div className="mb-0 lg:mb-0 mt-8 md:mt-0">
      <Card className="bg-surface rounded-lg p-6 shadow-sm border-border h-full flex flex-col">
        <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <Title level={4} className="text-xl font-black text-slate-900 m-0 uppercase tracking-tight">
            Sôi nổi trên diễn đàn
          </Title>
        </div>
        
        <div className="flex flex-col gap-5 flex-1">
          {_.map(data, (item: ForumPost, i: number) =>
            <div className="group" key={i}>
              <div className="flex items-center gap-2 mb-2">
                <Link href={`/user${item.author.userId}`} className="w-6 h-6 overflow-hidden block rounded-full border border-slate-100 flex-shrink-0">
                  <img src={item.author.avatar} className="w-full h-full object-cover" alt={item.author.name} />
                </Link>
                <Link href={`/user${item.author.userId}`} className="no-underline">
                  <Text className="text-[11px] font-bold text-slate-700 group-hover:text-primary transition-colors">{item.author.name}</Text>
                </Link>
              </div>
              <Link href={item.link} className="block group/link mb-2">
                <Title level={5} className="text-[15px] font-bold text-slate-900 leading-snug line-clamp-2 group-hover/link:text-primary transition-colors m-0">
                  {item.title}
                </Title>
              </Link>
              <div className="flex items-center gap-4 text-slate-400 text-[11px] font-medium">
                <div className="flex items-center gap-1.5">
                  <EyeOutlined className="text-[13px]" />
                  <span>{item.views}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageOutlined className="text-[13px]" />
                  <span>{item.comments}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 text-center">
          <Link href="/forum" className="inline-block text-primary font-bold text-sm hover:text-primary-dark transition-colors">
            Xem thêm thảo luận
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default TopForum;