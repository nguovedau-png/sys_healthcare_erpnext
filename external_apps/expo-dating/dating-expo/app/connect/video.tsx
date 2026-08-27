import { Box, Heading, Center, Text, Spinner } from '@gluestack-ui/themed';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function VideoConnectScreen() {
    const router = useRouter();

    useEffect(() => {
        // Simulate finding a match
        const timer = setTimeout(() => {
            router.replace({ pathname: '/connect/record', params: { type: 'video' } });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Stack.Screen options={{ title: 'Video Connect' }} />
            <Box flex={1} bg="$white">
                <Center flex={1}>
                    <Spinner size="large" color="$violet500" />
                    <Heading mt="$4">Finding match...</Heading>
                    <Text>Looking for someone to video chat with.</Text>
                </Center>
            </Box>
        </>
    );
}
