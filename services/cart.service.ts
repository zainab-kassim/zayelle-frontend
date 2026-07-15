import axiosInstance from "@/lib/axiosInstance";
import { AddToCartPayload } from "@/types/cart";

export const addToCart = async (payload: AddToCartPayload) => {
  const response = await axiosInstance.post('/cart/addtocart', payload);
  console.log('Add to cart response:', response.data); // Debug log
  return response.data;
};

export const getCartItems = async () => {
  const response = await axiosInstance.get('/cart');
  return response.data.cartitems;
}


export const deleteCartItem = async (id: number) => {
  const response = await axiosInstance.delete(`/cart/deletecartitem/${id}`);
  return response.data.message;
}

export const updateCartQuantity = async (id: number, quantity: number) => {
  const response = await axiosInstance.put('/cart//updatequantity', { cartitemid: id, quantity });
  return response.data.message;
}
