import React, { useState } from 'react'
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'
import { YStack, XStack, Input, Text, Button } from 'tamagui'
import { Eye, EyeOff, Lock } from '@tamagui/lucide-icons'

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder: string
}

export function PasswordField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <YStack gap="$2">
          <Text color="$color11" fontSize="$3" fontWeight="500">
            {label}
          </Text>
          <XStack
            bg="$color2"
            borderColor={error ? '$red8' : '$borderColor'}
            borderWidth={1}
            items="center"
            px="$3"
            height={50}
          >
            <Lock size={20} color={error ? '$red10' : '$color10'} />
            <Input
              flex={1}
              borderWidth={0}
              bg="transparent"
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button
              size="$2"
              bg="transparent"
              onPress={() => setShowPassword(!showPassword)}
              p="$1"
            >
              {showPassword ? (
                <EyeOff size={20} color="$color10" />
              ) : (
                <Eye size={20} color="$color10" />
              )}
            </Button>
          </XStack>
          {error && (
            <Text color="$red10" fontSize="$2">
              {error.message}
            </Text>
          )}
        </YStack>
      )}
    />
  )
}
