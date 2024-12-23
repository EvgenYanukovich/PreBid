import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LoginRequest, LoginResponse, RegisterRequest, LogoutResponse } from '../../types/auth';
import { UserInformation } from '../../types/user';
import { AUTH_CONFIG } from '../../config/api';
import api from '../../api/axios';

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    userInfo: UserInformation | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('jwt_token'),
    accessToken: localStorage.getItem('jwt_token') || null,
    userInfo: null,
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }: { username: string; password: string }) => {
        const loginData: LoginRequest = {
            client_id: AUTH_CONFIG.CLIENT_ID,
            client_secret: AUTH_CONFIG.CLIENT_SECRET,
            username,
            password
        };

        try {
            const response = await api.post<LoginResponse>('/user/login', loginData);
            const { access_token } = response.data;
            localStorage.setItem('jwt_token', access_token);
            return response.data;
        } catch (error: any) {
            if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat();
                throw new Error(errorMessages.join('. '));
            }
            throw new Error(error.response?.data?.message || 'Ошибка авторизации');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data: RegisterRequest) => {
        try {
            const response = await api.post('/lead_generation', data);
            if (response.status === 500 && (!response.data.errors || Object.keys(response.data.errors).length === 0)) {
                return;
            }
            return response.data;
        } catch (error: any) {
            if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat();
                throw new Error(errorMessages.join('. '));
            }
            throw new Error(error.response?.data?.message || 'Ошибка при регистрации');
        }
    }
);

export const logoutAsync = createAsyncThunk<LogoutResponse>(
    'auth/logoutAsync',
    async () => {
        const response = await api.post<LogoutResponse>('/user/logout');
        localStorage.removeItem('jwt_token');
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ accessToken: string }>) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
        },
        setUserInfo: (state, action: PayloadAction<UserInformation>) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('jwt_token');
            state.isAuthenticated = false;
            state.accessToken = null;
            state.userInfo = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.accessToken = action.payload.access_token;
                state.loading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка авторизации';
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при регистрации';
            })
            .addCase(logoutAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.accessToken = null;
                state.userInfo = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при выходе из системы';
            });
    }
});

export const { setAuth, setUserInfo, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
