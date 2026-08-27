import { useColorScheme } from 'react-native'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { AuthProvider } from './AuthContext'
import { NotificationProvider } from './NotificationContext'
import { Provider as ReduxProvider } from 'react-redux'
import store from '../store/index'
import { config } from '../tamagui.config'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      <ReduxProvider store={store}>
        <AuthProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AuthProvider>
      </ReduxProvider>
    </TamaguiProvider>
  )
}