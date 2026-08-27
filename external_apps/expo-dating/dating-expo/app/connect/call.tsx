import { Box, Center, Heading, Text, VStack, HStack, Button, ButtonText, Avatar, AvatarFallbackText } from '@gluestack-ui/themed';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';

export default function activeCallScreen() {
    const router = useRouter();
    const { type } = useLocalSearchParams();
    const isVideo = type === 'video';
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleEndCall = () => {
        router.replace('/(tabs)');
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <Box flex={1} bg="$black">
                {/* Remote Video / Audio Area */}
                <Box flex={1} justifyContent="center" alignItems="center">
                    {isVideo ? (
                        <Box w="$full" h="$full" bg="$trueGray800" justifyContent="center" alignItems="center">
                            <Text color="$white" size="2xl">Partner Video</Text>
                            <Avatar size="2xl" position="absolute" opacity={0.3} bg="$violet500">
                                <AvatarFallbackText>Partner</AvatarFallbackText>
                            </Avatar>
                        </Box>
                    ) : (
                        <Center>
                            <Avatar size="2xl" bg="$violet500" mb="$4">
                                <AvatarFallbackText>Partner</AvatarFallbackText>
                            </Avatar>
                            <Heading color="$white" size="xl">Connected with Sarah</Heading>
                            <Text color="$textLight300" mt="$2">Audio Call</Text>
                        </Center>
                    )}
                </Box>

                {/* Local Video Overlay (if video) */}
                {isVideo && (
                    <Box position="absolute" top={60} right={20} w={100} h={150} bg="$trueGray900" borderRadius="$lg" borderWidth={1} borderColor="$white" justifyContent="center" alignItems="center">
                        <Text color="$white" size="xs">You</Text>
                    </Box>
                )}

                {/* Controls */}
                <Box position="absolute" bottom={0} w="$full" p="$8" bg="$black" opacity={0.8} borderTopLeftRadius="$2xl" borderTopRightRadius="$2xl">
                    <Center>
                        <Text color="$white" mb="$6" fontSize="$lg" fontWeight="bold">{formatTime(duration)}</Text>

                        <HStack space="2xl">
                            <Button borderRadius="$full" w={60} h={60} bg="$trueGray700" p="$0">
                                <FontAwesome name={isVideo ? "video-camera" : "microphone"} size={24} color="white" />
                            </Button>

                            <Button borderRadius="$full" w={70} h={70} bg="$red500" onPress={handleEndCall} p="$0">
                                <FontAwesome name="phone" size={32} color="white" style={{ transform: [{ rotate: '135deg' }] }} />
                            </Button>

                            <Button borderRadius="$full" w={60} h={60} bg="$trueGray700" p="$0">
                                <FontAwesome name="volume-up" size={24} color="white" />
                            </Button>
                        </HStack>
                    </Center>
                </Box>
            </Box>
        </>
    );
}
