import React, { useEffect, useState } from 'react';
import { Layout, List, Input, Button, Avatar, Typography, Modal, Select, message, Badge } from 'antd';
import { SendOutlined, PlusOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import api from '../../../services/api';
import { io, Socket } from 'socket.io-client';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

interface Channel {
    id: string;
    name: string;
    type: 'direct' | 'group';
    participants: any[];
    lastMessage?: any;
    unreadCount?: number;
}

interface Message {
    id: string;
    content: string;
    senderId: string;
    sender: { fullName: string };
    createdAt: string;
}

const Chat: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'direct' | 'group'>('direct');
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [groupName, setGroupName] = useState('');

    useEffect(() => {
        fetchChannels();
        fetchUsers();

        // Initialize Socket.IO
        const newSocket = io(import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000', {
            auth: {
                token: localStorage.getItem('token')
            }
        });

        newSocket.on('message', (message: Message) => {
            if (selectedChannel && message.id === selectedChannel.id) {
                setMessages(prev => [...prev, message]);
            }
            // Update channel list with new message
            fetchChannels();
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (selectedChannel) {
            fetchMessages(selectedChannel.id);
        }
    }, [selectedChannel]);

    const fetchChannels = async () => {
        try {
            const res = await api.get('/chat/channels');
            if (res.data.success) {
                setChannels(res.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch channels');
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            if (res.data.success) {
                setUsers(res.data.data.filter((u: any) => u.id !== user?.id));
            }
        } catch (error) {
            console.error('Failed to fetch users');
        }
    };

    const fetchMessages = async (channelId: string) => {
        try {
            const res = await api.get(`/chat/channels/${channelId}/messages`);
            if (res.data.success) {
                setMessages(res.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch messages');
        }
    };

    const sendMessage = async () => {
        if (!messageInput.trim() || !selectedChannel) return;

        try {
            const res = await api.post(`/chat/channels/${selectedChannel.id}/messages`, {
                content: messageInput
            });
            if (res.data.success) {
                setMessages(prev => [...prev, res.data.data]);
                setMessageInput('');
                socket?.emit('message', { channelId: selectedChannel.id, message: res.data.data });
            }
        } catch (error: any) {
            message.error('Failed to send message');
        }
    };

    const createChannel = async () => {
        try {
            if (modalType === 'direct' && selectedUsers.length !== 1) {
                message.error('Please select one user for direct chat');
                return;
            }
            if (modalType === 'group' && (selectedUsers.length < 2 || !groupName.trim())) {
                message.error('Please enter group name and select at least 2 users');
                return;
            }

            const res = await api.post('/chat/channels', {
                type: modalType,
                name: modalType === 'group' ? groupName : undefined,
                participantIds: selectedUsers
            });

            if (res.data.success) {
                message.success('Channel created successfully');
                setCreateModalVisible(false);
                setSelectedUsers([]);
                setGroupName('');
                fetchChannels();
            }
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Failed to create channel');
        }
    };

    return (
        <Layout style={{ height: 'calc(100vh - 200px)', background: '#fff' }}>
            <Sider width={300} style={{ background: '#fafafa', borderRight: '1px solid #f0f0f0' }}>
                <div style={{ padding: 16, borderBottom: '1px solid #f0f0f0' }}>
                    <Title level={4} style={{ margin: 0 }}>Chats</Title>
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                        <Button
                            icon={<UserOutlined />}
                            onClick={() => {
                                setModalType('direct');
                                setCreateModalVisible(true);
                            }}
                            block
                        >
                            New Chat
                        </Button>
                        <Button
                            icon={<TeamOutlined />}
                            onClick={() => {
                                setModalType('group');
                                setCreateModalVisible(true);
                            }}
                            block
                        >
                            New Group
                        </Button>
                    </div>
                </div>
                <List
                    dataSource={channels}
                    renderItem={(channel) => (
                        <List.Item
                            key={channel.id}
                            onClick={() => setSelectedChannel(channel)}
                            style={{
                                cursor: 'pointer',
                                background: selectedChannel?.id === channel.id ? '#e6f7ff' : 'transparent',
                                padding: '12px 16px'
                            }}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Badge count={channel.unreadCount || 0}>
                                        <Avatar icon={channel.type === 'group' ? <TeamOutlined /> : <UserOutlined />} />
                                    </Badge>
                                }
                                title={channel.name}
                                description={channel.lastMessage?.content?.substring(0, 30) || 'No messages yet'}
                            />
                        </List.Item>
                    )}
                />
            </Sider>
            <Content style={{ display: 'flex', flexDirection: 'column' }}>
                {selectedChannel ? (
                    <>
                        <div style={{ padding: 16, borderBottom: '1px solid #f0f0f0' }}>
                            <Title level={5} style={{ margin: 0 }}>{selectedChannel.name}</Title>
                            <Text type="secondary">
                                {selectedChannel.participants.length} participants
                            </Text>
                        </div>
                        <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    style={{
                                        marginBottom: 16,
                                        display: 'flex',
                                        justifyContent: msg.senderId === user?.id ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    <div
                                        style={{
                                            maxWidth: '60%',
                                            padding: '8px 12px',
                                            borderRadius: 8,
                                            background: msg.senderId === user?.id ? '#1890ff' : '#f0f0f0',
                                            color: msg.senderId === user?.id ? 'white' : 'black'
                                        }}
                                    >
                                        {msg.senderId !== user?.id && (
                                            <Text strong style={{ color: 'inherit', display: 'block', marginBottom: 4 }}>
                                                {msg.sender.fullName}
                                            </Text>
                                        )}
                                        <div>{msg.content}</div>
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: 11,
                                                color: msg.senderId === user?.id ? 'rgba(255,255,255,0.7)' : '#999',
                                                marginTop: 4,
                                                display: 'block'
                                            }}
                                        >
                                            {new Date(msg.createdAt).toLocaleTimeString()}
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8 }}>
                            <TextArea
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onPressEnter={(e) => {
                                    if (!e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                placeholder="Type a message..."
                                autoSize={{ minRows: 1, maxRows: 4 }}
                            />
                            <Button type="primary" icon={<SendOutlined />} onClick={sendMessage}>
                                Send
                            </Button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Text type="secondary">Select a chat to start messaging</Text>
                    </div>
                )}
            </Content>

            <Modal
                title={modalType === 'direct' ? 'New Direct Chat' : 'New Group Chat'}
                open={createModalVisible}
                onOk={createChannel}
                onCancel={() => {
                    setCreateModalVisible(false);
                    setSelectedUsers([]);
                    setGroupName('');
                }}
            >
                {modalType === 'group' && (
                    <Input
                        placeholder="Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        style={{ marginBottom: 16 }}
                    />
                )}
                <Select
                    mode="multiple"
                    placeholder={modalType === 'direct' ? 'Select a user' : 'Select users'}
                    value={selectedUsers}
                    onChange={setSelectedUsers}
                    style={{ width: '100%' }}
                    maxCount={modalType === 'direct' ? 1 : undefined}
                >
                    {users.map((u) => (
                        <Select.Option key={u.id} value={u.id}>
                            {u.fullName} ({u.email})
                        </Select.Option>
                    ))}
                </Select>
            </Modal>
        </Layout>
    );
};

export default Chat;
