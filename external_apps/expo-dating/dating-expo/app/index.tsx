import { Box, Center, Heading, Spinner, Text } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        // Simulate loading check (e.g., auth token)
        const timer = setTimeout(() => {
            // Navigate to Login (or Tabs if authenticated)
            // For now, default to Login
            router.replace('/(auth)/login');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box flex={1} bg="$violet600">
            <Center flex={1}>
                <Heading color="$white" size="4xl" mb="$4">Connect</Heading>
                <Text color="$white" mb="$8" opacity={0.8}>Find your match deeply</Text>
                <Spinner color="$white" size="large" />
            </Center>
        </Box>
    );
}
