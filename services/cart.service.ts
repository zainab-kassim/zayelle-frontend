import axiosInstance from "@/lib/axiosInstance";
import { AddToCartPayload } from "@/types/cart";

export const addToCart = async (payload: AddToCartPayload) => {
  const response = await axiosInstance.post('/cart/addtocart', payload);
  console.log('Add to cart response:', response.data); // Debug log
  return response.data;
};