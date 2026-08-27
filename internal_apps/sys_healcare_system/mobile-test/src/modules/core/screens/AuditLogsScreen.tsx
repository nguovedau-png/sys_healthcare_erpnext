import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { VStack, HStack, Text, Heading, Box, Badge, BadgeText } from '@gluestack-ui/themed';
import api from '../../../services/api';
import { Alert } from 'react-native';

const AuditLogsScreen = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await api.get('/audit-logs');
            if (res.data.success) {
                setLogs(res.data.data);
            }
        } catch (error: any) {
            Alert.alert('Error', 'Failed to fetch audit logs');
        } finally {
            setLoading(false);
        }
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case 'CREATE': return 'success';
            case 'UPDATE': return 'info';
            case 'DELETE': return 'error';
            default: return 'muted';
        }
    };

    const renderLog = ({ item }: any) => (
        <Box bg="$white" p="$3" mb="$2" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
            <VStack space="xs">
                <HStack justifyContent="space-between" alignItems="center">
                    <Badge action={getActionColor(item.action)}>
                        <BadgeText>{item.action}</BadgeText>
                    </Badge>
                    <Text fontSize="$xs" color="$textLight500">
                        {new Date(item.createdAt).toLocaleString()}
                    </Text>
                </HStack>
                <Text fontSize="$sm" fontWeight="$bold">{item.entity}</Text>
                <Text fontSize="$xs" color="$textLight600">
                    By: {item.user?.fullName || 'System'}
                </Text>
                {item.metadata && (
                    <Text fontSize="$xs" color="$textLight500" numberOfLines={2}>
                        {JSON.stringify(item.metadata)}
                    </Text>
                )}
            </VStack>
        </Box>
    );

    return (
        <VStack flex={1} bg="$backgroundLight50" p="$4">
            <Heading size="xl" mb="$4">Audit Logs</Heading>

            <FlatList
                data={logs}
                renderItem={renderLog}
                keyExtractor={(item: any) => item.id}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchLogs} />
                }
                ListEmptyComponent={
                    <Box p="$8" alignItems="center">
                        <Text color="$textLight400">No audit logs found</Text>
                    </Box>
                }
            />
        </VStack>
    );
};

export default AuditLogsScreen;
