import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../types/auth';
import { AUTH_CONFIG } from '../../config/api';
import api from '../../api/axios';

interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('jwt_token'),
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('jwt_token');
            state.isAuthenticated = false;
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
            .addCase(login.fulfilled, (state) => {
                state.isAuthenticated = true;
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
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
