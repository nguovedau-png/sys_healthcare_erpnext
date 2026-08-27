import { Box, VStack, HStack, Text, Switch, Heading, Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem, SelectIcon, Icon, ChevronDownIcon } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { useState } from 'react';

export default function QuietHoursScreen() {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <>
            <Stack.Screen options={{ title: 'Quiet Hours' }} />
            <Box flex={1} bg="$white" p="$4">
                <VStack space="xl">
                    <HStack justifyContent="space-between" alignItems="center">
                        <VStack flex={1}>
                            <Heading size="md">Enable Quiet Hours</Heading>
                            <Text size="sm" color="$textLight500">Mute notifications during specific times.</Text>
                        </VStack>
                        <Switch
                            value={isEnabled}
                            onValueChange={setIsEnabled}
                            trackColor={{ false: '#767577', true: '#7c3aed' }}
                        />
                    </HStack>

                    {isEnabled && (
                        <VStack space="md" p="$4" bg="$backgroundLight50" borderRadius="$lg">
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text fontWeight="bold">Start Time</Text>
                                <Text color="$violet500">10:00 PM</Text>
                            </HStack>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text fontWeight="bold">End Time</Text>
                                <Text color="$violet500">07:00 AM</Text>
                            </HStack>
                            <Text size="xs" color="$textLight400" mt="$2">
                                You won't receive calls or messages during this time unless you've marked them as urgent.
                            </Text>
                        </VStack>
                    )}
                </VStack>
            </Box>
        </>
    );
}
