import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { Title } from '@/components/ui/Typography';
import { AiOutlinePlayCircle as PlayCircleOutlined } from 'react-icons/ai';

interface VideoData {
  thumbnail: string;
  title: string;
  duration: string;
  author: string;
  publishDate: string;
}

interface TopVideoProps {
  topVideo: VideoData;
}

const TopVideo: React.FC<TopVideoProps> = ({ topVideo }) => {
  if (!topVideo) return null;

  const { thumbnail, title, duration, author, publishDate } = topVideo;

  return (
    <div className="mt-4 relative group">
      <Link href="/" className="block">
        <Card className="p-0 overflow-hidden rounded-lg shadow-sm group-hover:shadow-soft transition-all duration-300 border-none relative bg-slate-900">
          <div className="aspect-[16/10] relative w-full">
            <img 
              src={thumbnail} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
              alt={title} 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-colors duration-300">
                <PlayCircleOutlined className="text-white text-6xl opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300 drop-shadow-lg" />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <Title level={3} className="text-white m-0 font-bold text-xl lg:text-2xl line-clamp-2 leading-snug drop-shadow-md">
                {title}
              </Title>
              <div className="flex items-center gap-3 mt-3 text-slate-300 text-sm font-medium">
                  <span>{author}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                  <span>{publishDate}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default TopVideo;