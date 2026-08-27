import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  getStoredAuthData,
  validateToken,
  updateProfile as authUpdateProfile,
  type User,
} from '../lib/auth'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (identifier: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: { name: string; email: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Check for stored auth data on app start
  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      setIsLoading(true)
      const authData = await getStoredAuthData()

      if (authData) {
        // Validate the stored token
        const isValid = await validateToken(authData.token)
        if (isValid) {
          setUser(authData.user)
          setToken(authData.token)
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (identifier: string, password: string) => {
    try {
      const authData = await authLogin(identifier, password)
      setUser(authData.user)
      setToken(authData.token)
    } catch (error) {
      // Re-throw to let the caller handle the error
      throw error
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      const authData = await authRegister(email, password, name)
      setUser(authData.user)
      setToken(authData.token)
    } catch (error) {
      // Re-throw to let the caller handle the error
      throw error
    }
  }

  const updateProfile = async (data: { name: string; email: string }) => {
    const updatedUser = await authUpdateProfile(data)
    setUser(updatedUser)
  }

  const logout = async () => {
    try {
      await authLogout()
      setUser(null)
      setToken(null)
    } catch (error) {
      console.error('Error during logout:', error)
      // Still clear the state even if logout fails
      setUser(null)
      setToken(null)
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}