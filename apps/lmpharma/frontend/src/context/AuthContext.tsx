import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useFrappeAuth } from 'frappe-react-sdk';

interface User {
  username: string;
  full_name: string;
  email: string;
  user_image?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  currentUser: string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { login: frappeLogin, logout: frappeLogout, currentUser, isLoading } = useFrappeAuth();

  const login = async (username: string, password: string) => {
    try {
      await frappeLogin({
        username,
        password,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await frappeLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get user details if logged in
  const user: User | null = currentUser
    ? {
        username: currentUser,
        full_name: currentUser,
        email: currentUser,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        logout,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
