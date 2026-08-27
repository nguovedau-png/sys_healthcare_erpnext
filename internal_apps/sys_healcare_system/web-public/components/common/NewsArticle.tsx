import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Link from 'next/link';
import { convertNum } from './Utilities';
import Card from '@/components/ui/Card';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import { AiOutlinePlayCircle as PlayCircleOutlined, AiOutlineEye as EyeOutlined, AiOutlineMessage as MessageOutlined } from 'react-icons/ai';

export interface Author {
  name: string;
  avatar: string;
}

export interface Comments {
  length: number;
}

export interface NewsData {
  thumbnail: string;
  title: string;
  author: Author;
  publishDate: string;
  desc: string;
  view: number;
  comments: Comments;
  slug: string;
  type: string;
}

export interface NewsArticleProps {
  data: NewsData;
  role: 'highlightTop' | 'highlightSub' | 'latestTop' | 'latestSub' | 'mostview' | 'categoriesTop' | 'categoriesSub' | 'profile' | 'userNewsFeed';
}

const NewsArticle: React.FC<NewsArticleProps> = ({ data, role }) => {
  if (!data) return null;

  const { thumbnail, title, author, publishDate, desc, view, comments, slug, type } = data;

  const isHighlightTop = role === 'highlightTop';
  const isLatestTop = role === 'latestTop';
  const isHighlightSub = role === 'highlightSub';
  const isLatestSub = role === 'latestSub';
  const isMostView = role === 'mostview';
  const isProfile = role === 'profile';
  const isCategoriesTop = role === 'categoriesTop';
  const isCategoriesSub = role === 'categoriesSub';
  const isUserNewsFeed = role === 'userNewsFeed';

  // Determine layout structure based on role
  // Top/Featured articles use a side-by-side or large stacked layout
  // Sub articles use a smaller stacked or compact side-by-side layout

  if (isHighlightTop || isLatestTop) {
    return (
      <Card hoverable className="p-0 overflow-hidden bg-surface rounded-lg shadow-soft mb-6 group transition-all duration-300">
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-3/5 h-[300px] md:h-auto relative overflow-hidden">
             <Link href={slug} className="block w-full h-full">
               <img src={thumbnail} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               {type === 'video' && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                   <PlayCircleOutlined className="text-white text-6xl opacity-90" />
                 </div>
               )}
             </Link>
          </div>
          <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <Link href={slug} className="block mb-3">
                <Title level={3} className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-3">
                  {title}
                </Title>
              </Link>
              <Paragraph type="secondary" className="text-sm line-clamp-3 mb-6">
                {desc}
              </Paragraph>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 flex-shrink-0">
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <Text className="text-sm font-bold text-slate-900 block leading-tight">{author.name}</Text>
                <Text type="secondary" className="text-xs">{publishDate}</Text>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (isHighlightSub || isLatestSub || isUserNewsFeed) {
    return (
      <Card hoverable className="p-4 bg-surface rounded-lg shadow-sm mb-4 group transition-all duration-300 hover:shadow-soft">
        <div className="flex gap-4">
           <div className="w-[120px] shrink-0">
             <Link href={slug} className="block w-full aspect-[4/3] rounded-xl overflow-hidden relative">
               <img src={thumbnail} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               {type === 'video' && <PlayCircleOutlined className="absolute bottom-2 right-2 text-white text-2xl drop-shadow-md" />}
             </Link>
           </div>
           <div className="flex-1 min-w-0 flex flex-col justify-between">
              <Link href={slug} className="block mb-2">
                <Title level={5} className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2 m-0">
                  {title}
                </Title>
              </Link>
              <div className="flex items-center gap-2 mt-auto">
                 {!isLatestSub && !isCategoriesSub && (
                   <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                     <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                   </div>
                 )}
                 <Text type="secondary" className="text-xs truncate">
                    {!isLatestSub && !isCategoriesSub ? `${author.name} • ` : ''}{publishDate}
                 </Text>
              </div>
           </div>
        </div>
      </Card>
    );
  }

  // Default layout for categories, most view, profile
  return (
    <Card hoverable className="p-0 overflow-hidden bg-surface rounded-lg shadow-sm mb-6 group transition-all duration-300 hover:shadow-soft flex flex-col h-full border border-slate-100">
      <Link href={slug} className="block w-full aspect-[16/10] overflow-hidden relative">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayCircleOutlined className="text-white text-5xl opacity-90 group-hover:scale-110 transition-transform" />
          </div>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <Link href={slug} className="block mb-2">
          <Title level={4} className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2 m-0">
            {title}
          </Title>
        </Link>
        {(isMostView || isProfile || isCategoriesTop) && (
          <Paragraph type="secondary" className="text-sm line-clamp-2 mb-4 flex-1">
            {desc}
          </Paragraph>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2">
            {!isCategoriesSub && (
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-slate-100">
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex flex-col">
              {!isCategoriesSub && <Text className="text-[10px] font-bold text-slate-700 leading-none mb-0.5">{author.name}</Text>}
              <Text type="secondary" className="text-[10px] leading-none">{publishDate}</Text>
            </div>
          </div>
          
          {(isMostView || isProfile) && (
            <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
              <span className="flex items-center gap-1"><EyeOutlined /> {convertNum(view, 0)}</span>
              <span className="flex items-center gap-1"><MessageOutlined /> {comments?.length || 0}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NewsArticle;