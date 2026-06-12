import axiosInstance from '@/lib/axiosInstance';
import { Product } from '@/types/product';

export const getProductByCollection = async (collection: string): Promise<{ products: Product[]}> => {
  const response = await axiosInstance.get(`/products/collection/${collection}`);
  return { products: response.data.products};
};

export const getProducts = async (): Promise<{ products: Product[]}> => {
  const response = await axiosInstance.get('/products');
  return { products: response.data.convertedProducts};
}
 