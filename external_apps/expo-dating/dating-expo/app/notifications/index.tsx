import { Box, Heading, Text, VStack, HStack, Avatar, AvatarFallbackText, ScrollView, Icon, BellIcon } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';

const NOTIFICATIONS = [
    { id: 1, text: 'David accepted your connection request.', time: '5m ago', type: 'system' },
    { id: 2, text: 'You have a missed call from Emma.', time: '1h ago', type: 'alert' },
    { id: 3, text: 'Welcome to Connect! Start your journey.', time: '1d ago', type: 'info' },
];

export default function NotificationsScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Notifications' }} />
            <Box flex={1} bg="$white">
                <ScrollView>
                    <VStack space="md" p="$4">
                        {NOTIFICATIONS.map((notif) => (
                            <Box key={notif.id} p="$4" bg={notif.type === 'alert' ? '$red50' : '$backgroundLight50'} borderRadius="$lg" borderLeftWidth={4} borderLeftColor={notif.type === 'alert' ? '$red500' : '$violet500'}>
                                <HStack space="md" alignItems="center">
                                    <Box bg="$white" p="$2" borderRadius="$full">
                                        <Icon as={BellIcon} color="$violet500" size="sm" />
                                    </Box>
                                    <VStack flex={1}>
                                        <Text color="$textDark800" fontWeight="bold">{notif.text}</Text>
                                        <Text size="xs" color="$textLight400" mt="$1">{notif.time}</Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>
                </ScrollView>
            </Box>
        </>
    );
}
