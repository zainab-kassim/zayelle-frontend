import axiosInstance from '@/lib/axiosInstance';
import { Product } from '@/types/product';

export const getProductByCollection = async (): Promise<{ products: Product[]; currency: string }> => {
  const response = await axiosInstance.get('/products/collection/floreal-collection');
  console.log('Fetched products:', response.data); // Debug log
  return { products: response.data.products, currency: response.data.currency };
};
 