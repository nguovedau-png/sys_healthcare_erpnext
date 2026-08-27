import { Box, Heading, Text, VStack, ScrollView } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';

export default function PrivacyScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Privacy & Rules' }} />
            <Box flex={1} bg="$white">
                <ScrollView>
                    <VStack space="xl" p="$4">
                        <Box>
                            <Heading size="lg" mb="$2">Community Guidelines</Heading>
                            <Text color="$textLight600" lineHeight="$md">
                                1. Be respectful to everyone. Harassment will not be tolerated.{'\n'}
                                2. No inappropriate content. Keep the platform safe for all ages.{'\n'}
                                3. Be honest. Do not impersonate others.
                            </Text>
                        </Box>

                        <Box>
                            <Heading size="lg" mb="$2">Privacy Policy</Heading>
                            <Text color="$textLight600" lineHeight="$md">
                                Your privacy is important to us. We collect data to improve your experience.{'\n'}
                                - We do not sell your personal data.{'\n'}
                                - You can request data deletion at any time.{'\n'}
                                - Calls are end-to-end encrypted.
                            </Text>
                        </Box>

                        <Box>
                            <Heading size="lg" mb="$2">Terms of Service</Heading>
                            <Text color="$textLight600" lineHeight="$md">
                                By using Connect, you agree to our terms. We reserve the right to suspend accounts that violate our rules.
                            </Text>
                        </Box>
                    </VStack>
                </ScrollView>
            </Box>
        </>
    );
}
