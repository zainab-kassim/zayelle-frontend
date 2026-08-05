const symbolCache = new Map<string, string>();

export function getCurrencySymbol(currencyCode: string, locale = 'en-US'): string {
  if (!currencyCode) return '';

  const cached = symbolCache.get(currencyCode);
  if (cached) return cached;

  const symbol = (0)
    .toLocaleString(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, '')
    .trim();

  symbolCache.set(currencyCode, symbol);
  return symbol;
}
