"use client";

import React, { useState } from 'react';
import Banner from '@/components/common/Banner';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import List from '@/components/ui/List';
import Spin from '@/components/ui/Spin';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import { AiOutlineRobot as RobotOutlined, AiOutlineUser as UserOutlined, AiOutlineSend as SendOutlined } from 'react-icons/ai';

export default function AIAssistantPage() {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Xin chào! Tôi là trợ lý sức khỏe AI. Bạn đang cảm thấy thế nào? Hãy mô tả triệu chứng của bạn nhé.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const getAIResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('đau đầu') || lowerText.includes('chóng mặt')) {
            return 'Dựa trên mô tả của bạn, có thể bạn đang gặp vấn đề về Thần kinh hoặc thiếu máu não. Tôi khuyên bạn nên nghỉ ngơi và theo dõi thêm. Nếu đau kéo dài, bạn nên đặt lịch với bác sĩ chuyên khoa Thần kinh.';
        }
        if (lowerText.includes('đau ngực') || lowerText.includes('tức ngực')) {
            return 'Đau tức ngực là dấu hiệu quan trọng liên quan đến Tim mạch. Bạn cần lưu ý nếu đau lan ra cánh tay hoặc kèm khó thở. Hãy liên hệ y tế ngay hoặc đặt lịch khám Tim mạch sớm nhất.';
        }
        if (lowerText.includes('đau bụng') || lowerText.includes('dạ dày')) {
            return 'Triệu chứng của bạn có vẻ liên quan đến hệ Tiêu hóa. Bạn nên tránh ăn đồ cay nóng và theo dõi vị trí đau. Chuyên khoa Tiêu hóa sẽ là lựa chọn phù hợp cho bạn.';
        }
        return 'Cảm ơn bạn đã chia sẻ. Thông tin này rất hữu ích. Để có chẩn đoán chính xác nhất, tôi khuyên bạn nên thực hiện tra cứu triệu chứng chi tiết hoặc đặt lịch tư vấn với bác sĩ chuyên môn.';
    };

    const sendMessage = () => {
        if (!input.trim() || isTyping) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const aiMsg = { role: 'assistant', text: getAIResponse(userMsg.text) };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f0f2f5] pb-20">
            <Banner page="others" />
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <Title level={1} className="font-black text-gray-900 mb-4">Trợ lý Sức khỏe AI</Title>
                    <Paragraph type="secondary" className="text-lg">Sử dụng trí tuệ nhân tạo để phân tích triệu chứng và đưa ra lời khuyên y tế sơ bộ.</Paragraph>
                </div>

                <div className="max-w-3xl mx-auto bg-surface rounded-lg shadow-premium border border-white overflow-hidden flex flex-col h-[700px]">
                    <div className="bg-primary p-6 flex items-center gap-4 text-white">
                        <Avatar size={54} icon={<RobotOutlined className="text-2xl text-primary" />} className="bg-white" />
                        <div>
                            <h2 className="text-xl font-bold m-0 leading-tight">AI Health Assistant</h2>
                            <div className="flex items-center gap-2 text-teal-50 mt-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Đang trực tuyến
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-background/50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <Avatar
                                        icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                                        className={msg.role === 'user' ? 'bg-primary shadow-soft' : 'bg-slate-800 shadow-soft'}
                                    />
                                    <div className={`p-4 px-6 rounded-lg shadow-soft text-[15px] leading-relaxed ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-surface text-slate-800 rounded-tl-none border border-border'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="flex gap-3 items-center ml-12 p-3 px-5 bg-surface border border-border rounded-lg shadow-soft">
                                    <Text type="secondary" italic className="text-sm">Bác sĩ AI đang suy nghĩ</Text>
                                    <Spin size="small" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-surface border-t border-border">
                        <div className="flex gap-2">
                            <Input
                                size="large"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Mô tả triệu chứng của bạn tại đây..."
                                className="flex-1"
                            />
                            <Button
                                variant="primary"
                                size="large"
                                onClick={sendMessage}
                                icon={<SendOutlined />}
                                className="px-8 font-bold shadow-soft"
                            >
                                Gửi
                            </Button>
                        </div>
                        <Text className="block text-center text-[10px] text-muted mt-4 uppercase tracking-[0.2em] font-bold">
                            Thông tin chỉ mang tính chất tham khảo
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
}