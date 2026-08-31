import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Button, ButtonText, Input, InputField, Switch, Heading, Badge, BadgeText } from '@gluestack-ui/themed';
import { Plus, Trash2, Zap } from 'lucide-react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { API_URL } from '../../../services/api';

const WebhookScreen = () => {
    const [webhooks, setWebhooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const token = useSelector((state: RootState) => state.auth.token);

    // Form State
    const [url, setUrl] = useState('');
    const [secret, setSecret] = useState('');
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

    const availableEvents = ['user.created', 'job.completed', 'job.failed', 'system.ping'];

    const fetchWebhooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/webhooks`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setWebhooks(response.data.data);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load webhooks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebhooks();
    }, []);

    const handleCreate = async () => {
        if (!url || !secret || selectedEvents.length === 0) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            await axios.post(`${API_URL}/webhooks`, {
                url, secret, events: selectedEvents, isActive: true
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert('Success', 'Webhook created');
            setModalVisible(false);
            resetForm();
            fetchWebhooks();
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to create webhook');
        }
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Webhook",
            "Are you sure?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await axios.delete(`${API_URL}/webhooks/${id}`, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                            fetchWebhooks();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete webhook');
                        }
                    }
                }
            ]
        );
    };

    const handleTest = async (webhook: any) => {
        try {
            await axios.post(`${API_URL}/webhooks/trigger`, {
                event: 'system.ping',
                payload: {
                    message: 'Mobile Test Event',
                    timestamp: new Date().toISOString(),
                    target_url: webhook.url
                }
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert('Success', 'Test event triggered');
        } catch (error) {
            Alert.alert('Error', 'Failed to trigger test');
        }
    };

    const toggleEvent = (event: string) => {
        if (selectedEvents.includes(event)) {
            setSelectedEvents(selectedEvents.filter(e => e !== event));
        } else {
            setSelectedEvents([...selectedEvents, event]);
        }
    };

    const resetForm = () => {
        setUrl('');
        setSecret('');
        setSelectedEvents([]);
    };

    const renderItem = ({ item }: { item: any }) => (
        <Box bg="$white" p="$4" mb="$3" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
            <VStack space="sm">
                <Text fontWeight="$bold" fontSize="$md">{item.url}</Text>

                <HStack space="xs" flexWrap="wrap">
                    {item.events.map((e: string) => (
                        <Badge key={e} size="sm" variant="outline" action="info" mr="$1" mb="$1">
                            <BadgeText>{e}</BadgeText>
                        </Badge>
                    ))}
                </HStack>

                <HStack justifyContent="space-between" alignItems="center" mt="$2">
                    <Badge size="md" variant="solid" action={item.isActive ? 'success' : 'error'}>
                        <BadgeText>{item.isActive ? 'Active' : 'Inactive'}</BadgeText>
                    </Badge>

                    <HStack space="md">
                        <TouchableOpacity onPress={() => handleTest(item)}>
                            <Zap size={20} color="#eab308" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Trash2 size={20} color="#ef4444" />
                        </TouchableOpacity>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={webhooks}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                refreshing={loading}
                onRefresh={fetchWebhooks}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={<Text textAlign="center" mt="$10" color="$textLight500">No webhooks found</Text>}
            />

            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <Plus color="#fff" size={24} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Heading size="lg" mb="$4">New Webhook</Heading>

                        <VStack space="md">
                            <Input>
                                <InputField placeholder="Target URL" value={url} onChangeText={setUrl} />
                            </Input>

                            <Input>
                                <InputField placeholder="Secret Key" type="password" value={secret} onChangeText={setSecret} />
                            </Input>

                            <Text fontWeight="$bold" mt="$2">Select Events:</Text>
                            <HStack flexWrap="wrap">
                                {availableEvents.map(event => (
                                    <TouchableOpacity
                                        key={event}
                                        style={[
                                            styles.chip,
                                            selectedEvents.includes(event) && styles.chipSelected
                                        ]}
                                        onPress={() => toggleEvent(event)}
                                    >
                                        <Text color={selectedEvents.includes(event) ? '$white' : '$textLight800'} size="xs">
                                            {event}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </HStack>
                        </VStack>

                        <HStack space="md" mt="$6" justifyContent="flex-end">
                            <Button variant="outline" onPress={() => setModalVisible(false)}>
                                <ButtonText>Cancel</ButtonText>
                            </Button>
                            <Button onPress={handleCreate}>
                                <ButtonText>Create</ButtonText>
                            </Button>
                        </HStack>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5
    },
    chip: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#e2e8f0',
        marginRight: 8,
        marginBottom: 8,
    },
    chipSelected: {
        backgroundColor: '#2563eb',
    }
});

export default WebhookScreen;
