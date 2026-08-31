'use client';

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

interface UseChatReturn {
  chats: Chat[];
  selectedChat: Chat | null;
  loading: boolean;
  error: string | null;
  sendMessage: (chatId: string, content: string) => void;
  selectChat: (chat: Chat) => void;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const useChat = (): UseChatReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on('connect', () => {
      console.log('Connected to chat server');
      setError(null);
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError('Không thể kết nối đến máy chủ chat');
    });

    newSocket.on('chats', (receivedChats: Chat[]) => {
      setChats(receivedChats);
      setLoading(false);
    });

    newSocket.on('message', (message: Message) => {
      setChats(prevChats =>
        prevChats.map(chat => {
          if (chat.id === selectedChat?.id) {
            return {
              ...chat,
              messages: [...chat.messages, message],
              lastMessage: message,
              unreadCount: 0
            };
          } else if (message.senderId !== 'user1') {
            return {
              ...chat,
              unreadCount: chat.unreadCount + 1
            };
          }
          return chat;
        })
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (chatId: string, content: string) => {
    if (!socket) return;

    const message: Omit<Message, 'id' | 'timestamp'> = {
      senderId: 'user1',
      content
    };

    socket.emit('message', { chatId, message });
  };

  const selectChat = (chat: Chat) => {
    setSelectedChat(chat);
    if (chat.unreadCount > 0) {
      setChats(prevChats =>
        prevChats.map(c =>
          c.id === chat.id ? { ...c, unreadCount: 0 } : c
        )
      );
    }
  };

  return {
    chats,
    selectedChat,
    loading,
    error,
    sendMessage,
    selectChat
  };
};