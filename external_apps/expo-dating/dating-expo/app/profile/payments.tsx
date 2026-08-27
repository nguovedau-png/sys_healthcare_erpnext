import { Box, Heading, Text, VStack, HStack, Button, ButtonText, Icon, AddIcon, ScrollView } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function PaymentMethodsScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Payment Methods' }} />
            <Box flex={1} bg="$white">
                <ScrollView>
                    <VStack space="xl" p="$4">
                        <Box bg="$violet500" p="$6" borderRadius="$xl" mb="$2">
                            <Text color="$white" mb="$2" opacity={0.8}>Primary Card</Text>
                            <Heading color="$white" size="xl" mb="$8">**** **** **** 4242</Heading>
                            <HStack justifyContent="space-between">
                                <Text color="$white">John Doe</Text>
                                <Text color="$white">12/25</Text>
                            </HStack>
                        </Box>

                        <Heading size="md" mt="$4">Saved Methods</Heading>

                        <VStack space="md">
                            <HStack space="md" alignItems="center" p="$4" bg="$backgroundLight50" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
                                <FontAwesome name="cc-visa" size={24} color="#1a1f36" />
                                <VStack flex={1}>
                                    <Text fontWeight="bold">Visa ending in 4242</Text>
                                    <Text size="xs" color="$textLight400">Expires 12/2025</Text>
                                </VStack>
                                <Button variant="link" size="sm">
                                    <ButtonText color="$red500">Remove</ButtonText>
                                </Button>
                            </HStack>

                            <HStack space="md" alignItems="center" p="$4" bg="$backgroundLight50" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
                                <FontAwesome name="google-wallet" size={24} color="#4285F4" />
                                <VStack flex={1}>
                                    <Text fontWeight="bold">Google Pay</Text>
                                    <Text size="xs" color="$textLight400">Linked</Text>
                                </VStack>
                                <Button variant="link" size="sm">
                                    <ButtonText color="$red500">Unlink</ButtonText>
                                </Button>
                            </HStack>
                        </VStack>

                        <Button variant="outline" borderColor="$violet500" size="lg" mt="$4">
                            <ButtonText color="$violet500">Add New Payment Method</ButtonText>
                        </Button>
                    </VStack>
                </ScrollView>
            </Box>
        </>
    );
}
