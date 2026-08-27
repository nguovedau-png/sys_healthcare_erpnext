import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store';
import MainNavigator from './src/navigation/MainNavigator';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import './src/i18n'; // Init i18n
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from './src/store';
import LoginScreen from './src/modules/auth/screens/LoginScreen';
import TwoFactorVerifyScreen from './src/modules/auth/screens/TwoFactorVerifyScreen';
import ForgotPasswordScreen from './src/modules/auth/screens/ForgotPasswordScreen';
import RegisterScreen from './src/modules/auth/screens/RegisterScreen';
import { authStorage } from './src/services/authStorage';
import api from './src/services/api';
import { jwtDecode } from 'jwt-decode';
import { setCredentials } from './src/modules/auth/store/authSlice';
import { Center, Spinner } from '@gluestack-ui/themed';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TwoFactorVerify" component={TwoFactorVerifyScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const AppContent = () => {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await authStorage.getAccessToken();
        if (token) {
          const decoded: any = jwtDecode(token);
          const userId = decoded.userId;

          // Fetch user details
          const response = await api.get(`/users/${userId}`);
          if (response.data && response.data.data) {
            // We need refreshToken to fully restore state if we want to keep it in Redux, 
            // but authStorage has it. 
            // We can get it from storage or just pass null if Redux doesn't strictly need it for API calls (interceptor handles it).
            // However, setCredentials type might require it.
            // Let's get it from storage.
            const refreshToken = await authStorage.getRefreshToken() || '';

            dispatch(setCredentials({
              user: response.data.data,
              accessToken: token,
              refreshToken
            }));
          }
        }
      } catch (error) {
        console.error("Failed to restore session", error);
        await authStorage.clearTokens();
      } finally {
        setIsReady(true);
      }
    };

    restoreSession();
  }, [dispatch]);

  if (!isReady) {
    return (
      <Center flex={1}>
        <Spinner size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <AppContent />
      </GluestackUIProvider>
    </Provider>
  );
}
