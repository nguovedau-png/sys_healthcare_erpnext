import { Box, VStack, FormControl, FormControlLabel, FormControlLabelText, Input, InputField, Button, ButtonText, Avatar, AvatarFallbackText, Center, ScrollView } from '@gluestack-ui/themed';
import { Stack, useRouter } from 'expo-router';

export default function EditProfileScreen() {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={{ title: 'Edit Profile' }} />
            <Box flex={1} bg="$white">
                <ScrollView>
                    <VStack space="xl" p="$4">
                        <Center>
                            <Avatar bgColor="$violet500" size="xl" borderRadius="$full">
                                <AvatarFallbackText>User Name</AvatarFallbackText>
                            </Avatar>
                            <Button variant="link" size="sm" mt="$2">
                                <ButtonText color="$violet500">Change Photo</ButtonText>
                            </Button>
                        </Center>

                        <VStack space="md">
                            <FormControl>
                                <FormControlLabel><FormControlLabelText>Display Name</FormControlLabelText></FormControlLabel>
                                <Input><InputField defaultValue="User Name" /></Input>
                            </FormControl>

                            <FormControl>
                                <FormControlLabel><FormControlLabelText>Bio</FormControlLabelText></FormControlLabel>
                                <Input><InputField defaultValue="Full Stack Developer | Music Lover" multiline height={100} textAlignVertical="top" /></Input>
                            </FormControl>

                            <FormControl>
                                <FormControlLabel><FormControlLabelText>Skills / Interests</FormControlLabelText></FormControlLabel>
                                <Input><InputField defaultValue="Coding, Music, Travel" /></Input>
                            </FormControl>
                        </VStack>

                        <Button bg="$violet500" onPress={() => router.back()} size="lg" mt="$4">
                            <ButtonText>Save Changes</ButtonText>
                        </Button>
                    </VStack>
                </ScrollView>
            </Box>
        </>
    );
}
