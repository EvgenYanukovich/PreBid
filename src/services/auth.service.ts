import { store } from '../store';
import { login, logout, register } from '../store/slices/authSlice';
import { RegisterRequest } from '../types/auth';

class AuthService {
    private static instance: AuthService;
    private tokenKey = 'jwt_token';

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

    logout(): void {
        store.dispatch(logout());
    }

    isAuthenticated(): boolean {
        return store.getState().auth.isAuthenticated;
    }
}

export default AuthService.getInstance();
