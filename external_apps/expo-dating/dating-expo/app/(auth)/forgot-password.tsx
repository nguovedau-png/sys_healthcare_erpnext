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
    Center
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
    const router = useRouter();

    return (
        <Center flex={1} bg="$white" px="$4">
            <VStack space="xl" w="$full" maxW="$80">
                <Center>
                    <Heading size="2xl" color="$violet500">Forgot Password</Heading>
                    <Text color="$textLight500" textAlign="center">Enter your email to reset your password</Text>
                </Center>

                <VStack space="md">
                    <FormControl>
                        <FormControlLabel><FormControlLabelText>Email</FormControlLabelText></FormControlLabel>
                        <Input>
                            <InputField placeholder="Enter your email" />
                        </Input>
                    </FormControl>
                </VStack>

                <Button bg="$violet500" onPress={() => router.back()} size="lg">
                    <ButtonText>Send Reset Link</ButtonText>
                </Button>

                <Button variant="link" onPress={() => router.back()} size="sm">
                    <ButtonText color="$textLight500">Back to Login</ButtonText>
                </Button>
            </VStack>
        </Center>
    );
}
