import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { YStack, H2, Paragraph, Card, XStack, Button, Input, Label, Spinner } from 'tamagui'
import { getUser, updateUser } from '../../../../lib/admin'
import { useLocalSearchParams, router } from 'expo-router'

export default function EditUserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const u = await getUser(String(id))
        setName(u.name || '')
        setEmail(u.email || '')
      } catch (e: any) {
        Alert.alert('Error', e?.message || 'Load user failed')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const validate = () => {
    if (!name.trim()) return 'Name is required'
    if (!email.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email'
    return null
  }

  const onSubmit = async () => {
    const err = validate()
    if (err) return Alert.alert('Validation', err)
    try {
      setSaving(true)
      const body: any = { name: name.trim(), email: email.trim() }
      if (password.trim()) body.password = password
      await updateUser(String(id), body)
      router.replace('/(app)/settings/users')
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Update user failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <YStack flex={1} p="$3" bg="$background" gap="$3">
      <H2>Edit User</H2>
      {loading ? (
        <XStack items="center" justify="center" py="$6"><Spinner /></XStack>
      ) : (
        <Card p="$3">
          <YStack gap="$2">
            <Label>Name</Label>
            <Input value={name} onChangeText={setName} placeholder="Full name" />
            <Label>Email</Label>
            <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
            <Label>Password (leave blank to keep)</Label>
            <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
            <XStack gap="$2" mt="$2">
              <Button onPress={onSubmit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
              <Button chromeless onPress={() => router.back()} disabled={saving}>Cancel</Button>
            </XStack>
          </YStack>
        </Card>
      )}
      <Paragraph color="$color11">Editing user {String(id)}</Paragraph>
    </YStack>
  )
}
