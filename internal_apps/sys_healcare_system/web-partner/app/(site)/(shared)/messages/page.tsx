"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Typography, Avatar, Input, Button, Space, List, Badge, Divider, Dropdown, Menu, Modal, Form, Select, Tooltip } from 'antd';
import socketService from '@/services/socket.service';
import { 
    SearchOutlined, 
    MoreOutlined, 
    SendOutlined, 
    PictureOutlined, 
    PaperClipOutlined, 
    PhoneOutlined, 
    VideoCameraOutlined,
    UsergroupAddOutlined,
    SmileOutlined
} from '@ant-design/icons';
import HubAvatar, { BadgeTier } from '@/components/hub/HubAvatar';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// --- MOCK DATA ---
const CONVERSATIONS = [
    { id: '1', name: 'BS. Lê Trọng Hưng', lastMessage: 'Em gửi anh xem kết quả X-Quang ca này nhé.', time: '10:30', unread: 2, avatar: 'https://i.pravatar.cc/150?img=11', tier: 'diamond', role: 'Bác sĩ chuyên khoa II', isGroup: false },
    { id: '2', name: 'Nhóm Thảo luận Tim Mạch', lastMessage: 'GS. Hiển: Cuối tuần này nhóm mình có buổi hội chẩn nhé.', time: 'Hôm qua', unread: 0, avatar: 'https://images.unsplash.com/photo-1576091160550-2173dad99901?auto=format&fit=crop&q=80&w=100&h=100', tier: 'none', isGroup: true, members: 12 },
    { id: '3', name: 'DS. Nguyễn Thanh Tùng', lastMessage: 'Okay bác sĩ.', time: 'Thứ 3', unread: 0, avatar: 'https://i.pravatar.cc/150?img=12', tier: 'gold', role: 'Dược sĩ', isGroup: false },
];

const INITIAL_MESSAGES = [
    { id: 'm1', senderId: '1', text: 'Chào bác sĩ, dạo này công việc ở viện ổn chứ?', time: '09:00', isMe: false },
    { id: 'm2', senderId: 'me', text: 'Chào anh, em vẫn ổn ạ. Có ca nào khó anh em mình cùng trao đổi nhé.', time: '09:15', isMe: true },
    { id: 'm3', senderId: '1', text: 'Ừ, em gửi anh xem kết quả X-Quang ca này nhé. Bệnh nhân có tiền sử lao phổi cũ.', time: '10:30', isMe: false },
];

