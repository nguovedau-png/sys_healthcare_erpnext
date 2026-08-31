import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { VStack, HStack, Text, Button, ButtonText, Heading, Box, Badge, BadgeText } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const ChatListScreen = () => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetchChannels();
    }, []);

    const fetchChannels = async () => {
        setLoading(true);
        try {
            const res = await api.get('/chat/channels');
            if (res.data.success) {
                setChannels(res.data.data);
            }
        } catch (error: any) {
            Alert.alert('Error', 'Failed to fetch channels');
        } finally {
            setLoading(false);
        }
    };

    const renderChannel = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation.navigate('ChatRoom' as never, { channel: item } as never)}>
            <Box bg="$white" p="$4" mb="$2" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
                <HStack justifyContent="space-between" alignItems="center">
                    <VStack flex={1}>
                        <HStack alignItems="center" space="sm">
                            <Text fontSize="$lg" fontWeight="$bold">{item.name}</Text>
                            {item.type === 'group' && (
                                <Badge action="muted" size="sm">
                                    <BadgeText>Group</BadgeText>
                                </Badge>
                            )}
                        </HStack>
                        <Text fontSize="$sm" color="$textLight600" numberOfLines={1}>
                            {item.lastMessage?.content || 'No messages yet'}
                        </Text>
                        <Text fontSize="$xs" color="$textLight500">
                            {item.participants?.length || 0} participants
                        </Text>
                    </VStack>
                    {item.unreadCount > 0 && (
                        <Badge action="error">
                            <BadgeText>{item.unreadCount}</BadgeText>
                        </Badge>
                    )}
                </HStack>
            </Box>
        </TouchableOpacity>
    );

    return (
        <VStack flex={1} bg="$backgroundLight50" p="$4">
            <HStack justifyContent="space-between" alignItems="center" mb="$4">
                <Heading size="xl">Chats</Heading>
                <Button size="sm" onPress={() => navigation.navigate('CreateChannel' as never)}>
                    <ButtonText>New Chat</ButtonText>
                </Button>
            </HStack>

            <FlatList
                data={channels}
                renderItem={renderChannel}
                keyExtractor={(item: any) => item.id}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchChannels} />
                }
                ListEmptyComponent={
                    <Box p="$8" alignItems="center">
                        <Text color="$textLight400">No chats yet</Text>
                        <Button mt="$4" onPress={() => navigation.navigate('CreateChannel' as never)}>
                            <ButtonText>Start a Chat</ButtonText>
                        </Button>
                    </Box>
                }
            />
        </VStack>
    );
};

export default ChatListScreen;
