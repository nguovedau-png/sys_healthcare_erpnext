import apiService from './api';
import axios from 'axios';

// OAuth Configuration
const FRAPPE_URL = process.env.NEXT_PUBLIC_FRAPPE_URL || 'http://localhost:8000';
const CLIENT_ID = 'efvnmtgc58';
const CLIENT_SECRET = 'web-admin-secret'; // Note: In a real app, this should be handled server-side
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/auth/callback';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    userId?: string;
}

export interface User {
    id: number;
    userId: string;
    email: string;
    name: string | null;
    phone?: string;
    address?: string;
    department?: string;
    position?: string;
    roleId?: number;
    isActive?: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}

class AuthService {
    // Initiate OAuth Login by redirecting to Frappe
    initiateOAuthLogin() {
        if (typeof window === 'undefined') return;
        
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            response_type: 'code',
            scope: 'openid all',
            redirect_uri: REDIRECT_URI
        });
        
        window.location.href = `${FRAPPE_URL}/api/method/frappe.integrations.oauth2.authorize?${params.toString()}`;
    }

    // Exchange Code for Token
    async exchangeCodeForToken(code: string): Promise<string> {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', REDIRECT_URI);
        formData.append('client_id', CLIENT_ID);
        formData.append('client_secret', CLIENT_SECRET);

        const response = await axios.post(`${FRAPPE_URL}/api/method/frappe.integrations.oauth2.get_token`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.access_token;
    }

    // Fetch User Profile using Token
    async fetchUserProfile(token: string): Promise<User> {
        const response = await axios.get(`${FRAPPE_URL}/api/method/frappe.integrations.oauth2.openid_profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        // Map Frappe's openid_profile to our User interface
        // Frappe returns { sub: 'email', name: 'Name', email: 'email', ... }
        const profile = response.data;
        return {
            id: 0, // Mock ID
            userId: profile.email || profile.sub,
            email: profile.email || profile.sub,
            name: profile.name,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    // Existing login for backward compatibility or direct API usage
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiService.post<AuthResponse>('/auth/login', credentials);
        if (response.access_token) {
            this.setSession(response.access_token, response.user);
        }
        return response;
    }

    setSession(token: string, user: User) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiService.post<AuthResponse>('/auth/register', data);
        if (response.access_token) {
            this.setSession(response.access_token, response.user);
        }
        return response;
    }

    async logout(): Promise<void> {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }

    getCurrentUser(): User | null {
        if (typeof window === 'undefined') return null;
        const userStr = localStorage.getItem('user');
        if (!userStr || userStr === 'undefined') return null;
        try {
            return JSON.parse(userStr);
        } catch (e) {
            console.error('Error parsing user from localStorage', e);
            localStorage.removeItem('user');
            return null;
        }
    }

    getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('auth_token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export const authService = new AuthService();
export default authService;
