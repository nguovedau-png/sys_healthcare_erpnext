'use client';

import React from 'react';

const ChatEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-500">
      <div className="text-6xl mb-4">💬</div>
      <h3 className="text-xl font-semibold mb-2">Chào mừng đến với Tin nhắn</h3>
      <p className="text-center max-w-md px-4">
        Chọn một cuộc trò chuyện từ danh sách bên trái hoặc bắt đầu một cuộc trò chuyện mới
        để gửi tin nhắn riêng tư hoặc tạo nhóm chat.
      </p>
      <button
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => {
          // TODO: Implement new chat creation
          console.log('Create new chat');
        }}
      >
        Tạo cuộc trò chuyện mới
      </button>
      <div className="mt-8 text-sm text-gray-400">
        <p>Bạn có thể:</p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Gửi tin nhắn văn bản</li>
          <li>Chia sẻ hình ảnh và tệp</li>
          <li>Tạo nhóm chat</li>
          <li>Gọi thoại và video</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatEmpty;