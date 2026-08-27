import {
    Box,
    VStack,
    Heading,
    Text,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputField,
    Button,
    ButtonText,
    Link,
    LinkText,
    Center,
    InputSlot,
    InputIcon,
    Icon,
    UserIcon,
    LockIcon
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();

    const handleLogin = () => {
        // Navigate to tabs
        router.replace('/(tabs)');
    };

    const handleSignup = () => {
        router.push('/(auth)/signup');
    };

    return (
        <Box flex={1} bg="#1A0A33">
            <Center flex={1} px="$4">
                {/* Logo Area */}
                <VStack alignItems="center" mb="$8">
                    <Center bg="$white" w={80} h={80} borderRadius="$full" mb="$4">
                        <Heading size="3xl" color="#3CB34D">go</Heading>
                    </Center>
                    <Heading size="3xl" color="$white" fontWeight="bold">Connect</Heading>
                </VStack>

                {/* Login Card */}
                <Box bg="$white" p="$6" borderRadius="$3xl" w="$full" maxW={350} shadowColor="$black" shadowOffset={{ width: 0, height: 4 }} shadowOpacity={0.2} shadowRadius={8} elevation={5}>
                    <VStack space="xl">
                        <FormControl>
                            <FormControlLabel mb="$1"><FormControlLabelText color="$textLight500" fontSize="$xs" fontWeight="bold">USERNAME</FormControlLabelText></FormControlLabel>
                            <Input variant="outline" size="md" borderRadius="$lg" borderColor="$borderLight200">
                                <InputSlot pl="$3">
                                    <Icon as={UserIcon} color="$textLight400" />
                                </InputSlot>
                                <InputField placeholder="Enter your username" />
                            </Input>
                        </FormControl>

                        <FormControl>
                            <FormControlLabel mb="$1"><FormControlLabelText color="$textLight500" fontSize="$xs" fontWeight="bold">PASSWORD</FormControlLabelText></FormControlLabel>
                            <Input variant="outline" size="md" borderRadius="$lg" borderColor="$borderLight200">
                                <InputSlot pl="$3">
                                    <Icon as={LockIcon} color="$textLight400" />
                                </InputSlot>
                                <InputField type="password" placeholder="Enter your password" />
                            </Input>
                        </FormControl>

                        <Button bg="#4C2582" onPress={handleLogin} size="xl" borderRadius="$full" mt="$2">
                            <ButtonText fontWeight="bold">LOGIN</ButtonText>
                        </Button>

                        <Center mt="$2">
                            <Link onPress={() => router.push('/(auth)/forgot-password')}>
                                <LinkText color="#4C2582" fontSize="$sm" textDecorationLine="none">Forgot Password?</LinkText>
                            </Link>
                        </Center>
                    </VStack>
                </Box>

                <Box position="absolute" bottom={40} flexDirection="row">
                    <Text color="$white" opacity={0.7}>Don't have an account? </Text>
                    <Link onPress={handleSignup}>
                        <LinkText color="$white" fontWeight="bold">Sign Up</LinkText>
                    </Link>
                </Box>
            </Center>
        </Box>
    );
}
