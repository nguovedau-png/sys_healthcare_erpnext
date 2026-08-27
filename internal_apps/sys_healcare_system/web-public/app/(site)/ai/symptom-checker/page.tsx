'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import { Input, TextArea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { Title, Text, Paragraph } from '@/components/ui/Typography';
import Tag from '@/components/ui/Tag';
import Spin from '@/components/ui/Spin';
import Alert from '@/components/ui/Alert';
import { Row, Col } from '@/components/ui/Grid';
import { AiOutlineRobot, AiOutlineSend, AiOutlineMedicineBox, AiOutlinePhone, AiOutlineHeart } from 'react-icons/ai';

const SymptomCheckerPage = () => {
    const [messages, setMessages] = useState<{ type: 'user' | 'bot', content: any }[]>([
        { type: 'bot', content: 'Xin chào! Tôi là trợ lý AI Sức khỏe. Bạn đang gặp triệu chứng gì?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        if (!input.trim()) return;

        // Add user message
        const userMsg = { type: 'user', content: input };
        setMessages(prev => [...prev, userMsg as any]);
        const currentInput = input;
        setInput('');
        setLoading(true);

        // Simulate AI Analysis
        setTimeout(() => {
            setLoading(false);
            const lowerInput = currentInput.toLowerCase();

            let result = <Text>Tôi chưa hiểu rõ. Vui lòng mô tả chi tiết hơn.</Text>;
            let doctors: any[] = [];
            let urgency = 'Thấp';
            let specialty = '';

            if (lowerInput.includes('đau đầu') || lowerInput.includes('chóng mặt')) {
                specialty = 'Thần kinh';
                urgency = 'Trung bình';
                doctors = [{ name: 'BS. CKII Trần Văn A', role: 'Trưởng khoa Thần kinh' }];
                result = (
                    <div>
                        <Alert message="Phân tích sơ bộ" description="Triệu chứng có thể liên quan đến hệ thần kinh hoặc căng thẳng." type="warning" showIcon />
                        <div className="mt-4">
                            <Text strong>Đề xuất chuyên khoa: </Text> <Tag color="purple">{specialty}</Tag>
                        </div>
                        <div className="mt-2">
                            <Text strong>Mức độ khẩn cấp: </Text> <Tag color="orange">{urgency}</Tag>
                        </div>
                    </div>
                );
            } else if (lowerInput.includes('ho') || lowerInput.includes('sốt')) {
                specialty = 'Hô hấp/Nhi khoa';
                urgency = 'Thấp';
                doctors = [{ name: 'BS. Lê Thị B', role: 'Chuyên khoa Nhi' }];
                result = (
                    <div>
                        <Alert message="Phân tích sơ bộ" description="Triệu chứng thường gặp của nhiễm trùng đường hô hấp." type="info" showIcon />
                        <div className="mt-4">
                            <Text strong>Đề xuất chuyên khoa: </Text> <Tag color="blue">{specialty}</Tag>
                        </div>
                    </div>
                );
            } else if (lowerInput.includes('ngực') || lowerInput.includes('tim')) {
                specialty = 'Tim mạch';
                urgency = 'Cao';
                doctors = [{ name: 'GS. TS. Phạm C', role: 'Viện trưởng Tim mạch' }];
                result = (
                    <div>
                        <Alert message="Cảnh báo sức khỏe" description="Triệu chứng vùng ngực cần được quan tâm đặc biệt. Hãy đi khám ngay." type="error" showIcon />
                        <div className="mt-4">
                            <Text strong>Đề xuất chuyên khoa: </Text> <Tag color="red">{specialty}</Tag>
                        </div>
                        <div className="mt-2">
                            <Text strong>Mức độ khẩn cấp: </Text> <Tag color="red">{urgency}</Tag>
                        </div>
                    </div>
                );
            }

            const botResponse = {
                type: 'bot',
                content: (
                    <div className="flex flex-col gap-3">
                        {result}
                        {doctors.length > 0 && (
                            <Card title="Bác sĩ phù hợp" className="mt-2 border-blue-100 bg-blue-50">
                                {doctors.map((doc, idx) => (
                                    <div key={idx} className="flex justify-between items-center mb-2 last:mb-0">
                                        <div className="flex items-center gap-2">
                                            <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doc.name}`} />
                                            <div>
                                                <div className="font-bold text-sm">{doc.name}</div>
                                                <div className="text-xs text-gray-500">{doc.role}</div>
                                            </div>
                                        </div>
                                        <Button variant="primary" size="small" icon={<AiOutlinePhone />}>Đặt khám</Button>
                                    </div>
                                ))}
                            </Card>
                        )}
                    </div>
                )
            };

            setMessages(prev => [...prev, botResponse as any]);

        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="text-center mb-8">
                <AiOutlineHeart style={{ fontSize: 48, color: '#ff4d4f' }} />
                <Title level={2}>Kiểm tra triệu chứng online</Title>
                <Paragraph type="secondary">
                    Mô tả vấn đề sức khỏe của bạn để nhận tư vấn sơ bộ từ AI.
                    <br />Lưu ý: Kết quả chỉ mang tính tham khảo, không thay thế chẩn đoán y khoa.
                </Paragraph>
            </div>

            <Card bodyStyle={{ padding: 0 }} className="shadow-lg rounded-lg overflow-hidden min-h-[500px] flex flex-col">
                {/* Chat Area */}
                <div className="flex-1 p-6 bg-gray-50 overflow-y-auto max-h-[500px]">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex mb-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.type === 'bot' && <Avatar icon={<AiOutlineRobot />} className="bg-blue-600 mr-3" />}
                            <div className={`max-w-[80%] p-4 rounded-xl shadow-sm text-sm ${msg.type === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-white rounded-tl-none border border-gray-100'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex mb-4 justify-start">
                            <Avatar icon={<AiOutlineMedicineBox />} className="bg-blue-600 mr-3" />
                            <div className="bg-white p-4 rounded-xl rounded-tl-none border border-gray-100 shadow-sm">
                                <Spin tip="AI đang phân tích..." size="small" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex gap-2">
                        <TextArea
                            autoSize={{ minRows: 1, maxRows: 4 }}
                            placeholder="Ví dụ: Tôi bị đau đầu dữ dội và buồn nôn từ sáng nay..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onPressEnter={(e) => { e.preventDefault(); handleAnalyze(); }}
                            className="flex-1 rounded-xl"
                        />
                        <Button
                            variant="primary"
                            shape="circle"
                            size="large"
                            icon={<AiOutlineSend />}
                            onClick={handleAnalyze}
                            className="flex-shrink-0"
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SymptomCheckerPage;
