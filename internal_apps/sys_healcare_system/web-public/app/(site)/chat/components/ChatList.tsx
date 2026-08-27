'use client';

import React from 'react';
import Image from 'next/image';
import { Chat, User } from '../types';
import { formatMessageTime } from '../utils/chatUtils';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  currentUser: User;
  participants: { [chatId: string]: User[] };
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChat,
  onChatSelect,
  currentUser,
  participants
}) => {
  const getChatName = (chat: Chat): string => {
    const chatParticipants = participants[chat?.id] || [];
    // Assuming group chat if there are more than 2 participants
    if (chatParticipants.length > 2) {
      return chatParticipants.map(p => p.name).join(', ');
    }
    const otherUser = chatParticipants.find(p => p.id !== currentUser.id);
    return otherUser?.name || 'Người dùng không xác định';
  };

  const getAvatarUrl = (chat: Chat): string => {
    const chatParticipants = participants[chat?.id] || [];
    // Assuming group chat if there are more than 2 participants
    if (chatParticipants.length > 2) {
      return '/assets/group-avatar.png';
    }
    const otherUser = chatParticipants.find(p => p.id !== currentUser.id);
    return otherUser?.avatar || '/assets/default-avatar.png';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-8 border-b border-slate-50 bg-white">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Tin nhắn</h2>
        <div className="relative group">
           <input 
             type="text" 
             placeholder="Tìm hội thoại..." 
             className="w-full bg-slate-50 border-none rounded-2xl py-3 px-5 text-sm font-bold text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
           />
           <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
             🔍
           </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {chats.map(chat => {
          const isSelected = selectedChat?.id === chat.id;
          const chatName = getChatName(chat);
          const avatarUrl = getAvatarUrl(chat);
          
          return (
            <div
              key={chat.id}
              className={`flex items-center p-4 cursor-pointer rounded-2xl transition-all duration-300 ${
                isSelected 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 translate-x-2' 
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
              onClick={() => onChatSelect(chat)}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-14 h-14 rounded-2xl overflow-hidden border-2 ${isSelected ? 'border-white/20' : 'border-slate-100'} bg-white`}>
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {chat.unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black rounded-lg min-w-[20px] h-5 flex items-center justify-center px-1 border-2 border-white">
                    {chat.unreadCount}
                  </span>
                )}
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isSelected ? 'bg-teal-300' : 'bg-teal-500'}`}></div>
              </div>
              
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className={`font-black text-sm truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {chatName}
                  </h3>
                  {chat.lastMessage && (
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-white/60' : 'text-slate-400'}`}>
                      {formatMessageTime(new Date(chat.lastMessage.timestamp))}
                    </span>
                  )}
                </div>
                {chat.lastMessage ? (
                  <p className={`text-xs truncate font-medium ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                    {chat.lastMessage.content}
                  </p>
                ) : (
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white/40' : 'text-slate-300'}`}>
                    Bắt đầu trò chuyện
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;