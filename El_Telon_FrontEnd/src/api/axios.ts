import axios from 'axios';
import { isJwtExpired } from '../utils/authToken';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const requestPath = config.url ?? '';
    const isPublicRequest = requestPath.startsWith('/auth/') || requestPath.startsWith('/movies/');

    if (token && isJwtExpired(token)) {
        localStorage.removeItem('token');
    }

    if(token && !isPublicRequest && !isJwtExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const requestPath = error.config?.url ?? '';
        const isAuthRequest = requestPath.startsWith('/auth/');

        if(!isAuthRequest && error.response && (error.response.status === 401 || error.response.status === 403)){
            console.warn("Sesión expirada o no autizada. Limpiando datos...");

            localStorage.removeItem('token');

            if(!window.location.pathname.includes('/login')){
                window.location.href = '/login?expired=true';
            }
        }
        return Promise.reject(error);
    }
);

export default api;