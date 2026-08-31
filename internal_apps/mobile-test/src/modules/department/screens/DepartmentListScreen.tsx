import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity, Alert as RNAlert } from 'react-native';
import { VStack, HStack, Text, Button, ButtonText, Heading, Box } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const DepartmentListScreen = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const res = await api.get('/departments');
            if (res.data.success) {
                setDepartments(res.data.data);
            }
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to fetch departments');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string, name: string) => {
        RNAlert.alert(
            'Delete Department',
            `Are you sure you want to delete "${name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/departments/${id}`);
                            Alert.alert('Success', 'Department deleted successfully');
                            fetchDepartments();
                        } catch (error: any) {
                            Alert.alert('Error', error.response?.data?.message || 'Failed to delete department');
                        }
                    }
                }
            ]
        );
    };

    const renderDepartment = ({ item }: any) => (
        <Box bg="$white" p="$4" mb="$2" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
            <VStack space="sm">
                <HStack justifyContent="space-between" alignItems="center">
                    <Text fontSize="$lg" fontWeight="$bold" flex={1}>{item.name}</Text>
                    <Text fontSize="$sm" color="$textLight600">{item._count?.employees || 0} employees</Text>
                </HStack>
                {item.description && (
                    <Text fontSize="$sm" color="$textLight600">{item.description}</Text>
                )}
                <HStack space="sm" mt="$2">
                    <Button 
                        size="sm" 
                        flex={1}
                        onPress={() => navigation.navigate('DepartmentEdit' as never, { id: item.id, department: item } as never)}
                    >
                        <ButtonText>Edit</ButtonText>
                    </Button>
                    <Button size="sm" flex={1} action="negative" onPress={() => handleDelete(item.id, item.name)}>
                        <ButtonText>Delete</ButtonText>
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );

    return (
        <VStack flex={1} bg="$backgroundLight50" p="$4">
            <HStack justifyContent="space-between" alignItems="center" mb="$4">
                <Heading size="xl">Departments</Heading>
                <Button size="sm" onPress={() => navigation.navigate('DepartmentCreate' as never)}>
                    <ButtonText>Add</ButtonText>
                </Button>
            </HStack>

            <FlatList
                data={departments}
                renderItem={renderDepartment}
                keyExtractor={(item: any) => item.id}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchDepartments} />
                }
                ListEmptyComponent={
                    <Box p="$8" alignItems="center">
                        <Text color="$textLight400">No departments found</Text>
                    </Box>
                }
            />
        </VStack>
    );
};

export default DepartmentListScreen;