export default function MessagesPage() {
    const [activeChat, setActiveChat] = useState(CONVERSATIONS[0]);
    const [messageInput, setMessageInput] = useState('');
    const [isCreateGroupVisible, setIsCreateGroupVisible] = useState(false);
    const [messages, setMessages] = useState<any[]>(INITIAL_MESSAGES);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Connect to Socket.IO when component mounts
        socketService.connect();
        
        // Join the active chat room
        socketService.joinChat(activeChat.id, 'me');

        // Listen for incoming messages
        socketService.onReceiveMessage((newMessage) => {
            if (newMessage.chatId === activeChat.id) {
                setMessages(prev => {
                    // Check if message already exists to prevent duplicate renders from sender
                    if (prev.find(m => m.id === newMessage.id)) return prev;
                    return [...prev, {
                        ...newMessage,
                        isMe: newMessage.senderId === 'me'
                    }];
                });
                scrollToBottom();
            }
        });

        return () => {
            // Clean up socket listener when component unmounts
            socketService.disconnect();
        };
    }, [activeChat.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;

        // Emit message to backend
        socketService.sendMessage(activeChat.id, 'me', messageInput);
        setMessageInput('');
    };

    return (
        <div style={{ background: '#f0f2f5', minHeight: 'calc(100vh - 64px)', padding: '24px 16px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', height: '80vh' }}>
                
                {/* Sidebar: Conversation List */}
                <div style={{ width: 350, borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', background: '#fafafa' }}>
                    <div style={{ padding: '20px 16px', borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <Title level={4} style={{ margin: 0 }}>Tin nhắn</Title>
                            <Tooltip title="Tạo nhóm Chat mới">
                                <Button shape="circle" icon={<UsergroupAddOutlined />} onClick={() => setIsCreateGroupVisible(true)} />
                            </Tooltip>
                        </div>
                        <Input prefix={<SearchOutlined />} placeholder="Tìm kiếm bạn bè, nhóm chat..." style={{ borderRadius: 20 }} />
                    </div>
                    
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        <List
                            dataSource={CONVERSATIONS}
                            renderItem={item => (
                                <div 
                                    onClick={() => {
                                        setActiveChat(item);
                                        // Reset messages when switching chat (in a real app, you would fetch history from backend)
                                        setMessages(item.id === '1' ? INITIAL_MESSAGES : []);
                                    }}
                                    style={{ 
                                        padding: '16px 20px', 
                                        cursor: 'pointer', 
                                        background: activeChat.id === item.id ? '#e6f7ff' : 'transparent',
                                        borderBottom: '1px solid #f0f0f0',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <Space align="start" size="middle" style={{ width: '100%' }}>
                                        <Badge count={item.unread}>
                                            <Avatar size={48} src={item.avatar} />
                                        </Badge>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <Text strong ellipsis style={{ maxWidth: 180 }}>{item.name}</Text>
                                                <Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text>
                                            </div>
                                            <Text type="secondary" ellipsis style={{ display: 'block', maxWidth: 200, fontSize: 13, color: item.unread > 0 ? '#1890ff' : undefined, fontWeight: item.unread > 0 ? 600 : 400 }}>
                                                {item.lastMessage}
                                            </Text>
                                        </div>
                                    </Space>
                                </div>
                            )}
                        />
                    </div>
                </div>

                {/* Main Chat Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Chat Header */}
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Space align="center" size="middle">
                            <HubAvatar 
                                src={activeChat.avatar} 
                                name={activeChat.name} 
                                tier={activeChat.tier as BadgeTier} 
                                role={activeChat.role || (activeChat.isGroup ? `${activeChat.members} thành viên` : '')} 
                            />
                            <div>
                                <Text strong style={{ fontSize: 16 }}>{activeChat.name}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {activeChat.isGroup ? `${activeChat.members} thành viên` : 'Đang hoạt động'}
                                </Text>
                            </div>
                        </Space>
                        <Space size="large">
                            <Button type="text" icon={<PhoneOutlined style={{ fontSize: 20, color: '#1890ff' }} />} />
                            <Button type="text" icon={<VideoCameraOutlined style={{ fontSize: 20, color: '#1890ff' }} />} />
                            <Dropdown overlay={<Menu items={[{key: '1', label: 'Xem hồ sơ'}, {key: '2', label: 'Tắt thông báo'}, {key: '3', label: 'Chặn tin nhắn'}]} />} trigger={['click']}>
                                <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
                            </Dropdown>
                        </Space>
                    </div>

                    {/* Chat Messages */}
                    <div style={{ flex: 1, padding: 24, overflowY: 'auto', background: '#fff' }}>
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>Hôm nay</Text>
                        </div>
                        {messages.map(msg => (
                            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.isMe ? 'flex-end' : 'flex-start', marginBottom: 16 }}>
                                {!msg.isMe && <Avatar src={activeChat.avatar} size={32} style={{ marginRight: 8, marginTop: 4 }} />}
                                <div style={{ maxWidth: '60%' }}>
                                    <div style={{ 
                                        padding: '12px 16px', 
                                        background: msg.isMe ? '#1890ff' : '#f0f2f5', 
                                        color: msg.isMe ? '#fff' : '#000',
                                        borderRadius: msg.isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                        fontSize: 14
                                    }}>
                                        {msg.text}
                                    </div>
                                    <div style={{ textAlign: msg.isMe ? 'right' : 'left', marginTop: 4 }}>
                                        <Text type="secondary" style={{ fontSize: 11 }}>{msg.time}</Text>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>
                        <Input 
                            size="large"
                            placeholder="Nhập tin nhắn của bạn..." 
                            value={messageInput}
                            onChange={e => setMessageInput(e.target.value)}
                            onPressEnter={handleSendMessage}
                            prefix={
                                <Space size="middle" style={{ marginRight: 8 }}>
                                    <PaperClipOutlined style={{ fontSize: 20, color: '#8c8c8c', cursor: 'pointer' }} />
                                    <PictureOutlined style={{ fontSize: 20, color: '#8c8c8c', cursor: 'pointer' }} />
                                </Space>
                            }
                            suffix={
                                <Space>
                                    <SmileOutlined style={{ fontSize: 20, color: '#8c8c8c', cursor: 'pointer' }} />
                                    <Button type="primary" shape="circle" icon={<SendOutlined />} disabled={!messageInput.trim()} onClick={handleSendMessage} />
                                </Space>
                            }
                            style={{ borderRadius: 24, padding: '4px 8px 4px 16px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Modal Create Group */}
            <Modal
                title="Tạo nhóm Chat"
                open={isCreateGroupVisible}
                onCancel={() => setIsCreateGroupVisible(false)}
                okText="Tạo nhóm"
                cancelText="Hủy"
            >
                <Form layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item label="Tên nhóm chat" required>
                        <Input placeholder="Nhập tên nhóm..." />
                    </Form.Item>
                    <Form.Item label="Thêm thành viên" required>
                        <Select mode="multiple" placeholder="Tìm kiếm bác sĩ, dược sĩ để thêm vào nhóm...">
                            <Option value="1">BS. Lê Trọng Hưng</Option>
                            <Option value="2">DS. Nguyễn Thanh Tùng</Option>
                            <Option value="3">BS. Phạm Mỹ Linh</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
