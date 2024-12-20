import { API_URL, AUTH_CONFIG } from '../config/api';
import { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth';
import axios from 'axios';
import authEvents from './auth.events';

class AuthService {
    private static instance: AuthService;
    private tokenKey = 'jwt_token';

    private constructor() {
        // Configure axios defaults
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(username: string, password: string): Promise<LoginResponse> {
        const loginData: LoginRequest = {
            client_id: AUTH_CONFIG.CLIENT_ID,
            client_secret: AUTH_CONFIG.CLIENT_SECRET,
            username,
            password
        };

        try {
            console.log('Отправляемые данные для входа:', loginData);
            const response = await axios.post<LoginResponse>(`${API_URL}/user/login`, loginData);
            
            console.log('Успешный ответ:', response.data);
            const data: LoginResponse = response.data;
            this.setToken(data.access_token);
            authEvents.emit(); // Уведомляем об изменении состояния
            return data;
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            if (axios.isAxiosError(error)) {
                const errorData = error.response?.data;
                if (errorData?.errors) {
                    const errorMessages = Object.values(errorData.errors).flat();
                    throw new Error(errorMessages.join('. '));
                }
                throw new Error(errorData?.reason || errorData?.message || 'Ошибка авторизации');
            }
            throw error instanceof Error ? error : new Error('Неизвестная ошибка');
        }
    }

    async register(data: RegisterRequest): Promise<void> {
        try {
            console.log('Отправляемые данные:', data);
            const response = await axios.post(`${API_URL}/lead_generation`, data);
            
            console.log('Успешный ответ:', response.data);

            // Специальная обработка для статуса 500 без ошибок валидации
            if (response.status === 500 && (!response.data.errors || Object.keys(response.data.errors).length === 0)) {
                console.log('Регистрация успешна, несмотря на статус 500');
                return;
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            if (axios.isAxiosError(error)) {
                const errorData = error.response?.data;
                if (errorData?.errors) {
                    const errorMessages = Object.values(errorData.errors).flat();
                    throw new Error(errorMessages.join('. '));
                }
                throw new Error(errorData?.message || 'Ошибка при регистрации');
            }
            throw error instanceof Error ? error : new Error('Неизвестная ошибка');
        }
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        authEvents.emit(); // Уведомляем об изменении состояния
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export default AuthService.getInstance();
