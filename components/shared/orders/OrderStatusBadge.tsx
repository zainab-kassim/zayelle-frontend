import { OrderFilterStatus, ORDER_STATUS_BADGE } from "@/lib/orderStatus";

interface OrderStatusBadgeProps {
  status: OrderFilterStatus;
  className?: string;
}

// dot + label rather than a filled pill — keeps semantic color as a signal
// without introducing a loud SaaS-style chip into an otherwise ink/muted page
export default function OrderStatusBadge({ status, className = "" }: OrderStatusBadgeProps) {
  const badge = ORDER_STATUS_BADGE[status];
  return (
    <span className={`inline-flex items-center gap-1.5 font-sans font-normal text-[11px] sm:text-[13px] ${badge.text} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${badge.dot}`} />
      {badge.label}
    </span>
  );
}
