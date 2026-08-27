import { Box, Heading, Text, VStack, Input, InputField, ScrollView, Pressable, HStack, Icon, SearchIcon } from '@gluestack-ui/themed';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';

const TOPICS = [
    'Dating', 'Friendship', 'Networking', 'Gaming', 'Music', 'Movies', 'Tech', 'Travel'
];

export default function SearchTopicScreen() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const filteredTopics = TOPICS.filter(t => t.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <Stack.Screen options={{ title: 'Select Topic' }} />
            <Box flex={1} bg="$white">
                <VStack space="md" p="$4">
                    <Input size="lg">
                        <InputField
                            placeholder="Search for a topic..."
                            value={search}
                            onChangeText={setSearch}
                        />
                    </Input>

                    <ScrollView>
                        <Box flexDirection="row" flexWrap="wrap" gap={10} mt="$4">
                            {filteredTopics.map((topic) => (
                                <Pressable
                                    key={topic}
                                    onPress={() => router.push({ pathname: '/connect/video', params: { topic } })}
                                    bg="$violet50"
                                    borderRadius="$full"
                                    px="$4"
                                    py="$2"
                                    borderWidth={1}
                                    borderColor="$violet200"
                                >
                                    <Text color="$violet600" fontWeight="$medium">{topic}</Text>
                                </Pressable>
                            ))}
                        </Box>
                    </ScrollView>
                </VStack>
            </Box>
        </>
    );
}
