import { toast } from 'sonner';

export function formatPrice(amount: number | string, currencyCode: string, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode || 'USD',
  }).format(Number(amount));
}

// shipping fees and pricing are keyed to the destination's own currency
// (see backend order.controller.ts), so checkout currency has to follow
// whichever country is actually being shipped to, not float independently
export const COUNTRY_CURRENCY: Record<string, string> = {
  'United States': 'USD',
  'United Kingdom': 'GBP',
  Canada: 'CAD',
  Nigeria: 'NGN',
};

// switches the global currency to match a shipping country, if it doesn't
// already — shared so every place a destination gets picked (fresh address
// form, saved address, edit-address modal) applies the exact same rule
export function syncCurrencyToCountry(
  country: string,
  currentCurrency: string,
  setCurrency: (currency: string) => void,
): void {
  const matchingCurrency = COUNTRY_CURRENCY[country];
  if (matchingCurrency && matchingCurrency !== currentCurrency) {
    setCurrency(matchingCurrency);
    toast.info(`Currency switched to ${matchingCurrency} to match shipping to ${country}.`);
  }
}
