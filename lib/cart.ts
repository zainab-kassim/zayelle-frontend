import { CartItem } from '@/types/cart';

export function computeSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitprice * item.quantity, 0);
}
