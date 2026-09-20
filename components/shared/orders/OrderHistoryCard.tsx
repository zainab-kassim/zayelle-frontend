"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { OrderHistoryOrder } from "@/services/order.service";
import { formatPrice } from "@/lib/currency";
import { getOrderFilterStatus, formatOrderCode, formatOrderDate } from "@/lib/orderStatus";
import OrderStatusBadge from "./OrderStatusBadge";
import BagPlaceholder from "./BagPlaceholder";

interface OrderHistoryCardProps {
  order: OrderHistoryOrder;
}

export default function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  const currency = order.currency;
  const filterStatus = getOrderFilterStatus(order.status);
  const orderCode = formatOrderCode(order.id);
  const itemCount = order.order_items.length;
  const firstItem = order.order_items[0];
  const extraCount = itemCount - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="border-b border-line last:border-0"
    >
      <Link
        href={`/orders/${order.id}`}
        className="group flex items-center gap-4 sm:gap-6 py-5 -mx-4 px-4 rounded-xl transition-colors duration-200 hover:bg-surface/60"
      >
        {/* Anchor image — one representative photo reads far cleaner than a
            cluster of tiny cropped circles for garment photography */}
        <div className="flex-shrink-0 w-[64px] h-[76px] sm:w-[72px] sm:h-[86px] rounded-lg overflow-hidden bg-surface flex items-center justify-center">
          {firstItem?.product_id?.image?.[0] ? (
            <Image
              src={firstItem.product_id.image[0]}
              alt={firstItem.product_id.name}
              width={72}
              height={86}
              className="object-contain w-[82%] h-[82%] transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <BagPlaceholder />
          )}
        </div>

        {/* Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <p className="font-serif text-ink/80 text-[14px] sm:text-[16px]">{orderCode}</p>
            <OrderStatusBadge status={filterStatus} />
          </div>
          <p className="font-sans text-ink/80 text-[12px] sm:text-[14px] truncate">
            {firstItem ? firstItem.product_id.name : "Awaiting payment confirmation"}
            {extraCount > 0 && <span className="text-muted"> +{extraCount} more</span>}
          </p>
          <p className="font-sans text-muted text-[11px] sm:text-[13px] mt-0.5">
            {formatOrderDate(order.created_at)} &middot; {formatPrice(order.totalLocal, currency)}
          </p>
        </div>

        {/* CTA */}
        <span className="hidden sm:flex items-center gap-1.5 font-sans text-muted group-hover:text-ink text-[11px] uppercase tracking-[0.1em] flex-shrink-0 transition-colors duration-200">
          Details
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:hidden text-muted flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path d="m9 6 6 6-6 6" />
        </svg>
      </Link>
    </motion.div>
  );
}
