import React, { useState } from 'react';
import { VStack, Input, InputField, Button, ButtonText, Heading, Text, Center } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const RegisterScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/register', {
                email,
                password,
                fullName
            });

            if (response.data.success) {
                Alert.alert('Success', 'Registration successful! Please login');
                navigation.navigate('Login' as never);
            }
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Center flex={1} px="$4">
            <VStack space="lg" width="100%" maxWidth={400}>
                <Heading size="xl">Register</Heading>

                <Input>
                    <InputField
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </Input>

                <Input>
                    <InputField
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </Input>

                <Input>
                    <InputField
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        type="password"
                    />
                </Input>

                <Input>
                    <InputField
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        type="password"
                    />
                </Input>

                <Button onPress={handleRegister} isDisabled={loading}>
                    <ButtonText>{loading ? 'Registering...' : 'Register'}</ButtonText>
                </Button>

                <Button variant="link" onPress={() => navigation.navigate('Login' as never)}>
                    <ButtonText>Already have an account? Login</ButtonText>
                </Button>
            </VStack>
        </Center>
    );
};

export default RegisterScreen;
