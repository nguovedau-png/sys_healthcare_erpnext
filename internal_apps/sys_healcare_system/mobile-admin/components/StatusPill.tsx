import { XStack, Text } from 'tamagui'

export function StatusPill({ children, ...props }: any) {
  const { color = 'white', fontSize = '$2', ...containerProps } = props
  return (
    <XStack {...containerProps} px="$1" minHeight="$2" items="center">
      <Text color={color} fontSize={fontSize}>{children}</Text>
    </XStack>
  )
}
