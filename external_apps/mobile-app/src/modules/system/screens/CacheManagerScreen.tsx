import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Alert } from 'react-native';
import { Box, Text, VStack, HStack, Button, ButtonText, Input, InputField, Heading, Spinner, Pressable, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Icon, CloseIcon, TrashIcon } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import api from '../../../services/api';

const CacheManagerScreen = () => {
    const { t } = useTranslation();
    const [keys, setKeys] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    // Detail Modal
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [keyDetail, setKeyDetail] = useState<any>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const fetchKeys = async (pattern = '*') => {
        setLoading(true);
        try {
            const res = await api.get('/cache/keys', { params: { pattern } });
            if (res.data.success) {
                setKeys(res.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch keys');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    const handleSearch = () => {
        const pattern = search ? `*${search}*` : '*';
        fetchKeys(pattern);
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchKeys(search ? `*${search}*` : '*');
    };

    const handleView = async (key: string) => {
        setSelectedKey(key);
        setShowModal(true);
        setDetailLoading(true);
        try {
            const res = await api.get('/cache/item', { params: { key } });
            if (res.data.success) {
                setKeyDetail(res.data.data);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load key detail');
        } finally {
            setDetailLoading(false);
        }
    };

    const handleDelete = async (key: string) => {
        Alert.alert(
            'Delete Key',
            `Are you sure you want to delete ${key}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete('/cache/item', { params: { key } });
                            if (selectedKey === key) setShowModal(false);
                            handleRefresh();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete key');
                        }
                    }
                }
            ]
        );
    };

    const handleClearAll = () => {
        Alert.alert(
            'Clear All Cache',
            'Are you sure you want to delete ALL cache keys? This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete('/cache/clear');
                            handleRefresh();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to clear cache');
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: string }) => (
        <Box
            borderBottomWidth={1}
            borderColor="$borderLight200"
            py="$3"
            px="$4"
            bg="$white"
        >
            <HStack justifyContent="space-between" alignItems="center">
                <Pressable onPress={() => handleView(item)} flex={1}>
                    <Text numberOfLines={1} fontWeight="$medium">{item}</Text>
                </Pressable>
                <Button size="xs" variant="link" action="negative" onPress={() => handleDelete(item)}>
                    <ButtonText color="$red500">Delete</ButtonText>
                </Button>
            </HStack>
        </Box>
    );

    return (
        <Box flex={1} bg="$backgroundLight100">
            <VStack space="md" p="$4" pt="$10">
                <Heading>Cache Manager</Heading>
                <HStack space="sm">
                    <Input flex={1} size="sm">
                        <InputField
                            placeholder="Search pattern..."
                            value={search}
                            onChangeText={setSearch}
                            onSubmitEditing={handleSearch}
                        />
                    </Input>
                    <Button size="sm" onPress={handleSearch}>
                        <ButtonText>Search</ButtonText>
                    </Button>
                </HStack>
                <Button size="sm" action="negative" variant="outline" onPress={handleClearAll}>
                    <ButtonText>Clear All Cache</ButtonText>
                </Button>
            </VStack>

            {loading && !refreshing ? (
                <Spinner />
            ) : (
                <FlatList
                    data={keys}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            >
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="lg" numberOfLines={1}>{selectedKey}</Heading>
                        <ModalCloseButton>
                            <Icon as={CloseIcon} />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        {detailLoading ? (
                            <Spinner />
                        ) : keyDetail ? (
                            <VStack space="md">
                                <HStack justifyContent="space-between">
                                    <Text fontWeight="$bold">TTL:</Text>
                                    <Text>{keyDetail.ttl === -1 ? 'Persist' : `${keyDetail.ttl}s`}</Text>
                                </HStack>
                                <VStack>
                                    <Text fontWeight="$bold">Value:</Text>
                                    <Box bg="$backgroundLight100" p="$2" borderRadius="$sm" mt="$2" maxHeight={300}>
                                        <Text fontFamily="monospace" fontSize="$xs">
                                            {typeof keyDetail.value === 'object' ? JSON.stringify(keyDetail.value, null, 2) : String(keyDetail.value)}
                                        </Text>
                                    </Box>
                                </VStack>
                            </VStack>
                        ) : (
                            <Text>No detail available</Text>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default CacheManagerScreen;
