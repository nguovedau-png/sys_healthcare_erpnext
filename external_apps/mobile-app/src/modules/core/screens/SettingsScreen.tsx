import React, { useEffect, useState } from 'react';
import { User, LogOut, FileImage, Link, Globe } from 'lucide-react-native';
import { VStack, HStack, Text, Heading, Box, Input, InputField, Button, ButtonText, Switch } from '@gluestack-ui/themed';
import api from '../../../services/api';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<any>();
    const [settings, setSettings] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get('/system/settings');
            if (res.data.success) {
                const settingsObj = res.data.data.reduce((acc: any, setting: any) => {
                    acc[setting.key] = setting.value;
                    return acc;
                }, {});
                setSettings(settingsObj);
            }
        } catch (error) {
            console.error('Failed to fetch settings');
        }
    };

    return (
        <ScrollView>
            <VStack flex={1} p="$4" space="lg">
                <Heading size="xl">Settings</Heading>

                <Box bg="$white" p="$4" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
                    <VStack space="md">
                        <Text fontSize="$lg" fontWeight="$bold">General</Text>

                        <VStack space="sm">
                            <Text fontWeight="$bold">{t('settings.language')}</Text>
                            <HStack space="md">
                                <Button size="sm" variant={i18n.language === 'en' ? 'solid' : 'outline'} onPress={() => i18n.changeLanguage('en')}>
                                    <ButtonText>English</ButtonText>
                                </Button>
                                <Button size="sm" variant={i18n.language === 'vi' ? 'solid' : 'outline'} onPress={() => i18n.changeLanguage('vi')}>
                                    <ButtonText>Tiếng Việt</ButtonText>
                                </Button>
                            </HStack>
                        </VStack>

                        <VStack space="sm">
                            <Text fontWeight="$bold">App Name</Text>
                            <Text color="$textLight600">{settings.app_name || 'N/A'}</Text>
                        </VStack>
                    </VStack>
                </Box>

                <Box bg="$white" p="$4" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
                    <VStack space="md">
                        <Text fontSize="$lg" fontWeight="$bold">Security</Text>

                        <HStack justifyContent="space-between" alignItems="center">
                            <Text>Session Timeout</Text>
                            <Text color="$textLight600">{settings.session_timeout || 'N/A'} min</Text>
                        </HStack>

                        <HStack justifyContent="space-between" alignItems="center">
                            <Text>Max Login Attempts</Text>
                            <Text color="$textLight600">{settings.max_login_attempts || 'N/A'}</Text>
                        </HStack>

                        <HStack justifyContent="space-between" alignItems="center">
                            <Text>Require 2FA</Text>
                            <Switch value={settings.require_2fa === 'true'} isDisabled />
                        </HStack>
                    </VStack>
                </Box>

                <Box bg="$white" p="$4" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
                    <VStack space="md">
                        <Text fontSize="$lg" fontWeight="$bold">Email Configuration</Text>

                        <VStack space="sm">
                            <Text fontWeight="$bold">SMTP Host</Text>
                            <Text color="$textLight600">{settings.smtp_host || 'N/A'}</Text>
                        </VStack>

                        <VStack space="sm">
                            <Text fontWeight="$bold">From Email</Text>
                            <Text color="$textLight600">{settings.from_email || 'N/A'}</Text>
                        </VStack>
                    </VStack>
                </Box>

                <Box bg="$white" p="$4" borderRadius="$md" borderWidth={1} borderColor="$borderLight200">
                    <VStack space="md">
                        <Text fontSize="$lg" fontWeight="$bold">System Management</Text>

                        <Button onPress={() => navigation.navigate('Jobs')}>
                            <ButtonText>System Jobs</ButtonText>
                        </Button>

                        <Button onPress={() => navigation.navigate('AuditLogs')} variant="outline">
                            <ButtonText>Audit Logs</ButtonText>
                        </Button>

                        <Button onPress={() => navigation.navigate('CacheManager')} variant="outline">
                            <ButtonText>Cache Manager</ButtonText>
                        </Button>

                        <Button onPress={() => navigation.navigate('Media')} variant="outline">
                            <ButtonText>Media Manager</ButtonText>
                        </Button>

                        <Button onPress={() => navigation.navigate('Webhooks')} variant="outline">
                            <ButtonText>Webhooks</ButtonText>
                        </Button>
                    </VStack>
                </Box>

                <Text fontSize="$xs" color="$textLight500" textAlign="center">
                    Settings are read-only on mobile. Use web admin to modify.
                </Text>
            </VStack>
        </ScrollView>
    );
};

export default SettingsScreen;
