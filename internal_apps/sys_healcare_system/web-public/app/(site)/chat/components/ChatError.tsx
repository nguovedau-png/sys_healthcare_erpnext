'use client';

import React from 'react';

interface ChatErrorProps {
  message: string;
  onRetry?: () => void;
}

const ChatError: React.FC<ChatErrorProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-500 p-4">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold mb-2 text-center">Đã xảy ra lỗi</h3>
      <p className="text-center max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={onRetry}
        >
          Thử lại
        </button>
      )}
      <div className="mt-6 text-sm text-gray-400 text-center">
        <p>Nếu lỗi vẫn tiếp tục xảy ra, vui lòng:</p>
        <ul className="mt-2 space-y-1">
          <li>Kiểm tra kết nối mạng của bạn</li>
          <li>Làm mới trang</li>
          <li>Đăng xuất và đăng nhập lại</li>
          <li>Liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatError;