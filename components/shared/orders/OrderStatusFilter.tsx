"use client";

import { motion } from "framer-motion";
import { ORDER_FILTER_TABS, OrderFilterStatus } from "@/lib/orderStatus";

interface OrderStatusFilterProps {
  active: OrderFilterStatus;
  onChange: (status: OrderFilterStatus) => void;
  counts: Record<OrderFilterStatus, number>;
}

export default function OrderStatusFilter({
  active,
  onChange,
  counts,
}: OrderStatusFilterProps) {
  return (
    <div
      className="flex items-center gap-6 sm:gap-8 border-b border-line overflow-x-auto no-scrollbar"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {ORDER_FILTER_TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative flex items-center gap-1.5 pb-3.5 whitespace-nowrap font-sans text-[12px] sm:text-[14px] transition-colors duration-200 ${
              isActive ? "text-ink/80" : "text-muted hover:text-ink/80"
            }`}
          >
            {tab.label}
            <span className={isActive ? "text-muted" : "text-muted/70"}>({counts[tab.key]})</span>
            {isActive && (
              <motion.span
                layoutId="order-status-underline"
                className="absolute left-0 right-0 -bottom-px h-[1.5px] bg-ink"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
