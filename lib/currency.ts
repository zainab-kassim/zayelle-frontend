export function formatPrice(amount: number | string, currencyCode: string, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode || 'USD',
  }).format(Number(amount));
}
