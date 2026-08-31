'use client';

import React from 'react';

interface ChatSkeletonProps {
  type: 'list' | 'message';
  count?: number;
}

const ChatSkeleton: React.FC<ChatSkeletonProps> = ({ type, count = 3 }) => {
  const renderListSkeleton = () => (
    <div className="animate-pulse">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="flex items-center p-4 border-b border-gray-100">
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderMessageSkeleton = () => (
    <div className="animate-pulse p-4 space-y-4">
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
          {i % 2 === 0 && <div className="w-8 h-8 bg-gray-200 rounded-full" />}
          <div className={`mx-2 px-4 py-2 rounded-lg ${i % 2 === 0 ? 'bg-gray-200' : 'bg-blue-200'}`}>
            <div className="h-3 bg-gray-300 rounded w-32 mb-1" />
            <div className="h-2 bg-gray-300 rounded w-16" />
          </div>
          {i % 2 !== 0 && <div className="w-8 h-8 bg-gray-200 rounded-full" />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full">
      {type === 'list' ? renderListSkeleton() : renderMessageSkeleton()}
    </div>
  );
};

export default ChatSkeleton;