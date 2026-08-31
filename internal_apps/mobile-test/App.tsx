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
          try {
            // Fetch user details from Frappe
            const response = await api.get('/api/method/frappe.auth.get_logged_user');
            const userEmail = response.data?.message;
            if (userEmail && userEmail !== 'Guest') {
              // Get full profile
              const userProfile = await api.get(`/api/resource/User/${userEmail}`);
              dispatch(setCredentials({
                user: userProfile.data.data,
                accessToken: token,
                refreshToken: ''
              }));
            } else {
              // Definitely logged out as Guest - clear
              await authStorage.clearTokens();
            }
          } catch (apiError: any) {
            const isNetworkError = !apiError.response; // no response = network unreachable
            if (isNetworkError) {
              // Frappe server unreachable - keep token, show login to retry
              console.warn("Frappe server unreachable, will show login screen.");
            } else if (apiError.response?.status === 401 || apiError.response?.status === 403) {
              // Session expired on server side
              await authStorage.clearTokens();
            }
            // else: some other server error, don't clear the token
          }
        }
      } catch (error) {
        console.error("Failed to restore session (storage error)", error);
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
