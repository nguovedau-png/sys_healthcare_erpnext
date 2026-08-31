'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

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

const ChatContent: React.FC = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  // Mock current user
  const currentUser = {
    id: 'user1',
    name: 'Người dùng hiện tại',
    avatar: '/assets/default-avatar.png',
    status: 'online' as const
  };

  // Mock participants data
  const initialParticipants: { [key: string]: any[] } = {
    '1': [
      { id: 'user1', name: 'Người dùng hiện tại', avatar: '/assets/default-avatar.png', status: 'online' as const },
      { id: 'user2', name: 'Người dùng 2', avatar: '/assets/default-avatar.png', status: 'online' as const }
    ],
    '2': [
      { id: 'user1', name: 'Người dùng hiện tại', avatar: '/assets/default-avatar.png', status: 'online' as const },
      { id: 'user3', name: 'Người dùng 3', avatar: '/assets/default-avatar.png', status: 'offline' as const }
    ],
    'pharmacy_2': [
       { id: 'user1', name: 'Người dùng hiện tại', avatar: '/assets/default-avatar.png', status: 'online' as const },
       { id: 'pharmacy_2', name: 'Long Châu', avatar: 'https://nhathuoclongchau.com.vn/estore-images/logo.png', status: 'online' as const }
    ]
  };

  const [participants, setParticipants] = useState(initialParticipants);

  useEffect(() => {
    // TODO: Fetch chats from API
    const mockChats: Chat[] = [
      {
        id: '1',
        participants: ['user1', 'user2'],
        messages: [],
        unreadCount: 2
      },
      {
        id: '2',
        participants: ['user1', 'user3'],
        messages: [],
        unreadCount: 0
      }
    ];

    // If userId is provided, check if chat exists or create a mock one
    if (userId) {
      const existingChat = mockChats.find(c => c.participants.includes(userId));
      
      // If we don't have participant info for this userId, add mock info
      if (userId.startsWith('pharmacy_') && !participants[userId]) {
          const pharmacyId = userId.replace('pharmacy_', '');
          const mockPharmacyName = pharmacyId === '1' ? 'Pharmacity' : 
                                 pharmacyId === '3' ? 'An Khang' :
                                 pharmacyId === '4' ? 'Phano Pharmacy' : `Nhà thuốc #${pharmacyId}`;
          
          setParticipants(prev => ({
              ...prev,
              [userId]: [
                  { id: 'user1', name: 'Người dùng hiện tại', avatar: '/assets/default-avatar.png', status: 'online' as const },
                  { 
                      id: userId, 
                      name: mockPharmacyName, 
                      avatar: '/assets/default-avatar.png', 
                      status: 'online' as const 
                  }
              ]
          }));
      }

      if (existingChat) {
        setSelectedChat(existingChat);
      } else {
        // Create a mock new chat
        const newChat: Chat = {
          id: userId,
          participants: ['user1', userId],
          messages: [],
          unreadCount: 0
        };
        mockChats.push(newChat);
        setSelectedChat(newChat);
      }
    }

    setChats(mockChats);
  }, [userId]);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'user1', // Current user ID
      content,
      timestamp: new Date()
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: newMessage
    };

    setSelectedChat(updatedChat);
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id ? updatedChat : chat
      )
    );

    // TODO: Send message to API
  };

  return (
    <div className="bg-slate-50/50 min-h-[calc(100vh-70px)] py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex h-[750px] animate-in fade-in zoom-in duration-500">
          {/* Sidebar */}
          <div className="w-full md:w-80 lg:w-96 border-r border-slate-50 flex flex-col bg-white">
            <ChatList
              chats={chats}
              selectedChat={selectedChat}
              onChatSelect={handleChatSelect}
              currentUser={currentUser}
              participants={participants as any}
            />
          </div>

          {/* Main Chat Area */}
          <div className="hidden md:flex flex-1 flex-col bg-slate-50/30">
            {selectedChat ? (
              <ChatWindow
                chat={selectedChat}
                currentUserId={currentUser.id}
                onSendMessage={handleSendMessage}
                participantsMap={participants as any}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center p-12">
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center text-4xl mb-8 mx-auto animate-bounce">
                    💬
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Trung tâm Tin nhắn</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Chào mừng bạn đến với hệ thống hỗ trợ trực tuyến. Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu trao đổi với bác sĩ hoặc nhà thuốc.
                  </p>
                  <div className="mt-8 flex justify-center gap-3">
                    <span className="px-4 py-2 bg-white rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">Bảo mật 256-bit</span>
                    <span className="px-4 py-2 bg-white rounded-xl text-[10px] font-black text-teal-500 uppercase tracking-widest border border-slate-100">Đang hoạt động</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <ChatContent />
    </Suspense>
  );
};

export default ChatPage;