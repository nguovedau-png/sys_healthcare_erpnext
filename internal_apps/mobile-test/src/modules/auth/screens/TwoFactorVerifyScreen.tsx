import React, { useState } from 'react';
import { VStack, Input, InputField, Button, ButtonText, Heading, Text, Center } from '@gluestack-ui/themed';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { authStorage } from '../../../services/authStorage';
import api from '../../../services/api';
import { Alert } from 'react-native';

const TwoFactorVerifyScreen = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const { email, tempToken } = route.params || {};

    const handleVerify = async () => {
        if (code.length !== 6) {
            Alert.alert('Error', 'Please enter 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/login', {
                code,
                tempToken
            });

            if (response.data.success) {
                const { user, accessToken, refreshToken } = response.data.data;
                await authStorage.setTokens(accessToken, refreshToken);
                dispatch(setCredentials({ user, accessToken, refreshToken }));
                Alert.alert('Success', '2FA verified successfully');
                // Navigation handled by App.tsx state change or explicit navigate?
                // explicitly navigating inside a stack when auth state changes might cause race conditions or warnings
                // but usually fine. App.tsx will re-render and show MainNavigator.
            }
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || '2FA verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Center flex={1} px="$4">
            <VStack space="lg" width="100%" maxWidth={400}>
                <Heading size="xl">Two-Factor Authentication</Heading>
                <Text>Enter the 6-digit code from your authenticator app</Text>

                <Input>
                    <InputField
                        placeholder="Enter 6-digit code"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                        maxLength={6}
                        textAlign="center"
                    />
                </Input>

                <Button onPress={handleVerify} isDisabled={loading}>
                    <ButtonText>{loading ? 'Verifying...' : 'Verify'}</ButtonText>
                </Button>
            </VStack>
        </Center>
    );
};

export default TwoFactorVerifyScreen;
