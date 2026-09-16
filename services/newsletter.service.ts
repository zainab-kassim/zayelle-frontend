import axiosInstance from '@/lib/axiosInstance';

// Subscribe an email to the newsletter — backend saves it to the
// newsletters table and sends a welcome email on first subscribe.
export const subscribeToNewsletter = async (email: string) => {
  const response = await axiosInstance.post('/newsletter/subscribe', { email });
  return response.data;
};
