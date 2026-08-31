import React, { useState } from 'react';
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  TextArea,
  Card,
  ScrollView,
} from 'tamagui';
import { useNotifications } from '../../contexts/NotificationContext';
import { notificationService } from '../../lib/notificationService';
import { Alert } from 'react-native';

export default function TestNotificationsScreen() {
  const { pushToken, refreshNotifications } = useNotifications();
  const [title, setTitle] = useState('Test Notification');
  const [body, setBody] = useState('This is a test notification from the mobile app');
  const [data, setData] = useState('');

  const handleSendLocalNotification = async () => {
    try {
      await notificationService.scheduleLocalNotification(
        title,
        body,
        data ? JSON.parse(data) : {}
      );
      Alert.alert('Success', 'Local notification scheduled');
      // Refresh notifications to show the new one
      refreshNotifications();
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule notification: ' + error.message);
    }
  };

  const handleSendPushNotification = async () => {
    if (!pushToken) {
      Alert.alert('Error', 'No push token available. Please register for push notifications first.');
      return;
    }

    try {
      // In a real app, you would send this to your backend API
      // For now, we'll just show an alert with the token
      Alert.alert(
        'Push Notification Info',
        `To send a push notification, use your backend API with this device token:\n\n${pushToken}`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to prepare push notification: ' + error.message);
    }
  };

  return (
    <ScrollView flex={1} bg="$background">
      <YStack p="$4" space="$4">
        <Text fontSize="$6" fontWeight="bold">
          Test Notifications
        </Text>

        <Card p="$4">
          <YStack space="$3">
            <Text fontSize="$5" fontWeight="bold">
              Device Info
            </Text>
            <Text>
              Push Token: {pushToken || 'Not registered'}
            </Text>
          </YStack>
        </Card>

        <Card p="$4">
          <YStack space="$3">
            <Text fontSize="$5" fontWeight="bold">
              Send Local Notification
            </Text>
            
            <Input
              placeholder="Notification Title"
              value={title}
              onChangeText={setTitle}
            />
            
            <TextArea
              placeholder="Notification Body"
              value={body}
              onChangeText={setBody}
              numberOfLines={3}
            />
            
            <TextArea
              placeholder='Additional Data (JSON format)\nExample: {"screen": "/profile", "userId": "123"}'
              value={data}
              onChangeText={setData}
              numberOfLines={4}
            />
            
            <Button
              bg="$blue9"
              color="white"
              onPress={handleSendLocalNotification}
            >
              Send Local Notification
            </Button>
          </YStack>
        </Card>

        <Card p="$4">
          <YStack space="$3">
            <Text fontSize="$5" fontWeight="bold">
              Send Push Notification
            </Text>
            <Text>
              Push notifications are sent from your backend server to Firebase,
              which then delivers them to this device.
            </Text>
            <Button
              bg="$green9"
              color="white"
              onPress={handleSendPushNotification}
            >
              Prepare Push Notification
            </Button>
          </YStack>
        </Card>

        <Card p="$4">
          <YStack space="$3">
            <Text fontSize="$5" fontWeight="bold">
              Notification Actions
            </Text>
            <XStack space="$2">
              <Button
                flex={1}
                variant="outlined"
                onPress={refreshNotifications}
              >
                Refresh
              </Button>
            </XStack>
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  );
}