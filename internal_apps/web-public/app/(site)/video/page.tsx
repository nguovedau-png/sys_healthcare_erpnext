"use client";
import React from 'react';
import Link from 'next/link';
import Banner from '@/components/common/Banner';
// @ts-ignore
import { LATEST_VIDEOS } from '@/components/common/Constant'; // Correct constant

const VideoCategory = () => {
  // Use LATEST_VIDEOS and duplicate to simulate more content
  // @ts-ignore
  const videos = [...LATEST_VIDEOS, ...LATEST_VIDEOS, ...LATEST_VIDEOS];

  return (
    <>
      <Banner page="video" />
      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="container mx-auto px-4">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-poppins relative inline-block">
                Video & Tư vấn Sức khỏe
                <span className="absolute bottom-1 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
              </h1>
              <p className="text-gray-500 max-w-2xl">
                Tổng hợp video tư vấn từ các bác sĩ chuyên khoa, chuyên gia dinh dưỡng và các buổi Livestream chia sẻ kiến thức y khoa.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">Mới nhất</button>
              <button className="px-5 py-2 rounded-full bg-white text-gray-600 border border-gray-200 text-sm font-bold hover:bg-gray-50 hover:text-primary transition-all">Xem nhiều</button>
              <button className="px-5 py-2 rounded-full bg-white text-gray-600 border border-gray-200 text-sm font-bold hover:bg-gray-50 hover:text-primary transition-all">Livestream</button>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* @ts-ignore */}
            {videos.map((video: any, index: number) => (
              <div key={index} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={video.thumbnail || "/img/news/video-placeholder.jpg"}
                    alt={video.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <i className="fi flaticon-play-button text-primary text-sm ml-1"></i>
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer" title={video.title}>
                    <Link href="#">{video.title}</Link>
                  </h3>

                  <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <i className="fi flaticon-doctor text-gray-400"></i>
                      <span className="truncate max-w-[100px]">{video.author}</span>
                    </div>
                    <span>{video.publishDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-full shadow-sm hover:shadow-md hover:text-primary hover:border-primary transition-all flex items-center gap-2 mx-auto">
              Xem thêm video <i className="fi flaticon-down-arrow text-xs"></i>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default VideoCategory;