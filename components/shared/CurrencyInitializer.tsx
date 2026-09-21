'use client';

import { useEffect } from 'react';
import { useCurrencyStore } from '@/store/currencyStore';
import axiosInstance from '@/lib/axiosInstance';
import * as Sentry from '@sentry/nextjs';

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
        Sentry.captureException(error);
      });
  }, [setCurrency]);

  return null;
}