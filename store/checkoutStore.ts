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
  setSavedAddress: (address: Address) => void;
  setIsUsingSavedAddress: (value: boolean) => void;
}

const MOCK_SAVED_ADDRESS: Address = {
  firstName: 'Grace',
  lastName: 'Ncube',
  phone: '613-555-7890',
  email: 'grace.ncube@example.com',
  street: '312-390 Gladstone Avenue',
  apt: '',
  postalCode: 'K2P 0R6',
  city: 'Ottawa',
  province: 'Ontario',
  country: 'Canada',
};

function loadSavedAddress(): Address {
  if (typeof window === 'undefined') return MOCK_SAVED_ADDRESS;
  try {
    const stored = localStorage.getItem('zayelle_saved_address');
    return stored ? JSON.parse(stored) : MOCK_SAVED_ADDRESS;
  } catch {
    return MOCK_SAVED_ADDRESS;
  }
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  currentStep: 1,
  shippingAddress: null,
  savedAddress: loadSavedAddress(),
  isUsingSavedAddress: false,

  setStep: (step) => set({ currentStep: step }),

  setShippingAddress: (address) => {
    set({ shippingAddress: address });
    // persist as new saved address
    try {
      localStorage.setItem('zayelle_saved_address', JSON.stringify(address));
    } catch {}
  },

  setSavedAddress: (address) => set({ savedAddress: address }),
  setIsUsingSavedAddress: (value) => set({ isUsingSavedAddress: value }),
}));