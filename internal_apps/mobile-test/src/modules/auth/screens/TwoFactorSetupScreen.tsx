import React, { useEffect, useState } from 'react';
import { VStack, Input, InputField, Button, ButtonText, Heading, Text, Center, Box, useToast, Toast, ToastTitle, ToastDescription } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';
import { Alert, Clipboard, TouchableOpacity } from 'react-native';
import { Copy } from 'lucide-react-native';

const TwoFactorSetupScreen = () => {
    const [secret, setSecret] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const toast = useToast();

    useEffect(() => {
        setup2FA();
    }, []);

    const setup2FA = async () => {
        try {
            const res = await api.post('/auth/2fa/setup');
            if (res.data.success) {
                setSecret(res.data.data.secret);
                setQrCode(res.data.data.qrCode);
            }
        } catch (error: any) {
            Alert.alert('Error', 'Failed to initiate 2FA setup');
            navigation.goBack();
        }
    };

    const handleVerify = async () => {
        if (code.length !== 6) {
            Alert.alert('Error', 'Please enter 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/auth/2fa/verify', { code });
            if (res.data.success) {
                Alert.alert('Success', '2FA Enabled Successfully');
                navigation.goBack();
            }
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        Clipboard.setString(secret);
        toast.show({
            placement: "top",
            render: ({ id }) => {
                return (
                    <Toast nativeID={"toast-" + id} action="success" variant="solid">
                        <VStack space="xs">
                            <ToastTitle>Copied</ToastTitle>
                            <ToastDescription>Secret copied to clipboard</ToastDescription>
                        </VStack>
                    </Toast>
                )
            }
        })
    };

    return (
        <Center flex={1} bg="$backgroundLight50" p="$4">
            <Box w="$full" maxWidth="$96" bg="$white" p="$6" borderRadius="$lg" borderWidth={1} borderColor="$borderLight200">
                <VStack space="lg">
                    <Heading size="xl" textAlign="center">Enable 2FA</Heading>

                    <Text textAlign="center" size="sm" color="$textLight600">
                        Scan the QR code or enter the secret key in your authenticator app.
                    </Text>

                    {/* QR Code display would go here if we had an Image - passing base64 if it's an image, or just text */}
                    {/* Assuming qrCode is data URL */}
                    <Box alignItems="center" my="$4" p="$4" bg="$backgroundLight100" borderRadius="$md">
                        <Text fontWeight="bold" fontSize="$lg" letterSpacing={2}>{secret}</Text>
                        <TouchableOpacity onPress={copyToClipboard}>
                            <HStack space="xs" mt="$2" alignItems="center">
                                <Copy size={16} color="#666" />
                                <Text fontSize="$xs" color="$textLight500">Copy Secret</Text>
                            </HStack>
                        </TouchableOpacity>
                    </Box>

                    <Input>
                        <InputField
                            placeholder="Enter 6-digit code to verify"
                            value={code}
                            onChangeText={setCode}
                            keyboardType="number-pad"
                            maxLength={6}
                            textAlign="center"
                            fontSize={20}
                        />
                    </Input>

                    <Button onPress={handleVerify} isDisabled={loading} mt="$2">
                        <ButtonText>{loading ? 'Verifying...' : 'Enable 2FA'}</ButtonText>
                    </Button>

                    <Button variant="outline" onPress={() => navigation.goBack()} isDisabled={loading}>
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default TwoFactorSetupScreen;
