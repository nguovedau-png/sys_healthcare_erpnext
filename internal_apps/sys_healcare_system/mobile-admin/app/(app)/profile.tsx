import { useState } from 'react'
import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { YStack, XStack, H3, Card, Avatar, Text, ScrollView, Sheet, Input } from 'tamagui'
import { User, Mail, Pencil, Save, X } from '@tamagui/lucide-icons'
import { useAuth } from '../../contexts/AuthContext'
import { FormField } from '../../components/forms/FormField'
import { profileSchema, type ProfileFormData } from '../../lib/schemas'
import { PrimaryButton, SecondaryButton } from '../../components/ui'

export default function ProfileScreen() {
  const { user } = useAuth()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Profile form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  })

  const onUpdateProfile = async (data: ProfileFormData) => {
    try {
      setIsLoading(true)
      // In a real app, this would call an API to update the profile
      Alert.alert('Success', 'Profile updated successfully!')
      setIsEditingProfile(false)
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <YStack flex={1} bg="$background">
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack gap="$6" maxW={600} width="100%" self="center" px="$4" py="$6">
          {/* Profile Picture Section */}
          <Card bg="$color2" borderColor="$borderColor" p="$4">
            <YStack gap="$4" items="center">
              <Avatar circular size="$8" bg="$blue9">
                <Avatar.Image
                  src={`https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(user?.name || 'User')}&backgroundColor=3b82f6&textColor=ffffff`}
                />
                <Avatar.Fallback bg="$blue9">
                  <User size={32} color="$blue12" />
                </Avatar.Fallback>
              </Avatar>
            </YStack>
          </Card>

          {/* Profile Information */}
          <YStack gap="$4">
            <H3 color="$color12">Personal Information</H3>

            {/* Name Field */}
            <YStack gap="$2">
              <Text color="$color11" fontSize="$3" fontWeight="500">
                Full Name
              </Text>
              <XStack
                bg="$color2"
                borderColor="$borderColor"
                borderWidth={1}
                items="center"
                px="$3"
                height={50}
              >
                <User size={20} color="$color10" />
                <Input
                  flex={1}
                  borderWidth={0}
                  bg="transparent"
                  value={user?.name}
                  editable={false}
                  color="$color11"
                />
              </XStack>
            </YStack>

            {/* Email Field */}
            <YStack gap="$2">
              <Text color="$color11" fontSize="$3" fontWeight="500">
                Email Address
              </Text>
              <XStack
                bg="$color2"
                borderColor="$borderColor"
                borderWidth={1}
                items="center"
                px="$3"
                height={50}
              >
                <Mail size={20} color="$color10" />
                <Input
                  flex={1}
                  borderWidth={0}
                  bg="transparent"
                  value={user?.email}
                  editable={false}
                  color="$color11"
                />
              </XStack>
            </YStack>
          </YStack>

          {/* Action Buttons */}
          <YStack gap="$3">
            <PrimaryButton
              size="$4"
              icon={<Pencil size={16} />}
              onPress={() => setIsEditingProfile(true)}
            >
              Edit Profile
            </PrimaryButton>
          </YStack>
        </YStack>
      </ScrollView>

      {/* Edit Profile Sheet */}
      <Sheet
        modal
        open={isEditingProfile}
        onOpenChange={setIsEditingProfile}
        snapPoints={[85]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame p="$4" gap="$4">
          <XStack justify="space-between" items="center">
            <H3>Edit Profile</H3>
          </XStack>

          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <YStack gap="$4">
              <FormField
                control={profileForm.control}
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                icon={User}
                autoCapitalize="words"
              />

              <FormField
                control={profileForm.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                icon={Mail}
                keyboardType="email-address"
              />

              <XStack gap="$3" mt="$4">
                <SecondaryButton
                  flex={1}
                  size="$4"
                  onPress={() => setIsEditingProfile(false)}
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  flex={1}
                  size="$4"
                  icon={<Save size={16} />}
                  onPress={profileForm.handleSubmit(onUpdateProfile)}
                  loading={isLoading}
                >
                  Save Changes
                </PrimaryButton>
              </XStack>
            </YStack>
          </ScrollView>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  )
}
