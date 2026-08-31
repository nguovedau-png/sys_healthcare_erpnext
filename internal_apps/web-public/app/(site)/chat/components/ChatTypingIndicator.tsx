'use client';

import React from 'react';

interface ChatTypingIndicatorProps {
  userName: string;
}

const ChatTypingIndicator: React.FC<ChatTypingIndicatorProps> = ({ userName }) => {
  return (
    <div className="flex items-center space-x-2 p-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
      </div>
      <span className="text-sm text-gray-500">{userName} đang nhập...</span>
    </div>
  );
};

export default ChatTypingIndicator;