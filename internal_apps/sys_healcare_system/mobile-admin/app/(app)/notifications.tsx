import React, { useState } from 'react';
import {
  YStack,
  XStack,
  Text,
  Button,
  Sheet,
  ScrollView,
  Card,
  Separator,
  Avatar,
  ListItem,
  Input,
  useTheme,
} from 'tamagui';
import {
  Bell,
  X,
  Trash2,
  Settings,
  Search,
  MessageSquare,
  Check,
  CheckCheck,
} from '@tamagui/lucide-icons';
import { useNotifications } from '../../contexts/NotificationContext';
import { StoredNotification } from '../../lib/notificationService';
import { router } from 'expo-router';
import { Alert, RefreshControl } from 'react-native';
import { StatusPill } from '../../components/StatusPill';

export default function NotificationsScreen() {
  const theme = useTheme();
  
  // Safe theme access to prevent runtime errors
  const safeThemeColor = (colorKey: string, fallback: string) => {
    try {
      return theme?.[colorKey]?.val || fallback;
    } catch {
      return fallback;
    }
  };

  const {
    notifications,
    unreadCount,
    badgeCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    refreshNotifications,
  } = useNotifications();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [showSettings, setShowSettings] = useState(false);

  // Filter notifications based on search and filter
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = searchQuery === '' || 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.body.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'unread' && !notification.read) ||
      (selectedFilter === 'read' && notification.read);
    
    return matchesSearch && matchesFilter;
  });

  const handleNotificationPress = (notification: StoredNotification) => {
    // Mark as read if not already read
    if (!notification.read) {
      markAsRead(notification.id);
    }

    // Handle navigation based on notification data
    if (notification.data?.screen) {
      router.push(notification.data.screen);
    } else {
      // Show notification detail
      router.push({
        pathname: '/notifications/[id]',
        params: { id: notification.id }
      });
    }
  };

  const handleDeleteNotification = (notificationId: string) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteNotification(notificationId),
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: clearAllNotifications,
        },
      ]
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (notification: StoredNotification) => {
    // You can customize icons based on notification type/category
    if (notification.data?.type === 'message') {
      return <MessageSquare size={20} color={safeThemeColor('blue10', '#007AFF')} />;
    }
    return <Bell size={20} color={safeThemeColor('blue10', '#007AFF')} />;
  };

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
          <Bell size={24} color={safeThemeColor('blue10', '#007AFF')} />
          <YStack>
            <Text fontSize="$6" fontWeight="bold" color="$blue12">
              Notifications
            </Text>
            {unreadCount > 0 && (
              <Text fontSize="$3" color="$blue11">
                {unreadCount} unread
              </Text>
            )}
          </YStack>
        </XStack>
        
        <XStack space="$2">
          {unreadCount > 0 && (
            <Button
              size="$3"
              variant="outlined"
              icon={CheckCheck}
              onPress={markAllAsRead}
            >
              Mark All Read
            </Button>
          )}
          <Button
            size="$3"
            variant="outlined"
            icon={Settings}
            onPress={() => setShowSettings(true)}
          />
        </XStack>
      </XStack>

      {/* Search and Filter */}
      <YStack p="$4" space="$3">
        <XStack space="$3" items="center">
          <Input
            flex={1}
            placeholder="Search notifications..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            size="$4"
          />
          <Search size={20} color={safeThemeColor('gray10', '#8E8E93')} />
        </XStack>
        
        <XStack space="$2">
          {(['all', 'unread', 'read'] as const).map((filter) => (
            <Button
              key={filter}
              size="$3"
              variant={selectedFilter === filter ? 'outlined' : 'outlined'}
              bg={selectedFilter === filter ? '$blue9' : undefined}
              color={selectedFilter === filter ? 'white' : undefined}
              onPress={() => setSelectedFilter(filter)}
            >
              {filter === 'all' ? 'All' : filter === 'unread' ? 'Unread' : 'Read'}
              {filter === 'unread' && unreadCount > 0 && (
                <StatusPill size="$1" bg="$red9" ml="$2">
                  {unreadCount}
                </StatusPill>
              )}
            </Button>
          ))}
        </XStack>
      </YStack>

      {/* Notifications List */}
      <ScrollView
        flex={1}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshNotifications}
            tintColor={safeThemeColor('blue10', '#007AFF')}
          />
        }
      >
        <YStack p="$4" space="$2">
          {filteredNotifications.length === 0 ? (
            <YStack
              flex={1}
              items="center"
              justify="center"
              p="$8"
              space="$4"
            >
              <Bell size={48} color={safeThemeColor('gray8', '#C7C7CC')} />
              <Text fontSize="$5" color="$color">
                {searchQuery || selectedFilter !== 'all'
                  ? 'No notifications match your criteria'
                  : 'No notifications yet'}
              </Text>
              <Text fontSize="$3" color="$color">
                {searchQuery || selectedFilter !== 'all'
                  ? 'Try adjusting your search or filter'
                  : "When you receive notifications, they'll appear here"}
              </Text>
            </YStack>
          ) : (
            filteredNotifications.map((notification, index) => (
              <Card
                key={notification.id}
                p="$4"
                mb="$2"
                bg={notification.read ? '$background' : '$blue2'}
                borderColor={notification.read ? '$borderColor' : '$blue6'}
                pressStyle={{ scale: 0.98 }}
                onPress={() => handleNotificationPress(notification)}
              >
                <XStack space="$3" items="flex-start">
                  <YStack items="center" pt="$1">
                    {getNotificationIcon(notification)}
                    {!notification.read && (
                      <StatusPill
                        size="$1"
                        bg="$blue9"
                        position="absolute"
                        top={-2}
                        right={-2}
                      />
                    )}
                  </YStack>
                  
                  <YStack flex={1} space="$2">
                    <XStack justify="space-between" items="flex-start">
                      <Text
                        fontSize="$4"
                        fontWeight={notification.read ? 'normal' : 'bold'}
                        color={notification.read ? '$color' : '$blue12'}
                        flex={1}
                        numberOfLines={2}
                      >
                        {notification.title}
                      </Text>
                      <Text fontSize="$2" color="$color" ml="$2">
                        {formatTime(notification.timestamp)}
                      </Text>
                    </XStack>
                    
                    <Text
                      fontSize="$3"
                      color={notification.read ? '$color' : '$color'}
                      numberOfLines={3}
                    >
                      {notification.body}
                    </Text>
                    
                    {notification.data && Object.keys(notification.data).length > 0 && (
                      <XStack space="$2" flexWrap="wrap">
                        {Object.entries(notification.data)
                          .filter(([key, value]) => key !== 'screen' && typeof value === 'string')
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <StatusPill key={key} size="$1" bg="$color5">
                              {key}: {String(value).substring(0, 20)}
                            </StatusPill>
                          ))
                        }
                      </XStack>
                    )}
                  </YStack>
                  
                  <Button
                    size="$2"
                    variant="outlined"
                    icon={Trash2}
                    color="$red10"
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDeleteNotification(notification.id);
                    }}
                  />
                </XStack>
                
                {notification.data?.clicked && (
                  <XStack mt="$2" items="center" space="$2">
                    <Check size={14} color={safeThemeColor('green10', '#34C759')} />
                    <Text fontSize="$2" color="$green10">
                      Opened
                    </Text>
                  </XStack>
                )}
              </Card>
            ))
          )}
        </YStack>
      </ScrollView>

      {/* Settings Sheet */}
      <Sheet
        modal
        open={showSettings}
        onOpenChange={setShowSettings}
        snapPoints={[50, 25]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame p="$4" space="$4">
          <Text fontSize="$6" fontWeight="bold">
            Notification Settings
          </Text>
          
          <YStack space="$3">
            <ListItem
              title="Clear All Notifications"
              subTitle="Remove all notifications from this device"
              icon={Trash2}
              iconAfter={null}
              onPress={handleClearAll}
              bg="$red2"
              borderColor="$red6"
            />
            
            <Separator />
            
            <Text fontSize="$4" color="$color">
              Total Notifications: {notifications.length}
            </Text>
            <Text fontSize="$4" color="$color">
              Unread: {unreadCount}
            </Text>
            <Text fontSize="$4" color="$color">
              Badge Count: {badgeCount}
            </Text>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
}