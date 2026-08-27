'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Message, Chat } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';

interface ChatWindowProps {
  chat: Chat;
  currentUserId: string;
  onSendMessage: (content: string, attachments?: File[]) => void;
  onlineUsers?: string[];
  participantsMap: { [chatId: string]: any[] };
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  currentUserId,
  onSendMessage,
  onlineUsers = [],
  participantsMap
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const currentChatParticipants = participantsMap[chat.id] || [];

  return (
    <div className="h-full flex flex-col">
      <ChatHeader
        participants={currentChatParticipants}
        currentUserId={currentUserId}
        onlineUsers={onlineUsers}
      />

      <div className="flex-1 overflow-y-auto p-4">
        {chat.messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={onSendMessage}
        onTyping={() => console.log('Typing...')}
      />
    </div>
  );
};

export default ChatWindow;