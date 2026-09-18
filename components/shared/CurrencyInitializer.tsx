'use client';

import { useEffect } from 'react';
import { useCurrencyStore } from '@/store/currencyStore';
import axiosInstance from '@/lib/axiosInstance';

export default function CurrencyInitializer() {
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  useEffect(() => {
    // don't override a currency the user already picked with the server default
    if (useCurrencyStore.getState().currency) return;

    axiosInstance
      .get('/currency')
      .then((res) => {
        setCurrency(res.data.currency);
      })
      .catch((error) => {
        console.error('Failed to fetch default currency:', error);
      });
  }, [setCurrency]);

  return null;
}