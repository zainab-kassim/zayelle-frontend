"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderDetails, OrderHistoryOrder } from "@/services/order.service";
import { getOrderFilterStatus } from "@/lib/orderStatus";
import OrderHeaderStats from "@/components/shared/orders/OrderHeaderStats";
import OrderTracking, { TRACKING_STEP_COUNT } from "@/components/shared/orders/OrderTracking";
import PersonalInfoCard from "@/components/shared/orders/PersonalInfoCard";
import OrderSummaryCard from "@/components/shared/orders/OrderSummaryCard";
import OrderItemsList from "@/components/shared/orders/OrderItemsList";
import OrderDetailSkeleton from "@/components/ui/OrderDetailSkeleton";

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
        console.log("Order details:", response.order);
        setOrder(response.order);
        setCustomerName(response.order.customerName ?? "");
      })
      .catch((err) => {
        console.error("Failed to fetch order details:", err);
        setError("Order not found.");
      });
  }, [id]);

  // the customer name is on the order record (order.customerName, set above);
  // the account email isn't on the order — it's stashed in localStorage at
  // login/signup (see hooks/UseLogin.ts, hooks/UseSignup.ts)
  useEffect(() => {
    setCustomerEmail(localStorage.getItem("email") ?? "");
  }, []);

  if (error) {
    return (
      <main className="w-full min-h-screen bg-white px-4 sm:px-8 lg:px-14 py-10">
        <p className="text-[15px] text-[#8a8a8a]" style={{ fontFamily: "Cairo, sans-serif" }}>
          {error}
        </p>
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

  // no per-step timestamps from the backend yet — caps at "In Transit" (step 3)
  // since "Out for Delivery" shouldn't fill in until a dashboard drives real
  // tracking steps
  const trackingCompletedCount = filterStatus === "cancelled" ? 1 : TRACKING_STEP_COUNT - 1;
  const trackingColor = filterStatus === "cancelled" ? "#dc2626" : "#1a1a1a";

  return (
    <main className="w-full min-h-screen bg-white px-4 sm:px-8 lg:px-14 py-10">
      <div className="flex flex-col gap-8 w-full">
        <div className="mt-2">
          <OrderHeaderStats
            orderCode={orderCode}
            estimatedDate={estimatedDate}
            itemCount={itemCount}
            filterStatus={filterStatus}
          />
        </div>

        <div className="-mt-4">
          <OrderTracking
            completedCount={trackingCompletedCount}
            activeColor={trackingColor}
            placedDate={placedDate}
          />
        </div>

        {/* Personal info + Order summary — side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          <PersonalInfoCard
            name={customerName}
            email={customerEmail}
            phone={order.customerPhonenumber}
            addressLines={addressLines}
            postalCode={order.postal_code}
          />
          <OrderSummaryCard subtotal={subtotal} total={order.totalLocal} currency={currency} />
        </div>

        <OrderItemsList items={order.order_items} currency={currency} />
      </div>
    </main>
  );
}
