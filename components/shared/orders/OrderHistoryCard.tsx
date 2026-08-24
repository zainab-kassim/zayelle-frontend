"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { OrderHistoryOrder } from "@/services/order.service";
import { formatPrice } from "@/lib/currency";
import { getOrderFilterStatus, ORDER_STATUS_BADGE } from "@/lib/orderStatus";

function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 8h12l-1 12H7L6 8Z" stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M2 7h11v9H2z" stroke="#5a5a5a" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13 10h4l3 3v3h-7v-6Z" stroke="#5a5a5a" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="1.5" stroke="#5a5a5a" strokeWidth="1.5" />
      <circle cx="17" cy="18" r="1.5" stroke="#5a5a5a" strokeWidth="1.5" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
        stroke="#5a5a5a"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="#5a5a5a" strokeWidth="1.5" />
    </svg>
  );
}

function formatEstimatedArrival(createdAt: string) {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + 14);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

interface OrderHistoryCardProps {
  order: OrderHistoryOrder;
}

export default function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  const router = useRouter();
  // item prices and totalLocal are converted using the rate stored on the
  // order itself (locked in at checkout), so format them in the order's own
  // currency — not whatever currency the user has selected right now
  const currency = order.currency;
  const filterStatus = getOrderFilterStatus(order.status);
  const badge = ORDER_STATUS_BADGE[filterStatus];
  const orderCode = `ZKT-87${order.id}`;
  const estimatedArrival = formatEstimatedArrival(order.created_at);
  const itemCount = order.order_items.length;

  return (
    <div className="rounded-2xl border border-[#e8e8e8] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2">
          <BagIcon />
          <span
            className="text-[13px] font-bold text-[#1a1a1a]"
            style={{ fontFamily: '"Expletus Sans", serif' }}
          >
            {orderCode}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="hidden lg:inline text-[11px] text-[#8a8a8a]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            Estimated arrival: {estimatedArrival}
          </span>
          <span
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${badge.bg} ${badge.text}`}
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            <span className="relative flex w-1.5 h-1.5">
              <span
                className={`animate-ping absolute inline-flex w-full h-full rounded-full opacity-75 ${badge.dot}`}
              />
              <span className={`relative inline-flex w-1.5 h-1.5 rounded-full ${badge.dot}`} />
            </span>
            {badge.label}
          </span>
        </div>
      </div>

      {/* Route — desktop */}
      <div className="hidden lg:flex items-center justify-between px-5 py-3 border-b border-[#f0f0f0]">
        <div
          className="flex items-center gap-1.5 text-[12px] text-[#5a5a5a]"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <TruckIcon />
          Ottawa, Canada
        </div>
        <div className="flex-1 mx-4 border-t border-dashed border-[#d8d8d8]" />
        <div
          className="flex items-center gap-1.5 text-[12px] text-[#5a5a5a]"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <PinIcon />
          {order.state}, {order.country}
        </div>
      </div>

      {/* Route — mobile */}
      <div className="flex lg:hidden flex-col gap-2 px-5 py-3 border-b border-[#f0f0f0]">
        <div
          className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full border border-[#e8e8e8] text-[11px] text-[#5a5a5a]"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <TruckIcon />
          Ottawa, Canada
        </div>
        <div
          className="w-fit px-3 py-1.5 rounded-full border border-[#e8e8e8] text-[11px] text-[#8a8a8a]"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          Estimated arrival: {estimatedArrival}
        </div>
        <div
          className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full border border-[#e8e8e8] text-[11px] text-[#5a5a5a]"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <PinIcon />
          {order.state}, {order.country}
        </div>
      </div>

      {/* Items */}
      <div className="px-5 py-2">
        {order.order_items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 py-3 border-b border-[#f0f0f0] last:border-0"
          >
            <div className="flex-shrink-0 w-[90px] h-[100px] sm:w-[110px] sm:h-[120px] rounded-xl overflow-hidden bg-[#F8F8F8] flex items-center justify-center">
              {item.product_id.image?.[0] && (
                <Image
                  src={item.product_id.image[0]}
                  alt={item.product_id.name}
                  width={110}
                  height={120}
                  className="object-contain w-[80%] h-[80%]"
                />
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <p
                className="text-[13px] font-semibold text-[#1a1a1a]"
                style={{ fontFamily: '"Expletus Sans", serif' }}
              >
                {item.product_id.name}
              </p>
              <p
                className="text-[12px] text-[#5a5a5a]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {formatPrice(item.price, currency)} × {item.quantity}
              </p>
              <p
                className="text-[11px] text-[#8a8a8a] uppercase"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {item.size}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-4 bg-[#F8F8F8]">
        <p className="text-[13px] text-[#1a1a1a]" style={{ fontFamily: "Cairo, sans-serif" }}>
          Total: <span className="font-semibold">{formatPrice(order.totalLocal, currency)}</span>{" "}
          <span className="text-[#8a8a8a]">
            ({itemCount} item{itemCount !== 1 ? "s" : ""})
          </span>
        </p>
        <button
          onClick={() => router.push(`/orders/${order.id}`)}
          className="px-5 py-2.5 bg-[#1a1a1a] text-white text-[11px] font-semibold tracking-[0.18em] uppercase rounded-md hover:bg-[#333] transition-all duration-300"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          Details
        </button>
      </div>
    </div>
  );
}
