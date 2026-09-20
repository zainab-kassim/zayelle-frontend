import { OrderFilterStatus } from "@/lib/orderStatus";
import OrderStatusBadge from "@/components/shared/orders/OrderStatusBadge";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="font-sans text-muted uppercase tracking-[0.1em] text-[9px] sm:text-[10.5px]">
        {label}
      </span>
      <span className="font-sans text-ink/65 font-normal text-[11px] sm:text-[13px]">
        {value}
      </span>
    </div>
  );
}

interface OrderHeaderStatsProps {
  estimatedDate: string;
  itemCount: number;
  filterStatus: OrderFilterStatus;
}

export default function OrderHeaderStats({
  estimatedDate,
  itemCount,
  filterStatus,
}: OrderHeaderStatsProps) {
  return (
    <div className="rounded-2xl bg-surface p-4 sm:p-6 grid grid-cols-3 gap-x-2 sm:gap-x-4">
      <Stat label="Estimate" value={estimatedDate} />
      <Stat label="No of Items" value={`${itemCount} item${itemCount !== 1 ? "s" : ""}`} />
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-sans text-muted uppercase tracking-[0.1em] text-[9px] sm:text-[10.5px]">
          Status
        </span>
        <OrderStatusBadge status={filterStatus} />
      </div>
    </div>
  );
}
