import { Box, Heading, Text, VStack, Avatar, AvatarFallbackText, Button, ButtonText, Center, ScrollView, HStack, Switch, Icon, StarIcon } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProfileScreen() {
    return (
        <Box flex={1} bg="$backgroundLight100">
            {/* Header Background */}
            <Box h={200} bg="#1A0A33" borderBottomLeftRadius="$3xl" borderBottomRightRadius="$3xl" />

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Overlapping Avatar Content */}
                <Box mt={-60} mx="$4">
                    <Center>
                        <Avatar bgColor="$violet500" size="2xl" borderRadius="$full" borderWidth={4} borderColor="$white">
                            <AvatarFallbackText>User Name</AvatarFallbackText>
                        </Avatar>
                        <Heading size="xl" mt="$2" color="$textDark800">User Name</Heading>
                        <Text color="$textLight500">Full Stack Developer | Music Lover</Text>
                    </Center>

                    {/* Areas of Interest Table */}
                    <Box bg="$white" mt="$6" borderRadius="$xl" overflow="hidden" shadowColor="$black" shadowOpacity={0.05} shadowRadius={4}>
                        <VStack divider={<Box h={1} bg="$borderLight100" />}>
                            {/* Interest Item 1 */}
                            <HStack justifyContent="space-between" alignItems="center" p="$4">
                                <HStack space="md" alignItems="center">
                                    <Box bg="$violet100" p="$2" borderRadius="$full">
                                        <FontAwesome name="child" size={16} color="#7c3aed" />
                                    </Box>
                                    <VStack>
                                        <Text fontWeight="bold">Children</Text>
                                        <HStack space="xs">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Icon key={star} as={StarIcon} size="xs" color={star <= 4 ? "$amber400" : "$coolGray200"} />
                                            ))}
                                        </HStack>
                                    </VStack>
                                </HStack>
                                <Switch size="sm" trackColor={{ false: "#767577", true: "#7c3aed" }} value={true} />
                            </HStack>

                            {/* Interest Item 2 */}
                            <HStack justifyContent="space-between" alignItems="center" p="$4">
                                <HStack space="md" alignItems="center">
                                    <Box bg="$green100" p="$2" borderRadius="$full">
                                        <FontAwesome name="home" size={16} color="#16a34a" />
                                    </Box>
                                    <VStack>
                                        <Text fontWeight="bold">Home</Text>
                                        <HStack space="xs">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Icon key={star} as={StarIcon} size="xs" color={star <= 5 ? "$amber400" : "$coolGray200"} />
                                            ))}
                                        </HStack>
                                    </VStack>
                                </HStack>
                                <Switch size="sm" trackColor={{ false: "#767577", true: "#7c3aed" }} value={false} />
                            </HStack>
                        </VStack>
                    </Box>

                    {/* Action Buttons */}
                    <VStack space="md" mt="$6">
                        <Button variant="outline" borderColor="$violet500" onPress={() => router.push('/profile/edit')}>
                            <ButtonText color="$violet500">Edit Profile</ButtonText>
                        </Button>
                        <Button bg="$violet500" onPress={() => router.push('/settings')}>
                            <ButtonText>Settings</ButtonText>
                        </Button>
                    </VStack>
                </Box>
            </ScrollView>
        </Box>
    );
}
