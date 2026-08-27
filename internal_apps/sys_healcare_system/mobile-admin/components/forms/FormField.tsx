import type { JSX } from 'react'
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'
import { YStack, XStack, Input, Text } from 'tamagui'
import type { IconProps } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder: string
  icon?: IconComponent
  secureTextEntry?: boolean
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  multiline?: boolean
  numberOfLines?: number
  editable?: boolean
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon: Icon,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  multiline = false,
  numberOfLines = 1,
  editable = true,
}: FormFieldProps<T>) {
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
            items={multiline ? 'flex-start' : 'center'}
            px="$3"
            minH={multiline ? numberOfLines * 24 + 26 : 50}
          >
            {Icon && (
              <Icon
                size={20}
                color={error ? '$red10' : '$color10'}
                style={{ marginTop: multiline ? 15 : 0 }}
              />
            )}
            <Input
              flex={1}
              borderWidth={0}
              bg="transparent"
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              autoCorrect={false}
              multiline={multiline}
              numberOfLines={numberOfLines}
              editable={editable}
              color={editable ? '$color12' : '$color11'}
            />
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
