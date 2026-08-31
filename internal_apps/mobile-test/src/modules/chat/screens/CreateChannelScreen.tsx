import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, Input, InputField, Button, ButtonText, Heading, Text, Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel, CheckIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const CreateChannelScreen = () => {
    const [channelType, setChannelType] = useState<'direct' | 'group'>('direct');
    const [groupName, setGroupName] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch users');
        }
    };

    const toggleUser = (userId: string) => {
        if (channelType === 'direct') {
            setSelectedUsers([userId]);
        } else {
            setSelectedUsers(prev =>
                prev.includes(userId)
                    ? prev.filter(id => id !== userId)
                    : [...prev, userId]
            );
        }
    };

    const handleCreate = async () => {
        if (channelType === 'direct' && selectedUsers.length !== 1) {
            Alert.alert('Error', 'Please select one user for direct chat');
            return;
        }
        if (channelType === 'group' && (selectedUsers.length < 2 || !groupName.trim())) {
            Alert.alert('Error', 'Please enter group name and select at least 2 users');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/chat/channels', {
                type: channelType,
                name: channelType === 'group' ? groupName : undefined,
                participantIds: selectedUsers
            });

            if (res.data.success) {
                Alert.alert('Success', 'Channel created successfully');
                navigation.goBack();
            }
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to create channel');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView>
            <VStack flex={1} p="$4" space="md">
                <Heading size="xl">Create Chat</Heading>

                <HStack space="md">
                    <Button
                        flex={1}
                        variant={channelType === 'direct' ? 'solid' : 'outline'}
                        onPress={() => {
                            setChannelType('direct');
                            setSelectedUsers([]);
                        }}
                    >
                        <ButtonText>Direct Chat</ButtonText>
                    </Button>
                    <Button
                        flex={1}
                        variant={channelType === 'group' ? 'solid' : 'outline'}
                        onPress={() => {
                            setChannelType('group');
                            setSelectedUsers([]);
                        }}
                    >
                        <ButtonText>Group Chat</ButtonText>
                    </Button>
                </HStack>

                {channelType === 'group' && (
                    <Input>
                        <InputField
                            placeholder="Group Name"
                            value={groupName}
                            onChangeText={setGroupName}
                        />
                    </Input>
                )}

                <Text fontWeight="$bold">
                    Select {channelType === 'direct' ? 'User' : 'Users'} ({selectedUsers.length} selected)
                </Text>

                <VStack space="sm">
                    {users.map((user: any) => (
                        <Checkbox
                            key={user.id}
                            value={user.id}
                            isChecked={selectedUsers.includes(user.id)}
                            onChange={() => toggleUser(user.id)}
                        >
                            <CheckboxIndicator mr="$2">
                                <CheckboxIcon as={CheckIcon} />
                            </CheckboxIndicator>
                            <CheckboxLabel>
                                {user.fullName} ({user.email})
                            </CheckboxLabel>
                        </Checkbox>
                    ))}
                </VStack>

                <Button onPress={handleCreate} isDisabled={loading} mt="$4">
                    <ButtonText>{loading ? 'Creating...' : 'Create Channel'}</ButtonText>
                </Button>

                <Button variant="outline" onPress={() => navigation.goBack()}>
                    <ButtonText>Cancel</ButtonText>
                </Button>
            </VStack>
        </ScrollView>
    );
};

export default CreateChannelScreen;
