"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, CloseOutlined, RobotOutlined, MessageOutlined, AudioOutlined } from '@ant-design/icons';

const FloatingAIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Xin chào! Tôi là trợ lý sức khỏe AI. Tôi có thể giúp gì cho bạn?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    const handleVoiceInput = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'vi-VN';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(prev => prev + ' ' + transcript);
            };

            recognitionRef.current = recognition;
            recognition.start();
        } else {
            alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.');
        }
    };

    const toggleOpen = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        try {
            const response = await fetch('http://localhost:3000/v1/ai/analyze-symptoms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms: input })
            });
            const data = await response.json();

            const replyText = data?.analysis || data?.text || 'Tôi xin lỗi, tôi không thể phân tích triệu chứng này ngay bây giờ.';

            setMessages(prev => [...prev,
            { role: 'assistant', text: replyText }
            ]);
        } catch (error) {
            setMessages(prev => [...prev,
            { role: 'assistant', text: 'Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau.' }
            ]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right animate-fade-in-up"
                    style={{ maxHeight: '600px', height: '500px' }}>

                    {/* Header */}
                    <div className="bg-primary p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full">
                                <RobotOutlined className="text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm md:text-base">Trợ lý Sức khỏe</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <Button
                            type="text"
                            icon={<CloseOutlined className="text-white text-lg" />}
                            onClick={toggleOpen}
                            className="hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center p-0"
                        />
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2 mt-1 flex-shrink-0">
                                        <RobotOutlined />
                                    </div>
                                )}
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-tr-none'
                                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <Button
                            type={isListening ? 'primary' : 'default'}
                            shape="circle"
                            icon={<AudioOutlined className={isListening ? 'animate-pulse' : ''} />}
                            onClick={handleVoiceInput}
                            danger={isListening}
                            className="flex-shrink-0"
                        />
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onPressEnter={sendMessage}
                            placeholder={isListening ? 'Đang nghe...' : "Hỏi gì đó..."}
                            className="rounded-full border-gray-200 hover:border-primary focus:border-primary px-4"
                        />
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<SendOutlined />}
                            onClick={sendMessage}
                            className="flex-shrink-0 bg-primary shadow-md hover:scale-105 transition-transform"
                        />
                    </div>
                    <div className="text-center pb-2">
                        <p className="text-[10px] text-gray-400">Powered by Healthcare AI</p>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={toggleOpen}
                    className="group bg-primary text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center relative"
                >
                    <MessageOutlined className="text-2xl md:text-3xl animate-pulse" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] text-white items-center justify-center font-bold">1</span>
                    </span>

                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
                        <p className="font-medium text-sm">Chat với trợ lý AI</p>
                        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white transform rotate-45 border-r border-t border-gray-100 -translate-y-1/2"></div>
                    </div>
                </button>
            )}
        </div>
    );
};

export default FloatingAIAssistant;
