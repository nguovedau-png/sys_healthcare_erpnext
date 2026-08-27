import React, { useEffect, useState } from 'react'
import {
  YStack,
  XStack,
  H1,
  H3,
  Paragraph,
  Card,
  Avatar,
  Text,
  ScrollView,
  Button,
  Spinner,
} from 'tamagui'
import { User, Bell, Settings, RefreshCw } from '@tamagui/lucide-icons'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications } from '../../contexts/NotificationContext'
import { router } from 'expo-router'
import { getErpNextHealth, ErpNextHealth } from '../../services/erpNextService'

export default function DashboardScreen() {
  const { user } = useAuth()
  const { unreadCount, badgeCount, notifications } = useNotifications()
  const [erpNextHealth, setErpNextHealth] = useState<ErpNextHealth | null>(null)
  const [erpNextError, setErpNextError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    getErpNextHealth(controller.signal)
      .then((health) => { setErpNextHealth(health); setErpNextError(false) })
      .catch(() => { if (!controller.signal.aborted) setErpNextError(true) })
    return () => controller.abort()
  }, [])

  const handleNotificationsPress = () => {
    router.push('/notifications')
  }

  return (
    <YStack flex={1} bg="$background">
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack gap="$6" maxW={600} width="100%" self="center" px="$4" py="$6">
          {/* Header */}
          <XStack justify="space-between" items="center">
            <YStack gap="$2" flex={1}>
              <H1 color="$color12" size="$8">
                Dashboard
              </H1>
              <Paragraph color="$color11">Welcome back, {user?.name}!</Paragraph>
            </YStack>
            
            {/* Notification Button */}
            <Button
              size="$4"
              variant="outlined"
              icon={Bell}
              onPress={handleNotificationsPress}
            >
              {unreadCount > 0 && (
                <XStack bg="$red9" px="$1">
                  <Text color="white" fontSize="$2">{unreadCount > 99 ? '99+' : unreadCount}</Text>
                </XStack>
              )}
            </Button>
          </XStack>

          {/* Notifications Card */}
          {notifications.length > 0 && (
            <Card 
              bg="$blue2" 
              borderColor="$blue6" 
              p="$4"
              pressStyle={{ scale: 0.98 }}
              onPress={handleNotificationsPress}
            >
              <XStack gap="$4" items="center">
                <YStack items="center" justify="center">
                  <Bell size={24} color="$blue10" />
                  {unreadCount > 0 && (
                    <XStack bg="$red9" px="$1">
                      <Text color="white" fontSize="$1">{unreadCount}</Text>
                    </XStack>
                  )}
                </YStack>
                <YStack flex={1} gap="$1">
                  <H3 color="$blue12">Notifications</H3>
                  <Text color="$blue11" fontSize="$3">
                    {unreadCount > 0 
                      ? `${unreadCount} unread notifications`
                      : `${notifications.length} notifications`
                    }
                  </Text>
                  {notifications.length > 0 && (
                    <Text color="$blue10" fontSize="$2" numberOfLines={1}>
                      Latest: {notifications[0].title}
                    </Text>
                  )}
                </YStack>
                <Button size="$3" variant="outlined" bg="$blue3">
                  View All
                </Button>
              </XStack>
            </Card>
          )}

          {/* ERPNext integration status */}
          <Card bg="$color2" borderColor="$borderColor" p="$4">
            <XStack gap="$4" items="center">
              <YStack width="$4" height="$4" bg="$color4" items="center" justify="center">
                {erpNextHealth === null && !erpNextError ? <Spinner size="small" /> : <RefreshCw size={18} color="$color11" />}
              </YStack>
              <YStack flex={1} gap="$1">
                <H3 color="$color12">ERPNext sync</H3>
                <Text color="$color11" fontSize="$3">
                  {erpNextError ? 'Không thể kết nối máy chủ' : erpNextHealth?.configured ? (erpNextHealth.consecutiveFailures === 0 ? 'Sẵn sàng đồng bộ CRM, ERP, HR và Accounting' : `Đang suy giảm · ${erpNextHealth.consecutiveFailures} lỗi liên tiếp`) : 'Chưa cấu hình tích hợp'}
                </Text>
              </YStack>
            </XStack>
          </Card>

          {/* User Profile Card */}
          <Card bg="$color2" borderColor="$borderColor" p="$4">
            <XStack gap="$4" items="center">
              <Avatar circular size="$6" bg="$blue9">
                <Avatar.Image
                  src={`https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(user?.name || 'User')}&backgroundColor=3b82f6&textColor=ffffff`}
                />
                <Avatar.Fallback bg="$blue9">
                  <User size={24} color="$blue12" />
                </Avatar.Fallback>
              </Avatar>
              <YStack flex={1} gap="$1">
                <H3 color="$color12">{user?.name}</H3>
                <Text color="$color11" fontSize="$3">
                  {user?.email}
                </Text>
                <Text color="$color10" fontSize="$2">
                  User ID: {user?.id}
                </Text>
              </YStack>
            </XStack>
          </Card>

          {/* Protected Content Info */}
          <Card bg="$yellow2" borderColor="$yellow6" p="$4">
            <YStack gap="$2">
              <H3 color="$yellow11">🎉 Protected Content</H3>
              <Paragraph color="$yellow11" size="$3">
                This dashboard is only accessible to authenticated users. You successfully
                logged in and can now access protected features of the application.
              </Paragraph>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
