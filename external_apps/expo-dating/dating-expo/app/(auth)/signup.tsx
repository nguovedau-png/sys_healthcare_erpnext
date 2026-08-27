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
    Center
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
    const router = useRouter();

    const handleSignup = () => {
        // Navigate to tabs
        router.replace('/(tabs)');
    };

    const handleLogin = () => {
        router.back();
    };

    return (
        <Center flex={1} bg="$white" px="$4">
            <VStack space="xl" w="$full" maxW="$80">
                <Center>
                    <Heading size="3xl" color="$violet500">Connect</Heading>
                    <Text color="$textLight500">Create a new account</Text>
                </Center>

                <VStack space="md">
                    <FormControl>
                        <FormControlLabel><FormControlLabelText>Full Name</FormControlLabelText></FormControlLabel>
                        <Input>
                            <InputField placeholder="Enter your full name" />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel><FormControlLabelText>Email</FormControlLabelText></FormControlLabel>
                        <Input>
                            <InputField placeholder="Enter your email" />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel><FormControlLabelText>Password</FormControlLabelText></FormControlLabel>
                        <Input>
                            <InputField type="password" placeholder="Enter your password" />
                        </Input>
                    </FormControl>
                </VStack>

                <Button bg="$violet500" onPress={handleSignup} size="lg">
                    <ButtonText>Sign Up</ButtonText>
                </Button>

                <Box flexDirection="row" justifyContent="center">
                    <Text>Already have an account? </Text>
                    <Link onPress={handleLogin}>
                        <LinkText color="$violet500" fontWeight="$bold">Sign In</LinkText>
                    </Link>
                </Box>
            </VStack>
        </Center>
    );
}
