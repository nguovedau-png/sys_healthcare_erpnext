import { Box, VStack, HStack, Text, Switch, Pressable, Icon, ChevronRightIcon } from '@gluestack-ui/themed';
import { Stack, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function SettingsScreen() {
    const router = useRouter();

    const MENU_ITEMS = [
        { label: 'Quiet Hours', icon: 'moon-o', route: '/settings/quiet-hours' },
        { label: 'Notifications', icon: 'bell', type: 'switch', value: true },
        { label: 'Payment Methods', icon: 'credit-card', route: '/profile/payments' }, // Placeholder
        { label: 'Help & Support', icon: 'question-circle', route: '/profile/help' }, // Placeholder
        { label: 'Privacy Policy', icon: 'lock', route: '/profile/privacy' }, // Placeholder
    ];

    return (
        <>
            <Stack.Screen options={{ title: 'Settings' }} />
            <Box flex={1} bg="$white">
                <VStack>
                    {MENU_ITEMS.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => item.route && router.push(item.route)}
                            p="$4"
                            bg="$white"
                            borderBottomWidth={1}
                            borderColor="$borderLight100"
                        >
                            <HStack justifyContent="space-between" alignItems="center">
                                <HStack space="md" alignItems="center">
                                    <Box w={30} alignItems="center">
                                        <FontAwesome name={item.icon as any} size={20} color="#7c3aed" />
                                    </Box>
                                    <Text size="md" color="$textDark800">{item.label}</Text>
                                </HStack>

                                {item.type === 'switch' ? (
                                    <Switch
                                        size="sm"
                                        trackColor={{ false: '#767577', true: '#7c3aed' }}
                                        thumbColor={'#f4f3f4'}
                                        value={item.value as boolean}
                                    />
                                ) : (
                                    <Icon as={ChevronRightIcon} color="$textLight400" />
                                )}
                            </HStack>
                        </Pressable>
                    ))}
                </VStack>
            </Box>
        </>
    );
}
