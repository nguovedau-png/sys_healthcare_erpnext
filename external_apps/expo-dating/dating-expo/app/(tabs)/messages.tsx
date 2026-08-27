import { Box, Heading, Text, VStack, Avatar, AvatarFallbackText, HStack, Pressable, Icon, SearchIcon, Input, InputField, InputSlot, Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionContent, AccordionIcon, ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const OPEN_CONNECTIONS = [
    { id: 1, name: 'Alice', message: 'Hey! How are you?', time: '2m', answers: 3, views: 12, hashtag: '#Dating' },
    { id: 2, name: 'Bob', message: 'Video chat?', time: '1h', answers: 1, views: 5, hashtag: '#Gaming' },
];

const ENDED_CONNECTIONS = [
    { id: 3, name: 'Charlie', message: 'Nice profile!', time: '1d', answers: 0, views: 2, hashtag: '#Travel' },
];

export default function MessagesScreen() {
    const router = useRouter();

    const renderConnectionItem = (item) => (
        <Swipeable key={item.id} renderRightActions={() => (
            <Box bg="$red500" w={80} justifyContent="center" alignItems="center" height="100%">
                <Icon as={TrashIcon} color="$white" size="xl" />
            </Box>
        )}>
            <Pressable onPress={() => router.push(`/messages/${item.id}`)} bg="$white" p="$4" borderBottomWidth={1} borderColor="$borderLight100">
                <HStack space="md">
                    <Avatar bgColor="$violet500" size="md" borderRadius="$full">
                        <AvatarFallbackText>{item.name}</AvatarFallbackText>
                    </Avatar>
                    <VStack flex={1}>
                        <HStack justifyContent="space-between">
                            <Heading size="sm" color="$textDark900">{item.name}</Heading>
                            <Text size="xs" color="$textLight400">{item.time}</Text>
                        </HStack>
                        <Text size="sm" color="$textDark500" isTruncated>{item.message}</Text>
                        <HStack space="md" mt="$2">
                            <Text size="xs" color="$violet500" fontWeight="bold">{item.hashtag}</Text>
                            <Text size="xs" color="$textLight400">| {item.answers} Answers</Text>
                            <Text size="xs" color="$textLight400">| {item.views} Views</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </Pressable>
        </Swipeable>
    );

    return (
        <Box flex={1} bg="$backgroundLight50">
            {/* Header */}
            <Box bg="#1A0A33" p="$4" pb="$6">
                <Heading color="$white" size="xl" mb="$4">Connections</Heading>
                <Input bg="$white" borderRadius="$full" size="md" borderWidth={0}>
                    <InputSlot pl="$3">
                        <Icon as={SearchIcon} color="$textLight400" />
                    </InputSlot>
                    <InputField placeholder="Search connections..." />
                </Input>
            </Box>

            <ScrollView>
                <Accordion m="$0" w="100%" size="md" variant="unfilled" type="multiple" defaultValue={['item-0', 'item-1']}>
                    {/* Open Connections */}
                    <AccordionItem value="item-0" bg="$white" mt="$2">
                        <AccordionHeader>
                            <AccordionTrigger>
                                {({ isExpanded }) => (
                                    <>
                                        <AccordionTitleText fontWeight="bold">Open Connections ({OPEN_CONNECTIONS.length})</AccordionTitleText>
                                        {isExpanded ? <AccordionIcon as={ChevronUpIcon} ml="$3" /> : <AccordionIcon as={ChevronDownIcon} ml="$3" />}
                                    </>
                                )}
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent p="$0">
                            {OPEN_CONNECTIONS.map(renderConnectionItem)}
                        </AccordionContent>
                    </AccordionItem>

                    {/* Ended Connections */}
                    <AccordionItem value="item-1" bg="$white" mt="$4">
                        <AccordionHeader>
                            <AccordionTrigger>
                                {({ isExpanded }) => (
                                    <>
                                        <AccordionTitleText fontWeight="bold">Ended Connections ({ENDED_CONNECTIONS.length})</AccordionTitleText>
                                        {isExpanded ? <AccordionIcon as={ChevronUpIcon} ml="$3" /> : <AccordionIcon as={ChevronDownIcon} ml="$3" />}
                                    </>
                                )}
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent p="$0">
                            {ENDED_CONNECTIONS.map(renderConnectionItem)}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </ScrollView>
        </Box>
    );
}
