// types/cart.ts

export interface AddToCartPayload {
  productid: number;
  quantity: number;
  size: string;
}

export interface CartServiceError {
  message: string;
  status?: number;
}