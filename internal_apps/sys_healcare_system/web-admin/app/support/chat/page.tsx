"use client";
import React, { useState, useEffect, useRef } from 'react';
import supportService, { SupportChat, SupportMessage } from '@/services/support.service';

export default function SupportChatPage() {
    const [chats, setChats] = useState<SupportChat[]>([]);
    const [selectedChat, setSelectedChat] = useState<SupportChat | null>(null);
    const [messages, setMessages] = useState<SupportMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await supportService.getSupportChats();
            setChats(data);
            if (data.length > 0 && !selectedChat) {
                handleSelectChat(data[0]);
            }
        } catch (error) {
            console.error('Failed to fetch support chats', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async (chatId: number) => {
        try {
            const data = await supportService.getChatMessages(chatId);
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch chat messages', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let interval: any;
        if (selectedChat) {
            fetchMessages(selectedChat.id);
            interval = setInterval(() => fetchMessages(selectedChat.id), 3000);
        }
        return () => clearInterval(interval);
    }, [selectedChat?.id]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSelectChat = (chat: SupportChat) => {
        setSelectedChat(chat);
    };

    const handleSendMessage = async () => {
        if (!selectedChat || !newMessage.trim()) return;
        try {
            await supportService.sendSupportMessage(selectedChat.id, 'admin', newMessage);
            setNewMessage('');
            fetchMessages(selectedChat.id);
        } catch (error) {
            alert('Lỗi khi gửi tin nhắn');
        }
    };

    if (loading) return <div className="p-12 text-center text-gray-500 italic">Đang tải danh sách hỗ trợ...</div>;

    return (
        <div className="h-[calc(100vh-160px)] flex gap-6">
            {/* Sidebar: Chat List */}
            <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900">Danh sách hỗ trợ</h2>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => handleSelectChat(chat)}
                            className={`p-4 cursor-pointer hover:bg-gray-50 transition ${selectedChat?.id === chat.id ? 'bg-primary/5 border-l-4 border-primary' : 'border-l-4 border-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <p className="font-bold text-gray-900 text-sm">{chat.userName}</p>
                                <span className="text-[10px] text-gray-400 capitalize">{chat.status}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{chat.lastMsg}</p>
                            {chat.unread > 0 && <span className="mt-2 inline-block px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full font-bold">{chat.unread}</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main: Chat Content */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <p className="font-bold text-gray-900">{selectedChat.userName}</p>
                                <p className="text-xs text-green-500">Đang trực tuyến</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <i className="fi flaticon-more-v"></i>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.sender === 'admin'
                                        ? 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/20'
                                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                        }`}>
                                        <p>{msg.content}</p>
                                        <p className={`text-[10px] mt-1 ${msg.sender === 'admin' ? 'text-white/70' : 'text-gray-400'}`}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-4 bg-white border-t border-gray-200">
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"><i className="fi flaticon-clip"></i></button>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button onClick={handleSendMessage} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg shadow-blue-200"><i className="fi flaticon-paper-plane"></i></button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <i className="fi flaticon-chat text-6xl mb-4"></i>
                        <p>Chọn một cuộc hội thoại để bắt đầu chat</p>
                    </div>
                )}
            </div>
        </div>
    );
}
