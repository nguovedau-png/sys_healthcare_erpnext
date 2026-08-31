import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { YStack, H2, Paragraph, Card, XStack, Button, Input, Label, Spinner } from 'tamagui'
import { getTenant, updateTenant } from '../../../../lib/admin'
import { useLocalSearchParams, router } from 'expo-router'

export default function EditTenantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [name, setName] = useState('')
  const [domain, setDomain] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const t = await getTenant(String(id))
        setName(t.name || '')
        setDomain(t.domain || '')
        setEmail(t.email || '')
      } catch (e: any) {
        Alert.alert('Error', e?.message || 'Load tenant failed')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const validate = () => {
    if (!name.trim()) return 'Name is required'
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email'
    return null
  }

  const onSubmit = async () => {
    const err = validate()
    if (err) return Alert.alert('Validation', err)
    try {
      setSaving(true)
      await updateTenant(String(id), {
        name: name.trim(),
        domain: domain.trim() || undefined,
        email: email.trim() || undefined,
      })
      ;(router as any).replace('/(app)/settings/tenants')
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Update tenant failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <YStack flex={1} p="$3" bg="$background" gap="$3">
      <H2>Edit Tenant</H2>
      {loading ? (
        <XStack items="center" justify="center" py="$6"><Spinner /></XStack>
      ) : (
        <Card p="$3">
          <YStack gap="$2">
            <Label>Name</Label>
            <Input value={name} onChangeText={setName} placeholder="Tenant name" />
            <Label>Domain</Label>
            <Input value={domain} onChangeText={setDomain} placeholder="Domain (optional)" />
            <Label>Email</Label>
            <Input value={email} onChangeText={setEmail} placeholder="Email (optional)" keyboardType="email-address" />
            <XStack gap="$2" mt="$2">
              <Button onPress={onSubmit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
              <Button chromeless onPress={() => router.back()} disabled={saving}>Cancel</Button>
            </XStack>
          </YStack>
        </Card>
      )}
      <Paragraph color="$color11">Editing tenant {String(id)}</Paragraph>
    </YStack>
  )
}
