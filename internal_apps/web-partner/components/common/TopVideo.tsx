import React from 'react';
import _ from 'lodash';
import Ratio from 'react-ratio';

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
  if (!topVideo) {
    return null;
  }

  const { thumbnail, title, duration, author, publishDate } = topVideo;

  return (
    <div className="mt-[15px] relative group">
      <a href="/" className="block">
        <Ratio
          ratio={16 / 10}
          className="overflow-hidden rounded-[7px] block relative"
        >
          <img src={thumbnail} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt={title} />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center">
            <i className="fi flaticon-play text-white text-2xl mr-2.5"></i>
            <h4 className="text-white m-0 font-medium text-lg lg:text-xl line-clamp-2">{title}</h4>
          </div>
        </Ratio>
      </a>
    </div>
  );
};

export default TopVideo;