import React, { type JSX } from 'react'
import {
  Button as TamaguiButton,
  type ButtonProps as TamaguiButtonProps,
  Spinner,
  XStack,
  Text,
} from 'tamagui'
import type { IconProps } from '@tamagui/helpers-icon'

type IconComponent = (propsIn: IconProps) => JSX.Element

export type ButtonVariant = 'primary' | 'secondary' | 'destructive'

export interface ButtonProps extends Omit<TamaguiButtonProps, 'variant'> {
  variant?: ButtonVariant
  loading?: boolean
  loadingText?: string
  icon?: React.ReactElement<IconProps> | IconComponent
  children: React.ReactNode
}

const buttonStyles = {
  primary: {
    bg: '$blue5',
    color: '$blue12',
    borderColor: '$blue7',
    borderWidth: 1,
    pressStyle: {
      bg: '$blue6',
      borderColor: '$blue8',
    },
    hoverStyle: {
      bg: '$blue4',
      borderColor: '$blue6',
    },
    focusStyle: {
      bg: '$blue4',
      borderColor: '$blue6',
    },
    disabledStyle: {
      bg: '$color5',
      color: '$color9',
      borderColor: '$color5',
      opacity: 0.6,
    },
  },
  secondary: {
    bg: '$color3',
    color: '$color11',
    borderColor: '$borderColor',
    borderWidth: 1,
    pressStyle: {
      bg: '$color4',
      borderColor: '$color6',
    },
    hoverStyle: {
      bg: '$color2',
      borderColor: '$color5',
    },
    focusStyle: {
      bg: '$color2',
      borderColor: '$color5',
    },
    disabledStyle: {
      bg: '$color2',
      color: '$color8',
      borderColor: '$color4',
      opacity: 0.6,
    },
  },
  destructive: {
    bg: '$red4',
    color: '$red11',
    borderColor: '$red6',
    borderWidth: 1,
    pressStyle: {
      bg: '$red5',
      borderColor: '$red7',
    },
    hoverStyle: {
      bg: '$red3',
      borderColor: '$red5',
    },
    focusStyle: {
      bg: '$red3',
      borderColor: '$red5',
    },
    disabledStyle: {
      bg: '$color5',
      color: '$color9',
      borderColor: '$color5',
      opacity: 0.6,
    },
  },
} as const

export function Button({
  variant = 'primary',
  loading = false,
  loadingText,
  icon,
  children,
  disabled,
  size = '$4',
  ...props
}: ButtonProps) {
  const styles = buttonStyles[variant]
  const isDisabled = disabled || loading

  // Render icon if provided
  const renderIcon = () => {
    if (!icon) {
      return null
    }
    const iconProps = { size: 16, color: styles.color }
    if (typeof icon === 'function') {
      const Icon = icon
      return <Icon {...iconProps} />
    }
    return React.cloneElement(icon as React.ReactElement, iconProps)
  }

  const buttonContent = loading ? (
    <XStack gap="$2" items="center">
      <Spinner size="small" color={styles.color} />
      {loadingText && <Text color={styles.color}>{loadingText}</Text>}
    </XStack>
  ) : (
    <XStack gap="$2" items="center">
      {renderIcon()}
      {typeof children === 'string' ? (
        <Text color={styles.color} fontWeight="500">
          {children}
        </Text>
      ) : (
        children
      )}
    </XStack>
  )

  return (
    <TamaguiButton size={size} disabled={isDisabled} {...styles} {...props}>
      {buttonContent}
    </TamaguiButton>
  )
}

// Export individual button variants for convenience
export const PrimaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="primary" {...props} />
)

export const SecondaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="secondary" {...props} />
)

export const DestructiveButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="destructive" {...props} />
)
