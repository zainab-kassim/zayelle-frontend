import axios from 'axios';
import { useCurrencyStore } from '@/store/currencyStore';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const currency = useCurrencyStore.getState().currency;
  if (currency) {
    config.headers['x-currency'] = currency;
  }
  return config;
});

// The backend tags a 401 with `code: 'TOKEN_EXPIRED'` only when the access
// token is missing/expired — the one case where refreshing and retrying is the
// right move. Every other 401 (bad credentials, Google sign-in failure, an
// invalid refresh token, …) carries a different code and is left for the caller.
const TOKEN_EXPIRED_CODE = 'TOKEN_EXPIRED';

// Shared refresh state so concurrent 401s don't race each other
let isRefreshing = false;
let refreshSubscribers: Array<() => void> = [];

function subscribeTokenRefresh(callback: () => void) {
  refreshSubscribers.push(callback);
}

function onRefreshed() {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isTokenExpired =
      error.response?.status === 401 &&
      error.response?.data?.code === TOKEN_EXPIRED_CODE;

    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      // If a refresh is already in flight, queue this request instead of firing another
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        await axiosInstance.post('/auth/token');
        isRefreshing = false;
        onRefreshed(); // wake up every queued request with the fresh token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        localStorage.removeItem('fullName');
        const currentPath = window.location.pathname + window.location.search;
        window.location.href = `/auth/login?redirect=${encodeURIComponent(currentPath)}`;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;