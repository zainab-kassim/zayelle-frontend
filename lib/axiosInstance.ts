import axios from 'axios';
import { useCurrencyStore } from '@/store/currencyStore';

const axiosInstance = axios.create({
baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// request interceptor - sends currency header automatically
axiosInstance.interceptors.request.use((config) => {
  const currency = useCurrencyStore.getState().currency;
  if (currency) {
    config.headers['x-currency'] = currency;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/token')
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post('/auth/token');
        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem('firstName');
        const currentPath = window.location.pathname;
        window.location.href = `/auth/login?redirect=${currentPath}`;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;