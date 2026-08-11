import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CurrencyStore } from '@/types/currency';

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currency: '',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'zayelle_currency',
      storage: createJSONStorage(() => localStorage),
    }
  )
);