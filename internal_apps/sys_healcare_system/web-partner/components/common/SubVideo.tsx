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

interface SubVideoProps {
  videoList: VideoData;
}

const SubVideo: React.FC<SubVideoProps> = ({ videoList }) => {
  if (!videoList) {
    return null;
  }

  const { thumbnail, title, duration, author, publishDate } = videoList;

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex flex-wrap -mx-[5px]">
        <div className="w-[40%] px-[5px]">
          <a href="/" className="block">
            <Ratio
              ratio={16 / 10}
              className="overflow-hidden rounded-[5px] block relative group"
            >
              <img src={thumbnail} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt={title} />
              <span className="absolute bottom-[5px] right-[5px] bg-black/70 text-white text-[10px] px-[5px] py-[2px] rounded">{duration}</span>
            </Ratio>
          </a>
        </div>
        <div className="w-[60%] px-[5px] pl-0">
          <a href="/" className="text-[14px] font-medium text-text-main line-clamp-2 hover:text-secondary no-underline leading-5">
            {title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubVideo;