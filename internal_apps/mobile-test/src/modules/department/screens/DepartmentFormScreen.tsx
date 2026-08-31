import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { VStack, Input, InputField, Button, ButtonText, Heading, Textarea, TextareaInput } from '@gluestack-ui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert } from 'react-native';

const DepartmentFormScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { id, department } = route.params || {};

    useEffect(() => {
        if (department) {
            setName(department.name);
            setDescription(department.description || '');
        }
    }, []);

    const handleSubmit = async () => {
        if (!name) {
            Alert.alert('Error', 'Please enter department name');
            return;
        }

        setLoading(true);
        try {
            const payload = { name, description };

            if (id) {
                await api.put(`/departments/${id}`, payload);
                Alert.alert('Success', 'Department updated successfully');
            } else {
                await api.post('/departments', payload);
                Alert.alert('Success', 'Department created successfully');
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
                <Heading size="xl">{id ? 'Edit Department' : 'Create Department'}</Heading>

                <Input>
                    <InputField
                        placeholder="Department Name *"
                        value={name}
                        onChangeText={setName}
                    />
                </Input>

                <Textarea>
                    <TextareaInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        numberOfLines={4}
                    />
                </Textarea>

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

export default DepartmentFormScreen;
