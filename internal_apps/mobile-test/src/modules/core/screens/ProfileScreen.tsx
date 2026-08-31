import React, { useState } from 'react';
import { ScrollView, Alert, TouchableOpacity } from 'react-native';
import { VStack, HStack, Text, Button, ButtonText, Heading, Box, Input, InputField, Icon, Center, Avatar, AvatarFallbackText } from '@gluestack-ui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { logout } from '../../auth/store/authSlice';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { authStorage } from '../../../services/authStorage';
import { LogOut, User, Mail, Phone, Edit2, CheckCircle2, X } from 'lucide-react-native';

const ProfileScreen = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const [editMode, setEditMode] = useState(false);
    const [fullName, setFullName] = useState(user?.full_name || '');
    const [mobileNo, setMobileNo] = useState(user?.mobile_no || '');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            // Frappe Update Document
            await api.put(`/api/resource/User/${user?.name}`, { 
                full_name: fullName, 
                mobile_no: mobileNo 
            });
            Alert.alert('Success', 'Profile updated successfully');
            setEditMode(false);
            // In a real app we'd dispatch update session here
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: async () => {
                        // Fire-and-forget server logout; don't block UI on it
                        api.post('/api/method/logout').catch(() => {});
                        // Always clear local state immediately
                        await authStorage.clearTokens();
                        dispatch(logout());
                    },
                },
            ]
        );
    };

    return (
        <ScrollView style={{ backgroundColor: '#0f172a' }}>
            <VStack flex={1} p="$6" space="xl">
                <HStack justifyContent="space-between" alignItems="center" mt="$4">
                    <Heading size="2xl" color="$white">My Profile</Heading>
                    <TouchableOpacity onPress={handleLogout}>
                        <Icon as={LogOut} color="$error400" size="xl" />
                    </TouchableOpacity>
                </HStack>

                <Center mt="$4" mb="$2">
                    <Avatar bgColor="$primary500" size="2xl" borderRadius="$full">
                        <AvatarFallbackText>{user?.full_name || 'User'}</AvatarFallbackText>
                    </Avatar>
                    <Text color="$white" size="xl" fontWeight="$bold" mt="$4">{user?.full_name}</Text>
                    <Text color="$textDark400" size="md">{user?.name || user?.email}</Text>
                </Center>

                <Box bg="rgba(30, 41, 59, 0.7)" p="$6" borderRadius="$3xl" borderWidth={1} borderColor="$borderDark700">
                    <HStack justifyContent="space-between" alignItems="center" mb="$6">
                        <Text size="lg" color="$white" fontWeight="$bold">Personal Information</Text>
                        <TouchableOpacity onPress={() => { setEditMode(!editMode); }}>
                            <Icon as={editMode ? X : Edit2} color="$primary400" size="md" />
                        </TouchableOpacity>
                    </HStack>

                    <VStack space="lg">
                        {editMode ? (
                            <>
                                <VStack space="sm">
                                    <Text color="$textDark400" size="sm">Full Name</Text>
                                    <Input variant="rounded" size="md" bg="$backgroundDark800" borderColor="$borderDark700">
                                        <InputField value={fullName} onChangeText={setFullName} color="$white" />
                                    </Input>
                                </VStack>

                                <VStack space="sm">
                                    <Text color="$textDark400" size="sm">Email (Read Only)</Text>
                                    <Input variant="rounded" size="md" bg="$backgroundDark700" borderColor="$borderDark700" isDisabled>
                                        <InputField value={user?.email || user?.name} color="$textDark300" />
                                    </Input>
                                </VStack>

                                <VStack space="sm">
                                    <Text color="$textDark400" size="sm">Mobile Number</Text>
                                    <Input variant="rounded" size="md" bg="$backgroundDark800" borderColor="$borderDark700">
                                        <InputField value={mobileNo} onChangeText={setMobileNo} color="$white" />
                                    </Input>
                                </VStack>

                                <Button onPress={handleUpdate} isDisabled={loading} mt="$4" borderRadius="$full" action="primary">
                                    <HStack space="sm" alignItems="center">
                                        <Icon as={CheckCircle2} color="$white" size="sm" />
                                        <ButtonText>Save Changes</ButtonText>
                                    </HStack>
                                </Button>
                            </>
                        ) : (
                            <>
                                <HStack space="md" alignItems="center">
                                    <Box p="$2" bg="$backgroundDark800" borderRadius="$md">
                                        <Icon as={User} color="$primary400" />
                                    </Box>
                                    <VStack>
                                        <Text color="$textDark400" size="sm">Full Name</Text>
                                        <Text color="$white" size="md" fontWeight="$medium">{user?.full_name}</Text>
                                    </VStack>
                                </HStack>

                                <HStack space="md" alignItems="center">
                                    <Box p="$2" bg="$backgroundDark800" borderRadius="$md">
                                        <Icon as={Mail} color="$primary400" />
                                    </Box>
                                    <VStack>
                                        <Text color="$textDark400" size="sm">Email</Text>
                                        <Text color="$white" size="md" fontWeight="$medium">{user?.email || user?.name}</Text>
                                    </VStack>
                                </HStack>

                                <HStack space="md" alignItems="center">
                                    <Box p="$2" bg="$backgroundDark800" borderRadius="$md">
                                        <Icon as={Phone} color="$primary400" />
                                    </Box>
                                    <VStack>
                                        <Text color="$textDark400" size="sm">Phone</Text>
                                        <Text color="$white" size="md" fontWeight="$medium">{user?.mobile_no || 'Not provided'}</Text>
                                    </VStack>
                                </HStack>
                            </>
                        )}
                    </VStack>
                </Box>
                
                <Button variant="outline" borderColor="$warning500" mt="$4" borderRadius="$full" onPress={() => navigation.navigate('ChangePassword' as never)}>
                    <ButtonText color="$warning500">Change Password</ButtonText>
                </Button>
            </VStack>
        </ScrollView>
    );
};

export default ProfileScreen;
