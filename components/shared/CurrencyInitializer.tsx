'use client';

import { useEffect } from 'react';
import { useCurrencyStore } from '@/store/currencyStore';
import axiosInstance from '@/lib/axiosInstance';

export default function CurrencyInitializer() {
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  useEffect(() => {
    axiosInstance.get('/currency').then((res) => {
      setCurrency(res.data.currency);
    });
  }, []);

  return null;
}