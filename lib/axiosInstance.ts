import axios from 'axios';
import { getRouter } from '@/lib/router';

 
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ensure this is set in your .env.local
  withCredentials: true, // Include cookies in requests
});
 
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
 
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
 
      try {
        await axiosInstance.post('/auth/token');
        return axiosInstance(originalRequest);
      } catch {
        const router = getRouter();
        router?.push('/auth/login');
      }
    }
 
    return Promise.reject(error);
  }
);
 
export default axiosInstance;