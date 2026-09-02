import React, { useEffect, useState, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { VStack, HStack, Text, Input, InputField, Button, ButtonText, Box } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import api from '../../../services/api';
import { authStorage } from '../../../services/authStorage';
import { Alert } from 'react-native';
import { io, Socket } from 'socket.io-client';

const ChatRoomScreen = () => {
    const route = useRoute<{ key: string; name: string; params?: { channel?: { id: string } } }>();
    const { channel } = route.params || {};
    const { user } = useSelector((state: RootState) => state.auth);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (channel) {
            fetchMessages();
            initializeSocket();
        }

        return () => {
            socket?.disconnect();
        };
    }, [channel]);

    const initializeSocket = async () => {
        if (!channel) return;
        const token = await authStorage.getAccessToken();
        const socketUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

        const newSocket = io(socketUrl, {
            auth: {
                token
            }
        });

        newSocket.on('message', (message: any) => {
            if (message.channelId === channel.id) {
                setMessages(prev => [...prev, message]);
                scrollToBottom();
            }
        });

        setSocket(newSocket);
    };

    const fetchMessages = async () => {
        if (!channel) return;
        try {
            const res = await api.get(`/chat/channels/${channel.id}/messages`);
            if (res.data.success) {
                setMessages(res.data.data);
                setTimeout(scrollToBottom, 100);
            }
        } catch (error) {
            console.error('Failed to fetch messages');
        }
    };

    const sendMessage = async () => {
        if (!channel || !messageInput.trim()) return;

        try {
            const res = await api.post(`/chat/channels/${channel.id}/messages`, {
                content: messageInput
            });
            if (res.data.success) {
                setMessages(prev => [...prev, res.data.data]);
                setMessageInput('');
                socket?.emit('message', { channelId: channel.id, message: res.data.data });
                scrollToBottom();
            }
        } catch (error: any) {
            Alert.alert('Error', 'Failed to send message');
        }
    };

    const scrollToBottom = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    const renderMessage = ({ item }: any) => {
        const isOwnMessage = item.senderId === user?.id;
        return (
            <Box
                alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
                maxWidth="80%"
                mb="$2"
            >
                <Box
                    bg={isOwnMessage ? '$blue500' : '$backgroundLight200'}
                    p="$3"
                    borderRadius="$lg"
                >
                    {!isOwnMessage && (
                        <Text fontSize="$xs" fontWeight="$bold" color={isOwnMessage ? '$white' : '$textLight900'} mb="$1">
                            {item.sender?.fullName}
                        </Text>
                    )}
                    <Text color={isOwnMessage ? '$white' : '$textLight900'}>
                        {item.content}
                    </Text>
                    <Text fontSize="$xs" color={isOwnMessage ? '$white' : '$textLight500'} mt="$1">
                        {new Date(item.createdAt).toLocaleTimeString()}
                    </Text>
                </Box>
            </Box>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <VStack flex={1} bg="$backgroundLight50">
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item: any) => item.id}
                    contentContainerStyle={{ padding: 16 }}
                    onContentSizeChange={scrollToBottom}
                />

                <HStack p="$4" bg="$white" borderTopWidth={1} borderColor="$borderLight200" space="sm">
                    <Input flex={1}>
                        <InputField
                            placeholder="Type a message..."
                            value={messageInput}
                            onChangeText={setMessageInput}
                            onSubmitEditing={sendMessage}
                        />
                    </Input>
                    <Button onPress={sendMessage}>
                        <ButtonText>Send</ButtonText>
                    </Button>
                </HStack>
            </VStack>
        </KeyboardAvoidingView>
    );
};

export default ChatRoomScreen;
