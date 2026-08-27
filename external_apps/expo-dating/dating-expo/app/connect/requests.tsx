import { Box, Heading, Text, VStack, HStack, Avatar, AvatarFallbackText, Button, ButtonText, ScrollView } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';

const MOCK_REQUESTS = [
    { id: 1, name: 'David', bio: 'Loves hiking and photography', time: '10m ago' },
    { id: 2, name: 'Emma', bio: 'Digital Nomad | Coffee addict', time: '2h ago' },
];

export default function RequestsScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Connection Requests' }} />
            <Box flex={1} bg="$white">
                <ScrollView>
                    <VStack space="md" p="$4">
                        {MOCK_REQUESTS.length > 0 ? (
                            MOCK_REQUESTS.map((req) => (
                                <Box key={req.id} bg="$backgroundLight50" p="$4" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
                                    <HStack space="md" alignItems="center" mb="$3">
                                        <Avatar bgColor="$violet500" size="md" borderRadius="$full">
                                            <AvatarFallbackText>{req.name}</AvatarFallbackText>
                                        </Avatar>
                                        <VStack flex={1}>
                                            <Heading size="sm">{req.name}</Heading>
                                            <Text size="sm" color="$textLight500">{req.bio}</Text>
                                        </VStack>
                                        <Text size="xs" color="$textLight400">{req.time}</Text>
                                    </HStack>

                                    <HStack space="md">
                                        <Button flex={1} bg="$violet500" size="sm">
                                            <ButtonText>Accept</ButtonText>
                                        </Button>
                                        <Button flex={1} variant="outline" borderColor="$red500" size="sm">
                                            <ButtonText color="$red500">Decline</ButtonText>
                                        </Button>
                                    </HStack>
                                </Box>
                            ))
                        ) : (
                            <Box alignItems="center" py="$10">
                                <Text color="$textLight400">No pending requests</Text>
                            </Box>
                        )}
                    </VStack>
                </ScrollView>
            </Box>
        </>
    );
}
