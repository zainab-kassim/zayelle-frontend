import axiosInstance from '@/lib/axiosInstance';
import { Product } from '@/types/product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get('/products');
  console.log('Fetched products:', response.data); // Debug log
  return response.data;
};
 