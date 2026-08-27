import React, { useState } from 'react';
import { VStack, Input, InputField, Button, ButtonText, Heading, Text, Center } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await api.post('/auth/forgot-password', { email });
            if (response.data.success) {
                Alert.alert('Success', 'Password reset link sent to your email');
                setEmailSent(true);
            }
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Center flex={1} px="$4">
            <VStack space="lg" width="100%" maxWidth={400}>
                <Heading size="xl">Forgot Password</Heading>
                {!emailSent ? (
                    <>
                        <Text>Enter your email address and we'll send you a link to reset your password</Text>
                        
                        <Input>
                            <InputField
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </Input>

                        <Button onPress={handleSubmit} isDisabled={loading}>
                            <ButtonText>{loading ? 'Sending...' : 'Send Reset Link'}</ButtonText>
                        </Button>

                        <Button variant="link" onPress={() => navigation.goBack()}>
                            <ButtonText>Back to Login</ButtonText>
                        </Button>
                    </>
                ) : (
                    <>
                        <Text>Check your email for the password reset link</Text>
                        <Button onPress={() => navigation.goBack()}>
                            <ButtonText>Back to Login</ButtonText>
                        </Button>
                    </>
                )}
            </VStack>
        </Center>
    );
};

export default ForgotPasswordScreen;
