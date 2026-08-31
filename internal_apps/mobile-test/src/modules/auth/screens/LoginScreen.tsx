import React, { useState } from 'react';
import { Box, Button, ButtonText, Input, InputField, Text, VStack, Heading, Center, FormControl, FormControlLabel, FormControlLabelText, Icon, EyeIcon, EyeOffIcon, HStack, Image } from '@gluestack-ui/themed';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setCredentials } from '../store/authSlice';
import api from '../../../services/api';
import { Alert, TouchableOpacity } from 'react-native';
import { authStorage } from '../../../services/authStorage';
import { Lock, Mail } from 'lucide-react-native';

const LoginScreen = () => {
    const [usr, setUsr] = useState('Administrator');
    const [pwd, setPwd] = useState('admin');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!usr || !pwd) {
            Alert.alert('Validation Error', 'Please enter email and password.');
            return;
        }

        setLoading(true);
        try {
            // Frappe login endpoint
            const response = await api.post('/api/method/login', { usr, pwd });

            if (response.data.message === "Logged In") {
                // Determine logged in user
                const userRes = await api.get('/api/method/frappe.auth.get_logged_user');
                const userEmail = userRes.data.message;

                // Fetch user full profile
                const profileRes = await api.get(`/api/resource/User/${userEmail}`);
                const userDoc = profileRes.data.data;

                // In a browser/fetch context withCredentials handles the cookie. 
                // We'll just define a placeholder token to make our auth storage happy
                const fakeToken = "cookie-session-active";
                await authStorage.setTokens(fakeToken, '');

                dispatch(setCredentials({
                    user: userDoc,
                    accessToken: fakeToken,
                    refreshToken: ''
                }));

                // Navigation is handled automatically by App.tsx since isAuthenticated becomes true
            } else {
                Alert.alert('Login failed', 'Invalid credentials');
            }
        } catch (error: any) {
            Alert.alert('Authentication Error', error.response?.data?.message || 'Invalid username or password.');
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
                        <Box p="$3" bg="$primary500" borderRadius="$full" mb="$4">
                            <Icon as={Lock} color="$white" size="xl" />
                        </Box>
                        <Heading size="3xl" color="$white" fontWeight="$bold">Welcome Back</Heading>
                        <Text size="md" color="$textDark300" mt="$2">Sign in to your LMS Portal</Text>
                    </Center>

                    <FormControl>
                        <FormControlLabel mb="$2">
                            <FormControlLabelText color="$textDark200">Email Address</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="rounded" size="lg" bg="$backgroundDark800" borderColor="$borderDark700">
                            <InputField
                                value={usr}
                                onChangeText={setUsr}
                                type="text"
                                color="$white"
                                placeholder="name@example.com"
                                autoCapitalize="none"
                                placeholderTextColor="$textDark500"
                            />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel mb="$2">
                            <FormControlLabelText color="$textDark200">Password</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="rounded" size="lg" bg="$backgroundDark800" borderColor="$borderDark700">
                            <InputField
                                value={pwd}
                                onChangeText={setPwd}
                                type={showPassword ? "text" : "password"}
                                color="$white"
                                placeholder="Enter your password"
                                placeholderTextColor="$textDark500"
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ justifyContent: 'center', paddingRight: 15 }}>
                                <Icon as={showPassword ? EyeOffIcon : EyeIcon} color="$textDark400" />
                            </TouchableOpacity>
                        </Input>
                    </FormControl >

                    <HStack justifyContent="flex-end">
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
                            <Text size="sm" color="$primary400" fontWeight="$medium">Forgot Password?</Text>
                        </TouchableOpacity>
                    </HStack>

                    <Button
                        onPress={handleLogin}
                        isDisabled={loading}
                        mt="$4"
                        size="xl"
                        variant="solid"
                        action="primary"
                        borderRadius="$full"
                    >
                        <ButtonText fontWeight="$bold">{loading ? 'Authenticating...' : 'Sign In'}</ButtonText>
                    </Button>

                    <HStack justifyContent="center" mt="$4">
                        <Text size="sm" color="$textDark400">Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
                            <Text size="sm" color="$primary400" fontWeight="$bold">Create now</Text>
                        </TouchableOpacity>
                    </HStack>
                </VStack >
            </Box >
        </Center >
    );
};

export default LoginScreen;
