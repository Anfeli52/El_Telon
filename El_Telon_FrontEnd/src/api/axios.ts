import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const requestPath = config.url ?? '';
    const isPublicRequest = requestPath.startsWith('/auth/') || requestPath.startsWith('/movies/');

    if(token && !isPublicRequest) {
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
        if(error.response && (error.response.status === 401 || error.response.status === 403)){
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