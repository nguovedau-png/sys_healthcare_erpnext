import React, { useEffect, useState } from 'react';
import { ScrollView, Alert as RNAlert } from 'react-native';
import { VStack, HStack, Text, Button, ButtonText, Heading, Box, Badge, BadgeText } from '@gluestack-ui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const EmployeeDetailScreen = () => {
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params || {};

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    const fetchEmployee = async () => {
        try {
            const res = await api.get(`/employees/${id}`);
            if (res.data.success) {
                setEmployee(res.data.data);
            }
        } catch (error: any) {
            Alert.alert('Error', 'Failed to fetch employee details');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        RNAlert.alert(
            'Delete Employee',
            'Are you sure you want to delete this employee?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/employees/${id}`);
                            Alert.alert('Success', 'Employee deleted successfully');
                            navigation.goBack();
                        } catch (error: any) {
                            Alert.alert('Error', error.response?.data?.message || 'Failed to delete employee');
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <VStack flex={1} justifyContent="center" alignItems="center">
                <Text>Loading...</Text>
            </VStack>
        );
    }

    if (!employee) {
        return (
            <VStack flex={1} justifyContent="center" alignItems="center">
                <Text>Employee not found</Text>
            </VStack>
        );
    }

    return (
        <ScrollView>
            <VStack flex={1} p="$4" space="lg">
                <Heading size="xl">{employee.firstName} {employee.lastName}</Heading>

                <Box bg="$white" p="$4" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
                    <VStack space="md">
                        <HStack justifyContent="space-between">
                            <Text fontWeight="$bold">Position:</Text>
                            <Text>{employee.position}</Text>
                        </HStack>

                        <HStack justifyContent="space-between">
                            <Text fontWeight="$bold">Department:</Text>
                            <Badge action="info">
                                <BadgeText>{employee.department?.name || 'N/A'}</BadgeText>
                            </Badge>
                        </HStack>

                        <HStack justifyContent="space-between">
                            <Text fontWeight="$bold">User Account:</Text>
                            <Text>{employee.user ? employee.user.email : 'No linked account'}</Text>
                        </HStack>

                        <HStack justifyContent="space-between">
                            <Text fontWeight="$bold">Created:</Text>
                            <Text fontSize="$sm">{new Date(employee.createdAt).toLocaleDateString()}</Text>
                        </HStack>
                    </VStack>
                </Box>

                <HStack space="md">
                    <Button
                        flex={1}
                        onPress={() => navigation.navigate('EmployeeEdit' as never, { id, employee } as never)}
                    >
                        <ButtonText>Edit</ButtonText>
                    </Button>
                    <Button flex={1} action="negative" onPress={handleDelete}>
                        <ButtonText>Delete</ButtonText>
                    </Button>
                </HStack>

                <Button variant="outline" onPress={() => navigation.goBack()}>
                    <ButtonText>Back</ButtonText>
                </Button>
            </VStack>
        </ScrollView>
    );
};

export default EmployeeDetailScreen;
