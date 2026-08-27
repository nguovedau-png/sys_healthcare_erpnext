import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Text, Button, ButtonText, Heading, Box, Input, InputField, Switch } from '@gluestack-ui/themed';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const ProfileScreen = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [editMode, setEditMode] = useState(false);
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await api.put(`/users/${user?.id}`, { fullName, phoneNumber });
            Alert.alert('Success', 'Profile updated successfully');
            setEditMode(false);
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView>
            <VStack flex={1} p="$4" space="lg">
                <Heading size="xl">Profile</Heading>

                <Box bg="$white" p="$4" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
                    <VStack space="md">
                        {editMode ? (
                            <>
                                <VStack space="sm">
                                    <Text fontWeight="$bold">Full Name</Text>
                                    <Input>
                                        <InputField value={fullName} onChangeText={setFullName} />
                                    </Input>
                                </VStack>

                                <VStack space="sm">
                                    <Text fontWeight="$bold">Email</Text>
                                    <Input isDisabled>
                                        <InputField value={user?.email} />
                                    </Input>
                                </VStack>

                                <VStack space="sm">
                                    <Text fontWeight="$bold">Phone Number</Text>
                                    <Input>
                                        <InputField value={phoneNumber} onChangeText={setPhoneNumber} />
                                    </Input>
                                </VStack>

                                <HStack space="sm">
                                    <Button flex={1} onPress={handleUpdate} isDisabled={loading}>
                                        <ButtonText>Save</ButtonText>
                                    </Button>
                                    <Button flex={1} variant="outline" onPress={() => setEditMode(false)}>
                                        <ButtonText>Cancel</ButtonText>
                                    </Button>
                                </HStack>
                            </>
                        ) : (
                            <>
                                <HStack justifyContent="space-between">
                                    <Text fontWeight="$bold">Full Name:</Text>
                                    <Text>{user?.fullName}</Text>
                                </HStack>

                                <HStack justifyContent="space-between">
                                    <Text fontWeight="$bold">Email:</Text>
                                    <Text>{user?.email}</Text>
                                </HStack>

                                <HStack justifyContent="space-between">
                                    <Text fontWeight="$bold">Phone:</Text>
                                    <Text>{user?.phoneNumber || 'N/A'}</Text>
                                </HStack>

                                <HStack justifyContent="space-between">
                                    <Text fontWeight="$bold">Role:</Text>
                                    <Text>{user?.role}</Text>
                                </HStack>

                                <Button onPress={() => setEditMode(true)}>
                                    <ButtonText>Edit Profile</ButtonText>
                                </Button>
                            </>
                        )}
                    </VStack>
                </Box>

                <Button onPress={() => navigation.navigate('ChangePassword' as never)}>
                    <ButtonText>Change Password</ButtonText>
                </Button>

                <Box bg="$white" p="$4" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
                    <VStack space="md">
                        <Text fontWeight="$bold" fontSize="$lg">Two-Factor Authentication</Text>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text>2FA Status:</Text>
                            <HStack space="sm" alignItems="center">
                                <Switch value={user?.is2FAEnabled} isDisabled />
                                <Text>{user?.is2FAEnabled ? 'Enabled' : 'Disabled'}</Text>
                            </HStack>
                        </HStack>
                        <Button size="sm" onPress={() => navigation.navigate('TwoFactorSetup' as never)}>
                            <ButtonText>{user?.is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}</ButtonText>
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </ScrollView>
    );
};

export default ProfileScreen;
