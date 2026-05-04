import axiosInstance from '@/lib/axiosInstance';
 

// ── Authentication Services ──

//login service
export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password,
  });
 
  return response.data;
};
 
//signup service
export const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
) => {
  const response = await axiosInstance.post('/auth/signup', {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
  });
 
  return response.data;
};
 