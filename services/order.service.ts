// services/order.service.ts
import axiosInstance from '@/lib/axiosInstance';

export interface CreateOrderPayload {
  cart_id: number;
  street_address: string;
  apt_no: string;
  customerName: string;
  customerPhonenumber: string;
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
  customerName: string;
  customerPhonenumber: string;
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

export interface OrderHistoryCounts {
  success: number;
  pending: number;
  cancelled: number;
}

export interface OrderHistoryPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrderHistoryResponse {
  message: string;
  orders: OrderHistoryOrder[];
  counts: OrderHistoryCounts;
  pagination: OrderHistoryPagination;
}

export interface GetOrderHistoryParams {
  status?: 'success' | 'pending' | 'cancelled';
  page?: number;
  limit?: number;
}

export const getOrderHistory = async (
  params: GetOrderHistoryParams = {},
): Promise<OrderHistoryResponse> => {
  const response = await axiosInstance.get('/order/orderhistory', { params });
  return response.data;
};

export interface OrderDetailsResponse {
  order: OrderHistoryOrder;
}

export const getOrderDetails = async (
  order_id: number | string,
): Promise<OrderDetailsResponse> => {
  const response = await axiosInstance.get(`/order/${order_id}`);
  return response.data;
};