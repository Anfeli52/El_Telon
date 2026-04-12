export interface AuthResponse {
    token: string;
    role: string;
}

export interface UserCredentials {
    nombre?: string;
    correo: string;
    password?: string;
}