import { create } from 'zustand';
import { CurrencyStore } from '@/types/currency';

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currency: '',
  setCurrency: (currency) => set({ currency }),
}));