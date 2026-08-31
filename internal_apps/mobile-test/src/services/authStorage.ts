import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

// Fallback for web since SecureStore is only for iOS/Android
const isWeb = Platform.OS === 'web';

export const authStorage = {
    async setTokens(accessToken: string, refreshToken: string) {
        if (isWeb) {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
            return;
        }
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    },

    async getAccessToken() {
        if (isWeb) {
            return localStorage.getItem(ACCESS_TOKEN_KEY);
        }
        return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    },

    async getRefreshToken() {
        if (isWeb) {
            return localStorage.getItem(REFRESH_TOKEN_KEY);
        }
        return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    },

    async clearTokens() {
        if (isWeb) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            return;
        }
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    }
};
