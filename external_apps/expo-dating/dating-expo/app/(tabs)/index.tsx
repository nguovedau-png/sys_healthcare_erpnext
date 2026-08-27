import { Box, Heading, Text, VStack, Button, ButtonText, Center, HStack, Pressable, Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

const TOPICS = ['Dating', 'Friendship', 'Networking', 'Gaming', 'Travel'];

export default function HomeScreen() {
  const router = useRouter();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [connectType, setConnectType] = useState<'video' | 'audio'>('video');

  const handleConnect = (type: 'video' | 'audio') => {
    setConnectType(type);
    setShowActionsheet(true);
  };

  const handleTopicSelect = (topic: string) => {
    setShowActionsheet(false);
    router.push({ pathname: `/connect/${connectType}`, params: { topic } });
  };

  return (
    <Box flex={1} bg="#F5F5F5" px="$6" pt="$10">
      <HStack justifyContent="space-between" alignItems="center" mb="$8">
        <Heading size="2xl" color="#1A0A33">Start Connecting</Heading>
        <Pressable onPress={() => router.push('/notifications')}>
          <Box bg="$white" p="$2" borderRadius="$full" shadowColor="$black" shadowOpacity={0.1} shadowRadius={4}>
            <FontAwesome name="bell" size={20} color="#4C2582" />
          </Box>
        </Pressable>
      </HStack>

      <VStack space="xl">
        {/* Video */}
        <Pressable
          h={80}
          bg="#4C2582"
          borderRadius="$2xl"
          justifyContent="center"
          px="$8"
          onPress={() => handleConnect('video')}
          shadowColor="$black"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.2}
          shadowRadius={4}
          elevation={4}
        >
          <HStack alignItems="center" space="md">
            <Box bg="rgba(255,255,255,0.2)" p="$3" borderRadius="$full">
              <FontAwesome name="video-camera" size={24} color="white" />
            </Box>
            <Text fontWeight="bold" color="$white" fontSize="$xl">Video</Text>
          </HStack>
        </Pressable>

        {/* Audio */}
        <Pressable
          h={80}
          bg="#3CB34D"
          borderRadius="$2xl"
          justifyContent="center"
          px="$8"
          onPress={() => handleConnect('audio')}
          shadowColor="$black"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.2}
          shadowRadius={4}
          elevation={4}
        >
          <HStack alignItems="center" space="md">
            <Box bg="rgba(255,255,255,0.2)" p="$3" borderRadius="$full">
              <FontAwesome name="microphone" size={24} color="white" />
            </Box>
            <Text fontWeight="bold" color="$white" fontSize="$xl">Audio</Text>
          </HStack>
        </Pressable>

        {/* Message */}
        <Pressable
          h={80}
          bg="#3A67C2"
          borderRadius="$2xl"
          justifyContent="center"
          px="$8"
          onPress={() => router.push('/(tabs)/messages')}
          shadowColor="$black"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.2}
          shadowRadius={4}
          elevation={4}
        >
          <HStack alignItems="center" space="md">
            <Box bg="rgba(255,255,255,0.2)" p="$3" borderRadius="$full">
              <FontAwesome name="comment" size={24} color="white" />
            </Box>
            <Text fontWeight="bold" color="$white" fontSize="$xl">Message</Text>
          </HStack>
        </Pressable>
      </VStack>

      <Button mt="$8" variant="solid" bg="$coolGray200" size="xl" borderRadius="$full" onPress={() => alert('Tutorial Flow')}>
        <ButtonText color="$textLight500">Launch Tutorial</ButtonText>
      </Button>

      {/* Requests Area */}
      <Box mt="$8">
        <HStack justifyContent="space-between" alignItems="center" mb="$2">
          <Heading size="md" color="#1A0A33">Connection Requests</Heading>
          <Pressable onPress={() => router.push('/connect/requests')}>
            <Text size="sm" color="#4C2582" fontWeight="bold">View All</Text>
          </Pressable>
        </HStack>

        <Pressable onPress={() => router.push('/connect/requests')}>
          <Box bg="$white" p="$4" borderRadius="$xl" shadowColor="$black" shadowOpacity={0.05} shadowRadius={2}>
            <Center py="$2">
              <Text color="$textLight400">2 Pending Requests</Text>
            </Center>
          </Box>
        </Pressable>
      </Box>

      <Actionsheet isOpen={showActionsheet} onClose={() => setShowActionsheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Heading size="md" p="$4">Select a Topic for {connectType === 'video' ? 'Video' : 'Audio'}</Heading>
          {TOPICS.map((topic) => (
            <ActionsheetItem key={topic} onPress={() => handleTopicSelect(topic)}>
              <ActionsheetItemText>{topic}</ActionsheetItemText>
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
