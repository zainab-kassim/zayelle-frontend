"use client";

import { useEffect, useMemo, useState } from "react";
import { useOrderStore } from "@/store/orderStore";
import OrderHistoryCard from "@/components/shared/orders/OrderHistoryCard";
import OrderStatusFilter from "@/components/shared/orders/OrderStatusFilter";
import { getOrderFilterStatus, OrderFilterStatus } from "@/lib/orderStatus";

export default function Orders() {
  const orders = useOrderStore((state) => state.orders);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);
  const [activeFilter, setActiveFilter] = useState<OrderFilterStatus>("success");

  useEffect(() => {
    fetchOrders();
  }, [orders.length]);

  const counts = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        acc[getOrderFilterStatus(order.status)] += 1;
        return acc;
      },
      { success: 0, pending: 0, cancelled: 0 } as Record<OrderFilterStatus, number>
    );
  }, [orders]);

  const filteredOrders = useMemo(
    () => orders.filter((order) => getOrderFilterStatus(order.status) === activeFilter),
    [orders, activeFilter]
  );

  return (
    <main className="w-full min-h-screen bg-white px-4 sm:px-8 lg:px-14 py-10">
      <div className="flex flex-col lg:flex-row gap-6">
        <OrderStatusFilter active={activeFilter} onChange={setActiveFilter} counts={counts} />

        <div className="flex-1 flex flex-col gap-5">
          {filteredOrders.length === 0 ? (
            <p className="text-[13px] text-[#8a8a8a]" style={{ fontFamily: "Cairo, sans-serif" }}>
              No orders found.
            </p>
          ) : (
            filteredOrders.map((order) => <OrderHistoryCard key={order.id} order={order} />)
          )}
        </div>
      </div>
    </main>
  );
}
