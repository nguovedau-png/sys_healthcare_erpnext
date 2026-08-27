import { Box, Center, Heading, Text, VStack, Button, ButtonText, Icon, HStack } from '@gluestack-ui/themed';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

export default function RecordScreen() {
    const router = useRouter();
    const { type } = useLocalSearchParams(); // 'video' or 'audio'
    const isVideo = type === 'video';
    const [isRecording, setIsRecording] = useState(false);

    const handleToggleRecord = () => {
        if (isRecording) {
            // Stop recording and proceed to call
            setIsRecording(false);
            router.replace({ pathname: '/connect/call', params: { type } });
        } else {
            setIsRecording(true);
        }
    };

    return (
        <>
            <Stack.Screen options={{ title: isVideo ? 'Record Video Intro' : 'Record Audio Intro' }} />
            <Box flex={1} bg="$black">
                <Center flex={1}>
                    {/* Mock Camera View */}
                    <Box w="$full" h="60%" bg="$trueGray800" justifyContent="center" alignItems="center" borderRadius="$md" overflow="hidden">
                        {isVideo ? (
                            <FontAwesome name="user" size={100} color="#525252" />
                        ) : (
                            <FontAwesome name="microphone" size={100} color="#525252" />
                        )}
                        {isRecording && (
                            <Box position="absolute" top={20} right={20} bg="$red500" px="$3" py="$1" borderRadius="$full">
                                <Text color="$white" fontWeight="bold">REC</Text>
                            </Box>
                        )}
                    </Box>

                    <VStack space="xl" mt="$8" alignItems="center">
                        <Text color="$white" textAlign="center" px="$8">
                            {isRecording
                                ? "Recording... Tap to stop and connect."
                                : "Record a short intro to break the ice!"}
                        </Text>

                        <HStack space="xl">
                            <Button
                                size="xl"
                                variant="solid"
                                bg={isRecording ? "$red500" : "$white"}
                                borderRadius="$full"
                                w={80}
                                h={80}
                                p="$0"
                                onPress={handleToggleRecord}
                            >
                                <Center>
                                    <FontAwesome
                                        name={isRecording ? "stop" : "circle"}
                                        size={isRecording ? 24 : 60}
                                        color={isRecording ? "white" : "#ef4444"}
                                    />
                                </Center>
                            </Button>

                            {!isRecording && (
                                <Button
                                    size="md"
                                    variant="outline"
                                    bg="$transparent"
                                    borderColor="$white"
                                    borderRadius="$full"
                                    onPress={() => alert('Retake logic: Reset state')}
                                >
                                    <ButtonText color="$white">Retake</ButtonText>
                                </Button>
                            )}
                        </HStack>
                    </VStack>
                </Center>
            </Box>
        </>
    );
}
