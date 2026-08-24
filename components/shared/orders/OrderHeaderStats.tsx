import { OrderFilterStatus, ORDER_STATUS_BADGE } from "@/lib/orderStatus";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="text-[10px] sm:text-[13px] text-[#8a8a8a] text-center"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {label}
      </span>
      <span
        className="text-[11px] sm:text-[14px] font-semibold text-[#1a1a1a] text-center"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {value}
      </span>
    </div>
  );
}

interface OrderHeaderStatsProps {
  orderCode: string;
  estimatedDate: string;
  itemCount: number;
  filterStatus: OrderFilterStatus;
}

export default function OrderHeaderStats({
  orderCode,
  estimatedDate,
  itemCount,
  filterStatus,
}: OrderHeaderStatsProps) {
  const badge = ORDER_STATUS_BADGE[filterStatus];

  return (
    <div className="rounded-2xl bg-[#F8F8F8] p-4 sm:p-6 grid grid-cols-4 gap-x-2 sm:gap-x-4">
      <Stat label="Order Number" value={orderCode} />
      <Stat label="Estimate" value={estimatedDate} />
      <Stat label="No of Items" value={`${itemCount} item${itemCount !== 1 ? "s" : ""}`} />
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-[10px] sm:text-[13px] text-[#8a8a8a] text-center"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          Status
        </span>
        <span
          className={`w-fit flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[13px] font-semibold ${badge.bg} ${badge.text}`}
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
          {badge.label}
        </span>
      </div>
    </div>
  );
}
