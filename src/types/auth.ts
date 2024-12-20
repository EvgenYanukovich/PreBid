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

export interface RegisterRequest {
    email: string;
    name_ru: string;
    password: string;
    phone: string;
    second_name_ru: string;
}

export interface AuthError {
    message: string;
    errors?: Record<string, string[]>;
}
