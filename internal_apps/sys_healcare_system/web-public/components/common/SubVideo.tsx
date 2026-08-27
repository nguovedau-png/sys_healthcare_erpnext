import React from 'react';
import Link from 'next/link';
import { Title } from '@/components/ui/Typography';
import { AiOutlinePlayCircle as PlayCircleOutlined } from 'react-icons/ai';

interface VideoData {
  thumbnail: string;
  title: string;
  duration: string;
  author: string;
  publishDate: string;
}

interface SubVideoProps {
  videoList: VideoData;
}

const SubVideo: React.FC<SubVideoProps> = ({ videoList }) => {
  if (!videoList) return null;

  const { thumbnail, title, duration } = videoList;

  return (
    <div className="mb-4 last:mb-0 group cursor-pointer p-2 hover:bg-slate-50 rounded-xl transition-colors duration-200 -mx-2">
      <Link href="/" className="flex gap-4">
        <div className="w-[120px] shrink-0">
          <div className="aspect-[16/10] overflow-hidden rounded-lg relative bg-slate-900 border border-slate-100 shadow-sm group-hover:shadow-soft transition-all">
            <img 
              src={thumbnail} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
              alt={title} 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
              <PlayCircleOutlined className="text-white text-3xl opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all drop-shadow-md" />
            </div>
            <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded shadow-sm">
              {duration}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <Title level={5} className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-2 leading-snug m-0">
            {title}
          </Title>
        </div>
      </Link>
    </div>
  );
};

export default SubVideo;