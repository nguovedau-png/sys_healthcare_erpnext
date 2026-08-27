import axios from 'axios';
import { Platform } from 'react-native';
import { authStorage } from './authStorage';

// Use local IP for Android emulator or physical device if needed
export const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';
const baseURL = API_URL;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Required for Frappe session cookies
});

// Request Interceptor
api.interceptors.request.use(
    async (config) => {
        const token = await authStorage.getAccessToken(); // We will store 'sid' or 'token' here
        if (token) {
            // Frappe Token Auth format: Authorization: token api_key:api_secret
            // If it's a SID cookie we could pass it in Cookie header or just let withCredentials handle it.
            // We pass it in both a Cookie header (for fetch/axios manual override) and Authorization in case we switch to tokens.
            if (token.includes(':')) {
                config.headers.Authorization = `token ${token}`;
            } else if (Platform.OS !== 'web') {
                // If it's a session ID (sid)
                config.headers.Cookie = `sid=${token}; user_id=Guest; system_user=yes`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        // Extract session cookie from login response if present
        const setCookie = response.headers['set-cookie'];
        if (setCookie) {
            const sidCookie = setCookie.find((c: string) => c.startsWith('sid='));
            if (sidCookie) {
                const sid = sidCookie.split(';')[0].split('=')[1];
                if (sid && sid !== 'Guest') {
                    // Update auth storage but this might be circular, usually done in login screen.
                    // We'll leave it to login screen.
                }
            }
        }
        return response;
    },
    async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Unauthenticated
            await authStorage.clearTokens();
            // TODO: dispatch logout
        }
        return Promise.reject(error);
    }
);

export default api;
