import { useState } from 'react'
import { Alert } from 'react-native'
import { YStack, H2, Paragraph, Card, XStack, Button, Input, Label } from 'tamagui'
import { createUser } from '../../../../lib/admin'
import { router } from 'expo-router'

export default function NewUserScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!name.trim()) return 'Name is required'
    if (!email.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email'
    if (!password.trim() || password.length < 6) return 'Password must be at least 6 characters'
    return null
  }

  const onSubmit = async () => {
    const err = validate()
    if (err) return Alert.alert('Validation', err)
    try {
      setLoading(true)
      await createUser({ name: name.trim(), email: email.trim(), password })
      router.replace('/(app)/settings/users')
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Create user failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack flex={1} p="$3" bg="$background" gap="$3">
      <H2>Create User</H2>
      <Card p="$3">
        <YStack gap="$2">
          <Label>Name</Label>
          <Input value={name} onChangeText={setName} placeholder="Full name" />
          <Label>Email</Label>
          <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
          <Label>Password</Label>
          <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
          <XStack gap="$2" mt="$2">
            <Button onPress={onSubmit} disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            <Button chromeless onPress={() => router.back()} disabled={loading}>Cancel</Button>
          </XStack>
        </YStack>
      </Card>
      <Paragraph color="$color11">Users will be created in host or current tenant context based on your auth.</Paragraph>
    </YStack>
  )
}
