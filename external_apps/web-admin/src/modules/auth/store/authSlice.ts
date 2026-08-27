import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    isAuthenticated: boolean;
    token: string | null;
}

// Helper to get user from localStorage
const getUserFromStorage = () => {
    try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    } catch {
        return null;
    }
};

const initialState: AuthState = {
    user: getUserFromStorage(),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    token: localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: any; accessToken: string; refreshToken: string }>
        ) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.isAuthenticated = true;
            state.token = accessToken;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
