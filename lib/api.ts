import axios from 'axios';

// Configure the base API URL for Django backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If token expired, try to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
                        refresh: refreshToken,
                    });

                    const { access } = response.data;
                    localStorage.setItem('access_token', access);

                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, clear tokens and redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Auth API endpoints
export const authAPI = {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/login/', { email, password });
        return response.data;
    },

    logout: async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            await api.post('/auth/logout/', { refresh: refreshToken });
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/user/');
        return response.data;
    },
};
