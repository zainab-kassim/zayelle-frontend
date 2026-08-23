export type OrderFilterStatus = 'success' | 'pending' | 'cancelled';

// order.status from the backend can be 'success' | 'pending' | 'failed' | 'canceled' | 'abandoned' —
// the UI only distinguishes 3 buckets, so anything that isn't success/pending reads as cancelled
export function getOrderFilterStatus(status: string): OrderFilterStatus {
  if (status === 'success') return 'success';
  if (status === 'pending') return 'pending';
  return 'cancelled';
}

export const ORDER_STATUS_BADGE: Record<
  OrderFilterStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  success: {
    label: 'Successful',
    dot: 'bg-green-500',
    bg: 'bg-green-50',
    text: 'text-green-600',
  },
  pending: {
    label: 'Pending',
    dot: 'bg-orange-500',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
  },
  cancelled: {
    label: 'Cancelled',
    dot: 'bg-red-500',
    bg: 'bg-red-50',
    text: 'text-red-600',
  },
};

export const ORDER_FILTER_TABS: { key: OrderFilterStatus; label: string }[] = [
  { key: 'success', label: 'Successful' },
  { key: 'pending', label: 'Pending' },
  { key: 'cancelled', label: 'Cancelled' },
];
