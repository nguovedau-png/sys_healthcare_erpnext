import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack, Input, InputField, Button, ButtonText, Heading } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const ChangePasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/change-password', {
                currentPassword,
                newPassword
            });
            Alert.alert('Success', 'Password changed successfully');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView>
            <VStack flex={1} p="$4" space="md">
                <Heading size="xl">Change Password</Heading>

                <Input>
                    <InputField
                        placeholder="Current Password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        type="password"
                    />
                </Input>

                <Input>
                    <InputField
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        type="password"
                    />
                </Input>

                <Input>
                    <InputField
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        type="password"
                    />
                </Input>

                <Button onPress={handleSubmit} isDisabled={loading} mt="$4">
                    <ButtonText>{loading ? 'Changing...' : 'Change Password'}</ButtonText>
                </Button>

                <Button variant="outline" onPress={() => navigation.goBack()}>
                    <ButtonText>Cancel</ButtonText>
                </Button>
            </VStack>
        </ScrollView>
    );
};

export default ChangePasswordScreen;
