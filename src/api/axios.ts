import axios from 'axios';
import { API_URL } from '../config/api';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Если получили 401, значит токен истек или недействителен
            localStorage.removeItem('jwt_token');
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default api;
