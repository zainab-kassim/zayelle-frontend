import axios from 'axios';


 
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ensure this is set in your .env.local
  withCredentials: true, // Include cookies in requests
});
 
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/token') // ← add this
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post('/auth/token');
        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem('firstName');
        
        window.location.href = '/auth/login?session=expired';
      }
    }

    return Promise.reject(error);
  }
);
 
export default axiosInstance;