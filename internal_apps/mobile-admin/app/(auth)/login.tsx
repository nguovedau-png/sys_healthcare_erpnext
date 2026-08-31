import { useState } from 'react'
import { Alert } from 'react-native'
import { Link, router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { YStack, XStack, H1, Text, Paragraph, ScrollView } from 'tamagui'
import { Mail } from '@tamagui/lucide-icons'
import { useAuth } from '../../contexts/AuthContext'
import { loginSchema, type LoginFormData } from '../../lib/schemas'
import { FormField } from '../../components/forms/FormField'
import { PasswordField } from '../../components/forms/PasswordField'
import { PrimaryButton } from '../../components/ui'

export default function LoginScreen() {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      await login(
        data.identifier.trim(),
        data.password
      )
      router.replace('/(app)/dashboard')
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'An error occurred'
      )
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <YStack flex={1} bg="$background">
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack maxW={400} width="100%" self="center" gap="$6" px="$4" py="$8">
          {/* Header */}
          <YStack gap="$2" items="center">
            <H1 color="$color12" text="center" size="$8">
              Welcome Back
            </H1>
            <Paragraph color="$color11" text="center" size="$4">
              Sign in to your account to continue
            </Paragraph>
          </YStack>


          {/* Login Form */}
          <YStack gap="$4">
            {/* Identifier Input */}
            <FormField
              control={control}
              name="identifier"
              label="Username or Email"
              placeholder="Enter your username or email"
              icon={Mail}
              keyboardType="email-address"
            />

            {/* Password Input */}
            <PasswordField
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
            />

            {/* Login Button */}
            <PrimaryButton
              size="$4"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              loadingText="Signing In..."
              mt="$2"
            >
              Sign In
            </PrimaryButton>

            {/* Register Link */}
            <XStack justify="center" gap="$2" mt="$4">
              <Text color="$color11">Don't have an account?</Text>
              <Link href="/(auth)/register" asChild>
                <Text color="$blue10" fontWeight="500" textDecorationLine="underline">
                  Sign Up
                </Text>
              </Link>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}