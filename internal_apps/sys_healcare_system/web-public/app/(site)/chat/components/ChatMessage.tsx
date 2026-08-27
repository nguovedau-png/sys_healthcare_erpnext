'use client';

import React from 'react';
import Image from 'next/image';
import { Message, ChatAttachment } from '../types';
import { formatMessageTime, isImageAttachment, getFileIcon } from '../utils/chatUtils';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  attachments?: ChatAttachment[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser, attachments }) => {
  return (
    <div
      className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isCurrentUser && (
        <Image
          src="/assets/default-avatar.png"
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div
        className={`mx-2 px-4 py-2 rounded-lg max-w-[70%] ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>

        {attachments && attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center">
                {isImageAttachment(attachment) ? (
                  <div className="relative w-full max-w-xs">
                    <Image
                      src={attachment.url}
                      alt={attachment.name}
                      width={300}
                      height={200}
                      className="rounded-lg"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-2 rounded ${isCurrentUser ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <span className="text-2xl mr-2">{getFileIcon(attachment.mimeType)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm">{attachment.name}</p>
                      <p className="text-xs opacity-75">{(attachment.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <span
          className={`text-xs block mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}
        >
          {formatMessageTime(new Date(message.timestamp))}
        </span>
      </div>
      {isCurrentUser && (
        <Image
          src="/assets/default-avatar.png"
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
    </div>
  );
};

export default ChatMessage;