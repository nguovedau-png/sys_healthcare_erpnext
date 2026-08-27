import { Redirect } from 'expo-router'
import { useAuth } from '../contexts/AuthContext'

export default function IndexScreen() {
  const { isAuthenticated } = useAuth()

  // Redirect based on authentication state
  if (isAuthenticated) {
    return <Redirect href="/(app)/dashboard" />
  }

  return <Redirect href="/(auth)/login" />
}
