// store/checkoutStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/types/cart';

export interface Address {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  apt: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
}

export interface OrderResponse {
  message: string;
  order: {
    id: number;
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
    user_id: {
      id: number;
      email: string;
      firstname: string;
    };
  };
}

export type PaymentStatus = 'success' | 'pending' | 'failed';
export type PaymentProvider = 'paystack' | 'stripe';

interface CheckoutState {
  currentStep: 1 | 2 | 3;
  orderResponse: OrderResponse | null;
  shippingAddress: Address | null;
  savedAddress: Address | null;
  isUsingSavedAddress: boolean;
  cartItems: CartItem[];
  paymentStatus: PaymentStatus | null;
  paymentMessage: string;
  paymentReference: string | null;
  paymentProvider: PaymentProvider | null;

  setShippingAddress: (address: Address) => void;
  setSavedAddress: (address: Address | null) => void;
  setIsUsingSavedAddress: (value: boolean) => void;
  setCartItems: (items: CartItem[]) => void;
  advanceToReview: (order: OrderResponse) => void;
  setPaymentReference: (reference: string, provider: PaymentProvider) => void;
  setPaymentOutcome: (status: PaymentStatus, message: string) => void;
  resetCheckout: () => void;
}

function loadSavedAddress(): Address | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('zayelle_saved_address');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      currentStep: 1,
      orderResponse: null,
      shippingAddress: null,
      savedAddress: loadSavedAddress(),
      isUsingSavedAddress: false,
      cartItems: [],
      paymentStatus: null,
      paymentMessage: '',
      paymentReference: null,
      paymentProvider: null,

      setShippingAddress: (address) => {
        set({
          shippingAddress: address,
          savedAddress: address,
        });
        try {
          localStorage.setItem('zayelle_saved_address', JSON.stringify(address));
        } catch {}
      },

      setSavedAddress: (address) => set({ savedAddress: address }),
      setIsUsingSavedAddress: (value) => set({ isUsingSavedAddress: value }),
      setCartItems: (items) => set({ cartItems: items }),

      // step and its data move together in one write — they can never desync
      advanceToReview: (order) => set({
        currentStep: 2,
        orderResponse: order,
        paymentStatus: null,
        paymentMessage: '',
        paymentReference: null,
        paymentProvider: null,
      }),
      setPaymentReference: (reference, provider) => set({ paymentReference: reference, paymentProvider: provider }),
      // step 3 is the single point of truth for a payment outcome — always moves there together with the result
      setPaymentOutcome: (status, message) => set({
        currentStep: 3,
        paymentStatus: status,
        paymentMessage: message,
      }),
      resetCheckout: () => set({
        currentStep: 1,
        orderResponse: null,
        paymentStatus: null,
        paymentMessage: '',
        paymentReference: null,
        paymentProvider: null,
      }),
    }),
    {
      name: 'zayelle_checkout_state',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        orderResponse: state.orderResponse,
        paymentStatus: state.paymentStatus,
        paymentMessage: state.paymentMessage,
        paymentReference: state.paymentReference,
        paymentProvider: state.paymentProvider,
      }),
    }
  )
);