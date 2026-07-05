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

// types/cart.ts

export interface CartProduct {
  name: string;
  slug: string;
  image: string[];
  color: string;
  description: string;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product: CartProduct;
  quantity: number;
  size: string;
  price: number;
  unitprice: number;
  created_at: string;
}

export interface CartResponse {
  message: string;
  cartitems: CartItem[];
}