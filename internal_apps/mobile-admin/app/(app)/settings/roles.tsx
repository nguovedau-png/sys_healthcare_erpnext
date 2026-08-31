import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { YStack, H2, Paragraph, Card, XStack, Separator, Spinner, Text, ScrollView, Button, Input, Label } from 'tamagui'
import { listRoles, createRole, updateRole, deleteRole } from '../../../lib/admin'

export default function RolesScreen() {
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      const res = await listRoles({ page: 1, limit: 50 })
      const items = Array.isArray(res)
        ? res
        : Array.isArray((res as any).items)
        ? (res as any).items
        : Array.isArray((res as any).data)
        ? (res as any).data
        : []
      setRoles(items)
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Failed to load roles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const resetForm = () => {
    setEditing(null)
    setName('')
    setDescription('')
    setShowForm(false)
  }

  const startCreate = () => {
    setEditing(null)
    setName('')
    setDescription('')
    setShowForm(true)
  }

  const startEdit = (r: any) => {
    setEditing(r)
    setName(r.name || '')
    setDescription(r.description || '')
    setShowForm(true)
  }

  const submitForm = async () => {
    try {
      setLoading(true)
      if (editing) {
        await updateRole(editing._id || editing.id, { name, description })
      } else {
        await createRole({ name, description })
      }
      await load()
      resetForm()
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async (r: any) => {
    try {
      setLoading(true)
      await deleteRole(r._id || r.id)
      await load()
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Delete failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <YStack flex={1} p="$3" bg="$background">
      <H2 mb="$2">Roles</H2>
      <Paragraph mb="$3" color="$color11">Manage roles and their properties.</Paragraph>
      <XStack items="center" justify="space-between" mb="$3">
        <Button size="$3" onPress={load}>Refresh</Button>
        <Button size="$3" onPress={startCreate}>Add Role</Button>
      </XStack>
      <Separator mb="$3" />
      {showForm && (
        <Card p="$3" mb="$3">
          <YStack gap="$2">
            <Label>Name</Label>
            <Input value={name} onChangeText={setName} placeholder="Role name" />
            <Label>Description</Label>
            <Input value={description} onChangeText={setDescription} placeholder="Description (optional)" />
            <XStack gap="$2" mt="$2">
              <Button onPress={submitForm}>{editing ? 'Update' : 'Create'}</Button>
              <Button chromeless onPress={resetForm}>Cancel</Button>
            </XStack>
          </YStack>
        </Card>
      )}
      {loading ? (
        <XStack items="center" justify="center" py="$6"><Spinner /></XStack>
      ) : (
        <ScrollView>
          <YStack gap="$3">
            {roles.map((r) => (
              <Card key={r._id || r.id} p="$3">
                <YStack gap="$1">
                  <Text fontWeight="600">{r.name || 'Unnamed role'}</Text>
                  {r.description && <Text color="$color11">{r.description}</Text>}
                  <XStack gap="$3">
                    {r.type && <Text color="$color11">Type: {r.type}</Text>}
                    {r.isActive !== undefined && <Text color="$color11">Active: {String(r.isActive)}</Text>}
                  </XStack>
                  <XStack gap="$3">
                    {r.type && <Text color="$color11">Type: {r.type}</Text>}
                    {r.isActive !== undefined && <Text color="$color11">Active: {String(r.isActive)}</Text>}
                  </XStack>
                  <XStack gap="$2" mt="$2">
                    <Button size="$2" onPress={() => startEdit(r)}>Edit</Button>
                    <Button size="$2" chromeless onPress={() => onDelete(r)}>Delete</Button>
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
