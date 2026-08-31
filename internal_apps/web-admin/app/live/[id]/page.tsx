"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import liveService, { Livestream, LiveChatMessage, LiveViewer } from '@/services/live.service';

export default function LiveSessionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = parseInt(params.id as string);

    const [config, setConfig] = useState<Livestream | null>(null);
    const [messages, setMessages] = useState<LiveChatMessage[]>([]);
    const [viewers, setViewers] = useState<LiveViewer[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [showKey, setShowKey] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const fetchData = async () => {
        try {
            const data = await liveService.getLiveSession(id);
            if (data) {
                setConfig(data);
                setIsStreaming(data.isStreaming);
                fetchMessages();
                fetchViewers();
            }
        } catch (error) {
            console.error('Failed to fetch live config', error);
            // router.push('/live');
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        try {
            const msgs = await liveService.getLiveMessages(id);
            setMessages(msgs);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        }
    };

    const fetchViewers = async () => {
        try {
            const v = await liveService.getViewers(id);
            setViewers(v);
        } catch (error) {
            console.error('Failed to fetch viewers', error);
        }
    }

    useEffect(() => {
        if (!isNaN(id)) {
            fetchData();
        }
        const interval = setInterval(() => {
            if (!isNaN(id)) {
                fetchMessages();
                fetchViewers();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleStreaming = async () => {
        if (!config) return;
        try {
            const updated = await liveService.updateLiveConfig(config.id, { isStreaming: !isStreaming });
            setIsStreaming(updated.isStreaming);
            setConfig(updated);
        } catch (error) {
            alert('Lỗi khi cập nhật trạng thái livestream');
        }
    };

    const handleSendMessage = async () => {
        if (!config || !newMessage.trim()) return;
        try {
            await liveService.sendLiveMessage(config.id, {
                userName: 'Admin',
                content: newMessage,
                userRole: 'Moderator'
            });
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            alert('Lỗi khi gửi tin nhắn');
        }
    };

    if (loading) return <div className="p-12 text-center text-gray-500 italic">Đang tải thông tin...</div>;
    if (!config) return <div className="p-12 text-center text-red-500">Không tìm thấy buổi live!</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/live" className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition text-gray-600">
                        <i className="fi flaticon-left-arrow"></i>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold mt-1 ${isStreaming ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                            {isStreaming ? 'ĐANG PHÁT' : 'OFFLINE'}
                        </span>
                    </div>
                </div>
                <button
                    onClick={toggleStreaming}
                    className={`px-6 py-2 rounded-xl font-bold text-white shadow-lg transition ${isStreaming ? 'bg-gray-700 hover:bg-gray-800' : 'bg-red-600 hover:bg-red-700'}`}
                >
                    {isStreaming ? 'Kết thúc' : 'Bắt đầu phát'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Player & Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Video Player Placeholder */}
                    <div className="bg-black rounded-2xl aspect-video flex items-center justify-center text-white/50 border border-gray-800 overflow-hidden relative shadow-md">
                        {isStreaming ? (
                            <div className="text-center animate-pulse">
                                <i className="fi flaticon-play-button text-4xl mb-2 block"></i>
                                <span className="font-bold">Live Preview ({config.provider})</span>
                            </div>
                        ) : (
                            <div className="text-center">
                                <i className="fi flaticon-video-camera text-4xl mb-2 block"></i>
                                <span className="font-bold">Waiting for signal...</span>
                            </div>
                        )}
                        {isStreaming && <div className="absolute top-4 left-4 px-2 py-0.5 bg-red-600 text-[10px] font-bold text-white rounded">LIVE</div>}
                    </div>

                    {/* Settings */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Cấu hình kết nối ({config.provider})</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Server URL</label>
                                <div className="flex gap-2">
                                    <input type="text" value={config.serverUrl || 'N/A'} disabled className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-mono text-sm" />
                                    <button onClick={() => { navigator.clipboard.writeText(config.serverUrl || ''); alert('Copied!'); }} className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200">Copy</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stream Key / Token</label>
                                <div className="flex gap-2">
                                    <input type={showKey ? "text" : "password"} value={config.streamKey || 'N/A'} disabled className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-mono text-sm" />
                                    <button onClick={() => setShowKey(!showKey)} className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200">{showKey ? 'Ẩn' : 'Hiện'}</button>
                                    <button onClick={() => { navigator.clipboard.writeText(config.streamKey || ''); alert('Copied!'); }} className="px-4 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200">Copy</button>
                                </div>
                            </div>
                            {config.providerConfig && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <h4 className="text-sm font-bold text-gray-700 mb-2">Provider Config</h4>
                                    <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                                        {JSON.stringify(config.providerConfig, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Chat & Viewers */}
                <div className="space-y-6">
                    {/* Viewers */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-[250px] flex flex-col">
                        <h3 className="font-bold text-gray-800 mb-2 border-b border-gray-100 pb-2 flex justify-between items-center">
                            Người xem
                            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">{viewers.length}</span>
                        </h3>
                        <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                            {viewers.length === 0 ? (
                                <p className="text-sm text-gray-400 text-center mt-8">Chưa có người xem</p>
                            ) : (
                                <ul className="space-y-2">
                                    {viewers.map(v => (
                                        <li key={v.id} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    {v.userName.charAt(0)}
                                                </div>
                                                <span>{v.userName}</span>
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    if (!confirm('Xóa người xem này?')) return;
                                                    try {
                                                        await liveService.removeViewer(config.id, v.userId);
                                                        setViewers(viewers.filter(viewer => viewer.userId !== v.userId));
                                                    } catch (e) {
                                                        alert('Lỗi khi xóa người xem');
                                                    }
                                                }}
                                                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition px-2"
                                                title="Xóa khỏi buổi live"
                                            >
                                                <i className="fi flaticon-trash"></i>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Chat */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 h-[400px] flex flex-col">
                        <h3 className="font-bold text-gray-800 mb-2 border-b border-gray-100 pb-2">Live Chat</h3>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                            {messages.map((msg) => (
                                <div key={msg.id} className="flex flex-col text-sm">
                                    <span className={`font-bold ${msg.userName === 'Admin' ? 'text-red-500' : 'text-blue-600'}`}>{msg.userName}:</span>
                                    <span className="text-gray-700 bg-gray-50 p-2 rounded-lg mt-1 break-words">{msg.content}</span>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                placeholder="Gửi tin nhắn..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary"
                            />
                            <button onClick={handleSendMessage} className="text-primary hover:text-primary-dark transition-transform active:scale-95">
                                <i className="fi flaticon-send"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
