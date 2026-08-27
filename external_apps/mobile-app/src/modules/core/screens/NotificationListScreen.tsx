import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { VStack, HStack, Text, Heading, Box, Badge, BadgeText, Button, ButtonText } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const NotificationListScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await api.get('/notifications');
            if (res.data.success) {
                setNotifications(res.data.data);
            }
        } catch (error: any) {
            Alert.alert('Error', 'Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await api.patch(`/notifications/${id}/read`);
            fetchNotifications();
        } catch (error) {
            console.error('Failed to mark as read');
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.patch('/notifications/read-all');
            Alert.alert('Success', 'All notifications marked as read');
            fetchNotifications();
        } catch (error: any) {
            Alert.alert('Error', 'Failed to mark all as read');
        }
    };

    const renderNotification = ({ item }: any) => (
        <TouchableOpacity onPress={() => markAsRead(item.id)}>
            <Box
                bg={item.isRead ? '$backgroundLight0' : '$blue50'}
                p="$3"
                mb="$2"
                borderRadius="$md"
                borderWidth={1}
                borderColor="$borderLight200"
            >
                <VStack space="xs">
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$sm" fontWeight="$bold" flex={1}>{item.title}</Text>
                        {!item.isRead && (
                            <Badge action="info" size="sm">
                                <BadgeText>New</BadgeText>
                            </Badge>
                        )}
                    </HStack>
                    <Text fontSize="$sm" color="$textLight600">{item.message}</Text>
                    <Text fontSize="$xs" color="$textLight500">
                        {new Date(item.createdAt).toLocaleString()}
                    </Text>
                </VStack>
            </Box>
        </TouchableOpacity>
    );

    return (
        <VStack flex={1} bg="$backgroundLight50" p="$4">
            <HStack justifyContent="space-between" alignItems="center" mb="$4">
                <Heading size="xl">Notifications</Heading>
                {notifications.some((n: any) => !n.isRead) && (
                    <Button size="sm" onPress={markAllAsRead}>
                        <ButtonText>Mark All Read</ButtonText>
                    </Button>
                )}
            </HStack>

            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item: any) => item.id}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchNotifications} />
                }
                ListEmptyComponent={
                    <Box p="$8" alignItems="center">
                        <Text color="$textLight400">No notifications</Text>
                    </Box>
                }
            />
        </VStack>
    );
};

export default NotificationListScreen;
