import React, { useState } from 'react';
import { Box, Button, ButtonText, Input, InputField, Text, VStack, Heading, Center, FormControl, FormControlLabel, FormControlLabelText, Icon, HStack, Image } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert, TouchableOpacity } from 'react-native';
import { UserPlus } from 'lucide-react-native';

const RegisterScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleRegister = async () => {
        if (!fullName || !email) {
            Alert.alert('Validation Error', 'Please enter your full name and email address.');
            return;
        }

        setLoading(true);
        try {
            // Frappe standard signup endpoint
            const response = await api.post('/api/method/frappe.core.doctype.user.user.sign_up', {
                email: email,
                full_name: fullName
            });

            // Frappe responds with message array usually containing success format
            if (response.data && response.status === 200) {
                Alert.alert('Registration Successful', 'Please check your email for a verification link to set your password.');
                navigation.navigate('Login' as never);
            }
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Registration failed. User might already exist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Center w="$full" h="$full" bg="$backgroundDark950">
            <Box w="$full" h="$full" position="absolute">
               <Image 
                   source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop' }} 
                   alt="Background" 
                   w="$full" 
                   h="$full" 
                   position="absolute"
                   opacity={0.15}
               />
            </Box>
            <Box w="$full" maxWidth="$96" p="$8" borderRadius="$3xl" bg="rgba(30, 41, 59, 0.7)" borderWidth={1} borderColor="$borderDark700">
                <VStack space="xl">
                    <Center mb="$4">
                        <Box p="$3" bg="$secondary500" borderRadius="$full" mb="$4">
                            <Icon as={UserPlus} color="$white" size="xl" />
                        </Box>
                        <Heading size="3xl" color="$white" fontWeight="$bold">Create Account</Heading>
                        <Text size="md" color="$textDark300" mt="$2" textAlign="center">Join our platform to access premium courses</Text>
                    </Center>

                    <FormControl>
                        <FormControlLabel mb="$2">
                            <FormControlLabelText color="$textDark200">Full Name</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="rounded" size="lg" bg="$backgroundDark800" borderColor="$borderDark700">
                            <InputField
                                value={fullName}
                                onChangeText={setFullName}
                                type="text"
                                color="$white"
                                placeholder="e.g. John Doe"
                                placeholderTextColor="$textDark500"
                            />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel mb="$2">
                            <FormControlLabelText color="$textDark200">Email Address</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="rounded" size="lg" bg="$backgroundDark800" borderColor="$borderDark700">
                            <InputField
                                value={email}
                                onChangeText={setEmail}
                                type="text"
                                color="$white"
                                placeholder="name@example.com"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholderTextColor="$textDark500"
                            />
                        </Input>
                    </FormControl>

                    <Button 
                        onPress={handleRegister} 
                        isDisabled={loading} 
                        mt="$4" 
                        size="xl" 
                        variant="solid" 
                        bg="$secondary500"
                        borderRadius="$full"
                    >
                        <ButtonText fontWeight="$bold">{loading ? 'Creating...' : 'Sign Up'}</ButtonText>
                    </Button>
                    
                    <HStack justifyContent="center" mt="$4">
                        <Text size="sm" color="$textDark400">Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                            <Text size="sm" color="$secondary400" fontWeight="$bold">Log In</Text>
                        </TouchableOpacity>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

export default RegisterScreen;
