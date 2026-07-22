// services/order.service.ts
import axiosInstance from '@/lib/axiosInstance';

export interface CreateOrderPayload {
  cart_id: number;
  street_address: string;
  apt_no: string;
  phone_number: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export const createOrder = async (payload: CreateOrderPayload) => {
  const response = await axiosInstance.post('/order', payload);
  return response.data;
};