// store/checkoutStore.ts
import { create } from 'zustand';

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

interface CheckoutState {
  currentStep: 1 | 2 | 3;
  shippingAddress: Address | null;
  savedAddress: Address | null;
  isUsingSavedAddress: boolean;

  setStep: (step: 1 | 2 | 3) => void;
  setShippingAddress: (address: Address) => void;
  setSavedAddress: (address: Address | null) => void;
  setIsUsingSavedAddress: (value: boolean) => void;
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

export const useCheckoutStore = create<CheckoutState>((set) => ({
  currentStep: 1,
  shippingAddress: null,
  savedAddress: loadSavedAddress(),
  isUsingSavedAddress: false,

  setStep: (step) => set({ currentStep: step }),

  setShippingAddress: (address) => {
    set({ 
      shippingAddress: address,
      savedAddress: address
    });
    // persist as new saved address
    try {
      localStorage.setItem('zayelle_saved_address', JSON.stringify(address));
    } catch  {

    
    }
  },

  setSavedAddress: (address) => set({ savedAddress: address }),
  setIsUsingSavedAddress: (value) => set({ isUsingSavedAddress: value }),
}));