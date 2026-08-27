import React, { useState } from 'react';
import { Box, Button, ButtonText, Input, InputField, Text, VStack, Heading, Center, FormControl, FormControlLabel, FormControlLabelText } from '@gluestack-ui/themed';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setCredentials } from '../store/authSlice';
import api from '../../../services/api';
import { Alert } from 'react-native';
import { authStorage } from '../../../services/authStorage';

const LoginScreen = () => {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('admin@123');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.success) {
                const { user, accessToken, refreshToken, requires2FA, tempToken } = response.data.data;

                if (requires2FA) {
                    navigation.navigate('TwoFactorVerify' as never, { email, tempToken } as never);
                } else {
                    await authStorage.setTokens(accessToken, refreshToken);
                    dispatch(setCredentials({ user, accessToken, refreshToken }));
                    Alert.alert('Success', 'Login successful');
                }
            }
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Center w="$full" h="$full" bg="$backgroundLight50">
            <Box w="$full" maxWidth="$96" p="$4">
                <VStack space="md">
                    <Heading size="3xl" color="$primary500">Welcome</Heading>
                    <Text size="sm" mb="$8">Sign in to continue</Text>

                    <FormControl>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText>Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputField
                                value={email}
                                onChangeText={setEmail}
                                type="text"
                                placeholder="name@example.com"
                                autoCapitalize="none"
                                testID="email-input"
                            />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText>Password</FormControlLabelText>
                        </FormControlLabel>
                        <Input>
                            <InputField
                                value={password}
                                onChangeText={setPassword}
                                type="password"
                                placeholder="Enter your password"
                                secureTextEntry={true}
                                testID="password-input"
                            />
                        </Input>
                    </FormControl >

                    <Button onPress={handleLogin} isDisabled={loading} mt="$4" testID="login-button">
                        <ButtonText>{loading ? 'Logging in...' : 'Login'}</ButtonText>
                    </Button>
                </VStack >
            </Box >
        </Center >
    );
};

export default LoginScreen;
