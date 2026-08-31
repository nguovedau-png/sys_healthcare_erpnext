import { router } from 'expo-router'
import { H2, Paragraph, YStack, Card, XStack, Text } from 'tamagui'
import { Users, Building2, Shield, Key, Video, MessageCircle } from '@tamagui/lucide-icons'

type SettingsRoute = 'users' | 'tenants' | 'roles' | 'permissions' | 'agora' | 'chat'

function navigateTo(to: SettingsRoute) {
  const typedRouter: any = router;
  switch (to) {
    case 'users':
      typedRouter.push('/(app)/settings/users')
      break
    case 'tenants':
      typedRouter.push('/(app)/settings/tenants')
      break
    case 'roles':
      typedRouter.push('/(app)/settings/roles')
      break
    case 'permissions':
      typedRouter.push('/(app)/settings/permissions')
      break
    case 'agora':
      typedRouter.push('/(app)/settings/agora')
      break
    case 'chat':
      typedRouter.push('/(app)/chat')
      break
  }
}

function SettingsItem({ title, description, icon, to }: { title: string; description: string; icon: any; to: SettingsRoute }) {
  return (
    <Card p="$3" onPress={() => navigateTo(to)}>
      <XStack gap="$3" items="center">
        {icon}
        <YStack>
          <Text fontWeight="600">{title}</Text>
          <Paragraph color="$color11">{description}</Paragraph>
        </YStack>
      </XStack>
    </Card>
  )
}

export default function SettingsIndexScreen() {
  return (
    <YStack flex={1} p="$3" bg="$background" gap="$3">
      <H2>Settings</H2>
      <SettingsItem
        title="Users"
        description="Manage users in your scope"
        icon={<Users size={20} />}
        to="users"
      />
      <SettingsItem
        title="Tenants"
        description="Manage companies/tenants"
        icon={<Building2 size={20} />}
        to="tenants"
      />
      <SettingsItem
        title="Roles"
        description="Manage roles"
        icon={<Shield size={20} />}
        to="roles"
      />
      <SettingsItem
        title="Permissions"
        description="Manage permissions"
        icon={<Key size={20} />}
        to="permissions"
      />
      <SettingsItem
        title="Video Call"
        description="Agora video calling"
        icon={<Video size={20} />}
        to="agora"
      />
      <SettingsItem
        title="Chat"
        description="Real-time messaging"
        icon={<MessageCircle size={20} />}
        to="chat"
      />
    </YStack>
  )
}