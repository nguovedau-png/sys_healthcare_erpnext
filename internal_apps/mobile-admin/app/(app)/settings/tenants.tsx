import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { YStack, H2, Paragraph, Card, XStack, Separator, Spinner, Text, ScrollView, Button } from 'tamagui'
import { listTenants, deleteTenant } from '../../../lib/admin'
import { router } from 'expo-router'

export default function TenantsScreen() {
  const [loading, setLoading] = useState(true)
  const [tenants, setTenants] = useState<any[]>([])

  const load = async () => {
    try {
      setLoading(true)
      const res = await listTenants({ page: 1, limit: 20 })
      const items = Array.isArray(res)
        ? res
        : Array.isArray((res as any).items)
        ? (res as any).items
        : Array.isArray((res as any).data)
        ? (res as any).data
        : []
      setTenants(items)
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Failed to load tenants')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onDelete = async (t: any) => {
    Alert.alert('Confirm', `Delete tenant ${t.name || t.domain || t._id}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true)
            await deleteTenant(t._id || t.id)
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
      <H2 mb="$2">Tenants</H2>
      <Paragraph mb="$3" color="$color11">Manage companies/tenants.</Paragraph>
      <XStack items="center" justify="space-between" mb="$3">
        <Button size="$3" onPress={load}>Refresh</Button>
        <Button size="$3" onPress={() => (router as any).push('/(app)/settings/tenants/new')}>Add Tenant</Button>
      </XStack>
      <Separator mb="$3" />
      {loading ? (
        <XStack items="center" justify="center" py="$6"><Spinner /></XStack>
      ) : (
        <ScrollView>
          <YStack gap="$3">
            {tenants.map((t) => (
              <Card key={t._id || t.id} p="$3">
                <YStack gap="$1">
                  <Text fontWeight="600">{t.name || 'Unnamed tenant'}</Text>
                  {t.domain && <Text color="$color11">Domain: {t.domain}</Text>}
                  {t.email && <Text color="$color11">Email: {t.email}</Text>}
                  {t.country && <Text color="$color11">Country: {t.country}</Text>}
                  {t.isActive !== undefined && <Text color="$color11">Active: {String(t.isActive)}</Text>}
                  <XStack gap="$2" mt="$2">
                    <Button size="$2" onPress={() => (router as any).push(`/(app)/settings/tenants/${t._id || t.id}`)}>Edit</Button>
                    <Button size="$2" chromeless onPress={() => onDelete(t)}>Delete</Button>
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
