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

export interface OrderHistoryItem {
  id: number;
  order_id: number;
  cart_id: number;
  product_id: {
    name: string;
    slug: string;
    image: string[];
    description: string;
  };
  quantity: number;
  price: number;
  size: string;
  unit_price: number;
}

export interface OrderHistoryOrder {
  id: number;
  user_id: number;
  cart_id: number;
  total_price: number;
  totalLocal: number;
  status: string;
  phone_number: string;
  street_address: string;
  apt_no: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  currency: string;
  created_at: string;
  order_items: OrderHistoryItem[];
}

export interface OrderHistoryResponse {
  message: string;
  orders: OrderHistoryOrder[];
}

export const getOrderHistory = async (): Promise<OrderHistoryResponse> => {
  const response = await axiosInstance.get('/order/orderhistory');
  return response.data;
};