import { Box, Text, VStack, HStack, Input, InputField, Button, ButtonText, Avatar, AvatarFallbackText, ScrollView, Heading } from '@gluestack-ui/themed';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ChatScreen() {
    const { id } = useLocalSearchParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hey there!', sender: 'them' },
        { id: 2, text: 'Hi! How are you?', sender: 'me' },
        { id: 3, text: 'I am doing great, thanks for asking.', sender: 'them' },
    ]);

    const handleSend = () => {
        if (!message.trim()) return;
        setMessages([...messages, { id: Date.now(), text: message, sender: 'me' }]);
        setMessage('');
    };

    return (
        <>
            <Stack.Screen options={{
                headerTitle: () => (
                    <HStack space="sm" alignItems="center">
                        <Avatar size="sm" bg="$violet500"><AvatarFallbackText>U</AvatarFallbackText></Avatar>
                        <Heading size="sm">User {id}</Heading>
                    </HStack>
                ),
                headerRight: () => (
                    <Button variant="link" size="sm" onPress={() => alert('Block/Report options would go here')}>
                        <FontAwesome name="ellipsis-v" size={20} color="#7c3aed" />
                    </Button>
                )
            }} />
            <Box flex={1} bg="$white">
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    <VStack space="md">
                        {messages.map((msg) => (
                            <Box
                                key={msg.id}
                                alignSelf={msg.sender === 'me' ? 'flex-end' : 'flex-start'}
                                bg={msg.sender === 'me' ? '$violet500' : '$backgroundLight100'}
                                px="$4"
                                py="$2"
                                borderRadius="$xl"
                                maxWidth="80%"
                            >
                                <Text color={msg.sender === 'me' ? '$white' : '$textDark800'}>{msg.text}</Text>
                            </Box>
                        ))}
                    </VStack>
                </ScrollView>

                <Box p="$2" bg="$white" borderTopWidth={1} borderColor="$borderLight200">
                    <HStack space="sm" alignItems="center">
                        <Input flex={1} size="md" borderRadius="$full">
                            <InputField
                                placeholder="Type a message..."
                                value={message}
                                onChangeText={setMessage}
                                returnKeyType="send"
                                onSubmitEditing={handleSend}
                            />
                        </Input>
                        <Button borderRadius="$full" size="md" bg="$violet500" onPress={handleSend} w="$10" h="$10" p="$0">
                            <FontAwesome name="send" size={16} color="white" />
                        </Button>
                    </HStack>
                </Box>
            </Box>
        </>
    );
}
