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

//logout service
export const Logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};


//signup service
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

//google sign-in service — sends the Google access token to the backend for
//verification; the backend logs the user in (or creates the account) and
//sets our own auth cookies
export const signInWithGoogle = async (accessToken: string) => {
  const response = await axiosInstance.post('/auth/google', { accessToken });

  return response.data;
};
 