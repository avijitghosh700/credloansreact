import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import useAuthStore from '../store/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies in requests
});

export let refreshPromise: Promise<string | null> | null = null;
export const refreshToken = async () => {
  const { setToken, clearToken } = useAuthStore.getState();

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await axios.post(
          'http://localhost:4000/auth/refresh',
          {},
          { withCredentials: true },
        );
        const newToken = res.data.accessToken;
        setToken(newToken);
        return newToken;
      } catch {
        clearToken();
        return null;
      } finally {
        refreshPromise = null; // reset for next time
      }
    })();
  }
  return refreshPromise;
};

axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshToken();
      }
      
      const newToken = await refreshPromise;
      if (newToken && originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
