import axios from 'axios';
import { Platform } from 'react-native';
import { authStorage } from './authStorage';

// Use local IP for Android emulator or physical device if needed, localhost works for iOS simulator
// Change 'localhost' to your machine's IP if testing on physical device
export const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000/api/v1' : 'http://localhost:3000/api/v1';
const baseURL = API_URL;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    async (config) => {
        const token = await authStorage.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loop
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = await authStorage.getRefreshToken();
                if (refreshToken) {
                    const response = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });
                    const { accessToken, refreshToken: newRefreshToken } = response.data.data; // Response wrapper usually has data

                    if (newRefreshToken) {
                        await authStorage.setTokens(accessToken, newRefreshToken);
                    } else {
                        // Just update access token if refresh token isn't rotated
                        await authStorage.setTokens(accessToken, refreshToken);
                    }

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed: clear the local session and propagate the auth error.
                // Auth-aware screens handle navigation to the login route at their boundary.
                await authStorage.clearTokens();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
