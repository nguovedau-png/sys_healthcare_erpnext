import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { VStack, HStack, Text, Button, ButtonText, Heading, Box, Badge, BadgeText } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const EmployeeListScreen = () => {
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<any>();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await api.get('/employees');
            if (res.data.success) {
                setEmployees(res.data.data);
            }
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    const renderEmployee = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation.navigate('EmployeeDetail' as never, { id: item.id } as never)}>
            <Box bg="$white" p="$4" mb="$2" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
                <HStack justifyContent="space-between" alignItems="center">
                    <VStack flex={1}>
                        <Text fontSize="$lg" fontWeight="$bold">
                            {item.firstName} {item.lastName}
                        </Text>
                        <Text fontSize="$sm" color="$textLight600">{item.position}</Text>
                        <Badge action="info" mt="$2" alignSelf="flex-start">
                            <BadgeText>{item.department?.name}</BadgeText>
                        </Badge>
                    </VStack>
                </HStack>
            </Box>
        </TouchableOpacity>
    );

    return (
        <VStack flex={1} bg="$backgroundLight50" p="$4">
            <HStack justifyContent="space-between" alignItems="center" mb="$4">
                <Heading size="xl">Employees</Heading>
                <Button size="sm" onPress={() => navigation.navigate('EmployeeCreate' as never)}>
                    <ButtonText>Add</ButtonText>
                </Button>
            </HStack>

            <FlatList
                data={employees}
                renderItem={renderEmployee}
                keyExtractor={(item: any) => item.id}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchEmployees} />
                }
                ListEmptyComponent={
                    <Box p="$8" alignItems="center">
                        <Text color="$textLight400">No employees found</Text>
                    </Box>
                }
            />
        </VStack>
    );
};

export default EmployeeListScreen;
