export type OrderFilterStatus = 'success' | 'pending' | 'cancelled';

export function formatOrderCode(id: number): string {
  return `ZKT-87${id}`;
}

export function formatOrderDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// order.status from the backend can be 'success' | 'pending' | 'failed' | 'canceled' | 'abandoned' —
// the UI only distinguishes 3 buckets, so anything that isn't success/pending reads as cancelled
export function getOrderFilterStatus(status: string): OrderFilterStatus {
  if (status === 'success') return 'success';
  if (status === 'pending') return 'pending';
  return 'cancelled';
}

export const ORDER_STATUS_BADGE: Record<
  OrderFilterStatus,
  { label: string; dot: string; text: string }
> = {
  success: {
    label: 'Successful',
    dot: 'bg-green-500',
    text: 'text-green-600',
  },
  pending: {
    label: 'Pending',
    dot: 'bg-orange-500',
    text: 'text-orange-600',
  },
  cancelled: {
    label: 'Cancelled',
    dot: 'bg-red-500',
    text: 'text-red-600',
  },
};

export const ORDER_FILTER_TABS: { key: OrderFilterStatus; label: string }[] = [
  { key: 'success', label: 'Successful' },
  { key: 'pending', label: 'Pending' },
  { key: 'cancelled', label: 'Cancelled' },
];
