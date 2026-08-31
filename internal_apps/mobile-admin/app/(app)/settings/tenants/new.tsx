import { useState } from 'react'
import { Alert } from 'react-native'
import { YStack, H2, Paragraph, Card, XStack, Button, Input, Label } from 'tamagui'
import { createTenant } from '../../../../lib/admin'
import { router } from 'expo-router'

export default function NewTenantScreen() {
  const [name, setName] = useState('')
  const [domain, setDomain] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!name.trim()) return 'Name is required'
    // domain and email optional; validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email'
    return null
  }

  const onSubmit = async () => {
    const err = validate()
    if (err) return Alert.alert('Validation', err)
    try {
      setLoading(true)
      await createTenant({ name: name.trim(), domain: domain.trim() || undefined, email: email.trim() || undefined })
      ;(router as any).replace('/(app)/settings/tenants')
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Create tenant failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack flex={1} p="$3" bg="$background" gap="$3">
      <H2>Create Tenant</H2>
      <Card p="$3">
        <YStack gap="$2">
          <Label>Name</Label>
          <Input value={name} onChangeText={setName} placeholder="Tenant name" />
          <Label>Domain</Label>
          <Input value={domain} onChangeText={setDomain} placeholder="Domain (optional)" />
          <Label>Email</Label>
          <Input value={email} onChangeText={setEmail} placeholder="Email (optional)" keyboardType="email-address" />
          <XStack gap="$2" mt="$2">
            <Button onPress={onSubmit} disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            <Button chromeless onPress={() => router.back()} disabled={loading}>Cancel</Button>
          </XStack>
        </YStack>
      </Card>
      <Paragraph color="$color11">Creates a new company/tenant.</Paragraph>
    </YStack>
  )
}
