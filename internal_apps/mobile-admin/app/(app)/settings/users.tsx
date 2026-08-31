import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { YStack, H2, Paragraph, Card, XStack, Separator, Spinner, Text, ScrollView, Button } from 'tamagui'
import { listUsers, deleteUser } from '../../../lib/admin'
import { router } from 'expo-router'

export default function UsersScreen() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])

  const load = async () => {
    try {
      setLoading(true)
      const res = await listUsers({ page: 1, limit: 50 })
      const items = Array.isArray(res)
        ? res
        : Array.isArray((res as any).items)
        ? (res as any).items
        : Array.isArray((res as any).data)
        ? (res as any).data
        : []
      setUsers(items)
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onDelete = async (u: any) => {
    Alert.alert('Confirm', `Delete user ${u.email}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true)
            await deleteUser(u._id || u.id)
            await load()
          } catch (e: any) {
            Alert.alert('Error', e?.message || 'Delete failed')
          } finally {
            setLoading(false)
          }
        },
      },
    ])
  }

  return (
    <YStack flex={1} p="$3" bg="$background">
      <H2 mb="$2">Users</H2>
      <Paragraph mb="$3" color="$color11">Manage users in your scope (host or tenant).</Paragraph>
      <XStack items="center" justify="space-between" mb="$3">
        <Button size="$3" onPress={load}>Refresh</Button>
        <Button size="$3" onPress={() => (router as any).push('/(app)/settings/users/new')}>Add User</Button>
      </XStack>
      <Separator mb="$3" />
      {loading ? (
        <XStack items="center" justify="center" py="$6"><Spinner /></XStack>
      ) : (
        <ScrollView>
          <YStack gap="$3">
            {users.map((u) => (
              <Card key={u._id || u.id} p="$3">
                <YStack gap="$1">
                  <Text fontWeight="600">{u.name || u.fullName || 'No name'}</Text>
                  <Text color="$color11">{u.email}</Text>
                  {u.userType && <Text color="$color11">Type: {u.userType}</Text>}
                  {Array.isArray(u.roleNames) && u.roleNames.length > 0 && (
                    <Text color="$color11">Roles: {u.roleNames.join(', ')}</Text>
                  )}
                  <XStack gap="$2" mt="$2">
                    <Button size="$2" onPress={() => (router as any).push(`/(app)/settings/users/${u._id || u.id}`)}>Edit</Button>
                    <Button size="$2" chromeless onPress={() => onDelete(u)}>Delete</Button>
                  </XStack>
                </YStack>
              </Card>
            ))}
          </YStack>
        </ScrollView>
      )}
    </YStack>
  )
}
