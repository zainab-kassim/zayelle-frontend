"use client";

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
    <div className="flex flex-row lg:flex-col gap-3 lg:w-[220px] flex-shrink-0 overflow-x-auto lg:overflow-visible">
      {ORDER_FILTER_TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center justify-between gap-4 px-5 py-3.5 rounded-full whitespace-nowrap transition-all duration-200 ${
              isActive
                ? "bg-[#1a1a1a] text-white"
                : "bg-white border border-[#e8e8e8] text-[#1a1a1a] hover:border-[#1a1a1a]"
            }`}
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            <span className="text-[13px] font-medium">{tab.label}</span>
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-semibold ${
                isActive ? "bg-white text-[#1a1a1a]" : "bg-[#f0f0f0] text-[#1a1a1a]"
              }`}
            >
              {counts[tab.key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
