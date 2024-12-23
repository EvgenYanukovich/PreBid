import { store } from '../store';
import { login, logout, register } from '../store/slices/authSlice';
import { RegisterRequest } from '../types/auth';
import api from '../api/axios';
import { UserInformation } from '../types/user';

class AuthService {
    private static instance: AuthService;
    private tokenKey = 'jwt_token';
    private api = api;

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(username: string, password: string) {
        return store.dispatch(login({ username, password })).unwrap();
    }

    async register(data: RegisterRequest) {
        return store.dispatch(register(data)).unwrap();
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    async logout(): Promise<any> {
        store.dispatch(logout());
        const response = await this.api.post('/user/logout', {});
        localStorage.removeItem(this.tokenKey);
        return response.data;
    }

    isAuthenticated(): boolean {
        return store.getState().auth.isAuthenticated;
    }

    async getUserInfo(): Promise<UserInformation> {
        const token = localStorage.getItem(this.tokenKey);
        if (!token) {
            throw new Error('No token found');
        }
        const response = await api.get<UserInformation>('https://autoru.neonface.by/api/v2/user/information');
        return response.data;
    }
}

export default AuthService.getInstance();
