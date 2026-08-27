import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { YStack, XStack, Button, Input, Paragraph, Card } from 'tamagui';

const AgoraVideoCall = () => {
  const router = useRouter();
  const [channelName, setChannelName] = useState('test');
  const [userId, setUserId] = useState('1');

  const joinChannel = () => {
    if (!channelName || !userId) {
      Alert.alert('Validation Error', 'Please enter both channel name and user ID');
      return;
    }

    // Navigate to the actual video call screen
    router.push({
      pathname: '/(app)/settings/agora/call',
      params: { channel: channelName, uid: userId }
    });
  };

  return (
    <YStack flex={1} p="$3" bg="$background" gap="$3">
      <Card p="$4">
        <Paragraph fontSize={24} fontWeight="bold" textAlign="center" mb="$2">
          Agora Video Call
        </Paragraph>
        <Paragraph fontSize={16} textAlign="center" mb="$4" color="$color11">
          Join a video call using Agora SDK
        </Paragraph>
        
        <YStack gap="$3">
          <YStack>
            <Paragraph fontWeight="600" mb="$2">Channel Name</Paragraph>
            <Input
              value={channelName}
              onChangeText={setChannelName}
              placeholder="Enter channel name"
              size="$4"
            />
          </YStack>
          
          <YStack>
            <Paragraph fontWeight="600" mb="$2">User ID</Paragraph>
            <Input
              value={userId}
              onChangeText={setUserId}
              placeholder="Enter user ID"
              keyboardType="numeric"
              size="$4"
            />
          </YStack>
          
          <Button
            backgroundColor="$green10"
            color="white"
            size="$4"
            onPress={joinChannel}
            mt="$3"
          >
            Join Channel
          </Button>
        </YStack>
      </Card>
    </YStack>
  );
};

export default AgoraVideoCall;