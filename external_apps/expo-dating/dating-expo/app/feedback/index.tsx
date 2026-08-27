import { Box, Heading, Text, VStack, Button, ButtonText, Center, HStack, Progress, ProgressFilledTrack } from '@gluestack-ui/themed';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';

const QUESTIONS = [
    "Was the call quality good?",
    "Did you enjoy talking with this person?",
    "Would you like to connect again?"
];

export default function FeedbackScreen() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleAnswer = (answer: string) => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // End of feedback
            router.replace('/(tabs)');
        }
    };

    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

    return (
        <>
            <Stack.Screen options={{ title: 'Feedback', headerLeft: () => null }} />
            <Box flex={1} bg="$white" p="$6" justifyContent="center">
                <VStack space="2xl">
                    <Center>
                        <Heading size="xl" textAlign="center" mb="$4">Help us improve</Heading>
                        <Text textAlign="center" color="$textLight500" px="$4">
                            {QUESTIONS[currentQuestion]}
                        </Text>
                    </Center>

                    <VStack space="md">
                        <Button bg="$violet500" size="xl" onPress={() => handleAnswer('yes')}>
                            <ButtonText>Yes</ButtonText>
                        </Button>
                        <Button variant="outline" borderColor="$violet500" size="xl" onPress={() => handleAnswer('no')}>
                            <ButtonText color="$violet500">No</ButtonText>
                        </Button>
                        <Button variant="link" size="sm" mt="$4" onPress={() => handleAnswer('skip')}>
                            <ButtonText color="$textLight400">Skip Function</ButtonText>
                        </Button>
                    </VStack>

                    <Box mt="$8">
                        <Progress value={progress} w="100%" h="$1" bg="$backgroundLight200">
                            <ProgressFilledTrack bg="$violet500" />
                        </Progress>
                        <Text size="xs" textAlign="center" mt="$2" color="$textLight400">
                            Question {currentQuestion + 1} of {QUESTIONS.length}
                        </Text>
                    </Box>
                </VStack>
            </Box>
        </>
    );
}
