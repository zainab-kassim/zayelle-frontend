import axiosInstance from '@/lib/axiosInstance';

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password,
  });

  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};


export const signUp = async (
  fullName: string,
  email: string,
  password: string
) => {
  const response = await axiosInstance.post('/auth/signup', {
    fullName,
    email,
    password,
  });

  return response.data;
};

// backend verifies the Google token, then logs in/creates the account and sets our cookies
export const signInWithGoogle = async (googleAccessToken: string) => {
  const response = await axiosInstance.post('/auth/google', {
    googleAccessToken,
  });

  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await axiosInstance.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await axiosInstance.post('/auth/reset-password', {
    token,
    password,
  });
  return response.data;
};
 