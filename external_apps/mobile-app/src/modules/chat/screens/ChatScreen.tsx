import React from 'react';
import { Box, Text, Center, VStack, Input, InputField, Button, ButtonText } from '@gluestack-ui/themed';
import { FlatList } from 'react-native';

const ChatScreen = () => {
    // Mock data
    const messages = [
        { id: '1', text: 'Hello!', sender: 'User' },
        { id: '2', text: 'Hi there, how can I help?', sender: 'Support' }
    ];

    return (
        <Box flex={1} bg="$white">
            <Box p="$4" borderBottomWidth={1} borderColor="$trueGray200">
                <Text size="lg" bold>Chat</Text>
            </Box>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Box
                        bg={item.sender === 'User' ? '$blue100' : '$gray100'}
                        p="$3"
                        m="$2"
                        alignSelf={item.sender === 'User' ? 'flex-end' : 'flex-start'}
                        rounded="$lg"
                        maxWidth="80%"
                    >
                        <Text>{item.text}</Text>
                    </Box>
                )}
            />
            <Box p="$4" borderTopWidth={1} borderColor="$trueGray200">
                <VStack space="sm">
                    <Input>
                        <InputField placeholder="Type a message..." />
                    </Input>
                    <Button>
                        <ButtonText>Send</ButtonText>
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default ChatScreen;
