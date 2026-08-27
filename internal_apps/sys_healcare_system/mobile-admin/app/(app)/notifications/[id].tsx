import React, { useEffect, useState } from 'react';
import {
  YStack,
  XStack,
  Text,
  Button,
  ScrollView,
  Card,
  Separator,
  useTheme,
} from 'tamagui';
import {
  ArrowLeft,
  Bell,
  Calendar,
  MessageSquare,
  ExternalLink,
  Copy,
  Trash2,
} from '@tamagui/lucide-icons';
import { useNotifications } from '../../../contexts/NotificationContext';
import { StoredNotification } from '../../../lib/notificationService';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { StatusPill } from '../../../components/StatusPill';

export default function NotificationDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notifications, markAsRead, deleteNotification } = useNotifications();
  const [notification, setNotification] = useState<StoredNotification | null>(null);

  useEffect(() => {
    if (id) {
      const found = notifications.find(n => n.id === id);
      if (found) {
        setNotification(found);
        // Mark as read when viewing details
        if (!found.read) {
          markAsRead(found.id);
        }
      } else {
        // Notification not found, go back
        router.back();
      }
    }
  }, [id, notifications]);

  const formatFullDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleCopyContent = async () => {
    if (!notification) return;
    
    const content = `${notification.title}\n\n${notification.body}`;
    await Clipboard.setStringAsync(content);
    
    Alert.alert('Copied', 'Notification content copied to clipboard');
  };

  const handleShare = async () => {
    if (!notification) return;
    
    try {
      await Share.share({
        title: notification.title,
        message: `${notification.title}\n\n${notification.body}`,
      });
    } catch (error) {
      console.error('Error sharing notification:', error);
    }
  };

  const handleDelete = () => {
    if (!notification) return;
    
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNotification(notification.id);
            router.back();
          },
        },
      ]
    );
  };

  const handleDataPress = (key: string, value: any) => {
    if (key === 'screen' && typeof value === 'string') {
      // Navigate to the specified screen
      router.push(value);
    } else {
      // Copy the value
      Clipboard.setStringAsync(String(value));
      Alert.alert('Copied', `${key} copied to clipboard`);
    }
  };

  if (!notification) {
    return (
      <YStack flex={1} items="center" justify="center">
        <Text>Notification not found</Text>
        <Button onPress={() => router.back()} mt="$4">
          Go Back
        </Button>
      </YStack>
    );
  }

  return (
    <YStack flex={1} bg="$background">
      {/* Header */}
      <XStack
        p="$4"
        pt="$6"
        bg="$blue2"
        items="center"
        justify="space-between"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={3}
      >
        <XStack items="center" space="$3">
          <Button
            size="$3"
            variant="outlined"
            icon={ArrowLeft}
            onPress={() => router.back()}
          />
          <Text fontSize="$5" fontWeight="bold" color="$blue12">
            Notification Details
          </Text>
        </XStack>
        
        <XStack space="$2">
          <Button
            size="$3"
            variant="outlined"
            icon={Copy}
            onPress={handleCopyContent}
          />
          <Button
            size="$3"
            variant="outlined"
            icon={ExternalLink}
            onPress={handleShare}
          />
          <Button
            size="$3"
            variant="outlined"
            icon={Trash2}
            color="$red10"
            borderColor="$red7"
            onPress={handleDelete}
          />
        </XStack>
      </XStack>

      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack p="$4" space="$4">
          {/* Main Content */}
          <Card p="$4" bg="$blue2">
            <YStack space="$3">
              <XStack items="center" space="$3">
                <Bell size={24} color="$blue10" />
                <StatusPill
                  size="$2"
                  bg={notification.read ? '$green9' : '$blue9'}
                  color="white"
                >
                  {notification.read ? 'Read' : 'Unread'}
                </StatusPill>
                {notification.data?.clicked && (
                  <StatusPill
                    size="$2"
                    bg="$green9"
                    color="white"
                  >
                    Opened
                  </StatusPill>
                )}
              </XStack>
              
              <Text fontSize="$6" fontWeight="bold" color="$blue12">
                {notification.title}
              </Text>
              
              <Text fontSize="$4" color="$blue11" lineHeight="$5">
                {notification.body}
              </Text>
            </YStack>
          </Card>

          {/* Metadata */}
          <Card p="$4">
            <YStack space="$3">
              <Text fontSize="$5" fontWeight="bold">
                Information
              </Text>
              
              <YStack space="$2">
                <XStack items="center" space="$3">
                  <Calendar size={16} color="$color10" />
                  <Text fontSize="$3" color="$color11">
                    Received
                  </Text>
                  <Text fontSize="$3" fontWeight="500">
                    {formatFullDate(notification.timestamp)}
                  </Text>
                </XStack>
                
                <XStack items="center" space="$3">
                  <MessageSquare size={16} color="$color10" />
                  <Text fontSize="$3" color="$color11">
                    ID
                  </Text>
                  <Text fontSize="$3" fontWeight="500" flex={1}>
                    {notification.id}
                  </Text>
                  <Button
                    size="$2"
                    variant="outlined"
                    icon={Copy}
                    onPress={() => {
                      Clipboard.setStringAsync(notification.id);
                      Alert.alert('Copied', 'Notification ID copied');
                    }}
                  />
                </XStack>
              </YStack>
            </YStack>
          </Card>

          {/* Additional Data */}
          {notification.data && Object.keys(notification.data).length > 0 && (
            <Card p="$4">
              <YStack space="$3">
                <Text fontSize="$5" fontWeight="bold">
                  Additional Data
                </Text>
                
                <YStack space="$2">
                  {Object.entries(notification.data).map(([key, value], index) => (
                    <React.Fragment key={key}>
                      <XStack
                        items="flex-start"
                        space="$3"
                        p="$2"
                        bg={key === 'screen' ? '$blue3' : '$color2'}

                        pressStyle={{ scale: 0.98 }}
                        onPress={() => handleDataPress(key, value)}
                      >
                        <Text fontSize="$3" fontWeight="600" color="$color11" width={80}>
                          {key}:
                        </Text>
                        <Text fontSize="$3" flex={1} color={key === 'screen' ? '$blue11' : '$color'}>
                          {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                        </Text>
                        {key === 'screen' && (
                          <ExternalLink size={16} color="$blue10" />
                        )}
                      </XStack>
                      {index < Object.entries(notification.data!).length - 1 && (
                        <Separator my="$1" />
                      )}
                    </React.Fragment>
                  ))}
                </YStack>
                
                <Text fontSize="$2" color="$color9">
                  Tap on items to copy or navigate
                </Text>
              </YStack>
            </Card>
          )}

          {/* Actions */}
          <Card p="$4">
            <YStack space="$3">
              <Text fontSize="$5" fontWeight="bold">
                Actions
              </Text>
              
              <YStack space="$2">
                {notification.data?.screen && (
                  <Button
                    size="$4"
                    bg="$blue9"
                    color="white"
                    icon={ExternalLink}
                    onPress={() => {
                      if (notification.data?.screen) {
                        router.push(notification.data.screen);
                      }
                    }}
                  >
                    Open Related Screen
                  </Button>
                )}
                
                <Button
                  size="$4"
                  variant="outlined"
                  icon={Copy}
                  onPress={handleCopyContent}
                >
                  Copy Content
                </Button>
                
                <Button
                  size="$4"
                  variant="outlined"
                  icon={ExternalLink}
                  onPress={handleShare}
                >
                  Share Notification
                </Button>
                
                <Separator my="$2" />
                
                <Button
                  size="$4"
                  variant="outlined"
                  icon={Trash2}
                  color="$red10"
                  borderColor="$red7"
                  onPress={handleDelete}
                >
                  Delete Notification
                </Button>
              </YStack>
            </YStack>
          </Card>

          {/* Debug Information */}
          <Card p="$4" bg="$color2">
            <YStack space="$3">
              <Text fontSize="$4" fontWeight="bold" color="$color11">
                Debug Information
              </Text>
              
              <Text fontSize="$2" color="$color10">
                {JSON.stringify(notification, null, 2)}
              </Text>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </YStack>
  );
}