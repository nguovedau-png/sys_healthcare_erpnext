import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { VStack, Input, InputField, Button, ButtonText, Heading, Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from '@gluestack-ui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const EmployeeFormScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [userId, setUserId] = useState('');
    const [departments, setDepartments] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<any>();
    const route = useRoute<{ key: string; name: string; params?: { id?: string; employee?: any } }>();
    const { id, employee } = route.params || {};

    useEffect(() => {
        fetchDepartments();
        fetchUsers();
        if (employee) {
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setPosition(employee.position);
            setDepartmentId(employee.department?.id || '');
            setUserId(employee.user?.id || '');
        }
    }, []);

    const fetchDepartments = async () => {
        try {
            const res = await api.get('/departments');
            if (res.data.success) {
                setDepartments(res.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch departments');
        }
    };

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

    const handleSubmit = async () => {
        if (!firstName || !lastName || !position || !departmentId) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }

        setLoading(true);
        try {
            const payload = { firstName, lastName, position, departmentId, userId: userId || undefined };

            if (id) {
                await api.put(`/employees/${id}`, payload);
                Alert.alert('Success', 'Employee updated successfully');
            } else {
                await api.post('/employees', payload);
                Alert.alert('Success', 'Employee created successfully');
            }
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView>
            <VStack flex={1} p="$4" space="md">
                <Heading size="xl">{id ? 'Edit Employee' : 'Create Employee'}</Heading>

                <Input>
                    <InputField
                        placeholder="First Name *"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </Input>

                <Input>
                    <InputField
                        placeholder="Last Name *"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </Input>

                <Input>
                    <InputField
                        placeholder="Position *"
                        value={position}
                        onChangeText={setPosition}
                    />
                </Input>

                <Select selectedValue={departmentId} onValueChange={setDepartmentId}>
                    <SelectTrigger>
                        <SelectInput placeholder="Select Department *" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            {departments.map((dept: any) => (
                                <SelectItem key={dept.id} label={dept.name} value={dept.id} />
                            ))}
                        </SelectContent>
                    </SelectPortal>
                </Select>

                <Select selectedValue={userId} onValueChange={setUserId}>
                    <SelectTrigger>
                        <SelectInput placeholder="Select User (Optional)" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectItem label="None" value="" />
                            {users.map((user: any) => (
                                <SelectItem key={user.id} label={`${user.fullName} (${user.email})`} value={user.id} />
                            ))}
                        </SelectContent>
                    </SelectPortal>
                </Select>

                <Button onPress={handleSubmit} isDisabled={loading} mt="$4">
                    <ButtonText>{loading ? 'Saving...' : id ? 'Update' : 'Create'}</ButtonText>
                </Button>

                <Button variant="outline" onPress={() => navigation.goBack()}>
                    <ButtonText>Cancel</ButtonText>
                </Button>
            </VStack>
        </ScrollView>
    );
};

export default EmployeeFormScreen;
