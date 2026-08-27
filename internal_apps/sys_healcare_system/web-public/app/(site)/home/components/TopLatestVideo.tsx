import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import TopVideo from '@/components/common/TopVideo';
import SubVideo from '@/components/common/SubVideo';
import { contentService, Video } from '@/services/content.service';

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

interface SubVideoProps {
  videoList: VideoData;
}

const TopLatestVideo: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const result = await contentService.getVideos();
        setVideos(result || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const videoData: VideoData[] = videos.map((v) => ({
    thumbnail: v.thumbnail || '',
    title: v.title,
    duration: v.duration,
    author: v.author,
    publishDate: v.date,
  }));

  if (loading || videoData.length === 0) {
    return null;
  }

  return (
    <div className="video-bg">
      <div className="flex flex-wrap -mx-[10px]">
        <div className="w-full xl:w-3/4 px-[10px]">
          <TopVideo topVideo={videoData[0]} />
        </div>
        <div className="w-full xl:w-1/4 px-[10px] xl:px-2 lg:p-4 lg:pt-2 pl-0">
          <h2 className="text-xl font-bold mb-4">Mới nhất</h2>

          <div className="video-list sub-video max-h-[400px] overflow-y-auto custom-scrollbar">
            <div className="flex flex-wrap -mx-[5px]">
              {_.map(_.drop(videoData, 1), (item: VideoData, i: number) =>
                <div className="w-full lg:w-1/2 xl:w-full px-[5px] mb-4" key={i}>
                  <SubVideo videoList={item} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLatestVideo;