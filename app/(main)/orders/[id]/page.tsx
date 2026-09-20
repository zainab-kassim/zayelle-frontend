"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { AxiosError } from "axios";
import { getOrderDetails, OrderHistoryOrder } from "@/services/order.service";
import { getOrderFilterStatus } from "@/lib/orderStatus";
import OrderHeaderStats from "@/components/shared/orders/OrderHeaderStats";
import OrderTracking, { TRACKING_STEP_COUNT } from "@/components/shared/orders/OrderTracking";
import PersonalInfoCard from "@/components/shared/orders/PersonalInfoCard";
import OrderSummaryCard from "@/components/shared/orders/OrderSummaryCard";
import OrderItemsList from "@/components/shared/orders/OrderItemsList";
import OrderDetailSkeleton from "@/components/ui/OrderDetailSkeleton";

function BackToOrders() {
  return (
    <Link
      href="/orders"
      className="inline-flex items-center gap-1.5 font-sans text-muted text-[11px] uppercase tracking-[0.08em] border-b border-ink/40 hover:border-ink hover:text-ink transition-colors duration-200 pb-0.5"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m15 18-6-6 6-6" />
      </svg>
      Back to Orders
    </Link>
  );
}

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<OrderHistoryOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    if (!id) return;

    getOrderDetails(id)
      .then((response) => {
        setOrder(response.order);
        setCustomerName(response.order.customerName ?? "");
      })
      .catch((err) => {
        console.error("Failed to fetch order details:", err);
        const status = (err as AxiosError)?.response?.status;
        if (status === 401) {
          setError("Please log in to view this order.");
        } else if (status === 404) {
          setError("Order not found.");
        } else {
          setError("Something went wrong loading this order. Please try again.");
        }
      });
  }, [id]);

  // email isn't on the order record, pull it from localStorage instead
  useEffect(() => {
    setCustomerEmail(localStorage.getItem("email") ?? "");
  }, []);

  if (error) {
    return (
      <main className="w-full min-h-screen bg-paper px-4 md:px-12 lg:px-34 xl:px-16 py-8 sm:py-10">
        <div className="mb-8">
          <BackToOrders />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 min-h-[50vh] text-center">
          <p className="font-serif text-ink text-[20px] sm:text-[24px]">{error}</p>
          <Link
            href="/orders"
            className="font-sans font-normal uppercase tracking-[0.1em] text-[10.5px] text-paper bg-ink h-12 px-8 inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  if (!order) {
    return <OrderDetailSkeleton />;
  }

  // same order code format used in OrderHistoryCard: `ZKT-87${order.id}`
  const orderCode = `ZKT-87${order.id}`;
  const filterStatus = getOrderFilterStatus(order.status);
  const itemCount = order.order_items.length;
  const currency = order.currency;
  const placedDate = new Date(order.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  // same 14-day estimate used in OrderHistoryCard's formatEstimatedArrival
  const estimatedDeliveryDate = new Date(order.created_at);
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 14);
  const estimatedDate = estimatedDeliveryDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const subtotal = order.order_items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const addressLines = [
    [order.street_address, order.apt_no].filter(Boolean).join(", "),
    [order.city, order.state].filter(Boolean).join(", "),
    order.country,
  ].filter(Boolean);

  // no per-step timestamps yet, so this caps at "In Transit" (step 3)
  const trackingCompletedCount = filterStatus === "cancelled" ? 1 : TRACKING_STEP_COUNT - 1;
  const trackingColor = filterStatus === "cancelled" ? "#dc2626" : "#17171A";

  return (
    <main className="w-full min-h-screen bg-paper px-4 md:px-12 lg:px-34 xl:px-16 py-8 sm:py-10 pb-16 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col gap-8 w-full"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h1 className="font-serif text-ink/80 font-normal text-[16px] sm:text-[22px]">
              Order {orderCode}
            </h1>
            <BackToOrders />
          </div>
          <p className="font-sans text-muted text-[10px] sm:text-[12.5px]">
            Placed on {placedDate}
          </p>
        </div>

        <OrderHeaderStats
          estimatedDate={estimatedDate}
          itemCount={itemCount}
          filterStatus={filterStatus}
        />

        <OrderTracking
          completedCount={trackingCompletedCount}
          activeColor={trackingColor}
          placedDate={placedDate}
        />

        {/* Personal info + Order summary — side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          <PersonalInfoCard
            name={customerName}
            email={customerEmail}
            phone={order.customerPhonenumber}
            addressLines={addressLines}
            postalCode={order.postal_code}
          />
          <OrderSummaryCard
            subtotal={subtotal}
            total={order.totalLocal}
            currency={currency}
            hasItems={itemCount > 0}
          />
        </div>

        <OrderItemsList items={order.order_items} currency={currency} />
      </motion.div>
    </main>
  );
}
