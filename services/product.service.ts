import axiosInstance from '@/lib/axiosInstance';
import { Product } from '@/types/product';

export const getProductByCollection = async (collection: string): Promise<{ products: Product[]}> => {
  const response = await axiosInstance.get(`/products/collection/${collection}`);
  console.log(response)
  return { products: response.data.products};
};

export const getProducts = async (): Promise<{ products: Product[]}> => {
  const response = await axiosInstance.get('/products');
  return { products: response.data.convertedProducts};
}
 
 
export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await axiosInstance.get(`/products/${slug}`);
  console.log(response)
  console.log(response.data.product)
  return response.data.product[0];
};