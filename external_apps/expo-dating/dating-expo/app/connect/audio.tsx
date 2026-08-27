import { Box, Heading, Center, Text, Spinner } from '@gluestack-ui/themed';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AudioConnectScreen() {
    const router = useRouter();

    useEffect(() => {
        // Simulate finding a match
        const timer = setTimeout(() => {
            router.replace({ pathname: '/connect/record', params: { type: 'audio' } });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Stack.Screen options={{ title: 'Audio Connect' }} />
            <Box flex={1} bg="$white">
                <Center flex={1}>
                    <Spinner size="large" color="$violet500" />
                    <Heading mt="$4">Finding match...</Heading>
                    <Text>Looking for someone to audio chat with.</Text>
                </Center>
            </Box>
        </>
    );
}
