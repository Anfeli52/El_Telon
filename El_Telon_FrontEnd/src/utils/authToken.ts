import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    exp?: number;
}

export const isJwtExpired = (token: string | null): boolean => {
    if (!token) {
        return true;
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (!decoded.exp) {
            return true;
        }

        return decoded.exp * 1000 <= Date.now();
    } catch {
        return true;
    }
};
