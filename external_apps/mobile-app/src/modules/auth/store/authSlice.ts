import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    isAuthenticated: boolean;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: any; accessToken: string; refreshToken: string }>
        ) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.isAuthenticated = true;
            state.token = accessToken;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
