import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { VStack, HStack, Text, Heading, Box, Badge, BadgeText } from '@gluestack-ui/themed';
import api from '../../../services/api';
import { Alert } from 'react-native';

const RolesScreen = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const res = await api.get('/roles');
            if (res.data.success) {
                setRoles(res.data.data);
            }
        } catch (error: any) {
            Alert.alert('Error', 'Failed to fetch roles');
        } finally {
            setLoading(false);
        }
    };

    const renderRole = ({ item }: any) => (
        <Box bg="$white" p="$4" mb="$2" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
            <VStack space="sm">
                <Text fontSize="$lg" fontWeight="$bold">{item.name}</Text>
                {item.description && (
                    <Text fontSize="$sm" color="$textLight600">{item.description}</Text>
                )}
                <HStack flexWrap="wrap" gap="$2" mt="$2">
                    {item.permissions?.slice(0, 5).map((perm: any) => (
                        <Badge key={perm.id} action="info">
                            <BadgeText>{perm.name}</BadgeText>
                        </Badge>
                    ))}
                    {item.permissions?.length > 5 && (
                        <Badge>
                            <BadgeText>+{item.permissions.length - 5} more</BadgeText>
                        </Badge>
                    )}
                </HStack>
                <Text fontSize="$sm" color="$textLight600" mt="$2">
                    {item._count?.users || 0} users
                </Text>
            </VStack>
        </Box>
    );

    return (
        <VStack flex={1} bg="$backgroundLight50" p="$4">
            <Heading size="xl" mb="$4">Roles & Permissions</Heading>

            <FlatList
                data={roles}
                renderItem={renderRole}
                keyExtractor={(item: any) => item.id}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchRoles} />
                }
                ListEmptyComponent={
                    <Box p="$8" alignItems="center">
                        <Text color="$textLight400">No roles found</Text>
                    </Box>
                }
            />
        </VStack>
    );
};

export default RolesScreen;
