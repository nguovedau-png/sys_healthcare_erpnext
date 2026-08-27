import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { useAuth } from './AuthContext';
import { notificationService, StoredNotification } from '../lib/notificationService';
import { registerDevice, updateDevice } from '../lib/api';

interface NotificationContextType {
  // Notification state
  notifications: StoredNotification[];
  unreadCount: number;
  badgeCount: number;
  pushToken: string | null;
  isLoading: boolean;
  
  // Actions
  refreshNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  registerForPushNotifications: () => Promise<void>;
  updateNotificationPreferences: (preferences: {
    sound?: boolean;
    vibration?: boolean;
    badge?: boolean;
    categories?: string[];
  }) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { user, token } = useAuth();
  const [notifications, setNotifications] = useState<StoredNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredDeviceId, setRegisteredDeviceId] = useState<string | null>(null);

  // Initialize notifications when user is authenticated
  useEffect(() => {
    if (user && token) {
      // Set auth token in notification service
      notificationService.setAuthToken(token);
      initializeNotifications();
    }
    
    // Cleanup on unmount
    return () => {
      notificationService.cleanup();
    };
  }, [user, token]);

  // Update counts when notifications change
  useEffect(() => {
    setUnreadCount(notificationService.getUnreadCount());
    setBadgeCount(notificationService.getBadgeCount());
  }, [notifications]);

  const initializeNotifications = async () => {
    setIsLoading(true);
    try {
      // Register for push notifications
      await registerForPushNotifications();
      
      // Load existing notifications
      await refreshNotifications();
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerForPushNotifications = async () => {
    try {
      // Get push token
      const token = await notificationService.registerForPushNotifications();
      if (!token) {
        console.log('Failed to get push token');
        return;
      }
      
      setPushToken(token);
      
      // Prepare device info
      const deviceInfo = {
        pushToken: token,
        platform: Platform.OS as 'ios' | 'android' | 'web',
        deviceId: Device.deviceYearClass?.toString() || undefined,
        deviceName: Device.deviceName || `${Device.brand} ${Device.modelName}`,
        appVersion: Constants.expoConfig?.version || '1.0.0',
        osVersion: Device.osVersion || Platform.Version.toString(),
        notificationsEnabled: true,
        preferences: {
          sound: true,
          vibration: true,
          badge: true,
          categories: [],
        },
      };
      
      // Register device with backend
      if (user && token) {
        const response = await registerDevice(deviceInfo, token);
        setRegisteredDeviceId(response.data?.id || response.data?._id);
        console.log('Device registered successfully:', response);
      }
    } catch (error) {
      console.error('Failed to register for push notifications:', error);
    }
  };

  const refreshNotifications = async () => {
    setIsLoading(true);
    try {
      const allNotifications = await notificationService.getAllNotifications();
      setNotifications(allNotifications);
    } catch (error) {
      console.error('Failed to refresh notifications:', error);
      // Fallback to local notifications only
      const localNotifications = notificationService.getNotifications();
      setNotifications([...localNotifications]);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = (notificationId: string) => {
    notificationService.markAsRead(notificationId);
    refreshNotifications();
  };

  const markAllAsRead = () => {
    notificationService.markAllAsRead();
    setBadgeCount(0);
    refreshNotifications();
  };

  const deleteNotification = (notificationId: string) => {
    notificationService.deleteNotification(notificationId);
    refreshNotifications();
  };

  const clearAllNotifications = () => {
    notificationService.clearAllNotifications();
    setBadgeCount(0);
    refreshNotifications();
  };

  const updateNotificationPreferences = async (preferences: {
    sound?: boolean;
    vibration?: boolean;
    badge?: boolean;
    categories?: string[];
  }) => {
    try {
      if (registeredDeviceId && token) {
        await updateDevice(registeredDeviceId, {
          preferences,
        }, token);
        console.log('Notification preferences updated');
      }
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
      throw error;
    }
  };

  const contextValue: NotificationContextType = {
    // State
    notifications,
    unreadCount,
    badgeCount,
    pushToken,
    isLoading,
    
    // Actions
    refreshNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    registerForPushNotifications,
    updateNotificationPreferences,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

export default NotificationContext;