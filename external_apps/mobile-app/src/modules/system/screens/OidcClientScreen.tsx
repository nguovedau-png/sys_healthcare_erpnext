import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Box, Text, Heading, VStack, HStack, Pressable, Icon, Fab, FabIcon, AddIcon, TrashIcon, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, ButtonText, Input, InputField, Toast, useToast, ToastTitle, ToastDescription } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Key } from 'lucide-react-native';

const OidcClientScreen = () => {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [redirectUris, setRedirectUris] = useState('');
    const toast = useToast();

    const fetchClients = async () => {
        try {
            const res = await axios.get('/api/v1/oidc/clients');
            setClients(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleCreate = async () => {
        try {
            const uris = redirectUris.split(',').map(u => u.trim()).filter(u => u);
            await axios.post('/api/v1/oidc/clients', {
                clientName: name,
                redirectUris: uris
            });
            setShowModal(false);
            setName('');
            setRedirectUris('');
            fetchClients();
            toast.show({
                placement: "top",
                render: ({ id }) => {
                    return (
                        <Toast nativeID={"toast-" + id} action="success" variant="accent">
                            <VStack space="xs">
                                <ToastTitle>Success</ToastTitle>
                                <ToastDescription>OAuth App Created</ToastDescription>
                            </VStack>
                        </Toast>
                    )
                }
            })
        } catch (error) {
            Alert.alert('Error', 'Failed to create app');
        }
    };

    const handleDelete = async (id: string, name: string) => {
        Alert.alert('Delete App', `Are you sure you want to delete ${name}?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await axios.delete(`/api/v1/oidc/clients/${id}`);
                    fetchClients();
                }
            }
        ]);
    };

    const renderItem = ({ item }: any) => (
        <Box bg="$white" p="$4" mb="$3" borderRadius="$lg" softShadow="1">
            <HStack justifyContent="space-between" alignItems="center">
                <VStack>
                    <Heading size="sm">{item.clientName}</Heading>
                    <Text size="xs" color="$coolGray500" mt="$1">ID: {item.clientId}</Text>
                    <Text size="xs" color="$coolGray400">{item.redirectUris.length} Redirect URIs</Text>
                </VStack>
                <Pressable onPress={() => handleDelete(item.id, item.clientName)}>
                    <Icon as={TrashIcon} color="$red500" />
                </Pressable>
            </HStack>
        </Box>
    );

    return (
        <Box flex={1} bg="$coolGray100" px="$4" pt="$4">
            <FlatList
                data={clients}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <Fab
                size="lg"
                placement="bottom right"
                bg="$indigo600"
                onPress={() => setShowModal(true)}
            >
                <FabIcon as={AddIcon} />
            </Fab>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="lg">New OAuth App</Heading>
                        <ModalCloseButton><Icon as={AddIcon} /></ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <VStack space="md">
                            <Text size="sm">App Name</Text>
                            <Input>
                                <InputField value={name} onChangeText={setName} placeholder="My App" />
                            </Input>
                            <Text size="sm">Redirect URIs (comma separated)</Text>
                            <Input>
                                <InputField value={redirectUris} onChangeText={setRedirectUris} placeholder="https://..." />
                            </Input>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="outline" size="sm" action="secondary" mr="$3" onPress={() => setShowModal(false)}>
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button size="sm" onPress={handleCreate}>
                            <ButtonText>Create</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default OidcClientScreen;
