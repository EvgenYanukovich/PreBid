export interface LoginRequest {
    client_id: number;
    client_secret: string;
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface LoginFormProps {
    onRegisterClick: () => void;
    onLoginClick: () => void;
    onSuccess?: () => void;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormProps {
    onLoginClick: () => void;
    onSuccess: () => void;
}

export interface RegisterRequest {
    email: string;
    phone: string;
    name_ru: string;
    second_name_ru: string;
    password: string;
}

export interface AuthError {
    message: string;
    errors?: Record<string, string[]>;
}

export interface LogoutResponse {
    status: string;
    code: number;
    message: string;
}
