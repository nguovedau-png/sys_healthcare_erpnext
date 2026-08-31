import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { YStack } from 'tamagui';

const AgoraCallScreen = () => {
  const [videoCall, setVideoCall] = useState(true);
  const params = useLocalSearchParams();
  const channelName = params.channel as string || 'test';
  const userId = params.uid as string || '1';

  return (
    <YStack flex={1} justify="center" items="center" bg="$background">
      <Text style={styles.title}>Agora Video Call</Text>
      <Text style={styles.message}>Channel: {channelName}</Text>
      <Text style={styles.message}>User ID: {userId}</Text>
      <Text style={styles.message}>Video call functionality would be implemented here</Text>
    </YStack>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginVertical: 5,
  },
});

export default AgoraCallScreen;